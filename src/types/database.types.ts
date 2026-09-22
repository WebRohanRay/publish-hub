export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          site_name: string;
          logo_url: string | null;
          favicon_url: string | null;
          description: string | null;
          contact_email: string | null;
          featured_post_id: string | null;
          latest_post_count: number;
          popular_post_count: number;
          comments_enabled: boolean;
          comments_require_moderation: boolean;
          allow_guest_comments: boolean;
          default_meta_title: string | null;
          default_meta_description: string | null;
          default_social_image_url: string | null;
          social_links: Json | null;
          updated_at: string;
        };
        Insert: {
          key?: string;
          site_name?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          description?: string | null;
          contact_email?: string | null;
          featured_post_id?: string | null;
          latest_post_count?: number;
          popular_post_count?: number;
          comments_enabled?: boolean;
          comments_require_moderation?: boolean;
          allow_guest_comments?: boolean;
          default_meta_title?: string | null;
          default_meta_description?: string | null;
          default_social_image_url?: string | null;
          social_links?: Json | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          site_name?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          description?: string | null;
          contact_email?: string | null;
          featured_post_id?: string | null;
          latest_post_count?: number;
          popular_post_count?: number;
          comments_enabled?: boolean;
          comments_require_moderation?: boolean;
          allow_guest_comments?: boolean;
          default_meta_title?: string | null;
          default_meta_description?: string | null;
          default_social_image_url?: string | null;
          social_links?: Json | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          featured_image: string | null;
          social_image: string | null;
          category_id: string | null;
          author_id: string | null;
          status: "draft" | "published" | "scheduled" | "archived" | "trash";
          published_at: string | null;
          scheduled_for: string | null;
          reading_time_minutes: number;
          meta_title: string | null;
          meta_description: string | null;
          canonical_url: string | null;
          views_count: number;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          featured_image?: string | null;
          social_image?: string | null;
          category_id?: string | null;
          author_id?: string | null;
          status?: "draft" | "published" | "scheduled" | "archived" | "trash";
          published_at?: string | null;
          scheduled_for?: string | null;
          reading_time_minutes?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          canonical_url?: string | null;
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          featured_image?: string | null;
          social_image?: string | null;
          category_id?: string | null;
          author_id?: string | null;
          status?: "draft" | "published" | "scheduled" | "archived" | "trash";
          published_at?: string | null;
          scheduled_for?: string | null;
          reading_time_minutes?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          canonical_url?: string | null;
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          status: "pending" | "approved" | "spam" | "trash";
          ip_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          status?: "pending" | "approved" | "spam" | "trash";
          ip_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_name?: string;
          author_email?: string;
          content?: string;
          status?: "pending" | "approved" | "spam" | "trash";
          ip_hash?: string | null;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          is_active: boolean;
          source: string | null;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          is_active?: boolean;
          source?: string | null;
          subscribed_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          is_active?: boolean;
          source?: string | null;
          subscribed_at?: string;
        };
      };
    };
  };
}
