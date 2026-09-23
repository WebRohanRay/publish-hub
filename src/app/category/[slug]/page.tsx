import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { CategoryArchiveView } from "@/components/public/CategoryArchiveView";
import { getCategoriesServer, getPostsServer } from "@/lib/supabaseServer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategoriesServer();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategoriesServer();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Topic Not Found — NoxWire",
    };
  }

  const canonicalUrl = `https://publish-hub.vercel.app/category/${category.slug}`;

  return {
    title: `${category.name} — NoxWire`,
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
      title: `${category.name} — NoxWire`,
      description: category.description,
      url: canonicalUrl,
      siteName: "NoxWire",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} — NoxWire`,
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
  const categories = await getCategoriesServer();
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    notFound();
  }

  const categoryPosts = await getPostsServer({ category: currentCategory.slug, status: "published" });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${currentCategory.name} — NoxWire`,
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

      <CategoryArchiveView
        category={currentCategory}
        allCategories={categories}
        posts={categoryPosts}
      />

      <PublicFooter />
    </div>
  );
}
