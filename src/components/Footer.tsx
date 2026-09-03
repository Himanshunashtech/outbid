import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShieldCheck, Heart } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';

interface FooterProps {
  onSelectCategory?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const { categories } = useOutbid();

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      navigate(`/category/${slug}`);
    }
  };

  return (
    <footer className="bg-[#0b0b0e] border-t border-zinc-850 py-12 px-4 sm:px-6 lg:px-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-850">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-400 p-[1.5px]">
              <div className="w-full h-full bg-[#0e0e11] rounded-[9px] flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight font-mono">
                OUTBID<span className="text-amber-400">.</span>
              </span>
              <p className="text-[11px] text-zinc-500">The attention marketplace for winning products.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payments by Dodo</span>
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Google OAuth</span>
            </span>
          </div>
        </div>

        {/* Categories Quick Cloud */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Browse All 28 Categories
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategoryClick(c.slug)}
                className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-400 border border-zinc-850 transition-colors text-[11px]"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} Outbid Platform. All rights reserved.</p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://x.com/SonuHs9557"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-amber-400 transition-colors font-medium"
            >
              @SonuHs9557
            </a>
            <span>•</span>
            <p className="flex items-center gap-1">
              Built for founders with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> and attention mechanics.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
