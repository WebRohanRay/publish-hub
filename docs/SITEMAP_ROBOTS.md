# Sitemap & Robots.txt Architecture

## XML Sitemap Generation (`/sitemap.xml`)
Atlas Journal dynamically serves a compliant Schema.org XML Sitemap via Next.js App Router route handling.
- **Location**: `src/app/sitemap.ts`
- **Dynamic Entities Included**:
  - Homepage (`/`) — priority `1.0`, changefreq `daily`
  - Topic Hubs (`/category/[slug]`) — priority `0.8`, changefreq `weekly`
  - All Published Articles (`/blog/[slug]`) — priority `0.9`, changefreq `monthly`
  - Static Resource Pages (`/about`, `/contact`, `/privacy`, `/terms`) — priority `0.5`

## Crawler Directives (`/robots.txt`)
- **Location**: `src/app/robots.ts`
- **Rules**:
  - Allows search crawlers (`Googlebot`, `Bingbot`, `PerplexityBot`) full access to public indexable routes.
  - Disallows crawler indexing of private administrative and moderation endpoints:
    - `/admin/`
    - `/api/admin/`
    - `/api/auth/`
  - Specifies absolute reference to `https://atlasjournal.io/sitemap.xml`.
