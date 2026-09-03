import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Zap,
  ShieldCheck,
  Globe,
  Loader2,
  Lock,
  ChevronDown,
  Check,
  Search,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';
import { useAuth } from '../context/AuthContext';
import { scrapeProductMetadata, normalizeUrl, sanitizeInput, isValidHttpUrl } from '../services/scraper';
import { CategoryIcon } from './CategoryIcon';

export const OutbidModal: React.FC = () => {
  const {
    isOutbidModalOpen,
    closeOutbidModal,
    categories,
    getProductsByCategory,
    selectedCategoryForModal,
    selectedTargetProduct,
    submitBidClaim,
    isSubmitting,
    defaultBidAmount,
  } = useOutbid();

  const { user, loginWithGoogle } = useAuth();

  const [checkoutStep, setCheckoutStep] = useState<'form' | 'dodo_checkout' | 'success'>('form');
  const [categorySlug, setCategorySlug] = useState<string>(selectedCategoryForModal || 'ai-agents-infrastructure');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [categorySearch, setCategorySearch] = useState<string>('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const [productUrl, setProductUrl] = useState<string>('');
  const [productTitle, setProductTitle] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productFavicon, setProductFavicon] = useState<string>('');
  const [bidAmount, setBidAmount] = useState<number>(defaultBidAmount || 100);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [scrapedSuccess, setScrapedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successReceipt, setSuccessReceipt] = useState<{ amount: number; title: string; category: string } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync modal defaults when opened
  useEffect(() => {
    if (selectedCategoryForModal) {
      setCategorySlug(selectedCategoryForModal);
    }
    if (defaultBidAmount) {
      setBidAmount(defaultBidAmount);
    }
    if (isOutbidModalOpen) {
      setCheckoutStep('form');
      setErrorMessage('');
    }
  }, [selectedCategoryForModal, defaultBidAmount, isOutbidModalOpen]);

  // Recalculate minimum required bid based on target product or category leader
  const categoryProducts = getProductsByCategory(categorySlug);
  const currentLeader = categoryProducts[0];
  const targetItem = selectedTargetProduct || currentLeader;
  const minRequiredBid = targetItem ? targetItem.currentBid + 1 : 100;
  const currentCategory = categories.find((c) => c.slug === categorySlug);

  // Automatically update bid amount to outbid price when category or target changes
  useEffect(() => {
    if (minRequiredBid > 0) {
      setBidAmount((prev) => (prev < minRequiredBid ? minRequiredBid : prev));
    }
  }, [minRequiredBid, categorySlug]);

  // Auto scrape URL when user pastes or types a valid-looking URL
  const handleUrlChange = async (url: string) => {
    setProductUrl(url);
    setErrorMessage('');

    if (url.length > 4 && (url.includes('.') || url.startsWith('http'))) {
      setIsScraping(true);
      try {
        const meta = await scrapeProductMetadata(url);
        setProductTitle(meta.title);
        setProductDescription(meta.description);
        setProductFavicon(meta.faviconUrl);
        setScrapedSuccess(true);
      } catch (err) {
        console.error('Scrape error:', err);
      } finally {
        setIsScraping(false);
      }
    }
  };

  const handleQuickAdd = (increment: number) => {
    setBidAmount((prev) => Math.max(minRequiredBid, prev + increment));
  };

  const handleProceedToDodoCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user) {
      setErrorMessage('Please sign in with Google to place a bid claim.');
      return;
    }

    if (!productUrl || !isValidHttpUrl(productUrl)) {
      setErrorMessage('Please enter a valid HTTP or HTTPS product website URL');
      return;
    }

    const cleanTitle = sanitizeInput(productTitle, 120);
    if (!cleanTitle || cleanTitle.length < 2) {
      setErrorMessage('Please enter a valid product title (minimum 2 characters)');
      return;
    }

    if (bidAmount < minRequiredBid) {
      setErrorMessage(`Bid must be at least $${minRequiredBid.toLocaleString()} to outbid target spot`);
      return;
    }

    // Move to Dodo Checkout review step
    setCheckoutStep('dodo_checkout');
  };

  const handleFinalDodoPayment = async () => {
    setErrorMessage('');

    const cleanTitle = sanitizeInput(productTitle, 120);
    const cleanDesc = sanitizeInput(productDescription, 400);
    const safeUrl = normalizeUrl(productUrl);
    const safeFavicon =
      productFavicon && isValidHttpUrl(productFavicon)
        ? productFavicon
        : `https://www.google.com/s2/favicons?domain=${new URL(safeUrl).hostname}&sz=128`;

    const res = await submitBidClaim(
      {
        categorySlug,
        productTitle: cleanTitle,
        productUrl: safeUrl,
        productFavicon: safeFavicon,
        productDescription: cleanDesc || 'Claimed with Outbid attention marketplace.',
        amount: Math.round(bidAmount),
        targetProductId: targetItem?.id,
        targetProductTitle: targetItem?.title,
        targetProductBid: targetItem?.currentBid,
        targetRank: targetItem?.rank || 1,
      },
      user?.email,
      user?.id
    );

    if (res.success) {
      setSuccessReceipt({
        amount: Math.round(bidAmount),
        title: cleanTitle,
        category: currentCategory?.name || categorySlug,
      });
      setCheckoutStep('success');
    } else {
      setErrorMessage(res.message);
    }
  };

  if (!isOutbidModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#111114] border border-zinc-800 rounded-3xl shadow-2xl my-auto animate-in fade-in zoom-in-95 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeOutbidModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>Dodo Payments Checkout</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Verified Gateway</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {checkoutStep === 'dodo_checkout'
              ? 'Review & Complete Dodo Payment'
              : checkoutStep === 'success'
              ? 'Payment Confirmed!'
              : selectedTargetProduct
              ? `Outbid Rank #${selectedTargetProduct.rank}`
              : 'Claim Your Rank & Outbid'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {checkoutStep === 'dodo_checkout'
              ? `Review your outbid ticket before processing via Dodo Payments.`
              : checkoutStep === 'success'
              ? `Your product is now officially live on the leaderboard.`
              : selectedTargetProduct
              ? `Outbid ${selectedTargetProduct.title} to take Rank #${selectedTargetProduct.rank}.`
              : 'Claim the #1 spot to capture organic founder backlinks & LLM attention.'}
          </p>
        </div>

        {/* Scrollable Form / Checkout Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {!user ? (
            <div className="py-8 px-4 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/5">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">Sign In with Google to Outbid</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Authentication is required to link payments with your founder profile and grant dofollow backlink indexing.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          ) : checkoutStep === 'success' ? (
            /* STEP 3: SUCCESS CONFIRMATION */
            <div className="py-6 px-4 text-center space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">Outbid Successful!</h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Your payment of <strong className="text-emerald-400 font-mono">${successReceipt?.amount}</strong> was verified and logged via Dodo Payments.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Product</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">{successReceipt?.title}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Category</span>
                  <span className="font-semibold text-zinc-300">{successReceipt?.category}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Gateway Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Dodo Payment Settled
                  </span>
                </div>
              </div>

              <button
                onClick={closeOutbidModal}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm transition-all"
              >
                View Updated Leaderboard
              </button>
            </div>
          ) : checkoutStep === 'dodo_checkout' ? (
            /* STEP 2: DODO PAYMENTS CHECKOUT REVIEW */
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-150">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Dodo Branded Summary Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-[#16161b] to-zinc-900 border border-amber-500/30 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-xs">
                      D
                    </div>
                    <div>
                      <span className="font-bold text-xs text-white block">Dodo Payments Checkout</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Invoice Summary</span>
                    </div>
                  </div>
                  <span className="font-mono text-lg font-black text-emerald-400">
                    ${bidAmount.toLocaleString()} USD
                  </span>
                </div>

                {/* Target Product Outbid Details */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-zinc-400">Outbidding:</span>
                    <span className="font-semibold text-amber-400 truncate max-w-[210px]">
                      {targetItem ? `${targetItem.title} ($${targetItem.currentBid.toLocaleString()})` : 'Category Leader Spot'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-zinc-400">Your New Listing:</span>
                    <span className="font-semibold text-white truncate max-w-[210px]">{productTitle}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-zinc-400">Category & Target Rank:</span>
                    <span className="font-semibold text-zinc-300">
                      {currentCategory?.name || categorySlug} (Rank #{targetItem?.rank || 1})
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-zinc-400">Founder Account:</span>
                    <span className="font-mono text-zinc-400 truncate max-w-[210px]">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Supported Payment Methods on Dodo */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-300">Supported Payment Methods:</span>
                  <span className="text-[11px] font-mono text-emerald-400">Global & Instant</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-400">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-[11px] text-zinc-300 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Credit / Debit Cards
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-[11px] text-zinc-300">
                    Apple Pay
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-[11px] text-zinc-300">
                    Google Pay
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-[11px] text-zinc-300">
                    Crypto / Web3
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('form')}
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalDodoPayment}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                      <span>Confirming Dodo Checkout...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ${bidAmount.toLocaleString()} with Dodo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* STEP 1: FORM CONFIGURATION */
            <>
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleProceedToDodoCheckout} className="space-y-4">
                {/* Target Category */}
                <div className="relative" ref={categoryDropdownRef}>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Select Category
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-zinc-600 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors flex items-center justify-between gap-3 text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {currentCategory && (
                        <CategoryIcon
                          name={currentCategory.icon}
                          className="w-4 h-4 text-amber-400 flex-shrink-0"
                        />
                      )}
                      <span className="font-semibold text-zinc-100 truncate">
                        {currentCategory?.name || 'Select Category'}
                      </span>
                      {currentCategory && (
                        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md hidden sm:inline flex-shrink-0">
                          #1: ${currentCategory.topBid.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                        isCategoryDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-[#141418] border border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="p-2 border-b border-zinc-800 bg-zinc-950/60">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="Filter categories..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto divide-y divide-zinc-800/40 p-1">
                        {categories
                          .filter(
                            (c) =>
                              c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
                              c.slug.toLowerCase().includes(categorySearch.toLowerCase())
                          )
                          .map((cat) => {
                            const isSelected = cat.slug === categorySlug;
                            return (
                              <button
                                key={cat.slug}
                                type="button"
                                onClick={() => {
                                  setCategorySlug(cat.slug);
                                  setIsCategoryDropdownOpen(false);
                                  setCategorySearch('');
                                }}
                                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                                  isSelected
                                    ? 'bg-amber-500/10 text-amber-400 font-bold'
                                    : 'hover:bg-zinc-800/70 text-zinc-300'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <CategoryIcon
                                    name={cat.icon}
                                    className={`w-4 h-4 flex-shrink-0 ${
                                      isSelected ? 'text-amber-400' : 'text-zinc-400'
                                    }`}
                                  />
                                  <span className="truncate text-left">{cat.name}</span>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  <span className="text-[11px] font-mono text-zinc-500">
                                    #1: ${cat.topBid.toLocaleString()}
                                  </span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Target Spot Spotlight */}
                {selectedTargetProduct ? (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">
                          Target: Rank #{selectedTargetProduct.rank}
                        </span>
                        <img
                          src={selectedTargetProduct.faviconUrl}
                          alt=""
                          className="w-4 h-4 rounded object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="font-semibold text-zinc-200 truncate max-w-[180px]">
                          {selectedTargetProduct.title}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-amber-400">
                        ${selectedTargetProduct.currentBid.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      ⚡ Outbid <strong className="text-white">{selectedTargetProduct.title}</strong> by paying at least{' '}
                      <strong className="text-emerald-400">${minRequiredBid.toLocaleString()}</strong> through Dodo Payments.
                    </p>
                  </div>
                ) : currentLeader ? (
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={currentLeader.faviconUrl}
                        alt=""
                        className="w-4 h-4 rounded object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="text-zinc-400">Current #1 Leader:</span>
                      <span className="font-semibold text-zinc-200 truncate max-w-[160px]">
                        {currentLeader.title}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-amber-400">
                      ${currentLeader.currentBid.toLocaleString()}
                    </span>
                  </div>
                ) : null}

                {/* Product Website URL Input with Scraper */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Your Product / Startup URL</span>
                    {isScraping && (
                      <span className="text-amber-400 flex items-center gap-1 font-normal lowercase">
                        <Loader2 className="w-3 h-3 animate-spin" /> Auto-scraping...
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="https://yourstartup.com"
                      value={productUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder-zinc-500"
                      required
                    />
                  </div>
                </div>

                {/* Scraped Preview / Editable Fields */}
                {(productTitle || scrapedSuccess) && (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {productFavicon ? (
                          <img src={productFavicon} alt="" className="w-6 h-6 object-contain" />
                        ) : (
                          <Globe className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={productTitle}
                          onChange={(e) => setProductTitle(e.target.value)}
                          placeholder="Product Title / Headline"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Short pitch / description..."
                        rows={2}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Outbid Amount Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                      Your Outbid Amount (USD)
                    </label>
                    <span className="text-xs text-zinc-400 font-mono">
                      Min to take spot: <strong className="text-emerald-400">${minRequiredBid.toLocaleString()}</strong>
                    </span>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-zinc-400 text-lg">
                      $
                    </span>
                    <input
                      type="number"
                      min={minRequiredBid}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-xl font-bold focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Quick Increment Buttons */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setBidAmount(minRequiredBid)}
                      className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-medium border border-zinc-700 transition-colors"
                    >
                      Min (${minRequiredBid})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(25)}
                      className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-medium border border-zinc-700 transition-colors"
                    >
                      +$25
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(100)}
                      className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-medium border border-zinc-700 transition-colors"
                    >
                      +$100
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(500)}
                      className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-medium border border-zinc-700 transition-colors"
                    >
                      +$500
                    </button>
                  </div>
                </div>

                {/* Dodo Payments Trust Badge */}
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Processed via <strong>Dodo Payments</strong></span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                      <Lock className="w-3 h-3 text-zinc-500" />
                      <span>256-bit SSL</span>
                    </div>
                  </div>
                </div>

                {/* Continue to Dodo Checkout Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-zinc-950 flex-shrink-0" />
                  <span>Proceed to Dodo Payment (${bidAmount.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
