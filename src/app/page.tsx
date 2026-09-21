"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { HeroCreative } from "@/components/public/HeroCreative";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { StoryCard } from "@/components/public/StoryCard";
import { NewsletterSection } from "@/components/public/NewsletterSection";
import { PublicFooter } from "@/components/public/PublicFooter";
import { AdsterraBanner } from "@/components/ads/AdsterraMonetization";
import { INITIAL_CATEGORIES, INITIAL_POSTS, Post } from "@/data/seedData";
import { dataStore } from "@/lib/dataStore";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];
          if (list.length > 0 || dataStore.isDemoCleared()) {
            const published = list.filter((p: Post) => p.status === "published");
            setPosts(published);
          }
        }
      } catch (err) {
        console.error("Failed to load live posts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col selection:bg-orange/30">
      {/* Fixed responsive header with single Admin button and language selector */}
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-6">
        {/* Adsterra High-RPM Native Leaderboard Slot */}
        <AdsterraBanner format="leaderboard" />

        {/* Asymmetric Niche Hero */}
        <HeroCreative initialPosts={posts} />

        {/* Explore the Journal Topic Ribbon */}
        <TopicRibbon categories={categories} />

        {/* Latest Stories Section */}
        <section className="my-12">
          <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {t.latest.eyebrow}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-0.5">
                {t.latest.heading}
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-ink hover:text-orange transition-colors flex items-center gap-1"
            >
              <span>{t.latest.viewAll}</span>
              <span>→</span>
            </Link>
          </div>

          {gridPosts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <StoryCard key={post.id} post={post} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="my-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <span className="text-3xl mb-3 block">✍️</span>
              <h3 className="font-serif text-xl text-ink">{t.latest.emptyTitle}</h3>
              <p className="text-sm text-muted-text mt-2 max-w-md mx-auto">
                {t.latest.emptyDesc}
              </p>
              <Link
                href="/admin/posts/new"
                className="inline-block mt-5 rounded-xl bg-navy hover:bg-navy-soft text-white px-5 py-2.5 text-xs font-bold shadow-button transition"
              >
                {t.latest.emptyCta}
              </Link>
            </div>
          ) : (
            <div className="mt-8 text-center py-8 text-sm text-muted-text">
              {t.latest.moreComing}
            </div>
          )}
        </section>

        {/* The Sunday Edition Newsletter */}
        <NewsletterSection />
      </main>

      <PublicFooter />
    </div>
  );
}
