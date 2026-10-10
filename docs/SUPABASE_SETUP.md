# Supabase Cloud Setup & Sync Guide

## 1. Project Initialization
1. Navigate to [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Under **Project Settings > API**, copy the following values:
   - `Project URL`
   - `anon public` key
   - `service_role` secret key

## 2. Table Creation via SQL Editor
1. In the Supabase SQL Editor, paste and execute the complete schema from:
   ```
   supabase/schema.sql
   ```
2. Verify that tables (`posts`, `categories`, `authors`, `tags`, `post_tags`, `comments`, `media_assets`) are active.

## 3. Storage Bucket Configuration
1. Under **Storage**, create a public bucket named `media`.
2. Add a public read policy:
   ```sql
   create policy "Public Access" on storage.objects for select using ( bucket_id = 'media' );
   ```

## 4. Automated Data Seeding
Run the automated cloud synchronization script:
```bash
npm run seed
```

## 5. Storage Asset Upload
Synchronize all local artwork and editorial diagrams to the Supabase Storage CDN:
```bash
npm run upload:images
```
