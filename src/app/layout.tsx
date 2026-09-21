import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import { AdsterraSocialBar, AdsterraPopunderHook } from "@/components/ads/AdsterraMonetization";
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
  title: "NoxWire — Dating Apps, Instant Payout Casinos & Adult Tech Reviews",
  description:
    "The unfiltered independent review journal for verified dating apps, regulated online casinos, sportsbook odds, and creator-led adult entertainment platforms.",
  keywords: [
    "dating apps review",
    "online casino instant payout",
    "adult entertainment reviews",
    "sports betting bonuses",
    "discreet billing",
    "crypto gambling vouchers",
    "best matchmaking apps 2026",
    "NoxWire",
  ],
  authors: [{ name: "Rohan Ray", url: "https://publish-hub.vercel.app/about" }],
  creator: "Rohan Ray",
  publisher: "NoxWire",
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
    title: "NoxWire — Dating Apps, Instant Payout Casinos & Adult Tech Reviews",
    description:
      "The unfiltered independent review journal for verified dating apps, regulated online casinos, sportsbook odds, and creator-led adult entertainment platforms.",
    url: "https://publish-hub.vercel.app",
    siteName: "NoxWire",
    images: [
      {
        url: "/art/atlas_social_card.jpg",
        width: 1200,
        height: 630,
        alt: "NoxWire — Dating, iGaming & Adult Tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoxWire — Dating Apps, Instant Payout Casinos & Adult Tech Reviews",
    description:
      "The unfiltered independent review journal for verified dating apps, regulated online casinos, sportsbook odds, and creator-led adult entertainment platforms.",
    images: ["/art/atlas_social_card.jpg"],
    creator: "@NoxWireHQ",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
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
        <I18nProvider>
          {children}
          {/* Adsterra High-RPM Monetization Engine */}
          <AdsterraSocialBar />
          <AdsterraPopunderHook />
        </I18nProvider>
      </body>
    </html>
  );
}
