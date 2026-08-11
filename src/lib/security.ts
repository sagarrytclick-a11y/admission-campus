/**
 * Shared security helpers: escaping, regex safety, simple rate limiting.
 */

export function escapeHtml(input: unknown): string {
  const str = String(input ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape regex metacharacters so user input cannot break $regex queries. */
export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Cap search length to reduce ReDoS risk even after escaping. */
export function sanitizeSearchTerm(input: string | null | undefined, maxLen = 100): string | null {
  if (!input) return null;
  const trimmed = input.trim().slice(0, maxLen);
  return trimmed.length ? trimmed : null;
}

/** Render plain-text CMS content safely for HTML (newlines → <br />). */
export function plainTextToSafeHtml(content: string): string {
  return escapeHtml(content).replace(/\r\n|\r|\n/g, "<br />");
}

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

/**
 * In-memory rate limiter (per-instance). Good enough to blunt brute-force /
 * spam on login and contact endpoints in a single Node process.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}
