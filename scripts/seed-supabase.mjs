// ==============================================================================
// NoxWire — Automated Supabase Cloud Seed & Admin Provisioning Runner
// ==============================================================================

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { uploadAllImages } from "./upload-storage.mjs";

// 1. Try reading .env.local if exists
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [k, ...v] = trimmed.split("=");
      const val = v.join("=").trim().replace(/^["']|["']$/g, "");
      if (!process.env[k.trim()]) {
        process.env[k.trim()] = val;
      }
    }
  }
}

// 1b. CLI flag support: --url and --key
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--url" && process.argv[i + 1]) {
    process.env.NEXT_PUBLIC_SUPABASE_URL = process.argv[i + 1];
  }
  if (process.argv[i] === "--key" && process.argv[i + 1]) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = process.argv[i + 1];
  }
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("=================================================");
console.log("  NoxWire Supabase Database & Admin Provisioner  ");
console.log("=================================================");

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Error: Missing Supabase Credentials.");
  console.error("Please provide the following environment variables in .env.local:\n");
  console.error("  NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co");
  console.error("  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (Required for admin provisioning & RLS bypass)\n");
  process.exit(1);
}

console.log(`\n🔗 Connecting to Supabase at: ${supabaseUrl}`);
const isServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(`🔑 Key Type: ${isServiceRole ? "Service Role (Full Admin & Auth Control)" : "Anon Public Key (Standard RLS)"}`);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function runSeed() {
  try {
    // 1. Provision Admin Account if Service Role Key is available
    const adminEmail = "webrohanray@gmail.com";
    const adminPassword = "Rohanray@12345";
    const adminDisplayName = "Rohan Ray";

    if (isServiceRole) {
      console.log(`\n👤 Provisioning Administrator: ${adminEmail}...`);
      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
      
      let adminUserId = null;
      if (!listError && usersData?.users) {
        const existingUser = usersData.users.find((u) => u.email?.toLowerCase() === adminEmail.toLowerCase());
        if (existingUser) {
          adminUserId = existingUser.id;
          console.log(`  ✓ Found existing admin auth user (ID: ${adminUserId})`);
          // Update password to ensure it matches
          await supabase.auth.admin.updateUserById(adminUserId, {
            password: adminPassword,
            user_metadata: { display_name: adminDisplayName },
          });
        }
      }

      if (!adminUserId) {
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
          user_metadata: { display_name: adminDisplayName },
        });

        if (createError) {
          console.warn(`  ⚠️ Could not auto-create auth user via API: ${createError.message}`);
        } else if (newUser?.user) {
          adminUserId = newUser.user.id;
          console.log(`  ✓ Successfully created admin user: ${adminEmail} (ID: ${adminUserId})`);
        }
      }

      if (adminUserId) {
        // Upsert into public.profiles
        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            id: adminUserId,
            display_name: adminDisplayName,
            avatar_url: "/avatars/avatar_maya_patel.jpg",
            is_admin: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

        if (!profileError) {
          console.log(`  ✓ Successfully updated public.profiles for ${adminEmail} (is_admin = true)`);
        }
      }
    } else {
      console.log(`\nℹ️ Note: Running with anon key. To automatically create the admin user webrohanray@gmail.com in auth.users, provide SUPABASE_SERVICE_ROLE_KEY or sign up on the site.`);
    }

    // 2. Site Settings
    console.log("\n⚙️ Upserting Site Settings for NoxWire...");
    const { error: settingsError } = await supabase.from("site_settings").upsert(
      {
        key: "default",
        site_name: "NoxWire",
        description: "The Unfiltered Journal of Dating, iGaming & Adult Tech. Real benchmarks, algorithmic breakdowns, payout testing, and privacy guides.",
        contact_email: "editor@noxwire.io",
        default_meta_title: "NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech",
        default_meta_description: "Independent reviews and technical breakdowns of dating platforms, online crypto casinos, adult entertainment networks, and financial privacy stacks.",
        default_social_image_url: "/art/dating_comparison_guide.jpg",
        social_links: { x: "https://x.com/noxwire", telegram: "https://t.me/noxwire" },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );
    if (settingsError) {
      console.warn("  ⚠️ Settings notice:", settingsError.message);
    } else {
      console.log("  ✓ NoxWire site settings synchronized.");
    }

    // 3. Categories
    console.log("\n📁 Upserting 4 Core Editorial Categories...");
    const categories = [
      {
        id: "c1000000-0000-0000-0000-000000000001",
        name: "Dating & Matchmaking",
        slug: "dating",
        description: "In-depth app reviews, free vs paid breakdowns, match rates, and real user experiences.",
        sort_order: 1,
      },
      {
        id: "c2000000-0000-0000-0000-000000000002",
        name: "Casino & Sports Betting",
        slug: "gambling-casino",
        description: "Regulated casinos, instant crypto payouts, sportsbook odds, and audited bonus codes.",
        sort_order: 2,
      },
      {
        id: "c3000000-0000-0000-0000-000000000003",
        name: "Adult Entertainment & Creators",
        slug: "adult-lifestyle",
        description: "Creator platforms, webcam networks, discreet billing analysis, and adult gaming tech.",
        sort_order: 3,
      },
      {
        id: "c4000000-0000-0000-0000-000000000004",
        name: "Privacy, Crypto & Guides",
        slug: "guides-security",
        description: "VPN recommendations, anonymous billing, crypto deposits, and safety best practices.",
        sort_order: 4,
      },
    ];

    for (const cat of categories) {
      const { error: catErr } = await supabase.from("categories").upsert(cat, { onConflict: "slug" });
      if (catErr) console.warn(`  ⚠️ Category ${cat.name}:`, catErr.message);
      else console.log(`  ✓ Category: ${cat.name} (${cat.slug})`);
    }

    // 4. Tags
    console.log("\n🏷️ Upserting High-Intent SEO Tags...");
    const tags = [
      { id: "t1000000-0000-0000-0000-000000000001", name: "Dating Apps", slug: "dating-apps" },
      { id: "t2000000-0000-0000-0000-000000000002", name: "Matchmaking", slug: "matchmaking" },
      { id: "t3000000-0000-0000-0000-000000000003", name: "Online Casino", slug: "online-casino" },
      { id: "t4000000-0000-0000-0000-000000000004", name: "Crypto Withdrawals", slug: "crypto-withdrawals" },
      { id: "t5000000-0000-0000-0000-000000000005", name: "Sports Betting", slug: "sports-betting" },
      { id: "t6000000-0000-0000-0000-000000000006", name: "OnlyFans & Creators", slug: "onlyfans-creators" },
      { id: "t7000000-0000-0000-0000-000000000007", name: "Live Webcam Tech", slug: "live-webcam-tech" },
      { id: "t8000000-0000-0000-0000-000000000008", name: "Discreet Billing", slug: "discreet-billing" },
      { id: "t9000000-0000-0000-0000-000000000009", name: "VPN Security", slug: "vpn-security" },
      { id: "ta000000-0000-0000-0000-000000000010", name: "AI Companions", slug: "ai-companions" },
    ];

    for (const tag of tags) {
      await supabase.from("tags").upsert(tag, { onConflict: "slug" });
    }
    console.log(`  ✓ ${tags.length} SEO tags seeded.`);

    // 5. Media Assets
    console.log("\n🖼️ Upserting High-Resolution Media Assets...");
    const mediaAssets = [
      { id: "a1000000-0000-0000-0000-000000000001", filename: "dating_comparison_2026.jpg", public_url: "/art/dating_comparison_2026.jpg", file_size_bytes: 760491, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Comparison of free versus VIP dating app subscriptions on smartphone screens" },
      { id: "a2000000-0000-0000-0000-000000000002", filename: "dating_algorithm_funnel.jpg", public_url: "/art/dating_algorithm_funnel.jpg", file_size_bytes: 805603, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Algorithmic matchmaking funnel diagram showing card distribution" },
      { id: "a3000000-0000-0000-0000-000000000003", filename: "dating_subscriptions_worth_it.jpg", public_url: "/art/dating_subscriptions_worth_it.jpg", file_size_bytes: 696315, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Editorial photo of smartphone VIP checkout and receipt on mahogany desk" },
      { id: "a4000000-0000-0000-0000-000000000004", filename: "dating_comparison_guide.jpg", public_url: "/art/dating_comparison_guide.jpg", file_size_bytes: 742740, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Online dating apps and matchmaking guide editorial hero" },
      { id: "a5000000-0000-0000-0000-000000000005", filename: "casino_betting_hero.jpg", public_url: "/art/casino_betting_hero.jpg", file_size_bytes: 829235, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Regulated online sportsbook and casino interface" },
      { id: "a6000000-0000-0000-0000-000000000006", filename: "crypto_casino_payout.jpg", public_url: "/art/crypto_casino_payout.jpg", file_size_bytes: 865232, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Crypto wallet payout speed test on Solana and Bitcoin" },
      { id: "a7000000-0000-0000-0000-000000000007", filename: "adult_lifestyle_hero.jpg", public_url: "/art/adult_lifestyle_hero.jpg", file_size_bytes: 813277, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Creator economy and independent content platform comparison" },
      { id: "a8000000-0000-0000-0000-000000000008", filename: "discreet_billing_cards.jpg", public_url: "/art/discreet_billing_cards.jpg", file_size_bytes: 703124, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Virtual credit cards and discreet bank statement descriptors" },
      { id: "a9000000-0000-0000-0000-000000000009", filename: "crypto_privacy_hero.jpg", public_url: "/art/crypto_privacy_hero.jpg", file_size_bytes: 959404, width: 1920, height: 1080, mime_type: "image/jpeg", alt_text: "Digital privacy stack, VPN encryption, and metadata protection" },
    ];
    for (const m of mediaAssets) {
      await supabase.from("media_assets").upsert(m, { onConflict: "id" });
    }
    console.log(`  ✓ ${mediaAssets.length} media assets seeded.`);

    // 5b. Upload Physical Image Files to Supabase Storage Buckets
    await uploadAllImages();

    // 6. Posts (Read from seedData.ts)
    console.log("\n📝 Reading and seeding all 20 long-form editorial posts...");
    const seedTsPath = path.resolve(process.cwd(), "src", "data", "seedData.ts");
    const seedTsContent = fs.readFileSync(seedTsPath, "utf-8");
    const match = seedTsContent.match(/export const INITIAL_POSTS: Post\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_COMMENTS/);
    if (!match) {
      console.warn("  ⚠️ Could not parse INITIAL_POSTS from seedData.ts");
    } else {
      const posts = JSON.parse(match[1]);
      const catMap = {
        "dating": "c1000000-0000-0000-0000-000000000001",
        "gambling-casino": "c2000000-0000-0000-0000-000000000002",
        "adult-lifestyle": "c3000000-0000-0000-0000-000000000003",
        "guides-security": "c4000000-0000-0000-0000-000000000004",
      };

      let successCount = 0;
      for (let idx = 0; idx < posts.length; idx++) {
        const p = posts[idx];
        const hexIdx = (idx + 1).toString().padStart(2, "0");
        const postUuid = `p0000000-0000-0000-0000-0000000000${hexIdx}`;
        const catId = catMap[p.categorySlug] || "c1000000-0000-0000-0000-000000000001";
        const readingTimeMins = parseInt(p.readingTime) || 8;

        const postPayload = {
          id: postUuid,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt || "",
          content: p.content || "",
          featured_image: p.image || "/art/dating_comparison_guide.jpg",
          category_id: catId,
          status: "published",
          published_at: "2026-09-20T12:00:00Z",
          reading_time_minutes: readingTimeMins,
          view_count: p.reads || 25000,
          like_count: p.likes || 1200,
          rating: p.rating || 4.8,
          badge: p.badge || "Audited",
          bonus_text: p.bonusText || null,
          affiliate_url: p.affiliateUrl || null,
          seo_title: `${p.title} | NoxWire`,
          seo_description: p.excerpt || "",
          focus_keyword: p.slug.replace(/-/g, " "),
        };

        const { error: postErr } = await supabase.from("posts").upsert(postPayload, { onConflict: "slug" });
        if (postErr) {
          console.warn(`  ⚠️ Post [${p.slug}]:`, postErr.message);
        } else {
          successCount++;
        }
      }
      console.log(`  ✓ Successfully upserted ${successCount}/${posts.length} long-form articles in Supabase!`);
    }

    // 7. Post Tags
    console.log("\n🔗 Linking Post Tags...");
    const postTags = [
      { post_id: "p0000000-0000-0000-0000-000000000001", tag_id: "t1000000-0000-0000-0000-000000000001" },
      { post_id: "p0000000-0000-0000-0000-000000000001", tag_id: "t2000000-0000-0000-0000-000000000002" },
      { post_id: "p0000000-0000-0000-0000-000000000002", tag_id: "t1000000-0000-0000-0000-000000000001" },
      { post_id: "p0000000-0000-0000-0000-000000000002", tag_id: "t8000000-0000-0000-0000-000000000008" },
      { post_id: "p0000000-0000-0000-0000-000000000003", tag_id: "t1000000-0000-0000-0000-000000000001" },
      { post_id: "p0000000-0000-0000-0000-000000000003", tag_id: "t9000000-0000-0000-0000-000000000009" },
      { post_id: "p0000000-0000-0000-0000-000000000006", tag_id: "t3000000-0000-0000-0000-000000000003" },
      { post_id: "p0000000-0000-0000-0000-000000000007", tag_id: "t4000000-0000-0000-0000-000000000004" },
      { post_id: "p0000000-0000-0000-0000-000000000011", tag_id: "t6000000-0000-0000-0000-000000000006" },
      { post_id: "p0000000-0000-0000-0000-000000000012", tag_id: "t8000000-0000-0000-0000-000000000008" },
      { post_id: "p0000000-0000-0000-0000-000000000016", tag_id: "t9000000-0000-0000-0000-000000000009" },
    ];
    for (const pt of postTags) {
      await supabase.from("post_tags").upsert(pt, { onConflict: "post_id,tag_id" });
    }
    console.log(`  ✓ Post tags mapped.`);

    // 8. Comments
    console.log("\n💬 Upserting Moderated Comments...");
    const sampleComments = [
      {
        id: "m1000000-0000-0000-0000-000000000001",
        post_id: "p0000000-0000-0000-0000-000000000001",
        author_name: "Julian Vance",
        author_email: "julian.v@example.com",
        body: "The breakdown of ghost profile ratios on free tiers matches my exact experience over the last six months. Great breakdown.",
        status: "approved",
      },
      {
        id: "m2000000-0000-0000-0000-000000000002",
        post_id: "p0000000-0000-0000-0000-000000000007",
        author_name: "Elena Rostova",
        author_email: "elena.r@example.com",
        body: "Tested the Solana cashout pipeline mentioned here and got confirmed in under 4 minutes. Refreshing to see real benchmarks instead of casino marketing fluff.",
        status: "approved",
      },
      {
        id: "m3000000-0000-0000-0000-000000000003",
        post_id: "p0000000-0000-0000-0000-000000000011",
        author_name: "Marcus Thorne",
        author_email: "marcus.t@example.com",
        body: "Fansly tiered media approach is definitely superior for long-term creators who do not want to be spamming paid PPV messages every week.",
        status: "approved",
      },
    ];
    for (const c of sampleComments) {
      await supabase.from("comments").upsert(c, { onConflict: "id" });
    }
    console.log(`  ✓ ${sampleComments.length} sample comments approved and seeded.`);

    // 9. Database Verification Summary
    console.log("\n📊 Verifying Live Database Inventory...");
    const [pCount, cCount, tCount] = await Promise.all([
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("tags").select("id", { count: "exact", head: true }),
    ]);
    console.log(`  - Posts in Supabase:      ${pCount.count ?? "unknown"}`);
    console.log(`  - Categories in Supabase: ${cCount.count ?? "unknown"}`);
    console.log(`  - Tags in Supabase:       ${tCount.count ?? "unknown"}`);

    console.log("\n=================================================");
    console.log("  🎉 Supabase Seed Execution Successfully Completed!  ");
    console.log("=================================================");
    console.log("\nAdmin Login Info:");
    console.log(`  Email:    ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log("  URL:      http://localhost:3000/admin/login\n");
  } catch (err) {
    console.error("❌ Unexpected error during seed execution:", err);
  }
}

runSeed();
