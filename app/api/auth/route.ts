import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/api";
import { isAtLeast18 } from "@/lib/utils";

/**
 * POST /api/auth/login
 * Body: { email, password }
 *
 * Mock login — validates credentials against users.json
 * In a real app, passwords would be hashed via bcrypt.
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      // In real app, use bcrypt.compare()
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!isAtLeast18(user.birthdate)) {
      return NextResponse.json(
        { error: "You must be 18 or older to access this site" },
        { status: 403 }
      );
    }

    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      user: safeUser,
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/verify?birthdate=YYYY-MM-DD
 * Quick age verification without full login.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const birthdate = searchParams.get("birthdate");

  if (!birthdate) {
    return NextResponse.json(
      { error: "Birthdate is required" },
      { status: 400 }
    );
  }

  const verified = isAtLeast18(birthdate);

  return NextResponse.json({
    verified,
    message: verified
      ? "Age verified successfully"
      : "You must be 18 or older",
  });
}
