import mbbsIndiaJson from "@/data/mbbsindia.json";
import { makeRegionSlug, makeUniqueEntitySlug } from "@/lib/slug";

export type MbbsIndiaCollege = {
  id: number;
  name: string;
  slug: string;
  city: string;
  fees: string;
  seats: number;
  recognition: string;
  ranking: string;
  type: string;
  image: string;
  admissionProcess?: string;
  placements?: string;
  entranceExams?: string[];
  academicHighlights?: string[];
  detailedFees?: {
    tuitionFee?: string;
    hostelFee?: string;
    otherFees?: string;
  };
  documentsRequired?: string[];
  placementStats?: {
    medianSalaryUG?: string;
    medianSalaryPG?: string;
    internshipStipend?: string;
    topRecruiters?: string[];
  };
  nriFees?: string;
  stateName: string;
  stateSlug: string;
  stateImage: string;
  stateDescription: string;
};

export type MbbsIndiaState = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  collegeCount: number;
};

type RawState = {
  id: number;
  name: string;
  image: string;
  description: string;
  colleges: Array<
    Omit<
      MbbsIndiaCollege,
      "slug" | "stateName" | "stateSlug" | "stateImage" | "stateDescription"
    >
  >;
};

const data = mbbsIndiaJson as { states: RawState[] };
const usedSlugs = new Set<string>();

export const MBBS_INDIA_COLLEGES: MbbsIndiaCollege[] = data.states.flatMap(
  (state) => {
    const stateSlug = makeRegionSlug(state.name, state.id);
    return state.colleges.map((college) => ({
      ...college,
      type: college.type || "Private",
      slug: makeUniqueEntitySlug(college.name, college.id, usedSlugs),
      stateName: state.name,
      stateSlug,
      stateImage: state.image,
      stateDescription: state.description,
    }));
  }
);

export const MBBS_INDIA_STATES: MbbsIndiaState[] = data.states.map((state) => ({
  id: state.id,
  name: state.name,
  slug: makeRegionSlug(state.name, state.id),
  image: state.image,
  description: state.description,
  collegeCount: state.colleges.length,
}));

export const getAllMbbsIndiaColleges = () => MBBS_INDIA_COLLEGES;
export const getMbbsIndiaStates = () => MBBS_INDIA_STATES;
export const getMbbsIndiaCollegeBySlug = (slug: string) =>
  MBBS_INDIA_COLLEGES.find((c) => c.slug === slug);

export function getRelatedMbbsIndiaColleges(
  college: MbbsIndiaCollege,
  limit = 4
) {
  const same = MBBS_INDIA_COLLEGES.filter(
    (c) => c.stateSlug === college.stateSlug && c.id !== college.id
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = MBBS_INDIA_COLLEGES.filter(
    (c) => c.id !== college.id && c.stateSlug !== college.stateSlug
  );
  return [...same, ...rest].slice(0, limit);
}

export function getMbbsIndiaStats() {
  const seats = MBBS_INDIA_COLLEGES.reduce((s, c) => s + (c.seats || 0), 0);
  const government = MBBS_INDIA_COLLEGES.filter((c) =>
    (c.type || "").toLowerCase().includes("government")
  ).length;
  return {
    states: MBBS_INDIA_STATES.length,
    colleges: MBBS_INDIA_COLLEGES.length,
    seats,
    government,
    private: MBBS_INDIA_COLLEGES.length - government,
  };
}
