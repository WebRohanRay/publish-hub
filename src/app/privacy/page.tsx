import React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Privacy Policy — Atlas Journal",
  description: "How we protect visitor privacy, cookies, and anonymous interaction tokens.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 pt-12 pb-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange">
          Legal & Privacy
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
          Privacy Policy
        </h1>

        <div className="mt-8 prose prose-slate max-w-none text-muted-text space-y-6 text-base leading-relaxed">
          <p>
            Your privacy is non-negotiable. Atlas does not maintain public visitor profiles, track personal identities across third-party networks, or sell personal data.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">1. Private Comments</h2>
          <p>
            When you submit a reflection or question on our reviews, your email address is used solely for anti-spam moderation and verification. It is stored in secure, private database columns and is never rendered publicly or shared with third parties.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">2. Anonymous Likes & Views</h2>
          <p>
            Interactions such as article likes and reading statistics use hashed anonymous session tokens stored in your browser's local storage. They contain no personally identifiable information.
          </p>
          <h2 className="font-serif text-2xl text-ink mt-6">3. Cookies & Advertising</h2>
          <p>
            We use essential cookies to maintain your session and site preferences. If you click on an external partner link, that third-party provider may place a referral cookie to credit our editorial partnership.
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
