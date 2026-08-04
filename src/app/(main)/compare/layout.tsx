import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Colleges",
  description:
    "Compare Indian colleges side by side — fees, rankings, courses, and more to make a confident admission decision.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Colleges | Admission Campus",
    description: "Compare Indian colleges side by side on fees, rankings, and courses.",
    url: "/compare",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
