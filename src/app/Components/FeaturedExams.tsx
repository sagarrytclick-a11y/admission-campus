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
import { useState, useEffect } from "react";
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
      <div className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/20 transition-all duration-300 flex flex-col h-full">
        <div className="relative h-44 bg-slate-50 border-b-2 border-slate-300">
          <img
            src={image || `https://picsum.photos/seed/${slug}/400/300`}
            alt={name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
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
          <h3 className="text-lg font-semibold leading-tight text-[#1E293B] group-hover:text-[#0066F5] transition-colors line-clamp-2 mb-2">
            {name}
          </h3>

          <div className="flex items-center gap-1 text-slate-600 text-[10px] font-medium mb-4">
            <MapPin size={12} /> {country} • Est. {establishment_year || "---"}
          </div>

          <div className="flex gap-4 mb-4 pt-4 border-t-2 border-slate-200">
            <div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                Fees
              </p>
              <p className="text-xs font-semibold text-[#1E293B]">
                {fees || "Enquire"}
              </p>
            </div>
            <div className="w-[1px] h-6 bg-slate-300 mt-1"></div>
            <div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                Duration
              </p>
              <p className="text-xs font-semibold text-[#1E293B]">
                {duration || "4"} Years
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-[#0066F5] flex items-center gap-1 group-hover:gap-2 transition-all">
              View Profile <ArrowRight size={14} />
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
const UpcomingExamsSection = ({
  exams,
  loading,
}: {
  exams: any[];
  loading: boolean;
}) => {
  return (
    <section className="py-[32px] bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#1E293B] mb-2">
            <CalendarDays size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Entrance Calendar 2026
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B]">
            Upcoming Exam Dates
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="!pb-12"
            >
              {exams.map((exam, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="group block overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm hover:shadow-md h-full"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">
                            {(exam.short_name || exam.name || "")
                              .substring(0, 6)
                              .toUpperCase()}
                          </span>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-blue-300 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          Online
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1E293B] mb-1 group-hover:text-blue-600">
                        {exam.short_name || exam.name}
                      </h3>

                      {exam.type && (
                        <p className="text-xs text-slate-500 mb-2">
                          {exam.type}
                        </p>
                      )}

                      <p className="text-sm text-slate-600">Exam Date</p>
                      <p className="text-sm font-bold text-blue-600">
                        {exam.next_date || "TBA"}
                      </p>
                    </div>

                    <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
                      <span className="text-white text-sm font-medium">
                        Exam Info
                      </span>
                      <ArrowRight size={16} className="text-white" />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all z-10">
              <ChevronLeft size={16} />
            </div>
            <div className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all z-10">
              <ChevronRight size={16} />
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
    queryKey: ["colleges"],
    queryFn: async () => (await fetch("/api/colleges")).json(),
  });

  const exams = useQuery({
    queryKey: ["exams"],
    queryFn: async () => (await fetch("/api/admin/exams")).json(),
  });

  
  return {
    universities: colleges.data?.data?.colleges || [],
    exams: exams.data?.data || [],
    loading: colleges.isLoading || exams.isLoading,
  };
};