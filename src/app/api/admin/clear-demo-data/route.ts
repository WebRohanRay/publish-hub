import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAllDemoPostsServer } from "@/lib/supabaseServer";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  const session = sessionToken ? await verifySessionToken(sessionToken) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized administrator access." }, { status: 401 });
  }

  await clearAllDemoPostsServer();

  return NextResponse.json({
    success: true,
    message: "All demo data has been wiped. Your publication database is now a clean slate for production.",
  });
}
