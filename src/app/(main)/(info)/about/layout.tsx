import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "About Us",
  description:
    "Learn about Admission Campus — expert admission counselling for Indian universities, colleges, and entrance exams.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
