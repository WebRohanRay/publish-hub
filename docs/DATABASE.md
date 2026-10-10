# Database Architecture & Supabase Schema

## PostgreSQL 15 Relational Schema
Atlas Journal uses a normalized relational schema hosted on Supabase Cloud.

### Primary Entities & Relationships

```
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│   authors    │          │  categories  │          │     tags     │
│  (id, name,  │          │  (id, name,  │          │  (id, name,  │
│   bio, role) │          │   slug)      │          │   slug)      │
└──────┬───────┘          └──────┬───────┘          └──────┬───────┘
       │ 1                       │ 1                       │ N
       │                         │                         │
       ▼ N                       ▼ N                       ▼ M
┌────────────────────────────────────────┐          ┌──────────────┐
│                 posts                  │──────────┤  post_tags   │
│  (id, title, slug, content, excerpt,   │          │ (post_id,    │
│   cover_image, author_id, category_id) │          │  tag_id)     │
└──────────────────┬─────────────────────┘          └──────────────┘
                   │ 1
                   ▼ N
┌────────────────────────────────────────┐
│                comments                │
│  (id, post_id, author_name, body,      │
│   status: pending/approved/spam)       │
└────────────────────────────────────────┘
```

## Migration & Seed Strategy
1. **Schema Initialization**: `supabase/schema.sql` creates all tables with constraints, indexes, and RLS policies.
2. **Seed Generation**: `scripts/generate-sql-seed.mjs` outputs `supabase/seed.sql` with full article content, categories, authors, tags, and sample comments.
3. **Automated Runner**: `scripts/seed-supabase.mjs` executes direct Upsert operations via Supabase client, providing idempotent synchronization.
