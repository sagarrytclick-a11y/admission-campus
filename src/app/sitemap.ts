import type { MetadataRoute } from "next";
import { SITE_IDENTITY } from "@/site-identity";
import { getAllMdMsColleges } from "@/lib/mdMsData";
import { getAllMbbsIndiaColleges } from "@/lib/mbbsIndiaData";
import { getAllMbbsAbroadColleges } from "@/lib/mbbsAbroadData";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Exam from "@/models/Exam";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import City from "@/models/City";

const SITE_URL = `https://${SITE_IDENTITY.domain}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "daily" as const },
    { path: "/mbbs-india", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/mbbs-abroad", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/md-ms", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/colleges", priority: 0.9, changeFrequency: "weekly" as const },
    {
      path: "/colleges/category/engineering",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/colleges/category/management",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    { path: "/exams", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blogs", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/compare", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/service", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/term", priority: 0.3, changeFrequency: "yearly" as const },
    {
      path: "/tools/neet-score-predictor",
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...getAllMdMsColleges().map((c) => ({
      url: `${SITE_URL}/md-ms/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllMbbsIndiaColleges().map((c) => ({
      url: `${SITE_URL}/mbbs-india/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllMbbsAbroadColleges().map((c) => ({
      url: `${SITE_URL}/mbbs-abroad/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

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
    // Keep static + medical catalogue routes if DB is unavailable
  }

  return [...staticRoutes, ...dynamicRoutes];
}
