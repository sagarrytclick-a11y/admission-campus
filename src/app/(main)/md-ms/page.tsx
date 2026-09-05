import { Suspense } from "react";
import MdMsListingClient from "./MdMsListingClient";
import { getAllMdMsColleges, getMdMsStats } from "@/lib/mdMsData";
import { pageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/SeoJsonLd";

const stats = getMdMsStats();
const colleges = getAllMdMsColleges();

export const metadata = pageSeo({
  title: "MD / MS Colleges in India | NEET PG Guide",
  description: `Browse ${stats.colleges}+ MD and MS colleges across ${stats.states} Indian states with fees, seats, recognition, counselling process and placements.`,
  path: "/md-ms",
  keywords: [
    "MD MS colleges India",
    "NEET PG counselling",
    "postgraduate medical colleges",
    "MD MS fees seats",
    "Admission Campus",
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "MD/MS Colleges", url: "/md-ms" },
        ]}
      />
      <ItemListJsonLd
        name="MD / MS Colleges in India"
        description={`Explore ${stats.colleges}+ postgraduate medical colleges with fees and counselling guidance.`}
        url="/md-ms"
        items={colleges.map((c) => ({
          name: c.name,
          url: `/md-ms/${c.slug}`,
        }))}
      />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
            Loading MD/MS colleges…
          </div>
        }
      >
        <MdMsListingClient />
      </Suspense>
    </>
  );
}
