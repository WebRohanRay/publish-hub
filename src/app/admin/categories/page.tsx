"use client";

import React, { useState, useEffect } from "react";
import { Category } from "@/data/seedData";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description,
        }),
      });

      if (res.ok) {
        await fetchCategories();
        setName("");
        setSlug("");
        setDescription("");
        setToast("Category added successfully.");
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to create category.");
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    try {
      const res = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCategories();
        setToast(`Deleted category '${catName}'.`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to delete category.");
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
          Category Architecture
        </h1>
        <p className="text-xs text-muted-text mt-1">
          Organize review verticals, descriptions, and SEO taxonomy for search engine indexing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Add Category Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleCreate} className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
            <h3 className="font-serif text-xl text-ink font-semibold border-b border-border pb-3">
              Add New Category
            </h3>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Category Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                placeholder="e.g. Esports Betting"
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="esports-betting"
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief editorial scope of this category..."
                className="w-full rounded-xl bg-paper p-2.5 text-xs border border-border text-ink"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-ink py-2.5 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition"
            >
              Create Category
            </button>
          </form>
        </div>

        {/* Right: Existing Categories List */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
            <div className="p-4 border-b border-border bg-paper/60 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-text">
                Active Categories ({categories.length})
              </span>
            </div>

            <div className="divide-y divide-border/60">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-paper/30 transition">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink text-sm">{cat.name}</span>
                      <span className="text-[10px] text-orange bg-orange-soft/60 px-2 py-0.5 rounded-full font-bold">
                        {cat.count || 0} articles
                      </span>
                    </div>
                    <div className="text-xs text-muted-text mt-1">{cat.description}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">/category/{cat.slug}</div>
                  </div>

                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete category"
                  >
                    🗑️
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
