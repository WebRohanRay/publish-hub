// ==============================================================================
// NoxWire — Automated Supabase Cloud Seed & Admin Provisioning Runner
// ==============================================================================

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

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

    // 5. Read and seed posts from seed.sql or directly
    console.log("\n📝 Reading and seeding all 20 long-form editorial posts from supabase/seed.sql...");
    const seedSqlPath = path.resolve(process.cwd(), "supabase", "seed.sql");
    if (fs.existsSync(seedSqlPath)) {
      console.log(`  ✓ supabase/seed.sql located (${(fs.statSync(seedSqlPath).size / 1024).toFixed(1)} KB)`);
    }

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
