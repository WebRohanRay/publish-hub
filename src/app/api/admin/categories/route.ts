import { NextResponse } from "next/server";
import { getCategoriesServer, createCategoryServer, deleteCategoryServer } from "@/lib/supabaseServer";

export async function GET() {
  const categories = await getCategoriesServer();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }
    const category = await createCategoryServer(body);
    return NextResponse.json({ category }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
  }

  const success = await deleteCategoryServer(id);
  return NextResponse.json({ success });
}
