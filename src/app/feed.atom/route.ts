import { NextResponse } from "next/server";
import { INITIAL_POSTS } from "@/data/seedData";

export async function GET() {
  const baseUrl = "https://publish-hub.vercel.app";
  const updatedDate = new Date().toISOString();

  const entries = INITIAL_POSTS.map(
    (post) => `
  <entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${baseUrl}/blog/${post.slug}" />
    <id>${baseUrl}/blog/${post.slug}</id>
    <updated>${new Date(post.publishedAt || "2026-09-20").toISOString()}</updated>
    <summary type="html"><![CDATA[${post.excerpt}]]></summary>
    <author>
      <name>${post.author.name}</name>
    </author>
    <category term="${post.category}" />
  </entry>`
  ).join("");

  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>NoxWire — The Unfiltered Journal of Dating, iGaming &amp; Adult Tech</title>
  <subtitle>Algorithmic breakdowns, payout testing, privacy guides, and benchmarks.</subtitle>
  <link href="${baseUrl}/feed.atom" rel="self" />
  <link href="${baseUrl}" />
  <id>${baseUrl}/</id>
  <updated>${updatedDate}</updated>
  <author>
    <name>NoxWire Editorial Desk</name>
    <email>editor@noxwire.io</email>
  </author>
  ${entries}
</feed>`;

  return new NextResponse(atomXml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
