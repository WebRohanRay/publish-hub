"use client";

import React, { useState, useEffect } from "react";
import { CommentItem } from "@/data/seedData";

export default function AdminCommentsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/admin/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filterTabs = [
    { label: "All Comments", value: "all", count: comments.length },
    { label: "Pending", value: "pending", count: comments.filter((c) => c.status === "pending").length },
    { label: "Approved", value: "approved", count: comments.filter((c) => c.status === "approved").length },
    { label: "Spam", value: "spam", count: comments.filter((c) => c.status === "spam").length },
    { label: "Trash", value: "trash", count: comments.filter((c) => c.status === "trash").length },
  ];

  const filtered = comments.filter((c) => {
    if (activeTab === "all") return c.status !== "trash";
    return c.status === activeTab;
  });

  const handleUpdate = async (id: string, newStatus: "approved" | "spam" | "trash" | "pending") => {
    try {
      const res = await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        await fetchComments();
        setToast(`Comment marked as ${newStatus}.`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to update comment status.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/comments?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchComments();
        setToast("Comment permanently deleted.");
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to delete comment.");
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg animate-in fade-in">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border/80 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
          Audience & Moderation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
          Comment Moderation Queue
        </h1>
        <p className="text-xs text-muted-text mt-1">
          Review reader reflections before publication. Author emails remain private and are never rendered publicly.
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b border-border">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
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

      {/* Comments List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-slate-300 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink text-sm">{comment.authorName}</span>
                  <span className="text-[11px] text-muted-text font-mono">
                    &lt;{comment.authorEmail}&gt; (Private)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      comment.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : comment.status === "spam"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {comment.status}
                  </span>
                  <span className="text-muted-text text-[11px]">{comment.createdAt}</span>
                </div>
              </div>

              <p className="text-sm text-ink leading-relaxed">
                "{comment.body}"
              </p>

              <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-muted-text text-[11px]">
                  Article: <strong className="text-ink">{comment.postTitle}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {comment.status !== "approved" && (
                    <button
                      onClick={() => handleUpdate(comment.id, "approved")}
                      className="rounded-xl bg-ink px-3.5 py-1.5 text-xs font-bold text-white hover:bg-orange hover:text-ink transition"
                    >
                      Approve
                    </button>
                  )}
                  {comment.status !== "spam" && (
                    <button
                      onClick={() => handleUpdate(comment.id, "spam")}
                      className="rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-muted-text hover:text-red-600 hover:border-red-300 transition"
                    >
                      Mark Spam
                    </button>
                  )}
                  {comment.status !== "trash" ? (
                    <button
                      onClick={() => handleUpdate(comment.id, "trash")}
                      className="rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-muted-text hover:text-red-600 hover:border-red-300 transition"
                    >
                      Trash
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition"
                    >
                      Delete Permanently
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-border bg-card">
            <h3 className="font-serif text-xl text-ink">No comments in this view</h3>
            <p className="text-xs text-muted-text mt-1">The moderation desk is clear!</p>
          </div>
        )}
      </div>
    </div>
  );
}
