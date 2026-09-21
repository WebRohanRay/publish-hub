import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata: Metadata = {
  title: "Testing Methodology & Evaluation Protocol — Atlas Journal",
  description:
    "Our comprehensive 48-point empirical testing framework for evaluating matchmaking apps, regulated iGaming systems, and digital software.",
  alternates: {
    canonical: "https://publish-hub.vercel.app/methodology",
  },
  openGraph: {
    title: "Atlas 48-Point Empirical Testing Methodology",
    description:
      "Independent testing protocols, deposit/withdrawal speed tracking, and UX audit standards.",
    url: "https://publish-hub.vercel.app/methodology",
    type: "article",
  },
};

export default function MethodologyPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Atlas Empirical Review Methodology & Scoring Rubric",
    "description": "The standardized 48-point framework used by Atlas Journal to independently evaluate digital services.",
    "author": {
      "@type": "Organization",
      "name": "Atlas Journal Editorial Board",
      "url": "https://publish-hub.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Atlas Journal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://publish-hub.vercel.app/art/atlas_social_card.jpg"
      }
    },
    "datePublished": "2026-01-15T08:00:00Z",
    "dateModified": "2026-09-20T12:00:00Z"
  };

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col selection:bg-orange/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 pt-12 pb-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-6">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-orange">Methodology</span>
        </nav>

        <span className="text-xs font-bold uppercase tracking-widest text-orange">
          E-E-A-T Research Standards
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
          Our 48-Point Empirical Review Methodology
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-muted-text leading-relaxed font-sans">
          How Atlas independently audits, benchmarks, and scores matchmaking platforms, regulated iGaming operators, and digital productivity tools.
        </p>

        {/* Executive summary banner */}
        <div className="my-10 rounded-2xl border border-orange/40 bg-card p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 text-orange font-bold text-xs uppercase tracking-wider mb-2">
            <span className="flex h-2 w-2 rounded-full bg-orange animate-pulse" />
            Core Editorial Mandate
          </div>
          <p className="text-ink text-sm sm:text-base leading-relaxed">
            Atlas does not accept free promotional privileges, curated VIP review accounts, or sponsored rating guarantees. Every rating published on this journal is the outcome of minimum 30-day blinded consumer testing under real financial and identity conditions.
          </p>
        </div>

        {/* 5 Core Pillars */}
        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-white text-sm font-sans font-bold">1</span>
              Regulatory Integrity & Licensing Verification
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-4">
              Before a platform is assigned an testing slot, our compliance team cross-references its operator entity against primary regulatory registers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-1.5">
                <div className="font-bold text-ink text-sm">Tier-1 Jurisdictions</div>
                <div className="text-muted-text">UK Gambling Commission (UKGC), Malta Gaming Authority (MGA), New Jersey DGE, Nevada Gaming Control Board.</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-1.5">
                <div className="font-bold text-ink text-sm">Consumer Protection Laws</div>
                <div className="text-muted-text">FTC truth-in-advertising guidelines, GDPR data portability, state-level biometric identifier compliance for matchmaking facial verification.</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-white text-sm font-sans font-bold">2</span>
              Deposit & Payout Velocity Benchmarking
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-4">
              Marketing claims of "Instant Payouts" are routinely inaccurate. Our auditors deposit real funds using four distinct payment rails and track the exact elapsed hours until funds clear:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-text font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Payment Channel</th>
                    <th className="py-2.5 px-3">Atlas Benchmark Target</th>
                    <th className="py-2.5 px-3">Weight in Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-ink">
                  <tr>
                    <td className="py-3 px-3 font-semibold">Crypto (BTC, ETH, USDT)</td>
                    <td className="py-3 px-3">&lt; 45 minutes</td>
                    <td className="py-3 px-3 font-mono text-orange">25%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">E-Wallets (PayPal, Skrill, Venmo)</td>
                    <td className="py-3 px-3">&lt; 4 hours</td>
                    <td className="py-3 px-3 font-mono text-orange">20%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">Debit / Credit Card Settlement</td>
                    <td className="py-3 px-3">&lt; 24 hours</td>
                    <td className="py-3 px-3 font-mono text-orange">15%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">ACH & Bank Wire</td>
                    <td className="py-3 px-3">&lt; 48 hours</td>
                    <td className="py-3 px-3 font-mono text-orange">10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-white text-sm font-sans font-bold">3</span>
              Algorithmic Match Quality & Community Health
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-4">
              In social and matchmaking app evaluations, inflated member counts often conceal low response rates and inactive ghost profiles. Our protocol evaluates:
            </p>
            <ul className="space-y-3 text-sm text-muted-text">
              <li className="flex items-start gap-3">
                <span className="text-orange font-bold">▸</span>
                <span><strong className="text-ink">Verified Photo Ratio:</strong> The percentage of active profiles that possess cryptographic or human-verified identity badges.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange font-bold">▸</span>
                <span><strong className="text-ink">First-Message Response Latency:</strong> Median time to conversation initiation across 500 standardized greeting tests in metropolitan and suburban clusters.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange font-bold">▸</span>
                <span><strong className="text-ink">Subscription Retention Value:</strong> Whether paid tiers offer statistically significant match uplift compared to standard free accounts.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-white text-sm font-sans font-bold">4</span>
              Zero Dark-Pattern Audit
            </h2>
            <p className="text-muted-text text-base leading-relaxed">
              We penalize any platform that employs deceptive UX techniques. This includes countdown timers on bonuses that reset automatically, recurring billing options pre-checked by default, or cancellation workflows requiring phone calls instead of one-click digital unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-white text-sm font-sans font-bold">5</span>
              Composite Scoring Formula
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 text-sm font-mono text-ink">
              Atlas Overall Score = (Security × 0.30) + (Speed & Liquidity × 0.25) + (UX & Ergonomics × 0.20) + (Terms Fairness × 0.15) + (Support Responsiveness × 0.10)
            </div>
          </section>
        </div>

        {/* Citation Notice for Journalists */}
        <div className="mt-16 rounded-2xl border border-border bg-paper p-6 text-xs text-muted-text flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <strong className="text-ink">Academic & Journalistic Attribution:</strong> Data points from this methodology may be cited under CC-BY 4.0 with attribution link to <code className="text-orange">https://publish-hub.vercel.app/methodology</code>.
          </div>
          <Link
            href="/press"
            className="shrink-0 rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white hover:bg-ink/80 transition"
          >
            Press Resources →
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
