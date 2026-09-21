"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dataStore } from "@/lib/dataStore";
import { Post } from "@/data/seedData";

export default function AdminPostsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>(dataStore.getAllPosts());
  const [actionToast, setActionToast] = useState<string | null>(null);

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

  const handleTrash = (id: string, title: string) => {
    dataStore.deletePost(id, false);
    setPosts(dataStore.getAllPosts());
    setActionToast(`Moved '${title}' to trash.`);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleDuplicate = (post: Post) => {
    const dup = dataStore.savePost({
      ...post,
      id: undefined,
      title: `${post.title} (Copy)`,
      status: "draft",
    });
    setPosts(dataStore.getAllPosts());
    setActionToast(`Duplicated article as '${dup.title}'.`);
    setTimeout(() => setActionToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2">
          ✓ {actionToast}
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
            Create, schedule, organize, and moderate editorial reviews and stories.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition active:scale-[0.98]"
        >
          <span>+</span>
          <span>New post</span>
        </Link>
      </div>

      {/* Filters Toolbar per 4.3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b md:border-b-0 border-border">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.value
                  ? "bg-ink text-white font-bold"
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
                          className="rounded-lg p-1.5 text-slate-400 hover:text-ink hover:bg-paper transition"
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
                          className="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
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
                  <td colSpan={7} className="py-12 text-center text-muted-text">
                    No articles found matching this filter.
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
