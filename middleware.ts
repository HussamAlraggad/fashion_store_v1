import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Session {
  id: string;
  email: string;
  name: string;
  role: string;
  birthdate: string;
  ageVerified: boolean;
}

function getSession(request: NextRequest): Session | null {
  const cookie = request.cookies.get("session");
  if (!cookie?.value) return null;
  try {
    const json = atob(cookie.value);
    const decoded = JSON.parse(json);
    if (decoded && decoded.id) return decoded as Session;
  } catch {}
  return null;
}

const publicPaths = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/_next",
  "/api",
];

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = getSession(request);
  const isAuthenticated = session !== null;

  // Admin routes require admin role
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Shop routes require age-verified session
  if (
    pathname.startsWith("/products") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout")
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (!session.ageVerified) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
