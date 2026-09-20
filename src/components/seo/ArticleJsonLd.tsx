import React from "react";
import { Post } from "@/data/seedData";

interface ArticleJsonLdProps {
  post: Post;
  url: string;
}

export const ArticleJsonLd: React.FC<ArticleJsonLdProps> = ({ post, url }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: "2026-09-20T00:00:00Z",
    dateModified: "2026-09-20T00:00:00Z",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Atlas Journal",
      logo: {
        "@type": "ImageObject",
        url: "https://publish-hub.vercel.app/art/atlas_social_card.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.rating
      ? {
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: post.rating,
              bestRating: 5,
            },
            author: {
              "@type": "Person",
              name: post.author.name,
            },
          },
        }
      : {}),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://publish-hub.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category,
        item: `https://publish-hub.vercel.app/category/${post.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
    </>
  );
};
