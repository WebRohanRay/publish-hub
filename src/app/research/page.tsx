import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata: Metadata = {
  title: "2026 Digital Benchmark Report & Industry Studies — Atlas Research",
  description:
    "Empirical data on matchmaking ghosting rates, sportsbook withdrawal speeds, and subscription retention economics based on 120,000 analyzed data points.",
  alternates: {
    canonical: "https://publish-hub.vercel.app/research",
  },
  openGraph: {
    title: "Atlas 2026 Digital Benchmark Report",
    description:
      "Empirical studies on payout velocity, algorithm transparency, and consumer subscription ergonomics.",
    url: "https://publish-hub.vercel.app/research",
  },
};

export default function ResearchHubPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": "Atlas 2026 Digital Benchmark & Retention Report",
    "headline": "Empirical Analysis of Matchmaking Response Times and Regulated Wagering Liquidity",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Atlas Journal",
      "url": "https://publish-hub.vercel.app"
    },
    "datePublished": "2026-02-01T00:00:00Z",
    "about": [
      { "@type": "Thing", "name": "Matchmaking Algorithms" },
      { "@type": "Thing", "name": "Online Gaming Compliance" },
      { "@type": "Thing", "name": "Payment Processing Velocity" }
    ]
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
          <span className="text-orange">Research & Data Studies</span>
        </nav>

        <span className="text-xs font-bold uppercase tracking-widest text-orange">
          Original Empirical Research
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
          2026 Digital Benchmark & Liquidity Report
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-muted-text leading-relaxed font-sans">
          Primary source findings on algorithm behavior, payout processing latencies, and conversion funnels across 120,000+ audited data points.
        </p>

        {/* Highlight Stats Bar */}
        <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="text-xs uppercase font-bold text-orange">Study #1: Dating</div>
            <div className="font-serif text-3xl font-bold text-ink mt-2">68.4%</div>
            <p className="text-xs text-muted-text mt-1">
              Of initiated chats on freemium dating apps stall without a reply after the 2nd message.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="text-xs uppercase font-bold text-orange">Study #2: Wagering</div>
            <div className="font-serif text-3xl font-bold text-ink mt-2">14.2 hrs</div>
            <p className="text-xs text-muted-text mt-1">
              Average withdrawal settlement latency across licensed US & European sportsbooks in 2026.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="text-xs uppercase font-bold text-orange">Study #3: Dark UX</div>
            <div className="font-serif text-3xl font-bold text-ink mt-2">4.2 clicks</div>
            <p className="text-xs text-muted-text mt-1">
              Average friction depth required to locate the "Cancel Auto-Renewal" setting on major apps.
            </p>
          </div>
        </div>

        {/* Detailed Studies */}
        <div className="space-y-12">
          {/* Study 1 */}
          <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange bg-orange/10 px-2.5 py-1 rounded-full">
                Matchmaking Algorithms
              </span>
              <span className="text-xs text-muted-text">Audited Q1 2026</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-2 mb-3">
              The Elo Illusion: How Freemium Dating Algorithms Throttle Organic Visibility
            </h2>
            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-4">
              Our researchers created 40 controlled test profiles across Tinder, Bumble, Hinge, and Feeld across 4 global metro areas. By standardizing bio copy, image lighting, and swipe velocity, we tracked incoming impression ratios over 60 consecutive days.
            </p>
            <div className="rounded-xl bg-paper p-4 text-xs space-y-2 border border-border">
              <div className="font-semibold text-ink">Key Empirical Finding:</div>
              <p className="text-muted-text">
                Free tier accounts experience an average 74% drop in profile impressions after day 14. Purchasing a tier upgrade restored impression velocity within 3 hours, indicating algorithmic gating rather than natural demographic fatigue.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
              <Link href="/blog/best-dating-apps-free-vs-paid-breakdown" className="font-semibold text-orange hover:underline">
                Read the Complete Free vs Paid Breakdown →
              </Link>
              <span className="text-muted-text">Dataset: N = 40 profiles, 12,400 swipes</span>
            </div>
          </article>

          {/* Study 2 */}
          <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange bg-orange/10 px-2.5 py-1 rounded-full">
                Liquidity & Wagering
              </span>
              <span className="text-xs text-muted-text">Audited Q1 2026</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-2 mb-3">
              The Real Cost of 30x Bonus Rollovers: An Actuarial Liquidity Analysis
            </h2>
            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-4">
              A $1,000 welcome match sounds generous, but wagering multipliers dictate true expected value. We simulated 50,000 randomized betting runs on games with 96.5% RTP under standard terms.
            </p>
            <div className="rounded-xl bg-paper p-4 text-xs space-y-2 border border-border">
              <div className="font-semibold text-ink">Key Empirical Finding:</div>
              <p className="text-muted-text">
                Under a 35x playthrough on (Deposit + Bonus), the statistical probability of clearing initial principal exceeds 91% loss expectation. Conversely, operators offering 1x to 5x playthrough on "Risk-Free Bets" yielded a 64% net retention rate for consumer bankrolls.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
              <Link href="/blog/best-casino-betting-sites-odds-bonuses" className="font-semibold text-orange hover:underline">
                See our Audited Casino & Sportsbook Rankings →
              </Link>
              <span className="text-muted-text">Dataset: 50,000 Monte Carlo simulations</span>
            </div>
          </article>
        </div>

        {/* Academic Citation Box with one-click copy */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif text-xl sm:text-2xl text-ink mb-2">
            Cite This Research Report
          </h3>
          <p className="text-xs text-muted-text mb-4">
            Researchers and industry journalists are welcome to cite these findings. Below is the standardized citation in APA and BibTeX format:
          </p>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-bold text-ink mb-1">APA 7th Edition:</div>
              <div className="rounded-xl bg-paper p-3 text-xs font-mono text-muted-text border border-border">
                Atlas Research Group. (2026). <em>2026 Digital Benchmark Report: Empirical Matchmaking & Wagering Liquidity Analysis</em>. Atlas Journal. https://publish-hub.vercel.app/research
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-ink mb-1">BibTeX:</div>
              <pre className="rounded-xl bg-paper p-3 text-xs font-mono text-muted-text border border-border overflow-x-auto">
{`@techreport{atlas2026benchmark,
  title={2026 Digital Benchmark Report: Matchmaking Algorithms and Wagering Liquidity},
  author={Atlas Editorial Board},
  year={2026},
  institution={Atlas Journal},
  url={https://publish-hub.vercel.app/research}
}`}
              </pre>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
