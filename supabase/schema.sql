-- ==============================================================================
-- Atlas Editorial & PublishHub — Complete Supabase PostgreSQL Schema & Security
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (Admin Model)
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
      WHEN LOWER(NEW.email) IN ('webrohanray@gmail.com', 'admin@noxwire.io') THEN true 
      ELSE false 
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    is_admin = CASE 
      WHEN LOWER(NEW.email) IN ('webrohanray@gmail.com', 'admin@noxwire.io') THEN true 
      ELSE public.profiles.is_admin 
    END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Site Settings (Single record with key = 'default')
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

-- 3. Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Tags
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Posts
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

-- 6. Post Tags
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 7. Comments (Private author emails, never exposed publicly)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL, -- Never exposed in public select views
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'trash')),
  source_ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Likes (Anonymous deduplicated by token hash)
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  anonymous_token_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_post_token_like UNIQUE (post_id, anonymous_token_hash)
);

-- 9. View Events (Privacy safe deduplication)
CREATE TABLE IF NOT EXISTS public.view_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  anonymous_token_hash TEXT NOT NULL,
  referrer TEXT,
  device_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Newsletter Subscribers (Unique email normalization)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT DEFAULT 'sunday_edition',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  unsubscribed_at TIMESTAMPTZ
);

-- 11. Activity Logs
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
-- INDEXES FOR FAST QUERYING
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

-- Helper admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Public Read Policies
CREATE POLICY "Public can view published posts"
  ON public.posts FOR SELECT
  USING (status = 'published' AND published_at <= timezone('utc'::text, now()));

CREATE POLICY "Public can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view tags"
  ON public.tags FOR SELECT
  USING (true);

CREATE POLICY "Public can view approved comments"
  ON public.comments FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- 2. Public Insert Policies (Guest interactions)
CREATE POLICY "Public can insert pending comments"
  ON public.comments FOR INSERT
  WITH CHECK (status = 'pending');

CREATE POLICY "Public can insert likes"
  ON public.likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert view events"
  ON public.view_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert newsletter subscribers"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- 3. Admin Full Control Policies
CREATE POLICY "Admin has full access to profiles" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to site_settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to tags" ON public.tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to posts" ON public.posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to post_tags" ON public.post_tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to comments" ON public.comments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to likes" ON public.likes FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to view_events" ON public.view_events FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to newsletter_subscribers" ON public.newsletter_subscribers FOR ALL USING (public.is_admin());
CREATE POLICY "Admin has full access to activity_logs" ON public.activity_logs FOR ALL USING (public.is_admin());

-- Seed Default Settings
INSERT INTO public.site_settings (key, site_name, default_meta_title)
VALUES ('default', 'NoxWire', 'NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech')
ON CONFLICT (key) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  default_meta_title = EXCLUDED.default_meta_title;

-- ==============================================================================
-- 7. Supabase Storage Buckets & Policies (blog-images & avatars)
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
    (public.is_admin() OR auth.role() = 'service_role')
  );

DROP POLICY IF EXISTS "Admin can update storage objects" ON storage.objects;
CREATE POLICY "Admin can update storage objects"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('blog-images', 'avatars') AND
    (public.is_admin() OR auth.role() = 'service_role')
  );

DROP POLICY IF EXISTS "Admin can delete storage objects" ON storage.objects;
CREATE POLICY "Admin can delete storage objects"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('blog-images', 'avatars') AND
    (public.is_admin() OR auth.role() = 'service_role')
  );

