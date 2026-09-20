import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { postId, tokenHash } = await req.json();

    if (!postId || !tokenHash) {
      return NextResponse.json(
        { error: "Post ID and token hash are required" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      // Upsert or insert unique like
      await supabase.from("likes").upsert(
        {
          post_id: postId,
          anonymous_token_hash: tokenHash,
        },
        { onConflict: "post_id,anonymous_token_hash" }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
