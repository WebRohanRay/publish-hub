import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/seedData";

interface LatestPostsTableProps {
  posts: Post[];
}

export const LatestPostsTable: React.FC<LatestPostsTableProps> = ({ posts }) => {
  const statusStyles: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-800 border-emerald-300",
    scheduled: "bg-purple-100 text-purple-800 border-purple-300",
    draft: "bg-amber-100 text-amber-800 border-amber-300",
    archived: "bg-slate-100 text-slate-800 border-slate-300",
    trash: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Publishing
          </span>
          <h3 className="font-serif text-xl text-ink">Latest articles & reviews</h3>
        </div>

        <Link
          href="/admin/posts"
          className="text-xs font-semibold text-ink hover:text-orange transition-colors"
        >
          View all posts →
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border text-muted-text uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Post</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Reach</th>
              <th className="py-2.5 px-3">Engagement</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {posts.slice(0, 4).map((post) => (
              <tr key={post.id} className="hover:bg-paper/40 transition">
                {/* Post info */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-12 rounded-lg overflow-hidden shrink-0 bg-muted">
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
                        className="font-semibold text-ink hover:text-orange transition line-clamp-1 max-w-xs"
                      >
                        {post.title}
                      </Link>
                      <div className="text-[11px] text-muted-text mt-0.5">
                        {post.category} • {post.publishedAt}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      statusStyles[post.status] || statusStyles.draft
                    }`}
                  >
                    {post.status}
                  </span>
                </td>

                {/* Reach */}
                <td className="py-3 px-3 font-semibold text-ink">
                  {post.reads.toLocaleString()} views
                </td>

                {/* Engagement */}
                <td className="py-3 px-3 text-muted-text">
                  <span className="font-semibold text-ink">
                    {post.likes.toLocaleString()}
                  </span>{" "}
                  likes • {post.commentsCount} comments
                </td>

                {/* Actions */}
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1 text-slate-400 hover:text-ink transition"
                      title="Preview public story"
                    >
                      👁️
                    </Link>
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="p-1 text-slate-400 hover:text-orange transition"
                      title="Edit article"
                    >
                      ✏️
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
