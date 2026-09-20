import React from "react";

export interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  comparison: string;
  icon: string;
  theme: "navy" | "peach" | "mint" | "lavender";
  bars: number[];
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  comparison,
  icon,
  theme,
  bars,
}) => {
  const themeStyles = {
    navy: "bg-navy text-white border-navy-soft",
    peach: "bg-[#F7E2CF] text-ink border-orange/20",
    mint: "bg-[#E1EEE3] text-ink border-emerald-300/40",
    lavender: "bg-[#E8E3F1] text-ink border-purple-300/40",
  };

  const isDark = theme === "navy";

  return (
    <div
      className={`rounded-2xl border p-5 flex flex-col justify-between shadow-soft transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${themeStyles[theme]}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span
          className={`text-[11px] font-bold uppercase tracking-wider ${
            isDark ? "text-slate-400" : "text-muted-text"
          }`}
        >
          {label}
        </span>
        <span className="text-base">{icon}</span>
      </div>

      {/* Large Value */}
      <div className="my-3 font-serif text-3xl sm:text-4xl font-normal tracking-tight">
        {value}
      </div>

      {/* Footer with Pill, comparison, and mini bar chart */}
      <div className="flex items-end justify-between pt-2">
        <div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
              isDark
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-ink/10 text-ink"
            }`}
          >
            ↑ {change}
          </span>
          <div
            className={`text-[10px] mt-1 ${
              isDark ? "text-slate-400" : "text-muted-text"
            }`}
          >
            {comparison}
          </div>
        </div>

        {/* Miniature SVG Bar Chart */}
        <div className="flex items-end gap-1 h-7">
          {bars.map((height, i) => (
            <div
              key={i}
              style={{ height: `${height}%` }}
              className={`w-1.5 rounded-xs transition-all ${
                isDark ? "bg-orange" : "bg-ink/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
