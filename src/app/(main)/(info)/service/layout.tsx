import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Our Services",
  description:
    "Admission counselling, college shortlisting, entrance exam guidance, and end-to-end application support.",
  path: "/service",
});

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
