// ==============================================================================
// NoxWire — Reading Metrics & Readability Analysis Engine
// ==============================================================================

export interface ReadingMetrics {
  words: number;
  characters: number;
  readingTimeMinutes: number;
  formattedReadingTime: string;
  headingsCount: number;
  tableCount: number;
}

/**
 * Calculates comprehensive reading metrics for long-form editorial content.
 * Standard average adult silent reading speed: 200–250 words per minute.
 */
export function calculateReadingMetrics(
  content: string,
  wordsPerMinute: number = 225
): ReadingMetrics {
  if (!content || typeof content !== "string") {
    return {
      words: 0,
      characters: 0,
      readingTimeMinutes: 1,
      formattedReadingTime: "1 min read",
      headingsCount: 0,
      tableCount: 0,
    };
  }

  // Strip code blocks and HTML/Markdown markup to count actual editorial words
  const cleanText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[#*`_~\[\]()]/g, " ")
    .trim();

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const characters = cleanText.length;

  const readingTimeMinutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  const formattedReadingTime = `${readingTimeMinutes} min read`;

  // Count structure elements
  const headingsCount = (content.match(/^#{1,6}\s+/gm) || []).length;
  const tableCount = (content.match(/\|[\s-:]+\|/g) || []).length;

  return {
    words,
    characters,
    readingTimeMinutes,
    formattedReadingTime,
    headingsCount,
    tableCount,
  };
}
