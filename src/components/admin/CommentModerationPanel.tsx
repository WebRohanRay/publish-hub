"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommentItem } from "@/data/seedData";
import { dataStore } from "@/lib/dataStore";

interface CommentModerationPanelProps {
  initialComments: CommentItem[];
}

export const CommentModerationPanel: React.FC<CommentModerationPanelProps> = ({
  initialComments,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApprove = async (id: string, authorName: string) => {
    try {
      await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });
    } catch {}
    dataStore.updateCommentStatus(id, "approved");
    setComments((prev) => prev.filter((c) => c.id !== id));
    setToastMessage(`Comment from ${authorName} approved.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSpam = async (id: string) => {
    try {
      await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "spam" }),
      });
    } catch {}
    dataStore.updateCommentStatus(id, "spam");
    setComments((prev) => prev.filter((c) => c.id !== id));
    setToastMessage("Marked comment as spam.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between relative">
      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-20 rounded-xl bg-emerald-800 text-white px-3 py-1.5 text-xs font-semibold shadow-md animate-in fade-in slide-in-from-top-1">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
              Audience
            </span>
            <span className="rounded-full bg-orange-soft px-2 py-0.5 text-[10px] font-bold text-ink">
              Needs attention: {comments.length}
            </span>
          </div>

          <Link
            href="/admin/comments"
            className="text-xs font-semibold text-ink hover:text-orange transition-colors"
          >
            Review all →
          </Link>
        </div>

        {/* Comment Items */}
        <div className="space-y-3">
          {comments.length > 0 ? (
            comments.slice(0, 3).map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl border border-border/70 bg-paper/50 p-3.5 transition hover:border-border"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-ink">{comment.authorName}</span>
                  <span className="text-[11px] text-muted-text">{comment.createdAt}</span>
                </div>

                <p className="text-xs text-muted-text line-clamp-2 leading-relaxed">
                  "{comment.body}"
                </p>

                <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    On: {comment.postTitle}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpam(comment.id)}
                      className="text-[10px] font-semibold text-red-600 hover:underline"
                    >
                      Spam
                    </button>
                    <button
                      onClick={() => handleApprove(comment.id, comment.authorName)}
                      className="rounded-md bg-ink px-2.5 py-1 text-[10px] font-bold text-white hover:bg-orange hover:text-ink transition"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-muted-text">
              ✓ All comments moderated. Your queue is clear!
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border/70 text-center">
        <Link
          href="/admin/comments"
          className="text-xs font-medium text-muted-text hover:text-ink"
        >
          Open Full Moderation Queue ({comments.length} Pending)
        </Link>
      </div>
    </div>
  );
};
