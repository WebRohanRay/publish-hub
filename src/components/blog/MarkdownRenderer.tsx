"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content) return null;

  // Split into raw lines
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseInline = (text: string): React.ReactNode => {
    // 1. Process markdown images: ![alt](url)
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    // 2. Process markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

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
            className="text-orange hover:text-ink font-semibold underline underline-offset-4 decoration-orange/50 hover:decoration-ink transition-colors"
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
            className="text-orange hover:text-ink font-semibold underline underline-offset-4 decoration-orange/50 hover:decoration-ink transition-colors inline-flex items-baseline gap-0.5"
          >
            <span>{linkText}</span>
            <span className="text-[10px] opacity-70">↗</span>
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
    // 1. Handle bold: **text**
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        const inner = bPart.slice(2, -2);
        return (
          <strong key={`${baseKey}-b-${bIdx}`} className="font-bold text-ink">
            {renderItalics(inner, `${baseKey}-bi-${bIdx}`)}
          </strong>
        );
      }
      return renderItalics(bPart, `${baseKey}-i-${bIdx}`);
    });
  };

  const renderItalics = (text: string, baseKey: string): React.ReactNode => {
    // 2. Handle italics: *text* or _text_
    const italicParts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
    return italicParts.map((iPart, iIdx) => {
      if (
        (iPart.startsWith("*") && iPart.endsWith("*") && iPart.length > 2) ||
        (iPart.startsWith("_") && iPart.endsWith("_") && iPart.length > 2)
      ) {
        const inner = iPart.slice(1, -1);
        return (
          <em key={`${baseKey}-em-${iIdx}`} className="italic font-serif text-ink">
            {renderCode(inner, `${baseKey}-emi-${iIdx}`)}
          </em>
        );
      }
      return renderCode(iPart, `${baseKey}-c-${iIdx}`);
    });
  };

  const renderCode = (text: string, baseKey: string): React.ReactNode => {
    // 3. Handle inline code: `code`
    const codeParts = text.split(/(`[^`]+`)/g);
    return codeParts.map((cPart, cIdx) => {
      if (cPart.startsWith("`") && cPart.endsWith("`") && cPart.length > 2) {
        return (
          <code
            key={`${baseKey}-code-${cIdx}`}
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-ink border border-border/80"
          >
            {cPart.slice(1, -1)}
          </code>
        );
      }
      return cPart;
    });
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Horizontal Rule: --- or ***
    if (line === "---" || line === "***" || line === "___") {
      elements.push(
        <hr key={`hr-${i}`} className="my-10 border-t border-border/80" />
      );
      i++;
      continue;
    }

    // Heading 4
    if (line.startsWith("#### ")) {
      const title = line.replace("#### ", "");
      elements.push(
        <h4
          key={`h4-${i}`}
          className="font-serif text-lg sm:text-xl font-bold text-ink mt-6 mb-3 tracking-tight"
        >
          {parseInline(title)}
        </h4>
      );
      i++;
      continue;
    }

    // Heading 3 (e.g. Questions, subsections)
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

    // Heading 2 (Major section dividers)
    if (line.startsWith("## ")) {
      const title = line.replace("## ", "");
      elements.push(
        <h2
          key={`h2-${i}`}
          className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-12 mb-6 pb-2.5 border-b border-border/80 tracking-tight"
        >
          {parseInline(title)}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 1
    if (line.startsWith("# ")) {
      const title = line.replace("# ", "");
      elements.push(
        <h1
          key={`h1-${i}`}
          className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-12 mb-6 tracking-tight"
        >
          {parseInline(title)}
        </h1>
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
          className="my-8 border-l-4 border-orange pl-6 py-4 italic font-serif text-xl sm:text-2xl text-ink bg-card rounded-r-2xl shadow-xs"
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
          <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full text-left text-sm text-ink border-collapse">
              <thead className="bg-paper border-b border-border text-xs uppercase tracking-wider text-muted-text font-bold">
                <tr>
                  {headerRow.map((head, hIdx) => (
                    <th key={`th-${hIdx}`} className="p-4">
                      {parseInline(head)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {bodyRows.map((row, rIdx) => (
                  <tr key={`tr-${rIdx}`} className="hover:bg-paper/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={`td-${cIdx}`} className="p-4 align-top leading-relaxed">
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
        <ul key={`ul-${i}`} className="my-6 space-y-3 list-none pl-1">
          {listItems.map((item, lIdx) => (
            <li key={`li-${lIdx}`} className="flex items-start gap-3 text-base sm:text-lg text-ink">
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
        <ol key={`ol-${i}`} className="my-6 space-y-3.5 list-none pl-1">
          {listItems.map((item, lIdx) => (
            <li key={`oli-${lIdx}`} className="flex items-start gap-3.5 text-base sm:text-lg text-ink">
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
      <p key={`p-${i}`} className="my-5 text-base sm:text-lg leading-relaxed text-ink/90">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
};
