"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdsterraBanner } from "@/components/ads/AdsterraMonetization";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { StoryCard } from "@/components/public/StoryCard";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";
import { Post } from "@/data/seedData";
import { useI18n } from "@/lib/i18n";
import { getLocalizedPost } from "@/lib/translations";

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
  const { locale, t } = useI18n();
  const localizedPost = getLocalizedPost(post, locale);

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
      const likedPosts = JSON.parse(localStorage.getItem("noxwire_likes") || localStorage.getItem("atlas_likes") || "{}");
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
      const likedPosts = JSON.parse(localStorage.getItem("noxwire_likes") || "{}");
      if (nextState) {
        likedPosts[post.id] = true;
      } else {
        delete likedPosts[post.id];
      }
      localStorage.setItem("noxwire_likes", JSON.stringify(likedPosts));

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
    } catch (err) {
      setCommentStatus("error");
    }
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-4xl px-6 pt-6 pb-20">
      {/* Top Native Adsterra Banner Slot */}
      <AdsterraBanner format="leaderboard" />

      {/* Article Breadcrumb & Language Switcher Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text">
          <Link href="/" className="hover:text-ink">
            {t.article.homeBreadcrumb}
          </Link>
          <span>/</span>
          <Link href={`/category/${localizedPost.categorySlug}`} className="hover:text-orange text-orange">
            {localizedPost.category}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-text hidden sm:inline">{t.nav.editionLanguage}:</span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink leading-[1.08] tracking-tight">
        {localizedPost.title}
      </h1>

      {/* Subtitle / Excerpt */}
      <p className="mt-5 text-lg sm:text-xl text-muted-text leading-relaxed">
        {localizedPost.excerpt}
      </p>

      {/* Author Meta Row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/80 py-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-full overflow-hidden bg-muted border border-border">
            <Image
              src={localizedPost.author?.avatar || "/avatars/avatar_maya_patel.jpg"}
              alt={localizedPost.author?.name || "Reviewer"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-ink text-sm flex items-center gap-1.5">
              <span>{localizedPost.author?.name || "Rohan Ray"}</span>
              <span className="inline-flex items-center rounded-full bg-peach text-ink text-[10px] px-2 py-0.2 font-medium">
                {localizedPost.author?.role || t.article.leadReviewer}
              </span>
            </div>
            <div className="text-muted-text">
              {t.article.published} {localizedPost.publishedAt} • {localizedPost.readingTime}
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
            aria-label={t.article.like}
          >
            <span>{hasLiked ? "❤️" : "🤍"}</span>
            <span>{likes.toLocaleString()}</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-orange transition cursor-pointer"
          >
            <span>{copySuccess ? t.article.copied : `🔗 ${t.article.share}`}</span>
          </button>
        </div>
      </div>

      {/* Featured Artwork Image */}
      <div className="my-8 relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        <Image
          src={localizedPost.image || "/art/dating_comparison_guide.jpg"}
          alt={localizedPost.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
        {localizedPost.badge && (
          <div className="absolute top-4 left-4">
            <span className="rounded-md bg-navy/90 backdrop-blur-xs px-3 py-1.5 text-xs font-bold text-white shadow-md">
              {localizedPost.badge}
            </span>
          </div>
        )}
      </div>

      {/* Multilingual Executive Summary Callout Box when reading in ES, DE, or FR */}
      {locale !== "en" && (
        <div className="my-8 rounded-2xl border border-orange/40 bg-orange-soft/30 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange mb-2">
            <span>📌</span>
            <span>
              {locale === "es"
                ? "Resumen Ejecutivo y Puntos Clave de la Investigación"
                : locale === "de"
                ? "Zusammenfassung des Prüfberichts & Wichtigste Erkenntnisse"
                : "Synthèse Exécutive et Points Clés du Rapport d'Audit"}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-ink mb-3 font-semibold">
            {localizedPost.title}
          </h3>
          <p className="text-sm sm:text-base text-ink/90 leading-relaxed">
            {localizedPost.excerpt}
          </p>
          <div className="mt-4 pt-4 border-t border-orange/20 flex flex-wrap items-center gap-4 text-xs text-muted-text">
            <span>✓ {t.comparison.updatedToday}</span>
            <span>•</span>
            <span>🛡️ {localizedPost.category}</span>
            <span>•</span>
            <span>⏱️ {localizedPost.readingTime}</span>
          </div>
        </div>
      )}

      {/* Rich Article Body Content */}
      <article className="max-w-none text-ink text-base sm:text-lg leading-relaxed">
        {post.content ? (
          <MarkdownRenderer content={post.content} />
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
          <h3 className="font-serif text-2xl text-ink">{t.article.commentsHeading}</h3>
          <span className="text-xs text-muted-text">{t.article.commentsNote}</span>
        </div>

        {commentStatus === "success" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-6 text-emerald-800 text-sm">
            <div className="font-semibold text-base mb-1">{t.article.thankYou}</div>
            {t.article.thankYouNote}
          </div>
        ) : (
          <form onSubmit={handleCommentSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">{t.article.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Julian M."
                  className="w-full rounded-xl bg-paper px-4 py-2.5 text-sm border border-border focus:border-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">{t.article.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="julian@example.com"
                  className="w-full rounded-xl bg-paper px-4 py-2.5 text-sm border border-border focus:border-orange focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">{t.article.bodyLabel}</label>
              <textarea
                required
                rows={4}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Share your verified experience or observation with this platform..."
                className="w-full rounded-xl bg-paper p-4 text-sm border border-border focus:border-orange focus:outline-none leading-relaxed"
              />
            </div>
            <button
              type="submit"
              disabled={commentStatus === "submitting"}
              className="rounded-xl bg-ink hover:bg-ink/90 text-white px-6 py-3 text-xs font-bold shadow-button transition cursor-pointer"
            >
              {commentStatus === "submitting" ? t.article.submittingBtn : t.article.submitBtn}
            </button>
          </form>
        )}
      </section>

      {/* Related Investigations Grid */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h3 className="font-serif text-2xl text-ink mb-6">
            {t.article.relatedHeading}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <StoryCard key={rel.id} post={rel} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
