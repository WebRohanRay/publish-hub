import { Post, Category, CommentItem, INITIAL_POSTS, INITIAL_CATEGORIES, INITIAL_COMMENTS } from "@/data/seedData";
import { supabase, isSupabaseConfigured } from "./supabase";

export interface MediaAsset {
  id: string;
  filename: string;
  publicUrl: string;
  fileSizeBytes: number;
  width: number;
  height: number;
  mimeType: string;
  altText: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  summary: string;
  time: string;
}

const INITIAL_MEDIA: MediaAsset[] = [
  {
    id: "media-1",
    filename: "feature_personal_ai.jpg",
    publicUrl: "/art/feature_personal_ai.jpg",
    fileSizeBytes: 628827,
    width: 1920,
    height: 1080,
    mimeType: "image/jpeg",
    altText: "Mint abstract illustration with green figure and orange sun",
    createdAt: "Sep 20, 2026",
  },
  {
    id: "media-2",
    filename: "story_systems_thinking.jpg",
    publicUrl: "/art/story_systems_thinking.jpg",
    fileSizeBytes: 859834,
    width: 1920,
    height: 1080,
    mimeType: "image/jpeg",
    altText: "Lavender circular artwork for systems thinking",
    createdAt: "Sep 18, 2026",
  },
  {
    id: "media-3",
    filename: "story_inevitable_design.jpg",
    publicUrl: "/art/story_inevitable_design.jpg",
    fileSizeBytes: 693852,
    width: 1920,
    height: 1080,
    mimeType: "image/jpeg",
    altText: "Peach geometric line artwork for design practice",
    createdAt: "Sep 17, 2026",
  },
  {
    id: "media-4",
    filename: "story_collaboration.jpg",
    publicUrl: "/art/story_collaboration.jpg",
    fileSizeBytes: 759598,
    width: 1920,
    height: 1080,
    mimeType: "image/jpeg",
    altText: "Teal grid artwork for remote collaboration",
    createdAt: "Sep 15, 2026",
  },
];

const INITIAL_ACTIVITY: ActivityLog[] = [
  {
    id: "act-1",
    actor: "Maya Patel",
    action: "system",
    summary: "Atlas Editorial production workspace initialized",
    time: "Today, 9:00 AM",
  },
];

// Universal High-Performance DataStore with Zero Forced Seed Data Re-injection
class DataStore {
  private posts: Post[] = [...INITIAL_POSTS];
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private comments: CommentItem[] = [...INITIAL_COMMENTS];
  private media: MediaAsset[] = [...INITIAL_MEDIA];
  private activity: ActivityLog[] = [...INITIAL_ACTIVITY];
  private demoCleared = false;
  private initialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    if (this.initialized) return;
    try {
      const isCleared = localStorage.getItem("atlas_store_demo_cleared") ?? localStorage.getItem("axiom_store_demo_cleared");
      if (isCleared === "true") {
        this.demoCleared = true;
        this.posts = [];
        this.comments = [];
      }

      const storedPosts = localStorage.getItem("atlas_store_posts") ?? localStorage.getItem("axiom_store_posts");
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      }

      const storedCats = localStorage.getItem("atlas_store_categories") ?? localStorage.getItem("axiom_store_categories");
      if (storedCats) {
        this.categories = JSON.parse(storedCats);
      }

      const storedComms = localStorage.getItem("atlas_store_comments") ?? localStorage.getItem("axiom_store_comments");
      if (storedComms) {
        this.comments = JSON.parse(storedComms);
      }

      const storedMedia = localStorage.getItem("atlas_store_media") ?? localStorage.getItem("axiom_store_media");
      if (storedMedia) {
        this.media = JSON.parse(storedMedia);
      }

      const storedAct = localStorage.getItem("atlas_store_activity") ?? localStorage.getItem("axiom_store_activity");
      if (storedAct) {
        this.activity = JSON.parse(storedAct);
      }

      this.initialized = true;
    } catch {}
  }

  private persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("atlas_store_demo_cleared", this.demoCleared ? "true" : "false");
      localStorage.setItem("atlas_store_posts", JSON.stringify(this.posts));
      localStorage.setItem("atlas_store_categories", JSON.stringify(this.categories));
      localStorage.setItem("atlas_store_comments", JSON.stringify(this.comments));
      localStorage.setItem("atlas_store_media", JSON.stringify(this.media));
      localStorage.setItem("atlas_store_activity", JSON.stringify(this.activity));
    } catch {}
  }

  // --- DEMO DATA MANAGEMENT ---
  clearDemoData(): void {
    this.posts = [];
    this.comments = [];
    this.demoCleared = true;
    this.logActivity("cleared", "Wiped all dummy demo articles for clean production launch");
    this.persist();
  }

  resetToCuratedData(): void {
    this.posts = [...INITIAL_POSTS];
    this.categories = [...INITIAL_CATEGORIES];
    this.comments = [...INITIAL_COMMENTS];
    this.demoCleared = false;
    this.logActivity("reset", "Restored curated evaluation templates");
    this.persist();
  }

  isDemoCleared(): boolean {
    this.loadFromStorage();
    return this.demoCleared;
  }

  // --- POSTS ---
  getAllPosts(filter?: { status?: string; search?: string }): Post[] {
    this.loadFromStorage();
    return this.posts.filter((p) => {
      if (filter?.status && filter.status !== "all" && p.status !== filter.status) {
        return false;
      }
      if (filter?.search) {
        const query = filter.search.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }

  getPostById(id: string): Post | undefined {
    this.loadFromStorage();
    return this.posts.find((p) => p.id === id);
  }

  getPostBySlug(slug: string): Post | undefined {
    this.loadFromStorage();
    return this.posts.find((p) => p.slug === slug);
  }

  savePost(postData: Partial<Post>): Post {
    this.loadFromStorage();
    if (postData.id) {
      // Update existing
      const index = this.posts.findIndex((p) => p.id === postData.id);
      if (index !== -1) {
        this.posts[index] = { ...this.posts[index], ...postData } as Post;
        this.logActivity("updated", `Updated post: '${this.posts[index].title}'`);
        this.persist();
        return this.posts[index];
      }
    }

    // Create New Post
    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: postData.title || "Untitled Investigation",
      slug:
        postData.slug ||
        (postData.title || "untitled")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      excerpt: postData.excerpt || "",
      category: postData.category || "Dating & Matchmaking",
      categorySlug: postData.categorySlug || "dating",
      status: (postData.status as any) || "published",
      readingTime: postData.readingTime || "5 min read",
      image: postData.image || "/art/dating_comparison_guide.jpg",
      reads: 0,
      likes: 0,
      commentsCount: 0,
      publishedAt: postData.status === "published" ? "Published today" : "Draft",
      rating: postData.rating || 9.2,
      badge: postData.badge || "Verified Audit",
      bonusText: postData.bonusText,
      affiliateUrl: postData.affiliateUrl,
      pros: postData.pros || ["Audited licensing & regulatory compliance", "Fast payout turnaround"],
      cons: postData.cons || ["Identity KYC verification mandatory"],
      author: {
        name: "Maya Patel",
        avatar: "/avatars/avatar_maya_patel.jpg",
        role: "Lead Systems Auditor",
      },
      content: postData.content || "",
    };

    this.posts.unshift(newPost);
    this.logActivity("created", `Published new article: '${newPost.title}'`);
    this.persist();
    return newPost;
  }

  deletePost(id: string, permanent: boolean = false): boolean {
    this.loadFromStorage();
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) return false;

    if (permanent) {
      const removed = this.posts.splice(index, 1)[0];
      this.logActivity("deleted", `Permanently deleted: '${removed.title}'`);
    } else {
      this.posts[index].status = "trash";
      this.logActivity("trashed", `Moved to trash: '${this.posts[index].title}'`);
    }
    this.persist();
    return true;
  }

  restorePost(id: string): boolean {
    this.loadFromStorage();
    const post = this.posts.find((p) => p.id === id);
    if (!post) return false;
    post.status = "draft";
    this.logActivity("restored", `Restored post from trash: '${post.title}'`);
    this.persist();
    return true;
  }

  // --- CATEGORIES ---
  getAllCategories(): Category[] {
    this.loadFromStorage();
    return this.categories;
  }

  saveCategory(data: Partial<Category>): Category {
    this.loadFromStorage();
    if (data.id) {
      const index = this.categories.findIndex((c) => c.id === data.id);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], ...data } as Category;
        this.persist();
        return this.categories[index];
      }
    }
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: data.name || "New Category",
      slug:
        data.slug ||
        (data.name || "new-category").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: data.description || "",
      count: 0,
    };
    this.categories.push(newCat);
    this.logActivity("created", `Created category '${newCat.name}'`);
    this.persist();
    return newCat;
  }

  deleteCategory(id: string): boolean {
    this.loadFromStorage();
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.categories.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- COMMENTS ---
  getAllComments(statusFilter?: string): CommentItem[] {
    this.loadFromStorage();
    if (!statusFilter || statusFilter === "all") return this.comments;
    return this.comments.filter((c) => c.status === statusFilter);
  }

  addComment(data: Partial<CommentItem>): CommentItem {
    this.loadFromStorage();
    const newComm: CommentItem = {
      id: `comm-${Date.now()}`,
      postId: data.postId || "general",
      postTitle: data.postTitle || "Article Discussion",
      authorName: data.authorName || "Reader",
      authorEmail: data.authorEmail || "reader@atlasjournal.io",
      body: data.body || "",
      createdAt: "Just now",
      status: data.status || "approved",
    };
    this.comments.unshift(newComm);
    this.logActivity("comment", `New comment from ${newComm.authorName}`);
    this.persist();
    return newComm;
  }

  updateCommentStatus(
    id: string,
    status: "approved" | "spam" | "trash" | "pending"
  ): boolean {
    this.loadFromStorage();
    const comm = this.comments.find((c) => c.id === id);
    if (!comm) return false;
    comm.status = status;
    this.logActivity("moderated", `Set comment #${id.slice(-4)} status to ${status}`);
    this.persist();
    return true;
  }

  deleteComment(id: string): boolean {
    this.loadFromStorage();
    const idx = this.comments.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.comments.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- MEDIA ---
  getAllMedia(): MediaAsset[] {
    this.loadFromStorage();
    return this.media;
  }

  uploadMedia(asset: Partial<MediaAsset>): MediaAsset {
    this.loadFromStorage();
    const newAsset: MediaAsset = {
      id: `media-${Date.now()}`,
      filename: asset.filename || "upload.jpg",
      publicUrl: asset.publicUrl || "/art/feature_personal_ai.jpg",
      fileSizeBytes: asset.fileSizeBytes || 512000,
      width: asset.width || 1200,
      height: asset.height || 800,
      mimeType: asset.mimeType || "image/jpeg",
      altText: asset.altText || "",
      createdAt: "Just now",
    };
    this.media.unshift(newAsset);
    this.logActivity("uploaded", `Uploaded media asset '${newAsset.filename}'`);
    this.persist();
    return newAsset;
  }

  deleteMedia(id: string): boolean {
    this.loadFromStorage();
    const idx = this.media.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.media.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- ACTIVITY ---
  getActivityLogs(): ActivityLog[] {
    this.loadFromStorage();
    return this.activity;
  }

  logActivity(action: string, summary: string) {
    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      actor: "Maya Patel",
      action,
      summary,
      time: "Just now",
    };
    this.activity.unshift(log);
    if (this.activity.length > 50) this.activity.pop();
    this.persist();
  }
}

export const dataStore = new DataStore();
