import { NextResponse } from "next/server";
import { getProducts, getProductBySlug } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");

  try {
    let products = await getProducts();

    // Filter by slug
    if (slug) {
      const product = await getProductBySlug(slug);
      return NextResponse.json(product ?? { error: "Not found" }, {
        status: product ? 200 : 404,
      });
    }

    // Filter by category
    if (category) {
      products = products.filter((p) => p.categoryId === category);
    }

    // Filter by featured
    if (featured === "true") {
      products = products.filter((p) => p.featured);
    }

    // Search by name or material
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
