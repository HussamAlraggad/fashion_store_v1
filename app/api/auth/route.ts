import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/api";
import { isAtLeast18 } from "@/lib/utils";

function buildSession(user: { id: string; email: string; name: string; role: string; birthdate: string }) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    birthdate: user.birthdate,
    ageVerified: isAtLeast18(user.birthdate),
  };
}

function setSessionCookie(response: NextResponse, session: object) {
  const encoded = Buffer.from(JSON.stringify(session)).toString("base64");
  response.cookies.set("session", encoded, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

/**
 * POST /api/auth/login
 * Body: { email, password }
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

    const session = buildSession(user);
    const { password: _, ...safeUser } = user;

    const response = NextResponse.json({
      user: safeUser,
      message: "Login successful",
    });
    setSessionCookie(response, session);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/auth/register
 * Body: { name, email, password, birthdate }
 */
export async function PUT(request: Request) {
  try {
    const { name, email, password, birthdate } = await request.json();

    if (!name || !email || !password || !birthdate) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isAtLeast18(birthdate)) {
      return NextResponse.json(
        { error: "You must be 18 or older to register" },
        { status: 403 }
      );
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      password,
      name,
      role: "customer" as const,
      birthdate,
      ageVerified: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const session = buildSession(newUser);
    const { password: _, ...safeUser } = newUser;

    const response = NextResponse.json({
      user: safeUser,
      message: "Account created successfully",
    }, { status: 201 });
    setSessionCookie(response, session);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Registration failed" },
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

/**
 * POST /api/auth/logout
 */
export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("session", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
