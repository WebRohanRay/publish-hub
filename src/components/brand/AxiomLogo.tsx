import React from "react";
import Link from "next/link";

interface AxiomLogoProps {
  className?: string;
  isDark?: boolean;
  href?: string;
}

export const AxiomLogo: React.FC<AxiomLogoProps> = ({
  className = "",
  isDark = false,
  href = "/",
}) => {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 outline-none transition-transform hover:opacity-95 ${className}`}
      aria-label="Axiom Editorial Home"
    >
      {/* Modern Geometric Axiom Monogram */}
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute h-6 w-6 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 22 22 22" />
          </svg>
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-white shadow-xs" />
      </span>

      {/* Typography Wordmark */}
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-serif text-2xl font-bold tracking-tight transition-colors ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          axiom<span className="text-indigo-600">.</span>
        </span>
        <span className={`text-[10px] uppercase font-bold tracking-widest font-sans ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}>
          editorial
        </span>
      </div>
    </Link>
  );
};
