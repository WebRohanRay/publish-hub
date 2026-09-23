"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { dataStore } from "@/lib/dataStore";
import { Post, INITIAL_CATEGORIES } from "@/data/seedData";

interface PostEditorFormProps {
  initialPost?: Post;
}

export const PostEditorForm: React.FC<PostEditorFormProps> = ({ initialPost }) => {
  const router = useRouter();

  // Primary fields
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(
    initialPost?.content ||
      "### The Evolution of Modern Matchmaking Platforms\n\nIn our rigorous 60-day independent evaluation, we analyzed response times, verified ID rates, and cancellation transparency across leading networks."
  );
  const [category, setCategory] = useState(
    initialPost?.category || INITIAL_CATEGORIES[0].name
  );
  const [categorySlug, setCategorySlug] = useState(
    initialPost?.categorySlug || INITIAL_CATEGORIES[0].slug
  );
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">(
    (initialPost?.status as any) || "draft"
  );
  const [readingTime, setReadingTime] = useState(initialPost?.readingTime || "6 min read");
  const [image, setImage] = useState(initialPost?.image || "/art/feature_personal_ai.jpg");

  // Affiliate & Review fields
  const [rating, setRating] = useState(initialPost?.rating || 4.9);
  const [badge, setBadge] = useState(initialPost?.badge || "Editor's Top Pick");
  const [bonusText, setBonusText] = useState(
    initialPost?.bonusText || "Free 7-Day VIP Trial + Unlimited Swipes"
  );
  const [affiliateUrl, setAffiliateUrl] = useState(initialPost?.affiliateUrl || "#claim-offer");
  const [prosText, setProsText] = useState(
    initialPost?.pros?.join("\n") ||
      "Rigorous photo & ID verification eliminates bots\nAlgorithmic compatibility scoring based on real behavior\nFree tier includes 5 free direct messages daily"
  );
  const [consText, setConsText] = useState(
    initialPost?.cons?.join("\n") ||
      "Travel mode requires premium tier\nHigher subscription price on iOS App Store than web"
  );

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.title || "");
  const [seoDescription, setSeoDescription] = useState(initialPost?.excerpt || "");
  const [focusKeyword, setFocusKeyword] = useState("best dating apps 2026");

  // UI state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [savedTime, setSavedTime] = useState("Saved just now");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialPost) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
      setSeoTitle(val);
    }
  };

  const handleSave = async (publishNow: boolean = false) => {
    const newStatus = publishNow ? "published" : status;
    const prosArray = prosText
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
    const consArray = consText
      .split("\n")
      .map((c) => c.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || "untitled-article",
      excerpt,
      content,
      category,
      categorySlug,
      status: newStatus,
      readingTime,
      image,
      rating: Number(rating),
      badge,
      bonusText,
      affiliateUrl,
      pros: prosArray,
      cons: consArray,
    };

    try {
      if (initialPost?.id) {
        await fetch(`/api/posts/${encodeURIComponent(initialPost.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.error("Failed to save post via API:", err);
    }

    // Keep dataStore cache in sync
    dataStore.savePost({
      id: initialPost?.id,
      ...payload,
    });

    setSavedTime("Saved just now");
    router.push("/admin/posts");
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            {initialPost ? "Edit Article" : "New Post Editor"}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
            {title || "Untitled Editorial"}
          </h1>
          <div className="text-xs text-muted-text mt-0.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{savedTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-ink hover:border-orange transition shadow-xs"
          >
            👁️ Live Preview
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-ink hover:border-ink transition shadow-xs"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="rounded-xl bg-ink px-5 py-2 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition active:scale-[0.98]"
          >
            Publish Article
          </button>
        </div>
      </div>

      {/* Editor Grid: Main Content + Right Settings Column per 4.4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Writing Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
              Article Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a compelling headline..."
              className="w-full rounded-2xl border border-border bg-card px-5 py-3 font-serif text-2xl sm:text-3xl text-ink placeholder-slate-400 focus:border-orange focus:outline-none shadow-xs"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
              Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);
                setSeoDescription(e.target.value);
              }}
              placeholder="Brief editorial summary that draws the reader in..."
              className="w-full rounded-xl border border-border bg-card p-4 text-sm text-ink placeholder-slate-400 focus:border-orange focus:outline-none shadow-xs"
            />
          </div>

          {/* Content Toolbar & Body */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink">
                Rich Article Body
              </label>
              <div className="flex items-center gap-1.5 text-xs text-muted-text">
                <span>Markdown & HTML supported</span>
              </div>
            </div>

            {/* Simulated Rich Text Toolbar */}
            <div className="rounded-t-xl border border-b-0 border-border bg-paper/80 p-2 flex flex-wrap gap-1 text-xs text-ink font-semibold">
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">H1</button>
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">H2</button>
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">H3</button>
              <span className="text-slate-300">|</span>
              <button type="button" className="px-2 py-1 font-bold hover:bg-card rounded-md">B</button>
              <button type="button" className="px-2 py-1 italic hover:bg-card rounded-md">I</button>
              <button type="button" className="px-2 py-1 underline hover:bg-card rounded-md">U</button>
              <span className="text-slate-300">|</span>
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">Quote</button>
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">Code</button>
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">Table</button>
              <button type="button" className="px-2 py-1 hover:bg-card rounded-md">Image</button>
            </div>

            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-b-xl border border-border bg-card p-5 text-sm sm:text-base font-mono leading-relaxed text-ink focus:border-orange focus:outline-none shadow-xs"
            />
          </div>

          {/* Affiliate & Conversion Panel */}
          <div className="rounded-2xl border border-orange/40 bg-orange-soft/20 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-orange/30 pb-3">
              <h3 className="font-serif text-lg text-ink font-semibold flex items-center gap-2">
                <span>🎯</span>
                <span>Affiliate Offer & Evaluation Controls</span>
              </h3>
              <span className="text-[11px] text-orange font-bold uppercase tracking-wider">
                High-Converting Review Perks
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Rating Score</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full rounded-xl bg-card px-3 py-2 text-xs border border-border focus:border-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Editor's Top Pick"
                  className="w-full rounded-xl bg-card px-3 py-2 text-xs border border-border focus:border-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Affiliate Link</label>
                <input
                  type="text"
                  value={affiliateUrl}
                  onChange={(e) => setAffiliateUrl(e.target.value)}
                  placeholder="https://partner.com/?ref=atlas"
                  className="w-full rounded-xl bg-card px-3 py-2 text-xs border border-border focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Headline Bonus / Promo Voucher
              </label>
              <input
                type="text"
                value={bonusText}
                onChange={(e) => setBonusText(e.target.value)}
                placeholder="e.g. 100% Match up to €5,000 + 150 Free Spins"
                className="w-full rounded-xl bg-card px-3 py-2 text-xs border border-border focus:border-orange"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-800 mb-1">
                  Key Strengths (one per line)
                </label>
                <textarea
                  rows={3}
                  value={prosText}
                  onChange={(e) => setProsText(e.target.value)}
                  className="w-full rounded-xl bg-card p-2.5 text-xs border border-border focus:border-emerald-500 font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-800 mb-1">
                  Considerations / Limitations (one per line)
                </label>
                <textarea
                  rows={3}
                  value={consText}
                  onChange={(e) => setConsText(e.target.value)}
                  className="w-full rounded-xl bg-card p-2.5 text-xs border border-border focus:border-amber-500 font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & SEO per 4.4 */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Settings Box */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-4">
            <h3 className="font-serif text-lg text-ink font-semibold border-b border-border pb-3">
              Publishing Controls
            </h3>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border font-semibold text-ink"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const found = INITIAL_CATEGORIES.find((c) => c.name === e.target.value);
                  if (found) setCategorySlug(found.slug);
                }}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border font-semibold text-ink"
              >
                {INITIAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border text-ink font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Reading Time</label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Featured Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border text-ink font-mono text-[11px]"
              />
              <div className="relative aspect-16/9 w-full mt-2 rounded-xl overflow-hidden border border-border bg-muted">
                <Image src={image} alt="Preview" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* SEO & SERP Snippet Box per 4.4 */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-serif text-lg text-ink font-semibold">SEO & Google Preview</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Index Ready
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                <span>SEO Meta Title</span>
                <span className="text-muted-text">{seoTitle.length}/60</span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border text-ink"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                <span>Meta Description</span>
                <span className="text-muted-text">{seoDescription.length}/160</span>
              </div>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full rounded-xl bg-paper p-2.5 text-xs border border-border text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Focus Keyword</label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full rounded-xl bg-paper px-3 py-2 text-xs border border-border text-ink font-semibold"
              />
            </div>

            {/* Google SERP Card Preview */}
            <div className="mt-4 pt-4 border-t border-border/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-text mb-2 block">
                Google Search Appearance
              </span>
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <div className="text-[11px] text-slate-700 truncate">
                  https://publish-hub.vercel.app › blog › {slug || "article"}
                </div>
                <div className="text-sm font-semibold text-blue-800 hover:underline line-clamp-1 mt-0.5">
                  {seoTitle || title || "Article Headline"} | Atlas Journal
                </div>
                <div className="text-xs text-slate-600 line-clamp-2 mt-1 leading-normal">
                  {seoDescription || excerpt || "Editorial evaluation and verified ranking..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal per 4.4 */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-paper-public rounded-3xl overflow-y-auto p-8 shadow-2xl border border-border">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange">
                Exact Public Rendering Preview
              </span>
              <button
                onClick={() => setPreviewOpen(false)}
                className="rounded-full bg-card px-3 py-1 text-xs font-bold text-ink border border-border hover:bg-orange transition"
              >
                ✕ Close Preview
              </button>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase text-orange">{category}</span>
              <h1 className="font-serif text-3xl sm:text-5xl text-ink">{title}</h1>
              <p className="text-lg text-muted-text">{excerpt}</p>
              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-border">
                <Image src={image} alt={title} fill className="object-cover" />
              </div>
              <div className="prose prose-slate max-w-none text-ink text-base leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
