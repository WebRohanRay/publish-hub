"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AdminTopbarProps {
  breadcrumb?: string;
  onOpenMobileSidebar?: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  breadcrumb = "Dashboard",
  onOpenMobileSidebar,
}) => {
  const router = useRouter();
  const [adminUser, setAdminUser] = React.useState<{ name: string; avatar: string; role: string } | null>(null);

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setAdminUser({
            name: data.user.name || "Administrator",
            avatar: data.user.avatar || "/avatars/avatar_maya_patel.jpg",
            role: data.user.role || "Super Admin",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-16 sticky top-0 z-30 flex items-center justify-between border-b border-border/80 bg-paper/85 px-6 backdrop-blur-md">
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
          <span>NoxWire Editorial</span>
          <span>›</span>
          <span className="text-ink font-bold">{breadcrumb}</span>
        </div>
      </div>

      {/* Right: Saved state, View site button, Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Saved Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-text">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Synced with Database</span>
        </div>

        {/* View Site Button */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-ink shadow-xs transition hover:border-orange hover:text-orange"
        >
          <span>👁️</span>
          <span>View live site</span>
          <span className="text-[10px]">↗</span>
        </Link>

        {/* Logout Quick Button */}
        <button
          onClick={handleLogout}
          className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:border-red-300 transition shadow-xs cursor-pointer"
          title="Sign out of admin session"
        >
          Logout
        </button>

        {/* Admin Avatar */}
        <Link
          href="/admin/settings"
          className="relative h-8 w-8 rounded-full overflow-hidden border border-border bg-orange-soft flex items-center justify-center font-bold text-xs text-ink shadow-xs hover:border-orange transition"
          title={`Admin Profile: ${adminUser?.name || "Administrator"}`}
        >
          <Image
            src={adminUser?.avatar || "/avatars/avatar_maya_patel.jpg"}
            alt={adminUser?.name || "Admin Avatar"}
            fill
            className="object-cover"
          />
        </Link>
      </div>
    </header>
  );
};
