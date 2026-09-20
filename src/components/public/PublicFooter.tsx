import React from "react";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";

export const PublicFooter: React.FC = () => {
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
            <div className="mt-6 text-xs text-muted-text">
              © {new Date().getFullYear()} Atlas Journal. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
              Categories
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

          {/* Publication Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-text">
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">
                  About the Journal
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
              Editorial Workspace
            </h4>
            <p className="text-xs text-muted-text mb-4 leading-normal">
              Private editorial desk for single administrator publishing and moderation.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-ink transition hover:border-orange hover:text-orange shadow-xs"
            >
              <span>Access Admin Dashboard</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Regulatory & Affiliate Disclosure Note */}
        <div className="mt-12 pt-8 border-t border-border/80 text-[11px] text-muted-text/80 space-y-2 leading-relaxed">
          <p>
            <strong>Editorial & Affiliate Disclosure:</strong> Atlas Editorial provides independent reviews, data-driven comparisons, and analysis. Some links featured across our reviews are affiliate referral links, meaning we may earn a commercial commission if you register or claim a promotion through our site. This does not impact our rigorous editorial independence or rating methodology.
          </p>
          <p>
            <strong>Responsible Gaming & Safety:</strong> You must be 18 years of age or older (21+ where applicable) to participate in real-money gaming. Please gamble responsibly and only wager what you can afford to lose. For free, confidential gambling support call 1-800-GAMBLER or visit BeGambleAware.org.
          </p>
        </div>
      </div>
    </footer>
  );
};
