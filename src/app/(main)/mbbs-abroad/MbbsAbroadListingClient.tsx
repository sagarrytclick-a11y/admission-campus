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
  Globe2,
  Filter,
} from "lucide-react";
import {
  getAllMbbsAbroadColleges,
  getMbbsAbroadCountries,
  getMbbsAbroadStats,
  type MbbsAbroadCollege,
} from "@/lib/mbbsAbroadData";

const ITEMS_PER_PAGE = 12;

function CollegeCard({ college }: { college: MbbsAbroadCollege }) {
  return (
    <Link
      href={`/mbbs-abroad/${college.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 md:flex-row"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100 md:h-auto md:w-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={college.image}
          alt={college.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-bold text-white ${
            (college.type || "").toLowerCase().includes("government")
              ? "bg-emerald-600"
              : "bg-violet-600"
          }`}
        >
          {college.type || "Private"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-[#0066F5] md:text-xl">
            {college.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 text-[#0066F5]" />
              {college.city}, {college.countryName}
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="h-4 w-4 text-amber-500" />
              {college.recognition}
            </span>
          </div>
        </div>

        <p className="line-clamp-1 self-start rounded-md bg-[#E8F1FF] px-2.5 py-1 text-xs font-semibold text-[#0066F5]">
          {college.ranking}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-2 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Fees
            </p>
            <p className="line-clamp-1 text-sm font-bold text-slate-800">
              {college.fees}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Duration
            </p>
            <p className="text-sm font-bold text-slate-800">
              {college.duration || "—"}
            </p>
          </div>
          <div className="col-span-2 flex items-end justify-end sm:col-span-1 sm:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0066F5] px-3 py-2 text-xs font-bold text-white transition-colors group-hover:bg-[#0047B3]">
              View Details
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MbbsAbroadListingClient() {
  const searchParams = useSearchParams();
  const countries = useMemo(() => getMbbsAbroadCountries(), []);
  const stats = useMemo(() => getMbbsAbroadStats(), []);
  const allColleges = useMemo(() => getAllMbbsAbroadColleges(), []);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const countryFromUrl = searchParams.get("country");
    if (
      countryFromUrl &&
      countries.some((c) => c.slug === countryFromUrl)
    ) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setSelectedCountry(countryFromUrl);
      setPage(1);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [searchParams, countries]);

  const filtered = useMemo(() => {
    let list = allColleges;
    if (selectedCountry !== "all") {
      list = list.filter((c) => c.countrySlug === selectedCountry);
    }
    if (selectedType !== "all") {
      list = list.filter((c) =>
        (c.type || "").toLowerCase().includes(selectedType.toLowerCase())
      );
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.countryName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allColleges, selectedCountry, selectedType, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetPage = () => setPage(1);

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[#0B1220]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B1220]/70 via-[#0B1220]/55 to-[#0B1220]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0066F5]/35 via-transparent to-[#0047B3]/25" />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 text-center sm:px-6 md:pt-16 md:pb-20 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066F5]">
                <Globe2 size={13} className="text-white" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.14em] text-white/90 uppercase sm:text-[11px]">
                Study Abroad · MBBS
              </span>
            </div>

            <h1 className="mb-4 text-3xl leading-[1.08] font-bold tracking-tight sm:text-4xl md:text-5xl">
              Find your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-white">MBBS Abroad</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-2.5 rounded-sm bg-[#0066F5]/45" />
              </span>{" "}
              seat
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Compare fees, duration &amp; NMC recognition across universities
              in Russia, Georgia, Nepal, Bangladesh and more.
            </p>

            <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur-md">
              <span className="inline-flex items-center gap-2 text-white">
                <GraduationCap size={16} className="text-[#0066F5]" />
                {stats.colleges} Universities
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:inline" />
              <span className="inline-flex items-center gap-2 text-white">
                <Globe2 size={16} className="text-[#0066F5]" />
                {stats.countries} Countries
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:inline" />
              <span className="inline-flex items-center gap-2 text-white">
                <Award size={16} className="text-[#0066F5]" />
                {stats.government}+ Government
              </span>
            </div>

            <div className="mx-auto max-w-xl">
              <div className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white p-1.5 shadow-2xl shadow-black/25 sm:p-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
                  <Search className="h-5 w-5 shrink-0 text-[#0066F5]" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      resetPage();
                    }}
                    placeholder="Search university, city or country..."
                    className="w-full min-w-0 bg-transparent py-2.5 text-sm font-medium text-[#0F172A] outline-none placeholder:text-slate-400 sm:text-base"
                  />
                </div>
                <span className="hidden shrink-0 items-center rounded-xl bg-[#0066F5] px-5 py-2.5 text-sm font-bold text-white sm:inline-flex">
                  Search
                </span>
              </div>
              <p className="mt-3 text-[11px] font-medium tracking-wide text-white/50">
                Tip: try “Russia”, “Georgia” or a university name
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-8 rounded-t-[2rem] bg-[#F4F7FC]" />
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <aside className="w-full shrink-0 lg:w-80">
              <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain">
                <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                  <div className="flex items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                    <Filter className="h-4 w-4 text-[#0066F5]" />
                    <h2 className="text-sm font-bold text-[#0F172A]">
                      Countries
                    </h2>
                  </div>
                  <div className="flex max-h-[min(360px,45vh)] flex-col overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:#0066F5_#F1F5F9]">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry("all");
                        resetPage();
                      }}
                      className={`w-full border-b border-[#E2E8F0] px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        selectedCountry === "all"
                          ? "bg-[#0066F5] text-white"
                          : "text-slate-700 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span>All Countries</span>
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            selectedCountry === "all"
                              ? "text-white/80"
                              : "text-slate-400"
                          }`}
                        >
                          {allColleges.length}
                        </span>
                      </span>
                    </button>
                    {countries.map((country) => (
                      <button
                        key={country.slug}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country.slug);
                          resetPage();
                        }}
                        className={`w-full border-b border-[#E2E8F0] px-4 py-2.5 text-left text-sm font-medium transition-colors last:border-b-0 ${
                          selectedCountry === country.slug
                            ? "bg-[#0066F5] text-white"
                            : "text-slate-700 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate">{country.name}</span>
                          <span
                            className={`shrink-0 text-xs font-bold tabular-nums ${
                              selectedCountry === country.slug
                                ? "text-white/80"
                                : "text-slate-400"
                            }`}
                          >
                            {country.collegeCount}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                  <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                    <h2 className="text-sm font-bold text-[#0F172A]">
                      College Type
                    </h2>
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
                        className={`w-full border-b border-[#E2E8F0] px-4 py-2.5 text-left text-sm font-medium transition-colors last:border-b-0 ${
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

                <div className="rounded-xl border border-[#0066F5]/15 bg-[#E8F1FF] p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                    <Award className="h-4 w-4 text-[#0066F5]" />
                    Category Overview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Universities</span>
                      <span className="font-semibold text-[#0066F5]">
                        {stats.colleges}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Countries</span>
                      <span className="font-semibold text-[#0066F5]">
                        {stats.countries}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Govt Universities</span>
                      <span className="font-semibold text-[#0066F5]">
                        {stats.government}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  MBBS Universities Abroad
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  Showing {filtered.length} institution
                  {filtered.length === 1 ? "" : "s"}
                  {selectedCountry !== "all" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-[#0066F5]">
                        {
                          countries.find((c) => c.slug === selectedCountry)
                            ?.name
                        }
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6">
                {pageItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <GraduationCap className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                    <p className="font-semibold text-slate-700">
                      No universities found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try another country or clear your search.
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
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-medium hover:border-[#0066F5] disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" /> Prev
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
                          <span
                            key={`e-${idx}`}
                            className="px-2 text-slate-400"
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setPage(n)}
                            className={`h-10 w-10 rounded-lg text-sm font-bold ${
                              currentPage === n
                                ? "bg-[#0066F5] text-white"
                                : "border border-[#E2E8F0] bg-white text-slate-700 hover:border-[#0066F5]"
                            }`}
                          >
                            {n}
                          </button>
                        )
                      )}
                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-medium hover:border-[#0066F5] disabled:opacity-40"
                    >
                      Next <ChevronRight className="h-4 w-4" />
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
