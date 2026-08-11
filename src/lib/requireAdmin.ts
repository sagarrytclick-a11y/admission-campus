import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export type AdminAuth = {
  role: string;
};

export type AdminAuthFailure = {
  error: NextResponse;
};

function getJwtSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/**
 * Verifies the httpOnly admin_token cookie issued by /api/login.
 * Use at the start of every privileged API handler.
 */
export async function requireAdmin(): Promise<AdminAuth | AdminAuthFailure> {
  const secret = getJwtSecret();
  if (!secret) {
    return {
      error: NextResponse.json(
        { success: false, message: "Server auth misconfigured" },
        { status: 500 }
      ),
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return {
      error: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") {
      return {
        error: NextResponse.json(
          { success: false, message: "Forbidden" },
          { status: 403 }
        ),
      };
    }
    return { role: "admin" };
  } catch {
    return {
      error: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
}

export function isAdminAuthFailure(
  result: AdminAuth | AdminAuthFailure
): result is AdminAuthFailure {
  return "error" in result;
}

/** Verify admin JWT from a Request cookie header (usable in proxy). */
export async function verifyAdminTokenFromRequest(
  request: Request
): Promise<boolean> {
  const secret = getJwtSecret();
  if (!secret) return false;

  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)admin_token=([^;]+)/);
  const token = match?.[1];
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(decodeURIComponent(token), secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}
