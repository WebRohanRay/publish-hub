"use client";

import React, { useState } from "react";
import { dataStore } from "@/lib/dataStore";
import { Post } from "@/data/seedData";

export default function AdminTrashPage() {
  const [posts, setPosts] = useState<Post[]>(
    dataStore.getAllPosts({ status: "trash" })
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleRestore = (id: string, title: string) => {
    dataStore.restorePost(id);
    setPosts(dataStore.getAllPosts({ status: "trash" }));
    setToast(`Restored '${title}' back to drafts.`);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePermanentDelete = (id: string, title: string) => {
    dataStore.deletePost(id, true);
    setPosts(dataStore.getAllPosts({ status: "trash" }));
    setConfirmDeleteId(null);
    setToast(`Permanently deleted '${title}'.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg">
          ✓ {toast}
        </div>
      )}

      <div className="border-b border-border/80 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
          Recovery & Disposal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
          Trash & Post Recovery
        </h1>
        <p className="text-xs text-muted-text mt-1">
          Items in trash are reversible. Permanent deletion requires explicit two-step confirmation.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-border/60">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-paper/40 transition">
                <div>
                  <div className="font-semibold text-ink text-sm">{post.title}</div>
                  <div className="text-xs text-muted-text mt-0.5">
                    {post.category} • Originally published: {post.publishedAt}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRestore(post.id, post.title)}
                    className="rounded-xl bg-ink px-3.5 py-1.5 text-xs font-bold text-white hover:bg-orange hover:text-ink transition"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(post.id)}
                    className="rounded-xl border border-red-300 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-muted-text">
            <span className="text-xl block mb-2">🗑️</span>
            The trash bin is empty. No deleted articles to restore.
          </div>
        )}
      </div>

      {/* Two-step Confirmation Dialog per 4.10 */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-card rounded-3xl p-6 shadow-2xl border border-border space-y-4">
            <h3 className="font-serif text-xl text-ink font-semibold">Confirm Permanent Deletion</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              This action cannot be undone. The article and its cached metrics will be removed permanently from the database.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-ink hover:bg-paper"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const p = posts.find((item) => item.id === confirmDeleteId);
                  if (p) handlePermanentDelete(p.id, p.title);
                }}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 shadow-button"
              >
                Yes, Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
