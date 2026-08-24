import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/site-identity";

/** Shared Open Graph + Twitter + canonical for static marketing pages */
export function pageSeo(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const description = opts.description.slice(0, 160);
  const image =
    opts.image || SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main;

  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${SITE_IDENTITY.name}`,
      description,
      url,
      siteName: SITE_IDENTITY.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: image, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
