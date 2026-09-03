import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Zap,
  Edit3,
  Save,
  CheckCircle,
  ShieldCheck,
  Trash2,
  Loader2,
  AlertCircle,
  Receipt,
  CreditCard,
  DollarSign,
  TrendingUp,
  FileText,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOutbid } from '../context/OutbidContext';
import { getProductSlug } from '../utils/slug';
import { SEO } from '../components/SEO';
import type { PaymentTransaction } from '../types';

interface DashboardPageProps {
  onSelectCategory?: (slug: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const { user, loading, loginWithGoogle, updateProfile } = useAuth();
  const { products, categories, payments, revenueStats, openOutbidModal, deleteProduct } = useOutbid();

  const [activeTab, setActiveTab] = useState<'listings' | 'invoices'>('listings');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<{ message: string; isError?: boolean } | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);

  // Find products strictly associated with current user's email
  const userProducts = user?.email
    ? products
        .filter((p) => p.userEmail && p.userEmail.toLowerCase() === user.email.toLowerCase())
        .sort((a, b) => b.currentBid - a.currentBid)
    : [];

  // Filter user's payment transactions
  const userPayments = user?.email
    ? payments
        .filter((p) => p.userEmail && p.userEmail.toLowerCase() === user.email.toLowerCase())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const totalSpent = userProducts.reduce((sum, p) => sum + p.currentBid, 0);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, avatarUrl });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-zinc-400 text-sm font-mono">Loading your founder profile...</p>
      </div>
    );
  }

  // 2. Unauthenticated Gate
  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
        <SEO
          title="Founder Dashboard Access"
          description="Sign in to view your claimed product ranks, Dodo Payment invoices, and revenue telemetry on Outbid by IndiHunt."
          noindex={true}
        />
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/5">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Founder Dashboard Access
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            Please sign in with Google to view your claimed product ranks, Dodo Payment invoices, and revenue telemetry.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={loginWithGoogle}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
            <span>Sign In with Google</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-sm transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = async (productId: string) => {
    setDeletingId(productId);
    setDeleteStatus(null);
    const res = await deleteProduct(productId);
    setDeletingId(null);
    setConfirmDeleteId(null);
    setDeleteStatus({ message: res.message, isError: !res.success });
    setTimeout(() => setDeleteStatus(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Delete Feedback Alert */}
      {deleteStatus && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in ${
            deleteStatus.isError
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {deleteStatus.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            <span>{deleteStatus.message}</span>
          </div>
          <button
            onClick={() => setDeleteStatus(null)}
            className="text-zinc-400 hover:text-white text-xs underline font-mono"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* User Profile & Spend Overview */}
      <div className="p-6 rounded-3xl bg-[#111114] border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=founder'}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border border-zinc-700 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{user?.name || 'Guest Builder'}</h1>
                <span className="p-0.5 text-emerald-400" title="Google Verified">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">{user?.email || 'Logged in via Google'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-left">
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">Total Claimed</span>
              <span className="text-base font-mono font-bold text-white">${totalSpent.toLocaleString()}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-left">
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">Active Listings</span>
              <span className="text-base font-mono font-bold text-emerald-400">{userProducts.length}</span>
            </div>
            <button
              onClick={() => {
                setName(user?.name || '');
                setAvatarUrl(user?.avatarUrl || '');
                setIsEditing(!isEditing);
              }}
              className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 animate-in fade-in">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Edit Public Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile to Supabase</span>
            </button>
          </form>
        )}

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Profile successfully updated in Supabase database!</span>
          </div>
        )}
      </div>

      {/* Platform & Dodo Payments Revenue Telemetry Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111114] border border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-mono text-zinc-500 block">Platform Total Volume</span>
            <span className="text-xl font-mono font-extrabold text-emerald-400">
              ${(revenueStats.totalRevenue || totalSpent).toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111114] border border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-mono text-zinc-500 block">Dodo Payments Invoices</span>
            <span className="text-xl font-mono font-extrabold text-amber-400">
              {revenueStats.totalTransactions || payments.length} Settled
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111114] border border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-mono text-zinc-500 block">Payment Gateway</span>
            <span className="text-sm font-semibold text-white flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Dodo Payments Active
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>My Claimed Listings ({userProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'invoices'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Dodo Invoices & Payments ({userPayments.length})</span>
        </button>
      </div>

      {/* TAB 1: User Listings */}
      {activeTab === 'listings' && (
        <div className="bg-[#111114] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Active Rankings</span>
            </h2>
            <button
              onClick={() => openOutbidModal()}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Claim Another Spot</span>
            </button>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {userProducts.map((prod) => {
              const cat = categories.find((c) => c.slug === prod.categorySlug);
              const isDeletingThis = deletingId === prod.id;
              const isConfirmingThis = confirmDeleteId === prod.id;

              return (
                <div
                  key={prod.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-black flex items-center justify-center flex-shrink-0">
                      #{prod.rank}
                    </span>

                    <img
                      src={prod.faviconUrl}
                      alt=""
                      className="w-5 h-5 rounded object-contain flex-shrink-0"
                    />

                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => navigate(`/product/${getProductSlug(prod.title, prod.id)}`)}
                        className="font-bold text-sm text-white hover:text-amber-400 hover:underline truncate block text-left"
                      >
                        {prod.title}
                      </button>
                      <p className="text-xs text-zinc-400 truncate max-w-md">{prod.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                        <span>
                          in{' '}
                          <button
                            type="button"
                            onClick={() =>
                              onSelectCategory ? onSelectCategory(prod.categorySlug) : navigate(`/category/${prod.categorySlug}`)
                            }
                            className="text-zinc-400 hover:text-white underline font-semibold"
                          >
                            {cat?.name || 'Category'}
                          </button>
                        </span>
                        <span>•</span>
                        <span>{prod.claimedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className="font-mono text-base font-bold text-emerald-400 mr-1">
                      ${prod.currentBid.toLocaleString()}
                    </span>

                    <button
                      onClick={() => openOutbidModal(prod.categorySlug, null, prod.currentBid + 50)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Boost</span>
                    </button>

                    {/* Delete / Confirm Delete Buttons */}
                    {isConfirmingThis ? (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <button
                          onClick={() => handleDelete(prod.id)}
                          disabled={isDeletingThis}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          {isDeletingThis ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <span>Confirm</span>
                          )}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          disabled={isDeletingThis}
                          className="px-2 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-750 text-zinc-400 text-xs font-medium border border-zinc-750"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(prod.id)}
                        title="Delete this listing"
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {userProducts.length === 0 && (
              <div className="p-12 text-center text-zinc-500 text-xs space-y-3">
                <p>You haven't claimed any spots yet.</p>
                <button
                  onClick={() => openOutbidModal()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-zinc-950 font-bold text-xs"
                >
                  Claim your first rank now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Dodo Payments Invoices & Receipts */}
      {activeTab === 'invoices' && (
        <div className="bg-[#111114] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Dodo Payments Transaction History</span>
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              Total Invoiced: <strong className="text-emerald-400 font-bold">${userPayments.reduce((s, p) => s + p.amount, 0).toLocaleString()}</strong>
            </span>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {userPayments.map((pay) => (
              <div
                key={pay.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/40 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white truncate max-w-sm">{pay.productTitle}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> Paid
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono flex-wrap">
                    <span>ID: {pay.id}</span>
                    <span>•</span>
                    <span>{new Date(pay.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-zinc-400">{pay.categoryName || pay.categorySlug}</span>
                    {pay.targetProductTitle && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400/90">Outbid: {pay.targetProductTitle}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono text-base font-black text-emerald-400">
                    ${pay.amount.toLocaleString()} {pay.currency}
                  </span>
                  <button
                    onClick={() => setSelectedReceipt(pay)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 border border-zinc-700 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}

            {userPayments.length === 0 && (
              <div className="p-12 text-center text-zinc-500 text-xs space-y-3">
                <p>No Dodo Payments recorded yet for this account.</p>
                <button
                  onClick={() => openOutbidModal()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold text-xs"
                >
                  Make your first outbid transaction
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="w-full max-w-md bg-[#16161b] border border-zinc-700 rounded-3xl p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-xs">
                  D
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Dodo Payment Receipt</h3>
                  <p className="text-[11px] font-mono text-zinc-400">{selectedReceipt.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Product Name</span>
                <span className="font-semibold text-white">{selectedReceipt.productTitle}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Category</span>
                <span className="font-semibold text-zinc-300">{selectedReceipt.categoryName || selectedReceipt.categorySlug}</span>
              </div>
              {selectedReceipt.targetProductTitle && (
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Outbid Target</span>
                  <span className="font-semibold text-amber-400">{selectedReceipt.targetProductTitle}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-zinc-400">
                <span>Billed To</span>
                <span className="font-mono text-zinc-300">{selectedReceipt.userEmail}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Date & Time</span>
                <span className="font-mono text-zinc-300">{new Date(selectedReceipt.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Payment Gateway</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Dodo Payments (Settled)
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between mt-4">
                <span className="font-bold text-zinc-300">Total Charged:</span>
                <span className="font-mono font-black text-lg text-emerald-400">
                  ${selectedReceipt.amount.toLocaleString()} USD
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
