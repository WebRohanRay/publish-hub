"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { StoryCard } from "@/components/public/StoryCard";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { AdsterraBanner } from "@/components/ads/AdsterraMonetization";
import { INITIAL_CATEGORIES, INITIAL_POSTS, Post } from "@/data/seedData";
import { dataStore } from "@/lib/dataStore";
import { useI18n } from "@/lib/i18n";

function BlogArchiveContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "comments">("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
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
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchParams.get("q")) {
      setSearchQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || post.categorySlug === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.reads - a.reads;
      if (sortBy === "comments") return b.commentsCount - a.commentsCount;
      return 0; // default latest order
    });

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col selection:bg-orange/30">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 pt-6 pb-20">
        {/* Top Adsterra Leaderboard Banner */}
        <AdsterraBanner format="leaderboard" />

        {/* Page Header */}
        <div className="border-b border-border/80 pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange">
            {t.archive.eyebrow}
          </span>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
            {t.archive.heading}
          </h1>
          <p className="mt-3 text-base text-muted-text max-w-2xl leading-relaxed">
            {t.archive.subtitle}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.archive.searchPlaceholder}
              className="w-full rounded-xl bg-card px-4 py-2.5 text-sm border border-border focus:border-orange focus:outline-none shadow-xs text-ink placeholder:text-muted-text"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-muted-text hover:text-ink cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl bg-card px-3.5 py-2.5 text-xs font-semibold text-ink border border-border focus:border-orange focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="latest">{t.archive.sortLatest}</option>
              <option value="popular">{t.archive.sortPopular}</option>
              <option value="comments">{t.archive.sortComments}</option>
            </select>
          </div>
        </div>

        {/* Topic Ribbon */}
        <TopicRibbon
          categories={INITIAL_CATEGORIES}
          activeCategory={selectedCategory === "all" ? undefined : selectedCategory}
        />

        {/* Stories Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredPosts.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="my-16 text-center py-16 rounded-2xl border border-dashed border-border bg-card">
            <span className="text-3xl block mb-2">🔍</span>
            <h3 className="font-serif text-xl text-ink">{t.archive.noResultsTitle}</h3>
            <p className="text-sm text-muted-text mt-2 max-w-sm mx-auto">
              {t.archive.noResultsDesc}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-5 rounded-xl bg-navy hover:bg-navy-soft px-5 py-2 text-xs font-bold text-white shadow-button transition cursor-pointer"
            >
              {t.archive.clearFilters}
            </button>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}

export default function BlogArchivePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper-public" />}>
      <BlogArchiveContent />
    </Suspense>
  );
}
