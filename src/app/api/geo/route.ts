import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Check headers for language / geo
  const acceptLang = req.headers.get("accept-language") || "";
  let detectedLocale = "en";

  if (acceptLang.startsWith("es")) {
    detectedLocale = "es";
  } else if (acceptLang.startsWith("de")) {
    detectedLocale = "de";
  } else if (acceptLang.startsWith("fr")) {
    detectedLocale = "fr";
  }

  return NextResponse.json({
    locale: detectedLocale,
    fallback: "en",
    timestamp: new Date().toISOString(),
  });
}
