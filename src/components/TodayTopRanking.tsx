import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Crown, Award, Trophy } from 'lucide-react';
import type { Product } from '../types';
import { useOutbid } from '../context/OutbidContext';
import { getProductSlug } from '../utils/slug';

interface TodayTopRankingProps {
  topProducts: Product[];
  onSeeAll?: () => void;
  onSelectCategory?: (slug: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const TodayTopRanking: React.FC<TodayTopRankingProps> = ({
  topProducts,
  onSeeAll,
  onSelectCategory,
  onSelectProduct,
}) => {
  const navigate = useNavigate();
  const { openOutbidModal } = useOutbid();

  const handleProductClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      const slug = getProductSlug(product.title, product.id);
      navigate(`/product/${slug}`);
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    if (onSelectCategory) {
      onSelectCategory(categorySlug);
    } else {
      navigate(`/category/${categorySlug}`);
    }
  };

  const rank1 = topProducts[0];
  const rank2 = topProducts[1];
  const rank3 = topProducts[2];

  const renderCard = (
    product: Product | undefined,
    rankNum: number,
    theme: {
      border: string;
      hoverBorder: string;
      badgeBg: string;
      badgeText: string;
      priceColor: string;
      glowBg: string;
      icon: React.ReactNode;
      label: string;
    }
  ) => {
    if (!product) return null;

    let cleanDomain = product.domain;
    if (!cleanDomain) {
      try {
        cleanDomain = new URL(product.url).hostname.replace(/^www\./, '');
      } catch {
        cleanDomain = product.url.replace(/^https?:\/\//, '').split('/')[0];
      }
    }

    return (
      <div
        onClick={() => handleProductClick(product)}
        className={`group relative cursor-pointer rounded-3xl bg-[#111114] hover:bg-[#15151a] border ${theme.border} hover:${theme.hoverBorder} p-5 sm:p-6 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between overflow-hidden`}
      >
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 left-0 right-0 h-24 ${theme.glowBg} opacity-10 blur-2xl pointer-events-none`} />

        <div>
          {/* Header Row: Rank Badge & Price */}
          <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black tracking-wide border ${theme.badgeBg} ${theme.badgeText}`}>
              {theme.icon}
              <span>#{rankNum} {theme.label}</span>
            </div>

            <div className="text-right">
              <span className={`font-mono text-xl sm:text-2xl font-black tracking-tight ${theme.priceColor}`}>
                ${product.currentBid.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Product Info Block */}
          <div className="flex items-start gap-4 mb-3 relative z-10">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 p-2.5 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              <img
                src={product.faviconUrl}
                alt={product.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
                {product.title}
              </h4>
              <p className="text-xs text-zinc-400 font-mono mt-0.5 truncate">
                {cleanDomain}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4 relative z-10">
            {product.description}
          </p>
        </div>

        {/* Footer Row: Category + Outbid Button */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 relative z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryClick(product.categorySlug);
            }}
            className="text-[11px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-800 transition-colors truncate max-w-[140px]"
          >
            {product.categoryName || 'Tech'}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openOutbidModal(product.categorySlug, product, product.currentBid + 1);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-850 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 text-xs font-bold border border-zinc-700 hover:border-amber-500 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:text-zinc-950" />
            <span>Outbid (${(product.currentBid + 1).toLocaleString()})</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
            Today's Podium Champions
          </h3>
        </div>

        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-xs font-bold text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <span>Explore All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3 Prominent Large Podium Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* #1 Champion Card (Gold / Rose Accent) */}
        {renderCard(rank1, 1, {
          border: 'border-amber-500/40',
          hoverBorder: 'border-amber-400',
          badgeBg: 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-amber-500/30',
          badgeText: 'text-amber-300 font-black',
          priceColor: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400',
          glowBg: 'bg-amber-500',
          icon: <Crown className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Champion',
        })}

        {/* #2 Contender Card (Cyan / Blue Accent) */}
        {renderCard(rank2, 2, {
          border: 'border-cyan-500/30',
          hoverBorder: 'border-cyan-400',
          badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
          badgeText: 'text-cyan-300 font-black',
          priceColor: 'text-cyan-400',
          glowBg: 'bg-cyan-500',
          icon: <Award className="w-3.5 h-3.5 text-cyan-400" />,
          label: 'Contender',
        })}

        {/* #3 Challenger Card (Violet / Purple Accent) */}
        {renderCard(rank3, 3, {
          border: 'border-purple-500/30',
          hoverBorder: 'border-purple-400',
          badgeBg: 'bg-purple-500/10 border-purple-500/30',
          badgeText: 'text-purple-300 font-black',
          priceColor: 'text-purple-300',
          glowBg: 'bg-purple-500',
          icon: <Trophy className="w-3.5 h-3.5 text-purple-400" />,
          label: 'Podium',
        })}
      </div>
    </div>
  );
};
