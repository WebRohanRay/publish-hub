# NoxWire Google Search Console & Indexing Blueprint

This operational guide provides step-by-step instructions for verifying domain ownership in **Google Search Console (GSC)**, submitting automated XML sitemaps, checking canonical tags, and monitoring indexation performance across all 20 long-form articles.

---

## 1. Domain Verification in Google Search Console

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Choose **Domain** property (recommended for multi-subdomain and HTTPS indexing) or **URL prefix** (e.g., `https://publish-hub.vercel.app`).
4. **Verification Method**:
   - **DNS TXT Record** (for custom domain): Add the Google verification token as a TXT record to your DNS zone.
   - **HTML Tag** (for Vercel deployment): Copy the meta verification tag:
     ```html
     <meta name="google-site-verification" content="YOUR_TOKEN_HERE" />
     ```
     Add `google-site-verification` to `src/app/layout.tsx` metadata verification object:
     ```ts
     verification: {
       google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
     }
     ```
   - Click **Verify**.

---

## 2. Submitting Automated XML Sitemaps

NoxWire generates a dynamic, localized XML sitemap automatically at runtime:

- **Sitemap URL**: `https://publish-hub.vercel.app/sitemap.xml`
- **RSS Syndication Feed**: `https://publish-hub.vercel.app/rss.xml`
- **Atom Syndication Feed**: `https://publish-hub.vercel.app/feed.atom`

### Steps in Search Console:
1. In the left navigation menu, click **Sitemaps**.
2. Under "Add a new sitemap", input `sitemap.xml`.
3. Click **Submit**.
4. Confirm the status turns **Success** (green) with all URLs discovered.

---

## 3. Robots.txt Controls & Crawl Budget

The production `robots.txt` is automatically served at:
`https://publish-hub.vercel.app/robots.txt`

It permits search engine crawlers (`Googlebot`, `Bingbot`, `DuckDuckBot`) across all public blog articles and category archives, while shielding private administrative routes:

```txt
User-agent: *
Allow: /
Allow: /blog/*
Allow: /category/*
Allow: /about
Allow: /privacy
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

Sitemap: https://publish-hub.vercel.app/sitemap.xml
```

---

## 4. Rich Snippets & Structured Data Verification

Every article on NoxWire automatically injects `Article`, `NewsArticle`, or `FAQPage` JSON-LD schemas:

- **Google Rich Results Test**: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
  - Input any live article URL (e.g. `https://publish-hub.vercel.app/blog/best-dating-apps-free-vs-paid-breakdown`)
  - Verify that:
    1. Schema type `Article` is valid with zero critical errors.
    2. Headline, DatePublished, DateModified, Author, and Image match.
    3. Breadcrumbs are accurately mapped to the respective Category.

---

## 5. Mobile-First Indexing & Core Web Vitals Checklist

All pages are pre-rendered statically with Next.js App Router for optimal Core Web Vitals:
- **Largest Contentful Paint (LCP)**: < 1.2s (Next.js Image component with WebP/AVIF compression).
- **Cumulative Layout Shift (CLS)**: 0.00 (Fixed aspect ratios on artwork and reserved banner slots).
- **Interaction to Next Paint (INP)**: < 100ms (Client components isolated with lazy hydration).
