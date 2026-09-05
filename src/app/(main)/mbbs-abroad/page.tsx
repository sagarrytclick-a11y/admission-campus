import { Suspense } from "react";
import MbbsAbroadListingClient from "./MbbsAbroadListingClient";
import {
  getAllMbbsAbroadColleges,
  getMbbsAbroadStats,
} from "@/lib/mbbsAbroadData";
import { pageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/SeoJsonLd";

const stats = getMbbsAbroadStats();
const colleges = getAllMbbsAbroadColleges();

export const metadata = pageSeo({
  title: "MBBS Abroad | Study Medicine Overseas",
  description: `Explore ${stats.colleges}+ MBBS universities across ${stats.countries} countries with fees, duration and NMC recognition.`,
  path: "/mbbs-abroad",
  keywords: [
    "MBBS abroad",
    "study MBBS overseas",
    "MBBS in Russia",
    "MBBS in Georgia",
    "NMC recognised universities",
    "Admission Campus",
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "MBBS Abroad", url: "/mbbs-abroad" },
        ]}
      />
      <ItemListJsonLd
        name="MBBS Universities Abroad"
        description={`Compare ${stats.colleges}+ overseas MBBS universities with fees and recognition.`}
        url="/mbbs-abroad"
        items={colleges.map((c) => ({
          name: c.name,
          url: `/mbbs-abroad/${c.slug}`,
        }))}
      />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
            Loading MBBS Abroad universities…
          </div>
        }
      >
        <MbbsAbroadListingClient />
      </Suspense>
    </>
  );
}
