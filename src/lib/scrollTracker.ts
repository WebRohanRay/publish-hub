// ==============================================================================
// NoxWire — Viewport Scroll Progress & Milestone Tracker
// ==============================================================================

export interface ScrollMilestones {
  hasPassed25Percent: boolean;
  hasPassed50Percent: boolean;
  hasPassed75Percent: boolean;
  hasCompletedArticle: boolean;
}

/**
 * Calculates current scroll completion percentage between 0 and 100.
 */
export function calculateScrollProgress(): number {
  if (typeof window === "undefined") return 0;

  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
}

/**
 * Evaluates whether the reader reached key engagement milestones.
 */
export function evaluateMilestones(progress: number): ScrollMilestones {
  return {
    hasPassed25Percent: progress >= 25,
    hasPassed50Percent: progress >= 50,
    hasPassed75Percent: progress >= 75,
    hasCompletedArticle: progress >= 90,
  };
}
