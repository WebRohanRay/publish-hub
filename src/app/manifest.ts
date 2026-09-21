import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NoxWire — Dating, iGaming & Adult Tech Reviews",
    short_name: "NoxWire",
    description:
      "The unfiltered independent review journal for verified dating apps, regulated online casinos, sportsbook odds, and adult tech.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9F8F6",
    theme_color: "#0F172A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
