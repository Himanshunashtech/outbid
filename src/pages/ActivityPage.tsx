import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ActivityPageProps {
  onSelectCategory?: (slug: string) => void;
}

export const ActivityPage: React.FC<ActivityPageProps> = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const { activities, openOutbidModal } = useOutbid();

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      navigate(`/category/${slug}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      <SEO
        title="Live Outbid Activity Feed"
        description="Watch real-time live outbid battles, #1 rank claims, and product attention shifts across all categories on Outbid by IndiHunt."
        breadcrumbs={[{ name: 'Live Activity', item: '/activity' }]}
      />

      <div className="pb-2 border-b border-zinc-850">
        <Breadcrumbs items={[{ label: 'Live Activity', isCurrent: true }]} />
      </div>
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3 shadow-inner">
          <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>Realtime Outbid Activity Stream</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Live Outbid Activity
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Watch products outbid their competition in real-time across all 28 categories and claim top attention rankings.
        </p>
      </div>

      {/* Activity Stream Container */}
      <div className="bg-[#111114] border border-zinc-850 rounded-3xl overflow-hidden shadow-2xl divide-y divide-zinc-850/80">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-zinc-900/40 transition-all duration-200 group"
          >
            {/* Left: Product Outbid Story */}
            <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
              {/* Product Logo */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-zinc-800 p-2.5 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={act.productFavicon}
                  alt={act.productTitle}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Story Content */}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap text-sm sm:text-base">
                  <a
                    href={act.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black text-white hover:text-amber-400 transition-colors inline-flex items-center gap-1 truncate max-w-[280px]"
                  >
                    <span>{act.productTitle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>

                  <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wide">
                    OUTBID
                  </span>

                  {act.previousProductTitle ? (
                    <span className="font-semibold text-zinc-300 truncate max-w-[240px]">
                      {act.previousProductTitle}
                    </span>
                  ) : (
                    <span className="font-medium text-zinc-400">the #1 spot</span>
                  )}
                </div>

                {/* Details Bar: Category + Price Shift + Time */}
                <div className="flex items-center flex-wrap gap-2 text-xs text-zinc-400 font-normal">
                  <button
                    onClick={() => handleCategoryClick(act.categorySlug)}
                    className="inline-flex items-center gap-1 font-semibold text-zinc-300 hover:text-amber-400 bg-zinc-900/90 hover:bg-zinc-800 px-2.5 py-0.5 rounded-lg border border-zinc-800 transition-colors"
                  >
                    <span>🔍</span>
                    <span>{act.categoryName}</span>
                  </button>

                  {act.previousAmount && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">
                        from <strong className="font-mono text-zinc-400">${act.previousAmount.toLocaleString()}</strong>
                      </span>
                      <ArrowRight className="w-3 h-3 text-emerald-400 inline-block" />
                      <span className="font-mono font-bold text-emerald-400">
                        ${act.amount.toLocaleString()}
                      </span>
                    </>
                  )}

                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    <span>{act.timestamp}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Winning Amount & Action Button */}
            <div className="flex items-center justify-between md:justify-end gap-3.5 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/60">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Winning Bid</span>
                <span className="font-mono text-lg sm:text-xl font-black text-emerald-400 tracking-tight">
                  ${act.amount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => openOutbidModal(act.categorySlug, null, act.amount + 1)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-zinc-950 font-black text-xs shadow-md shadow-rose-500/10 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
              >
                <Zap className="w-3.5 h-3.5 fill-zinc-950" />
                <span>Outbid (${(act.amount + 1).toLocaleString()})</span>
              </button>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="p-16 text-center text-zinc-500 text-sm">
            No live activities recorded yet. Be the first to place a bid!
          </div>
        )}
      </div>
    </div>
  );
};
