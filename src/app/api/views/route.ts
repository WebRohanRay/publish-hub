import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { postId, tokenHash, referrer, deviceType } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured() && tokenHash) {
      // Record view event
      await supabase.from("view_events").insert([
        {
          post_id: postId,
          anonymous_token_hash: tokenHash,
          referrer: referrer || null,
          device_type: deviceType || "desktop",
        },
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
