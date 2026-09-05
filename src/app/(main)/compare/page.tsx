"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Plus,
  X,
  ArrowUpDown,
  Star,
  MapPin,
  GraduationCap,
  Award,
  TrendingUp,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import compareCatalog from "@/data/compare-catalog.json";

type CollegeSource = "api" | "md-ms" | "mbbs-india" | "mbbs-abroad";

type CompareCollege = {
  id: string;
  name: string;
  slug: string;
  city: string;
  locationLabel: string;
  image?: string;
  source: CollegeSource;
  sourceLabel: string;
  href: string;
  fees: string;
  ranking: string;
  type: string;
  exams: string;
  established: string;
  recognition: string;
  seats: string;
  about: string;
};

const STATIC_CATALOGUE = compareCatalog as CompareCollege[];

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function normalizeApiCollege(c: Record<string, unknown>): CompareCollege {
  const ranking = c.ranking;
  let rankingText = "N/A";
  if (typeof ranking === "object" && ranking && "country_ranking" in ranking) {
    rankingText = `#${(ranking as { country_ranking?: string }).country_ranking || "N/A"}`;
  } else if (ranking != null && ranking !== "") {
    rankingText = `#${ranking}`;
  }

  const feesStructure = c.fees_structure as
    | { courses?: { annual_tuition_fee?: string; course_name?: string }[] }
    | undefined;
  const feesFromCourse = feesStructure?.courses?.[0]?.annual_tuition_fee;
  const fees =
    (feesFromCourse && String(feesFromCourse).replace(/^:\s*/, "")) ||
    (c.fees != null ? `₹${c.fees}` : "N/A");

  const country = c.country_ref as { name?: string } | undefined;
  const city = String(c.city || "");

  return {
    id: `api-${c._id || c.slug}`,
    name: String(c.name || ""),
    slug: String(c.slug || ""),
    city,
    locationLabel: [city, country?.name].filter(Boolean).join(", "),
    image: typeof c.banner_url === "string" ? c.banner_url : undefined,
    source: "api",
    sourceLabel: "College",
    href: `/colleges/${c.slug}`,
    fees,
    ranking: rankingText,
    type: Array.isArray(c.categories)
      ? (c.categories as string[]).join(", ") || "—"
      : "—",
    exams: Array.isArray(c.exams)
      ? (c.exams as string[]).join(", ") || "N/A"
      : "N/A",
    established: String(c.establishment_year || "N/A"),
    recognition: "N/A",
    seats: "N/A",
    about: String(
      (c.overview as { description?: string } | undefined)?.description ||
        c.about_content ||
        "No description available"
    ),
  };
}

function filterStatic(term: string): CompareCollege[] {
  const q = term.trim().toLowerCase();
  if (!q) return STATIC_CATALOGUE.slice(0, 12);
  return STATIC_CATALOGUE.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.locationLabel.toLowerCase().includes(q) ||
      c.sourceLabel.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
  ).slice(0, 24);
}

async function fetchApiColleges(search: string): Promise<CompareCollege[]> {
  const params = new URLSearchParams({
    limit: "30",
    ...(search.trim() ? { search: search.trim() } : {}),
  });
  const res = await fetch(`/api/colleges?${params}`);
  if (!res.ok) throw new Error("Failed to fetch colleges");
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to fetch colleges");
  return (json.data?.colleges || []).map(normalizeApiCollege);
}

const METRICS: {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  get: (c: CompareCollege) => string;
}[] = [
  { key: "ranking", label: "Ranking", icon: Star, get: (c) => c.ranking },
  { key: "fees", label: "Fees", icon: TrendingUp, get: (c) => c.fees },
  { key: "type", label: "Type / Category", icon: Award, get: (c) => c.type },
  { key: "seats", label: "Seats", icon: GraduationCap, get: (c) => c.seats },
  { key: "exams", label: "Entrance Exams", icon: CheckCircle2, get: (c) => c.exams },
  {
    key: "recognition",
    label: "Recognition",
    icon: CheckCircle2,
    get: (c) => c.recognition,
  },
  {
    key: "established",
    label: "Established",
    icon: GraduationCap,
    get: (c) => c.established,
  },
];

export default function CompareColleges() {
  const [selected, setSelected] = useState<CompareCollege[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebouncedValue(searchTerm, 280);
  const boxRef = useRef<HTMLDivElement>(null);

  const { data: apiColleges = [], isFetching, isError, refetch } = useQuery({
    queryKey: ["compare-colleges", debounced],
    queryFn: () => fetchApiColleges(debounced),
    staleTime: 60_000,
  });

  const results = useMemo(() => {
    const staticHits = filterStatic(debounced);
    const selectedIds = new Set(selected.map((s) => s.id));
    const merged = [...staticHits, ...apiColleges].filter(
      (c, i, arr) =>
        !selectedIds.has(c.id) &&
        arr.findIndex((x) => x.id === c.id) === i
    );
    return merged.slice(0, 18);
  }, [apiColleges, debounced, selected]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const addCollege = (college: CompareCollege) => {
    if (selected.length >= 3) return;
    if (selected.some((s) => s.id === college.id)) return;
    setSelected((prev) => [...prev, college]);
    setSearchTerm("");
    setOpen(false);
  };

  const removeCollege = (id: string) => {
    setSelected((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Compare Colleges
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Search MBBS, MD/MS and other colleges — compare up to 3 side by side
            </p>
          </div>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {selected.length < 3 && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Add colleges to compare
              </h2>
              <span className="rounded-full bg-[#E8F1FF] px-3 py-1 text-xs font-bold text-[#0066F5]">
                {selected.length}/3 selected
              </span>
            </div>

            <div ref={boxRef} className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Search by college, city, state or country…"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-11 pl-10 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#0066F5] focus:ring-2 focus:ring-[#0066F5]/20"
                autoComplete="off"
              />
              {isFetching && (
                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-[#0066F5]" />
              )}

              {open && (
                <div className="absolute z-30 mt-2 max-h-[min(420px,55vh)] w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl [scrollbar-width:thin]">
                  {isError && (
                    <div className="p-4 text-center text-sm text-red-600">
                      Couldn’t load API colleges.{" "}
                      <button
                        type="button"
                        onClick={() => refetch()}
                        className="font-semibold underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {results.length === 0 && !isFetching ? (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No colleges found for “{searchTerm.trim() || "…"}”
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {results.map((college) => (
                        <li key={college.id}>
                          <button
                            type="button"
                            onClick={() => addCollege(college)}
                            className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[#E8F1FF]/70"
                          >
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              {college.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={college.image}
                                  alt=""
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <GraduationCap className="h-5 w-5 text-[#0066F5]" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {college.name}
                                </p>
                                <span className="rounded-full bg-[#E8F1FF] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#0066F5] uppercase">
                                  {college.sourceLabel}
                                </span>
                              </div>
                              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="h-3 w-3" />
                                {college.locationLabel || "—"}
                              </p>
                            </div>
                            <Plus className="mt-1 h-4 w-4 shrink-0 text-[#0066F5]" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Tip: try “AIIMS”, “Delhi”, “Russia”, “MD” or a college name
            </p>
          </div>
        )}

        {selected.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-4 text-left text-sm font-semibold text-slate-900">
                      Metric
                    </th>
                    {selected.map((college) => (
                      <th key={college.id} className="min-w-[240px] p-4">
                        <div className="relative text-center">
                          <button
                            type="button"
                            onClick={() => removeCollege(college.id)}
                            className="absolute top-0 right-0 rounded-full p-1 hover:bg-red-50"
                            aria-label={`Remove ${college.name}`}
                          >
                            <X className="h-4 w-4 text-slate-400 hover:text-red-600" />
                          </button>
                          <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-xl bg-slate-100">
                            {college.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={college.image}
                                alt={college.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-[#0066F5]" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            {college.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {college.locationLabel}
                          </p>
                          <span className="mt-2 inline-block rounded-full bg-[#E8F1FF] px-2 py-0.5 text-[10px] font-bold text-[#0066F5] uppercase">
                            {college.sourceLabel}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 text-sm font-medium text-slate-700">About</td>
                    {selected.map((college) => (
                      <td key={college.id} className="p-4">
                        <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                          {college.about || "No description available"}
                        </p>
                      </td>
                    ))}
                  </tr>
                  {METRICS.map((metric) => (
                    <tr
                      key={metric.key}
                      className="border-b border-slate-100 hover:bg-slate-50/80"
                    >
                      <td className="p-4 text-sm font-medium text-slate-700">
                        <span className="inline-flex items-center gap-2">
                          <metric.icon className="h-4 w-4 text-[#0066F5]" />
                          {metric.label}
                        </span>
                      </td>
                      {selected.map((college) => (
                        <td key={college.id} className="p-4 text-center">
                          <span className="text-sm font-bold text-slate-900">
                            {metric.get(college)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F1FF]">
              <ArrowUpDown className="h-8 w-8 text-[#0066F5]" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              Start comparing colleges
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Use the search above to add up to 3 colleges from MBBS India, MBBS
              Abroad, MD/MS or the main college list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
