// app/api/getProduct/route.ts
// Returns one product. Example: /api/getProduct?id=abc123
import { NextRequest, NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import { db, authenticate } from "@/lib/database";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product id is required" }, { status: 400 });
  }

  try {
    await authenticate();
    const product = await db.collection("products").getOne(id);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // PocketBase answers 404 when no product has this id
    if (error instanceof ClientResponseError && error.status === 404) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
