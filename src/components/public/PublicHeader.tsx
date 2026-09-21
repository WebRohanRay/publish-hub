"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AxiomLogo } from "@/components/brand/AxiomLogo";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      {/* Top Regulatory & Empirical Audit Bar */}
      <div className="bg-slate-950 text-[11px] text-slate-300 py-1.5 px-4 text-center border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Empirical Audits:</span> 48-Point Independent Testing Protocol Across All Verticals.
          </span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              18+ Only • Play & Date Responsibly
            </span>
            <LanguageSwitcher isDark={true} />
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-white/90 backdrop-blur-md transition-all shadow-xs">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <AxiomLogo href="/" />

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
              <Link
                href="/category/dating"
                className="transition-colors hover:text-indigo-600 hover:underline decoration-indigo-500 decoration-2 underline-offset-8"
              >
                {t.nav.dating}
              </Link>
              <Link
                href="/category/igaming-betting"
                className="transition-colors hover:text-indigo-600 hover:underline decoration-indigo-500 decoration-2 underline-offset-8"
              >
                {t.nav.casino}
              </Link>
              <Link
                href="/research"
                className="transition-colors hover:text-indigo-600 hover:underline decoration-indigo-500 decoration-2 underline-offset-8"
              >
                2026 Research
              </Link>
              <Link
                href="/methodology"
                className="transition-colors hover:text-indigo-600 hover:underline decoration-indigo-500 decoration-2 underline-offset-8"
              >
                Testing Protocol
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-indigo-600 hover:underline decoration-indigo-500 decoration-2 underline-offset-8"
              >
                {t.nav.reviews}
              </Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Direct Admin Access */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink shadow-xs transition hover:border-indigo-500 hover:text-indigo-600"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Admin Portal</span>
            </Link>

            {/* Subscribe CTA button */}
            <a
              href="#newsletter"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 text-xs font-bold shadow-button transition"
            >
              {t.nav.subscribe}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-ink rounded-lg hover:bg-muted cursor-pointer"
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
          <div className="md:hidden border-b border-border bg-white px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 shadow-lg">
            <Link
              href="/category/dating"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-indigo-600"
            >
              {t.nav.dating}
            </Link>
            <Link
              href="/category/igaming-betting"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-indigo-600"
            >
              {t.nav.casino}
            </Link>
            <Link
              href="/research"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-indigo-600"
            >
              2026 Research Hub
            </Link>
            <Link
              href="/methodology"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-indigo-600"
            >
              Testing Protocol
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-ink hover:text-indigo-600"
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
              className="block text-sm font-semibold text-indigo-600 pt-1"
            >
              Open Admin Dashboard →
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
