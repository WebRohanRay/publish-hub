import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 1. Inspect Edge & CDN Geolocation Headers
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    (request as any).geo?.country ||
    "";

  const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";

  // Country Code Mappings
  const esCountries = [
    "ES", "MX", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU",
    "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR"
  ];
  const deCountries = ["DE", "AT", "CH", "LI", "LU"];
  const frCountries = ["FR", "BE", "MC", "SN", "CI", "CM", "CD", "MG"];

  let locale: "en" | "es" | "de" | "fr" = "en";
  const country = countryHeader.toUpperCase();

  if (esCountries.includes(country)) {
    locale = "es";
  } else if (deCountries.includes(country)) {
    locale = "de";
  } else if (frCountries.includes(country)) {
    locale = "fr";
  } else if (acceptLang.startsWith("es")) {
    locale = "es";
  } else if (acceptLang.startsWith("de")) {
    locale = "de";
  } else if (acceptLang.startsWith("fr")) {
    locale = "fr";
  }

  const response = NextResponse.json({
    country: country || "US",
    locale,
    clientIp,
    detectedFrom: country ? "geo-ip" : acceptLang ? "accept-language" : "default",
  });

  // Set NEXT_LOCALE cookie if client hasn't explicitly set one
  if (!request.cookies.get("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}
