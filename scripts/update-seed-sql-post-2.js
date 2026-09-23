const fs = require('fs');
const path = require('path');

const seedSqlPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
let seedSql = fs.readFileSync(seedSqlPath, 'utf8');

// Load new content from seedData.ts
const seedDataPath = path.join(__dirname, '..', 'src', 'data', 'seedData.ts');
const seedData = fs.readFileSync(seedDataPath, 'utf8');

// Extract post 2 content
const match = seedData.match(/\{[\s\S]*?"id":\s*"post-dating-2"[\s\S]*?"content":\s*([\s\S]*?)\n\s*\},/);
if (!match) {
  console.error('Could not find post 2 in seedData.ts');
  process.exit(1);
}

const rawContent = JSON.parse(match[1]);
// Escape single quotes for SQL
const sqlEscapedContent = rawContent.replace(/'/g, "''");

// Replace Post 2 in seed.sql
const post2SqlRegex = /INSERT INTO public\.posts \([\s\S]*?'p0000000-0000-0000-0000-000000000002'[\s\S]*?seo_description = EXCLUDED\.seo_description;/;

const newPost2Sql = `INSERT INTO public.posts (
  id, title, slug, excerpt, content, featured_image, category_id, status, published_at, reading_time_minutes, view_count, like_count, rating, badge, bonus_text, affiliate_url, seo_title, seo_description, focus_keyword
) VALUES (
  'p0000000-0000-0000-0000-000000000002',
  'Are Dating App Subscriptions Worth It? What You Actually Pay For in 2026',
  'are-dating-app-subscriptions-worth-it',
  'Behind the paywall: an investigative audit into algorithmic throttling, hidden boost tiers, and whether spending $40/month changes your match reality.',
  '${sqlEscapedContent}',
  '/art/dating_subscriptions_worth_it.jpg',
  'c1000000-0000-0000-0000-000000000001',
  'published',
  '2026-09-22 12:00:00+00',
  12,
  38400,
  1690,
  4.9,
  'Financial Audit',
  'Verified ROI Breakdown + Burner Card Protocol',
  '#dating-subscription-offer',
  'Are Dating App Subscriptions Worth It in 2026? Unfiltered Audit | NoxWire',
  'We spent $1,800 testing Tinder Platinum, HingeX, and Bumble Premium+. Read the empirical ROI breakdown and how breakage billing traps your money.',
  'are dating app subscriptions worth it'
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
  seo_description = EXCLUDED.seo_description;`;

seedSql = seedSql.replace(post2SqlRegex, newPost2Sql);

// Also add media_asset entry for dating_subscriptions_worth_it.jpg if not present
if (!seedSql.includes('dating_subscriptions_worth_it.jpg')) {
  const mediaInsert = `INSERT INTO public.media_assets (
  id, filename, public_url, file_size_bytes, width, height, mime_type, alt_text
) VALUES (
  'm0000000-0000-0000-0000-000000000007',
  'dating_subscriptions_worth_it.jpg',
  '/art/dating_subscriptions_worth_it.jpg',
  824100,
  1920,
  1080,
  'image/jpeg',
  'Editorial photograph of credit card receipt and smartphone with dating VIP subscription screen'
) ON CONFLICT (filename) DO NOTHING;\n\n`;

  seedSql = mediaInsert + seedSql;
}

fs.writeFileSync(seedSqlPath, seedSql, 'utf8');
console.log('Successfully updated Post 2 and added media asset in supabase/seed.sql');
