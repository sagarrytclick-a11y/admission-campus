import type { MetadataRoute } from "next";
import { SITE_IDENTITY } from "@/site-identity";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = `https://${SITE_IDENTITY.domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
