"use client";

import React from "react";
import Link from "next/link";
import { Category, Post } from "@/data/seedData";
import { useI18n } from "@/lib/i18n";
import { getLocalizedCategory, getLocalizedCategoryDesc } from "@/lib/translations";
import { StoryCard } from "@/components/public/StoryCard";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { AdsterraBanner } from "@/components/ads/AdsterraMonetization";

interface CategoryArchiveViewProps {
  category: Category;
  allCategories: Category[];
  posts: Post[];
}

export const CategoryArchiveView: React.FC<CategoryArchiveViewProps> = ({
  category,
  allCategories,
  posts,
}) => {
  const { locale, t } = useI18n();

  const localizedName = getLocalizedCategory(category.slug, locale);
  const localizedDesc = getLocalizedCategoryDesc(category.slug, locale) || category.description;

  return (
    <main className="flex-1 mx-auto w-full max-w-6xl px-6 pt-6 pb-20">
      {/* Top Adsterra Leaderboard Slot */}
      <AdsterraBanner format="leaderboard" />

      <div className="border-b border-border/80 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">
          <Link href="/blog" className="hover:text-ink">
            {t.categoryArchive.allTopics}
          </Link>
          <span>/</span>
          <span className="text-orange">{localizedName}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-ink">
          {localizedName}
        </h1>
        <p className="mt-3 text-base text-muted-text max-w-2xl leading-relaxed">
          {localizedDesc}
        </p>
      </div>

      <TopicRibbon categories={allCategories} activeCategory={category.slug} />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {posts.map((post) => (
            <StoryCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="my-16 text-center py-16 rounded-2xl border border-dashed border-border bg-card">
          <span className="text-3xl block mb-2">✍️</span>
          <h3 className="font-serif text-xl text-ink">{t.categoryArchive.noStoriesTitle}</h3>
          <p className="text-sm text-muted-text mt-2 max-w-sm mx-auto">
            {t.categoryArchive.noStoriesDesc}
          </p>
          <Link
            href="/blog"
            className="mt-5 inline-block rounded-xl bg-navy hover:bg-navy-soft px-5 py-2.5 text-xs font-bold text-white shadow-button transition"
          >
            {t.categoryArchive.backButton}
          </Link>
        </div>
      )}
    </main>
  );
};
