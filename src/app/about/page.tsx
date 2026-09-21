import React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "About the Publication — NoxWire",
  description: "Our review standards, editorial independence, and testing methodology across dating, gaming, and privacy tech.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 pt-12 pb-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange">
          About NoxWire
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
          Unfiltered Reviews & Technical Intelligence
        </h1>

        <div className="mt-8 prose prose-slate max-w-none text-muted-text space-y-6 text-base sm:text-lg leading-relaxed">
          <p>
            NoxWire is an independent publication dedicated to stress-testing modern matchmaking apps, regulated online casinos, adult creator platforms, and financial privacy technologies.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">Our Independence Principles</h2>
          <p>
            We never accept payment for favorable reviews or inflated ratings. When we recommend a platform, it is because our testing team created real accounts, verified payout mechanisms, evaluated response rates, and confirmed regulatory compliance.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">Affiliate Transparency</h2>
          <p>
            Some outbound links on our site are affiliate referral links. If you register or claim a promotion through these links, our publication may receive compensation at zero extra cost to you. This supports our independent testing lab and editorial freedom.
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
