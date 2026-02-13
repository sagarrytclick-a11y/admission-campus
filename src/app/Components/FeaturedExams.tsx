"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  FileText,
  Calendar,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

// Brand Color Constants - Strictly using #1A4AB2
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";
const SOFT_SLATE = "#64748B";

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
  about,
  overview,
  exams,
  annual_tuition_fee,
  courses,
  accreditation
}: any) => {

  return (
    <Link href={`/colleges/${slug}`} className="block h-full group">
      <div className="bg-white border border-slate-200/60 rounded-[40px] overflow-hidden hover:border-[#1A4AB2]/40 hover:shadow-[0_30px_60px_rgba(26,74,178,0.12)] transition-all duration-500 flex flex-col h-full relative">

        {/* Image Container */}
        <div className="h-60 bg-slate-100 relative overflow-hidden">
          <img
            src={image || `https://picsum.photos/seed/${slug}/400/300`}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Ranking Badge */}
          {ranking && (
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 border border-white/50">
              <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
              Rank #{ranking}
            </div>
          )}

          {/* Location Badge */}
          <div className="absolute bottom-5 left-5 bg-slate-900/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-2 border border-white/10">
            <MapPin size={12} className="text-[#FACC15]" />
            {country}
          </div>

          {/* Accreditation */}
          {accreditation && (
            <div className="absolute top-5 right-5 bg-[#1A4AB2] text-white px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
              {accreditation}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-3 group-hover:text-[#1A4AB2] transition-colors duration-300 line-clamp-2">
            {name}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
            {overview || about || "Discover excellence in education with state-of-the-art facilities and industry-leading placement opportunities."}
          </p>

          {/* Entrance Exams */}
          {exams && exams.length > 0 && (
            <div className="mb-6">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-3">Entrance Exams</p>
              <div className="flex flex-wrap gap-2">
                {exams.slice(0, 3).map((exam: string, index: number) => (
                  <span key={index} className="bg-[#1A4AB2]/5 text-[#1A4AB2] px-3 py-1.5 rounded-xl text-[10px] font-bold border border-[#1A4AB2]/10 transition-colors group-hover:bg-[#1A4AB2]/10">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Popular Courses */}
          {courses && courses.length > 0 && (
            <div className="mb-6">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-3">Top Disciplines</p>
              <div className="flex flex-wrap gap-2">
                {courses.slice(0, 3).map((course: any, index: number) => (
                  <span key={index} className="bg-[#1A4AB2]/5 text-[#1A4AB2] px-3 py-1.5 rounded-xl text-[10px] font-bold border border-[#1A4AB2]/10 transition-colors group-hover:bg-[#1A4AB2]/10">
                    {typeof course === 'string' ? course : course.course_name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-4 transition-all group-hover:bg-[#1A4AB2]/5 group-hover:border-[#1A4AB2]/10">
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Avg Fees</p>
              <p className="font-bold text-slate-900 text-sm">
                {annual_tuition_fee
                  ? (annual_tuition_fee.toString()
                    ? annual_tuition_fee
                    : `${annual_tuition_fee}`)
                  : (fees ? `${fees}` : 'Contact for fees')
                }
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-4">
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Duration</p>
              <p className="font-bold text-slate-900 text-sm">{duration || "4"} Years</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Est. Year</span>
              <span className="text-sm font-bold text-slate-700">{establishment_year || "---"}</span>
            </div>

            <div className="bg-[#1A4AB2] text-white p-3 rounded-2xl group-hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-[#1A4AB2]/20 group-hover:shadow-none">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =======================
   UPCOMING EXAMS SECTION
======================= */

const UpcomingExamsSection = ({ exams, loading }: { exams: any[]; loading: boolean }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/5 border border-[#1A4AB2]/10 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Entrance Calendar 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Upcoming <span className="text-[#1A4AB2]">Exam Dates</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-60 bg-slate-50 rounded-[40px] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {exams.slice(0, 8).map((exam, idx) => (
              <Link key={idx} href={`/exams/${exam.slug}`} className="group bg-slate-50 border border-slate-200 rounded-[40px] p-8 hover:bg-white hover:border-[#1A4AB2]/20 hover:shadow-2xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white text-[#1A4AB2] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all shadow-md mb-6">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-[#1A4AB2] transition-colors">{exam.short_name || exam.name}</h3>
                <div className="flex items-center gap-2 text-[10px] text-[#1A4AB2] font-black uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full"></span> Live Registration
                </div>
                <div className="mt-4 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Exam Date</p>
                    <p className="text-sm font-bold text-slate-800">{exam.next_date || "Coming Soon"}</p>
                  </div>
                  <div className="text-slate-300 group-hover:text-[#1A4AB2] transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center bg-slate-900 text-white rounded-[40px] pl-10 pr-5 py-5 shadow-2xl">
            <div className="flex -space-x-3 mr-8">
              {[1, 2, 3].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-[#FACC15] text-slate-900 text-[10px] font-black flex items-center justify-center">+10k</div>
            </div>
            <p className="text-sm font-bold mr-12 hidden md:block tracking-tight">Join 10,000+ students tracking exam schedules</p>
            <Link href="/exams" className="bg-[#1A4AB2] px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-3 shadow-lg">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =======================
   MAIN SECTION
======================= */

export default function FeaturedSection() {
  const { universities, exams, loading } = useFeaturedData();

  return (
    <div className="space-y-32 py-32 bg-[#F8FAFC]">
      {/* Universities */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/5 border border-[#1A4AB2]/10 text-[#1A4AB2] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-sm">
            <span className="w-3 h-3 bg-[#FACC15] rounded-full animate-pulse"></span>
            Partner Institutions
          </div>
          <h2 className="text-4xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tighter">
            Top <span className="text-[#1A4AB2]">Indian Colleges</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Detailed guides on admissions, course structures, and placement records for India's elite academic universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {universities.slice(0, 6).map((u: any, i: number) => (
            <UniversityCard
              key={i}
              name={u.name}
              image={u.banner_url}
              slug={u.slug}
              country={u.country_ref?.name}
              about={u.about_content}
              fees={u.fees_structure?.courses?.[0]?.annual_tuition_fee}
              duration={u.fees_structure?.courses?.[0]?.duration}
              establishment_year={u.establishment_year}
              ranking={u.ranking?.country_ranking || u.ranking}
              courses={u.popular_courses || ["Engineering", "Medicine", "Management"]}
              accreditation={u.accreditation || "AICTE"}
            />
          ))}
        </div>
      </section>

      <UpcomingExamsSection exams={exams} loading={loading} />
    </div>
  );
}

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