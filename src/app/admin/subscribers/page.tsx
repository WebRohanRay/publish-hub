"use client";

import React, { useState, useEffect } from "react";

interface Subscriber {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  date: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error("Failed to load subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string, email: string) => {
    try {
      const res = await fetch(`/api/admin/subscribers?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchSubscribers();
        setToast(`Removed ${email} from subscriber list.`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to remove subscriber.");
    }
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg">
          ✓ {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            Audience & Retention
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
            Sunday Edition Subscribers
          </h1>
          <p className="text-xs text-muted-text mt-1">
            Total active newsletter subscribers: <strong>{subscribers.length}</strong> readers.
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
              <th className="py-3 px-4">Subscribed Date</th>
              <th className="py-3 px-4 text-right">Action</th>
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
                <td className="py-3 px-4 text-muted-text">{sub.date}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(sub.id, sub.email)}
                    className="text-xs text-crimson hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
