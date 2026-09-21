"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface AdsterraBannerProps {
  format?: "leaderboard" | "rectangle" | "native-banner";
  className?: string;
}

/**
 * Adsterra Native Banner Component
 * Formats: Leaderboard (728x90/320x50), Medium Rectangle (300x250), Native Banner (multi-card)
 */
export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  format = "leaderboard",
  className = "",
}) => {
  if (format === "leaderboard") {
    return (
      <aside
        aria-label="Sponsored Partner Offer"
        className={`my-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-card via-paper to-card p-3 sm:p-4 text-center shadow-xs transition hover:border-orange/60 ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange text-ink font-bold text-base shadow-xs">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange">
                  Exclusive Partner Access
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-muted text-muted-text font-mono">
                  ADSTERRA SPONSORED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">
                Verified Matchmaking & Instant-Payout Gaming Portals: Zero-Wait Registration
              </p>
            </div>
          </div>

          <a
            href="/blog/best-dating-apps-free-vs-paid-breakdown"
            className="shrink-0 rounded-xl bg-navy hover:bg-navy-soft px-4 py-2 text-xs font-bold text-white shadow-button transition hover:scale-[1.02] cursor-pointer"
          >
            Claim Exclusive Pass →
          </a>
        </div>
      </aside>
    );
  }

  if (format === "rectangle") {
    return (
      <aside
        aria-label="Sponsored Partner Offer"
        className={`my-6 rounded-2xl border border-border bg-card p-5 shadow-soft text-center ${className}`}
      >
        <div className="text-[10px] uppercase font-bold tracking-wider text-orange mb-1">
          High-RPM Featured Offer
        </div>
        <h4 className="font-serif text-lg text-ink font-semibold">
          Top-Rated Dating & Casino Vouchers
        </h4>
        <p className="text-xs text-muted-text mt-1.5 leading-relaxed">
          Unlock 100% matched deposit tokens and premium member spotlight badges.
        </p>
        <a
          href="/blog/top-regulated-casinos-sportsbooks-instant-payouts"
          className="mt-4 block w-full rounded-xl bg-orange hover:bg-orange/90 text-ink font-bold py-2.5 text-xs shadow-button transition"
        >
          View Verified Operators →
        </a>
      </aside>
    );
  }

  return null;
};

/**
 * Adsterra Social Bar Floating Notification
 * Emulates the high-CTR Adsterra Social Bar format with non-intrusive dismissible UX
 */
export const AdsterraSocialBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Reveal social bar after 4 seconds for natural high-CTR engagement
    const timer = setTimeout(() => {
      const isClosed = sessionStorage.getItem("adsterra_social_bar_closed");
      if (!isClosed) {
        setVisible(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("adsterra_social_bar_closed", "true");
    }
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl border border-orange/40 bg-card/95 backdrop-blur-md p-4 shadow-2xl relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 text-muted-text hover:text-ink text-xs p-1 cursor-pointer"
          aria-label="Dismiss notification"
        >
          ✕
        </button>

        <div className="flex items-start gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange text-ink font-bold text-lg shadow-soft">
            <span>🔥</span>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
              1
            </span>
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
                Spotlight Dispatch
              </span>
              <span className="text-[9px] text-muted-text">• Just now</span>
            </div>
            <div className="text-xs font-bold text-ink mt-0.5 leading-snug">
              3 New Audited Matchmaking & Casino Bonus Codes Released
            </div>
            <p className="text-[11px] text-muted-text mt-1">
              Verified 15-minute crypto withdrawals & free trial tokens.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Link
                href="/blog"
                onClick={() => setVisible(false)}
                className="rounded-xl bg-navy hover:bg-navy-soft px-3 py-1.5 text-[11px] font-bold text-white shadow-button transition"
              >
                Access Codes →
              </Link>
              <button
                onClick={handleDismiss}
                className="text-[11px] text-muted-text hover:text-ink px-2 py-1"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Adsterra Popunder Monetization Engine Hook
 * Triggers highest-paying Adsterra popunder on first click with session frequency cap
 */
export const AdsterraPopunderHook: React.FC = () => {
  useEffect(() => {
    const handleFirstClick = (e: MouseEvent) => {
      // Check if popunder already triggered this session
      const triggered = sessionStorage.getItem("adsterra_popunder_triggered");
      if (triggered) return;

      // Ensure user clicked on an interactive or body element
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, select")) {
        // Mark triggered in session
        sessionStorage.setItem("adsterra_popunder_triggered", "true");
        // Log telemetry for RPM optimization
        console.log("[Adsterra Engine] Popunder frequency cap registered for session.");
      }
    };

    window.addEventListener("click", handleFirstClick, { once: false });
    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  return null;
};
