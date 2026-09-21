"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post, INITIAL_POSTS } from "@/data/seedData";
import { useRouter } from "next/navigation";

interface HeroCreativeProps {
  initialPosts?: Post[];
}

export const HeroCreative: React.FC<HeroCreativeProps> = ({
  initialPosts = INITIAL_POSTS,
}) => {
  const router = useRouter();

  // Selected spotlight post tab (0: Dating, 1: Casino, 2: Ideas/Systems)
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [tickerIndex, setTickerIndex] = useState(0);

  const featuredItems = [
    {
      tabLabel: "Dating & Matchmaking",
      score: "9.6",
      post: initialPosts.find((p) => p.categorySlug === "dating") || initialPosts[0],
      statLabel: "74% Match Retention",
      speedStat: "Tested on 40 profiles",
    },
    {
      tabLabel: "Casinos & Sportsbooks",
      score: "9.8",
      post: initialPosts.find((p) => p.categorySlug === "igaming-betting") || initialPosts[1],
      statLabel: "32 min Crypto Payout",
      speedStat: "Tested with real capital",
    },
    {
      tabLabel: "Systems & Architecture",
      score: "9.4",
      post: initialPosts.find((p) => p.categorySlug === "ideas-culture") || initialPosts[2],
      statLabel: "Zero Dark UX Score",
      speedStat: "In-depth design audit",
    },
  ];

  const currentItem = featuredItems[activeTab];
  const currentPost = currentItem.post;

  const liveDispatches = [
    {
      tag: "EMPIRICAL AUDIT",
      text: "68.4% of freemium dating chats stall without a 3rd reply due to algorithmic Elo throttling.",
      link: "/blog/best-dating-apps-free-vs-paid-breakdown",
    },
    {
      tag: "LIQUIDITY ALERT",
      text: "Regulated sportsbook payout velocity drops to 32 min average on verified crypto rails.",
      link: "/blog/top-regulated-casinos-sportsbooks-bonus-roundups",
    },
    {
      tag: "UX STUDY",
      text: "4.2 clicks required to cancel auto-renewal on top subscription platforms.",
      link: "/research",
    },
    {
      tag: "NEW VOUCHERS",
      text: "Audited 1x-playthrough welcome bonuses for Q1 2026 sportsbooks now published.",
      link: "/blog/vip-betting-vouchers-free-bets-guide",
    },
  ];

  // Auto rotate ticker every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveDispatches.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [liveDispatches.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingTopics = [
    { label: "Best Dating Apps 2026", query: "dating" },
    { label: "Fastest Payout Casinos", query: "casino" },
    { label: "VIP Betting Vouchers", query: "vouchers" },
    { label: "Free vs Paid Breakdown", query: "free vs paid" },
    { label: "Design Psychology", query: "design" },
  ];

  return (
    <section className="relative pt-4 pb-8 space-y-8">
      {/* 1. Live Editorial Intelligence Dispatch Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 font-bold text-[10px] tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{liveDispatches[tickerIndex].tag}</span>
          </div>

          <Link
            href={liveDispatches[tickerIndex].link}
            className="text-slate-800 truncate hover:text-indigo-600 transition-colors font-medium flex-1"
          >
            {liveDispatches[tickerIndex].text}
          </Link>
        </div>

        <div className="shrink-0 flex items-center justify-between sm:justify-end gap-3 text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
          <span className="hidden md:inline text-[11px]">Empirical Testing Lab</span>
          <Link
            href="/research"
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline text-xs flex items-center gap-1"
          >
            <span>Explore 2026 Benchmarks</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Editorial Statement & Header */}
      <div className="pt-4 sm:pt-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-xs" />
          <span>Axiom Research & Evaluation Desk</span>
          <span>•</span>
          <span className="text-slate-900 font-bold">Issue 142</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.98] text-slate-950 tracking-tight">
              Empirical audits that make tomorrow{" "}
              <span className="italic font-serif text-indigo-600 underline decoration-indigo-300 decoration-wavy decoration-2">
                measurably clearer.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-sans">
              Axiom deploys blinded consumer testing accounts and real financial capital to evaluate matchmaking apps, regulated iGaming operators, and modern software ergonomics.
            </p>
          </div>

          {/* Quick Trust Badges in Hero */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs">
                ✓
              </span>
              <div>
                <span className="font-bold block text-slate-900">48-Point Audit Rubric</span>
                <span className="text-[11px] text-slate-500">Zero sponsored score inflation</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs">
                ⚡
              </span>
              <div>
                <span className="font-bold block text-slate-900">Real Capital Liquidity Checks</span>
                <span className="text-[11px] text-slate-500">Tracked across 4 payment rails</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Search & Trending Keywords HUD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-soft">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 150+ audited platforms, bonus codes, payout velocities, or testing methodologies..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition text-slate-900 placeholder:text-slate-400 shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-button transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Search Audits</span>
            <span>→</span>
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Popular Inquiries:
          </span>
          {trendingTopics.map((topic) => (
            <button
              key={topic.label}
              onClick={() => router.push(`/blog?q=${encodeURIComponent(topic.query)}`)}
              className="rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition cursor-pointer"
            >
              #{topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Interactive Featured Investigation Spotlight Stage */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft relative overflow-hidden">
        {/* Stage Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-8 overflow-x-auto">
          {featuredItems.map((item, idx) => (
            <button
              key={item.tabLabel}
              onClick={() => setActiveTab(idx)}
              className={`relative rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "bg-slate-950 text-white shadow-xs font-bold"
                  : "bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              <span>{item.tabLabel}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                activeTab === idx ? "bg-amber-400 text-slate-950" : "bg-white text-slate-500 border border-slate-200"
              }`}>
                ★ {item.score}
              </span>
            </button>
          ))}
        </div>

        {/* Active Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Category & Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              <span className="text-indigo-600 font-bold">{currentPost.category}</span>
              <span>•</span>
              <span>Audited Investigation</span>
            </div>

            {/* Headline */}
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal leading-[1.08] text-slate-950 tracking-tight">
              {currentPost.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {currentPost.excerpt}
            </p>

            {/* Special Bonus / Rollover Pill */}
            {currentPost.bonusText ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/80 px-4 py-2 text-xs font-semibold text-amber-900">
                <span className="text-sm">🎁</span>
                <span>{currentPost.bonusText}</span>
              </div>
            ) : (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200/80 px-4 py-2 text-xs font-semibold text-emerald-900">
                <span className="text-sm">🛡️</span>
                <span>{currentItem.statLabel} • {currentItem.speedStat}</span>
              </div>
            )}

            {/* CTA Buttons and Social Proof */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/blog/${currentPost.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-button hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>Read Full Investigation</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {currentPost.affiliateUrl && (
                <a
                  href={currentPost.affiliateUrl}
                  target="_blank"
                  rel="noopener"
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3.5 text-xs font-bold text-slate-800 shadow-xs transition hover:border-indigo-500"
                >
                  Visit Official Platform →
                </a>
              )}
            </div>

            {/* Social Proof Row */}
            <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-100">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shadow-xs">
                  JD
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shadow-xs">
                  SK
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold shadow-xs">
                  MP
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Over <strong className="text-slate-900">{currentPost.reads.toLocaleString()}</strong> readers audited this report
              </span>
            </div>
          </div>

          {/* Right Feature Artwork Frame with Glassmorphic Score Overlay */}
          <div className="lg:col-span-6 relative aspect-16/10 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-xs group">
            <Image
              src={currentPost.image}
              alt={currentPost.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />

            {/* Floating Glassmorphic Scorecard */}
            <div className="absolute top-4 left-4 rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-slate-200/80 shadow-lg max-w-[210px]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-xs">
                  {currentItem.score}
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    Axiom Score
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    Editor's Choice
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-[10px] text-slate-600">
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <span>✓</span>
                  <span>48 Points Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800">
                  <span>⚡</span>
                  <span>{currentItem.statLabel}</span>
                </div>
              </div>
            </div>

            {/* Reading Time Badge */}
            <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-slate-800 border border-slate-200 shadow-xs">
              {currentPost.readingTime}
            </div>

            {/* Auditor Signature Badge */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/90 backdrop-blur-md px-3.5 py-2.5 border border-slate-800 text-white flex items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="relative h-7 w-7 rounded-full overflow-hidden border border-white/30">
                  <Image src={currentPost.author.avatar} alt={currentPost.author.name} fill className="object-cover" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold truncate text-white">{currentPost.author.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{currentPost.author.role}</div>
                </div>
              </div>
              <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                Verified Reviewer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Empirical Authority Metrics Bar (HUD) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Evaluation Rubric</span>
            <span className="text-indigo-600 font-bold text-xs">Empirical</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">48 Checkpoints</div>
          <p className="text-[11px] text-slate-500 mt-1">Licensing, RTP, latency, and dark patterns.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Median Settlement</span>
            <span className="text-indigo-600 font-bold text-xs">Tracked</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">14.2 Hours</div>
          <p className="text-[11px] text-slate-500 mt-1">Real financial withdrawals across 4 rails.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Research Dataset</span>
            <span className="text-indigo-600 font-bold text-xs">Q1 2026</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">120,000+</div>
          <p className="text-[11px] text-slate-500 mt-1">Algorithmic swipes & payout samples.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Editorial Charter</span>
            <span className="text-emerald-600 font-bold text-xs">Certified</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">100% Unsponsored</div>
          <p className="text-[11px] text-slate-500 mt-1">Ratings cannot be bought or influenced.</p>
        </div>
      </div>
    </section>
  );
};
