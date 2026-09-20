"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AdminTopbarProps {
  breadcrumb?: string;
  onOpenMobileSidebar?: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  breadcrumb = "Dashboard",
  onOpenMobileSidebar,
}) => {
  return (
    <header className="h-19 sticky top-0 z-30 flex items-center justify-between border-b border-border/80 bg-paper/85 px-6 backdrop-blur-md">
      {/* Left: Mobile hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 text-ink rounded-lg hover:bg-muted"
            aria-label="Open Navigation Drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div className="text-xs font-semibold text-muted-text flex items-center gap-2">
          <span>Atlas Journal</span>
          <span>›</span>
          <span className="text-ink font-bold">{breadcrumb}</span>
        </div>
      </div>

      {/* Right: Saved state, View site button, Admin avatar */}
      <div className="flex items-center gap-4">
        {/* Saved Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-text">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Saved just now</span>
        </div>

        {/* View Site Button per 4.1 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-orange hover:text-orange"
        >
          <span>👁️</span>
          <span>View site</span>
          <span className="text-[10px]">↗</span>
        </Link>

        {/* Admin Avatar */}
        <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border bg-orange-soft flex items-center justify-center font-bold text-xs text-ink shadow-xs">
          <Image
            src="/avatars/avatar_maya_patel.jpg"
            alt="Admin Avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
};
