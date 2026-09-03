import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Flame, Plus, Zap, LogOut, ExternalLink, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOutbid } from '../context/OutbidContext';

interface NavbarProps {
  onNavigate?: (view: string, slug?: string) => void;
  currentView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView: propView }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginWithGoogle, logout } = useAuth();
  const { openOutbidModal, onlineCount } = useOutbid();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNav = (view: string, path: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    navigate(path);
  };

  const isCurrent = (view: string, path: string) => {
    if (propView) return propView === view;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Live Indicator */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2.5 group text-left flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-400 p-[1.5px] shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-[#0e0e11] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center leading-tight">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 font-mono">
                  OUTBID<span className="text-amber-400">.</span>
                </span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono tracking-wide font-semibold -mt-0.5 flex items-center gap-1">
                <span>by</span>
                <span className="text-amber-400/90 font-bold">IndiHunt</span>
              </div>
            </div>
          </Link>

          {/* Live Online Users Badge - Perfectly aligned with Navbar */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold tracking-wide shadow-sm shadow-emerald-500/10 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono font-bold">{onlineCount}</span>
            <span className="text-[10px] text-emerald-400/80 uppercase font-bold">live</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
            <button
              onClick={() => handleNav('home', '/')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${isCurrent('home', '/')
                  ? 'text-white bg-zinc-800/70 shadow-inner'
                  : 'hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleNav('activity', '/activity')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${isCurrent('activity', '/activity')
                  ? 'text-white bg-zinc-800/70 shadow-inner'
                  : 'hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Live Activity
            </button>
            <button
              onClick={() => handleNav('about', '/about')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${isCurrent('about', '/about')
                  ? 'text-white bg-zinc-800/70 shadow-inner'
                  : 'hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
            >
              How it works
            </button>
            <button
              onClick={() => handleNav('rules', '/rules')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${isCurrent('rules', '/rules')
                  ? 'text-white bg-zinc-800/70 shadow-inner'
                  : 'hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
            >
              Rules
            </button>
          </nav>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {/* Claim / Outbid CTA */}
          <button
            onClick={() => openOutbidModal()}
            className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-rose-500/20 hover:shadow-rose-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0 whitespace-nowrap"
            title="Claim #1 Spot"
            aria-label="Claim #1 Spot"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Claim #1 Spot</span>
          </button>

          {/* Google Auth / User profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                title={user.name}
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover border border-zinc-700"
                />
                <span className="hidden sm:inline text-xs font-semibold text-zinc-200 max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 z-50 text-sm animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                    <p className="font-semibold text-white text-xs truncate">{user.name}</p>
                    <p className="text-[11px] text-zinc-400 font-mono truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleNav('dashboard', '/dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-xs"
                  >
                    <span>My Products & Ranks</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-xs font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center justify-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium hover:border-zinc-700 transition-all flex-shrink-0"
              title="Google Sign In"
              aria-label="Google Sign In"
            >
              {/* Google G Logo */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
              <span className="hidden sm:inline">Google Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
