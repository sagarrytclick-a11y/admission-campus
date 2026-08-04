import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrance Exams",
  description:
    "Explore NEET, JEE and other entrance exams — dates, syllabus overview, and preparation guidance for Indian students.",
  alternates: { canonical: "/exams" },
  openGraph: {
    title: "Entrance Exams | Admission Campus",
    description:
      "Explore NEET, JEE and other entrance exams with dates and preparation guidance.",
    url: "/exams",
  },
};

export default function ExamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
