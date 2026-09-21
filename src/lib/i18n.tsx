"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, TRANSLATIONS, Translations } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale, isUserExplicit?: boolean) => void;
  t: Translations;
  countryCode?: string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: TRANSLATIONS.en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [countryCode, setCountryCode] = useState<string>("US");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper to apply locale
    const applyLocale = (newLocale: Locale) => {
      setLocaleState(newLocale);
      document.documentElement.lang = newLocale;
    };

    // 1. Check URL query param first (?lang=es, etc.)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang") as Locale | null;
      if (langParam && (langParam === "en" || langParam === "es" || langParam === "de" || langParam === "fr")) {
        applyLocale(langParam);
        localStorage.setItem("noxwire_user_selected_lang", langParam);
        return;
      }
    } catch {}

    // 2. Check user preference stored in localStorage
    const saved = localStorage.getItem("noxwire_user_selected_lang") as Locale | null;
    if (saved && (saved === "en" || saved === "es" || saved === "de" || saved === "fr")) {
      applyLocale(saved);
      return;
    }

    // 3. Check NEXT_LOCALE cookie set by edge middleware from Geo-IP
    try {
      const match = document.cookie.match(/(^|;\s*)NEXT_LOCALE=([^;]+)/);
      if (match && match[2] && (match[2] === "en" || match[2] === "es" || match[2] === "de" || match[2] === "fr")) {
        applyLocale(match[2] as Locale);
        return;
      }
    } catch {}

    // 4. Query live Geo-IP route for automatic Country IP detection
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country) {
          setCountryCode(data.country);
        }
        if (data?.locale && (data.locale === "en" || data.locale === "es" || data.locale === "de" || data.locale === "fr")) {
          // Only auto-apply if user hasn't explicitly set another language in this session
          if (!localStorage.getItem("noxwire_user_selected_lang")) {
            applyLocale(data.locale as Locale);
          }
        }
      })
      .catch(() => {
        // Fallback to browser navigator languages
        try {
          const browserLang = (navigator.language || "").slice(0, 2);
          if (browserLang === "es" || browserLang === "de" || browserLang === "fr") {
            applyLocale(browserLang as Locale);
          }
        } catch {}
      });
  }, []);

  const setLocale = (newLocale: Locale, isUserExplicit: boolean = true) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang = newLocale;
      if (isUserExplicit) {
        localStorage.setItem("noxwire_user_selected_lang", newLocale);
      }
      localStorage.setItem("noxwire_locale", newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Update URL query param cleanly without reloading page
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLocale);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: TRANSLATIONS[locale] || TRANSLATIONS.en,
        countryCode,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
