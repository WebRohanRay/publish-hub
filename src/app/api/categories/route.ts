import { NextResponse } from "next/server";
import { getCategoriesServer } from "@/lib/supabaseServer";

export async function GET() {
  const categories = await getCategoriesServer();
  return NextResponse.json({ categories });
}
