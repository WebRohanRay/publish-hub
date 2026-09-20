import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();

    if (isSupabaseConfigured()) {
      await supabase.from("newsletter_subscribers").upsert(
        {
          email: email.trim(),
          email_normalized: normalized,
          status: "active",
        },
        { onConflict: "email_normalized" }
      );
    }

    // Generic idempotent success
    return NextResponse.json({
      success: true,
      message: "You are subscribed to the Sunday Edition.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
