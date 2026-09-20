import { NextResponse } from "next/server";
import { INITIAL_POSTS } from "@/data/seedData";

export async function GET() {
  const baseUrl = "https://publish-hub.vercel.app";

  const feedItems = INITIAL_POSTS.map(
    (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <author>${post.author.name}</author>
      <pubDate>${new Date(post.publishedAt || "2026-09-20").toUTCString()}</pubDate>
    </item>`
  ).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Atlas Journal — Ideas that make tomorrow clearer</title>
    <link>${baseUrl}</link>
    <description>An independent weekly editorial journal evaluating top matchmaking platforms, regulated iGaming operators, and intentional digital tools.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
