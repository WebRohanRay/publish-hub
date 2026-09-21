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
  const [activeFormat, setActiveFormat] = useState<"apa" | "mla" | "chicago" | "bibtex" | "quote">("apa");
  const [copied, setCopied] = useState(false);

  const citations = {
    apa: `Atlas Editorial Board. (${publishYear}). ${title}. Atlas Journal. Retrieved from ${url}`,
    mla: `Atlas Editorial Board. "${title}." Atlas Journal, ${publishYear}, ${url}.`,
    chicago: `Atlas Editorial Board. "${title}." Atlas Journal. Accessed ${publishYear}. ${url}.`,
    bibtex: `@article{atlas_${publishYear}_${title.substring(0, 10).replace(/[^a-zA-Z0-9]/g, "").toLowerCase()},\n  title={${title}},\n  author={Atlas Editorial Board},\n  journal={Atlas Journal},\n  year={${publishYear}},\n  url={${url}}\n}`,
    quote: `> "According to research published by [Atlas Journal](${url}), ..."`,
  };

  const currentText = citations[activeFormat];

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-10 rounded-2xl border border-border bg-card p-5 sm:p-6 text-xs text-ink shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange/20 text-orange font-bold text-xs">
            ❝
          </span>
          <div>
            <span className="font-bold text-ink text-sm block">Cite This Investigation & Data</span>
            <span className="text-[11px] text-muted-text">
              Standardized attribution for academic papers, press citations, and digital coverage
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-ink text-white hover:bg-ink/80"
          }`}
        >
          <span>{copied ? "✓ Copied!" : "📋 Copy Citation"}</span>
        </button>
      </div>

      {/* Format Switcher Tabs */}
      <div className="flex items-center gap-1.5 border-b border-border/80 pb-2.5 mb-3 overflow-x-auto">
        {(["apa", "mla", "chicago", "bibtex", "quote"] as const).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setActiveFormat(fmt)}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
              activeFormat === fmt
                ? "bg-orange text-ink font-bold shadow-xs"
                : "text-muted-text hover:text-ink hover:bg-paper"
            }`}
          >
            {fmt === "quote" ? "Markdown Quote" : fmt}
          </button>
        ))}
      </div>

      {/* Citation Box */}
      <div className="relative">
        <pre className="font-mono text-[11px] text-muted-text bg-paper p-3.5 rounded-xl border border-border/60 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
          {currentText}
        </pre>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-text">
        <span>Attribution license: Creative Commons Attribution 4.0 International (CC BY 4.0)</span>
        <span className="hidden sm:inline">Automatic canonical backlink inclusion</span>
      </div>
    </div>
  );
};
