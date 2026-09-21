"use client";

import React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 pt-12 pb-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange">
          {t.about.eyebrow}
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
          {t.about.heading}
        </h1>

        <div className="mt-8 prose prose-slate max-w-none text-muted-text space-y-6 text-base sm:text-lg leading-relaxed">
          <p>
            {t.about.p1}
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">
            {t.about.principlesHeading}
          </h2>
          <p>
            {t.about.principlesText}
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">
            {t.about.affiliateHeading}
          </h2>
          <p>
            {t.about.affiliateText}
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
