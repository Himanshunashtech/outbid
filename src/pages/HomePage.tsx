import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flame, Zap, LayoutGrid, ListOrdered } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';
import { TodayTopRanking } from '../components/TodayTopRanking';
import { LeaderboardItem } from '../components/LeaderboardItem';
import { CategoryCard } from '../components/CategoryCard';
import { Pagination } from '../components/Pagination';
import { SEO } from '../components/SEO';
import { getProductSlug } from '../utils/slug';

interface HomePageProps {
  onSelectCategory?: (slug: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectCategory, onSelectProduct }) => {
  const navigate = useNavigate();
  const { categories, products, openOutbidModal } = useOutbid();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'ranked-list' | 'category-cards'>('ranked-list');

  const ITEMS_PER_PAGE = 50;

  const handleSelectCategory = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      navigate(`/category/${slug}`);
    }
  };

  const handleSelectProduct = (productId: string) => {
    if (onSelectProduct) {
      onSelectProduct(productId);
    } else {
      const prod = products.find((p) => p.id === productId);
      const slug = prod ? getProductSlug(prod.title, prod.id) : productId;
      navigate(`/product/${slug}`);
    }
  };

  // Filter products by search query and category, always sorted by highest bid on top
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        if (selectedCategorySlug !== 'all' && p.categorySlug !== selectedCategorySlug) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.currentBid - a.currentBid);
  }, [products, searchQuery, selectedCategorySlug]);

  // Total pages for 50 items per page
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const showPodium = currentPage === 1 && !searchQuery;

  // Paginated products slice: when podium is displayed at the top, table below starts from rank #4 so no product is ever shown twice
  const paginatedProducts = useMemo(() => {
    if (showPodium && filteredProducts.length > 3) {
      return filteredProducts.slice(3, 3 + ITEMS_PER_PAGE);
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, showPodium]);

  // Top 3 for Today's ranking cards (always highest bids)
  const topThree = useMemo(() => {
    if (selectedCategorySlug !== 'all') {
      return products
        .filter((p) => p.categorySlug === selectedCategorySlug)
        .sort((a, b) => b.currentBid - a.currentBid)
        .slice(0, 3);
    }
    return [...products]
      .sort((a, b) => b.currentBid - a.currentBid)
      .slice(0, 3);
  }, [products, selectedCategorySlug]);

  // Reset page to 1 when changing filters
  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-10 pb-24">
      {/* Dynamic SEO */}
      <SEO
        title="Live Attention Marketplace & Category Leaderboards"
        description="Every category has its own ranking. Claim your spot, outbid competitors, and capture high-intent backlink traffic and verified clicks on Outbid by IndiHunt."
      />

      {/* Hero Section */}
      <section className="relative pt-8 pb-4 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div>
          <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="truncate">Real-time Attention Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Every category has its own ranking.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500">
              Pick one to see who leads it.
            </span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The permanent billboard for ambitious startups and creators. Outbid the current #1 to capture prime spotlight, high-intent traffic, and permanent backlinks.
          </p>
        </div>

        {/* Hero Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search 28 categories or products (e.g. AI Agents, Outrank, SEO, FloPay)..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500/80 shadow-2xl transition-all"
          />
        </div>

        {/* Categories Bar & View Mode Controls Bar */}
        <div className="flex flex-col gap-4 mt-8 pt-2">
          {/* Categories Pill Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar w-full">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategorySlug === 'all'
                  ? 'bg-white text-zinc-950 font-bold shadow-md'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 flex items-center gap-1.5 ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span>{cat.name}</span>
                {cat.hotRank && cat.hotRank <= 3 && (
                  <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
                )}
              </button>
            ))}
          </div>

          {/* Sub-header controls row with View Mode Switcher and Quick Count */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-850/80">
            <div className="text-xs text-zinc-400 text-left">
              <span>Showing: </span>
              <strong className="text-zinc-200">
                {selectedCategorySlug === 'all'
                  ? 'All 28 Categories'
                  : categories.find((c) => c.slug === selectedCategorySlug)?.name}
              </strong>
              <span className="text-zinc-500"> ({filteredProducts.length} listings)</span>
            </div>

            {/* Segmented View Switcher */}
            <div className="inline-flex items-center bg-[#18181b] border border-zinc-700/80 rounded-xl p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('ranked-list')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  viewMode === 'ranked-list'
                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
                <span>Ranked List</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('category-cards')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  viewMode === 'category-cards'
                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                <span>Category Cards</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === 'ranked-list' ? (
          <div className="space-y-6">
            {/* Today's Top Ranking Podium */}
            {currentPage === 1 && !searchQuery && (
              <TodayTopRanking
                topProducts={topThree}
                onSeeAll={() => setViewMode('category-cards')}
                onSelectCategory={handleSelectCategory}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {/* Vertical Ranked Leaderboard List */}
            <div className="bg-[#111114] border border-zinc-850 rounded-3xl p-2 sm:p-4 shadow-2xl divide-y divide-zinc-850">
              {paginatedProducts.map((product) => {
                const actualRank = filteredProducts.findIndex((p) => p.id === product.id) + 1;
                return (
                  <LeaderboardItem
                    key={product.id}
                    product={product}
                    rankDisplay={actualRank}
                    onSelectCategory={handleSelectCategory}
                    onSelectProduct={handleSelectProduct}
                  />
                );
              })}

              {paginatedProducts.length === 0 && (
                <div className="py-16 text-center text-zinc-500 text-sm">
                  No products found matching your search.
                </div>
              )}
            </div>

            {/* 50 Products Per Page Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        ) : (
          /* Category Cards Grid View */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...categories]
                .sort((a, b) => (b.topBid || 0) - (a.topBid || 0))
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    products={products.filter((p) => p.categorySlug === category.slug)}
                    onSelectCategory={handleSelectCategory}
                    onSelectProduct={handleSelectProduct}
                  />
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-zinc-800 p-8 sm:p-10 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Ready to outbid your rivals?
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mb-5">
              Paste your link, grab your high-resolution favicon, pay via Dodo Payments, and claim your #1 spot instantly.
            </p>
            <button
              onClick={() => openOutbidModal()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-zinc-950 font-black text-sm shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-zinc-950" />
              <span>Claim Rank #1 Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
