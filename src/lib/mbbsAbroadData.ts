import mbbsAbroadJson from "@/data/mbbsabroad.json";
import { makeRegionSlug, makeUniqueEntitySlug } from "@/lib/slug";

export type MbbsAbroadCollege = {
  id: number;
  name: string;
  slug: string;
  city: string;
  fees: string;
  duration?: string;
  recognition: string;
  medium?: string;
  ranking: string;
  image: string;
  type: string;
  countryName: string;
  countrySlug: string;
  countryFlag: string;
  countryImage: string;
  countryDescription: string;
};

export type MbbsAbroadCountry = {
  id: number;
  name: string;
  slug: string;
  flag: string;
  image: string;
  description: string;
  universities?: number;
  courses?: string;
  collegeCount: number;
};

type RawCountry = {
  id: number;
  name: string;
  flag: string;
  image: string;
  description: string;
  universities?: number;
  courses?: string;
  colleges: Array<
    Omit<
      MbbsAbroadCollege,
      | "slug"
      | "countryName"
      | "countrySlug"
      | "countryFlag"
      | "countryImage"
      | "countryDescription"
    >
  >;
};

const data = mbbsAbroadJson as { countries: RawCountry[] };
const usedSlugs = new Set<string>();

export const MBBS_ABROAD_COLLEGES: MbbsAbroadCollege[] = data.countries.flatMap(
  (country) => {
    const countrySlug = makeRegionSlug(country.name, country.id);
    return country.colleges.map((college) => ({
      ...college,
      type: college.type || "Private",
      slug: makeUniqueEntitySlug(college.name, college.id, usedSlugs),
      countryName: country.name,
      countrySlug,
      countryFlag: country.flag,
      countryImage: country.image,
      countryDescription: country.description,
    }));
  }
);

export const MBBS_ABROAD_COUNTRIES: MbbsAbroadCountry[] = data.countries.map(
  (country) => ({
    id: country.id,
    name: country.name,
    slug: makeRegionSlug(country.name, country.id),
    flag: country.flag,
    image: country.image,
    description: country.description,
    universities: country.universities,
    courses: country.courses,
    collegeCount: country.colleges.length,
  })
);

export const getAllMbbsAbroadColleges = () => MBBS_ABROAD_COLLEGES;
export const getMbbsAbroadCountries = () => MBBS_ABROAD_COUNTRIES;
export const getMbbsAbroadCollegeBySlug = (slug: string) =>
  MBBS_ABROAD_COLLEGES.find((c) => c.slug === slug);

export function getRelatedMbbsAbroadColleges(
  college: MbbsAbroadCollege,
  limit = 4
) {
  const same = MBBS_ABROAD_COLLEGES.filter(
    (c) => c.countrySlug === college.countrySlug && c.id !== college.id
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = MBBS_ABROAD_COLLEGES.filter(
    (c) => c.id !== college.id && c.countrySlug !== college.countrySlug
  );
  return [...same, ...rest].slice(0, limit);
}

export function getMbbsAbroadStats() {
  const government = MBBS_ABROAD_COLLEGES.filter((c) =>
    (c.type || "").toLowerCase().includes("government")
  ).length;
  return {
    countries: MBBS_ABROAD_COUNTRIES.length,
    colleges: MBBS_ABROAD_COLLEGES.length,
    government,
    private: MBBS_ABROAD_COLLEGES.length - government,
  };
}
