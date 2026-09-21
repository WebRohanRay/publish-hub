"use client";

import React from "react";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-navy-soft bg-navy pt-16 pb-12 text-slate-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <AtlasLogo isDark={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Atlas Journal is an independent, 18+ review publication investigating modern dating platforms,
              regulated online casinos, instant crypto payout velocities, and creator-led adult entertainment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400">Language:</span>
              <LanguageSwitcher isDark={true} />
            </div>
            <div className="text-xs text-slate-500 pt-2">
              © {new Date().getFullYear()} Atlas Journal. All rights reserved.
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Review Verticals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/category/dating" className="hover:text-orange transition-colors">
                  Dating & Matchmaking
                </Link>
              </li>
              <li>
                <Link href="/category/gambling-casino" className="hover:text-orange transition-colors">
                  Casino & Sports Betting
                </Link>
              </li>
              <li>
                <Link href="/category/adult-lifestyle" className="hover:text-orange transition-colors">
                  Adult Entertainment & Creators
                </Link>
              </li>
              <li>
                <Link href="/category/guides-security" className="hover:text-orange transition-colors">
                  Privacy, Crypto & Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange transition-colors">
                  All Reviews & Breakdowns
                </Link>
              </li>
            </ul>
          </div>

          {/* Publication Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">
                  About Atlas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange transition-colors">
                  Contact Editorial
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" className="hover:text-orange transition-colors">
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-orange transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Management Area */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Admin Workspace
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-normal">
              Single-administrator publishing system for writing, scheduling, moderating, and monetizing blogs.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-navy-soft bg-navy-soft px-4 py-2.5 text-xs font-semibold text-white transition hover:border-orange hover:text-orange shadow-xs"
            >
              <span>Open Admin Dashboard</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 18+ Responsible Entertainment & Disclosure Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong className="text-white">18+ Age Notice & Responsible Entertainment:</strong> Content on this publication is intended strictly for adults aged 18 and older (or legal age in your jurisdiction). When engaging in online gambling or dating services, please participate responsibly and set personal limits.
          </p>
          <p>
            <strong className="text-white">Advertising Disclosure:</strong> This site is monetized via verified display networks (including Adsterra) and affiliate partnerships. We may earn a commission when you register through links on our site at no additional cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
};
