import { NextResponse } from "next/server";
import { getTagsServer, createTagServer, deleteTagServer } from "@/lib/supabaseServer";

export async function GET() {
  const tags = await getTagsServer();
  return NextResponse.json({ tags });
}

export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
    }
    const tag = await createTagServer(name, slug);
    return NextResponse.json({ tag }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing tag ID" }, { status: 400 });
  }

  const success = await deleteTagServer(id);
  return NextResponse.json({ success });
}
