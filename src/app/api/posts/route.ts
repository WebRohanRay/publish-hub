import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dataStore } from "@/lib/dataStore";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || undefined;

  const posts = dataStore.getAllPosts({ status, search });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  const session = sessionToken ? await verifySessionToken(sessionToken) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const createdPost = dataStore.savePost(body);
    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
