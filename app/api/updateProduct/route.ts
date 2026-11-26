// app/api/updateProduct/route.ts
// Updates an existing product. Called with the PUT method, for example:
// /api/updateProduct?id=abc123&brand=Dell&model=XPS+13&price=1199&description=Small+laptop
import { NextRequest, NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import { db, authenticate } from "@/lib/database";
import { validateProduct } from "@/lib/validateProduct";

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product id is required" }, { status: 400 });
  }

  // Extract the new values and check they are valid
  const result = validateProduct(searchParams);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    await authenticate();
    const product = await db.collection("products").update(id, result.data);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    if (error instanceof ClientResponseError && error.status === 404) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
