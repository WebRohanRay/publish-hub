"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/80 bg-paper-public/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          {/* Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            <AtlasLogo href="/" />

            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-ink">
              <Link
                href="/category/dating"
                className="transition-colors hover:text-orange hover:underline decoration-orange decoration-2 underline-offset-8"
              >
                Dating & Matchmaking
              </Link>
              <Link
                href="/category/gambling-casino"
                className="transition-colors hover:text-orange hover:underline decoration-orange decoration-2 underline-offset-8"
              >
                Casino & Betting
              </Link>
              <Link
                href="/category/adult-lifestyle"
                className="transition-colors hover:text-orange hover:underline decoration-orange decoration-2 underline-offset-8"
              >
                Adult Entertainment
              </Link>
              <Link
                href="/category/guides-security"
                className="transition-colors hover:text-orange hover:underline decoration-orange decoration-2 underline-offset-8"
              >
                Privacy & Crypto
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-orange hover:underline decoration-orange decoration-2 underline-offset-8"
              >
                All Blogs
              </Link>
            </nav>
          </div>

          {/* Right Actions: Language Switcher + EXACTLY ONE Admin Button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Exactly ONE Admin Button where everything is managed */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl bg-navy hover:bg-navy-soft px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-button hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              aria-label="Open Admin Dashboard"
            >
              <svg
                className="w-4 h-4 text-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Admin</span>
            </Link>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink rounded-lg hover:bg-muted cursor-pointer transition"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-card px-6 py-5 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3 font-medium text-ink text-sm">
              <Link
                href="/category/dating"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-orange transition-colors"
              >
                Dating & Matchmaking
              </Link>
              <Link
                href="/category/gambling-casino"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-orange transition-colors"
              >
                Casino & Sports Betting
              </Link>
              <Link
                href="/category/adult-lifestyle"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-orange transition-colors"
              >
                Adult Entertainment & Creators
              </Link>
              <Link
                href="/category/guides-security"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-orange transition-colors"
              >
                Privacy, Crypto & Guides
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-orange transition-colors"
              >
                All Blogs
              </Link>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-text">Edition Language</span>
              <LanguageSwitcher />
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-navy hover:bg-navy-soft text-white font-bold py-2.5 text-sm shadow-button transition"
              >
                <span>🛡️ Open Admin Workspace</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Scroll Offset Spacer to prevent jitter and content overlap */}
      <div className="h-18 w-full shrink-0" aria-hidden="true" />
    </>
  );
};
