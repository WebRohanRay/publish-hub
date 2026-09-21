"use client";

import React from "react";
import Link from "next/link";
import { AxiomLogo } from "@/components/brand/AxiomLogo";
import { LanguageSwitcher } from "@/components/brand/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const PublicFooter: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 pt-16 pb-12 text-slate-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <AxiomLogo isDark={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An independent investigative editorial publication auditing top matchmaking platforms, regulated iGaming operators, and high-performance digital tools under an empirical 48-point protocol.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400">Language:</span>
              <LanguageSwitcher isDark={true} />
            </div>
            <div className="text-xs text-slate-500 pt-2">
              © {new Date().getFullYear()} Axiom Editorial. {t.footer.rightsReserved}
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.categoriesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/category/dating" className="hover:text-indigo-400 transition-colors">
                  Dating & Matchmaking
                </Link>
              </li>
              <li>
                <Link href="/category/igaming-betting" className="hover:text-indigo-400 transition-colors">
                  Casino & Sports Betting
                </Link>
              </li>
              <li>
                <Link href="/category/ideas-culture" className="hover:text-indigo-400 transition-colors">
                  Culture & Systems
                </Link>
              </li>
              <li>
                <Link href="/category/design-practice" className="hover:text-indigo-400 transition-colors">
                  Design & Interface
                </Link>
              </li>
            </ul>
          </div>

          {/* Publication & Research Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.publicationTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About the Journal
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-indigo-400 transition-colors">
                  Testing Protocol
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-indigo-400 transition-colors">
                  Editorial Ethics
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-indigo-400 transition-colors">
                  2026 Benchmark Data
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-indigo-400 transition-colors">
                  Press & Citations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Editorial
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Security Area */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.workspaceTitle}
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-normal">
              Private editorial desk with cryptographic authentication for publishing and moderation.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:border-indigo-500 hover:text-indigo-400 shadow-xs"
            >
              <span>{t.footer.accessDashboard}</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Regulatory & Affiliate Disclosure Note */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-400">Editorial & Affiliate Disclosure:</strong> {t.footer.affiliateDisclosure}
          </p>
          <p>
            <strong className="text-slate-400">Responsible Gaming & Safety:</strong> {t.footer.gamblingWarning}
          </p>
        </div>
      </div>
    </footer>
  );
};
