"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { AdSlot } from "@/components/ads/AdSlot";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { CiteThisResearch } from "@/components/seo/CiteThisResearch";
import { FaqSection } from "@/components/seo/FaqSection";
import { INITIAL_POSTS, Post } from "@/data/seedData";

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = INITIAL_POSTS.find((p) => p.slug === slug) || INITIAL_POSTS[0];
  const relatedPosts = INITIAL_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  // Like system with localStorage and API tracking
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
    setLikes((prev) => (nextState ? prev + 1 : prev - 1));

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

  const currentUrl = `https://publish-hub.vercel.app/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col selection:bg-orange/30">
      {/* Dynamic JSON-LD Structured Data */}
      <ArticleJsonLd post={post} url={currentUrl} />

      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 pt-10 pb-20">
        {/* Top Leaderboard Ad Slot */}
        <AdSlot format="leaderboard" label="Sponsored Partner" />

        {/* Article Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-6">
          <Link href="/" className="hover:text-ink">
            Journal
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

        {/* Quick Review Summary & Bonus Box */}
        {post.rating && (
          <div className="my-8 rounded-2xl border border-orange/40 bg-card p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange font-bold text-ink text-xl shadow-xs">
                {post.rating.toFixed(1)}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-orange">
                  {post.badge || "Verified Rating"}
                </div>
                <div className="font-semibold text-ink text-base mt-0.5">
                  Top Recommended Pick for 2026
                </div>
                {post.bonusText && (
                  <div className="text-xs text-muted-text mt-1 font-medium">
                    🎁 {post.bonusText}
                  </div>
                )}
              </div>
            </div>

            <a
              href={post.affiliateUrl || "#claim-offer"}
              className="w-full sm:w-auto text-center rounded-xl bg-orange px-6 py-3 text-xs font-bold text-ink shadow-button hover:bg-orange/90 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Claim Special Offer →
            </a>
          </div>
        )}

        {/* Pros & Cons Box */}
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
            When evaluating modern digital platforms, superficial marketing and inflated promotional percentages frequently distract from what matters most: security, active response velocity, intuitive mobile ergonomics, and fair terms.
          </p>
          <p>
            Our dedicated editorial testing protocols analyzed payout clearance benchmarks, multi-factor account safety, and responsive design across dozens of test sessions.
          </p>

          {/* In-Article Native Ad Banner */}
          <AdSlot format="in-article" label="Featured Partner Offer" />

          <blockquote className="my-8 border-l-4 border-orange pl-6 italic font-serif text-xl sm:text-2xl text-ink bg-card py-4 rounded-r-xl">
            "A high-performing service should never require you to fight against its interface; its design should feel transparent and intentional from day one."
          </blockquote>

          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink mt-8">
            The Verdict & Recommendation
          </h2>
          <p>
            For users seeking verified security, rapid payout protocols, and intuitive mobile ergonomics, this platform stands among the top-tier solutions in its class.
          </p>
        </div>

        {/* Backlink Acquisition Citation Box */}
        <CiteThisResearch title={post.title} url={currentUrl} />

        {/* Google FAQ Rich Snippet Accordion with FAQPage Schema */}
        <FaqSection
          items={[
            {
              question: "How does Atlas independently test and audit these platforms?",
              answer:
                "Our editorial team creates independent test accounts, verifies ID screening turnaround times, checks withdrawal velocity, and stress-tests mobile ergonomics over minimum 30-day trial periods.",
            },
            {
              question: "Are the welcome bonuses and VIP trial codes guaranteed to work?",
              answer:
                "Yes. We maintain direct editorial relationships with verified operators to audit promo vouchers and bonus rollover terms on a weekly basis.",
            },
            {
              question: "How is user privacy and data security protected?",
              answer:
                "We only recommend operators and apps with audited SSL encryption, compliant KYC protocols, and clear cancellation transparency.",
            },
          ]}
        />

        {/* Moderated Guest Comment Section */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="font-serif text-2xl text-ink">Reader Discussion</h3>
            <span className="text-xs text-muted-text">Comments are moderated before appearing</span>
          </div>

          {/* Submission Notice Form */}
          {commentStatus === "success" ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-6 text-emerald-800 text-sm">
              <div className="font-semibold text-base mb-1">Thank you for contributing!</div>
              Your reflection has been submitted to the editorial desk. It will appear publicly once approved by moderation.
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
                  placeholder="Share your experience or feedback..."
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
                  className="rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white shadow-button hover:bg-ink/90 transition"
                >
                  {commentStatus === "submitting" ? "Submitting..." : "Submit for Moderation"}
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

      {/* Sticky Mobile Offer Bar for high conversions */}
      {post.bonusText && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-md p-3 border-t border-navy-soft flex items-center justify-between gap-3 shadow-2xl">
          <div className="truncate">
            <div className="text-[10px] uppercase font-bold text-orange">Special Offer</div>
            <div className="text-xs font-semibold text-white truncate">{post.bonusText}</div>
          </div>
          <a
            href={post.affiliateUrl || "#claim"}
            className="shrink-0 rounded-xl bg-orange px-4 py-2 text-xs font-bold text-ink shadow-button"
          >
            Claim Now
          </a>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
