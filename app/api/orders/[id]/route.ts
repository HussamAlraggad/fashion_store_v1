import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "orders.json");

/**
 * PATCH /api/orders/[id]
 * Body: { status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" }
 *
 * Updates the status of an order in the JSON file.
 * For prototype use — writes directly to the filesystem.
 */
export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _request.json();
    const { status } = body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Read current data
    const raw = await fs.readFile(dataPath, "utf-8");
    const orders = JSON.parse(raw);

    // Find the order
    const index = orders.findIndex((o: any) => o.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Update the status
    orders[index].status = status;

    // If delivering, set deliveredAt
    if (status === "delivered") {
      orders[index].deliveredAt = new Date().toISOString();
    }

    // Write back to file
    await fs.writeFile(dataPath, JSON.stringify(orders, null, 2));

    return NextResponse.json({
      message: "Order status updated",
      order: orders[index],
    });
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
