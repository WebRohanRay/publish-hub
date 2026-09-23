import { NextResponse } from "next/server";
import { getSubscribersServer, deleteSubscriberServer } from "@/lib/supabaseServer";

export async function GET() {
  const subscribers = await getSubscribersServer();
  return NextResponse.json({ subscribers });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing subscriber ID" }, { status: 400 });
  }

  const success = await deleteSubscriberServer(id);
  return NextResponse.json({ success });
}
