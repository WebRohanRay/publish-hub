import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

const ES_COUNTRIES = [
  "ES", "MX", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR"
];
const DE_COUNTRIES = ["DE", "AT", "CH", "LI", "LU"];
const FR_COUNTRIES = ["FR", "BE", "MC", "SN", "CI", "CM", "CD", "MG"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Authentication Barrier
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;
    const session = sessionCookie ? await verifySessionToken(sessionCookie) : null;

    if (!session) {
      if (!isLoginPage) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    // Already authenticated admin visiting login page -> redirect to dashboard
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  // 2. Geo-IP and Country Language Resolution for Public Routes
  const response = NextResponse.next();

  // If user has not explicitly set a language cookie or url param
  const urlLang = request.nextUrl.searchParams.get("lang");
  const existingCookie = request.cookies.get("NEXT_LOCALE")?.value;

  if (urlLang && ["en", "es", "de", "fr"].includes(urlLang)) {
    response.cookies.set("NEXT_LOCALE", urlLang, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  } else if (!existingCookie) {
    const country = (
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      (request as any).geo?.country ||
      ""
    ).toUpperCase();

    const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();

    let detected = "en";
    if (ES_COUNTRIES.includes(country) || acceptLang.startsWith("es")) {
      detected = "es";
    } else if (DE_COUNTRIES.includes(country) || acceptLang.startsWith("de")) {
      detected = "de";
    } else if (FR_COUNTRIES.includes(country) || acceptLang.startsWith("fr")) {
      detected = "fr";
    }

    response.cookies.set("NEXT_LOCALE", detected, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|art/|avatars/|api/).*)",
  ],
};
