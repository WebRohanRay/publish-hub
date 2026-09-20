"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { StoryCard } from "@/components/public/StoryCard";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { INITIAL_CATEGORIES, INITIAL_POSTS } from "@/data/seedData";

export default function CategoryArchivePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const currentCategory =
    INITIAL_CATEGORIES.find((c) => c.slug === slug) || INITIAL_CATEGORIES[0];
  const categoryPosts = INITIAL_POSTS.filter(
    (post) => post.categorySlug === currentCategory.slug
  );

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 pt-10 pb-20">
        <div className="border-b border-border/80 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">
            <Link href="/blog" className="hover:text-ink">
              All Categories
            </Link>
            <span>/</span>
            <span className="text-orange">{currentCategory.name}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            {currentCategory.name}
          </h1>
          <p className="mt-3 text-base text-muted-text max-w-2xl">
            {currentCategory.description}
          </p>
        </div>

        <TopicRibbon categories={INITIAL_CATEGORIES} activeCategory={currentCategory.slug} />

        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {categoryPosts.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="my-16 text-center py-16 rounded-2xl border border-dashed border-border bg-card">
            <h3 className="font-serif text-xl text-ink">No articles published in this category yet.</h3>
            <p className="text-sm text-muted-text mt-2">
              Our editorial desk is preparing new reviews for this vertical.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-block rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white"
            >
              Back to All Reviews
            </Link>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
