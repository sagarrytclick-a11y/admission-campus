import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isValidAdmin(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

function unauthorizedJson() {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}

/** Public quiz endpoints under /api/admin — must stay open for exam-takers. */
function isPublicExamModePath(pathname: string): boolean {
  return (
    pathname.includes("/api/admin/exams/exam-mode/") ||
    /\/api\/admin\/exams\/[^/]+\/exam-mode\/?$/.test(pathname)
  );
}

function requiresAdminApiAuth(pathname: string, method: string): boolean {
  if (pathname.startsWith("/api/admin")) {
    return !isPublicExamModePath(pathname);
  }

  const mutating = method !== "GET" && method !== "HEAD" && method !== "OPTIONS";

  if (pathname === "/api/colleges" || pathname.startsWith("/api/colleges/")) {
    return mutating;
  }

  if (pathname === "/api/categories" || pathname.startsWith("/api/categories/")) {
    return mutating;
  }

  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get("admin_token")?.value;

  // Protect admin UI pages
  if (pathname.startsWith("/admin")) {
    if (!(await isValidAdmin(token))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Protect privileged APIs (UI cookie alone used to be bypassable via curl)
  if (requiresAdminApiAuth(pathname, method)) {
    if (!(await isValidAdmin(token))) {
      return unauthorizedJson();
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/colleges",
    "/api/colleges/:path*",
    "/api/categories",
    "/api/categories/:path*",
  ],
};
