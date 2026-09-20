import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { postId, authorName, authorEmail, body } = await req.json();

    if (!postId || !authorName || !authorEmail || !body) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation & input sanitization
    if (!authorEmail.includes("@") || authorName.length > 80 || body.length > 3000) {
      return NextResponse.json(
        { error: "Invalid input length or format" },
        { status: 400 }
      );
    }

    const sanitizedBody = body
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (isSupabaseConfigured()) {
      const { error } = await supabase.from("comments").insert([
        {
          post_id: postId,
          author_name: authorName.trim(),
          author_email: authorEmail.trim().toLowerCase(),
          body: sanitizedBody,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Supabase comment error:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Comment submitted successfully. It will appear once approved by our editorial moderation desk.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
