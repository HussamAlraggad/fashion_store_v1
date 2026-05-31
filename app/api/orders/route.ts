import { NextResponse } from "next/server";
import { getOrders, getOrdersByUserId } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    if (userId) {
      const orders = await getOrdersByUserId(userId);
      return NextResponse.json(orders);
    }

    const allOrders = await getOrders();
    return NextResponse.json(allOrders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
