import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata: Metadata = {
  title: "Press Room, Media Kit & Research Citations — Atlas Journal",
  description:
    "Official media kit, brand assets, citation guidelines, and press inquiries for Atlas Journal's independent testing laboratory.",
  alternates: {
    canonical: "https://publish-hub.vercel.app/press",
  },
  openGraph: {
    title: "Atlas Journal Press Room & Media Assets",
    description:
      "Media inquiries, high-resolution brand badges, research citations, and journalist resources.",
    url: "https://publish-hub.vercel.app/press",
  },
};

export default function PressPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Atlas Journal Press Room & Media Assets",
    "description": "Resources and citation standards for journalists covering digital matchmaking, iGaming regulations, and software UX.",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Atlas Journal",
      "url": "https://publish-hub.vercel.app"
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
          <span className="text-orange">Press Room</span>
        </nav>

        <span className="text-xs font-bold uppercase tracking-widest text-orange">
          Media & Academic Resources
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
          Press Room & Citation Guidelines
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-muted-text leading-relaxed font-sans">
          Resources, data verification contacts, and brand assets for investigative journalists, industry analysts, and academic researchers.
        </p>

        {/* Quick Media Contact Box */}
        <div className="my-10 rounded-2xl border border-orange/40 bg-card p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange mb-1">
              Rapid Response Desk (Journalists & Analysts)
            </div>
            <div className="font-semibold text-ink text-base">
              Need quotes, verification on a licensed operator, or raw benchmark data?
            </div>
            <div className="text-xs text-muted-text mt-1">
              Typical response time for accredited media is under 4 business hours.
            </div>
          </div>
          <a
            href="mailto:press@atlasjournal.org"
            className="shrink-0 rounded-xl bg-ink px-6 py-3 text-xs font-bold text-white shadow-button hover:bg-ink/80 transition"
          >
            Email press@atlasjournal.org
          </a>
        </div>

        <div className="space-y-12">
          {/* Section 1: How to Cite Atlas Research */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              How to Cite Atlas Research
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-4">
              When quoting our review data, payout benchmarks, or investigative reports in digital or print media, please adhere to standard attribution guidelines:
            </p>

            <div className="space-y-4 text-xs">
              <div className="rounded-xl border border-border bg-card p-4">
                <span className="font-bold text-ink block mb-1">Digital Publications & News Outlets:</span>
                <p className="text-muted-text">
                  Please provide a direct hyperlink to the specific research report or review page on <code className="text-orange">https://publish-hub.vercel.app/blog/[slug]</code> using descriptive anchor text such as <em>"according to an investigation by Atlas Journal"</em> or <em>"independent payout benchmarking by Atlas"</em>.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <span className="font-bold text-ink block mb-1">Academic Journals (APA 7th Edition format):</span>
                <p className="font-mono text-muted-text bg-paper p-3 rounded-lg border border-border/80">
                  Atlas Editorial Board. (2026). <em>Empirical Benchmark & Security Analysis</em>. Atlas Journal. Retrieved from https://publish-hub.vercel.app
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Embeddable Trust Badges for Reviewed Platforms */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              Official Award Seals & Trust Badges
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-4">
              Platforms that have undergone verified testing and achieved an Atlas score of 8.5/10 or higher are authorized to embed our official editorial seal:
            </p>

            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Badge Preview */}
              <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl border border-orange/40 bg-paper text-center w-48 shadow-xs">
                <div className="h-10 w-10 rounded-full bg-orange/20 text-orange flex items-center justify-center font-bold text-lg mb-2">
                  ★
                </div>
                <div className="font-serif text-ink font-bold text-sm">Atlas Verified</div>
                <div className="text-[10px] font-bold text-orange uppercase tracking-wider mt-0.5">
                  Editor's Choice 2026
                </div>
                <div className="text-[9px] text-muted-text mt-2 font-mono">
                  Score: 9.4 / 10
                </div>
              </div>

              {/* Embed Code */}
              <div className="flex-1 w-full space-y-2">
                <label className="block text-xs font-semibold text-ink">
                  Embed Badge on Your Website (HTML snippet):
                </label>
                <textarea
                  readOnly
                  rows={4}
                  value={`<a href="https://publish-hub.vercel.app" target="_blank" rel="noopener noreferrer" title="Atlas Verified Rating">\n  <img src="https://publish-hub.vercel.app/art/atlas_social_card.jpg" alt="Atlas Certified Editor's Choice 2026" width="160" height="60" />\n</a>`}
                  className="w-full rounded-xl bg-paper font-mono text-[11px] p-3 text-muted-text border border-border focus:outline-none"
                />
                <div className="text-[11px] text-muted-text">
                  Badges must link directly to the Atlas Journal domain or review page without nofollow rel modifications.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Key Facts About Atlas */}
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">
              Fast Facts for Backgrounders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="font-serif text-3xl font-bold text-ink">48</div>
                <div className="text-xs text-muted-text mt-1">Empirical audit checkpoints per review</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="font-serif text-3xl font-bold text-orange">100%</div>
                <div className="text-xs text-muted-text mt-1">Blinded consumer testing accounts</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="font-serif text-3xl font-bold text-ink">30 Days</div>
                <div className="text-xs text-muted-text mt-1">Minimum trial duration before scoring</div>
              </div>
            </div>
          </section>
        </div>

        {/* Links to Research and Standards */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm">
          <Link href="/research" className="font-semibold text-orange hover:underline">
            Explore our 2026 Industry Benchmark Reports →
          </Link>
          <Link href="/editorial-standards" className="font-semibold text-ink hover:text-orange">
            Editorial Standards & Ethics Charter →
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
