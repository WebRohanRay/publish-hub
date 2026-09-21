"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AtlasLogo } from "@/components/brand/AtlasLogo";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  };

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
        { label: "Posts", href: "/admin/posts", icon: "📝" },
        { label: "Categories", href: "/admin/categories", icon: "🏷️" },
        { label: "Media library", href: "/admin/media", icon: "🖼️" },
      ],
    },
    {
      label: "Audience",
      items: [
        { label: "Comments", href: "/admin/comments", icon: "💬" },
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
      <div className="p-6 pb-4 border-b border-navy-soft flex items-center justify-between">
        <AtlasLogo isDark={true} href="/admin" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Workspace Indicator */}
      <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-navy-soft border border-navy-soft/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange font-bold text-xs text-ink shadow-xs">
            A
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Atlas Editorial</div>
            <div className="text-[10px] text-slate-400">Editorial Desk</div>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-400" title="System Online" />
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
                        ? "bg-navy-soft text-orange font-semibold border border-orange/30"
                        : "text-slate-300 hover:bg-navy-soft/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-orange" />
                    )}

                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Profile & Logout Row */}
      <div className="p-4 border-t border-navy-soft flex items-center justify-between bg-navy">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-orange/40 bg-navy-soft">
            <Image
              src="/avatars/avatar_maya_patel.jpg"
              alt="Maya Patel"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Maya Patel</div>
            <div className="text-[10px] text-orange">Super Admin</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs text-slate-400 hover:text-red-400 transition p-1.5 rounded-lg hover:bg-navy-soft cursor-pointer"
          title="Log out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
