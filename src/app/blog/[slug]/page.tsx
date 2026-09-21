import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { ArticleInteractiveView } from "@/components/blog/ArticleInteractiveView";
import { INITIAL_POSTS } from "@/data/seedData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Review Not Found — NoxWire",
    };
  }

  const canonicalUrl = `https://publish-hub.vercel.app/blog/${post.slug}`;

  return {
    title: `${post.title} — NoxWire`,
    description: post.excerpt,
    keywords: [
      post.category,
      "NoxWire",
      "dating app reviews",
      "crypto casino payouts",
      "adult entertainment tech",
      "privacy guides",
      ...(post.badge ? [post.badge] : []),
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${canonicalUrl}?lang=en`,
        "es-ES": `${canonicalUrl}?lang=es`,
        "de-DE": `${canonicalUrl}?lang=de`,
        "fr-FR": `${canonicalUrl}?lang=fr`,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: "NoxWire",
      type: "article",
      publishedTime: "2026-09-20T00:00:00Z",
      authors: [post.author.name],
      section: post.category,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
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
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === slug) || INITIAL_POSTS[0];

  if (!post) {
    notFound();
  }

  const relatedPosts = INITIAL_POSTS.filter((p) => p.id !== post.id && p.status === "published").slice(0, 2);
  const canonicalUrl = `https://publish-hub.vercel.app/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col selection:bg-orange/30">
      {/* Dynamic JSON-LD Structured Data */}
      <ArticleJsonLd post={post} url={canonicalUrl} />

      <PublicHeader />

      <ArticleInteractiveView
        post={post}
        relatedPosts={relatedPosts}
        canonicalUrl={canonicalUrl}
      />

      <PublicFooter />
    </div>
  );
}
