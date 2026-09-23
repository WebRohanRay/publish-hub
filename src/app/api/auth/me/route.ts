import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { getAdminProfileServer } from "@/lib/supabaseServer";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!sessionToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = await verifySessionToken(sessionToken);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const profile = await getAdminProfileServer(session.email);

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      name: profile.displayName,
      avatar: profile.avatarUrl,
      role: profile.isAdmin ? "Super Admin" : "Editor",
    },
  });
}
