# Atlas Journal (Publish Hub)

> A modern, search-optimized publishing engine and editorial platform engineered with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, and Supabase Cloud PostgreSQL.

---

## Highlights

- **Next.js 16 App Router**: 70+ statically pre-rendered routes (SSG) with incremental revalidation and edge proxy support.
- **Supabase Relational Core**: Full PostgreSQL 15 schema for posts, categories, authors, tags, comments, and media assets.
- **Autonomous Admin Dashboard**: Live administrative command center for moderation, taxonomy, analytics, and content authoring.
- **Search & Answer Engine Optimization**: Built-in Schema.org JSON-LD structured data (`Article`, `BreadcrumbList`, `FAQPage`), dynamic XML sitemap, and robots.txt.
- **High-Aesthetic Editorial UI**: Obsidian and slate color architecture, warm typography, responsive cards, and reading time estimates.
- **Dual-Data Architecture**: Connects to Supabase Cloud with transparent, zero-downtime fallback to local in-memory stores for resilient offline builds.

---

## Quickstart

### Prerequisites
- Node.js 18.x or 20.x
- npm or pnpm

### 1. Installation
```bash
git clone https://github.com/WebRohanRay/publish-hub.git
cd publish-hub
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```
Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Initialize Database
Execute `supabase/schema.sql` in your Supabase SQL Editor, then populate seed data:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view Atlas Journal.

---

## Build & Production Verification

Verify the production build:
```bash
npm run build
```

---

## Documentation Index

- [System Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [REST API Reference](docs/API.md)
- [Database Schema & Migrations](docs/DATABASE.md)
- [Supabase Setup Guide](docs/SUPABASE_SETUP.md)
- [SEO & AEO Directives](docs/SEO_GUIDELINES.md)
- [Security & Zero-Leak Policy](docs/SECURITY.md)
- [Editorial Quality Rubric](docs/EDITORIAL_QUALITY.md)
- [Changelog](CHANGELOG.md)

---

## License
MIT © 2026 Atlas Journal / Publish Hub
