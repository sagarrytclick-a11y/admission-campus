import type { MetadataRoute } from "next";
import { SITE_IDENTITY } from "@/site-identity";
import { getAllMdMsColleges } from "@/lib/mdMsData";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Exam from "@/models/Exam";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import City from "@/models/City";

const SITE_URL = `https://${SITE_IDENTITY.domain}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/colleges",
    "/exams",
    "/md-ms",
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
    priority:
      path === ""
        ? 1
        : path === "/colleges" || path === "/exams" || path === "/md-ms"
          ? 0.9
          : 0.7,
  }));

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  dynamicRoutes.push(
    ...getAllMdMsColleges().map((c) => ({
      url: `${SITE_URL}/md-ms/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  try {
    await connectDB();

    const [colleges, blogs, exams, categories, cities] = await Promise.all([
      College.find({ is_active: true }).select("slug updatedAt").lean(),
      Blog.find({ is_active: true }).select("slug updatedAt").lean(),
      Exam.find({ is_active: true }).select("slug updatedAt").lean(),
      Category.find({ is_active: true }).select("slug updatedAt").lean(),
      City.find({ is_active: true }).select("slug updatedAt").lean(),
    ]);

    dynamicRoutes.push(
      ...colleges
        .filter((c) => c?.slug)
        .map((c) => ({
          url: `${SITE_URL}/colleges/${c.slug}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        })),
      ...blogs
        .filter((b) => b?.slug)
        .map((b) => ({
          url: `${SITE_URL}/blogs/${b.slug}`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ...exams
        .filter((e) => e?.slug)
        .map((e) => ({
          url: `${SITE_URL}/exams/${e.slug}`,
          lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        })),
      ...categories
        .filter((c) => c?.slug)
        .map((c) => ({
          url: `${SITE_URL}/colleges/category/${c.slug}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.75,
        })),
      ...cities
        .filter((c) => c?.slug)
        .map((c) => ({
          url: `${SITE_URL}/colleges/city/${c.slug}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.75,
        }))
    );
  } catch {
    // Keep static + MD/MS routes if DB is unavailable
  }

  return [...staticRoutes, ...dynamicRoutes];
}
