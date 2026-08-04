import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Blogs & Guides",
  description:
    "Read admission tips, exam guides, and college insights from Admission Campus experts.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Education Blogs & Guides | Admission Campus",
    description:
      "Admission tips, exam guides, and college insights for Indian students.",
    url: "/blogs",
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
