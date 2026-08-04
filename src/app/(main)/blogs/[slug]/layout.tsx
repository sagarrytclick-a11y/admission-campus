import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

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
    const blog = await Blog.findOne({ slug, is_active: true })
      .select("title slug content image category")
      .lean();

    if (!blog) {
      return {
        title: fallback,
        description: `${fallback} — Admission Campus blog.`,
        alternates: { canonical: `/blogs/${slug}` },
      };
    }

    const plain = String(blog.content || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      title: blog.title,
      description: plain.slice(0, 160) || `${blog.title} — Admission Campus.`,
      alternates: { canonical: `/blogs/${slug}` },
      openGraph: {
        title: blog.title,
        description: plain.slice(0, 160),
        url: `/blogs/${slug}`,
        type: "article",
        images: blog.image ? [{ url: blog.image }] : undefined,
      },
    };
  } catch {
    return {
      title: fallback,
      description: `${fallback} — Admission Campus blog.`,
      alternates: { canonical: `/blogs/${slug}` },
    };
  }
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
