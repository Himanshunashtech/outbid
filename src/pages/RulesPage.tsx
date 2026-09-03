import React from 'react';
import { BookOpen, AlertTriangle, CheckCircle2, Zap, Scale, Lock, Globe } from 'lucide-react';
import { useOutbid } from '../context/OutbidContext';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface RulesPageProps {
  onBackToHome?: () => void;
  onOpenOutbid?: () => void;
}

export const RulesPage: React.FC<RulesPageProps> = ({ onOpenOutbid }) => {
  const { openOutbidModal } = useOutbid();

  const handleClaim = () => {
    if (onOpenOutbid) {
      onOpenOutbid();
    } else {
      openOutbidModal();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-28 text-left">
      <SEO
        title="Platform Rules & Bidding Guidelines"
        description="Official Outbid by IndiHunt platform guidelines: auction rules, refund policies, content standards, and ranking mechanisms."
        breadcrumbs={[{ name: 'Platform Rules', item: '/rules' }]}
      />

      <div className="pb-2 border-b border-zinc-850">
        <Breadcrumbs items={[{ label: 'Rules & Guidelines', isCurrent: true }]} />
      </div>
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>Platform Governance & Auction Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Platform Rules & Bidding Guidelines
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
          Outbid is a transparent, real-time attention marketplace. These rules ensure fairness, safety, and maximum visibility for creators, startups, and bidders.
        </p>
      </div>

      {/* Core Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Rule 1: The Outbid Mechanism */}
        <div className="p-6 rounded-3xl bg-[#111114] border border-zinc-800/90 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            1. The Outbid Mechanism & Rank Takeover
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Any product can claim any rank position by placing a bid of at least <strong>$1 higher</strong> than the incumbent's current bid.
          </p>
          <ul className="text-xs text-zinc-400 space-y-2 pt-1 border-t border-zinc-800/80">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>When outbid, the previous product drops down exactly 1 rank position.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>All rank transfers execute immediately upon confirmed checkout.</span>
            </li>
          </ul>
        </div>

        {/* Rule 2: Permanent Backlinks & SEO Value */}
        <div className="p-6 rounded-3xl bg-[#111114] border border-zinc-800/90 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            2. Permanent Backlinks & Indexation
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Every listing receives a permanent, direct DoFollow link to their official website, indexed across search engines and scraped by AI agents.
          </p>
          <ul className="text-xs text-zinc-400 space-y-2 pt-1 border-t border-zinc-800/80">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Links remain on the platform indefinitely, even if dropped in rank.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Top-ranking products capture prioritized organic search and LLM citations.</span>
            </li>
          </ul>
        </div>

        {/* Rule 3: Content Standards & Prohibited Items */}
        <div className="p-6 rounded-3xl bg-[#111114] border border-zinc-800/90 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            3. Content Quality & Prohibited Submissions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Outbid maintains strict trust and security standards. We strictly forbid and immediately remove:
          </p>
          <ul className="text-xs text-zinc-400 space-y-2 pt-1 border-t border-zinc-800/80">
            <li className="flex items-start gap-2 text-rose-300">
              <span className="font-bold">•</span>
              <span>Malware, phishing, deceptive redirects, or exploit kits.</span>
            </li>
            <li className="flex items-start gap-2 text-rose-300">
              <span className="font-bold">•</span>
              <span>Illegal goods, hate speech, harassment, or unauthorized trademark theft.</span>
            </li>
            <li className="flex items-start gap-2 text-zinc-400">
              <span>Violating entries will be delisted immediately without refund eligibility.</span>
            </li>
          </ul>
        </div>

        {/* Rule 4: Payment & Dispute Policy */}
        <div className="p-6 rounded-3xl bg-[#111114] border border-zinc-800/90 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            4. Payments, Security & Refunds
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            All transactions are processed securely via <strong>Dodo Payments</strong> using 256-bit bank-grade encryption.
          </p>
          <ul className="text-xs text-zinc-400 space-y-2 pt-1 border-t border-zinc-800/80">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Payments are non-refundable once the leaderboard spot has been occupied.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>You retain your rank until a competitor submits a valid higher bid.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111114] border border-zinc-850 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Frequently Asked Rules Questions</span>
        </h2>

        <div className="space-y-4 divide-y divide-zinc-850 text-sm">
          <div className="pt-3 first:pt-0 space-y-1">
            <h3 className="font-bold text-zinc-200">How long do I keep my #1 spot?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You keep your spot indefinitely until someone submits a higher bid for that specific category. There is no recurring subscription or expiration date.
            </p>
          </div>

          <div className="pt-4 space-y-1">
            <h3 className="font-bold text-zinc-200">What happens when my product is outbid?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your product automatically moves down to the next rank (e.g., from #1 to #2). Your backlink, profile, description, and clicks remain active on the leaderboard permanently.
            </p>
          </div>

          <div className="pt-4 space-y-1">
            <h3 className="font-bold text-zinc-200">Can I outbid my own product to increase its price?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes! You can increase your current bid at any time to create a larger protective moat against competitors trying to claim your category crown.
            </p>
          </div>

          <div className="pt-4 space-y-1">
            <h3 className="font-bold text-zinc-200">Can I update my product's title, logo, or URL later?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. You can manage and update your claimed product details directly from your user dashboard when signed in with Google.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">Ready to claim your spot?</h3>
          <p className="text-xs text-zinc-400 mt-1">Outbid the competition and capture prime spotlight today.</p>
        </div>
        <button
          onClick={handleClaim}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-zinc-950 font-black text-sm shadow-xl shadow-rose-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 flex-shrink-0"
        >
          <Zap className="w-4 h-4 fill-zinc-950" />
          <span>Claim #1 Spot Now</span>
        </button>
      </div>
    </div>
  );
};
