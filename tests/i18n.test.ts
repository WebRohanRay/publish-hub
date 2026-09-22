import { describe, it, expect } from "vitest";
import {
  TRANSLATIONS,
  CATEGORY_TRANSLATIONS,
  getLocalizedCategory,
  getLocalizedReadingTime,
  getLocalizedDate,
  Locale,
} from "../src/lib/translations";

describe("Multilingual i18n Engine", () => {
  const locales: Locale[] = ["en", "es", "de", "fr"];

  it("should have complete translation keys across all four languages", () => {
    locales.forEach((loc) => {
      const t = TRANSLATIONS[loc];
      expect(t).toBeDefined();
      expect(t.nav.dating).toBeTruthy();
      expect(t.nav.casino).toBeTruthy();
      expect(t.nav.adult).toBeTruthy();
      expect(t.nav.privacy).toBeTruthy();
      expect(t.hero.kicker).toBeTruthy();
      expect(t.comparison.heading).toBeTruthy();
      expect(t.article.commentsHeading).toBeTruthy();
      expect(t.newsletter.heading).toBeTruthy();
      expect(t.footer.rightsReserved).toBeTruthy();
    });
  });

  it("should resolve localized category names correctly", () => {
    expect(getLocalizedCategory("dating", "es")).toBe("Citas y Conexiones");
    expect(getLocalizedCategory("gambling-casino", "de")).toBe("Casino & Sportwetten");
    expect(getLocalizedCategory("adult-lifestyle", "fr")).toBe("Divertissement Adulte & Créateurs");
    expect(getLocalizedCategory("guides-security", "en")).toBe("Privacy, Crypto & Guides");
  });

  it("should format reading times in local languages", () => {
    expect(getLocalizedReadingTime("12 min read", "en")).toBe("12 min read");
    expect(getLocalizedReadingTime("12 min read", "es")).toBe("12 min de lectura");
    expect(getLocalizedReadingTime("12 min read", "de")).toBe("12 Min. Lesezeit");
    expect(getLocalizedReadingTime("12 min read", "fr")).toBe("12 min de lecture");
  });

  it("should format publication dates across locales", () => {
    const rawDate = "Sep 20, 2026";
    expect(getLocalizedDate(rawDate, "es")).toContain("Sep");
    expect(getLocalizedDate(rawDate, "de")).toContain("2026");
    expect(getLocalizedDate(rawDate, "fr")).toContain("2026");
  });
});
