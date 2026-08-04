import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import City from "@/models/City";

interface Props {
  params: Promise<{ city: string }>;
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const fallback = humanizeSlug(city);

  try {
    await connectDB();
    const cityDoc = await City.findOne({ slug: city, is_active: true })
      .select("name slug description cityImage")
      .lean();

    if (!cityDoc) {
      return {
        title: `Colleges in ${fallback}`,
        description: `Find top colleges in ${fallback}, India — courses, fees and admission guidance.`,
        alternates: { canonical: `/colleges/city/${city}` },
      };
    }

    const description =
      cityDoc.description?.slice(0, 160) ||
      `Explore top colleges in ${cityDoc.name}, India — rankings, courses, fees and admission support.`;

    return {
      title: `Colleges in ${cityDoc.name}`,
      description,
      alternates: { canonical: `/colleges/city/${city}` },
      openGraph: {
        title: `Colleges in ${cityDoc.name} | Admission Campus`,
        description,
        url: `/colleges/city/${city}`,
        images: cityDoc.cityImage ? [{ url: cityDoc.cityImage }] : undefined,
      },
    };
  } catch {
    return {
      title: `Colleges in ${fallback}`,
      description: `Find top colleges in ${fallback}, India.`,
      alternates: { canonical: `/colleges/city/${city}` },
    };
  }
}

export default function CityCollegesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
