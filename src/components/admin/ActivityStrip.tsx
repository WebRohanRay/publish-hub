import React from "react";
import Link from "next/link";
import { ActivityLog } from "@/lib/dataStore";

interface ActivityStripProps {
  activities: ActivityLog[];
}

export const ActivityStrip: React.FC<ActivityStripProps> = ({ activities }) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft my-8">
      <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Workspace
          </span>
          <h3 className="font-serif text-xl text-ink">Recent activity audit</h3>
        </div>

        <Link
          href="/admin/activity"
          className="text-xs font-semibold text-ink hover:text-orange transition-colors"
        >
          Activity log →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.slice(0, 3).map((act) => (
          <div
            key={act.id}
            className="rounded-xl border border-border/70 bg-paper/40 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-ink uppercase text-[10px] tracking-wider text-orange">
                  {act.action}
                </span>
                <span className="text-[11px] text-muted-text">{act.time}</span>
              </div>
              <p className="text-xs text-ink font-medium leading-normal mt-1">
                {act.summary}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/50 text-[10px] text-muted-text flex items-center gap-1.5">
              <span>By {act.actor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
