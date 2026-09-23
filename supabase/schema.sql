-- ==============================================================================
-- NoxWire Editorial & PublishHub — Complete Supabase PostgreSQL Schema & Security
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES (Admin & Author Models)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Rohan Ray',
  avatar_url TEXT DEFAULT '/avatars/avatar_maya_patel.jpg',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Auto-grant admin role to webrohanray@gmail.com on sign-up / auth creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Rohan Ray'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '/avatars/avatar_maya_patel.jpg'),
    CASE 
      WHEN LOWER(COALESCE(NEW.email, '')) IN ('webrohanray@gmail.com', 'admin@noxwire.io') THEN true 
      ELSE false 
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    is_admin = CASE 
      WHEN LOWER(COALESCE(NEW.email, '')) IN ('webrohanray@gmail.com', 'admin@noxwire.io') THEN true 
      ELSE public.profiles.is_admin 
    END,
    updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sync existing auth.users into public.profiles if any exist already
INSERT INTO public.profiles (id, display_name, avatar_url, is_admin)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'display_name', 'Rohan Ray'),
  COALESCE(raw_user_meta_data->>'avatar_url', '/avatars/avatar_maya_patel.jpg'),
  CASE 
    WHEN LOWER(COALESCE(email, '')) IN ('webrohanray@gmail.com', 'admin@noxwire.io') THEN true 
    ELSE false 
  END
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
  avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
  is_admin = (public.profiles.is_admin OR EXCLUDED.is_admin),
  updated_at = timezone('utc'::text, now());

-- ==============================================================================
-- 2. SITE SETTINGS (Singleton configuration)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY DEFAULT 'default',
  site_name TEXT NOT NULL DEFAULT 'NoxWire',
  logo_url TEXT,
  favicon_url TEXT,
  description TEXT DEFAULT 'The Unfiltered Journal of Dating, iGaming & Adult Tech. Real benchmarks, algorithmic breakdowns, payout testing, and privacy guides.',
  contact_email TEXT DEFAULT 'editor@noxwire.io',
  featured_post_id UUID,
  latest_post_count INTEGER NOT NULL DEFAULT 4,
  popular_post_count INTEGER NOT NULL DEFAULT 4,
  comments_enabled BOOLEAN NOT NULL DEFAULT true,
  comments_require_moderation BOOLEAN NOT NULL DEFAULT true,
  allow_guest_comments BOOLEAN NOT NULL DEFAULT true,
  default_meta_title TEXT DEFAULT 'NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech',
  default_meta_description TEXT DEFAULT 'Independent reviews and technical breakdowns of dating platforms, online crypto casinos, adult entertainment networks, and financial privacy stacks.',
  default_social_image_url TEXT DEFAULT '/art/dating_comparison_guide.jpg',
  social_links JSONB DEFAULT '{"x": "https://x.com/noxwire", "telegram": "https://t.me/noxwire"}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 3. CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 4. TAGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 5. POSTS (Long-form High-CTR Articles)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  social_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived', 'trash')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  reading_time_minutes INTEGER DEFAULT 5,
  view_count BIGINT DEFAULT 0,
  like_count BIGINT DEFAULT 0,
  comment_count BIGINT DEFAULT 0,
  rating NUMERIC(2,1),
  badge TEXT,
  bonus_text TEXT,
  affiliate_url TEXT,
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  focus_keyword TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 6. POST TAGS (Many-to-Many Bridge)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ==============================================================================
-- 7. COMMENTS (Private author email, never exposed publicly)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'trash')),
  source_ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 8. LIKES (Anonymous deduplicated by token hash)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  anonymous_token_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_post_token_like UNIQUE (post_id, anonymous_token_hash)
);

-- ==============================================================================
-- 9. VIEW EVENTS (Privacy-safe analytics deduplication)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.view_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  anonymous_token_hash TEXT NOT NULL,
  referrer TEXT,
  device_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 10. NEWSLETTER SUBSCRIBERS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT DEFAULT 'sunday_edition',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  unsubscribed_at TIMESTAMPTZ
);

-- ==============================================================================
-- 11. ACTIVITY LOGS (Admin Audit Trail)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  summary TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 12. MEDIA ASSETS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_size_bytes BIGINT DEFAULT 500000,
  width INTEGER DEFAULT 1920,
  height INTEGER DEFAULT 1080,
  mime_type TEXT DEFAULT 'image/jpeg',
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- AUTO-UPDATE TIMESTAMPS TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_posts_updated_at ON public.posts;
CREATE TRIGGER set_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_comments_updated_at ON public.comments;
CREATE TRIGGER set_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON public.posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_status ON public.comments(post_id, status);
CREATE INDEX IF NOT EXISTS idx_likes_post ON public.likes(post_id);
CREATE INDEX IF NOT EXISTS idx_view_events_post_token ON public.view_events(post_id, anonymous_token_hash);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.view_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Helper admin check function (Supports both Service Role & Admin profiles)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- 1. Service role always has admin privileges
  IF (COALESCE(current_setting('request.jwt.claim.role', true), '') = 'service_role') THEN
    RETURN true;
  END IF;

  -- 2. Authenticated user with is_admin = true in profiles
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Public Read Policies
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts"
  ON public.posts FOR SELECT
  USING (status = 'published' AND (published_at IS NULL OR published_at <= timezone('utc'::text, now())));

DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view tags" ON public.tags;
CREATE POLICY "Public can view tags"
  ON public.tags FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view post_tags" ON public.post_tags;
CREATE POLICY "Public can view post_tags"
  ON public.post_tags FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view approved comments" ON public.comments;
CREATE POLICY "Public can view approved comments"
  ON public.comments FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view likes" ON public.likes;
CREATE POLICY "Public can view likes"
  ON public.likes FOR SELECT
  USING (true);

-- 2. Public Insert & Upsert Policies (User & Guest Interactions)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Public can insert pending comments" ON public.comments;
CREATE POLICY "Public can insert pending comments"
  ON public.comments FOR INSERT
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Public can insert likes" ON public.likes;
CREATE POLICY "Public can insert likes"
  ON public.likes FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update likes" ON public.likes;
CREATE POLICY "Public can update likes"
  ON public.likes FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert view events" ON public.view_events;
CREATE POLICY "Public can insert view events"
  ON public.view_events FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Public can insert newsletter subscribers"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Public can update newsletter subscribers"
  ON public.newsletter_subscribers FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 3. Admin Full Control Policies (CRUD on all tables)
DROP POLICY IF EXISTS "Admin has full access to profiles" ON public.profiles;
CREATE POLICY "Admin has full access to profiles" ON public.profiles FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to site_settings" ON public.site_settings;
CREATE POLICY "Admin has full access to site_settings" ON public.site_settings FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to categories" ON public.categories;
CREATE POLICY "Admin has full access to categories" ON public.categories FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to tags" ON public.tags;
CREATE POLICY "Admin has full access to tags" ON public.tags FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to posts" ON public.posts;
CREATE POLICY "Admin has full access to posts" ON public.posts FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to post_tags" ON public.post_tags;
CREATE POLICY "Admin has full access to post_tags" ON public.post_tags FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to comments" ON public.comments;
CREATE POLICY "Admin has full access to comments" ON public.comments FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to likes" ON public.likes;
CREATE POLICY "Admin has full access to likes" ON public.likes FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to view_events" ON public.view_events;
CREATE POLICY "Admin has full access to view_events" ON public.view_events FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admin has full access to newsletter_subscribers" ON public.newsletter_subscribers FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin has full access to activity_logs" ON public.activity_logs;
CREATE POLICY "Admin has full access to activity_logs" ON public.activity_logs FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Public can view media assets" ON public.media_assets;
CREATE POLICY "Public can view media assets" ON public.media_assets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin has full access to media_assets" ON public.media_assets;
CREATE POLICY "Admin has full access to media_assets" ON public.media_assets FOR ALL USING (public.is_admin());

-- ==============================================================================
-- 4. SEED DEFAULT SETTINGS
-- ==============================================================================
INSERT INTO public.site_settings (key, site_name, default_meta_title)
VALUES ('default', 'NoxWire', 'NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech')
ON CONFLICT (key) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  default_meta_title = EXCLUDED.default_meta_title;

-- ==============================================================================
-- 5. SUPABASE STORAGE BUCKETS & POLICIES (blog-images & avatars)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('blog-images', 'blog-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']),
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public can view blog-images and avatars" ON storage.objects;
CREATE POLICY "Public can view blog-images and avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('blog-images', 'avatars'));

DROP POLICY IF EXISTS "Admin can upload to blog-images and avatars" ON storage.objects;
CREATE POLICY "Admin can upload to blog-images and avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('blog-images', 'avatars') AND
    (public.is_admin() OR auth.role() = 'service_role' OR COALESCE(current_setting('request.jwt.claim.role', true), '') = 'service_role')
  );

DROP POLICY IF EXISTS "Admin can update storage objects" ON storage.objects;
CREATE POLICY "Admin can update storage objects"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('blog-images', 'avatars') AND
    (public.is_admin() OR auth.role() = 'service_role' OR COALESCE(current_setting('request.jwt.claim.role', true), '') = 'service_role')
  );

DROP POLICY IF EXISTS "Admin can delete storage objects" ON storage.objects;
CREATE POLICY "Admin can delete storage objects"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('blog-images', 'avatars') AND
    (public.is_admin() OR auth.role() = 'service_role' OR COALESCE(current_setting('request.jwt.claim.role', true), '') = 'service_role')
  );
