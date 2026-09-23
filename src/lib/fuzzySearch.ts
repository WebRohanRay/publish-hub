// ==============================================================================
// NoxWire — High Performance Client-Side Fuzzy Search Engine
// ==============================================================================

import { BlogPost } from "@/data/seedData";

export interface SearchMatch {
  post: BlogPost;
  score: number;
  matchedFields: string[];
}

/**
 * Searches an array of blog posts with scoring weighted by title, tags, focus keywords, and excerpt.
 */
export function searchPosts(posts: BlogPost[], query: string): SearchMatch[] {
  if (!query || !query.trim()) {
    return posts.map((post) => ({ post, score: 1, matchedFields: [] }));
  }

  const queryTerms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  const results: SearchMatch[] = [];

  for (const post of posts) {
    let score = 0;
    const matchedFields: string[] = [];

    const titleLower = post.title.toLowerCase();
    const excerptLower = (post.excerpt || "").toLowerCase();
    const categoryLower = (post.category || "").toLowerCase();
    const tagsLower = (post.tags || []).map((t) => t.toLowerCase()).join(" ");

    for (const term of queryTerms) {
      // 1. Title exact/partial match (Highest weight: 15 points)
      if (titleLower.includes(term)) {
        score += 15;
        if (!matchedFields.includes("title")) matchedFields.push("title");
      }

      // 2. Tags exact/partial match (High weight: 10 points)
      if (tagsLower.includes(term)) {
        score += 10;
        if (!matchedFields.includes("tags")) matchedFields.push("tags");
      }

      // 3. Category match (Medium weight: 8 points)
      if (categoryLower.includes(term)) {
        score += 8;
        if (!matchedFields.includes("category")) matchedFields.push("category");
      }

      // 4. Excerpt match (Weight: 4 points)
      if (excerptLower.includes(term)) {
        score += 4;
        if (!matchedFields.includes("excerpt")) matchedFields.push("excerpt");
      }
    }

    if (score > 0) {
      results.push({ post, score, matchedFields });
    }
  }

  // Sort descending by score
  return results.sort((a, b) => b.score - a.score);
}
