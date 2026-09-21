import { MetadataRoute } from "next";
import { INITIAL_POSTS, INITIAL_CATEGORIES } from "@/data/seedData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://publish-hub.vercel.app";
  const now = new Date();

  const getAlternates = (path: string) => ({
    languages: {
      "en-US": `${baseUrl}${path}?lang=en`,
      "es-ES": `${baseUrl}${path}?lang=es`,
      "de-DE": `${baseUrl}${path}?lang=de`,
      "fr-FR": `${baseUrl}${path}?lang=fr`,
      "x-default": `${baseUrl}${path}`,
    },
  });

  // Core public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: getAlternates(""),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: getAlternates("/blog"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: getAlternates("/about"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: getAlternates("/contact"),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: getAlternates("/privacy"),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: getAlternates("/terms"),
    },
  ];

  // Editorial category routes
  const categoryRoutes: MetadataRoute.Sitemap = INITIAL_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: getAlternates(`/category/${cat.slug}`),
  }));

  // Published article routes
  const postRoutes: MetadataRoute.Sitemap = INITIAL_POSTS.filter((p) => p.status === "published").map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
    alternates: getAlternates(`/blog/${post.slug}`),
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
