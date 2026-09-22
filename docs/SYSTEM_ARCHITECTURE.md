# NoxWire Publication & Engine — System Architecture

## 1. High-Level Overview

NoxWire is a production-grade editorial publication and review intelligence platform built on Next.js 16 (App Router), React 19, TypeScript, and Supabase. The platform caters to the high-eCPM intersection of **Dating & Matchmaking**, **Regulated iGaming & Casinos**, **Adult Tech & Creator Platforms**, and **Financial Privacy / Crypto Protocols**.

```mermaid
graph TD
    Client[Visitor Browser] --> Edge[Next.js Edge Proxy / Middleware]
    Edge --> GeoCheck{Geo-IP & Cookie}
    GeoCheck -->|ES / LATAM| ES[Spanish Locale (es)]
    GeoCheck -->|DE / AT / CH| DE[German Locale (de)]
    GeoCheck -->|FR / BE| FR[French Locale (fr)]
    GeoCheck -->|Default / EN| EN[English Locale (en)]
    
    ES & DE & FR & EN --> SSR[Next.js App Router (Static & Dynamic SSR)]
    SSR --> API[Route Handlers /api/*]
    API --> Supabase[(Supabase Cloud Postgres + Storage)]
    SSR --> DataStore[In-Memory Fallback DataStore]
    
    Client --> AdminAuth[Admin Workspace /admin]
    AdminAuth --> ProtectedAPI[Admin API /api/admin/*]
```

## 2. Core Technology Stack

- **Framework**: Next.js 16.3.5 (App Router, Turbopack, Server Components)
- **UI Engine**: React 19.2.8
- **Styling**: Tailwind CSS v4 + Vanilla Design System (Tokens in `globals.css`)
- **Backend & Database**: Supabase (PostgreSQL 15+, Supabase Auth, Storage Buckets, Row-Level Security)
- **Internationalization**: Custom Context Engine (`I18nProvider`) with Edge Geo-IP detection and URL state sync
- **Monetization Engine**: Adsterra Multi-Tier Integration (High-RPM popunders, native leaderboards, and social bar)
- **Search & Indexing**: Dynamic `sitemap.xml`, Googlebot/Bingbot `robots.txt`, Schema.org JSON-LD (NewsMediaOrganization, Article, Review, Breadcrumbs)

## 3. Data Flow & Security Model

1. **Visitor Layer**:
   - Zero-dependency anonymous read access.
   - Idempotent guest interaction endpoints (`/api/likes`, `/api/views`, `/api/comments`, `/api/newsletter`).
   - Row-Level Security (RLS) restricts public users to `status = 'published'` posts and `status = 'approved'` comments.

2. **Admin Layer**:
   - Single-admin entry gate locked to `webrohanray@gmail.com`.
   - Encrypted HTTP-only session cookie (`noxwire_session`).
   - Supabase `on_auth_user_created` trigger automatically maps authorized administrators with `is_admin = true`.

3. **Storage Pipeline**:
   - Dedicated Supabase Storage buckets: `blog-images` (10MB limit) and `avatars` (5MB limit).
   - Public CDN reads via `storage.objects` `SELECT` policy.
   - Authenticated admin upload, update, and delete policies.
