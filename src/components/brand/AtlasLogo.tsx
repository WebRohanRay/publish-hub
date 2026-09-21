import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  href?: string;
}

export const NoxWireLogo: React.FC<LogoProps> = ({
  className = "",
  isDark = false,
  href = "/",
}) => {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 outline-none transition-transform hover:opacity-95 ${className}`}
      aria-label="NoxWire Home"
    >
      {/* Sleek Rotated Geometric Mark */}
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute h-5 w-5 rotate-12 rounded-[6px] border border-orange/40 bg-orange transition-transform duration-300 group-hover:rotate-45" />
        <span className="absolute h-2 w-2 rounded-full bg-navy transition-transform duration-300 group-hover:scale-125" />
      </span>

      {/* Serif wordmark */}
      <span
        className={`font-serif text-2xl tracking-tight transition-colors ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        noxwire<span className="text-orange">.</span>
      </span>
    </Link>
  );
};

// Aliased export for complete backward compatibility
export const AtlasLogo = NoxWireLogo;
