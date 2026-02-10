"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

/* =======================
   TYPES
======================= */

interface UniversityCardProps {
  name: string;
  image: string;
  slug: string;
  country?: string;
  ranking?: string;
  fees?: number;
  duration?: string;
  establishment_year?: string;
  about?: string;
}

interface ExamCardProps {
  name: string;
  short_name?: string;
  exam_type?: string;
  conducting_body?: string;
  exam_mode?: string;
  frequency?: string;
  description?: string;
  slug: string;
  next_date?: string;
}

/* =======================
   UNIVERSITY CARD
======================= */

const UniversityCard = (props: UniversityCardProps) => {
  const {
    name,
    image,
    slug,
    country,
    ranking,
    fees,
    duration,
    establishment_year,
    about,
  } = props;

  // Exact brand colors from your photo logic
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  return (
    <Link href={`/colleges/${slug}`} className="block h-full">
      <div className="group bg-white border border-slate-200 rounded-[32px] overflow-hidden hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_50px_rgba(30,107,255,0.15)] transition-all duration-500 flex flex-col h-full">

        {/* Image Container */}
        <div className="h-56 bg-slate-100 relative overflow-hidden">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Ranking Badge - Using Yellow Accent */}
          {ranking && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/50">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
              Rank #{ranking}
            </div>
          )}

          {/* Location Overlay Badge */}
          {country && (
            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1">
              <MapPin size={10} className="text-[#FFD700]" />
              {country}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-7 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-[#1E6BFF] transition-colors line-clamp-2">
            {name}
          </h3>

          {about && (
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 ">
              {about}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {fees && (
              <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-3">
                <p className="text-[10px] text-blue-600/70 font-bold uppercase tracking-wider mb-1">Annual Fees</p>
                <p className="font-bold text-slate-900 text-sm">₹{fees.toLocaleString()}</p>
              </div>
            )}
            {duration && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Duration</p>
                <p className="font-bold text-slate-900 text-sm">{duration} Years</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Est. Year</span>
              <span className="text-xs font-bold text-slate-700">{establishment_year}</span>
            </div>

            <div className="bg-[#1E6BFF] text-white p-2.5 rounded-xl group-hover:bg-slate-900 transition-colors shadow-lg shadow-blue-200 group-hover:shadow-none">
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =======================
   EXAM CARD
======================= */

const ExamCard = ({
  name,
  short_name,
  exam_type,
  conducting_body,
  exam_mode,
  frequency,
  description,
  slug,
}: ExamCardProps) => (
  <Link href={`/exams/${slug}`} className="block h-full">
    <div className="group bg-white border-2 border-slate-100 rounded-3xl p-6 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
          <FileText size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {short_name || name}
          </h3>
          <p className="text-sm text-slate-500 font-medium">{exam_type}</p>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 text-xs text-slate-600 mb-6">
        {exam_mode && (
          <span className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium">
            {exam_mode}
          </span>
        )}
        {frequency && (
          <span className="px-3 py-2 bg-green-50 text-green-700 rounded-xl font-medium">
            {frequency}
          </span>
        )}
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Calendar size={12} />
          </div>
          <span className="text-xs text-slate-400">{conducting_body}</span>
        </div>
        <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View Exam
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </span>
      </div>
    </div>
  </Link>
);

/* =======================
   UPCOMING EXAMS (NO SLIDER)
======================= */

const UpcomingExamsSection = ({
  exams,
  loading,
}: {
  exams: any[];
  loading: boolean;
}) => {
  // Brand Consistency Colors
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-16">
          {/* Glass Badge matching the photo design */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Entrance Exams
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Upcoming <span className="text-[#1E6BFF]">Exam Dates</span>
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Stay updated with important entrance exam schedules, application deadlines,
            and preparation tips for top universities and colleges.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-50 rounded-[28px] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {exams.slice(0, 8).map((exam, idx) => (
              <Link
                key={idx}
                href={`/exams/${exam.slug}`}
                className="group bg-white border border-slate-200 rounded-[28px] p-6 hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_40px_rgba(30,107,255,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300 shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1E6BFF] transition-colors line-clamp-1">
                      {exam.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                      Admission Open
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2">
                  {exam.description || "Stay ahead with the latest exam notifications and preparation guides."}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Exam Date</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Calendar size={12} className="text-[#1E6BFF]" />
                      {exam.next_date || "TBA"}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1E6BFF] group-hover:text-white transition-all">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA: Styled like a premium floating bar */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-white border border-slate-100 rounded-[32px] px-10 py-5 shadow-xl shadow-blue-900/5">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="student user" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#FFD700] flex items-center justify-center text-[10px] font-bold">
                50+
              </div>
            </div>
            <div className="text-left pr-6 border-r border-slate-100 hidden sm:block">
              <div className="font-extrabold text-slate-900 text-sm">Explore More Exams</div>
              <div className="text-xs text-slate-500">Medical, Engineering & MBA</div>
            </div>
            <Link
              href="/exams"
              className="bg-[#1E6BFF] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-200 hover:shadow-none flex items-center gap-2"
            >
              View All Exams
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =======================
   DATA FETCH
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

/* =======================
   MAIN SECTION
======================= */

export default function FeaturedSection() {
  const { universities, exams, loading } = useFeaturedData();

  return (
    <div className="space-y-32 py-32 bg-gradient-to-br from-white via-slate-50 to-blue-50">

      {/* Universities */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Badge: Updated to glass style with Yellow pulse */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Featured Indian Colleges
          </div>

          {/* Heading: Using Admission Blue */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Top <span className="text-[#1E6BFF]">Indian Colleges</span>
          </h2>

          {/* Subtext: Softer slate for better readability */}
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Explore premier Indian institutions with comprehensive admission details,
            scholarship opportunities, and success stories from our alumni.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {universities.slice(0, 6).map((u: any, i: number) => (
            /* Wrapper to add a premium hover lift effect */
            <div key={i} className="hover:-translate-y-2 transition-transform duration-300">
              <UniversityCard
                name={u.name}
                image={u.banner_url}
                slug={u.slug}
                country={u.country_ref?.name}
                about={u.about_content}
                fees={u.fees}
                duration={u.duration}
                establishment_year={u.establishment_year}
                ranking={typeof u.ranking === 'string' ? u.ranking : u.ranking?.country_ranking}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Exams */}
      <UpcomingExamsSection exams={exams} loading={loading} />
    </div>
  );
}
