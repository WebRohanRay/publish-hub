"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MediaAsset } from "@/lib/dataStore";

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
      }
    } catch (err) {
      console.error("Failed to load media assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setToast("Public asset URL copied to clipboard.");
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchMedia();
        setSelectedAsset(null);
        setToast("Asset deleted from library.");
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to delete asset.");
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Storage & Media
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
            Media Archive & Assets
          </h1>
          <p className="text-xs text-muted-text mt-1">
            Store, inspect, copy URLs, and manage all editorial artwork and review images.
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {assets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:border-orange hover:shadow-md"
          >
            <div className="relative aspect-16/10 w-full bg-muted">
              <Image src={asset.publicUrl} alt={asset.altText} fill className="object-cover" />
            </div>
            <div className="p-3 text-xs">
              <div className="font-semibold text-ink truncate">{asset.filename}</div>
              <div className="text-[10px] text-muted-text mt-0.5 flex justify-between">
                <span>{asset.width}×{asset.height}</span>
                <span>{(asset.fileSizeBytes / 1024).toFixed(0)} KB</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-border space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-serif text-xl text-ink font-semibold">Media Details</h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-ink text-sm"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-border">
              <Image src={selectedAsset.publicUrl} alt={selectedAsset.altText} fill className="object-cover" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-text">File Name:</span>
                <span className="font-mono text-ink font-semibold">{selectedAsset.filename}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-text">Dimensions:</span>
                <span className="font-mono text-ink">{selectedAsset.width} × {selectedAsset.height} px</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-text">File Size:</span>
                <span className="font-mono text-ink">{(selectedAsset.fileSizeBytes / 1024).toFixed(1)} KB</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-text">Alt Text:</span>
                <span className="text-ink">{selectedAsset.altText}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <button
                onClick={() => handleDelete(selectedAsset.id)}
                className="rounded-xl border border-red-300 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Delete File
              </button>

              <button
                onClick={() => handleCopyUrl(selectedAsset.publicUrl)}
                className="rounded-xl bg-ink px-5 py-2 text-xs font-bold text-white hover:bg-orange hover:text-ink shadow-button transition"
              >
                Copy Public URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
