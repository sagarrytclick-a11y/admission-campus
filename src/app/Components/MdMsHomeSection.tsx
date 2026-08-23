"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stethoscope, ArrowRight, MapPin } from "lucide-react";
import { getMdMsStates, getAllMdMsColleges } from "@/lib/mdMsData";

export default function MdMsHomeSection() {
  const router = useRouter();
  const states = getMdMsStates();
  const [selectedState, setSelectedState] = useState("all");

  // Initial colleges (first 6), or filtered by selected state
  const colleges = getAllMdMsColleges()
    .filter((c) =>
      selectedState === "all" ? true : c.stateSlug === selectedState
    )
    .slice(0, 6);

  const handleExplore = () => {
    const href =
      selectedState === "all" ? "/md-ms" : `/md-ms?state=${selectedState}`;
    router.push(href);
  };

  return (
    <section className="py-10 md:py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex items-center gap-2 text-[#0066F5] text-xs font-bold uppercase tracking-wider mb-3">
          <Stethoscope className="w-4 h-4" />
          NEET PG · MD / MS
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Find MD / MS Colleges by State
          </h2>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#0066F5]" />
            Filter a state, then explore
          </p>
        </div>

        {/* One-line state filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button
            type="button"
            onClick={() => setSelectedState("all")}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedState === "all"
                ? "bg-[#0066F5] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#0066F5]"
            }`}
          >
            All States
          </button>
          {states.map((state) => (
            <button
              key={state.slug}
              type="button"
              onClick={() => setSelectedState(state.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                selectedState === state.slug
                  ? "bg-[#0066F5] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#0066F5]"
              }`}
            >
              {state.name}
            </button>
          ))}
        </div>

        {/* Initial colleges */}
        {colleges.length === 0 ? (
          <p className="text-center text-slate-500 text-sm mb-6">
            No colleges found for this state.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {colleges.map((college) => (
              <Link
                key={college.id}
                href={`/md-ms/${college.slug}`}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/10 transition-all"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-md text-white ${
                      college.type.toLowerCase().includes("government")
                        ? "bg-emerald-600"
                        : "bg-violet-600"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-[#0066F5] transition-colors">
                    {college.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0066F5]" />
                    {college.city}, {college.stateName}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm gap-2">
                    <span className="font-semibold text-slate-800 line-clamp-1">
                      {college.fees}
                    </span>
                    <span className="text-[#0066F5] font-semibold shrink-0">
                      {college.seats} seats
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Single redirect CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0066F5] text-white font-bold text-base hover:bg-[#004ED4] transition-colors shadow-md shadow-[#0066F5]/25"
          >
            Explore MD / MS Colleges
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
