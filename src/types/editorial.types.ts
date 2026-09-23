// ==============================================================================
// NoxWire — Editorial Domain & Localized Type Definitions
// ==============================================================================

export type SupportedLocale = "en" | "es" | "de" | "fr";

export type EditorialCategorySlug = 
  | "dating" 
  | "gambling-casino" 
  | "adult-lifestyle" 
  | "guides-security";

export interface CategoryMetadata {
  slug: EditorialCategorySlug;
  name: string;
  description: string;
  badgeColor: string;
  postCountEstimate: number;
}

export interface EditorialPostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: EditorialCategorySlug;
  image: string;
  readingTime: string;
  publishedAt: string;
  rating?: number;
  badge?: string;
}
