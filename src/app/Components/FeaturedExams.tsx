"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Sparkles,
  CalendarDays,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { formatRankingLabel } from "@/lib/formatRanking";

const COLLEGES_PER_PAGE = 6;

/* =======================
   UNIVERSITY CARD
======================= */
const UniversityCard = ({
  name,
  image,
  slug,
  country = "India",
  ranking,
  fees,
  duration,
  establishment_year,
}: any) => {
  const rankLabel = formatRankingLabel(ranking);

  return (
    <Link href={`/colleges/${slug}`} className="group block h-full">
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all duration-300 flex flex-col h-full">
        <div className="relative h-44 bg-slate-50 border-b border-[#E2E8F0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image || `https://picsum.photos/seed/${slug}/400/300`}
            alt={name}
            className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
          />
          {rankLabel && (
            <div className="absolute top-2.5 right-2.5 left-2.5 flex justify-end pointer-events-none">
              <span
                title={rankLabel}
                className="inline-block max-w-full bg-[#0066F5] text-white px-2 py-1 rounded-md text-[10px] font-bold leading-snug shadow-md line-clamp-2 text-left"
              >
                {rankLabel}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold leading-tight text-[#0F172A] group-hover:text-[#0066F5] transition-colors line-clamp-2 mb-2">
            {name}
          </h3>

          <div className="flex items-center gap-1 text-[#64748B] text-[11px] font-medium mb-4">
            <MapPin size={12} className="text-[#0066F5]" /> {country} • Est.{" "}
            {establishment_year || "—"}
          </div>

          <div className="flex gap-4 mb-4 pt-4 border-t border-[#E2E8F0]">
            <div>
              <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">
                Fees
              </p>
              <p className="text-xs font-semibold text-[#0F172A]">
                {fees || "Enquire"}
              </p>
            </div>
            <div className="w-px h-6 bg-[#E2E8F0] mt-1" />
            <div>
              <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">
                Duration
              </p>
              <p className="text-xs font-semibold text-[#0F172A]">
                {duration || "4"} Years
              </p>
            </div>
          </div>

          <div className="mt-auto pt-1">
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] text-white text-sm font-bold py-2.5 group-hover:bg-[#0047B3] transition-colors">
              View Details
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =======================
   UPCOMING EXAMS (SWIPER SLIDER)
======================= */
function getExamDateLabel(exam: any): string {
  const dates = exam?.exam_dates?.important_dates;
  if (Array.isArray(dates) && dates.length > 0) {
    const sorted = [...dates].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const upcoming =
      sorted.find((d) => new Date(d.date).getTime() >= Date.now()) || sorted[0];
    if (upcoming?.date) {
      return new Date(upcoming.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }
  return "TBA";
}

const UpcomingExamsSection = ({
  exams,
  loading,
}: {
  exams: any[];
  loading: boolean;
}) => {
  return (
    <section className="py-10 md:py-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0066F5] mb-2">
              <CalendarDays size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Entrance Calendar
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1E293B]">
              Upcoming Exam Dates
            </h2>
          </div>
          <Link
            href="/exams"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0066F5] hover:underline"
          >
            View all exams <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066F5]" />
          </div>
        ) : exams.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No upcoming exams available right now.
          </div>
        ) : (
          <div className="relative featured-exams-swiper">
            {exams.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous exams"
                  className="featured-exams-prev hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:bg-[#0066F5] hover:text-white hover:border-[#0066F5] transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next exams"
                  className="featured-exams-next hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:bg-[#0066F5] hover:text-white hover:border-[#0066F5] transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <div className="sm:px-12">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.15}
                centeredSlides={exams.length === 1}
                navigation={
                  exams.length > 1
                    ? {
                        prevEl: ".featured-exams-swiper .featured-exams-prev",
                        nextEl: ".featured-exams-swiper .featured-exams-next",
                      }
                    : false
                }
                autoplay={
                  exams.length > 1
                    ? { delay: 3500, disableOnInteraction: false }
                    : false
                }
                loop={exams.length > 3}
                watchOverflow
                breakpoints={{
                  640: {
                    slidesPerView: Math.min(2, exams.length),
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: Math.min(3, exams.length),
                    centeredSlides: false,
                  },
                }}
              >
                {exams.map((exam) => (
                  <SwiperSlide key={exam._id || exam.slug} className="!h-auto">
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="group flex flex-col h-full min-h-[220px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all"
                    >
                      <div className="p-5 flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-[#E8F1FF] rounded-xl flex items-center justify-center border border-[#0066F5]/15">
                            <span className="text-[10px] font-bold text-[#0066F5]">
                              {(exam.short_name || exam.name || "")
                                .substring(0, 6)
                                .toUpperCase()}
                            </span>
                          </div>
                          <span className="inline-flex items-center rounded-full border border-[#0066F5]/20 bg-[#E8F1FF] px-2.5 py-0.5 text-xs font-semibold text-[#0066F5]">
                            {exam.exam_mode || "Online"}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#0066F5] line-clamp-2">
                          {exam.short_name || exam.name}
                        </h3>

                        <p className="text-xs text-[#64748B] mb-3">
                          {exam.exam_type || "Entrance Exam"}
                          {exam.conducting_body
                            ? ` · ${exam.conducting_body}`
                            : ""}
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Exam Date
                        </p>
                        <p className="text-sm font-bold text-[#0066F5] mt-0.5">
                          {getExamDateLabel(exam)}
                        </p>
                      </div>

                      <div className="bg-[#0066F5] group-hover:bg-[#0047B3] px-5 py-3 flex items-center justify-between mt-auto transition-colors">
                        <span className="text-white text-sm font-semibold">
                          View Details
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-white group-hover:translate-x-0.5 transition-transform"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* =======================
   FEATURED SECTION
======================= */
export default function FeaturedSection() {
  const { universities, exams, loading } = useFeaturedData();
  const [displayedColleges, setDisplayedColleges] =
    useState(COLLEGES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedUniversities = universities.slice(0, displayedColleges);
  const hasMoreColleges = displayedColleges < universities.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedColleges((prev) =>
        Math.min(prev + COLLEGES_PER_PAGE, universities.length)
      );
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="bg-white font-sans text-[#1E293B]">
      <section className="max-w-7xl mx-auto py-[32px] px-6 lg:px-24">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#0066F5] mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Partner Institutions
            </span>
          </div>
          <h2 className="text-3xl text-[#1E293B] font-bold tracking-tight mb-3">
            Top Indian Colleges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedUniversities.map((u: any, i: number) => (
            <UniversityCard
              key={i}
              name={u.name}
              image={u.banner_url}
              slug={u.slug}
              country={u.country_ref?.name}
              establishment_year={u.establishment_year}
              ranking={typeof u.ranking === 'object' ? (u.ranking?.country_ranking || u.ranking?.world_ranking || '') : (u.ranking || '')}
              fees={
                u.fees ||
                u.annual_fees ||
                u.fees_structure?.courses?.[0]?.annual_tuition_fee
              }
              duration={
                u.duration || u.fees_structure?.courses?.[0]?.duration
              }
            />
          ))}
        </div>

        {hasMoreColleges && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-8 py-3 bg-white border border-slate-200 text-sm font-bold rounded-md hover:border-[#0066F5] hover:text-[#0066F5]"
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </section>

      <UpcomingExamsSection exams={exams} loading={loading} />
    </div>
  );
}

/* =======================
   DATA HOOK
======================= */
const useFeaturedData = () => {
  const colleges = useQuery({
    queryKey: ["colleges", "featured"],
    queryFn: async () =>
      (await fetch("/api/colleges?limit=12")).json(),
    staleTime: 5 * 60 * 1000,
  });

  const exams = useQuery({
    queryKey: ["featured-exams"],
    queryFn: async () => {
      const res = await fetch("/api/exams");
      if (!res.ok) throw new Error("Failed to fetch exams");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    universities: colleges.data?.data?.colleges || [],
    exams: Array.isArray(exams.data?.data) ? exams.data.data : [],
    loading: colleges.isLoading || exams.isLoading,
  };
};