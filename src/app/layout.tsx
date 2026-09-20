import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
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
  title: "Atlas Journal — Ideas that make tomorrow clearer",
  description:
    "Atlas is a weekly editorial journal about the systems, tools, and quiet shifts shaping how we live and make.",
  openGraph: {
    title: "Atlas Journal — Ideas that make tomorrow clearer",
    description:
      "Atlas is a weekly editorial journal about the systems, tools, and quiet shifts shaping how we live and make.",
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
      <body className="antialiased font-sans text-ink bg-paper selection:bg-orange/30 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
