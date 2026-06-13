import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getProductById } from "@/lib/api";

const dataPath = path.join(process.cwd(), "data", "products.json");

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/products/[id]
 * Body: { inStock?: boolean, stockCount?: number }
 *
 * Toggles stock status or updates stock count.
 */
export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _request.json();
    const raw = await fs.readFile(dataPath, "utf-8");
    const products = JSON.parse(raw);

    const index = products.findIndex((p: any) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Update inStock if provided
    if (body.inStock !== undefined) {
      products[index].inStock = body.inStock;
    }

    // Update stockCount if provided
    if (body.stockCount !== undefined) {
      products[index].stockCount = body.stockCount;
    }

    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

    return NextResponse.json({
      message: "Product updated",
      product: products[index],
    });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
