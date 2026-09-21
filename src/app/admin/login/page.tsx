"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiomLogo } from "@/components/brand/AxiomLogo";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@axiom.org");
  const [password, setPassword] = useState("axiom2026!");
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 selection:bg-indigo-600 selection:text-white">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <AxiomLogo isDark={true} href="/" />
          </div>
          <div className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider pt-1">
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
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/40 p-3 text-[11px] text-indigo-300 flex items-center justify-between">
          <span>Default: <code className="text-white font-mono">admin@axiom.org</code></span>
          <span>Pass: <code className="text-white font-mono">axiom2026!</code></span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-950 px-4 py-3 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none transition shadow-inner"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-indigo-400 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-slate-950 px-4 py-3 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none transition shadow-inner font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold text-white shadow-button transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Authenticating Session..." : "Sign in to Editorial Desk →"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition">
            ← Return to public publication
          </Link>
        </div>
      </div>
    </div>
  );
}
