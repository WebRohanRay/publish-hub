"use client";

import React, { useState, useEffect } from "react";

interface StickyFooterAdProps {
  sponsorName?: string;
  headline?: string;
  badge?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function StickyFooterAd({
  sponsorName = "BitStarz Verified",
  headline = "Exclusive: 5 BTC Welcome Package + 180 Free Spins with Instant Crypto Cashouts",
  badge = "Audited Operator",
  ctaText = "Claim Bonus",
  ctaUrl = "https://www.bitstarz.com",
}: StickyFooterAdProps) {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Only display after 4 seconds to protect initial Core Web Vitals (FID/INP/CLS)
    const dismissedSession = sessionStorage.getItem("noxwire_footer_ad_dismissed");
    if (!dismissedSession) {
      const timer = setTimeout(() => setIsDismissed(false), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("noxwire_footer_ad_dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <aside 
      aria-label="Sponsored Partner Announcement"
      className="fixed bottom-0 inset-x-0 z-40 p-2.5 sm:p-3 bg-zinc-950/95 backdrop-blur-md border-t border-amber-500/30 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4">
        {/* Left: Sponsor & Offer Hook */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="hidden xs:flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400 text-black">
                {badge}
              </span>
              <span className="text-xs font-semibold text-zinc-300">
                {sponsorName}
              </span>
            </div>
            <p className="text-xs text-zinc-200 font-medium line-clamp-1">
              {headline}
            </p>
          </div>
        </div>

        {/* Right: CTA & Dismiss */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition transform active:scale-95 whitespace-nowrap"
          >
            <span>{ctaText}</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button
            onClick={handleDismiss}
            aria-label="Close promotion"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
