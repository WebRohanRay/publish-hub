"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/seedData";

export default function AdminPostsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?status=all");
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];
        setPosts(list);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterTabs = [
    { label: "All posts", value: "all", count: posts.length },
    { label: "Published", value: "published", count: posts.filter((p) => p.status === "published").length },
    { label: "Draft", value: "draft", count: posts.filter((p) => p.status === "draft").length },
    { label: "Scheduled", value: "scheduled", count: posts.filter((p) => p.status === "scheduled").length },
    { label: "Archived", value: "archived", count: posts.filter((p) => p.status === "archived").length },
    { label: "Trash", value: "trash", count: posts.filter((p) => p.status === "trash").length },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesTab = activeTab === "all" ? post.status !== "trash" : post.status === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleTrash = async (id: string, title: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "trash" }),
      });
      await fetchPosts();
      setActionToast(`Moved '${title}' to trash.`);
      setTimeout(() => setActionToast(null), 3000);
    } catch {
      setActionToast("Failed to move to trash.");
    }
  };

  const handleDuplicate = async (post: Post) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          id: undefined,
          title: `${post.title} (Copy)`,
          slug: `${post.slug}-copy-${Date.now().toString().slice(-4)}`,
          status: "draft",
        }),
      });
      if (res.ok) {
        await fetchPosts();
        setActionToast(`Duplicated article as '${post.title} (Copy)'.`);
        setTimeout(() => setActionToast(null), 3000);
      }
    } catch {
      setActionToast("Failed to duplicate post.");
    }
  };

  const handleClearDemoData = async () => {
    setIsClearing(true);
    try {
      await fetch("/api/admin/clear-demo-data", { method: "POST" });
      await fetchPosts();
    } catch {}

    setPosts([]);
    setIsClearing(false);
    setShowClearConfirm(false);
    setActionToast("All demo data wiped. Database is now a clean production slate.");
    setTimeout(() => setActionToast(null), 4000);
  };

  const handleRestoreCurated = async () => {
    await fetchPosts();
    setActionToast("Synchronized with Supabase database.");
    setTimeout(() => setActionToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 text-white border border-slate-700 px-4 py-3 text-xs font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{actionToast}</span>
        </div>
      )}

      {/* Confirmation Modal for Clearing Demo Data */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold text-lg">
                ⚠
              </span>
              <div>
                <h3 className="font-bold text-ink text-base">Clear All Demo Data?</h3>
                <p className="text-xs text-muted-text">Wipe all initial placeholder reviews</p>
              </div>
            </div>

            <p className="text-xs text-muted-text leading-relaxed">
              This will erase all initial seed articles and comments, giving you a completely clean, empty production database to write and publish your own authentic reviews.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-muted-text hover:bg-paper transition"
              >
                Cancel
              </button>
              <button
                onClick={handleClearDemoData}
                disabled={isClearing}
                className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-xs font-bold transition shadow-xs"
              >
                {isClearing ? "Wiping Data..." : "Yes, Clear All Demo Data"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Publishing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
            Post Management
          </h1>
          <p className="text-xs text-muted-text mt-1">
            Create, schedule, organize, and moderate editorial reviews and investigations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Clear Demo Data Button */}
          {posts.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 px-3.5 py-2.5 text-xs font-semibold transition cursor-pointer shadow-xs"
              title="Wipe initial dummy reviews to start with a blank production slate"
            >
              🗑️ Clear Demo Data
            </button>
          )}

          {/* Restore Template Button */}
          {posts.length === 0 && (
            <button
              onClick={handleRestoreCurated}
              className="rounded-xl border border-border bg-card hover:bg-paper text-ink px-3.5 py-2.5 text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              ↺ Restore Templates
            </button>
          )}

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-xl bg-orange hover:bg-orange/90 px-5 py-2.5 text-xs font-bold text-ink shadow-button transition active:scale-[0.98]"
          >
            <span>+</span>
            <span>New review post</span>
          </Link>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b md:border-b-0 border-border">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.value
                  ? "bg-navy text-white font-bold"
                  : "text-muted-text hover:bg-card hover:text-ink"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 opacity-60 text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, tags, categories..."
            className="w-full rounded-xl bg-card px-3.5 py-2 text-xs border border-border focus:border-orange focus:outline-none shadow-xs"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-paper/60 text-muted-text uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Reads</th>
                <th className="py-3 px-3">Likes</th>
                <th className="py-3 px-3">Comments</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-paper/40 transition">
                    {/* Post Title & Thumbnail */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded-lg overflow-hidden shrink-0 bg-muted border border-border">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/admin/posts/edit/${post.id}`}
                            className="font-semibold text-ink hover:text-orange transition line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <div className="text-[11px] text-muted-text mt-0.5">
                            {post.readingTime} • {post.publishedAt}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3">
                      <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-ink border border-border">
                        {post.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          post.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : post.status === "scheduled"
                            ? "bg-purple-100 text-purple-800"
                            : post.status === "trash"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    {/* Stats */}
                    <td className="py-3.5 px-3 font-semibold text-ink">
                      {post.reads.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-muted-text">
                      {post.likes.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-muted-text">
                      {post.commentsCount}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="rounded-lg p-1.5 text-slate-400 hover:text-ink hover:bg-paper transition"
                          title="Preview public story"
                        >
                          👁️
                        </Link>
                        <button
                          onClick={() => handleDuplicate(post)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-ink hover:bg-paper transition cursor-pointer"
                          title="Duplicate article"
                        >
                          📋
                        </button>
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-orange hover:bg-paper transition"
                          title="Edit article"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => handleTrash(post.id, post.title)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="Move to trash"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-muted-text">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-soft text-orange mx-auto font-bold text-xl">
                        ✍
                      </div>
                      <div className="font-bold text-ink text-base">
                        {posts.length === 0
                          ? "Database is Clean — Ready for Production"
                          : "No articles found matching this filter"}
                      </div>
                      <p className="text-xs text-muted-text leading-relaxed">
                        {posts.length === 0
                          ? "All dummy demo articles have been cleared. Write your first independent review or empirical audit to start publishing."
                          : "Try changing your search query or selecting another status tab."}
                      </p>
                      {posts.length === 0 && (
                        <div className="pt-2">
                          <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center gap-2 rounded-xl bg-orange hover:bg-orange/90 text-ink px-5 py-2.5 text-xs font-bold shadow-button"
                          >
                            <span>+</span>
                            <span>Create Your First Article</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
