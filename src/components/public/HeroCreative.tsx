"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post, INITIAL_POSTS } from "@/data/seedData";
import { useI18n } from "@/lib/i18n";

interface HeroCreativeProps {
  initialPosts?: Post[];
}

export const HeroCreative: React.FC<HeroCreativeProps> = ({
  initialPosts = INITIAL_POSTS,
}) => {
  const router = useRouter();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const tabConfigs = [
    {
      tabLabel: t.hero.tabDating,
      slug: "dating",
      score: "9.6",
      statLabel: "74% Match Retention",
      speedStat: "Tested on 40 profiles",
    },
    {
      tabLabel: t.hero.tabCasino,
      slug: "gambling-casino",
      score: "9.8",
      statLabel: "18 min Crypto Payout",
      speedStat: "Tested with real capital",
    },
    {
      tabLabel: t.hero.tabAdult,
      slug: "adult-lifestyle",
      score: "9.4",
      statLabel: "100% Discreet Descriptors",
      speedStat: "Bank statement verified",
    },
  ];

  const currentTab = tabConfigs[activeTab] || tabConfigs[0];
  const currentPost =
    initialPosts.find((p) => p.categorySlug === currentTab.slug) ||
    initialPosts[activeTab] ||
    initialPosts[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingTopics = [
    { label: "Best Dating Apps 2026", query: "dating" },
    { label: "Fastest Payout Casinos", query: "casino" },
    { label: "Adult Creator Networks", query: "adult" },
    { label: "Discreet Billing Guides", query: "billing" },
    { label: "Crypto Deposit Bonus", query: "crypto" },
  ];

  return (
    <section className="relative pt-4 pb-8 space-y-8">
      {/* 1. Asymmetric Hero Showcase */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft relative overflow-hidden">
        {/* Stage Category Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-4 mb-8 overflow-x-auto no-scrollbar">
          {tabConfigs.map((tab, idx) => (
            <button
              key={tab.tabLabel}
              onClick={() => setActiveTab(idx)}
              className={`relative rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "bg-navy text-white shadow-xs font-bold"
                  : "bg-paper-public text-muted-text hover:text-ink hover:bg-muted"
              }`}
            >
              <span>{tab.tabLabel}</span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  activeTab === idx
                    ? "bg-orange text-ink"
                    : "bg-card text-muted-text border border-border"
                }`}
              >
                ★ {tab.score}
              </span>
            </button>
          ))}
        </div>

        {/* Two-Column Asymmetric Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text">
              <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
              <span>{t.hero.verifiedToday}</span>
              <span>•</span>
              <span className="text-orange font-bold">{currentPost?.category || currentTab.tabLabel}</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] text-ink tracking-tight">
              {t.hero.titleStart}
              <span className="italic font-serif text-orange">{t.hero.titleEmphasis}</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-text leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Special Highlight Pill */}
            {currentPost?.bonusText ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-soft border border-orange/30 px-4 py-2 text-xs font-semibold text-ink w-fit">
                <span className="text-sm">🎁</span>
                <span>{currentPost.bonusText}</span>
              </div>
            ) : (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-mint border border-sage/40 px-4 py-2 text-xs font-semibold text-ink w-fit">
                <span className="text-sm">🛡️</span>
                <span>
                  {currentTab.statLabel} • {currentTab.speedStat}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={currentPost ? `/blog/${currentPost.slug}` : "/blog"}
                className="inline-flex items-center gap-2 rounded-xl bg-navy hover:bg-navy-soft px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-button hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
              </Link>

              <Link
                href="/admin"
                className="rounded-xl border border-border bg-card hover:bg-paper-public px-5 py-3.5 text-xs sm:text-sm font-bold text-ink shadow-xs transition hover:border-orange hover:text-orange"
              >
                Admin Workspace →
              </Link>
            </div>

            {/* Reader Social Proof */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-peach text-ink flex items-center justify-center text-[10px] font-bold shadow-xs">
                  MP
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-mint text-ink flex items-center justify-center text-[10px] font-bold shadow-xs">
                  OG
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-lavender text-ink flex items-center justify-center text-[10px] font-bold shadow-xs">
                  LS
                </div>
              </div>
              <span className="text-xs text-muted-text font-medium">
                Over <strong className="text-ink">85,000+</strong> monthly visitors read our breakdowns
              </span>
            </div>
          </div>

          {/* Right Column: Featured Dynamic Artwork Card */}
          <div className="lg:col-span-6">
            {currentPost ? (
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-paper-public shadow-xs transition-all duration-500 hover:shadow-lg">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Image
                    src={currentPost.image || "/art/dating_comparison_guide.jpg"}
                    alt={currentPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 rounded-full bg-card/95 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-ink border border-border shadow-xs">
                    {currentPost.category}
                  </div>
                  {/* Reading Time Pill */}
                  <div className="absolute top-4 right-4 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-muted-text border border-border shadow-xs">
                    {currentPost.readingTime}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange">
                    {currentPost.badge || "Featured Breakdown"}
                  </span>
                  <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl text-ink leading-snug group-hover:text-orange transition-colors">
                    <Link href={`/blog/${currentPost.slug}`}>{currentPost.title}</Link>
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-base text-muted-text line-clamp-2 leading-relaxed">
                    {currentPost.excerpt}
                  </p>

                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-7 w-7 rounded-full overflow-hidden border border-border">
                        <Image
                          src={currentPost.author.avatar || "/avatars/avatar_maya_patel.jpg"}
                          alt={currentPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-ink">
                        {currentPost.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${currentPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-orange transition-colors"
                    >
                      <span>Read review</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center flex flex-col items-center justify-center min-h-[360px]">
                <div className="w-14 h-14 rounded-2xl bg-peach flex items-center justify-center text-2xl mb-4">
                  ✍️
                </div>
                <h3 className="font-serif text-2xl text-ink">Ready for your first review?</h3>
                <p className="mt-2 text-sm text-muted-text max-w-sm">
                  Write, schedule, and publish high-converting blogs on dating, iGaming, and adult entertainment.
                </p>
                <Link
                  href="/admin/posts/new"
                  className="mt-6 rounded-xl bg-navy hover:bg-navy-soft text-white px-5 py-2.5 text-xs font-bold shadow-button transition"
                >
                  Create Article in Admin →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Search & Trending Niche Tags */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-soft">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dating app comparisons, casino payouts, webcam platforms, voucher codes..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-paper-public border border-border focus:border-orange focus:bg-card focus:outline-none transition text-ink placeholder:text-muted-text shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-orange hover:bg-orange/90 px-6 py-2.5 text-xs font-bold text-ink shadow-button transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Search Reviews</span>
            <span>→</span>
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
            Hot Searches:
          </span>
          {trendingTopics.map((topic) => (
            <button
              key={topic.label}
              onClick={() => router.push(`/blog?q=${encodeURIComponent(topic.query)}`)}
              className="rounded-lg bg-paper-public hover:bg-peach hover:text-ink hover:border-orange/40 border border-border px-2.5 py-1 text-[11px] font-medium text-muted-text transition cursor-pointer"
            >
              #{topic.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
