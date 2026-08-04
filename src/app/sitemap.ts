import type { MetadataRoute } from "next";
import { SITE_IDENTITY } from "@/site-identity";

const SITE_URL = `https://${SITE_IDENTITY.domain}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/colleges",
    "/exams",
    "/blogs",
    "/compare",
    "/about",
    "/contact",
    "/service",
    "/privacy",
    "/term",
    "/tools/neet-score-predictor",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/colleges" || path === "/exams" ? 0.9 : 0.7,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : SITE_URL);

    const [collegesRes, blogsRes, examsRes] = await Promise.all([
      fetch(`${base}/api/colleges?limit=1000&page=1`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${base}/api/blogs`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${base}/api/exams`, { next: { revalidate: 3600 } }).catch(() => null),
    ]);

    if (collegesRes?.ok) {
      const data = await collegesRes.json();
      const colleges = data?.data?.colleges || data?.data || [];
      if (Array.isArray(colleges)) {
        dynamicRoutes.push(
          ...colleges
            .filter((c: { slug?: string; is_active?: boolean }) => c?.slug && c.is_active !== false)
            .map((c: { slug: string; updatedAt?: string }) => ({
              url: `${SITE_URL}/colleges/${c.slug}`,
              lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
              changeFrequency: "weekly" as const,
              priority: 0.8,
            }))
        );
      }
    }

    if (blogsRes?.ok) {
      const data = await blogsRes.json();
      const blogs = data?.data || [];
      if (Array.isArray(blogs)) {
        dynamicRoutes.push(
          ...blogs
            .filter((b: { slug?: string; is_active?: boolean }) => b?.slug && b.is_active !== false)
            .map((b: { slug: string; updatedAt?: string }) => ({
              url: `${SITE_URL}/blogs/${b.slug}`,
              lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
              changeFrequency: "weekly" as const,
              priority: 0.7,
            }))
        );
      }
    }

    if (examsRes?.ok) {
      const data = await examsRes.json();
      const exams = data?.data || [];
      if (Array.isArray(exams)) {
        dynamicRoutes.push(
          ...exams
            .filter((e: { slug?: string; is_active?: boolean }) => e?.slug && e.is_active !== false)
            .map((e: { slug: string; updatedAt?: string }) => ({
              url: `${SITE_URL}/exams/${e.slug}`,
              lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
              changeFrequency: "weekly" as const,
              priority: 0.8,
            }))
        );
      }
    }
  } catch {
    // Static routes only if dynamic fetch fails
  }

  return [...staticRoutes, ...dynamicRoutes];
}
