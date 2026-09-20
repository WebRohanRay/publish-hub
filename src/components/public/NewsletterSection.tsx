"use client";

import React, { useState } from "react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    // Simulate instantaneous idempotent subscription feedback
    setTimeout(() => {
      setStatus("success");
      setMessage("Welcome to the Sunday edition. You're confirmed.");
      setEmail("");
    }, 600);
  };

  return (
    <section id="newsletter" className="my-16 rounded-3xl bg-navy text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-orange">
          The Sunday Edition
        </span>

        <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
          A little clarity, <span className="italic text-orange font-serif">every Sunday.</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          A short, thoughtful dispatch on high-intent tools, exclusive bonus drops, and verified app breakdowns.
          No spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
            className="flex-1 rounded-xl bg-navy-soft px-4 py-3 text-sm text-white placeholder-slate-400 border border-slate-700 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange transition"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-xl bg-orange px-6 py-3 text-sm font-bold text-ink hover:bg-orange/90 transition shadow-button active:scale-[0.98] shrink-0"
          >
            {status === "loading" ? "Joining..." : "Join 12,400 readers"}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs text-emerald-300">
            <span>✓</span> {message}
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-2 text-xs text-red-300">
            <span>✕</span> {message}
          </div>
        )}

        <p className="mt-4 text-[11px] text-slate-400">
          By subscribing, you agree to our privacy terms. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
