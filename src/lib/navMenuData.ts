import navMdMs from "@/data/nav-md-ms.json";
import navMbbsIndia from "@/data/nav-mbbs-india.json";
import navMbbsAbroad from "@/data/nav-mbbs-abroad.json";

export type NavCollege = {
  id: number;
  name: string;
  slug: string;
  type: string;
};

export type NavRegion = {
  id: number;
  name: string;
  slug: string;
  colleges: NavCollege[];
};

export type NavStaticMenu = {
  key: "md-ms" | "mbbs-india" | "mbbs-abroad";
  label: string;
  title: string;
  description: string;
  allHref: string;
  allLabel: string;
  filterLabel: string;
  regions: NavRegion[];
  collegeHref: (slug: string) => string;
};

function isGovt(type?: string) {
  return /govt|government/i.test(type || "");
}

export function splitByType(colleges: NavCollege[]) {
  const government: NavCollege[] = [];
  const privateColleges: NavCollege[] = [];
  for (const c of colleges) {
    if (isGovt(c.type)) government.push(c);
    else privateColleges.push(c);
  }
  return { government, private: privateColleges };
}

export const NAV_STATIC_MENUS: NavStaticMenu[] = [
  {
    key: "md-ms",
    label: "MD / MS",
    title: "MD / MS in India",
    description:
      "Top PG medical colleges, NEET PG counselling, fees & admission guidance.",
    allHref: "/md-ms",
    allLabel: "All Colleges",
    filterLabel: "All States",
    regions: (navMdMs as { states: NavRegion[] }).states,
    collegeHref: (slug) => `/md-ms/${slug}`,
  },
  {
    key: "mbbs-india",
    label: "MBBS India",
    title: "MBBS in India",
    description:
      "Top medical colleges, NEET counselling, fees & admission guidance.",
    allHref: "/mbbs-india",
    allLabel: "All Colleges",
    filterLabel: "All States",
    regions: (navMbbsIndia as { states: NavRegion[] }).states,
    collegeHref: (slug) => `/mbbs-india/${slug}`,
  },
  {
    key: "mbbs-abroad",
    label: "MBBS Abroad",
    title: "MBBS Abroad",
    description:
      "NMC-recognised universities abroad with fees, duration & country guidance.",
    allHref: "/mbbs-abroad",
    allLabel: "All Colleges",
    filterLabel: "All Countries",
    regions: (navMbbsAbroad as { countries: NavRegion[] }).countries,
    collegeHref: (slug) => `/mbbs-abroad/${slug}`,
  },
];
