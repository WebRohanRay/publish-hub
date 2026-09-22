"use client";

import { useEffect } from "react";

export function WebVitalsTelemetry() {
  useEffect(() => {
    if (typeof window === "undefined" || !("performance" in window)) return;

    try {
      // Observe LCP (Largest Contentful Paint)
      const po = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          // Telemetry captured silently for Core Web Vitals audits
          window.dispatchEvent(
            new CustomEvent("web-vitals-lcp", { detail: { lcp: lastEntry.startTime } })
          );
        }
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });

      // Observe CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsScore = 0;
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        }
        window.dispatchEvent(
          new CustomEvent("web-vitals-cls", { detail: { cls: clsScore } })
        );
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // Graceful fallback on older browsers
    }
  }, []);

  return null;
}
