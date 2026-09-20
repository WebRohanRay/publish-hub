import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/seedData";

interface FeatureStoryProps {
  post: Post;
}

export const FeatureStory: React.FC<FeatureStoryProps> = ({ post }) => {
  return (
    <section className="relative my-8 overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text">
            <span className="h-2 w-2 rounded-full bg-orange" />
            <span>Featured Review & Intelligence</span>
            <span>•</span>
            <span className="text-orange">{post.category}</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-normal leading-[1.08] text-ink tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-base sm:text-lg text-muted-text leading-relaxed">
            {post.excerpt}
          </p>

          {/* Bonus / Offer banner if available */}
          {post.bonusText && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-soft/60 border border-orange/40 px-4 py-2.5 text-xs font-semibold text-ink">
              <span className="text-sm">🎁</span>
              <span>{post.bonusText}</span>
            </div>
          )}

          {/* Read CTA and Social Proof */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-button transition hover:bg-ink/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Read Full Breakdown</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-mint flex items-center justify-center text-[10px] font-bold text-ink">
                  JD
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-lavender flex items-center justify-center text-[10px] font-bold text-ink">
                  SK
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-orange-soft flex items-center justify-center text-[10px] font-bold text-ink">
                  MP
                </div>
              </div>
              <span className="text-xs text-muted-text font-medium">
                12,400+ readers this month
              </span>
            </div>
          </div>
        </div>

        {/* Right Feature Artwork Frame */}
        <div className="lg:col-span-6 relative aspect-16/10 overflow-hidden rounded-2xl border border-border/80 bg-paper-public shadow-xs group">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute top-4 right-4 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-ink border border-border">
            {post.readingTime}
          </div>
        </div>
      </div>
    </section>
  );
};
