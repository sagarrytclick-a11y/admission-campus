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
      className="group flex flex-col md:flex-row bg-white rounded-xl border border-[#E2E8F0] hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all duration-300 overflow-hidden"
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

        <p className="text-xs font-semibold text-[#0066F5] bg-[#E8F1FF] self-start px-2.5 py-1 rounded-md line-clamp-1">
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
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0066F5] text-white text-xs font-bold px-3 py-2 group-hover:bg-[#0047B3] transition-colors">
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
      /* eslint-disable react-hooks/set-state-in-effect */
      setSelectedState(stateFromUrl);
      setPage(1);
      /* eslint-enable react-hooks/set-state-in-effect */
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
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        {/* Layered backdrop */}
        <div className="absolute inset-0 bg-[#0B1220]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B1220]/70 via-[#0B1220]/55 to-[#0B1220]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0066F5]/35 via-transparent to-[#0047B3]/25" />

        {/* Soft glow orbs */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(0,102,245,0.55), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(0,71,179,0.6), transparent 70%)" }}
        />

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16 pb-16 md:pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 mb-6">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066F5]">
                <Stethoscope size={13} className="text-white" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/90 text-center max-w-[16rem] sm:max-w-none leading-snug">
                NEET PG · Postgraduate Medicine
              </span>
            </div>

            <div className="inline-flex items-stretch justify-center gap-3 mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08]">
                Find your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-white">MD / MS</span>
                  <span className="absolute inset-x-0 bottom-1 h-2.5 bg-[#0066F5]/45 -z-0 rounded-sm" />
                </span>{" "}
                seat
              </h1>
              <span
                className="hidden sm:block w-1.5 rounded-full bg-[#0066F5] shrink-0 self-stretch"
                aria-hidden
              />
            </div>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto mb-8">
              Compare fees, seats & counselling paths across India&apos;s top
              postgraduate medical colleges — built for NEET PG aspirants.
            </p>

            {/* Stats strip */}
            <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-2 text-white">
                <GraduationCap size={16} className="text-[#0066F5]" />
                {stats.colleges} Colleges
              </span>
              <span className="hidden sm:inline w-px h-4 bg-white/25" />
              <span className="inline-flex items-center gap-2 text-white">
                <MapPin size={16} className="text-[#0066F5]" />
                {stats.states} States
              </span>
              <span className="hidden sm:inline w-px h-4 bg-white/25" />
              <span className="inline-flex items-center gap-2 text-white">
                <Award size={16} className="text-[#0066F5]" />
                {stats.government}+ Government
              </span>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 sm:p-2 shadow-2xl shadow-black/25 border border-white/40">
                <div className="flex flex-1 items-center gap-2 pl-3 min-w-0">
                  <Search className="w-5 h-5 text-[#0066F5] shrink-0" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      resetPage();
                    }}
                    placeholder="Search college, city or state..."
                    className="w-full min-w-0 bg-transparent text-[#0F172A] placeholder:text-slate-400 outline-none text-sm sm:text-base font-medium py-2.5"
                  />
                </div>
                <span className="hidden sm:inline-flex shrink-0 items-center rounded-xl bg-[#0066F5] text-white text-sm font-bold px-5 py-2.5">
                  Search
                </span>
              </div>
              <p className="mt-3 text-[11px] text-white/50 font-medium tracking-wide">
                Tip: try “Delhi”, “AIIMS” or a state name
              </p>
            </div>
          </div>
        </div>

        {/* Bottom wave into page */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-[#F4F7FC] rounded-t-[2rem]" />
      </section>

      {/* Main — same shell as category */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain space-y-4">
                {/* States */}
                <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                  <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#0066F5]" />
                      <h2 className="font-bold text-[#0F172A] text-sm">States</h2>
                    </div>
                  </div>
                  <div className="flex flex-col max-h-[min(360px,45vh)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:#0066F5_#F1F5F9]">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedState("all");
                        resetPage();
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-[#E2E8F0] transition-colors ${
                        selectedState === "all"
                          ? "bg-[#0066F5] text-white"
                          : "text-slate-700 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
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
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-[#E2E8F0] last:border-b-0 transition-colors ${
                          selectedState === state.slug
                            ? "bg-[#0066F5] text-white"
                            : "text-slate-700 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
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

                {/* Type */}
                <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                  <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <h2 className="font-bold text-[#0F172A] text-sm">College Type</h2>
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
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-[#E2E8F0] last:border-b-0 transition-colors ${
                          selectedType === t.id
                            ? "bg-[#0066F5] text-white"
                            : "text-slate-700 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overview card — like category */}
                <div className="rounded-xl bg-[#E8F1FF] border border-[#0066F5]/15 p-4">
                  <h4 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-[#0066F5]" />
                    Category Overview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Total Colleges</span>
                      <span className="font-semibold text-[#0066F5]">{stats.colleges}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">States</span>
                      <span className="font-semibold text-[#0066F5]">{stats.states}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">PG Seats</span>
                      <span className="font-semibold text-[#0066F5]">
                        {Math.round(stats.seats / 100) * 100}+
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Govt Colleges</span>
                      <span className="font-semibold text-[#0066F5]">{stats.government}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#0F172A]">MD / MS Colleges</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Showing {filtered.length} institution{filtered.length === 1 ? "" : "s"}
                  {selectedState !== "all" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-[#0066F5]">
                        {states.find((s) => s.slug === selectedState)?.name}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-6">
                {pageItems.length === 0 ? (
                  <div className="py-12 text-center">
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
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium disabled:opacity-40 hover:border-[#0066F5]"
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
                                : "bg-white border border-[#E2E8F0] text-slate-700 hover:border-[#0066F5]"
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
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium disabled:opacity-40 hover:border-[#0066F5]"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
