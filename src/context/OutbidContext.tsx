import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchSupabaseDataThunk,
  submitBidClaimThunk,
  recordProductClickThunk,
  recordProductViewThunk,
  deleteProductThunk,
  openModal,
  closeModal,
} from '../store/outbidSlice';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import type {
  Category,
  Product,
  OutbidActivity,
  BidClaimRequest,
  PaymentTransaction,
  PlatformRevenueStats,
} from '../types';

interface OutbidContextType {
  categories: Category[];
  products: Product[];
  activities: OutbidActivity[];
  payments: PaymentTransaction[];
  revenueStats: PlatformRevenueStats;
  onlineCount: number;
  totalLiveClaims: number;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getProductsByCategory: (slug: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlugOrId: (slugOrId: string) => Product | undefined;
  submitBidClaim: (
    request: BidClaimRequest,
    userEmail?: string,
    userId?: string
  ) => Promise<{ success: boolean; message: string }>;
  recordClick: (productId: string) => Promise<void>;
  recordView: (productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<{ success: boolean; message: string }>;
  isSubmitting: boolean;
  selectedCategoryForModal: string | null;
  selectedTargetProduct: Product | null;
  isOutbidModalOpen: boolean;
  openOutbidModal: (
    categorySlug?: string,
    targetProduct?: Product | null,
    defaultAmount?: number
  ) => void;
  closeOutbidModal: () => void;
  defaultBidAmount: number;
}

const OutbidContext = createContext<OutbidContextType | undefined>(undefined);

export const OutbidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const {
    categories,
    products,
    activities,
    payments,
    revenueStats,
    isSubmitting,
    isOutbidModalOpen,
    selectedCategoryForModal,
    selectedTargetProduct,
    defaultBidAmount,
  } = useAppSelector((state) => state.outbid);

  const [onlineCount, setOnlineCount] = useState<number>(1);

  // 1. Initial fetch & Supabase Realtime subscription + Presence Tracking
  useEffect(() => {
    dispatch(fetchSupabaseDataThunk());

    if (isSupabaseConfigured) {
      // Channel 1: Database Realtime Replication
      const channel = supabase
        .channel('schema-db-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          () => {
            dispatch(fetchSupabaseDataThunk());
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'bids' },
          () => {
            dispatch(fetchSupabaseDataThunk());
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'categories' },
          () => {
            dispatch(fetchSupabaseDataThunk());
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'payments' },
          () => {
            dispatch(fetchSupabaseDataThunk());
          }
        )
        .subscribe();

      // Channel 2: Realtime Live Presence (Tracks active browsers / tabs live!)
      const presenceKey = `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const presenceChannel = supabase.channel('online-presence', {
        config: {
          presence: {
            key: presenceKey,
          },
        },
      });

      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          const activeKeysCount = Object.keys(state).length;
          setOnlineCount(Math.max(1, activeKeysCount));
        })
        .on('presence', { event: 'join' }, () => {
          const state = presenceChannel.presenceState();
          const activeKeysCount = Object.keys(state).length;
          setOnlineCount(Math.max(1, activeKeysCount));
        })
        .on('presence', { event: 'leave' }, () => {
          const state = presenceChannel.presenceState();
          const activeKeysCount = Object.keys(state).length;
          setOnlineCount(Math.max(1, activeKeysCount));
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await presenceChannel.track({
              onlineAt: new Date().toISOString(),
            });
          }
        });

      // Periodic background poll every 6s to ensure absolute consistency across all devices
      const pollInterval = setInterval(() => {
        dispatch(fetchSupabaseDataThunk());
      }, 6000);

      return () => {
        supabase.removeChannel(channel);
        supabase.removeChannel(presenceChannel);
        clearInterval(pollInterval);
      };
    }
  }, [dispatch]);

  const getCategoryBySlug = (slug: string) => {
    if (!slug) return undefined;
    const clean = slug.toLowerCase().trim();
    return categories.find(
      (c) =>
        c.slug.toLowerCase() === clean ||
        c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === clean ||
        c.id.toLowerCase() === clean
    );
  };

  const getProductsByCategory = (slug: string) => {
    const cat = getCategoryBySlug(slug);
    const targetSlug = cat ? cat.slug : slug;
    return products
      .filter((p) => p.categorySlug === targetSlug)
      .sort((a, b) => b.currentBid - a.currentBid)
      .map((p, idx) => ({
        ...p,
        rank: idx + 1,
      }));
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const getProductBySlugOrId = (slugOrId: string) => {
    if (!slugOrId) return undefined;
    const clean = slugOrId.toLowerCase().trim();

    // 1. Exact ID match
    const byId = products.find((p) => p.id.toLowerCase() === clean);
    if (byId) return byId;

    // 2. Exact slug match
    const bySlug = products.find((p) => {
      const baseTitle = p.title.split('—')[0].split('|')[0].trim().toLowerCase();
      const slug = baseTitle.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return slug === clean;
    });
    if (bySlug) return bySlug;

    // 3. Full title slug match
    const byFullSlug = products.find((p) => {
      const fullSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return fullSlug === clean;
    });
    if (byFullSlug) return byFullSlug;

    // 4. Case-insensitive title substring match
    return products.find((p) => p.title.toLowerCase().includes(clean));
  };

  const openOutbidModal = (
    categorySlug?: string,
    targetProduct?: Product | null,
    customAmount?: number
  ) => {
    dispatch(
      openModal({
        categorySlug,
        targetProduct,
        customAmount,
      })
    );
  };

  const closeOutbidModal = () => {
    dispatch(closeModal());
  };

  const submitBidClaim = async (
    request: BidClaimRequest,
    userEmail?: string,
    userId?: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await dispatch(
        submitBidClaimThunk({
          request,
          userEmail,
          userId,
        })
      ).unwrap();

      return {
        success: true,
        message: `Successfully claimed Rank with $${res.amount.toLocaleString()}!`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: typeof err === 'string' ? err : err?.message || 'Transaction failed. Please try again.',
      };
    }
  };

  const recordClick = async (productId: string) => {
    await dispatch(recordProductClickThunk(productId));
  };

  const recordView = async (productId: string) => {
    await dispatch(recordProductViewThunk(productId));
  };

  const deleteProduct = async (productId: string) => {
    try {
      await dispatch(deleteProductThunk(productId)).unwrap();
      return {
        success: true,
        message: 'Product successfully deleted from leaderboard.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: typeof err === 'string' ? err : err?.message || 'Failed to delete product',
      };
    }
  };

  // Exact live real count from database
  const totalLiveClaims = products.length > 0 ? products.length : categories.reduce((sum, c) => sum + c.claimCount, 0);

  return (
    <OutbidContext.Provider
      value={{
        categories,
        products,
        activities,
        payments,
        revenueStats,
        onlineCount,
        totalLiveClaims,
        getCategoryBySlug,
        getProductsByCategory,
        getProductById,
        getProductBySlugOrId,
        submitBidClaim,
        recordClick,
        recordView,
        deleteProduct,
        isSubmitting,
        selectedCategoryForModal,
        selectedTargetProduct,
        isOutbidModalOpen,
        openOutbidModal,
        closeOutbidModal,
        defaultBidAmount,
      }}
    >
      {children}
    </OutbidContext.Provider>
  );
};

export function useOutbid() {
  const context = useContext(OutbidContext);
  if (!context) {
    throw new Error('useOutbid must be used within an OutbidProvider');
  }
  return context;
}
