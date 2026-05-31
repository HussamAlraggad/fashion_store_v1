import { NextResponse } from "next/server";
import { getUsers } from "@/lib/api";

export async function GET() {
  try {
    const users = await getUsers();
    // Strip passwords for safety
    const safe = users.map(({ password, ...rest }) => rest);
    return NextResponse.json(safe);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
