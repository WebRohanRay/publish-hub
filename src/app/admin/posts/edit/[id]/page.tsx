"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { dataStore } from "@/lib/dataStore";

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id as string;
  const post = dataStore.getPostById(id);

  return <PostEditorForm initialPost={post} />;
}
