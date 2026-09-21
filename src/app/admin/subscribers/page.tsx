"use client";

import React, { useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  date: string;
}

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: "sub-1", email: "elena.r@studio.design", status: "active", source: "Sunday Edition", date: "Sep 20, 2026" },
  { id: "sub-2", email: "marcus.c@systems.io", status: "active", source: "Article Footer", date: "Sep 19, 2026" },
  { id: "sub-3", email: "liam.s@venture.co", status: "active", source: "Sunday Edition", date: "Sep 18, 2026" },
  { id: "sub-4", email: "oliver.g@sportsbeat.uk", status: "active", source: "Dating Review", date: "Sep 17, 2026" },
  { id: "sub-5", email: "sophia.m@tech.com", status: "active", source: "Casino Review", date: "Sep 16, 2026" },
];

export default function AdminSubscribersPage() {
  const [subscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Audience & Retention
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
            Sunday Edition Subscribers
          </h1>
          <p className="text-xs text-muted-text mt-1">
            Total active newsletter subscribers: <strong>12,410</strong> readers.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter subscribers..."
          className="rounded-xl bg-card px-3.5 py-2 text-xs border border-border text-ink"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-paper/60 text-muted-text uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Subscriber Email</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Acquisition Source</th>
              <th className="py-3 px-4 text-right">Subscribed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-paper/40 transition">
                <td className="py-3 px-4 font-mono font-medium text-ink">{sub.email}</td>
                <td className="py-3 px-3">
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold uppercase">
                    {sub.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-muted-text">{sub.source}</td>
                <td className="py-3 px-4 text-right text-muted-text">{sub.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
