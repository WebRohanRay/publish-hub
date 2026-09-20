"use client";

import React, { useState } from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { StoryCard } from "@/components/public/StoryCard";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { INITIAL_CATEGORIES, INITIAL_POSTS } from "@/data/seedData";

export default function BlogArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "rating">("latest");

  const filteredPosts = INITIAL_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "popular") return b.reads - a.reads;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0; // latest default
  });

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 pt-10 pb-20">
        {/* Page Header */}
        <div className="border-b border-border/80 pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange">
            The Complete Archive
          </span>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
            All Reviews, Guides & Stories
          </h1>
          <p className="mt-3 text-base text-muted-text max-w-2xl">
            Explore our unbiased editorial breakdowns, comparison matrices, and deep dives across dating, iGaming, and digital culture.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews & guides..."
              className="w-full rounded-xl bg-card px-4 py-2.5 text-sm border border-border focus:border-orange focus:outline-none shadow-xs"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl bg-card px-3.5 py-2.5 text-xs font-semibold text-ink border border-border focus:border-orange focus:outline-none shadow-xs"
            >
              <option value="latest">Sort: Newest First</option>
              <option value="popular">Sort: Most Read</option>
              <option value="rating">Sort: Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Category Filter Ribbon */}
        <TopicRibbon categories={INITIAL_CATEGORIES} />

        {/* Stories Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredPosts.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="my-16 text-center py-16 rounded-2xl border border-dashed border-border bg-card">
            <h3 className="font-serif text-xl text-ink">No reviews match your query</h3>
            <p className="text-sm text-muted-text mt-2">
              Try adjusting your search terms or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
