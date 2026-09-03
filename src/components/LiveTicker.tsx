import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowUpRight } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';

interface LiveTickerProps {
  onCategoryClick?: (slug: string) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ onCategoryClick }) => {
  const navigate = useNavigate();
  const { activities } = useOutbid();

  if (activities.length === 0) return null;

  // Duplicate for continuous seamless marquee loop
  const displayActivities = [...activities, ...activities, ...activities];

  const handleClick = (slug: string) => {
    if (onCategoryClick) {
      onCategoryClick(slug);
    } else {
      navigate(`/category/${slug}`);
    }
  };

  return (
    <div className="w-full bg-[#111114] border-y border-zinc-800/80 overflow-hidden py-2.5 relative group">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-2 pl-4 absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#111114] pr-3 border-r border-zinc-800 text-[11px] font-bold text-amber-400 uppercase tracking-wider hidden sm:flex">
        <Zap className="w-3.5 h-3.5 animate-bounce text-amber-400" />
        <span>Live Outbids</span>
      </div>

      <div className="flex whitespace-nowrap animate-ticker-scroll hover:[animation-play-state:paused] sm:pl-36">
        {displayActivities.map((act, index) => (
          <div
            key={`${act.id}-${index}`}
            onClick={() => handleClick(act.categorySlug)}
            className="inline-flex items-center gap-2 mx-3 px-3.5 py-1 rounded-full bg-zinc-900/95 border border-zinc-800 text-xs text-zinc-300 hover:border-amber-500/50 hover:bg-zinc-850 cursor-pointer transition-all shadow-sm"
          >
            <img
              src={act.productFavicon}
              alt=""
              className="w-4 h-4 rounded object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-bold text-white max-w-[150px] truncate">
              {act.productTitle.split('—')[0].split('|')[0].trim()}
            </span>
            <span className="text-amber-400 font-bold text-[11px]">outbid</span>
            <span className="text-zinc-400 max-w-[140px] truncate">
              {act.previousProductTitle ? act.previousProductTitle.split('—')[0].split('|')[0].trim() : '#1 spot'}
            </span>
            <span className="text-zinc-500 text-[11px]">for</span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded text-[11px] border border-emerald-500/20">
              ${act.amount.toLocaleString()}
            </span>
            <span className="text-zinc-500 text-[10px]">in {act.categoryName}</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
