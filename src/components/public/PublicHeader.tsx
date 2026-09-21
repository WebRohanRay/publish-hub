"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      {/* Top Affiliate & Regulatory Disclosure Bar */}
      <div className="bg-navy text-[11px] text-slate-300 py-1.5 px-4 text-center border-b border-navy-soft/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Independent Reviews:</span> We independently audit every platform & sportsbook.
          </span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              18+ Only • Please Gamble & Date Responsibly
            </span>
            <LanguageSwitcher isDark={true} />
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-paper-public/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <AtlasLogo href="/" />

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink/80">
              <Link
                href="/category/dating"
                className="transition-colors hover:text-ink hover:underline decoration-orange underline-offset-4"
              >
                {t.nav.dating}
              </Link>
              <Link
                href="/category/igaming-betting"
                className="transition-colors hover:text-ink hover:underline decoration-orange underline-offset-4"
              >
                {t.nav.casino}
              </Link>
              <Link
                href="/category/ideas-culture"
                className="transition-colors hover:text-ink hover:underline decoration-orange underline-offset-4"
              >
                {t.nav.culture}
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-ink hover:underline decoration-orange underline-offset-4"
              >
                {t.nav.reviews}
              </Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Direct Dashboard Link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-ink shadow-xs transition hover:border-orange hover:text-orange"
            >
              <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
              {t.nav.dashboard}
            </Link>

            {/* Subscribe CTA button */}
            <a
              href="#newsletter"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-orange-soft px-4 py-1.5 text-xs font-semibold text-ink border border-orange/40 transition hover:bg-orange hover:text-white"
            >
              {t.nav.subscribe}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-ink rounded-lg hover:bg-muted"
              aria-label="Toggle Navigation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-paper-public px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <Link
              href="/category/dating"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink"
            >
              {t.nav.dating}
            </Link>
            <Link
              href="/category/igaming-betting"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink"
            >
              {t.nav.casino}
            </Link>
            <Link
              href="/category/ideas-culture"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink"
            >
              {t.nav.culture}
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink"
            >
              {t.nav.reviews}
            </Link>
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-text">Change Language:</span>
              <LanguageSwitcher />
            </div>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-orange pt-1"
            >
              Open Admin Dashboard →
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
