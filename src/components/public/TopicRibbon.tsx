"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/data/seedData";

interface TopicRibbonProps {
  categories: Category[];
  activeCategory?: string;
}

export const TopicRibbon: React.FC<TopicRibbonProps> = ({
  categories,
  activeCategory,
}) => {
  return (
    <div className="my-10 border-y border-border/70 py-4">
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-text flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          Explore Verticals:
        </span>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/blog"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              !activeCategory
                ? "bg-ink text-white"
                : "bg-card text-ink border border-border hover:border-ink"
            }`}
          >
            All Topics
          </Link>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition shrink-0 ${
                  isActive
                    ? "bg-ink text-white"
                    : "bg-card text-ink border border-border hover:border-orange hover:text-orange"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 opacity-60 text-[10px]">({cat.count})</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
