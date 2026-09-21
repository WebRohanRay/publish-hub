"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("maya.patel@atlasjournal.io");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-navy text-white flex flex-col justify-center items-center p-6 selection:bg-orange selection:text-ink">
      <div className="w-full max-w-md bg-navy-soft/70 border border-navy-soft rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
        <div className="text-center space-y-2">
          <AtlasLogo isDark={true} href="/" className="justify-center" />
          <div className="text-xs text-orange font-bold uppercase tracking-wider pt-2">
            Single Administrator Portal
          </div>
          <p className="text-xs text-slate-400">
            Sign in to manage reviews, moderation, media, and SEO analytics.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-navy px-4 py-3 border border-slate-700 text-white focus:border-orange focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
              <span>Password</span>
              <span className="text-[11px] text-orange hover:underline cursor-pointer">
                Reset password
              </span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-navy px-4 py-3 border border-slate-700 text-white focus:border-orange focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange py-3 text-xs font-bold text-ink shadow-button hover:bg-orange/90 transition active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Sign in to Editorial Desk"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-navy-soft text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition">
            ← Return to public journal
          </Link>
        </div>
      </div>
    </div>
  );
}
