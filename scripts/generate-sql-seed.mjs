// ==============================================================================
// Generate Complete SQL Seed for Supabase from seedData.ts
// ==============================================================================

import fs from "fs";
import path from "path";

// Note: If running via node, we can read seedData.ts directly
const seedTsPath = path.resolve(process.cwd(), "src", "data", "seedData.ts");
const seedTsContent = fs.readFileSync(seedTsPath, "utf-8");

// Extract the posts JSON
const match = seedTsContent.match(/export const INITIAL_POSTS: Post\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_COMMENTS/);
if (!match) {
  console.error("Could not parse INITIAL_POSTS from seedData.ts");
  process.exit(1);
}

const posts = JSON.parse(match[1]);

function escapeSql(str) {
  if (!str) return "NULL";
  return "'" + str.replace(/'/g, "''") + "'";
}

let sql = `-- ==============================================================================
-- NoxWire — Supabase PostgreSQL Production Seed Data Script
-- The Unfiltered Journal of Dating, iGaming & Adult Tech
-- ==============================================================================

-- 1. Site Settings Update
INSERT INTO public.site_settings (
  key, 
  site_name, 
  description, 
  contact_email, 
  default_meta_title, 
  default_meta_description, 
  default_social_image_url,
  social_links
) VALUES (
  'default',
  'NoxWire',
  'The Unfiltered Journal of Dating, iGaming & Adult Tech. Real benchmarks, algorithmic breakdowns, payout testing, and privacy guides.',
  'editor@noxwire.io',
  'NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech',
  'Independent reviews and technical breakdowns of dating platforms, online crypto casinos, adult entertainment networks, and financial privacy stacks.',
  '/art/dating_comparison_guide.jpg',
  '{"x": "https://x.com/noxwire", "telegram": "https://t.me/noxwire"}'::jsonb
) ON CONFLICT (key) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  description = EXCLUDED.description,
  contact_email = EXCLUDED.contact_email,
  default_meta_title = EXCLUDED.default_meta_title,
  default_meta_description = EXCLUDED.default_meta_description,
  default_social_image_url = EXCLUDED.default_social_image_url;

-- 2. Categories Seed
INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Dating & Matchmaking', 'dating', 'In-depth app reviews, free vs paid breakdowns, match rates, and real user experiences.', 1),
  ('c2000000-0000-0000-0000-000000000002', 'Casino & Sports Betting', 'gambling-casino', 'Regulated casinos, instant crypto payouts, sportsbook odds, and audited bonus codes.', 2),
  ('c3000000-0000-0000-0000-000000000003', 'Adult Entertainment & Creators', 'adult-lifestyle', 'Creator platforms, webcam networks, discreet billing analysis, and adult gaming tech.', 3),
  ('c4000000-0000-0000-0000-000000000004', 'Privacy, Crypto & Guides', 'guides-security', 'VPN recommendations, anonymous billing, crypto deposits, and safety best practices.', 4)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- 3. Tags Seed
INSERT INTO public.tags (id, name, slug) VALUES
  ('t1000000-0000-0000-0000-000000000001', 'Dating Apps', 'dating-apps'),
  ('t2000000-0000-0000-0000-000000000002', 'Matchmaking', 'matchmaking'),
  ('t3000000-0000-0000-0000-000000000003', 'Online Casino', 'online-casino'),
  ('t4000000-0000-0000-0000-000000000004', 'Crypto Withdrawals', 'crypto-withdrawals'),
  ('t5000000-0000-0000-0000-000000000005', 'Sports Betting', 'sports-betting'),
  ('t6000000-0000-0000-0000-000000000006', 'OnlyFans & Creators', 'onlyfans-creators'),
  ('t7000000-0000-0000-0000-000000000007', 'Live Webcam Tech', 'live-webcam-tech'),
  ('t8000000-0000-0000-0000-000000000008', 'Discreet Billing', 'discreet-billing'),
  ('t9000000-0000-0000-0000-000000000009', 'VPN Security', 'vpn-security'),
  ('ta000000-0000-0000-0000-000000000010', 'AI Companions', 'ai-companions')
ON CONFLICT (slug) DO NOTHING;

-- 4. Posts Seed (All 20 Deep Humanized Articles)
`;

const catMap = {
  "dating": "c1000000-0000-0000-0000-000000000001",
  "gambling-casino": "c2000000-0000-0000-0000-000000000002",
  "adult-lifestyle": "c3000000-0000-0000-0000-000000000003",
  "guides-security": "c4000000-0000-0000-0000-000000000004",
};

for (let idx = 0; idx < posts.length; idx++) {
  const p = posts[idx];
  const hexIdx = (idx + 1).toString().padStart(2, "0");
  const postUuid = `p0000000-0000-0000-0000-0000000000${hexIdx}`;
  const catId = catMap[p.categorySlug] || "c1000000-0000-0000-0000-000000000001";
  const readingTimeMins = parseInt(p.readingTime) || 8;

  sql += `INSERT INTO public.posts (
  id, title, slug, excerpt, content, featured_image, category_id, status, published_at, reading_time_minutes, view_count, like_count, rating, badge, bonus_text, affiliate_url, seo_title, seo_description, focus_keyword
) VALUES (
  '${postUuid}',
  ${escapeSql(p.title)},
  ${escapeSql(p.slug)},
  ${escapeSql(p.excerpt)},
  ${escapeSql(p.content)},
  ${escapeSql(p.image)},
  '${catId}',
  'published',
  '2026-09-20 12:00:00+00',
  ${readingTimeMins},
  ${p.reads || 25000},
  ${p.likes || 1200},
  ${p.rating || 4.8},
  ${escapeSql(p.badge)},
  ${escapeSql(p.bonusText)},
  ${escapeSql(p.affiliateUrl)},
  ${escapeSql(p.title + " | NoxWire")},
  ${escapeSql(p.excerpt)},
  ${escapeSql(p.slug.replace(/-/g, " "))}
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category_id = EXCLUDED.category_id,
  status = EXCLUDED.status,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  rating = EXCLUDED.rating,
  badge = EXCLUDED.badge,
  bonus_text = EXCLUDED.bonus_text,
  affiliate_url = EXCLUDED.affiliate_url,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;\n\n`;
}

sql += `-- 5. Sample Comments
INSERT INTO public.comments (id, post_id, author_name, author_email, body, status, created_at) VALUES
  (
    'm1000000-0000-0000-0000-000000000001',
    'p0000000-0000-0000-0000-000000000001',
    'Julian Vance',
    'julian.v@example.com',
    'The breakdown of ghost profile ratios on free tiers matches my exact experience over the last six months. Great breakdown.',
    'approved',
    '2026-09-20 16:30:00+00'
  ),
  (
    'm2000000-0000-0000-0000-000000000002',
    'p0000000-0000-0000-0000-000000000007',
    'Elena Rostova',
    'elena.r@example.com',
    'Tested the Solana cashout pipeline mentioned here and got confirmed in under 4 minutes. Refreshing to see real benchmarks instead of casino marketing fluff.',
    'approved',
    '2026-09-19 18:20:00+00'
  ),
  (
    'm3000000-0000-0000-0000-000000000003',
    'p0000000-0000-0000-0000-000000000011',
    'Marcus Thorne',
    'marcus.t@example.com',
    'Fansly tiered media approach is definitely superior for long-term creators who do not want to be spamming paid PPV messages every week.',
    'approved',
    '2026-09-21 09:10:00+00'
  )
ON CONFLICT (id) DO NOTHING;

-- 6. Media Assets Seed
INSERT INTO public.media_assets (id, filename, public_url, file_size_bytes, width, height, mime_type, alt_text) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'dating_comparison_2026.jpg', '/art/dating_comparison_2026.jpg', 760491, 1920, 1080, 'image/jpeg', 'Comparison of free versus VIP dating app subscriptions on smartphone screens'),
  ('a2000000-0000-0000-0000-000000000002', 'dating_algorithm_funnel.jpg', '/art/dating_algorithm_funnel.jpg', 805603, 1920, 1080, 'image/jpeg', 'Algorithmic matchmaking funnel diagram showing card distribution'),
  ('a3000000-0000-0000-0000-000000000003', 'dating_subscriptions_worth_it.jpg', '/art/dating_subscriptions_worth_it.jpg', 696315, 1920, 1080, 'image/jpeg', 'Editorial photo of smartphone VIP checkout and receipt on mahogany desk'),
  ('a4000000-0000-0000-0000-000000000004', 'dating_comparison_guide.jpg', '/art/dating_comparison_guide.jpg', 742740, 1920, 1080, 'image/jpeg', 'Online dating apps and matchmaking guide editorial hero'),
  ('a5000000-0000-0000-0000-000000000005', 'casino_betting_hero.jpg', '/art/casino_betting_hero.jpg', 829235, 1920, 1080, 'image/jpeg', 'Regulated online sportsbook and casino interface'),
  ('a6000000-0000-0000-0000-000000000006', 'crypto_casino_payout.jpg', '/art/crypto_casino_payout.jpg', 865232, 1920, 1080, 'image/jpeg', 'Crypto wallet payout speed test on Solana and Bitcoin'),
  ('a7000000-0000-0000-0000-000000000007', 'adult_lifestyle_hero.jpg', '/art/adult_lifestyle_hero.jpg', 813277, 1920, 1080, 'image/jpeg', 'Creator economy and independent content platform comparison'),
  ('a8000000-0000-0000-0000-000000000008', 'discreet_billing_cards.jpg', '/art/discreet_billing_cards.jpg', 703124, 1920, 1080, 'image/jpeg', 'Virtual credit cards and discreet bank statement descriptors'),
  ('a9000000-0000-0000-0000-000000000009', 'crypto_privacy_hero.jpg', '/art/crypto_privacy_hero.jpg', 959404, 1920, 1080, 'image/jpeg', 'Digital privacy stack, VPN encryption, and metadata protection')
ON CONFLICT (id) DO NOTHING;

-- 7. Post Tags Association
INSERT INTO public.post_tags (post_id, tag_id) VALUES
  ('p0000000-0000-0000-0000-000000000001', 't1000000-0000-0000-0000-000000000001'),
  ('p0000000-0000-0000-0000-000000000001', 't2000000-0000-0000-0000-000000000002'),
  ('p0000000-0000-0000-0000-000000000002', 't1000000-0000-0000-0000-000000000001'),
  ('p0000000-0000-0000-0000-000000000002', 't8000000-0000-0000-0000-000000000008'),
  ('p0000000-0000-0000-0000-000000000003', 't1000000-0000-0000-0000-000000000001'),
  ('p0000000-0000-0000-0000-000000000003', 't9000000-0000-0000-0000-000000000009'),
  ('p0000000-0000-0000-0000-000000000006', 't3000000-0000-0000-0000-000000000003'),
  ('p0000000-0000-0000-0000-000000000007', 't4000000-0000-0000-0000-000000000004'),
  ('p0000000-0000-0000-0000-000000000011', 't6000000-0000-0000-0000-000000000006'),
  ('p0000000-0000-0000-0000-000000000012', 't8000000-0000-0000-0000-000000000008'),
  ('p0000000-0000-0000-0000-000000000016', 't9000000-0000-0000-0000-000000000009')
ON CONFLICT (post_id, tag_id) DO NOTHING;
`;

const seedSqlPath = path.resolve(process.cwd(), "supabase", "seed.sql");
fs.writeFileSync(seedSqlPath, sql, "utf-8");
console.log(`✓ Generated ${seedSqlPath} (${(fs.statSync(seedSqlPath).size / 1024).toFixed(1)} KB) with all 20 long-form posts!`);
