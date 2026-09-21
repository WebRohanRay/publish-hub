"use client";

import React, { useState } from "react";

interface CiteThisResearchProps {
  title: string;
  url: string;
  publishYear?: string;
}

export const CiteThisResearch: React.FC<CiteThisResearchProps> = ({
  title,
  url,
  publishYear = "2026",
}) => {
  const [copied, setCopied] = useState(false);
  const citationText = `Atlas Editorial Desk. (${publishYear}). "${title}." Atlas Journal. Retrieved from ${url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-10 rounded-2xl border border-border/80 bg-paper/60 p-5 text-xs text-ink space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange font-bold text-sm">❝</span>
          <span className="font-bold uppercase text-[10px] tracking-wider text-muted-text">
            Cite This Research & Data
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-ink hover:border-orange transition"
        >
          {copied ? "✓ Copied Citation" : "Copy Citation"}
        </button>
      </div>

      <div className="font-mono text-[11px] text-muted-text bg-card p-3 rounded-xl border border-border/60 select-all leading-relaxed">
        {citationText}
      </div>

      <p className="text-[10px] text-slate-400">
        Journalists & bloggers: Feel free to reference our benchmarks and data points with appropriate attribution and backlink.
      </p>
    </div>
  );
};
