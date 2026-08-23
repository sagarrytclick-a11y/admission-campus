"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  GraduationCap,
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
  Award,
  Stethoscope,
  Filter,
} from "lucide-react";
import {
  getAllMdMsColleges,
  getMdMsStates,
  getMdMsStats,
  type MdMsCollege,
} from "@/lib/mdMsData";

const ITEMS_PER_PAGE = 12;

function CollegeCard({ college }: { college: MdMsCollege }) {
  return (
    <Link
      href={`/md-ms/${college.slug}`}
      className="group flex flex-col md:flex-row bg-white rounded-xl border-2 border-slate-200 hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full md:w-52 h-48 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md text-white ${
            college.type.toLowerCase().includes("government")
              ? "bg-emerald-600"
              : "bg-violet-600"
          }`}
        >
          {college.type}
        </span>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-[#0066F5] transition-colors line-clamp-2">
            {college.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#0066F5]" />
              {college.city}, {college.stateName}
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              {college.recognition}
            </span>
          </div>
        </div>

        <p className="text-xs font-semibold text-[#0066F5] bg-blue-50 self-start px-2.5 py-1 rounded-md line-clamp-1">
          {college.ranking}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-auto pt-2 border-t border-slate-100">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
              Fees
            </p>
            <p className="text-sm font-bold text-slate-800 line-clamp-1">
              {college.fees}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
              PG Seats
            </p>
            <p className="text-sm font-bold text-slate-800">{college.seats}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-end justify-end sm:justify-start">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0066F5]">
              View Details
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MdMsListingClient() {
  const searchParams = useSearchParams();
  const states = useMemo(() => getMdMsStates(), []);
  const stats = useMemo(() => getMdMsStats(), []);
  const allColleges = useMemo(() => getAllMdMsColleges(), []);

  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const stateFromUrl = searchParams.get("state");
    if (stateFromUrl && states.some((s) => s.slug === stateFromUrl)) {
      setSelectedState(stateFromUrl);
      setPage(1);
    }
  }, [searchParams, states]);

  const filtered = useMemo(() => {
    let list = allColleges;
    if (selectedState !== "all") {
      list = list.filter((c) => c.stateSlug === selectedState);
    }
    if (selectedType !== "all") {
      list = list.filter((c) =>
        c.type.toLowerCase().includes(selectedType.toLowerCase())
      );
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.stateName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allColleges, selectedState, selectedType, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetPage = () => setPage(1);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-linear-to-br from-[#0066F5] to-[#004ED4] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] bg-size-[20px_20px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 text-white/90 mb-4 text-sm font-bold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" />
            NEET PG · MD / MS Colleges
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Explore MD / MS Colleges
            <span className="block text-yellow-300">Across India</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mb-8">
            Curated postgraduate medical colleges with fees, seats, counselling
            info and placements — separate from the regular colleges directory.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mb-8">
            {[
              { icon: Building2, label: "Colleges", value: String(stats.colleges) },
              { icon: MapPin, label: "States", value: String(stats.states) },
              {
                icon: Users,
                label: "PG Seats",
                value: `${Math.round(stats.seats / 100) * 100}+`,
              },
              {
                icon: GraduationCap,
                label: "Govt Colleges",
                value: String(stats.government),
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center"
              >
                <s.icon className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-white/80">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="Search college, city or state..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 shadow-xl border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-8 lg:py-10">
        <div className="lg:flex lg:gap-8">
          <aside className="lg:w-72 shrink-0 mb-6 lg:mb-0">
            <div className="lg:sticky lg:top-28 space-y-4">
              {/* State filter — one item per line + vertical scroll */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-2 px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#0066F5]" />
                    <h2 className="font-bold text-slate-900 text-sm">States</h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Scroll
                  </span>
                </div>

                <div className="flex flex-col max-h-[min(420px,55vh)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:#93C5FD_#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedState("all");
                      resetPage();
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-slate-100 transition-colors ${
                      selectedState === "all"
                        ? "bg-[#0066F5] text-white"
                        : "text-slate-700 hover:bg-blue-50 hover:text-[#0066F5]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span>All States</span>
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          selectedState === "all" ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        {allColleges.length}
                      </span>
                    </span>
                  </button>
                  {states.map((state) => (
                    <button
                      key={state.slug}
                      type="button"
                      onClick={() => {
                        setSelectedState(state.slug);
                        resetPage();
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-slate-100 last:border-b-0 transition-colors ${
                        selectedState === state.slug
                          ? "bg-[#0066F5] text-white"
                          : "text-slate-700 hover:bg-blue-50 hover:text-[#0066F5]"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate">{state.name}</span>
                        <span
                          className={`text-xs font-bold tabular-nums shrink-0 ${
                            selectedState === state.slug
                              ? "text-white/80"
                              : "text-slate-400"
                          }`}
                        >
                          {state.collegeCount}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
                  <h2 className="font-bold text-slate-900 text-sm">College Type</h2>
                </div>
                <div className="flex flex-col">
                  {[
                    { id: "all", label: "All" },
                    { id: "government", label: "Government" },
                    { id: "private", label: "Private" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(t.id);
                        resetPage();
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-slate-100 last:border-b-0 transition-colors ${
                        selectedType === t.id
                          ? "bg-[#0066F5] text-white"
                          : "text-slate-700 hover:bg-blue-50 hover:text-[#0066F5]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
                MD/MS colleges
                {selectedState !== "all" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-bold text-[#0066F5]">
                      {states.find((s) => s.slug === selectedState)?.name}
                    </span>
                  </>
                )}
              </p>
            </div>

            {pageItems.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-700 font-semibold">No colleges found</p>
                <p className="text-sm text-slate-500 mt-1">
                  Try another state or clear your search.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pageItems.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium disabled:opacity-40 hover:border-[#0066F5]"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((n) => {
                    if (totalPages <= 7) return true;
                    return (
                      n === 1 ||
                      n === totalPages ||
                      Math.abs(n - currentPage) <= 1
                    );
                  })
                  .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                    if (idx > 0 && n - (arr[idx - 1] as number) > 1) {
                      acc.push("…");
                    }
                    acc.push(n);
                    return acc;
                  }, [])
                  .map((n, idx) =>
                    n === "…" ? (
                      <span key={`e-${idx}`} className="px-2 text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPage(n)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold ${
                          currentPage === n
                            ? "bg-[#0066F5] text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:border-[#0066F5]"
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )}
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium disabled:opacity-40 hover:border-[#0066F5]"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
