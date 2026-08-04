import type { Metadata } from "next";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = humanizeSlug(slug);

  return {
    title: `${name} Colleges`,
    description: `Explore top ${name} colleges in India — courses, fees, rankings and admission guidance.`,
    alternates: { canonical: `/colleges/category/${slug}` },
    openGraph: {
      title: `${name} Colleges | Admission Campus`,
      description: `Explore top ${name} colleges in India.`,
      url: `/colleges/category/${slug}`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
