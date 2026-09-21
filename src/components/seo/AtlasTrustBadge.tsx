"use client";

import React, { useState } from "react";

interface AtlasTrustBadgeProps {
  score?: number;
  badgeLabel?: string;
  targetUrl: string;
}

export const AtlasTrustBadge: React.FC<AtlasTrustBadgeProps> = ({
  score = 9.4,
  badgeLabel = "Editor's Choice 2026",
  targetUrl,
}) => {
  const [styleTheme, setStyleTheme] = useState<"light" | "dark" | "markdown">("light");
  const [copied, setCopied] = useState(false);

  const htmlEmbedLight = `<a href="${targetUrl}" target="_blank" rel="noopener" title="Atlas Journal Verified Review">\n  <img src="https://img.shields.io/badge/Atlas%20Verified-${score}%20%2F%2010-FF7043?style=for-the-badge&logo=atlas" alt="Atlas Verified Review - ${score}/10" />\n</a>`;

  const htmlEmbedDark = `<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:#0F172A;color:#FFFFFF;border-radius:12px;font-family:sans-serif;font-size:12px;border:1px solid #1E293B;">\n  <span style="color:#FF7043;font-weight:bold;">★</span>\n  <span>Atlas Verified Pick: <strong style="color:#FF7043;">${score}/10</strong></span>\n  <a href="${targetUrl}" target="_blank" rel="noopener" style="color:#94A3B8;text-decoration:underline;margin-left:4px;">Read Audit</a>\n</div>`;

  const markdownSnippet = `[![Atlas Verified: ${score}/10](https://img.shields.io/badge/Atlas%20Verified-${score}%20%2F%2010-FF7043?style=flat-square)](${targetUrl})`;

  const currentEmbedCode =
    styleTheme === "light"
      ? htmlEmbedLight
      : styleTheme === "dark"
      ? htmlEmbedDark
      : markdownSnippet;

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentEmbedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-10 rounded-2xl border border-border bg-card p-5 sm:p-6 text-xs text-ink shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-ink font-bold text-xs">
              ★
            </span>
            <h4 className="font-bold text-sm text-ink">Embed Verified Award Seal on Your Website</h4>
          </div>
          <p className="text-[11px] text-muted-text mt-0.5">
            Display your audited score and editorial endorsement with automatic canonical attribution.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-ink text-white hover:bg-ink/80"
          }`}
        >
          <span>{copied ? "✓ Copied Embed Code!" : "📋 Copy Embed Code"}</span>
        </button>
      </div>

      {/* Theme selection */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] font-semibold text-muted-text mr-1">Badge Format:</span>
        <button
          onClick={() => setStyleTheme("light")}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
            styleTheme === "light"
              ? "bg-paper text-ink border border-border font-bold shadow-xs"
              : "text-muted-text hover:text-ink"
          }`}
        >
          Standard Shield (SVG)
        </button>
        <button
          onClick={() => setStyleTheme("dark")}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
            styleTheme === "dark"
              ? "bg-paper text-ink border border-border font-bold shadow-xs"
              : "text-muted-text hover:text-ink"
          }`}
        >
          Luxury Navy Pill (HTML)
        </button>
        <button
          onClick={() => setStyleTheme("markdown")}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
            styleTheme === "markdown"
              ? "bg-paper text-ink border border-border font-bold shadow-xs"
              : "text-muted-text hover:text-ink"
          }`}
        >
          Markdown (README)
        </button>
      </div>

      {/* Live Badge Preview */}
      <div className="mb-4 rounded-xl bg-paper p-4 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
          Live Visual Preview:
        </div>
        <div>
          {styleTheme === "light" && (
            <div className="inline-flex items-center rounded-lg bg-orange text-ink font-bold text-xs px-3 py-1.5 shadow-xs gap-1.5">
              <span>ATLAS VERIFIED</span>
              <span className="bg-ink text-white px-1.5 py-0.5 rounded text-[10px]">{score} / 10</span>
            </div>
          )}
          {styleTheme === "dark" && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-3.5 py-1.5 text-xs border border-slate-800 shadow-xs">
              <span className="text-orange font-bold">★</span>
              <span>Atlas Verified Pick: <strong className="text-orange">{score}/10</strong></span>
              <span className="text-slate-400 text-[11px] underline ml-1">Read Audit</span>
            </div>
          )}
          {styleTheme === "markdown" && (
            <div className="inline-flex items-center rounded-md bg-orange text-ink font-mono font-bold text-xs px-2.5 py-1">
              Atlas Verified | {score}/10
            </div>
          )}
        </div>
      </div>

      {/* Embed Code Textarea */}
      <pre className="font-mono text-[11px] text-muted-text bg-paper p-3 rounded-xl border border-border/60 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
        {currentEmbedCode}
      </pre>
    </div>
  );
};
