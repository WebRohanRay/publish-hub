import React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Contact the Editorial Desk — Atlas Journal",
  description: "Reach our editorial team for review inquiries, tips, and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col">
      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 pt-12 pb-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange">
          Editorial Inquiries
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink">
          Contact the Desk
        </h1>

        <div className="mt-8 space-y-6 text-muted-text text-base leading-relaxed">
          <p>
            Have a product or platform you would like our editorial team to independently evaluate? Reach out directly to our review desk.
          </p>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase text-ink">Editorial Inquiries & Tips</div>
              <a href="mailto:editorial@atlasjournal.io" className="text-sm text-orange hover:underline">
                editorial@atlasjournal.io
              </a>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase text-ink">Partnerships & Commercial</div>
              <a href="mailto:partners@atlasjournal.io" className="text-sm text-orange hover:underline">
                partners@atlasjournal.io
              </a>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase text-ink">Responsible Gaming Concerns</div>
              <a href="mailto:compliance@atlasjournal.io" className="text-sm text-orange hover:underline">
                compliance@atlasjournal.io
              </a>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
