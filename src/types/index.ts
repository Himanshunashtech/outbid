export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  claimCount: number;
  hotRank?: number;
  totalVolume: number;
  topBid: number;
  updatedAt: string;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  url: string;
  faviconUrl: string;
  description: string;
  categorySlug: string;
  categoryName?: string;
  currentBid: number;
  rank: number;
  claimedAt: string;
  clicks?: number;
  views?: number;
  timeAgo?: string;
  domain?: string;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  verified?: boolean;
}

export interface OutbidActivity {
  id: string;
  productId: string;
  productTitle: string;
  productFavicon: string;
  productUrl: string;
  categorySlug: string;
  categoryName: string;
  amount: number;
  previousProductTitle?: string;
  previousAmount?: number;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  totalSpent: number;
  activeClaimsCount: number;
}

export interface ScrapedMetadata {
  title: string;
  description: string;
  faviconUrl: string;
  siteName?: string;
  url: string;
}

export interface BidClaimRequest {
  categorySlug: string;
  productTitle: string;
  productUrl: string;
  productFavicon: string;
  productDescription: string;
  amount: number;
  targetRank?: number;
  targetProductId?: string;
  targetProductTitle?: string;
  targetProductBid?: number;
}

export interface PaymentTransaction {
  id: string;
  userId?: string;
  userEmail: string;
  productId: string;
  productTitle: string;
  productUrl: string;
  categorySlug: string;
  categoryName?: string;
  targetProductId?: string;
  targetProductTitle?: string;
  targetProductBid?: number;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'failed' | 'pending';
  paymentMethod: string;
  dodoPaymentId?: string;
  dodoCheckoutSessionId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface PlatformRevenueStats {
  totalRevenue: number;
  totalTransactions: number;
  averageBidAmount: number;
  revenueLast24h: number;
}

