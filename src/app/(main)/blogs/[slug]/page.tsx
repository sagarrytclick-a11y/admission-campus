import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/slugQueries";
import BlogDetailClient from "./BlogDetailClient";
import { SITE_IDENTITY } from "@/site-identity";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/SeoJsonLd";

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
    const blog = await getBlogBySlug(slug);
    if (!blog) {
      return {
        title: fallback,
        description: `${fallback} — ${SITE_IDENTITY.name} blog.`,
        alternates: { canonical: `/blogs/${slug}` },
      };
    }

    const description = String(blog.content || blog.title || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    return {
      title: blog.title,
      description,
      alternates: { canonical: `/blogs/${slug}` },
      openGraph: {
        title: `${blog.title} | ${SITE_IDENTITY.name}`,
        description,
        url: `/blogs/${slug}`,
        type: "article",
        images: blog.image ? [{ url: blog.image }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: blog.image ? [blog.image] : undefined,
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: fallback,
      description: `${fallback} — ${SITE_IDENTITY.name} blog.`,
      alternates: { canonical: `/blogs/${slug}` },
    };
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  let blog = null;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    blog = null;
  }

  if (!blog) notFound();

  const initialBlog = JSON.parse(JSON.stringify(blog));
  const plain = String(blog.content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return (
    <>
      <ArticleJsonLd
        title={blog.title}
        description={plain}
        url={`https://${SITE_IDENTITY.domain}/blogs/${slug}`}
        image={blog.image}
        datePublished={blog.createdAt}
        dateModified={blog.updatedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `https://${SITE_IDENTITY.domain}/` },
          { name: "Blogs", url: `https://${SITE_IDENTITY.domain}/blogs` },
          {
            name: blog.title,
            url: `https://${SITE_IDENTITY.domain}/blogs/${slug}`,
          },
        ]}
      />
      <BlogDetailClient slug={slug} initialBlog={initialBlog} />
    </>
  );
}
