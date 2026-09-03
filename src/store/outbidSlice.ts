import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import confetti from 'canvas-confetti';
import { supabase } from '../services/supabase';
import { processDodoPayment, fetchPlatformRevenue } from '../services/dodoPayments';
import type { Category, Product, OutbidActivity, BidClaimRequest, PaymentTransaction, PlatformRevenueStats } from '../types';

interface OutbidState {
  categories: Category[];
  products: Product[];
  activities: OutbidActivity[];
  payments: PaymentTransaction[];
  revenueStats: PlatformRevenueStats;
  loading: boolean;
  isSubmitting: boolean;
  isOutbidModalOpen: boolean;
  selectedCategoryForModal: string | null;
  selectedTargetProduct: Product | null;
  defaultBidAmount: number;
  error: string | null;
}

const initialState: OutbidState = {
  categories: [],
  products: [],
  activities: [],
  payments: [],
  revenueStats: {
    totalRevenue: 0,
    totalTransactions: 0,
    averageBidAmount: 0,
    revenueLast24h: 0,
  },
  loading: true,
  isSubmitting: false,
  isOutbidModalOpen: false,
  selectedCategoryForModal: null,
  selectedTargetProduct: null,
  defaultBidAmount: 100,
  error: null,
};

// Async Thunk: Fetch from Supabase tables (categories, products, bids, payments)
export const fetchSupabaseDataThunk = createAsyncThunk(
  'outbid/fetchSupabaseData',
  async () => {
    try {
      // 1. Fetch Categories from Supabase
      const { data: dbCategories, error: catError } = await supabase.from('categories').select('*');
      if (catError) console.error('Supabase categories fetch error:', catError);

      // 2. Fetch Products from Supabase
      const { data: dbProducts, error: prodError } = await supabase
        .from('products')
        .select('*')
        .order('current_bid', { ascending: false });
      if (prodError) console.error('Supabase products fetch error:', prodError);

      // 3. Fetch Bids / Activity from Supabase
      const { data: dbBids, error: bidsError } = await supabase
        .from('bids')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (bidsError) console.error('Supabase bids fetch error:', bidsError);

      // 4. Fetch Payments from Supabase
      const { data: dbPayments, error: payError } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      if (payError) console.warn('Supabase payments fetch note:', payError.message);

      const loadedProducts: Product[] = (dbProducts || [])
        .map((p: any) => ({
          id: p.id,
          title: p.title,
          url: p.url,
          faviconUrl: p.favicon_url,
          description: p.description,
          categorySlug: p.category_slug,
          currentBid: Number(p.current_bid) || 0,
          rank: 1,
          claimedAt: p.claimed_at || 'Recently',
          clicks: Number(p.clicks) || 0,
          views: Number(p.views) || Number(p.view_count) || (p.clicks ? Number(p.clicks) * 3 + 12 : 1),
          timeAgo: p.time_ago || 'today',
          domain: p.domain,
          userEmail: p.user_email,
          verified: Boolean(p.verified),
        }))
        .sort((a, b) => b.currentBid - a.currentBid)
        .map((p, idx) => ({ ...p, rank: idx + 1 }));

      const loadedCategories: Category[] = (dbCategories || [])
        .map((c: any) => {
          const catProds = loadedProducts.filter((p) => p.categorySlug === c.slug);
          const highestBid = catProds.length > 0 ? catProds[0].currentBid : (Number(c.top_bid) || 0);
          const totalVol = catProds.length > 0
            ? catProds.reduce((sum, p) => sum + p.currentBid, 0)
            : (Number(c.total_volume) || 0);

          return {
            id: c.id,
            slug: c.slug,
            name: c.name,
            icon: c.icon || 'Flame',
            claimCount: catProds.length > 0 ? catProds.length : (Number(c.claim_count) || 0),
            hotRank: c.hot_rank,
            totalVolume: totalVol,
            topBid: highestBid,
            updatedAt: c.updated_at || 'Recently',
            description: c.description,
          };
        })
        .sort((a, b) => b.topBid - a.topBid);

      const loadedActivities: OutbidActivity[] = (dbBids || []).map((b: any) => ({
        id: b.id,
        productId: b.product_id,
        productTitle: b.product_title,
        productFavicon: b.product_favicon,
        productUrl: b.product_url,
        categorySlug: b.category_slug,
        categoryName: b.category_name,
        amount: Number(b.amount) || 0,
        previousProductTitle: b.previous_product_title,
        previousAmount: Number(b.previous_amount) || undefined,
        timestamp: 'Just now',
      }));

      const loadedPayments: PaymentTransaction[] = (dbPayments || []).map((p: any) => ({
        id: p.id,
        userId: p.user_id,
        userEmail: p.user_email,
        productId: p.product_id,
        productTitle: p.product_title,
        productUrl: p.product_url,
        categorySlug: p.category_slug,
        categoryName: p.category_name,
        targetProductId: p.target_product_id,
        targetProductTitle: p.target_product_title,
        targetProductBid: p.target_product_bid ? Number(p.target_product_bid) : undefined,
        amount: Number(p.amount) || 0,
        currency: p.currency || 'USD',
        status: p.status || 'succeeded',
        paymentMethod: p.payment_method || 'dodo_payments',
        dodoPaymentId: p.dodo_payment_id,
        dodoCheckoutSessionId: p.dodo_checkout_session_id,
        metadata: p.metadata || {},
        createdAt: p.created_at,
      }));

      // 5. Calculate Revenue Stats
      const revStats = await fetchPlatformRevenue();
      if (revStats.totalRevenue === 0 && loadedPayments.length > 0) {
        const total = loadedPayments.reduce((s, p) => s + p.amount, 0);
        revStats.totalRevenue = total;
        revStats.totalTransactions = loadedPayments.length;
        revStats.averageBidAmount = Math.round(total / loadedPayments.length);
      } else if (revStats.totalRevenue === 0 && loadedCategories.length > 0) {
        const totalVol = loadedCategories.reduce((s, c) => s + c.totalVolume, 0);
        revStats.totalRevenue = totalVol;
        revStats.totalTransactions = loadedProducts.length;
        revStats.averageBidAmount = loadedProducts.length > 0 ? Math.round(totalVol / loadedProducts.length) : 0;
      }

      return {
        categories: loadedCategories,
        products: loadedProducts,
        activities: loadedActivities,
        payments: loadedPayments,
        revenueStats: revStats,
      };
    } catch (err) {
      console.warn('Supabase fetch error:', err);
      return null;
    }
  }
);

// Async Thunk: Submit Bid Claim (Dodo Payment + Supabase Sync)
export const submitBidClaimThunk = createAsyncThunk(
  'outbid/submitClaim',
  async (
    { request, userEmail, userId }: { request: BidClaimRequest; userEmail?: string; userId?: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { outbid: OutbidState };
      const category = state.outbid.categories.find((c) => c.slug === request.categorySlug);
      if (!category) throw new Error('Category not found');

      const targetProduct = state.outbid.selectedTargetProduct;
      const existingCatProducts = state.outbid.products.filter((p) => p.categorySlug === request.categorySlug);
      const topProduct = targetProduct || existingCatProducts[0];

      const newProductId = 'prod_' + Math.random().toString(36).substring(2, 9);

      // 1. Process payment via Dodo Payments
      const paymentResponse = await processDodoPayment({
        amount: request.amount,
        productName: request.productTitle,
        categorySlug: request.categorySlug,
        categoryName: category.name,
        productUrl: request.productUrl,
        userEmail: userEmail || 'user@outbid.lol',
        userId: userId,
        targetProductId: topProduct?.id,
        targetProductTitle: topProduct?.title,
        targetProductBid: topProduct?.currentBid,
        metadata: {
          productId: newProductId,
          targetRank: targetProduct?.rank || 1,
        },
      });

      const newProduct: Product = {
        id: newProductId,
        title: request.productTitle,
        url: request.productUrl,
        faviconUrl: request.productFavicon,
        description: request.productDescription,
        categorySlug: request.categorySlug,
        categoryName: category.name.split(',')[0].split('&')[0].trim(),
        currentBid: request.amount,
        rank: 1,
        claimedAt: 'Just now',
        clicks: 0,
        timeAgo: 'today',
        domain: new URL(request.productUrl).hostname.replace(/^www\./, ''),
        userEmail: userEmail,
        verified: true,
      };

      // 2. Direct Sync to Supabase Database
      try {
        await supabase.from('products').upsert({
          id: newProduct.id,
          title: newProduct.title,
          url: newProduct.url,
          favicon_url: newProduct.faviconUrl,
          description: newProduct.description,
          category_slug: newProduct.categorySlug,
          current_bid: newProduct.currentBid,
          rank: 1,
          claimed_at: newProduct.claimedAt,
          clicks: 0,
          time_ago: newProduct.timeAgo,
          domain: newProduct.domain,
          user_id: userId || null,
          user_email: userEmail || null,
          verified: true,
        });

        await supabase.from('bids').insert({
          id: 'bid_' + Date.now(),
          product_id: newProductId,
          product_title: request.productTitle,
          product_favicon: request.productFavicon,
          product_url: request.productUrl,
          category_slug: request.categorySlug,
          category_name: category.name,
          amount: request.amount,
          previous_product_title: topProduct?.title,
          previous_amount: topProduct?.currentBid,
          user_id: userId || null,
        });

        // Update category stats in Supabase
        await supabase
          .from('categories')
          .update({
            claim_count: category.claimCount + 1,
            top_bid: Math.max(category.topBid, request.amount),
            total_volume: category.totalVolume + request.amount,
            updated_at: 'Just now',
          })
          .eq('slug', request.categorySlug);

        if (userId) {
          try {
            await supabase.rpc('increment_profile_spent', {
              uid: userId,
              delta: request.amount,
            });
          } catch {}
        }
      } catch (dbErr) {
        console.warn('Supabase DB write error:', dbErr);
      }

      // 3. Trigger Confetti
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#eab308', '#3b82f6', '#ec4899', '#ffffff'],
        });
      } catch {}

      const newPaymentTransaction: PaymentTransaction = {
        id: paymentResponse.paymentId,
        userId: userId,
        userEmail: userEmail || 'user@outbid.lol',
        productId: newProductId,
        productTitle: request.productTitle,
        productUrl: request.productUrl,
        categorySlug: request.categorySlug,
        categoryName: category.name,
        targetProductId: topProduct?.id,
        targetProductTitle: topProduct?.title,
        targetProductBid: topProduct?.currentBid,
        amount: request.amount,
        currency: 'USD',
        status: 'succeeded',
        paymentMethod: 'dodo_payments',
        dodoPaymentId: paymentResponse.paymentId,
        metadata: {
          receiptNumber: paymentResponse.receiptNumber,
        },
        createdAt: new Date().toISOString(),
      };

      return {
        product: newProduct,
        categorySlug: request.categorySlug,
        amount: request.amount,
        topProduct,
        category,
        payment: newPaymentTransaction,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Payment failed');
    }
  }
);

// Async thunk to track real product clicks on external visit
export const recordProductClickThunk = createAsyncThunk(
  'outbid/recordClick',
  async (productId: string, { getState }) => {
    try {
      const state = getState() as { outbid: OutbidState };
      const prod = state.outbid.products.find((p) => p.id === productId);
      const currentClicks = (prod?.clicks || 0) + 1;

      await supabase
        .from('products')
        .update({ clicks: currentClicks })
        .eq('id', productId);

      return { productId, clicks: currentClicks };
    } catch (err) {
      console.warn('Click tracking error:', err);
      return null;
    }
  }
);

// Async thunk to track real product views on detail page visit
export const recordProductViewThunk = createAsyncThunk(
  'outbid/recordView',
  async (productId: string, { getState }) => {
    try {
      const state = getState() as { outbid: OutbidState };
      const prod = state.outbid.products.find((p) => p.id === productId);
      const currentViews = (prod?.views || 0) + 1;

      try {
        await supabase
          .from('products')
          .update({ views: currentViews })
          .eq('id', productId);
      } catch {
        // graceful fallback if column is not present
      }

      return { productId, views: currentViews };
    } catch (err) {
      console.warn('View tracking error:', err);
      return null;
    }
  }
);

// Async thunk to delete product
export const deleteProductThunk = createAsyncThunk(
  'outbid/deleteProduct',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { outbid: OutbidState };
      const product = state.outbid.products.find((p) => p.id === productId);
      if (!product) throw new Error('Product not found');

      // 1. Delete product from Supabase
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;

      // 2. Clean associated bids
      try {
        await supabase.from('bids').delete().eq('product_id', productId);
      } catch {}

      // 3. Recalculate category stats
      const remainingCatProducts = state.outbid.products.filter(
        (p) => p.categorySlug === product.categorySlug && p.id !== productId
      );
      const newTopBid = remainingCatProducts.length > 0
        ? Math.max(...remainingCatProducts.map((p) => p.currentBid))
        : 0;
      const newTotalVolume = remainingCatProducts.reduce((sum, p) => sum + p.currentBid, 0);

      try {
        await supabase
          .from('categories')
          .update({
            claim_count: remainingCatProducts.length,
            top_bid: newTopBid,
            total_volume: newTotalVolume,
            updated_at: 'Just now',
          })
          .eq('slug', product.categorySlug);
      } catch {}

      return {
        productId,
        categorySlug: product.categorySlug,
        newTopBid,
        newTotalVolume,
        remainingCount: remainingCatProducts.length,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete product');
    }
  }
);

const outbidSlice = createSlice({
  name: 'outbid',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        categorySlug?: string;
        targetProduct?: Product | null;
        customAmount?: number;
      }>
    ) => {
      const { categorySlug, targetProduct, customAmount } = action.payload;
      state.selectedCategoryForModal = categorySlug || targetProduct?.categorySlug || state.categories[0]?.slug || 'ai-agents-infrastructure';
      state.selectedTargetProduct = targetProduct || null;

      if (customAmount) {
        state.defaultBidAmount = customAmount;
      } else if (targetProduct) {
        state.defaultBidAmount = targetProduct.currentBid + 1;
      } else if (categorySlug) {
        const topProd = state.products.filter((p) => p.categorySlug === categorySlug)[0];
        state.defaultBidAmount = topProd ? topProd.currentBid + 1 : 100;
      } else {
        state.defaultBidAmount = 100;
      }

      state.isOutbidModalOpen = true;
    },
    closeModal: (state) => {
      state.isOutbidModalOpen = false;
      state.selectedTargetProduct = null;
    },
    syncExternalState: (
      state,
      action: PayloadAction<{
        categories?: Category[];
        products?: Product[];
        activities?: OutbidActivity[];
        payments?: PaymentTransaction[];
      }>
    ) => {
      if (action.payload.categories) {
        state.categories = action.payload.categories;
      }
      if (action.payload.products) {
        state.products = [...action.payload.products]
          .sort((a, b) => b.currentBid - a.currentBid)
          .map((p, idx) => ({ ...p, rank: idx + 1 }));
      }
      if (action.payload.activities) {
        state.activities = action.payload.activities;
      }
      if (action.payload.payments) {
        state.payments = action.payload.payments;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupabaseDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupabaseDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.categories = action.payload.categories;
          state.products = action.payload.products;
          state.activities = action.payload.activities;
          state.payments = action.payload.payments;
          state.revenueStats = action.payload.revenueStats;
        }
      })
      .addCase(fetchSupabaseDataThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(submitBidClaimThunk.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitBidClaimThunk.fulfilled, (state, action) => {
        state.isSubmitting = false;
        const { product, categorySlug, amount, topProduct, category, payment } = action.payload;

        const newNormUrl = product.url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
        const newDomain = product.domain?.toLowerCase() || newNormUrl;

        // 1. Filter out duplicates
        const remainingProducts = state.products.filter((p) => {
          const pNormUrl = p.url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
          const pDomain = p.domain?.toLowerCase() || pNormUrl;
          return p.id !== product.id && pNormUrl !== newNormUrl && pDomain !== newDomain;
        });

        // 2. Insert new product at top rank
        state.products = [product, ...remainingProducts]
          .sort((a, b) => b.currentBid - a.currentBid)
          .map((p, idx) => ({
            ...p,
            rank: idx + 1,
          }));

        // 3. Update category state
        state.categories = state.categories.map((c) => {
          if (c.slug === categorySlug) {
            const catProds = state.products.filter((p) => p.categorySlug === categorySlug);
            const highestCatBid = catProds.length > 0 ? catProds[0].currentBid : amount;
            return {
              ...c,
              claimCount: c.claimCount + 1,
              topBid: highestCatBid,
              totalVolume: c.totalVolume + amount,
              updatedAt: 'Just now',
            };
          }
          return c;
        });

        // 4. Update activities
        const newAct: OutbidActivity = {
          id: 'act_' + Date.now(),
          productId: product.id,
          productTitle: product.title,
          productFavicon: product.faviconUrl,
          productUrl: product.url,
          categorySlug: categorySlug,
          categoryName: category.name,
          amount: amount,
          previousProductTitle: topProduct?.title,
          previousAmount: topProduct?.currentBid,
          timestamp: 'Just now',
        };
        state.activities = [newAct, ...state.activities.slice(0, 49)];

        // 5. Append payment to state and update revenue stats
        if (payment) {
          state.payments = [payment, ...state.payments];
          state.revenueStats = {
            totalRevenue: state.revenueStats.totalRevenue + amount,
            totalTransactions: state.revenueStats.totalTransactions + 1,
            averageBidAmount: Math.round(
              (state.revenueStats.totalRevenue + amount) / (state.revenueStats.totalTransactions + 1)
            ),
            revenueLast24h: state.revenueStats.revenueLast24h + amount,
          };
        }

        state.isOutbidModalOpen = false;
        state.selectedTargetProduct = null;
      })
      .addCase(submitBidClaimThunk.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(recordProductClickThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { productId, clicks } = action.payload;
          state.products = state.products.map((p) =>
            p.id === productId ? { ...p, clicks } : p
          );
        }
      })
      .addCase(recordProductViewThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const { productId, views } = action.payload;
          state.products = state.products.map((p) =>
            p.id === productId ? { ...p, views } : p
          );
        }
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        const { productId, categorySlug, newTopBid, newTotalVolume, remainingCount } = action.payload;
        // Remove from products list and re-calculate rank
        state.products = state.products
          .filter((p) => p.id !== productId)
          .sort((a, b) => b.currentBid - a.currentBid)
          .map((p, idx) => ({ ...p, rank: idx + 1 }));

        // Update category stats
        state.categories = state.categories.map((c) => {
          if (c.slug === categorySlug) {
            return {
              ...c,
              claimCount: remainingCount,
              topBid: newTopBid,
              totalVolume: newTotalVolume,
              updatedAt: 'Just now',
            };
          }
          return c;
        });

        // Clean from activities
        state.activities = state.activities.filter((a) => a.productId !== productId);
      });
  },
});

export const { openModal, closeModal, syncExternalState } = outbidSlice.actions;
export default outbidSlice.reducer;
