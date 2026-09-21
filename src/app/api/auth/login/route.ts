import { NextResponse } from "next/server";
import {
  createSessionToken,
  ADMIN_DEFAULT_EMAIL,
  ADMIN_DEFAULT_PASSWORD,
  ADMIN_EMAIL_ALIASES,
  COOKIE_NAME,
} from "@/lib/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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
    let userName = "Maya Patel";
    let userRole = "administrator";

    // 1. Check Supabase Auth if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (!error && data?.user) {
          isAuthenticated = true;
          userName = data.user.user_metadata?.display_name || data.user.email?.split("@")[0] || "Maya Patel";
        }
      } catch {
        // Fallback to credentials check
      }
    }

    // 2. Check against configured admin credentials / fallback
    if (!isAuthenticated) {
      if (
        validEmails.includes(normalizedEmail) &&
        password === ADMIN_DEFAULT_PASSWORD
      ) {
        isAuthenticated = true;
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
