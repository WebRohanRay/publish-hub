"use client";

import React, { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

export const TableOfContents: React.FC<{ content?: string }> = ({ content }) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!content) return;
    const lines = content.split("\n");
    const extracted: TocItem[] = [];

    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        extracted.push({ id, text });
      }
    });

    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <aside className="my-8 rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-text flex items-center gap-2 mb-3">
        <span className="h-2 w-2 rounded-full bg-orange" />
        Table of Contents & Key Sections
      </div>
      <nav className="space-y-2">
        {headings.map((h, i) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                setActiveId(h.id);
              }
            }}
            className={`block text-xs sm:text-sm transition hover:text-orange ${
              activeId === h.id
                ? "text-orange font-bold"
                : "text-muted-text hover:underline"
            }`}
          >
            <span className="opacity-60 mr-2">{i + 1}.</span>
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
};
