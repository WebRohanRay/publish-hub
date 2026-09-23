# Changelog — NoxWire / PublishHub

All notable changes and architectural enhancements to the NoxWire editorial platform are documented in this file.

---

## [1.1.0] — 2026-09-23

### Added
- **Idempotent Supabase Schema & Storage Policies**:
  - Implemented `DROP POLICY IF EXISTS` across all 11 tables (`profiles`, `posts`, `categories`, `tags`, `post_tags`, `comments`, `likes`, `view_events`, `newsletter_subscribers`, `site_settings`, `activity_logs`).
  - Added public read access to `profiles` and `post_tags` to allow unauthenticated readers to view author avatars and article tags.
  - Added public update policies for `likes` and `newsletter_subscribers` to support idempotent client upsert mutations.
  - Upgraded `public.is_admin()` helper function with `service_role` token recognition.
  - Automatically configured Supabase Storage buckets `blog-images` (10MB limit) and `avatars` (5MB limit) with public read access and admin/service-role upload policies.
  - Created automatic `updated_at` triggers for all temporal tables.
- **Multilingual & Automatic Geo-IP Routing**:
  - Built edge Geo-IP resolver (`/api/geo`) and middleware reading IP country headers (`x-vercel-ip-country`, `cf-ipcountry`).
  - Complete 4-language dictionaries (`en`, `es`, `de`, `fr`) translating headers, hero ribbon, comparison matrices, story cards, category filters, and every single section of all 20 blog articles.
- **Article Interactive Features**:
  - `ShareModal.tsx`: Multi-platform social dispatch (X, Reddit, Telegram, WhatsApp, LinkedIn) with 1-click clipboard copy.
  - `BackToTop.tsx`: Floating navigation button with threshold scroll spy.
  - `ReadingProgressBar.tsx`: Gradient reading scroll spy for long-form content.
  - `TableOfContents.tsx`: Dynamic heading tree generator with active section highlight.
  - `FaqSchema.tsx`: Google SERP rich results `FAQPage` JSON-LD generator.
  - `StickyFooterAd.tsx`: High-CTR sponsored banner with session dismissal and CLS protection.
- **Syndication & Search Engine Discovery**:
  - Added Atom 1.0 syndication feed (`/feed.atom`) alongside RSS 2.0 (`/rss.xml`).
  - Web App Manifest (`/manifest.webmanifest`) and service worker (`public/sw.js`) for offline reading.
  - `PwaInstallPrompt.tsx` component with deferred install flow.
  - `GOOGLE_SEARCH_CONSOLE_GUIDE.md` and `VIRAL_EDITORIAL_STANDARDS.md`.
- **TypeScript & Utilities**:
  - `database.types.ts`: Comprehensive type definitions for all tables and relationships.
  - `readingMetrics.ts`: Word count and silent reading duration calculator.
  - `exportUtils.ts`: JSON backup packaging and Markdown frontmatter export engine.
  - `fuzzySearch.ts`: Client-side fuzzy search with weighted scoring.

### Changed
- Converted all 20 blog articles into story-driven, data-backed investigative journalism with benchmark comparison tables and natural internal backlinks.
- Redesigned visual branding to dark cyberpunk editorial aesthetics (obsidian, amber-gold accents, custom artwork).
