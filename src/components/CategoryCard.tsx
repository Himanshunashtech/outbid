import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, Flame, Zap } from 'lucide-react';
import type { Category, Product } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useOutbid } from '../context/OutbidContext';
import { getProductSlug } from '../utils/slug';

interface CategoryCardProps {
  category: Category;
  products: Product[];
  onSelectCategory?: (slug: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  products,
  onSelectCategory,
  onSelectProduct,
}) => {
  const navigate = useNavigate();
  const { openOutbidModal } = useOutbid();

  // Top 3 products for this category (highest bids on top)
  const topProducts = [...products].sort((a, b) => b.currentBid - a.currentBid).slice(0, 3);
  const leadingProduct = topProducts[0];
  const nextMinBid = leadingProduct ? leadingProduct.currentBid + 1 : 100;

  const handleCategoryClick = () => {
    if (onSelectCategory) {
      onSelectCategory(category.slug);
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  const handleProductClick = (prod: Product) => {
    if (onSelectProduct) {
      onSelectProduct(prod.id);
    } else {
      const slug = getProductSlug(prod.title, prod.id);
      navigate(`/product/${slug}`);
    }
  };

  return (
    <div className="group relative bg-[#111114] hover:bg-[#141418] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-black/60">
      {/* Category Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-colors">
              <CategoryIcon name={category.icon} className="w-5 h-5" />
            </div>
            <div>
              <button
                onClick={handleCategoryClick}
                className="font-bold text-base text-zinc-100 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 line-clamp-1"
              >
                <span>{category.name}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                <span className="font-mono text-zinc-300">{category.claimCount} claims</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500">{category.updatedAt}</span>
              </div>
            </div>
          </div>

          {category.hotRank && category.hotRank <= 3 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-tight bg-gradient-to-r from-rose-500/10 to-amber-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
              #{category.hotRank} hottest
            </span>
          )}
        </div>

        {/* Podium Rank Entries */}
        <div className="space-y-2 mt-4">
          {topProducts.map((prod, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            let rankBadgeColor = 'text-zinc-400 bg-zinc-800/80 border-zinc-700';
            let rankGlow = '';
            if (isFirst) {
              rankBadgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30 font-extrabold';
              rankGlow = 'border-amber-500/20 bg-amber-500/[0.02]';
            } else if (isSecond) {
              rankBadgeColor = 'text-slate-300 bg-slate-500/10 border-slate-500/30';
            } else if (isThird) {
              rankBadgeColor = 'text-amber-600 bg-amber-700/10 border-amber-700/30';
            }

            return (
              <div
                key={prod.id}
                className={`flex items-center justify-between gap-3 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-all ${rankGlow}`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-mono border ${rankBadgeColor} flex-shrink-0`}
                  >
                    #{index + 1}
                  </span>

                  <img
                    src={prod.faviconUrl}
                    alt=""
                    className="w-4 h-4 rounded object-contain flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => handleProductClick(prod)}
                    className="text-xs font-medium text-zinc-200 hover:text-white hover:underline truncate text-left"
                    title={prod.title}
                  >
                    {prod.title}
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    ${prod.currentBid.toLocaleString()}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openOutbidModal(category.slug, prod, prod.currentBid + 1);
                    }}
                    className="p-1 rounded-md text-zinc-500 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                    title={`Outbid ${prod.title}`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {topProducts.length === 0 && (
            <div className="py-6 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
              No claims yet. Be the first to claim this category!
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
        <button
          onClick={handleCategoryClick}
          className="text-xs text-zinc-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
        >
          <span>View all rankings</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-500" />
        </button>

        <button
          onClick={() => openOutbidModal(category.slug, leadingProduct, nextMinBid)}
          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-zinc-700 hover:border-zinc-600"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Outbid for ${nextMinBid.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
};
