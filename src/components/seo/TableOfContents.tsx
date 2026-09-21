"use client";

import React, { useState, useEffect } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-ink text-white font-bold text-[10px]">
          ≡
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-ink">
          In This Review (Jump Links)
        </span>
      </div>

      <ul className="space-y-1.5 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left w-full rounded-lg px-2.5 py-1.5 transition flex items-center gap-2 ${
                  isActive
                    ? "bg-paper text-orange font-bold border-l-2 border-orange"
                    : "text-muted-text hover:text-ink hover:bg-paper/50"
                }`}
              >
                <span className="text-[10px] text-muted-text">↳</span>
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
