import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExamBySlug } from "@/lib/slugQueries";
import ExamDetailClient from "./ExamDetailClient";
import { SITE_IDENTITY } from "@/site-identity";

export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fallback = humanizeSlug(slug);

  try {
    const exam = await getExamBySlug(slug);
    if (!exam) {
      return {
        title: fallback,
        description: `${fallback} exam details and guidance on ${SITE_IDENTITY.name}.`,
        alternates: { canonical: `/exams/${slug}` },
      };
    }

    const title = exam.short_name
      ? `${exam.name} (${exam.short_name})`
      : exam.name;
    const description = (
      exam.description ||
      exam.overview?.content ||
      `${exam.name} — dates, pattern and admission guidance on ${SITE_IDENTITY.name}.`
    ).slice(0, 160);

    return {
      title,
      description,
      alternates: { canonical: `/exams/${slug}` },
      openGraph: {
        title: `${exam.name} | ${SITE_IDENTITY.name}`,
        description,
        url: `/exams/${slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: exam.name,
        description,
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: fallback,
      description: `${fallback} exam details on ${SITE_IDENTITY.name}.`,
      alternates: { canonical: `/exams/${slug}` },
    };
  }
}

export default async function ExamPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  let exam = null;
  try {
    exam = await getExamBySlug(slug);
  } catch {
    exam = null;
  }

  if (!exam) notFound();

  const initialExam = JSON.parse(JSON.stringify(exam));

  return <ExamDetailClient slug={slug} initialExam={initialExam} />;
}
