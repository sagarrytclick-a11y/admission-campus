import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollegeDetailPage from "./CollegeDetailPage";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import "@/models/Country";
import { CollegeJsonLd, BreadcrumbJsonLd } from "@/components/SeoJsonLd";
import { SITE_IDENTITY } from "@/site-identity";

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

async function getCollege(slug: string) {
  await connectDB();
  return College.findOne({ slug, is_active: true })
    .populate("country_ref", "name slug flag")
    .lean();
}

export async function generateMetadata({
  params,
}: CollegePageProps): Promise<Metadata> {
  const { slug } = await params;
  const fallbackTitle = humanizeSlug(slug);

  try {
    const college = await getCollege(slug);

    if (!college) {
      return {
        title: fallbackTitle,
        description: `Learn more about ${fallbackTitle} on ${SITE_IDENTITY.name}.`,
        alternates: { canonical: `/colleges/${slug}` },
      };
    }

    const description = (
      college.overview?.description ||
      college.about_content ||
      `Explore ${college.name}${college.city ? ` in ${college.city}` : ""} — courses, fees, rankings and admission guidance on ${SITE_IDENTITY.name}.`
    ).slice(0, 160);

    return {
      title: college.name,
      description,
      alternates: { canonical: `/colleges/${slug}` },
      openGraph: {
        title: `${college.name} | ${SITE_IDENTITY.name}`,
        description,
        url: `/colleges/${slug}`,
        type: "website",
        images: college.banner_url ? [{ url: college.banner_url }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: college.name,
        description,
        images: college.banner_url ? [college.banner_url] : undefined,
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: fallbackTitle,
      description: `Learn more about ${fallbackTitle} on ${SITE_IDENTITY.name}.`,
      alternates: { canonical: `/colleges/${slug}` },
    };
  }
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  let college = null;
  try {
    college = await getCollege(slug);
  } catch {
    college = null;
  }

  if (!college) notFound();

  const description =
    college.overview?.description ||
    college.about_content ||
    `Explore admissions, fees and courses at ${college.name}.`;

  const countryName =
    college.country_ref &&
    typeof college.country_ref === "object" &&
    "name" in college.country_ref
      ? String((college.country_ref as { name?: string }).name || "")
      : undefined;

  const initialCollege = JSON.parse(JSON.stringify(college));

  return (
    <>
      <CollegeJsonLd
        name={college.name}
        description={description}
        url={`/colleges/${college.slug}`}
        image={college.banner_url ?? undefined}
        city={college.city ?? undefined}
        country={countryName || undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Colleges", url: "/colleges" },
          { name: college.name, url: `/colleges/${college.slug}` },
        ]}
      />
      <noscript>
        <article>
          <h1>{college.name}</h1>
          <p>{description}</p>
        </article>
      </noscript>
      <CollegeDetailPage slug={slug} initialCollege={initialCollege} />
    </>
  );
}
