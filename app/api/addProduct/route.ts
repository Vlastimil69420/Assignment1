// app/api/addProduct/route.ts
// Adds a new product. Example:
// /api/addProduct?brand=Dell&model=XPS+13&price=1299&description=Small+laptop
import { NextRequest, NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";
import { validateProduct } from "@/lib/validateProduct";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract the variables and check they are valid
    const result = validateProduct(searchParams);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await authenticate();
    const product = await db.collection("products").create(result.data);

    // send the OK back to the client with the created product
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
