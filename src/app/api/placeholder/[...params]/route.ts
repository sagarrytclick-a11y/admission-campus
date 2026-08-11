import { NextRequest, NextResponse } from "next/server";
import { escapeHtml } from "@/lib/security";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const resolvedParams = await params;
  const [width, height, ...textParts] = resolvedParams.params;
  const rawText = textParts.join("/") || "Placeholder";

  const w = Math.min(Math.max(parseInt(width, 10) || 400, 1), 2000);
  const h = Math.min(Math.max(parseInt(height, 10) || 200, 1), 2000);

  let decoded = "Placeholder";
  try {
    decoded = decodeURIComponent(rawText);
  } catch {
    decoded = rawText;
  }
  const safeText = escapeHtml(decoded).slice(0, 80);

  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
            text-anchor="middle" dy=".3em" fill="#6b7280">
        ${safeText}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
