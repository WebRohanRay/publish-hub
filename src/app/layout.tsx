import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://publish-hub.vercel.app"),
  title: "Atlas Journal — Ideas that make tomorrow clearer",
  description:
    "Atlas is a weekly editorial journal evaluating top matchmaking platforms, regulated iGaming operators, and intentional digital tools.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/?lang=en",
      "es-ES": "/?lang=es",
      "de-DE": "/?lang=de",
      "fr-FR": "/?lang=fr",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Atlas Journal — Ideas that make tomorrow clearer",
    description:
      "Atlas is a weekly editorial journal evaluating top matchmaking platforms, regulated iGaming operators, and intentional digital tools.",
    images: ["/art/atlas_social_card.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Journal — Ideas that make tomorrow clearer",
    description:
      "Atlas is a weekly editorial journal evaluating top matchmaking platforms, regulated iGaming operators, and intentional digital tools.",
    images: ["/art/atlas_social_card.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <head>
        <GlobalJsonLd />
      </head>
      <body className="antialiased font-sans text-ink bg-paper selection:bg-orange/30 selection:text-ink">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
