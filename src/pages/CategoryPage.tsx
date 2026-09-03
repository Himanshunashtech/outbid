import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Trophy } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';
import { CategoryIcon } from '../components/CategoryIcon';
import { LeaderboardItem } from '../components/LeaderboardItem';
import { Pagination } from '../components/Pagination';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getProductSlug } from '../utils/slug';

interface CategoryPageProps {
  categorySlug?: string;
  onBack?: () => void;
  onSelectProduct?: (id: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug: propSlug, onBack, onSelectProduct }) => {
  const params = useParams<{ categorySlug?: string }>();
  const navigate = useNavigate();
  const categorySlug = propSlug || params.categorySlug || '';

  const { getCategoryBySlug, getProductsByCategory, openOutbidModal } = useOutbid();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 50;

  const category = getCategoryBySlug(categorySlug);
  const products = getProductsByCategory(categorySlug);
  const leadingProduct = products[0];
  const nextMinBid = leadingProduct ? leadingProduct.currentBid + 1 : 100;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleProductClick = (idOrSlug: string) => {
    if (onSelectProduct) {
      onSelectProduct(idOrSlug);
    } else {
      const prod = products.find((p) => p.id === idOrSlug);
      const target = prod ? getProductSlug(prod.title, prod.id) : idOrSlug;
      navigate(`/product/${target}`);
    }
  };

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <SEO
          title="Category Not Found"
          description="Category not found on Outbid by IndiHunt."
          noindex={true}
        />
        <h2 className="text-2xl font-bold text-white mb-4">Category not found</h2>
        <button
          onClick={handleBack}
          className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-sm font-medium"
        >
          Return to Categories
        </button>
      </div>
    );
  }

  // Schema for ItemList Category Leaderboard
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} Rankings & Leaderboard`,
    description: category.description || `Live attention rankings and top verified products in ${category.name}.`,
    itemListElement: products.slice(0, 10).map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.title,
      url: typeof window !== 'undefined'
        ? `${window.location.origin}/product/${getProductSlug(prod.title, prod.id)}`
        : `https://outbid.indihunt.in/product/${getProductSlug(prod.title, prod.id)}`,
    })),
  };

  const breadcrumbsList = [
    {
      name: category.name,
      item: `/category/${category.slug}`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Dynamic SEO */}
      <SEO
        title={`${category.name} Leaderboard | Top Products & Live Bids`}
        description={category.description || `Discover the highest ranked products in ${category.name} on Outbid by IndiHunt. Claim the #1 position, outbid competitors, and capture backlink traffic.`}
        breadcrumbs={breadcrumbsList}
        jsonLd={categorySchema}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-zinc-850">
        <Breadcrumbs
          items={[
            {
              label: category.name,
              isCurrent: true,
            },
          ]}
        />
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Categories</span>
        </button>
      </div>

      {/* Category Header Banner */}
      <div className="bg-[#111114] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 flex-shrink-0">
              <CategoryIcon name={category.icon} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                  Category Leaderboard
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400">{category.updatedAt}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-xl">
                {category.description || 'Live attention rankings for this category.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left">
              <span className="text-[11px] text-zinc-500 block uppercase font-mono">Total Volume</span>
              <span className="text-lg font-mono font-bold text-white">
                ${category.totalVolume.toLocaleString()}
              </span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left">
              <span className="text-[11px] text-zinc-500 block uppercase font-mono">Total Claims</span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                {category.claimCount}
              </span>
            </div>
            <button
              onClick={() => openOutbidModal(category.slug, leadingProduct, nextMinBid)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-zinc-950 font-black text-sm shadow-xl shadow-rose-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-zinc-950" />
              <span>Outbid #1 (${nextMinBid.toLocaleString()})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Section with 50 items per page pagination */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Category Rankings</span>
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            {products.length} active listings
          </span>
        </div>

        <div className="bg-[#111114] border border-zinc-850 rounded-3xl p-2 sm:p-4 shadow-2xl divide-y divide-zinc-850">
          {paginatedProducts.map((prod, idx) => {
            const actualRank = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
            return (
              <LeaderboardItem
                key={prod.id}
                product={prod}
                rankDisplay={actualRank}
                onSelectProduct={handleProductClick}
              />
            );
          })}

          {paginatedProducts.length === 0 && (
            <div className="p-12 text-center text-zinc-500 text-sm">
              No products have claimed this category yet. Be the founding #1 spot!
            </div>
          )}
        </div>

        {/* Pagination (50 products per page) */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          totalItems={products.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};
