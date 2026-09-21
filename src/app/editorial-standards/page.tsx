import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata: Metadata = {
  title: "Editorial Standards & Ethics Charter — Atlas Journal",
  description:
    "Our editorial independence charter, fact-checking policies, conflict of interest declarations, and corrections procedures.",
  alternates: {
    canonical: "https://publish-hub.vercel.app/editorial-standards",
  },
  openGraph: {
    title: "Atlas Editorial Standards & Ethics Charter",
    description:
      "Uncompromising review independence, double-blind audit protocols, and strict affiliate separation.",
    url: "https://publish-hub.vercel.app/editorial-standards",
    type: "article",
  },
};

export default function EditorialStandardsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Atlas Editorial Standards and Code of Ethics",
    "description": "The ethical principles, conflicts policy, and correction guidelines governing Atlas Journal.",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Atlas Journal",
      "url": "https://publish-hub.vercel.app",
      "publishingPrinciples": "https://publish-hub.vercel.app/editorial-standards",
      "correctionsPolicy": "https://publish-hub.vercel.app/editorial-standards#corrections"
    }
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
          <span className="text-orange">Editorial Standards</span>
        </nav>

        <span className="text-xs font-bold uppercase tracking-widest text-orange">
          Publishing Ethics & Trust
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
          Editorial Standards & Independence Charter
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-muted-text leading-relaxed font-sans">
          The principles, safeguards, and verification protocols that ensure every review, comparison, and analysis on Atlas remains completely impartial.
        </p>

        {/* Highlight Quote */}
        <blockquote className="my-10 border-l-4 border-orange pl-6 italic font-serif text-xl sm:text-2xl text-ink bg-card py-5 rounded-r-2xl shadow-xs">
          "A review platform has zero value if its opinions can be purchased. Trust is not a feature; it is our entire enterprise."
        </blockquote>

        <div className="space-y-12">
          {/* Principle 1 */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              1. Strict Separation of Church and State
            </h2>
            <p className="text-muted-text text-base leading-relaxed">
              Our review desk and affiliate revenue operations exist in distinct operational silos. The editorial team selects products to audit based on user demand, regulatory relevance, and market momentum—never commercial partnerships. Writers, researchers, and editors have no access to referral payout tables or revenue share statistics when scoring a service.
            </p>
          </section>

          {/* Principle 2 */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              2. Prohibition of Paid Reviews & Sponsored Scores
            </h2>
            <p className="text-muted-text text-base leading-relaxed">
              Atlas does not sell editorial placement, positive ratings, or guaranteed review inclusion. While we accept display advertising and affiliate referrals, advertisers exert zero editorial influence over article text, review rankings, or pros and cons listings. Any paid advertorial is visibly marked with a distinct banner.
            </p>
          </section>

          {/* Principle 3 */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              3. Empirical Verification & Anti-Fabrication Rule
            </h2>
            <p className="text-muted-text text-base leading-relaxed">
              We never fabricate user experiences or extrapolate ratings from press releases. If an app or casino is reviewed, an actual human researcher signed up, deposited currency, completed identity checks, tested customer support channels, and tracked withdrawal fulfillment.
            </p>
          </section>

          {/* Principle 4 */}
          <section id="corrections">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              4. Corrections & Transparent Retractions Policy
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-4">
              When factual inaccuracies occur, we correct them immediately and transparently. Substantive updates to terms, wagering multipliers, or licensing statuses are annotated with a timestamped correction note at the head or foot of the article.
            </p>
            <div className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-text space-y-1">
              <strong className="text-ink">Report an error:</strong> If you detect an inaccurate metric or outdated bonus rollover requirement, please notify our oversight desk at <code className="text-orange">corrections@atlasjournal.org</code>. Requests are investigated within 24 business hours.
            </div>
          </section>

          {/* Principle 5 */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              5. Responsible Gaming & Mental Wellbeing Commitment
            </h2>
            <p className="text-muted-text text-base leading-relaxed">
              We strictly enforce responsible gambling standards. All iGaming reviews mandate 21+ (or 18+ where legally compliant) age verifications, link to national assistance helplines (such as 1-800-GAMBLER, GamCare, or BeGambleAware), and provide instructions on self-exclusion timeouts and deposit caps.
            </p>
          </section>
        </div>

        {/* Citation & Methodology link */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm">
          <Link href="/methodology" className="font-semibold text-orange hover:underline">
            ← Review our 48-Point Testing Methodology
          </Link>
          <Link href="/press" className="font-semibold text-ink hover:text-orange">
            Journalist Press Kit & Backlink Assets →
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
