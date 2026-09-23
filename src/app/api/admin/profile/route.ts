import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { getAdminProfileServer, updateAdminProfileServer } from "@/lib/supabaseServer";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const profile = await getAdminProfileServer();
  return NextResponse.json({ profile });
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { displayName, avatarUrl, id } = body;

    if (!displayName || typeof displayName !== "string") {
      return NextResponse.json({ error: "Display name is required" }, { status: 400 });
    }

    const success = await updateAdminProfileServer({
      id,
      displayName: displayName.trim(),
      avatarUrl: avatarUrl ? avatarUrl.trim() : undefined,
    });

    if (!success) {
      return NextResponse.json({ error: "Failed to update profile in database" }, { status: 500 });
    }

    const updated = await getAdminProfileServer();
    return NextResponse.json({ success: true, profile: updated });
  } catch {
    return NextResponse.json({ error: "Malformed payload" }, { status: 400 });
  }
}
