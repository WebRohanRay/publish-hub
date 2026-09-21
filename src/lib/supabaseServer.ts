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
