import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Admission counselling, college shortlisting, entrance exam guidance, and end-to-end application support.",
  alternates: { canonical: "/service" },
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
