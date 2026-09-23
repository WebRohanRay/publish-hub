import { NextResponse } from "next/server";
import { getDashboardStatsServer } from "@/lib/supabaseServer";

export async function GET() {
  const stats = await getDashboardStatsServer();
  return NextResponse.json(stats);
}
