// ==============================================================================
// NoxWire — URL Slug Generator & Sanitization Utility
// ==============================================================================

/**
 * Converts any arbitrary headline or category name into a clean, URL-safe slug.
 * Strips accents, removes special characters, and trims trailing hyphens.
 */
export function slugify(text: string): string {
  if (!text || typeof text !== "string") return "";

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics / accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric chars
    .replace(/[\s_-]+/g, "-") // Collapse whitespace and underscores to hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}
