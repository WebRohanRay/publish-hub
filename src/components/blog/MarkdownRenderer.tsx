"use client";

import React, { useState } from "react";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content) return null;

  // Split into raw blocks (paragraphs, headers, tables, lists, quotes)
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseInline = (text: string): React.ReactNode => {
    // Process markdown links [text](url), bold **bold**, italic *italic*, code `code`
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Regex for links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lastIndex = 0;

    while ((match = linkRegex.exec(remaining)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        const textBefore = remaining.substring(lastIndex, matchIndex);
        parts.push(renderFormatting(textBefore, `part-${keyIdx++}`));
      }

      const linkText = match[1];
      const linkUrl = match[2];
      const isInternal = linkUrl.startsWith("/") || linkUrl.startsWith("#");

      if (isInternal) {
        parts.push(
          <Link
            key={`link-${keyIdx++}`}
            href={linkUrl}
            className="text-orange hover:text-ink font-medium underline underline-offset-4 decoration-orange/40 hover:decoration-ink transition-colors"
          >
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={`link-${keyIdx++}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-ink font-medium underline underline-offset-4 decoration-orange/40 hover:decoration-ink transition-colors inline-flex items-baseline gap-0.5"
          >
            <span>{linkText}</span>
            <span className="text-[10px] opacity-60">↗</span>
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < remaining.length) {
      parts.push(renderFormatting(remaining.substring(lastIndex), `part-${keyIdx++}`));
    }

    return parts.length === 1 ? parts[0] : <React.Fragment>{parts}</React.Fragment>;
  };

  const renderFormatting = (text: string, baseKey: string): React.ReactNode => {
    // Handle bold **text**
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        const inner = bPart.slice(2, -2);
        return (
          <strong key={`${baseKey}-b-${bIdx}`} className="font-semibold text-ink">
            {inner}
          </strong>
        );
      }
      // Handle inline code `code`
      const codeParts = bPart.split(/(`[^`]+`)/g);
      return codeParts.map((cPart, cIdx) => {
        if (cPart.startsWith("`") && cPart.endsWith("`")) {
          return (
            <code
              key={`${baseKey}-c-${cIdx}`}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-ink border border-border"
            >
              {cPart.slice(1, -1)}
            </code>
          );
        }
        return cPart;
      });
    });
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Markdown Headings
    if (line.startsWith("### ")) {
      const title = line.replace("### ", "");
      elements.push(
        <h3
          key={`h3-${i}`}
          className="font-serif text-xl sm:text-2xl font-bold text-ink mt-8 mb-4 tracking-tight"
        >
          {parseInline(title)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const title = line.replace("## ", "");
      elements.push(
        <h2
          key={`h2-${i}`}
          className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-10 mb-5 pb-2 border-b border-border/70 tracking-tight"
        >
          {parseInline(title)}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteText = line.replace(/^>\s*/, "");
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 border-l-4 border-orange pl-5 py-2 italic font-serif text-lg text-ink bg-card rounded-r-xl shadow-xs"
        >
          {parseInline(quoteText)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Markdown Table
    if (line.startsWith("|") && line.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((r) =>
          r
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
            <table className="w-full text-left text-sm text-ink border-collapse">
              <thead className="bg-paper border-b border-border text-xs uppercase tracking-wider text-muted-text font-semibold">
                <tr>
                  {headerRow.map((head, hIdx) => (
                    <th key={`th-${hIdx}`} className="p-3.5 sm:p-4">
                      {parseInline(head)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {bodyRows.map((row, rIdx) => (
                  <tr key={`tr-${rIdx}`} className="hover:bg-paper/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={`td-${cIdx}`} className="p-3.5 sm:p-4 align-top">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Unordered List
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }

      elements.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2.5 list-none pl-1">
          {listItems.map((item, lIdx) => (
            <li key={`li-${lIdx}`} className="flex items-start gap-2.5 text-base sm:text-lg text-ink">
              <span className="text-orange mt-1.5 text-sm shrink-0">▪</span>
              <div className="flex-1 leading-relaxed">{parseInline(item)}</div>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered List
    if (/^\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }

      elements.push(
        <ol key={`ol-${i}`} className="my-5 space-y-3 list-none pl-1">
          {listItems.map((item, lIdx) => (
            <li key={`oli-${lIdx}`} className="flex items-start gap-3 text-base sm:text-lg text-ink">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper border border-border text-xs font-bold text-ink mt-0.5">
                {lIdx + 1}
              </span>
              <div className="flex-1 leading-relaxed">{parseInline(item)}</div>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular Paragraph
    elements.push(
      <p key={`p-${i}`} className="my-4 text-base sm:text-lg leading-relaxed text-ink/90">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
};
