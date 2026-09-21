"use client";

import React, { useState } from "react";
import { ViewsChart } from "@/components/admin/ViewsChart";
import { MetricCard } from "@/components/admin/MetricCard";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const trafficSources = [
    { source: "Google Organic Search", percentage: 58, visitors: "144,374" },
    { source: "Direct Traffic", percentage: 22, visitors: "54,762" },
    { source: "Editorial Backlinks & Press", percentage: 12, visitors: "29,870" },
    { source: "Social & Newsletters", percentage: 8, visitors: "19,915" },
  ];

  const countries = [
    { country: "United States", flag: "🇺🇸", percentage: 46 },
    { country: "United Kingdom", flag: "🇬🇧", percentage: 24 },
    { country: "Germany", flag: "🇩🇪", percentage: 14 },
    { country: "Canada", flag: "🇨🇦", percentage: 9 },
    { country: "Australia", flag: "🇦🇺", percentage: 7 },
  ];

  const devices = [
    { device: "Mobile (iOS & Android)", percentage: 68 },
    { device: "Desktop (macOS & Windows)", percentage: 28 },
    { device: "Tablet", percentage: 4 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Telemetry & Insights
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
            Audience Intelligence & Analytics
          </h1>
          <p className="text-xs text-muted-text mt-1">
            Privacy-safe aggregated analytics deduplicated without invasive tracking cookies.
          </p>
        </div>

        {/* Range Filter */}
        <div className="flex items-center rounded-xl bg-card p-1 border border-border text-xs font-semibold shadow-xs">
          {["7d", "30d", "90d", "1y"].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`rounded-lg px-3 py-1.5 transition ${
                timeRange === r ? "bg-ink text-white font-bold" : "text-muted-text hover:text-ink"
              }`}
            >
              {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : r === "90d" ? "90 Days" : "1 Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Total Reads"
          value="248,921"
          change="18.6%"
          comparison="vs. prior period"
          icon="👁️"
          theme="navy"
          bars={[40, 55, 65, 75, 85, 90, 100]}
        />
        <MetricCard
          label="Unique Visitors"
          value="182,410"
          change="14.2%"
          comparison="deduplicated 24h"
          icon="👥"
          theme="peach"
          bars={[50, 45, 60, 70, 75, 80, 95]}
        />
        <MetricCard
          label="Affiliate Clicks"
          value="19,420"
          change="28.4%"
          comparison="high CTR"
          icon="🎯"
          theme="mint"
          bars={[30, 40, 50, 65, 75, 90, 100]}
        />
        <MetricCard
          label="Avg Read Time"
          value="4m 32s"
          change="9.1%"
          comparison="strong dwell time"
          icon="⏱️"
          theme="lavender"
          bars={[60, 65, 70, 70, 80, 85, 90]}
        />
      </div>

      {/* Chart */}
      <ViewsChart />

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink font-semibold">Traffic Acquisition</h3>
          <div className="space-y-3 text-xs">
            {trafficSources.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-ink">{item.source}</span>
                  <span className="font-mono text-muted-text">{item.visitors} ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-paper overflow-hidden">
                  <div style={{ width: `${item.percentage}%` }} className="h-full bg-orange rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Geography */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink font-semibold">Top Countries</h3>
          <div className="space-y-3 text-xs">
            {countries.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="flex items-center gap-2 text-ink font-medium">
                  <span>{c.flag}</span>
                  <span>{c.country}</span>
                </span>
                <span className="font-mono font-bold text-ink">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink font-semibold">Device Breakdown</h3>
          <div className="space-y-3 text-xs">
            {devices.map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-ink">{d.device}</span>
                  <span className="font-mono font-bold text-ink">{d.percentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-paper overflow-hidden">
                  <div style={{ width: `${d.percentage}%` }} className="h-full bg-navy rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
