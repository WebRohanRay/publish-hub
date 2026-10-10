# Atlas Journal — System Architecture

## Overview
Atlas Journal (Publish Hub) is a production-grade, search-optimized publishing engine engineered with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, and Supabase PostgreSQL.

## Core Architectural Layers

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Tier                           │
│   Next.js 16 Server Components & Client Hydrated Modules    │
│   (Reader Views, Admin Portal, Moderation Workflows)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Next.js API Edge                       │
│     Route Handlers, Authentication Middleware, Proxy        │
│    (/api/posts, /api/auth, /api/admin/*, /api/newsletter)   │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
        (Primary Cloud)                  (Local Fallback)
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Supabase Cloud          │ │      Local Fallback Store  │
│  - PostgreSQL 15 Relational  │ │  - Instant In-Memory Seed  │
│  - Storage (Buckets/CDN)     │ │  - Offline Development     │
│  - Row-Level Security (RLS)  │ └────────────────────────────┘
└──────────────────────────────┘
```

## Resilience & High Availability
- **Dual-Data Mode**: The platform connects directly to Supabase via `@supabase/supabase-js`. If external network connectivity is restricted, the platform automatically falls back to an internal seed store, ensuring 100% uptime during static build generation (`next build`) and edge cold starts.
- **Static Site Generation (SSG)**: 70+ static pages are pre-rendered at build time with incremental revalidation paths.
