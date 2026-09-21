import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/seedData";

interface StoryCardProps {
  post: Post;
}

export const StoryCard: React.FC<StoryCardProps> = ({ post }) => {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-soft transition-all duration-300 hover:border-slate-400/50 hover:shadow-lg hover:-translate-y-1">
      {/* Image Frame with reading time */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-16/9 w-full overflow-hidden bg-muted">
        <Image
          src={post.image || "/art/feature_personal_ai.jpg"}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.badge && (
          <div className="absolute top-3 left-3">
            <span className="rounded-md bg-navy/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
              {post.badge}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-semibold text-ink shadow-xs">
          {post.readingTime}
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category & Published Date */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-text">
          <span className="font-semibold text-orange uppercase tracking-wider text-[11px]">
            {post.category}
          </span>
          <span className="text-[11px] text-muted-text">
            {post.publishedAt}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-serif text-xl font-normal leading-snug text-ink group-hover:text-orange transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-2.5 text-sm text-muted-text line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Card Footer: Author + Read Link */}
        <div className="mt-auto pt-6 border-t border-border/70 flex items-center justify-between text-xs text-muted-text">
          <div className="flex items-center gap-2.5">
            <div className="relative h-6 w-6 rounded-full overflow-hidden bg-muted border border-border">
              <Image
                src={post.author.avatar || "/avatars/avatar_maya_patel.jpg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium text-ink">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="font-semibold text-ink group-hover:text-orange flex items-center gap-1"
          >
            <span>Read story</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
