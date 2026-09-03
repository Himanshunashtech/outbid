import React from 'react';
import { useOutbid } from '../context/OutbidContext';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AboutPage: React.FC = () => {
  const { openOutbidModal } = useOutbid();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      <SEO
        title="How Outbid Works — The Attention Marketplace"
        description="Learn how Outbid by IndiHunt works: paste your URL, outbid competitors to claim the #1 spot, and capture permanent backlinks and traffic."
        breadcrumbs={[{ name: 'How It Works', item: '/about' }]}
      />

      <div className="pb-2 border-b border-zinc-850">
        <Breadcrumbs items={[{ label: 'How It Works', isCurrent: true }]} />
      </div>

      <div className="text-center pt-2">
        <h1 className="text-4xl font-black text-white tracking-tight mb-4">
          How Outbid Works
        </h1>
        <p className="text-base text-zinc-400 max-w-xl mx-auto">
          The competitive attention game where the highest bidder commands the #1 spot, traffic, and high-authority visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#111114] border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
            1
          </div>
          <h3 className="text-lg font-bold text-white">Paste Your URL</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our instant crawler auto-extracts your logo favicon, headline title, and description preview.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111114] border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-black">
            2
          </div>
          <h3 className="text-lg font-bold text-white">Outbid Current #1</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Bid at least $1 more than the current leader in any of the 28 categories using Dodo Payments.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111114] border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
            3
          </div>
          <h3 className="text-lg font-bold text-white">Claim Permanent Backlinks</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Your startup sits atop the leaderboard, driving direct clicks, investor attention, and AI bot citations.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to take the lead?</h2>
        <p className="text-xs text-zinc-400 max-w-lg mx-auto">
          Choose any category from AI Agents to Developer Tools and claim your rank today.
        </p>
        <button
          onClick={() => openOutbidModal()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-zinc-950 font-bold text-sm"
        >
          Claim #1 Spot Now
        </button>
      </div>
    </div>
  );
};
