import React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Terms of Use — Atlas Journal",
  description: "Terms of use, age verification requirements, and responsible usage guidelines.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 pt-12 pb-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange">
          Legal
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
          Terms of Use
        </h1>

        <div className="mt-8 prose prose-slate max-w-none text-muted-text space-y-6 text-base leading-relaxed">
          <p>
            By accessing or using Atlas Journal, you acknowledge and agree to comply with these Terms of Use and applicable local laws.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">Age Requirement (18+ / 21+)</h2>
          <p>
            Certain sections of this publication review regulated gaming, sports wagering, and adult-oriented matchmaking applications. You must be at least 18 years of age (or 21+ in jurisdictions where required by law) to access these materials.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">No Financial or Legal Advice</h2>
          <p>
            All editorial reviews, odds analysis, and promotional breakdowns are provided for informational and educational purposes only. Never gamble with money you cannot afford to lose.
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
