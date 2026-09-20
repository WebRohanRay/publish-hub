"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { INITIAL_POSTS, Post } from "@/data/seedData";

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = INITIAL_POSTS.find((p) => p.slug === slug) || INITIAL_POSTS[0];
  const relatedPosts = INITIAL_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  // Like system with localStorage deduplication
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Comment submission form
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const likedPosts = JSON.parse(localStorage.getItem("atlas_likes") || "{}");
      if (likedPosts[post.id]) {
        setHasLiked(true);
      }
    }
  }, [post.id]);

  const handleToggleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
      const likedPosts = JSON.parse(localStorage.getItem("atlas_likes") || "{}");
      delete likedPosts[post.id];
      localStorage.setItem("atlas_likes", JSON.stringify(likedPosts));
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      const likedPosts = JSON.parse(localStorage.getItem("atlas_likes") || "{}");
      likedPosts[post.id] = true;
      localStorage.setItem("atlas_likes", JSON.stringify(likedPosts));
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody || !authorName || !authorEmail) return;
    setCommentSubmitted(true);
    setCommentBody("");
  };

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 pt-10 pb-20">
        {/* Article Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-6">
          <Link href="/" className="hover:text-ink">
            Journal
          </Link>
          <span>/</span>
          <Link href={`/category/${post.categorySlug}`} className="hover:text-orange text-orange">
            {post.category}
          </Link>
        </div>

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
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div>
              <div className="font-semibold text-ink text-sm">{post.author.name}</div>
              <div className="text-muted-text">
                Published {post.publishedAt} • {post.readingTime}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Likes Button */}
            <button
              onClick={handleToggleLike}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
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
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-orange transition"
            >
              <span>{copySuccess ? "✓ Copied!" : "🔗 Share"}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-16/9 w-full my-10 overflow-hidden rounded-2xl border border-border shadow-soft">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Pros & Cons Box if review */}
        {(post.pros || post.cons) && (
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-6 shadow-xs">
            {post.pros && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-emerald-800 text-sm mb-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                    ✓
                  </span>
                  Key Strengths
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-text">
                  {post.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.cons && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-amber-800 text-sm mb-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs">
                    !
                  </span>
                  Considerations & Limitations
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-text">
                  {post.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-ink text-base sm:text-lg leading-relaxed space-y-6">
          <p>
            When evaluating digital platforms, superficial metrics such as download counts or flash promotions frequently conceal the real everyday user experience.
          </p>
          <p>
            Our testing benchmarked active response velocity, ID verification integrity, customer support responsiveness, and cancellation transparency across multiple independent test accounts.
          </p>

          <blockquote className="my-8 border-l-4 border-orange pl-6 italic font-serif text-xl sm:text-2xl text-ink bg-card py-4 rounded-r-xl">
            "A high-performing service should never require you to fight against its interface; its design should feel transparent and intentional from day one."
          </blockquote>

          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink mt-8">
            The Verdict & Recommendation
          </h2>
          <p>
            For users seeking verified security, rapid payout protocols, and intuitive mobile ergonomics, this platform stands among the top-tier solutions in its class.
          </p>

          {post.bonusText && (
            <div className="my-8 rounded-2xl bg-orange-soft/40 border border-orange/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange">Special Partner Offer</div>
                <div className="font-serif text-xl font-normal text-ink mt-1">{post.bonusText}</div>
              </div>
              <a
                href={post.affiliateUrl || "#"}
                className="shrink-0 rounded-xl bg-orange px-6 py-3 text-xs font-bold text-ink shadow-button hover:bg-orange/90 transition active:scale-[0.98]"
              >
                Claim Verified Offer →
              </a>
            </div>
          )}
        </div>

        {/* Moderated Guest Comment Section */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-serif text-2xl text-ink">Reader Discussion</h3>
            <span className="text-xs text-muted-text">Comments are moderated before appearing</span>
          </div>

          {/* Submission Notice Form */}
          {commentSubmitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-6 text-emerald-800 text-sm">
              <div className="font-semibold text-base mb-1">Thank you for contributing!</div>
              Your comment has been submitted to the editorial desk for review. It will appear once approved.
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
                  <label className="block text-xs font-semibold text-ink mb-1">Email (kept private)</label>
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
                <label className="block text-xs font-semibold text-ink mb-1">Your Reflection</label>
                <textarea
                  required
                  rows={4}
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Share your experience or inquiry..."
                  className="w-full rounded-xl bg-paper px-3.5 py-2.5 text-sm border border-border focus:border-orange focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-muted-text">
                  Your email address will never be published or shared.
                </span>
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white shadow-button hover:bg-ink/90 transition"
                >
                  Submit for Moderation
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Related Articles */}
        <section className="mt-16 border-t border-border pt-12">
          <h3 className="font-serif text-2xl text-ink mb-6">Related Editorial Stories</h3>
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
      </main>

      <PublicFooter />
    </div>
  );
}
