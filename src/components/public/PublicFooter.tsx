"use client";

import React from "react";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const PublicFooter: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t border-border bg-paper-public pt-14 pb-12 text-ink">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <AtlasLogo isDark={false} />
            <p className="mt-4 text-sm text-muted-text leading-relaxed max-w-sm">
              An independent review publication exploring modern matchmaking platforms, regulated iGaming operators, and intentional digital tools.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-muted-text">Language:</span>
              <LanguageSwitcher />
            </div>
            <div className="mt-4 text-xs text-muted-text">
              © {new Date().getFullYear()} Atlas Journal. {t.footer.rightsReserved}
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
              {t.footer.categoriesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-text">
              <li>
                <Link href="/category/dating" className="hover:text-orange transition-colors">
                  Dating & Matchmaking
                </Link>
              </li>
              <li>
                <Link href="/category/igaming-betting" className="hover:text-orange transition-colors">
                  Casino & Sports Betting
                </Link>
              </li>
              <li>
                <Link href="/category/ideas-culture" className="hover:text-orange transition-colors">
                  Culture & Systems
                </Link>
              </li>
              <li>
                <Link href="/category/design-practice" className="hover:text-orange transition-colors">
                  Design & Interface
                </Link>
              </li>
            </ul>
          </div>

          {/* Publication & Research Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
              {t.footer.publicationTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-text">
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">
                  About the Journal
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-orange transition-colors">
                  Testing Protocol
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-orange transition-colors">
                  Editorial Ethics
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-orange transition-colors">
                  2026 Benchmark Data
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-orange transition-colors">
                  Press & Citations
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
            </ul>
          </div>

          {/* Admin & Security Area */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
              {t.footer.workspaceTitle}
            </h4>
            <p className="text-xs text-muted-text mb-4 leading-normal">
              Private editorial desk for single administrator publishing and moderation.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-ink transition hover:border-orange hover:text-orange shadow-xs"
            >
              <span>{t.footer.accessDashboard}</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Regulatory & Affiliate Disclosure Note */}
        <div className="mt-12 pt-8 border-t border-border/80 text-[11px] text-muted-text/80 space-y-2 leading-relaxed">
          <p>
            <strong>Editorial & Affiliate Disclosure:</strong> {t.footer.affiliateDisclosure}
          </p>
          <p>
            <strong>Responsible Gaming & Safety:</strong> {t.footer.gamblingWarning}
          </p>
        </div>
      </div>
    </footer>
  );
};
