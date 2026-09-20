import React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { FeatureStory } from "@/components/public/FeatureStory";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { StoryCard } from "@/components/public/StoryCard";
import { ComparisonTable } from "@/components/public/ComparisonTable";
import { NewsletterSection } from "@/components/public/NewsletterSection";
import { PublicFooter } from "@/components/public/PublicFooter";
import { INITIAL_CATEGORIES, INITIAL_POSTS } from "@/data/seedData";

export default function HomePage() {
  const featurePost = INITIAL_POSTS[0];
  const latestPosts = INITIAL_POSTS.slice(1, 4);

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 pt-8 pb-16">
        {/* Editorial Hero Statement */}
        <section className="pt-8 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text">
            <span className="h-2 w-2 rounded-full bg-orange" />
            <span>A publication for the curious</span>
          </div>

          <h1 className="mt-3 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.96] text-ink tracking-tight max-w-4xl">
            Reviews and intelligence that make choices{" "}
            <span className="italic font-serif text-orange">clearer.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-muted-text max-w-2xl leading-relaxed">
            Atlas is an independent weekly journal evaluating top matchmaking platforms, regulated iGaming operators, and intentional tools shaping how we connect and play.
          </p>
        </section>

        {/* Top Feature Story */}
        <FeatureStory post={featurePost} />

        {/* High Converting Comparison Table */}
        <ComparisonTable />

        {/* Category Exploration Ribbon */}
        <TopicRibbon categories={INITIAL_CATEGORIES} />

        {/* Latest Stories Grid */}
        <section className="my-12">
          <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                Fresh from the desk
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-0.5">
                Latest stories & breakdowns
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-ink hover:text-orange transition-colors flex items-center gap-1"
            >
              <span>View all stories</span>
              <span>→</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* The Sunday Edition Newsletter */}
        <NewsletterSection />
      </main>

      <PublicFooter />
    </div>
  );
}
