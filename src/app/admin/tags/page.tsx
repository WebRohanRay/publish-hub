"use client";

import React, { useState, useEffect } from "react";

interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/admin/tags");
      if (res.ok) {
        const data = await res.json();
        setTags(data.tags || []);
      }
    } catch (err) {
      console.error("Failed to load tags:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        await fetchTags();
        setName("");
        setToast(`Tag '${name}' created.`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to create tag.");
    }
  };

  const handleDelete = async (id: string, tagName: string) => {
    try {
      const res = await fetch(`/api/admin/tags?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchTags();
        setToast(`Tag '${tagName}' deleted.`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to delete tag.");
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg">
          ✓ {toast}
        </div>
      )}

      <div className="border-b border-border/80 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
          Taxonomy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
          Tag Indexing
        </h1>
        <p className="text-xs text-muted-text mt-1">
          Keywords and metadata tags used across articles to interlink topical clusters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <form onSubmit={handleAddTag} className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <h3 className="font-serif text-lg text-ink font-semibold border-b border-border pb-3">
              Add New Tag
            </h3>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Tag Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. High Roller"
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-ink py-2.5 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition"
            >
              Add Tag
            </button>
          </form>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-serif text-lg text-ink font-semibold mb-4">
              All Active Tags ({tags.length})
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-paper px-3.5 py-1.5 text-xs text-ink transition hover:border-orange"
                >
                  <span className="font-medium">{tag.name}</span>
                  <span className="rounded-full bg-card px-2 py-0.5 text-[10px] text-muted-text font-bold border border-border">
                    {tag.count}
                  </span>
                  <button
                    onClick={() => handleDelete(tag.id, tag.name)}
                    className="text-slate-400 hover:text-red-500 text-[11px] ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
