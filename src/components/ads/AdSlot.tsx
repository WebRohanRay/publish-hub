import React from "react";

interface AdSlotProps {
  format: "leaderboard" | "rectangle" | "in-article";
  label?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  format,
  label = "Advertisement",
  className = "",
}) => {
  const formats = {
    leaderboard: "h-[90px] w-full max-w-[728px] mx-auto",
    rectangle: "h-[250px] w-full max-w-[300px] mx-auto",
    "in-article": "h-[120px] w-full max-w-2xl mx-auto",
  };

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      {/* Label */}
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-text/80 mb-1.5">
        {label}
      </span>

      {/* CLS-safe container with fixed aspect ratio/dimensions */}
      <div
        className={`relative flex items-center justify-between rounded-xl border border-dashed border-border bg-card/60 p-4 shadow-xs overflow-hidden ${formats[format]}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-soft text-orange font-bold text-sm">
            ★
          </div>
          <div>
            <div className="text-xs font-bold text-ink">
              Exclusive Matchmaking & Casino Welcome Passes
            </div>
            <div className="text-[11px] text-muted-text">
              Claim up to €5,000 Deposit Match or 7-Day Free VIP Dating Pass
            </div>
          </div>
        </div>

        <a
          href="#claim-verified-partner"
          className="shrink-0 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition"
        >
          Explore Deal →
        </a>
      </div>
    </div>
  );
};
