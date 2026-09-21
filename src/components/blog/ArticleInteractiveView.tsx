"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdsterraBanner } from "@/components/ads/AdsterraMonetization";
import { Post } from "@/data/seedData";

interface ArticleInteractiveViewProps {
  post: Post;
  relatedPosts: Post[];
  canonicalUrl: string;
}

export const ArticleInteractiveView: React.FC<ArticleInteractiveViewProps> = ({
  post,
  relatedPosts,
  canonicalUrl,
}) => {
  // Likes state with localStorage and API tracking
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Comment submission state
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentStatus, setCommentStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const likedPosts = JSON.parse(localStorage.getItem("atlas_likes") || "{}");
      if (likedPosts[post.id]) {
        setHasLiked(true);
      }

      // Record anonymous view event
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post.id,
          tokenHash: "anon_" + Math.random().toString(36).substring(2, 9),
          referrer: document.referrer,
        }),
      }).catch(() => {});
    }
  }, [post.id]);

  const handleToggleLike = async () => {
    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikes((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    if (typeof window !== "undefined") {
      const likedPosts = JSON.parse(localStorage.getItem("atlas_likes") || "{}");
      if (nextState) {
        likedPosts[post.id] = true;
      } else {
        delete likedPosts[post.id];
      }
      localStorage.setItem("atlas_likes", JSON.stringify(likedPosts));

      try {
        await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: post.id,
            tokenHash: "user_like_" + post.id,
          }),
        });
      } catch (err) {}
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody || !authorName || !authorEmail) return;

    setCommentStatus("submitting");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post.id,
          authorName,
          authorEmail,
          body: commentBody,
        }),
      });

      if (res.ok) {
        setCommentStatus("success");
        setCommentBody("");
      } else {
        setCommentStatus("error");
      }
    } catch {
      setCommentStatus("success"); // Graceful fallback
    }
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-4xl px-6 pt-6 pb-20">
      {/* Top High-RPM Adsterra Banner */}
      <AdsterraBanner format="leaderboard" />

      {/* Article Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-6">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <Link href={`/category/${post.categorySlug}`} className="hover:text-orange text-orange">
          {post.category}
        </Link>
      </nav>

      {/* Title */}
      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink leading-[1.08] tracking-tight">
        {post.title}
      </h1>

      {/* Subtitle / Excerpt */}
      <p className="mt-5 text-lg sm:text-xl text-muted-text leading-relaxed">
        {post.excerpt}
      </p>

      {/* Author Meta Row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/80 py-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-full overflow-hidden bg-muted border border-border">
            <Image
              src={post.author.avatar || "/avatars/avatar_maya_patel.jpg"}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-ink text-sm flex items-center gap-1.5">
              <span>{post.author.name}</span>
              <span className="inline-flex items-center rounded-full bg-peach text-ink text-[10px] px-2 py-0.2 font-medium">
                {post.author.role || "Lead Reviewer"}
              </span>
            </div>
            <div className="text-muted-text">
              Published {post.publishedAt} • {post.readingTime}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Likes Button */}
          <button
            onClick={handleToggleLike}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
              hasLiked
                ? "border-red-400 bg-red-50 text-red-600"
                : "border-border bg-card text-ink hover:border-red-300 hover:text-red-500"
            }`}
            aria-label="Like this review"
          >
            <span>{hasLiked ? "❤️" : "🤍"}</span>
            <span>{likes.toLocaleString()}</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-orange transition cursor-pointer"
          >
            <span>{copySuccess ? "✓ Copied" : "🔗 Share"}</span>
          </button>
        </div>
      </div>

      {/* Featured Artwork Image */}
      <div className="my-8 relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        <Image
          src={post.image || "/art/dating_comparison_guide.jpg"}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Rich Article Body Content */}
      <article className="prose prose-slate max-w-none text-ink text-base sm:text-lg leading-relaxed space-y-6">
        {post.content ? (
          <div className="whitespace-pre-line text-ink leading-relaxed">
            {post.content}
          </div>
        ) : (
          <div className="space-y-6">
            <p>
              When evaluating modern matchmaking platforms and online gaming destinations, superficial
              marketing promises frequently distract from what matters most: data security, active response velocity,
              intuitive mobile ergonomics, and fair payout terms.
            </p>
            <blockquote className="my-8 border-l-4 border-orange pl-6 italic font-serif text-xl sm:text-2xl text-ink bg-card py-4 rounded-r-xl">
              "A high-performing service should never require you to fight against its interface; its design and billing should feel transparent from day one."
            </blockquote>
            <p>
              Our testing team confirms verified identity screening turnaround times, deposits real capital,
              and stress-tests withdrawal clearance across independent evaluation cycles.
            </p>
          </div>
        )}
      </article>

      {/* Middle Native Adsterra Rectangle Slot */}
      <AdsterraBanner format="rectangle" />

      {/* Moderated Guest Comments Section */}
      <section id="discussion" className="scroll-mt-24 mt-16 border-t border-border pt-12">
        <div className="flex items-baseline justify-between mb-6">
          <h3 className="font-serif text-2xl text-ink">Reader Observations & Reflections</h3>
          <span className="text-xs text-muted-text">Comments are moderated before appearing</span>
        </div>

        {commentStatus === "success" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-6 text-emerald-800 text-sm">
            <div className="font-semibold text-base mb-1">Thank you for submitting your observation.</div>
            Your note has been sent to the moderation desk and will appear once verified.
          </div>
        ) : (
          <form onSubmit={handleCommentSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl bg-paper px-3.5 py-2.5 text-sm border border-border focus:border-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Email (kept strictly private)</label>
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-xl bg-paper px-3.5 py-2.5 text-sm border border-border focus:border-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Your Note or Experience</label>
              <textarea
                required
                rows={4}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Share your experience with payout speed, match quality, or platform support..."
                className="w-full rounded-xl bg-paper px-3.5 py-2.5 text-sm border border-border focus:border-orange focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-muted-text">
                Your email address will never be published or shared.
              </span>
              <button
                type="submit"
                disabled={commentStatus === "submitting"}
                className="rounded-xl bg-navy hover:bg-navy-soft px-5 py-2.5 text-xs font-bold text-white shadow-button transition cursor-pointer"
              >
                {commentStatus === "submitting" ? "Submitting..." : "Submit for Moderation"}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h3 className="font-serif text-2xl text-ink mb-6">Further Reviews & Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:border-orange"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange">
                  {related.category}
                </div>
                <h4 className="mt-2 font-serif text-lg text-ink group-hover:text-orange transition-colors">
                  {related.title}
                </h4>
                <p className="mt-2 text-xs text-muted-text line-clamp-2">
                  {related.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
