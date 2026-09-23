// ==============================================================================
// NoxWire — Content Syndication & Backup Export Engine
// ==============================================================================

import { BlogPost } from "@/data/seedData";

export interface ExportPayload {
  version: string;
  exportedAt: string;
  totalPosts: number;
  posts: BlogPost[];
}

/**
 * Serializes blog posts into a formatted JSON backup package.
 */
export function exportPostsToJson(posts: BlogPost[]): string {
  const payload: ExportPayload = {
    version: "1.1.0",
    exportedAt: new Date().toISOString(),
    totalPosts: posts.length,
    posts,
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Serializes a single post into frontmatter + markdown format.
 */
export function exportPostToMarkdown(post: BlogPost): string {
  const frontmatter = [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `slug: "${post.slug}"`,
    `category: "${post.category}"`,
    `publishedAt: "${post.publishedAt}"`,
    `readingTime: "${post.readingTime}"`,
    `featuredImage: "${post.featuredImage}"`,
    `rating: ${post.rating || "null"}`,
    `badge: "${post.badge || ""}"`,
    `tags: [${(post.tags || []).map((t) => `"${t}"`).join(", ")}]`,
    "---",
    "",
  ].join("\n");

  return `${frontmatter}${post.content}\n`;
}

/**
 * Triggers a client-side file download with the specified mime type.
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string = "application/json"): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
