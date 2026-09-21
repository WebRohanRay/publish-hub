import { NextResponse } from "next/server";
import {
  createSessionToken,
  ADMIN_DEFAULT_EMAIL,
  ADMIN_DEFAULT_PASSWORD,
  COOKIE_NAME,
} from "@/lib/auth";

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

    // Check against configured admin credentials
    if (
      normalizedEmail !== expectedEmail ||
      password !== ADMIN_DEFAULT_PASSWORD
    ) {
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
        name: "Maya Patel",
        role: "administrator",
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
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal authentication error." },
      { status: 500 }
    );
  }
}
