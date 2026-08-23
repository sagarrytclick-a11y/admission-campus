import mdMsJson from "@/data/md-ms.json";
import { generateSlug } from "@/lib/slug";

export type MdMsCollege = {
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
  admissionProcess: string;
  placements: string;
  entranceExams: string[];
  academicHighlights: string[];
  detailedFees: {
    tuitionFee?: string;
    hostelFee?: string;
    otherFees?: string;
  };
  documentsRequired: string[];
  placementStats: {
    medianSalaryUG?: string;
    medianSalaryPG?: string;
    internshipStipend?: string;
    topRecruiters?: string[];
  };
  nriFees: string;
  stateName: string;
  stateSlug: string;
  stateImage: string;
  stateDescription: string;
};

export type MdMsStateSummary = {
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
  slug: string;
  image: string;
  description: string;
  colleges: Array<Omit<MdMsCollege, "slug" | "stateName" | "stateSlug" | "stateImage" | "stateDescription">>;
};

const data = mdMsJson as { states: RawState[] };
const usedSlugs = new Set<string>();

function makeSlug(name: string, id: number): string {
  let slug = generateSlug(name) || `college-${id}`;
  if (usedSlugs.has(slug)) slug = `${slug}-${id}`;
  usedSlugs.add(slug);
  return slug;
}

export const MD_MS_COLLEGES: MdMsCollege[] = data.states.flatMap((state) =>
  state.colleges.map((college) => ({
    ...college,
    slug: makeSlug(college.name, college.id),
    stateName: state.name,
    stateSlug: state.slug,
    stateImage: state.image,
    stateDescription: state.description,
  }))
);

export const MD_MS_STATES: MdMsStateSummary[] = data.states.map((state) => ({
  id: state.id,
  name: state.name,
  slug: state.slug,
  image: state.image,
  description: state.description,
  collegeCount: state.colleges.length,
}));

export const getAllMdMsColleges = () => MD_MS_COLLEGES;
export const getMdMsStates = () => MD_MS_STATES;
export const getMdMsCollegeBySlug = (slug: string) =>
  MD_MS_COLLEGES.find((c) => c.slug === slug);

export function getRelatedMdMsColleges(college: MdMsCollege, limit = 4) {
  const same = MD_MS_COLLEGES.filter(
    (c) => c.stateSlug === college.stateSlug && c.id !== college.id
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = MD_MS_COLLEGES.filter(
    (c) => c.id !== college.id && c.stateSlug !== college.stateSlug
  );
  return [...same, ...rest].slice(0, limit);
}

export function getMdMsStats() {
  const seats = MD_MS_COLLEGES.reduce((s, c) => s + (c.seats || 0), 0);
  const government = MD_MS_COLLEGES.filter((c) =>
    c.type.toLowerCase().includes("government")
  ).length;
  return {
    states: MD_MS_STATES.length,
    colleges: MD_MS_COLLEGES.length,
    seats,
    government,
    private: MD_MS_COLLEGES.length - government,
  };
}
