"use client";

import React, { useState } from "react";

export const ViewsChart: React.FC = () => {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  const stats = {
    "7d": { total: "24,810", change: "+14.2%", label: "vs. previous 7 days" },
    "30d": { total: "92,410", change: "+18.6%", label: "vs. previous 30 days" },
    "90d": { total: "284,920", change: "+24.8%", label: "vs. previous 90 days" },
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between">
      {/* Header & Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Audience pulse
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-ink">Views over time</h3>
        </div>

        {/* Range control tabs */}
        <div className="flex items-center rounded-xl bg-paper p-1 border border-border text-xs font-semibold">
          {(["7d", "30d", "90d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-1 transition ${
                range === r
                  ? "bg-card text-ink shadow-xs font-bold"
                  : "text-muted-text hover:text-ink"
              }`}
            >
              {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
      </div>

      {/* Large stat */}
      <div className="my-5 flex items-baseline gap-3">
        <span className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          {stats[range].total}
        </span>
        <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">
          ↑ {stats[range].change}
        </span>
        <span className="text-xs text-muted-text">{stats[range].label}</span>
      </div>

      {/* SVG Line / Area Chart */}
      <div className="relative w-full h-56 pt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9A05C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E9A05C" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="40" x2="500" y2="40" stroke="#E7E5DE" strokeDasharray="3 3" />
          <line x1="0" y1="90" x2="500" y2="90" stroke="#E7E5DE" strokeDasharray="3 3" />
          <line x1="0" y1="140" x2="500" y2="140" stroke="#E7E5DE" strokeDasharray="3 3" />
          <line x1="0" y1="190" x2="500" y2="190" stroke="#E7E5DE" />

          {/* Area fill */}
          <path
            d="M 0 160 Q 70 140, 130 90 T 260 110 T 380 50 T 500 30 L 500 190 L 0 190 Z"
            fill="url(#areaGradient)"
          />

          {/* Line path */}
          <path
            d="M 0 160 Q 70 140, 130 90 T 260 110 T 380 50 T 500 30"
            fill="none"
            stroke="#E9A05C"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Peak point indicator */}
          <circle cx="500" cy="30" r="5" fill="#E9A05C" stroke="#FFFEFA" strokeWidth="2" />
        </svg>

        {/* Current-point Tooltip per 4.2 */}
        <div className="absolute top-2 right-4 rounded-lg bg-navy px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
          39,248 / Sep 20
        </div>
      </div>

      {/* Y-Axis & X-Axis labels */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-text font-medium pt-2 border-t border-border/60">
        <span>Aug 22</span>
        <span>Aug 29</span>
        <span>Sep 05</span>
        <span>Sep 12</span>
        <span className="font-bold text-ink">Sep 20 (Today)</span>
      </div>

      {/* Accessible summary */}
      <p className="sr-only">
        Audience views line chart showing a steady upward trajectory from 14k reads on August 22nd to a peak of 39,248 reads on September 20th.
      </p>
    </div>
  );
};
