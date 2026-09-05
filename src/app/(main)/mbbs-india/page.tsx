import { Suspense } from "react";
import MbbsIndiaListingClient from "./MbbsIndiaListingClient";
import {
  getAllMbbsIndiaColleges,
  getMbbsIndiaStats,
} from "@/lib/mbbsIndiaData";
import { pageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/SeoJsonLd";

const stats = getMbbsIndiaStats();
const colleges = getAllMbbsIndiaColleges();

export const metadata = pageSeo({
  title: "MBBS Colleges in India | NEET UG Guide",
  description: `Browse ${stats.colleges}+ MBBS colleges across ${stats.states} Indian states with fees, seats, recognition and NEET counselling guidance.`,
  path: "/mbbs-india",
  keywords: [
    "MBBS colleges in India",
    "NEET UG counselling",
    "government medical colleges",
    "private MBBS colleges",
    "medical college fees India",
    "Admission Campus",
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "MBBS India", url: "/mbbs-india" },
        ]}
      />
      <ItemListJsonLd
        name="MBBS Colleges in India"
        description={`Explore ${stats.colleges}+ MBBS colleges with fees, seats and counselling guidance.`}
        url="/mbbs-india"
        items={colleges.map((c) => ({
          name: c.name,
          url: `/mbbs-india/${c.slug}`,
        }))}
      />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
            Loading MBBS India colleges…
          </div>
        }
      >
        <MbbsIndiaListingClient />
      </Suspense>
    </>
  );
}
