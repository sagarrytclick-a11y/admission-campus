import type { Metadata } from "next";
import { Suspense } from "react";
import MdMsListingClient from "./MdMsListingClient";
import { getMdMsStats } from "@/lib/mdMsData";

const stats = getMdMsStats();

export const metadata: Metadata = {
  title: "MD / MS Colleges in India | NEET PG Guide",
  description: `Browse ${stats.colleges}+ MD and MS colleges across ${stats.states} Indian states with fees, seats, recognition, counselling process and placements. NEET PG college guide.`,
  alternates: { canonical: "/md-ms" },
  openGraph: {
    title: "MD / MS Colleges in India | NEET PG Guide",
    description: `Compare ${stats.colleges}+ postgraduate medical colleges — fees, seats, NRI quota and counselling info.`,
    url: "/md-ms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD / MS Colleges in India",
    description: `Explore ${stats.colleges}+ MD/MS colleges with fees, seats and counselling guidance.`,
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
          Loading MD/MS colleges…
        </div>
      }
    >
      <MdMsListingClient />
    </Suspense>
  );
}
