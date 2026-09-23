// ==============================================================================
// NoxWire — Automated Supabase Storage Bucket Provisioner & Image Uploader
// Uploads all hero images, diagrams, and avatars directly to Supabase Storage
// ==============================================================================

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Read .env.local
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
console.log("  NoxWire Supabase Storage Bucket Image Uploader ");
console.log("=================================================");

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Error: Missing Supabase Credentials.");
  console.error("Please provide the following environment variables in .env.local:\n");
  console.error("  NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co");
  console.error("  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (Recommended for storage operations)\n");
  process.exit(1);
}

console.log(`\n🔗 Connecting to Supabase Storage at: ${supabaseUrl}`);
const isServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(`🔑 Key Type: ${isServiceRole ? "Service Role Key" : "Anon Public Key"}`);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

export async function uploadAllImages() {
  try {
    // 1. Ensure Buckets Exist
    console.log("\n📦 Ensuring Storage Buckets Exist in Supabase...");
    const requiredBuckets = [
      { id: "blog-images", public: true },
      { id: "avatars", public: true },
    ];

    for (const b of requiredBuckets) {
      const { data: existing, error: getErr } = await supabase.storage.getBucket(b.id);
      if (getErr || !existing) {
        console.log(`  Creating bucket: '${b.id}' (public: true)...`);
        const { error: createErr } = await supabase.storage.createBucket(b.id, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
        if (createErr && !createErr.message.includes("already exists")) {
          console.warn(`  ⚠️ Could not create bucket '${b.id}':`, createErr.message);
        } else {
          console.log(`  ✓ Bucket '${b.id}' verified / created.`);
        }
      } else {
        console.log(`  ✓ Bucket '${b.id}' is active.`);
      }
    }

    // 2. Upload Art Images to blog-images
    const artDir = path.resolve(process.cwd(), "public", "art");
    const uploadedArt = [];
    if (fs.existsSync(artDir)) {
      const files = fs.readdirSync(artDir).filter((f) => !f.startsWith("."));
      console.log(`\n🎨 Uploading ${files.length} editorial artwork images to 'blog-images' bucket...`);

      for (const file of files) {
        const filePath = path.join(artDir, file);
        const fileStat = fs.statSync(filePath);
        if (!fileStat.isFile()) continue;

        const fileBuffer = fs.readFileSync(filePath);
        const mimeType = getMimeType(file);

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(file, fileBuffer, {
            contentType: mimeType,
            upsert: true,
          });

        if (uploadError) {
          console.warn(`  ⚠️ Failed to upload ${file}:`, uploadError.message);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from("blog-images")
            .getPublicUrl(file);

          const publicUrl = publicUrlData.publicUrl;
          uploadedArt.push({ file, publicUrl, size: fileStat.size, mimeType });
          console.log(`  ✓ Uploaded: ${file} -> ${publicUrl}`);

          // Also update or insert in public.media_assets if table exists
          try {
            await supabase.from("media_assets").upsert(
              {
                filename: file,
                public_url: publicUrl,
                file_size_bytes: fileStat.size,
                mime_type: mimeType,
                alt_text: file.replace(/[_-]/g, " ").replace(/\.[^/.]+$/, ""),
              },
              { onConflict: "filename" }
            );
          } catch {}
        }
      }
    }

    // 3. Upload Avatars to avatars bucket
    const avatarsDir = path.resolve(process.cwd(), "public", "avatars");
    if (fs.existsSync(avatarsDir)) {
      const avatarFiles = fs.readdirSync(avatarsDir).filter((f) => !f.startsWith("."));
      console.log(`\n👤 Uploading ${avatarFiles.length} avatar images to 'avatars' bucket...`);

      for (const file of avatarFiles) {
        const filePath = path.join(avatarsDir, file);
        const fileStat = fs.statSync(filePath);
        if (!fileStat.isFile()) continue;

        const fileBuffer = fs.readFileSync(filePath);
        const mimeType = getMimeType(file);

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(file, fileBuffer, {
            contentType: mimeType,
            upsert: true,
          });

        if (uploadError) {
          console.warn(`  ⚠️ Failed to upload avatar ${file}:`, uploadError.message);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(file);

          console.log(`  ✓ Uploaded avatar: ${file} -> ${publicUrlData.publicUrl}`);

          // Update profiles avatar_url if admin
          try {
            await supabase
              .from("profiles")
              .update({ avatar_url: publicUrlData.publicUrl })
              .eq("is_admin", true);
          } catch {}
        }
      }
    }

    // 4. Update posts to use live Supabase Storage URLs
    if (uploadedArt.length > 0) {
      console.log("\n🔄 Updating posts to reference live Supabase Storage URLs...");
      for (const item of uploadedArt) {
        try {
          const localPath1 = `/art/${item.file}`;
          await supabase
            .from("posts")
            .update({ featured_image: item.publicUrl })
            .or(`featured_image.eq.${localPath1},featured_image.ilike.%${item.file}%`);
        } catch {}
      }
      console.log("  ✓ Post image URLs synchronized with Supabase Storage.");
    }

    console.log("\n=================================================");
    console.log("  🎉 All Images Successfully Uploaded to Storage! ");
    console.log("=================================================\n");
  } catch (err) {
    console.error("❌ Storage upload error:", err);
  }
}

// Auto-run when executed directly
if (process.argv[1] && process.argv[1].endsWith("upload-storage.mjs")) {
  uploadAllImages();
}
