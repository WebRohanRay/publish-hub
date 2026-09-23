"use client";

import React, { useState } from "react";
import { Share2, X, Copy, Check, Twitter, Send } from "lucide-react";

interface ShareModalProps {
  title: string;
  url: string;
  excerpt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ title, url, excerpt = "", isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} — Read on NoxWire`);

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "hover:bg-zinc-800 hover:text-white border-zinc-700",
    },
    {
      name: "Reddit",
      icon: "r/",
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:bg-orange-950/40 hover:text-orange-400 border-orange-500/30",
    },
    {
      name: "Telegram",
      icon: "✈️",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: "hover:bg-sky-950/40 hover:text-sky-400 border-sky-500/30",
    },
    {
      name: "WhatsApp",
      icon: "💬",
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      color: "hover:bg-emerald-950/40 hover:text-emerald-400 border-emerald-500/30",
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-950/40 hover:text-blue-400 border-blue-500/30",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 id="share-modal-title" className="text-lg font-bold text-white tracking-tight">
              Share Article
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {title}
        </p>

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border bg-zinc-950/60 text-zinc-300 text-xs font-medium transition ${item.color}`}
            >
              <span className="text-base font-bold">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>

        {/* Copy Link Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Direct Link
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-zinc-950 border border-zinc-800 rounded-xl">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent px-2.5 text-xs text-zinc-300 outline-none select-all truncate"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                copied
                  ? "bg-emerald-500 text-black"
                  : "bg-amber-400 hover:bg-amber-300 text-black"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
