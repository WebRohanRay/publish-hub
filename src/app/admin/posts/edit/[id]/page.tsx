"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { Post } from "@/data/seedData";

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;
      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post || null);
        }
      } catch (err) {
        console.error("Failed to load post for editing:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xs text-muted-text animate-pulse">Loading article from database...</div>
      </div>
    );
  }

  return <PostEditorForm initialPost={post || undefined} />;
}
