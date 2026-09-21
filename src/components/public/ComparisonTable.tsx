"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { COMPARISON_ITEMS_TRANSLATIONS } from "@/lib/translations";

export const ComparisonTable: React.FC = () => {
  const { locale, t } = useI18n();
  const platforms = COMPARISON_ITEMS_TRANSLATIONS[locale] || COMPARISON_ITEMS_TRANSLATIONS.en;

  return (
    <section className="my-14 w-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            {t.comparison.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-1">
            {t.comparison.heading}
          </h2>
        </div>
        <div className="text-xs text-muted-text flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {t.comparison.updatedToday}
        </div>
      </div>

      <div className="mt-6 divide-y divide-border/60 overflow-x-auto">
        {platforms.map((platform) => (
          <div
            key={platform.rank}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 transition hover:bg-paper/50 rounded-xl px-3"
          >
            {/* Rank & Brand */}
            <div className="flex items-center gap-4 min-w-[240px]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white shadow-xs">
                #{platform.rank}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink text-base">{platform.name}</span>
                  <span className="rounded-full bg-orange-soft px-2 py-0.5 text-[10px] font-bold text-ink">
                    {platform.badge}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-text">
                  <span>{platform.category}</span>
                  <span>•</span>
                  <span className="flex items-center text-amber-500 font-semibold">
                    ★ {platform.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Bonus Details */}
            <div className="min-w-[220px]">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-text">
                {t.comparison.exclusiveBonus}
              </div>
              <div className="font-semibold text-ink text-sm mt-0.5">
                {platform.bonus}
              </div>
            </div>

            {/* Key Features */}
            <div className="hidden lg:block min-w-[200px]">
              <ul className="space-y-1 text-xs text-muted-text">
                {platform.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/blog/${platform.reviewSlug}`}
                className="text-xs font-medium text-muted-text hover:text-ink hover:underline"
              >
                {t.comparison.readReview}
              </Link>

              <a
                href={platform.ctaUrl}
                className="inline-flex items-center justify-center rounded-xl bg-orange px-5 py-2.5 text-xs font-bold text-ink shadow-button transition hover:bg-orange/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.comparison.claimOffer}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
