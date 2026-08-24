"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { getMdMsStates, getAllMdMsColleges } from "@/lib/mdMsData";

export default function MdMsHomeSection() {
  const router = useRouter();
  const states = getMdMsStates();
  const [selectedState, setSelectedState] = useState("all");

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

  const chipClass = (active: boolean) =>
    `w-full px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors border ${
      active
        ? "bg-[#0066F5] text-white border-[#0066F5] shadow-md shadow-[#0066F5]/25"
        : "bg-white text-slate-700 border-[#E2E8F0] hover:border-[#0066F5] hover:text-[#0066F5] hover:bg-[#E8F1FF]"
    }`;

  return (
    <section className="border-y border-[#E2E8F0] bg-[#F4F7FC] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0066F5]">
          <Stethoscope className="h-4 w-4" />
          NEET PG · MD / MS
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-[#0F172A] md:text-3xl">
            Find MD / MS Colleges by State
          </h2>
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-[#0066F5]" />
            Slide states, then explore
          </p>
        </div>

        {/* State slider */}
        <div className="relative md-ms-states-swiper mb-8">
          <button
            type="button"
            aria-label="Previous states"
            className="md-ms-states-prev absolute left-0 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-slate-700 shadow-md transition-all hover:border-[#0066F5] hover:bg-[#0066F5] hover:text-white sm:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next states"
            className="md-ms-states-next absolute right-0 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-slate-700 shadow-md transition-all hover:border-[#0066F5] hover:bg-[#0066F5] hover:text-white sm:flex"
          >
            <ChevronRight size={18} />
          </button>

          <div className="sm:px-12">
            <Swiper
              modules={[Navigation, FreeMode]}
              freeMode
              spaceBetween={10}
              slidesPerView="auto"
              watchOverflow
              navigation={{
                prevEl: ".md-ms-states-swiper .md-ms-states-prev",
                nextEl: ".md-ms-states-swiper .md-ms-states-next",
              }}
            >
              <SwiperSlide className="!w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedState("all")}
                  className={chipClass(selectedState === "all")}
                >
                  All States
                </button>
              </SwiperSlide>

              {states.map((state) => (
                <SwiperSlide key={state.slug} className="!w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedState(state.slug)}
                    className={chipClass(selectedState === state.slug)}
                  >
                    {state.name}
                    {typeof state.collegeCount === "number" ? (
                      <span
                        className={`ml-1.5 text-xs font-bold ${
                          selectedState === state.slug
                            ? "text-white/80"
                            : "text-slate-400"
                        }`}
                      >
                        ({state.collegeCount})
                      </span>
                    ) : null}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {colleges.length === 0 ? (
          <p className="mb-6 text-center text-sm text-slate-500">
            No colleges found for this state.
          </p>
        ) : (
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <Link
                key={college.id}
                href={`/md-ms/${college.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15"
              >
                <div className="relative h-44 shrink-0 overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={college.image}
                    alt={college.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[11px] font-bold text-white ${
                      college.type.toLowerCase().includes("government")
                        ? "bg-emerald-600"
                        : "bg-violet-600"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex-1">
                    <h3 className="line-clamp-2 min-h-[3rem] font-bold text-[#0F172A] transition-colors group-hover:text-[#0066F5]">
                      {college.name}
                    </h3>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#64748B]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0066F5]" />
                      <span className="line-clamp-1">
                        {college.city}, {college.stateName}
                      </span>
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2 text-sm">
                      <span className="line-clamp-1 font-semibold text-[#0F172A]">
                        {college.fees}
                      </span>
                      <span className="shrink-0 font-semibold text-[#0066F5]">
                        {college.seats} seats
                      </span>
                    </div>
                  </div>
                  <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-[#0047B3]">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleExplore}
            className="inline-flex w-full max-w-sm sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#0066F5] px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-[#0066F5]/25 transition-colors hover:bg-[#0047B3]"
          >
            Explore MD / MS Colleges
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
