"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtlasLogo } from "@/components/brand/AtlasLogo";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("maya.patel@atlasjournal.io");
  const [password, setPassword] = useState("atlas2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState("/admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get("redirect");
      if (redirect && redirect.startsWith("/admin")) {
        setRedirectPath(redirect);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Please check credentials.");
        setLoading(false);
        return;
      }

      // Successful login
      router.push(redirectPath);
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white flex flex-col justify-center items-center p-6 selection:bg-orange selection:text-ink">
      {/* Background subtle glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-navy-soft/60 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-navy-soft/80 border border-navy-soft rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <AtlasLogo isDark={true} href="/" />
          </div>
          <div className="text-[11px] text-orange font-bold uppercase tracking-wider pt-1">
            Single Administrator Portal
          </div>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Authorized access only. Audit reviews, moderate readers, and manage publications.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/50 p-3.5 text-xs text-red-200 flex items-start gap-2.5">
            <span className="text-red-400 font-bold text-sm">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Default credentials tip */}
        <div className="rounded-xl border border-orange/30 bg-navy/60 p-3 text-[11px] text-orange-soft flex items-center justify-between">
          <span>Admin: <code className="text-white font-mono">maya.patel@atlasjournal.io</code></span>
          <span>Pass: <code className="text-white font-mono">atlas2026!</code></span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-navy px-4 py-3 border border-slate-700 text-white focus:border-orange focus:outline-none transition shadow-inner"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-orange hover:underline cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-navy px-4 py-3 border border-slate-700 text-white focus:border-orange focus:outline-none transition shadow-inner font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange hover:bg-orange/90 py-3 text-xs font-bold text-ink shadow-button transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Authenticating Session..." : "Sign in to Editorial Desk →"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-navy-soft text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition">
            ← Return to public publication
          </Link>
        </div>
      </div>
    </div>
  );
}
