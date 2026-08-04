import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

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
  const fallback = humanizeSlug(slug);

  try {
    await connectDB();
    const exam = await Exam.findOne({ slug, is_active: true })
      .select("name slug short_name description")
      .lean();

    if (!exam) {
      return {
        title: fallback,
        description: `${fallback} exam details, dates and guidance on Admission Campus.`,
        alternates: { canonical: `/exams/${slug}` },
      };
    }

    return {
      title: exam.short_name ? `${exam.name} (${exam.short_name})` : exam.name,
      description:
        exam.description?.slice(0, 160) ||
        `${exam.name} — overview, pattern and admission guidance on Admission Campus.`,
      alternates: { canonical: `/exams/${slug}` },
      openGraph: {
        title: exam.name,
        description: exam.description?.slice(0, 160),
        url: `/exams/${slug}`,
      },
    };
  } catch {
    return {
      title: fallback,
      description: `${fallback} exam details on Admission Campus.`,
      alternates: { canonical: `/exams/${slug}` },
    };
  }
}

export default function ExamSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
