"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AtlasLogo } from "@/components/brand/AtlasLogo";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();

  const navGroups = [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", href: "/admin", icon: "📊" },
        { label: "Analytics", href: "/admin/analytics", icon: "📈" },
      ],
    },
    {
      label: "Publishing",
      items: [
        { label: "Posts", href: "/admin/posts", icon: "📝", count: 128 },
        { label: "Categories", href: "/admin/categories", icon: "🏷️" },
        { label: "Media library", href: "/admin/media", icon: "🖼️" },
      ],
    },
    {
      label: "Audience",
      items: [
        { label: "Comments", href: "/admin/comments", icon: "💬", count: 12 },
        { label: "Subscribers", href: "/admin/subscribers", icon: "📬" },
      ],
    },
    {
      label: "System",
      items: [
        { label: "Settings", href: "/admin/settings", icon: "⚙️" },
        { label: "Activity log", href: "/admin/activity", icon: "📋" },
        { label: "Trash recovery", href: "/admin/trash", icon: "🗑️" },
      ],
    },
  ];

  return (
    <aside className="w-[255px] shrink-0 bg-navy text-slate-300 flex flex-col h-screen sticky top-0 border-r border-navy-soft select-none z-50">
      {/* Brand Header */}
      <div className="p-6 pb-4 border-b border-navy-soft/80 flex items-center justify-between">
        <AtlasLogo isDark={true} href="/admin" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Workspace Switcher */}
      <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-navy-soft/60 border border-navy-soft flex items-center justify-between cursor-pointer hover:bg-navy-soft transition">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange font-bold text-xs text-ink">
            A
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Atlas Journal</div>
            <div className="text-[10px] text-slate-400">Personal publication</div>
          </div>
        </div>
        <span className="text-xs text-slate-400">▾</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`relative flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                      isActive
                        ? "bg-navy-soft text-white font-semibold"
                        : "text-slate-300 hover:bg-navy-soft/40 hover:text-white"
                    }`}
                  >
                    {/* 3px Orange Inset Bar for Active State per 4.1 */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-orange" />
                    )}

                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    {item.count !== undefined && (
                      <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold text-orange border border-navy-soft">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Row */}
      <div className="p-4 border-t border-navy-soft/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-orange/40 bg-muted">
            <Image
              src="/avatars/avatar_maya_patel.jpg"
              alt="Maya Patel"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Maya Patel</div>
            <div className="text-[10px] text-slate-400">Administrator</div>
          </div>
        </div>

        <Link
          href="/"
          className="text-xs text-orange hover:text-orange/80 transition"
          title="View Live Site"
        >
          ↗
        </Link>
      </div>
    </aside>
  );
};
