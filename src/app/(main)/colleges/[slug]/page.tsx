import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollegeDetailPage from "./CollegeDetailPage";
import { connectDB } from "@/lib/db";
import College from "@/models/College";

interface CollegePageProps {
  params: Promise<{ slug: string }>;
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: CollegePageProps): Promise<Metadata> {
  const { slug } = await params;
  const fallbackTitle = humanizeSlug(slug);

  try {
    await connectDB();
    const college = await College.findOne({ slug, is_active: true })
      .select("name slug city overview about_content banner_url")
      .lean();

    if (!college) {
      return {
        title: fallbackTitle,
        description: `Learn more about ${fallbackTitle} on Admission Campus.`,
        alternates: { canonical: `/colleges/${slug}` },
      };
    }

    const description =
      college.overview?.description ||
      college.about_content ||
      `Explore ${college.name}${college.city ? ` in ${college.city}` : ""} — courses, fees, rankings and admission guidance on Admission Campus.`;

    return {
      title: college.name,
      description: description.slice(0, 160),
      alternates: { canonical: `/colleges/${slug}` },
      openGraph: {
        title: `${college.name} | Admission Campus`,
        description: description.slice(0, 160),
        url: `/colleges/${slug}`,
        type: "website",
        images: college.banner_url ? [{ url: college.banner_url }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: college.name,
        description: description.slice(0, 160),
        images: college.banner_url ? [college.banner_url] : undefined,
      },
    };
  } catch {
    return {
      title: fallbackTitle,
      description: `Learn more about ${fallbackTitle} on Admission Campus.`,
      alternates: { canonical: `/colleges/${slug}` },
    };
  }
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params;
  if (!slug) notFound();
  return <CollegeDetailPage slug={slug} />;
}
