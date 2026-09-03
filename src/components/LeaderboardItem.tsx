import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';
import { useOutbid } from '../context/OutbidContext';
import { getProductSlug } from '../utils/slug';

interface LeaderboardItemProps {
  product: Product;
  rankDisplay?: number;
  onSelectCategory?: (slug: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  product,
  rankDisplay,
  onSelectCategory,
  onSelectProduct,
}) => {
  const navigate = useNavigate();
  const { openOutbidModal } = useOutbid();
  const rankNumber = rankDisplay !== undefined ? rankDisplay : product.rank;

  // Extract clean domain if not set
  let cleanDomain = product.domain;
  if (!cleanDomain) {
    try {
      cleanDomain = new URL(product.url).hostname.replace(/^www\./, '');
    } catch {
      cleanDomain = product.url.replace(/^https?:\/\//, '').split('/')[0];
    }
  }

  const clicksFormatted = (product.clicks !== undefined ? product.clicks : 0).toLocaleString();
  const categoryLabel = product.categoryName || 'Tech';

  const handleOpenDetails = () => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      const slug = getProductSlug(product.title, product.id);
      navigate(`/product/${slug}`);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectCategory) {
      onSelectCategory(product.categorySlug);
    } else {
      navigate(`/category/${product.categorySlug}`);
    }
  };

  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:py-4 sm:px-4 rounded-2xl hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition-all duration-200">
      {/* Top / Left: Rank, Favicon, Title, Description, Meta */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
        {/* Rank Number Badge */}
        <span className="font-mono text-xs sm:text-base font-bold text-zinc-400 bg-zinc-900 sm:bg-transparent border sm:border-0 border-zinc-800 px-2 py-1 sm:px-0 sm:py-0 rounded-lg sm:rounded-none w-auto sm:w-10 text-center flex-shrink-0">
          #{rankNumber}
        </span>

        {/* Rounded Favicon Logo */}
        <button
          onClick={handleOpenDetails}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center p-2 sm:p-2.5 flex-shrink-0 overflow-hidden shadow-inner group-hover:scale-105 transition-transform text-left"
        >
          <img
            src={product.faviconUrl}
            alt=""
            className="w-full h-full object-contain rounded-lg sm:rounded-xl"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://api.dicebear.com/7.x/shapes/svg?seed=' + encodeURIComponent(product.title);
            }}
          />
        </button>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                onClick={handleOpenDetails}
                className="text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors truncate block text-left"
                title={product.title}
              >
                {product.title}
              </button>
              {product.verified && (
                <span className="text-emerald-400 flex-shrink-0" title="Verified Product">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            {/* Mobile-only Price Display next to title */}
            <span className="sm:hidden font-mono text-sm font-extrabold text-[#f97316] flex-shrink-0">
              ${product.currentBid.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Metadata Row: Category · domain · clicks · details */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400 mt-1.5 font-normal">
            <button
              onClick={handleCategoryClick}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white font-medium hover:border-zinc-700"
            >
              <span>{categoryLabel}</span>
            </button>

            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-zinc-500 hidden sm:inline">{product.timeAgo || product.claimedAt || 'recently'}</span>

            <span className="text-zinc-600">·</span>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-400 hover:text-white hover:underline truncate max-w-[120px] sm:max-w-[150px]"
            >
              {cleanDomain}
            </a>

            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">{clicksFormatted} clicks</span>
          </div>
        </div>
      </div>

      {/* Desktop & Mobile Right Side: Price + Outbid Action Button */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-850/60">
        {/* Desktop Price */}
        <span className="hidden sm:inline font-mono text-base sm:text-lg font-extrabold text-[#f97316] tracking-tight">
          ${product.currentBid.toLocaleString()}
        </span>

        {/* View Details on mobile */}
        <button
          onClick={handleOpenDetails}
          className="sm:hidden text-xs text-zinc-400 hover:text-white font-medium"
        >
          View Details
        </button>

        {/* Outbid CTA */}
        <button
          onClick={() => openOutbidModal(product.categorySlug, product, product.currentBid + 1)}
          className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 sm:bg-zinc-850 sm:hover:bg-amber-500 text-zinc-950 sm:text-zinc-200 sm:hover:text-zinc-950 text-xs font-bold transition-all sm:border sm:border-zinc-700/80 shadow-sm flex items-center gap-1.5"
          title={`Outbid ${product.title} for $${(product.currentBid + 1).toLocaleString()}`}
        >
          <Zap className="w-3.5 h-3.5 fill-zinc-950 sm:fill-none sm:text-amber-400 sm:group-hover:text-zinc-950 flex-shrink-0" />
          <span>Outbid (${(product.currentBid + 1).toLocaleString()})</span>
        </button>
      </div>
    </div>
  );
};
