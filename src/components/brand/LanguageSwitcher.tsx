"use client";

import React, { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Locale } from "@/lib/translations";

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export const LanguageSwitcher: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition border ${
          isDark
            ? "border-navy-soft bg-navy-soft/60 text-slate-200 hover:border-slate-500"
            : "border-border bg-card text-ink hover:border-orange shadow-xs"
        }`}
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{currentLang.flag}</span>
        <span className="uppercase text-[11px] font-bold">{currentLang.code}</span>
        <span className="text-[9px] opacity-60">▾</span>
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-1.5 w-36 rounded-xl border py-1.5 shadow-lg z-50 animate-in fade-in-50 zoom-in-95 ${
            isDark
              ? "bg-navy border-navy-soft text-white shadow-black/40"
              : "bg-card border-border text-ink shadow-soft"
          }`}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-1.5 text-xs text-left transition ${
                locale === lang.code
                  ? "bg-orange/15 font-bold text-orange"
                  : isDark
                  ? "hover:bg-navy-soft text-slate-300 hover:text-white"
                  : "hover:bg-paper text-muted-text hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {locale === lang.code && <span className="text-[10px]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
