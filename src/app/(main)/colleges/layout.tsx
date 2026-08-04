import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colleges in India",
  description:
    "Browse top colleges and universities across India. Compare courses, fees, rankings, and find the right college for your career.",
  alternates: { canonical: "/colleges" },
  openGraph: {
    title: "Colleges in India | Admission Campus",
    description:
      "Browse top colleges and universities across India with rankings, fees, and admission guidance.",
    url: "/colleges",
  },
};

export default function CollegesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
