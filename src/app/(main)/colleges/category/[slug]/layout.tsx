import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { SITE_IDENTITY } from "@/site-identity";
import { cache } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const getCategoryBySlug = cache(async (slug: string) => {
  await connectDB();
  return Category.findOne({ slug, is_active: true })
    .select("name slug description image")
    .lean();
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallback = humanizeSlug(slug);

  try {
    const category = await getCategoryBySlug(slug);
    const name = category?.name || fallback;
    const description = (
      category?.description ||
      `Explore top ${name} colleges in India — courses, fees, rankings and admission guidance on ${SITE_IDENTITY.name}.`
    ).slice(0, 160);

    return {
      title: `${name} Colleges`,
      description,
      alternates: { canonical: `/colleges/category/${slug}` },
      openGraph: {
        title: `${name} Colleges | ${SITE_IDENTITY.name}`,
        description,
        url: `/colleges/category/${slug}`,
        images: category?.image ? [{ url: category.image }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} Colleges`,
        description,
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: `${fallback} Colleges`,
      description: `Explore top ${fallback} colleges in India.`,
      alternates: { canonical: `/colleges/category/${slug}` },
    };
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
