import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/site-identity";

/** Shared Open Graph + Twitter + canonical for static / listing pages */
export function pageSeo(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const url = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const description = opts.description.slice(0, 160);
  const image =
    opts.image || SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main;
  const fullTitle = opts.title.includes(SITE_IDENTITY.name)
    ? opts.title
    : `${opts.title} | ${SITE_IDENTITY.name}`;

  return {
    title: opts.title,
    description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_IDENTITY.name,
      type: opts.type || "website",
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** College / university detail page SEO */
export function collegePageSeo(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const description = opts.description.slice(0, 160);
  const image = opts.image;
  const url = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;

  return {
    title: opts.name,
    description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.name} | ${SITE_IDENTITY.name}`,
      description,
      url,
      siteName: SITE_IDENTITY.name,
      type: "website",
      locale: "en_IN",
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: opts.name }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.name,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: { index: true, follow: true },
  };
}
