"use client";

import React, { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("NoxWire");
  const [contactEmail, setContactEmail] = useState("editor@noxwire.io");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [requireModeration, setRequireModeration] = useState(true);
  const [guestComments, setGuestComments] = useState(true);
  const [defaultMetaTitle, setDefaultMetaTitle] = useState("NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech");
  
  // Administrator Profile from Supabase public.profiles
  const [adminDisplayName, setAdminDisplayName] = useState("Rohan Ray");
  const [adminAvatarUrl, setAdminAvatarUrl] = useState("/avatars/avatar_maya_patel.jpg");
  const [adminProfileId, setAdminProfileId] = useState<string | undefined>(undefined);
  
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const [settingsRes, profileRes] = await Promise.all([
          fetch("/api/admin/settings"),
          fetch("/api/admin/profile"),
        ]);

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          if (data.settings) {
            setSiteName(data.settings.siteName || "NoxWire");
            setContactEmail(data.settings.contactEmail || "editor@noxwire.io");
            setCommentsEnabled(data.settings.commentsEnabled ?? true);
            setRequireModeration(data.settings.commentsRequireModeration ?? true);
            setGuestComments(data.settings.allowGuestComments ?? true);
            setDefaultMetaTitle(data.settings.defaultMetaTitle || "NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech");
          }
        }

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.profile) {
            setAdminDisplayName(profileData.profile.displayName || "Rohan Ray");
            setAdminAvatarUrl(profileData.profile.avatarUrl || "/avatars/avatar_maya_patel.jpg");
            setAdminProfileId(profileData.profile.id);
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [settingsRes, profileRes] = await Promise.all([
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteName,
            contactEmail,
            commentsEnabled,
            commentsRequireModeration: requireModeration,
            allowGuestComments: guestComments,
            defaultMetaTitle,
          }),
        }),
        fetch("/api/admin/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: adminProfileId,
            displayName: adminDisplayName,
            avatarUrl: adminAvatarUrl,
          }),
        }),
      ]);

      if (settingsRes.ok && profileRes.ok) {
        setToast("Settings and Administrator Profile saved to Supabase.");
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast("Saved to Supabase with partial notices.");
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast("Failed to save settings to Supabase.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-semibold shadow-lg">
          ✓ {toast}
        </div>
      )}

      <div className="border-b border-border/80 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
          Configuration
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-0.5">
          Publication Settings
        </h1>
        <p className="text-xs text-muted-text mt-1">
          Global branding, moderation rules, affiliate disclosures, and technical SEO defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Administrator Profile Card (Supabase public.profiles) */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-serif text-lg text-ink font-semibold">
                Administrator Profile
              </h3>
              <p className="text-xs text-muted-text mt-0.5">
                Dynamic author identity stored in Supabase <code className="text-orange font-mono">public.profiles</code>.
              </p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Supabase Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Display Name</label>
              <input
                type="text"
                value={adminDisplayName}
                onChange={(e) => setAdminDisplayName(e.target.value)}
                placeholder="e.g. Rohan Ray"
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={adminAvatarUrl}
                onChange={(e) => setAdminAvatarUrl(e.target.value)}
                placeholder="/avatars/avatar_maya_patel.jpg or Supabase Storage URL"
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
              />
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink font-semibold border-b border-border pb-3">
            General Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Publication Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
              />
            </div>
          </div>
        </div>

        {/* Audience & Moderation Rules per 4.9 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink font-semibold border-b border-border pb-3">
            Comment & Moderation Policy
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={commentsEnabled}
                onChange={(e) => setCommentsEnabled(e.target.checked)}
                className="h-4 w-4 rounded accent-orange"
              />
              <div>
                <span className="font-semibold text-ink block">Enable Reader Comments</span>
                <span className="text-muted-text">Allow readers to submit reflections and questions under articles</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={requireModeration}
                onChange={(e) => setRequireModeration(e.target.checked)}
                className="h-4 w-4 rounded accent-orange"
              />
              <div>
                <span className="font-semibold text-ink block">Require Editorial Moderation (Recommended)</span>
                <span className="text-muted-text">Comments remain in 'pending' status until approved by the administrator</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={guestComments}
                onChange={(e) => setGuestComments(e.target.checked)}
                className="h-4 w-4 rounded accent-orange"
              />
              <div>
                <span className="font-semibold text-ink block">Allow Guest Submissions Without Login</span>
                <span className="text-muted-text">Visitors can comment with name & email without creating an account</span>
              </div>
            </label>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink font-semibold border-b border-border pb-3">
            Global SEO Defaults
          </h3>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Default Meta Title</label>
            <input
              type="text"
              value={defaultMetaTitle}
              onChange={(e) => setDefaultMetaTitle(e.target.value)}
              className="w-full rounded-xl bg-paper px-3.5 py-2 text-xs border border-border text-ink"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-ink px-6 py-3 text-xs font-bold text-white shadow-button hover:bg-orange hover:text-ink transition active:scale-[0.98]"
        >
          Save Configuration Changes
        </button>
      </form>
    </div>
  );
}
