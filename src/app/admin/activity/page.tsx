"use client";

import React, { useState } from "react";
import { dataStore, ActivityLog } from "@/lib/dataStore";

export default function AdminActivityPage() {
  const [activities] = useState<ActivityLog[]>(dataStore.getActivityLogs());

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-border/80 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
          System & Audit
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
          Activity Audit Trail
        </h1>
        <p className="text-xs text-muted-text mt-1">
          Complete, chronological record of all administrative publishing, editing, and comment triage events.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft divide-y divide-border/60">
        {activities.map((act) => (
          <div key={act.id} className="p-4 flex items-center justify-between hover:bg-paper/40 transition">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-soft text-orange font-bold text-xs">
                ✦
              </div>
              <div>
                <div className="text-xs font-semibold text-ink">{act.summary}</div>
                <div className="text-[10px] text-muted-text mt-0.5">
                  Actor: <strong className="text-ink">{act.actor}</strong> • Action: <span className="uppercase text-orange">{act.action}</span>
                </div>
              </div>
            </div>
            <span className="text-xs text-muted-text font-mono shrink-0">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
