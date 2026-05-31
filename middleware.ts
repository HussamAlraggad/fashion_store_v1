import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for route protection.
 *
 * In a production app, this would validate JWTs for age verification.
 * For the prototype, age-gating is handled client-side (sessionStorage),
 * so this middleware provides a basic structure for future enhancement.
 *
 * Protected routes: /admin/*
 * Public routes: /, /auth/*, /api/*
 *
 * Note: Full age-gate enforcement (18+) for /products, /cart, /checkout
 * is done client-side via the AgeGateModal component and auth checks.
 */

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

  // Allow public paths and API routes
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // For prototype: all routes are accessible client-side
  // In production: validate session token here
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
