import React from "react";

export const InsightCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy-soft bg-navy p-6 text-white shadow-soft flex flex-col justify-between">
      {/* Glowing Orbital Motif */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-orange/20" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-orange/10" />
      <div className="pointer-events-none absolute right-4 top-4 h-32 w-32 rounded-full bg-orange/15 blur-2xl" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
          Editorial Insight
        </span>
        <span className="text-xs text-slate-400">✦ AI Pulse</span>
      </div>

      {/* Content */}
      <div className="relative z-10 my-6">
        <h4 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-white">
          Your audience is leaning into high-intent reviews.
        </h4>
        <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Comparisons in Dating Apps and regulated iGaming are generating 2.4× higher engagement and bookmark rates than general editorial stories.
        </p>
      </div>

      {/* Footer Pill */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-navy-soft/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange" />
          <span className="font-semibold text-white">Dating & Matchmaking</span>
        </div>
        <span className="text-[11px] text-slate-400">42% of reader volume</span>
      </div>
    </div>
  );
};
