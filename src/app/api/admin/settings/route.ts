import { NextResponse } from "next/server";
import { getSiteSettingsServer, updateSiteSettingsServer } from "@/lib/supabaseServer";

export async function GET() {
  const settings = await getSiteSettingsServer();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const success = await updateSiteSettingsServer(body);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
