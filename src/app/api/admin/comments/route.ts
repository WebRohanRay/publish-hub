import { NextResponse } from "next/server";
import { getCommentsServer, updateCommentStatusServer, deleteCommentServer } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId") || undefined;
  const comments = await getCommentsServer(postId);
  return NextResponse.json({ comments });
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing comment ID or status" }, { status: 400 });
    }
    const success = await updateCommentStatusServer(id, status);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing comment ID" }, { status: 400 });
  }

  const success = await deleteCommentServer(id);
  return NextResponse.json({ success });
}
