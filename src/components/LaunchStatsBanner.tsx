import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowUpRight } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';

interface LaunchStatsBannerProps {
  launchTimeEpoch?: number;
  twitterHandle?: string;
  twitterUrl?: string;
  className?: string;
}

export const LaunchStatsBanner: React.FC<LaunchStatsBannerProps> = ({
  launchTimeEpoch,
  twitterHandle = '@SonuHs9557',
  twitterUrl = 'https://x.com/SonuHs9557',
  className = '',
}) => {
  const { activities } = useOutbid();

  // Launch was 1 hour ago from first load or stored launch timestamp
  const [startTime] = useState<number>(() => {
    const saved = localStorage.getItem('outbider_launch_timestamp');
    if (saved) {
      const parsed = Number(saved);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    // Default to 1 hour (3600 seconds) ago
    const oneHourAgo = Date.now() - 3600 * 1000;
    localStorage.setItem('outbider_launch_timestamp', oneHourAgo.toString());
    return oneHourAgo;
  });

  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 1,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const targetLaunch = launchTimeEpoch || startTime;
      const diffMs = Math.max(0, Date.now() - targetLaunch);
      const totalSeconds = Math.floor(diffMs / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [launchTimeEpoch, startTime]);

  // Calculate total volume or revenue made since launch
  const totalMade = activities.reduce((acc, act) => acc + (act.amount || 0), 0) || 468;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div
      className={`relative rounded-3xl bg-gradient-to-r from-zinc-950 via-[#121216] to-zinc-950 border border-zinc-800/90 p-4 sm:p-5 shadow-2xl shadow-black/80 overflow-hidden text-center max-w-4xl mx-auto ${className}`}
    >
      {/* Background glow lines */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-20 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {/* Left: Project Revenue Statement */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start">
          <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flame className="w-3.5 h-3.5 fill-amber-400 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-zinc-300">
            This <Link to="/about" className="text-white font-bold underline decoration-zinc-600 hover:decoration-amber-400 transition-colors">simple side project</Link> made{' '}
            <strong className="text-emerald-400 font-mono font-black text-sm sm:text-base">
              ${totalMade.toLocaleString()}
            </strong>{' '}
            since launch
          </p>
        </div>

        {/* Center: Live Time Counter Since Launch (Days : Hours : Min : Sec) */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-750 text-xs font-mono font-bold shadow-inner">
          <div className="flex items-center gap-1">
            <span className="text-white text-sm sm:text-base font-black">{elapsed.days}</span>
            <span className="text-[10px] uppercase text-zinc-500 font-sans">days</span>
          </div>
          <span className="text-amber-500 font-black">:</span>
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-sm sm:text-base font-black">{pad(elapsed.hours)}</span>
            <span className="text-[10px] uppercase text-zinc-500 font-sans">hrs</span>
          </div>
          <span className="text-amber-500 font-black">:</span>
          <div className="flex items-center gap-1">
            <span className="text-white text-sm sm:text-base font-black">{pad(elapsed.minutes)}</span>
            <span className="text-[10px] uppercase text-zinc-500 font-sans">min</span>
          </div>
          <span className="text-amber-500 font-black">:</span>
          <div className="flex items-center gap-1">
            <span className="text-rose-400 text-sm sm:text-base font-black">{pad(elapsed.seconds)}</span>
            <span className="text-[10px] uppercase text-zinc-500 font-sans">sec</span>
          </div>
        </div>

        {/* Right: Quick Navigation Links */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 font-semibold flex-wrap justify-center">
          <Link to="/" className="hover:text-white hover:underline transition-colors">
            Categories
          </Link>
          <span className="text-zinc-700">•</span>
          <Link to="/rules" className="hover:text-white hover:underline transition-colors">
            Rules
          </Link>
          <span className="text-zinc-700">•</span>
          <Link to="/about" className="hover:text-white hover:underline transition-colors">
            About
          </Link>
          <span className="text-zinc-700">•</span>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-zinc-300">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-amber-400 font-medium">{twitterHandle}</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
