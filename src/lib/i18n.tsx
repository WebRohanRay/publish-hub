"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, TRANSLATIONS, Translations } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: TRANSLATIONS.en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // 1. Check user preference stored in localStorage
    const saved = localStorage.getItem("atlas_locale") as Locale | null;
    if (saved && (saved === "en" || saved === "es" || saved === "de" || saved === "fr")) {
      setLocaleState(saved);
      return;
    }

    // 2. Primary language is always English by default, but detect browser if available
    try {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "es" || browserLang === "de" || browserLang === "fr") {
        // Auto-detect based on client browser/IP
        setLocaleState(browserLang as Locale);
      }
    } catch {}
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("atlas_locale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: TRANSLATIONS[locale] || TRANSLATIONS.en,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
