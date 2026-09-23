"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/admin/MetricCard";
import { ViewsChart } from "@/components/admin/ViewsChart";
import { InsightCard } from "@/components/admin/InsightCard";
import { LatestPostsTable } from "@/components/admin/LatestPostsTable";
import { CommentModerationPanel } from "@/components/admin/CommentModerationPanel";
import { ActivityStrip } from "@/components/admin/ActivityStrip";

export default function AdminDashboardOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<{
    totalReads: number;
    totalComments: number;
    pendingCommentsCount: number;
    totalLikes: number;
    publishedPostsCount: number;
    subscribersCount: number;
    posts: any[];
    pendingComments: any[];
    activity: any[];
  }>({
    totalReads: 0,
    totalComments: 0,
    pendingCommentsCount: 0,
    totalLikes: 0,
    publishedPostsCount: 0,
    subscribersCount: 0,
    posts: [],
    pendingComments: [],
    activity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const allPosts = stats.posts || [];
  const filteredPosts = searchQuery
    ? allPosts.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : allPosts;

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  return (
    <div className="space-y-8">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-text">
            <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
            <span>{todayStr}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-1 font-normal">
            Good morning, Rohan<span className="text-orange">.</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-text">
            Your publication is moving with intention. Real-time metrics live from Supabase.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="rounded-xl bg-card px-3.5 py-2 text-xs border border-border focus:border-orange focus:outline-none w-48 sm:w-60 shadow-xs"
            />
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition active:scale-[0.98]"
          >
            <span>+</span>
            <span>New post</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards Grid - Live from Supabase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Total reads"
          value={stats.totalReads > 0 ? stats.totalReads.toLocaleString() : (loading ? "..." : "0")}
          change="Real-time"
          comparison="verified views"
          icon="👁️"
          theme="navy"
          bars={[40, 65, 55, 80, 70, 95, 100]}
        />
        <MetricCard
          label="Comments"
          value={stats.totalComments.toLocaleString()}
          change={`${stats.pendingCommentsCount} pending`}
          comparison="community engagement"
          icon="💬"
          theme="peach"
          bars={[30, 45, 60, 50, 75, 85, 90]}
        />
        <MetricCard
          label="Total likes"
          value={stats.totalLikes.toLocaleString()}
          change="Sentiment"
          comparison="reader appreciation"
          icon="❤️"
          theme="mint"
          bars={[50, 40, 70, 65, 80, 90, 100]}
        />
        <MetricCard
          label="Published posts"
          value={stats.publishedPostsCount.toString()}
          change="Live Articles"
          comparison="indexed on search"
          icon="📝"
          theme="lavender"
          bars={[60, 65, 70, 75, 80, 90, 95]}
        />
      </div>

      {/* Analytics Row: Views Chart + Insight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ViewsChart />
        </div>
        <div className="lg:col-span-4 flex">
          <InsightCard />
        </div>
      </div>

      {/* Publishing & Community Row: Latest Posts + Comments Triage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <LatestPostsTable posts={filteredPosts} />
        </div>
        <div className="lg:col-span-5">
          <CommentModerationPanel initialComments={stats.pendingComments} />
        </div>
      </div>

      {/* Activity Strip */}
      <ActivityStrip activities={stats.activity} />
    </div>
  );
}
