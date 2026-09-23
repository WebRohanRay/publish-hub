import { createClient } from "@supabase/supabase-js";
import { Post, Category, CommentItem } from "@/data/seedData";
import { dataStore, ActivityLog } from "./dataStore";
import { isSupabaseConfigured } from "./supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-publish-hub.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-service-key";

// Server-level Supabase client with elevated service role privileges when available
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Row mapper from Supabase snake_case to app TypeScript models
function mapPostFromDb(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    category: row.categories?.name || "General",
    categorySlug: row.categories?.slug || "general",
    status: row.status || "published",
    readingTime: `${row.reading_time_minutes || 5} min read`,
    image: row.featured_image || "/art/dating_comparison_guide.jpg",
    reads: Number(row.view_count) || 0,
    likes: Number(row.like_count) || 0,
    commentsCount: Number(row.comment_count) || 0,
    publishedAt: row.published_at
      ? new Date(row.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "Draft",
    rating: row.rating ? Number(row.rating) : 9.0,
    badge: row.badge || "Verified Review",
    bonusText: row.bonus_text || undefined,
    affiliateUrl: row.affiliate_url || undefined,
    pros: Array.isArray(row.pros) ? row.pros : [],
    cons: Array.isArray(row.cons) ? row.cons : [],
    author: {
      name: row.profiles?.display_name || "Maya Patel",
      avatar: row.profiles?.avatar_url || "/avatars/avatar_maya_patel.jpg",
      role: "Lead Systems Auditor",
    },
    content: row.content || "",
  };
}

// ----------------------------------------------------------------------------
// POSTS CRUD API
// ----------------------------------------------------------------------------
export async function getPostsServer(filter?: { status?: string; search?: string; category?: string }): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return dataStore.getAllPosts(filter);
  }

  try {
    let query = supabaseServer
      .from("posts")
      .select("*, categories(name, slug), profiles(display_name, avatar_url)")
      .order("created_at", { ascending: false });

    if (filter?.status && filter.status !== "all") {
      query = query.eq("status", filter.status);
    }
    if (filter?.category && filter.category !== "all") {
      query = query.eq("categories.slug", filter.category);
    }
    if (filter?.search) {
      query = query.or(`title.ilike.%${filter.search}%,excerpt.ilike.%${filter.search}%`);
    }

    const { data, error } = await query;
    if (error || !data) {
      console.warn("Supabase fetch error, falling back to local store:", error?.message);
      return dataStore.getAllPosts(filter);
    }

    return data.map(mapPostFromDb);
  } catch {
    return dataStore.getAllPosts(filter);
  }
}

export async function getPostBySlugServer(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    return dataStore.getPostBySlug(slug) || null;
  }

  try {
    const { data, error } = await supabaseServer
      .from("posts")
      .select("*, categories(name, slug), profiles(display_name, avatar_url)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return dataStore.getPostBySlug(slug) || null;
    }

    return mapPostFromDb(data);
  } catch {
    return dataStore.getPostBySlug(slug) || null;
  }
}

export async function getPostByIdServer(id: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    return dataStore.getPostById(id) || null;
  }

  try {
    const { data, error } = await supabaseServer
      .from("posts")
      .select("*, categories(name, slug), profiles(display_name, avatar_url)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return dataStore.getPostById(id) || null;
    }

    return mapPostFromDb(data);
  } catch {
    return dataStore.getPostById(id) || null;
  }
}

export async function createPostServer(postData: Partial<Post>): Promise<Post> {
  if (!isSupabaseConfigured()) {
    return dataStore.savePost(postData);
  }

  try {
    const slug =
      postData.slug ||
      (postData.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const payload = {
      title: postData.title || "Untitled Article",
      slug,
      excerpt: postData.excerpt || "",
      content: postData.content || "",
      featured_image: postData.image || "/art/dating_comparison_guide.jpg",
      status: postData.status || "published",
      reading_time_minutes: parseInt(postData.readingTime || "5", 10) || 5,
      rating: postData.rating || 9.0,
      badge: postData.badge || "Verified",
      bonus_text: postData.bonusText || null,
      affiliate_url: postData.affiliateUrl || null,
      pros: postData.pros || [],
      cons: postData.cons || [],
      published_at: postData.status === "published" ? new Date().toISOString() : null,
    };

    const { data, error } = await supabaseServer
      .from("posts")
      .insert(payload)
      .select("*, categories(name, slug), profiles(display_name, avatar_url)")
      .single();

    if (error || !data) {
      console.warn("Supabase insert error, saving to dataStore:", error?.message);
      return dataStore.savePost(postData);
    }

    return mapPostFromDb(data);
  } catch {
    return dataStore.savePost(postData);
  }
}

export async function updatePostServer(id: string, postData: Partial<Post>): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    return dataStore.savePost({ ...postData, id });
  }

  try {
    const updatePayload: any = {
      updated_at: new Date().toISOString(),
    };

    if (postData.title !== undefined) updatePayload.title = postData.title;
    if (postData.excerpt !== undefined) updatePayload.excerpt = postData.excerpt;
    if (postData.content !== undefined) updatePayload.content = postData.content;
    if (postData.status !== undefined) {
      updatePayload.status = postData.status;
      if (postData.status === "published" && !updatePayload.published_at) {
        updatePayload.published_at = new Date().toISOString();
      }
    }
    if (postData.rating !== undefined) updatePayload.rating = postData.rating;
    if (postData.badge !== undefined) updatePayload.badge = postData.badge;
    if (postData.bonusText !== undefined) updatePayload.bonus_text = postData.bonusText;
    if (postData.affiliateUrl !== undefined) updatePayload.affiliate_url = postData.affiliateUrl;
    if (postData.pros !== undefined) updatePayload.pros = postData.pros;
    if (postData.cons !== undefined) updatePayload.cons = postData.cons;
    if (postData.image !== undefined) updatePayload.featured_image = postData.image;

    const { data, error } = await supabaseServer
      .from("posts")
      .update(updatePayload)
      .eq("id", id)
      .select("*, categories(name, slug), profiles(display_name, avatar_url)")
      .single();

    if (error || !data) {
      return dataStore.savePost({ ...postData, id });
    }

    return mapPostFromDb(data);
  } catch {
    return dataStore.savePost({ ...postData, id });
  }
}

export async function deletePostServer(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return dataStore.deletePost(id, true);
  }

  try {
    const { error } = await supabaseServer.from("posts").delete().eq("id", id);
    if (error) {
      return dataStore.deletePost(id, true);
    }
    return true;
  } catch {
    return dataStore.deletePost(id, true);
  }
}

export async function clearAllDemoPostsServer(): Promise<boolean> {
  dataStore.clearDemoData();

  if (isSupabaseConfigured()) {
    try {
      await supabaseServer.from("posts").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabaseServer.from("comments").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    } catch {}
  }

  return true;
}

// ----------------------------------------------------------------------------
// CATEGORIES & COMMENTS API
// ----------------------------------------------------------------------------
export async function getCategoriesServer(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return dataStore.getAllCategories();
  }

  try {
    const { data, error } = await supabaseServer
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return dataStore.getAllCategories();
    }

    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      count: 0,
    }));
  } catch {
    return dataStore.getAllCategories();
  }
}

export async function getCommentsServer(postId?: string): Promise<CommentItem[]> {
  if (!isSupabaseConfigured()) {
    return dataStore.getAllComments();
  }

  try {
    let query = supabaseServer.from("comments").select("*").order("created_at", { ascending: false });
    if (postId) {
      query = query.eq("post_id", postId);
    }

    const { data, error } = await query;
    if (error || !data) {
      return dataStore.getAllComments();
    }

    return data.map((c) => ({
      id: c.id,
      postId: c.post_id,
      postTitle: "Audited Investigation",
      authorName: c.author_name,
      authorEmail: c.author_email || "reader@atlasjournal.io",
      body: c.body,
      createdAt: new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: c.status,
    }));
  } catch {
    return dataStore.getAllComments();
  }
}

export async function createCommentServer(commentData: {
  postId: string;
  author: string;
  email?: string;
  content: string;
}): Promise<CommentItem> {
  if (!isSupabaseConfigured()) {
    return dataStore.addComment({
      postId: commentData.postId,
      postTitle: "Audited Investigation",
      authorName: commentData.author,
      authorEmail: commentData.email || "reader@atlasjournal.io",
      body: commentData.content,
      status: "approved",
    });
  }

  try {
    const { data, error } = await supabaseServer
      .from("comments")
      .insert({
        post_id: commentData.postId,
        author_name: commentData.author,
        author_email: commentData.email || "guest@atlasjournal.io",
        body: commentData.content,
        status: "approved",
      })
      .select()
      .single();

    if (error || !data) {
      return dataStore.addComment({
        postId: commentData.postId,
        postTitle: "Audited Investigation",
        authorName: commentData.author,
        authorEmail: commentData.email || "guest@atlasjournal.io",
        body: commentData.content,
        status: "approved",
      });
    }

    return {
      id: data.id,
      postId: data.post_id,
      postTitle: "Audited Investigation",
      authorName: data.author_name,
      authorEmail: data.author_email || "guest@atlasjournal.io",
      body: data.body,
      createdAt: "Just now",
      status: data.status,
    };
  } catch {
    return dataStore.addComment({
      postId: commentData.postId,
      postTitle: "Audited Investigation",
      authorName: commentData.author,
      authorEmail: commentData.email || "guest@atlasjournal.io",
      body: commentData.content,
      status: "approved",
    });
  }
}

// ----------------------------------------------------------------------------
// SUBSCRIBERS & TELEMETRY API
// ----------------------------------------------------------------------------
export async function addNewsletterSubscriberServer(email: string): Promise<{ success: boolean; message: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: "Thank you for subscribing to Atlas Sunday Edition." };
  }

  try {
    const { error } = await supabaseServer.from("newsletter_subscribers").insert({
      email: normalized,
      email_normalized: normalized,
      status: "active",
      source: "sunday_edition",
    });

    if (error && !error.message.includes("unique")) {
      return { success: true, message: "Subscription confirmed." };
    }

    return { success: true, message: "You are subscribed to the Atlas Sunday Edition." };
  } catch {
    return { success: true, message: "Subscription confirmed." };
  }
}

export async function recordViewEventServer(postId: string, tokenHash: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      await supabaseServer.from("view_events").insert({
        post_id: postId,
        anonymous_token_hash: tokenHash,
      });
    } catch {}
  }
}

export async function getActivityLogsServer(): Promise<ActivityLog[]> {
  return dataStore.getActivityLogs();
}

// ----------------------------------------------------------------------------
// ADMIN DASHBOARD STATS
// ----------------------------------------------------------------------------
export async function getDashboardStatsServer() {
  if (!isSupabaseConfigured()) {
    const posts = dataStore.getAllPosts();
    const comments = dataStore.getAllComments();
    const pending = comments.filter((c) => c.status === "pending");
    return {
      totalReads: posts.reduce((acc, p) => acc + (p.reads || 0), 0),
      totalComments: comments.length,
      pendingCommentsCount: pending.length,
      totalLikes: posts.reduce((acc, p) => acc + (p.likes || 0), 0),
      publishedPostsCount: posts.filter((p) => p.status === "published").length,
      subscribersCount: 12410,
      posts: posts.slice(0, 6),
      pendingComments: pending.slice(0, 5),
      activity: dataStore.getActivityLogs().slice(0, 5),
    };
  }

  try {
    const [postsRes, commentsCountRes, pendingRes, subRes] = await Promise.all([
      supabaseServer
        .from("posts")
        .select("id, title, slug, status, view_count, like_count, comment_count, published_at, categories(name)")
        .order("created_at", { ascending: false }),
      supabaseServer.from("comments").select("id", { count: "exact", head: true }),
      supabaseServer
        .from("comments")
        .select("*, posts(title)")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5),
      supabaseServer.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("status", "active"),
    ]);

    const rawPosts = postsRes.data || [];
    const totalReads = rawPosts.reduce((acc: number, p: any) => acc + (Number(p.view_count) || 0), 0);
    const totalLikes = rawPosts.reduce((acc: number, p: any) => acc + (Number(p.like_count) || 0), 0);
    const publishedCount = rawPosts.filter((p: any) => p.status === "published").length;
    const pendingList = (pendingRes.data || []).map((c: any) => ({
      id: c.id,
      postId: c.post_id,
      postTitle: c.posts?.title || "Audited Investigation",
      authorName: c.author_name,
      authorEmail: c.author_email,
      body: c.body,
      createdAt: new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: c.status,
    }));

    return {
      totalReads,
      totalComments: commentsCountRes.count || 0,
      pendingCommentsCount: pendingList.length,
      totalLikes,
      publishedPostsCount: publishedCount,
      subscribersCount: subRes.count || 0,
      posts: rawPosts.slice(0, 6).map((p: any) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        status: p.status,
        category: p.categories?.name || "General",
        reads: Number(p.view_count) || 0,
        likes: Number(p.like_count) || 0,
        publishedAt: p.published_at ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft",
      })),
      pendingComments: pendingList,
      activity: dataStore.getActivityLogs().slice(0, 5),
    };
  } catch (err) {
    console.error("Dashboard stats query error:", err);
    return {
      totalReads: 0,
      totalComments: 0,
      pendingCommentsCount: 0,
      totalLikes: 0,
      publishedPostsCount: 0,
      subscribersCount: 0,
      posts: [],
      pendingComments: [],
      activity: [],
    };
  }
}

// ----------------------------------------------------------------------------
// SUBSCRIBERS
// ----------------------------------------------------------------------------
export async function getSubscribersServer() {
  if (!isSupabaseConfigured()) {
    return [
      { id: "sub-1", email: "elena.r@studio.design", status: "active", source: "Sunday Edition", date: "Sep 20, 2026" },
      { id: "sub-2", email: "marcus.c@systems.io", status: "active", source: "Article Footer", date: "Sep 19, 2026" },
      { id: "sub-3", email: "liam.s@venture.co", status: "active", source: "Sunday Edition", date: "Sep 18, 2026" },
    ];
  }

  try {
    const { data, error } = await supabaseServer
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((s: any) => ({
      id: s.id,
      email: s.email,
      status: s.status,
      source: s.source || "Website",
      date: new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));
  } catch {
    return [];
  }
}

export async function deleteSubscriberServer(id: string) {
  if (!isSupabaseConfigured()) return true;
  try {
    const { error } = await supabaseServer.from("newsletter_subscribers").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------
// TAGS
// ----------------------------------------------------------------------------
export async function getTagsServer() {
  if (!isSupabaseConfigured()) {
    return [
      { id: "t-1", name: "Dating Apps", slug: "dating-apps", count: 38 },
      { id: "t-2", name: "Online Casino", slug: "online-casino", count: 46 },
      { id: "t-3", name: "Sports Betting", slug: "sports-betting", count: 29 },
    ];
  }

  try {
    const { data, error } = await supabaseServer.from("tags").select("*").order("name", { ascending: true });
    if (error || !data) return [];
    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      count: 0,
    }));
  } catch {
    return [];
  }
}

export async function createTagServer(name: string, slug?: string) {
  const cleanSlug = (slug || name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (!isSupabaseConfigured()) {
    return { id: `tag-${Date.now()}`, name, slug: cleanSlug, count: 0 };
  }

  try {
    const { data, error } = await supabaseServer
      .from("tags")
      .insert({ name, slug: cleanSlug })
      .select()
      .single();
    if (error || !data) return null;
    return { id: data.id, name: data.name, slug: data.slug, count: 0 };
  } catch {
    return null;
  }
}

export async function deleteTagServer(id: string) {
  if (!isSupabaseConfigured()) return true;
  try {
    const { error } = await supabaseServer.from("tags").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------
// MEDIA ASSETS
// ----------------------------------------------------------------------------
export async function getMediaAssetsServer() {
  if (!isSupabaseConfigured()) {
    return dataStore.getAllMedia();
  }

  try {
    const { data, error } = await supabaseServer
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return dataStore.getAllMedia();
    }

    return data.map((m: any) => ({
      id: m.id,
      filename: m.filename,
      publicUrl: m.public_url,
      fileSizeBytes: Number(m.file_size_bytes) || 500000,
      width: m.width || 1920,
      height: m.height || 1080,
      mimeType: m.mime_type || "image/jpeg",
      altText: m.alt_text || "",
      createdAt: new Date(m.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));
  } catch {
    return dataStore.getAllMedia();
  }
}

export async function deleteMediaAssetServer(id: string) {
  if (!isSupabaseConfigured()) {
    dataStore.deleteMedia(id);
    return true;
  }

  try {
    const { error } = await supabaseServer.from("media_assets").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------
// CATEGORIES MUTATION
// ----------------------------------------------------------------------------
export async function createCategoryServer(cat: { name: string; slug?: string; description?: string }) {
  const cleanSlug = (cat.slug || cat.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (!isSupabaseConfigured()) {
    return dataStore.saveCategory({ name: cat.name, slug: cleanSlug, description: cat.description || "" });
  }

  try {
    const { data, error } = await supabaseServer
      .from("categories")
      .insert({ name: cat.name, slug: cleanSlug, description: cat.description || "" })
      .select()
      .single();

    if (error || !data) return null;
    return { id: data.id, name: data.name, slug: data.slug, description: data.description || "", count: 0 };
  } catch {
    return null;
  }
}

export async function deleteCategoryServer(id: string) {
  if (!isSupabaseConfigured()) {
    dataStore.deleteCategory(id);
    return true;
  }

  try {
    const { error } = await supabaseServer.from("categories").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------
// COMMENTS MODERATION
// ----------------------------------------------------------------------------
export async function updateCommentStatusServer(id: string, status: "approved" | "spam" | "trash" | "pending") {
  if (!isSupabaseConfigured()) {
    dataStore.updateCommentStatus(id, status);
    return true;
  }

  try {
    const { error } = await supabaseServer.from("comments").update({ status }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteCommentServer(id: string) {
  if (!isSupabaseConfigured()) {
    dataStore.deleteComment(id);
    return true;
  }

  try {
    const { error } = await supabaseServer.from("comments").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------
// SITE SETTINGS
// ----------------------------------------------------------------------------
export async function getSiteSettingsServer() {
  const defaults = {
    siteName: "NoxWire",
    description: "The Unfiltered Journal of Dating, iGaming & Adult Tech.",
    contactEmail: "editor@noxwire.io",
    commentsEnabled: true,
    commentsRequireModeration: true,
    allowGuestComments: true,
    defaultMetaTitle: "NoxWire — The Unfiltered Journal of Dating, iGaming & Adult Tech",
  };

  if (!isSupabaseConfigured()) return defaults;

  try {
    const { data, error } = await supabaseServer.from("site_settings").select("*").eq("key", "default").single();
    if (error || !data) return defaults;
    return {
      siteName: data.site_name || defaults.siteName,
      description: data.description || defaults.description,
      contactEmail: data.contact_email || defaults.contactEmail,
      commentsEnabled: data.comments_enabled ?? defaults.commentsEnabled,
      commentsRequireModeration: data.comments_require_moderation ?? defaults.commentsRequireModeration,
      allowGuestComments: data.allow_guest_comments ?? defaults.allowGuestComments,
      defaultMetaTitle: data.default_meta_title || defaults.defaultMetaTitle,
    };
  } catch {
    return defaults;
  }
}

export async function updateSiteSettingsServer(settings: any) {
  if (!isSupabaseConfigured()) return true;
  try {
    const { error } = await supabaseServer.from("site_settings").upsert({
      key: "default",
      site_name: settings.siteName,
      description: settings.description,
      contact_email: settings.contactEmail,
      comments_enabled: settings.commentsEnabled,
      comments_require_moderation: settings.commentsRequireModeration,
      allow_guest_comments: settings.allowGuestComments,
      default_meta_title: settings.defaultMetaTitle,
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}
