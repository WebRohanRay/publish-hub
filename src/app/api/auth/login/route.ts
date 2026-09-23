import { NextResponse } from "next/server";
import {
  createSessionToken,
  ADMIN_DEFAULT_EMAIL,
  ADMIN_DEFAULT_PASSWORD,
  ADMIN_EMAIL_ALIASES,
  COOKIE_NAME,
} from "@/lib/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const expectedEmail = ADMIN_DEFAULT_EMAIL.trim().toLowerCase();
    const validEmails = [expectedEmail, ...ADMIN_EMAIL_ALIASES.map((e) => e.toLowerCase())];

    let isAuthenticated = false;
    let userName = "Administrator";
    let userAvatar = "/avatars/avatar_maya_patel.jpg";
    let userRole = "administrator";

    // 1. Check Supabase Auth if configured (online database is source of truth)
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (!error && data?.user) {
          const { data: profile } = await supabaseServer
            .from("profiles")
            .select("display_name, avatar_url, is_admin")
            .eq("id", data.user.id)
            .maybeSingle();

          if (profile && profile.is_admin) {
            isAuthenticated = true;
            userName = profile.display_name || data.user.email?.split("@")[0] || "Administrator";
            userAvatar = profile.avatar_url || userAvatar;
            userRole = "Super Admin";
          } else {
            return NextResponse.json(
              { error: "Access denied. Your account is not designated as an administrator in the Supabase profiles database." },
              { status: 403 }
            );
          }
        }
      } catch (err) {
        console.warn("Supabase auth sign-in error:", err);
      }
    }

    // 2. Check against environment admin credentials if Supabase not configured or in offline setup
    if (!isAuthenticated && !isSupabaseConfigured()) {
      const validEmails = [expectedEmail, ...ADMIN_EMAIL_ALIASES.map((e) => e.toLowerCase())];
      if (
        validEmails.includes(normalizedEmail) &&
        password === ADMIN_DEFAULT_PASSWORD
      ) {
        isAuthenticated = true;
        userName = process.env.ADMIN_NAME || "Administrator";
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Invalid administrator credentials. Please check your email and password." },
        { status: 401 }
      );
    }

    // Generate signed HMAC token
    const token = await createSessionToken(normalizedEmail);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        email: normalizedEmail,
        name: userName,
        avatar: userAvatar,
        role: userRole,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal authentication error." },
      { status: 500 }
    );
  }
}
