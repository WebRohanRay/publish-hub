import { NextResponse } from "next/server";
import { getMediaAssetsServer, deleteMediaAssetServer } from "@/lib/supabaseServer";

export async function GET() {
  const assets = await getMediaAssetsServer();
  return NextResponse.json({ assets });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing asset ID" }, { status: 400 });
  }

  const success = await deleteMediaAssetServer(id);
  return NextResponse.json({ success });
}
