import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Reviews, Comparisons & Guides — Atlas Journal Archive",
  description:
    "Explore our complete index of independent reviews, rating scorecards, and empirical data audits across dating apps, regulated casinos, and digital tools.",
  alternates: {
    canonical: "https://publish-hub.vercel.app/blog",
    languages: {
      "en-US": "https://publish-hub.vercel.app/blog?lang=en",
      "es-ES": "https://publish-hub.vercel.app/blog?lang=es",
      "de-DE": "https://publish-hub.vercel.app/blog?lang=de",
      "fr-FR": "https://publish-hub.vercel.app/blog?lang=fr",
      "x-default": "https://publish-hub.vercel.app/blog",
    },
  },
  openGraph: {
    title: "Atlas Journal — All Reviews & Deep Dives",
    description:
      "Independent evaluations across matchmaking apps, regulated casinos, and digital tools.",
    url: "https://publish-hub.vercel.app/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
