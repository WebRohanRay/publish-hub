import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { StoryCard } from "@/components/public/StoryCard";
import { TopicRibbon } from "@/components/public/TopicRibbon";
import { AdsterraBanner } from "@/components/ads/AdsterraMonetization";
import { INITIAL_CATEGORIES, INITIAL_POSTS } from "@/data/seedData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = INITIAL_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Topic Not Found — Atlas Editorial",
    };
  }

  const canonicalUrl = `https://publish-hub.vercel.app/category/${category.slug}`;

  return {
    title: `${category.name} — Atlas Editorial`,
    description: category.description,
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
      title: `${category.name} — Atlas Editorial`,
      description: category.description,
      url: canonicalUrl,
      siteName: "Atlas Editorial",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} — Atlas Editorial`,
      description: category.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryArchivePage({ params }: PageProps) {
  const { slug } = await params;
  const currentCategory =
    INITIAL_CATEGORIES.find((c) => c.slug === slug) || INITIAL_CATEGORIES[0];

  if (!currentCategory) {
    notFound();
  }

  const categoryPosts = INITIAL_POSTS.filter(
    (post) => post.categorySlug === currentCategory.slug && post.status === "published"
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${currentCategory.name} — Atlas Editorial`,
    "description": currentCategory.description,
    "url": `https://publish-hub.vercel.app/category/${currentCategory.slug}`,
    "hasPart": categoryPosts.map((p) => ({
      "@type": "Article",
      "headline": p.title,
      "url": `https://publish-hub.vercel.app/blog/${p.slug}`,
      "description": p.excerpt,
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://publish-hub.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Topics",
        "item": "https://publish-hub.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentCategory.name,
        "item": `https://publish-hub.vercel.app/category/${currentCategory.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-paper-public text-ink flex flex-col selection:bg-orange/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <PublicHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 pt-6 pb-20">
        {/* Top Adsterra Leaderboard Slot */}
        <AdsterraBanner format="leaderboard" />

        <div className="border-b border-border/80 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-text mb-2">
            <Link href="/blog" className="hover:text-ink">
              All Topics
            </Link>
            <span>/</span>
            <span className="text-orange">{currentCategory.name}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            {currentCategory.name}
          </h1>
          <p className="mt-3 text-base text-muted-text max-w-2xl leading-relaxed">
            {currentCategory.description}
          </p>
        </div>

        <TopicRibbon categories={INITIAL_CATEGORIES} activeCategory={currentCategory.slug} />

        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {categoryPosts.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="my-16 text-center py-16 rounded-2xl border border-dashed border-border bg-card">
            <span className="text-3xl block mb-2">✍️</span>
            <h3 className="font-serif text-xl text-ink">No stories published in this topic yet.</h3>
            <p className="text-sm text-muted-text mt-2 max-w-sm mx-auto">
              Our editorial writers are preparing new essays for this collection.
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-block rounded-xl bg-navy hover:bg-navy-soft px-5 py-2.5 text-xs font-bold text-white shadow-button transition"
            >
              Back to All Stories
            </Link>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
