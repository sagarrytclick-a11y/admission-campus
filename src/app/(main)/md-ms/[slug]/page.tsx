import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Award,
  GraduationCap,
  FileText,
  CheckCircle2,
  Briefcase,
  BookOpen,
  ChevronRight,
  Stethoscope,
  Building2,
  ArrowLeft,
  IndianRupee,
  Users,
} from "lucide-react";
import {
  getAllMdMsColleges,
  getMdMsCollegeBySlug,
  getRelatedMdMsColleges,
} from "@/lib/mdMsData";
import MdMsEnquireButton from "@/app/Components/CollegeEnquireButton";
import { CollegeJsonLd, BreadcrumbJsonLd } from "@/components/SeoJsonLd";
import { collegePageSeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllMdMsColleges().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const college = getMdMsCollegeBySlug(slug);
  if (!college) return { title: "MD/MS College" };

  const description =
    `${college.name} in ${college.city}, ${college.stateName} — ${college.type} MD/MS college. Fees: ${college.fees}. Seats: ${college.seats}. ${college.recognition} recognised.`;

  return collegePageSeo({
    name: college.name,
    description,
    path: `/md-ms/${college.slug}`,
    image: college.image,
    keywords: [
      college.name,
      `MD MS ${college.stateName}`,
      "NEET PG",
      college.type || "Medical College",
    ],
  });
}

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 scroll-mt-28 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-11 h-11 rounded-xl bg-[#0066F5]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#0066F5]" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function MdMsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = getMdMsCollegeBySlug(slug);
  if (!college) notFound();

  const related = getRelatedMdMsColleges(college, 4);
  const description =
    `${college.name} in ${college.city}, ${college.stateName} — ${college.type} MD/MS college. Fees: ${college.fees}. Seats: ${college.seats}. ${college.recognition} recognised.`.slice(
      0,
      160
    );
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "fees", label: "Fees" },
    { id: "admission", label: "Admission" },
    { id: "documents", label: "Documents" },
    { id: "placements", label: "Placements" },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <CollegeJsonLd
        name={college.name}
        description={description}
        url={`/md-ms/${college.slug}`}
        image={college.image}
        city={college.city}
        country="India"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "MD/MS Colleges", url: "/md-ms" },
          { name: college.name, url: `/md-ms/${college.slug}` },
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={college.image}
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0F172A] via-[#0F172A]/92 to-[#0F172A]/70" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <Link
            href="/md-ms"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to MD/MS Colleges
          </Link>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#0066F5] text-white px-3 py-1.5 rounded-full">
                  <Stethoscope className="w-3.5 h-3.5" />
                  MD / MS
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    college.type.toLowerCase().includes("government")
                      ? "bg-emerald-500 text-white"
                      : "bg-violet-500 text-white"
                  }`}
                >
                  {college.type}
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/20">
                  {college.recognition}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-4">
                {college.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base mb-8">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#38BDF8]" />
                  {college.city}, {college.stateName}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" />
                  {college.ranking}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: IndianRupee, label: "Annual Fees", value: college.fees },
                  { icon: Users, label: "PG Seats", value: String(college.seats) },
                  {
                    icon: GraduationCap,
                    label: "Entrance",
                    value: college.entranceExams?.[0] || "NEET PG",
                  },
                  {
                    icon: Building2,
                    label: "NRI Fees",
                    value: college.nriFees || "N/A",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4 text-[#38BDF8]" />
                      <p className="text-[11px] uppercase tracking-wide text-white/60 font-bold">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-sm md:text-base font-bold leading-snug line-clamp-2">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2.5">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="shrink-0 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-[#0066F5] hover:bg-[#E8F1FF] rounded-lg transition-colors"
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Section id="overview" icon={BookOpen} title="Academic Highlights">
              <ul className="space-y-3">
                {college.academicHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-800 text-base leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#0066F5] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {college.stateDescription && (
                <div className="mt-6 p-5 rounded-xl bg-[#E8F1FF] border border-[#0066F5]/15">
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    {college.stateDescription}
                  </p>
                </div>
              )}
            </Section>

            <Section id="fees" icon={IndianRupee} title="Fee Structure">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Tuition Fee",
                    value: college.detailedFees?.tuitionFee || college.fees,
                  },
                  {
                    label: "Hostel Fee",
                    value: college.detailedFees?.hostelFee || "Not specified",
                  },
                  {
                    label: "Other Charges",
                    value: college.detailedFees?.otherFees || "As applicable",
                    wide: true,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`p-5 rounded-xl border border-slate-200 bg-slate-50 ${
                      row.wide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">
                      {row.label}
                    </p>
                    <p className="text-lg font-bold text-slate-900">{row.value}</p>
                  </div>
                ))}
                <div className="p-5 rounded-xl border border-cyan-200 bg-cyan-50 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 mb-1.5">
                    NRI / Management Fees
                  </p>
                  <p className="text-lg font-bold text-cyan-950">
                    {college.nriFees}
                  </p>
                </div>
              </div>
            </Section>

            <Section id="admission" icon={GraduationCap} title="Admission Process">
              <p className="text-slate-800 text-base leading-relaxed mb-5">
                {college.admissionProcess}
              </p>
              <div className="flex flex-wrap gap-2">
                {college.entranceExams.map((exam) => (
                  <span
                    key={exam}
                    className="px-3.5 py-2 rounded-full bg-[#0066F5]/10 text-[#0066F5] text-sm font-bold border border-[#0066F5]/20"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="documents" icon={FileText} title="Documents Required">
              <ul className="grid sm:grid-cols-2 gap-3">
                {college.documentsRequired.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 text-slate-800 text-sm bg-slate-50 border border-slate-200 rounded-xl p-3.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="placements" icon={Briefcase} title="Placements & Career">
              <p className="text-slate-800 text-base leading-relaxed mb-6">
                {college.placements}
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-xs font-bold text-emerald-700 uppercase mb-1">
                    Median UG
                  </p>
                  <p className="text-xl font-bold text-emerald-950">
                    {college.placementStats?.medianSalaryUG || "—"}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#E8F1FF] border border-[#0066F5]/20">
                  <p className="text-xs font-bold text-[#0047B3] uppercase mb-1">
                    Median PG
                  </p>
                  <p className="text-xl font-bold text-[#0047B3]">
                    {college.placementStats?.medianSalaryPG || "—"}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-xs font-bold text-amber-700 uppercase mb-1">
                    Internship
                  </p>
                  <p className="text-xl font-bold text-amber-950">
                    {college.placementStats?.internshipStipend || "—"}
                  </p>
                </div>
              </div>
              {(college.placementStats?.topRecruiters?.length ?? 0) > 0 && (
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-3">
                    Top Recruiters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {college.placementStats.topRecruiters!.map((r) => (
                      <span
                        key={r}
                        className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-slate-700"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />
                <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-2">
                  {college.name}
                </h3>
                <p className="text-sm text-slate-500 mb-5">
                  {college.city}, {college.stateName}
                </p>
                <div className="space-y-3 text-sm mb-5 pb-5 border-b border-slate-100">
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 font-medium">Fees</span>
                    <span className="font-bold text-slate-900 text-right">
                      {college.fees}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 font-medium">Seats</span>
                    <span className="font-bold text-slate-900">{college.seats}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 font-medium">Type</span>
                    <span className="font-bold text-slate-900">{college.type}</span>
                  </div>
                </div>
                <MdMsEnquireButton collegeName={college.name} />
                <Link
                  href="/md-ms"
                  className="mt-3 w-full inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:border-[#0066F5] hover:text-[#0066F5] transition-colors"
                >
                  Browse more MD/MS
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-linear-to-br from-[#0066F5] to-[#0047B3] text-white rounded-2xl p-6 shadow-lg shadow-blue-500/20">
                <Building2 className="w-8 h-8 text-white/80 mb-3" />
                <h3 className="font-bold text-lg mb-2">Need counselling?</h3>
                <p className="text-sm text-white/90 mb-4 leading-relaxed">
                  Get free guidance for NEET PG counselling and college shortlisting.
                </p>
                <MdMsEnquireButton collegeName={college.name} variant="light" />
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              More MD/MS colleges in {college.stateName}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/md-ms/${item.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0066F5] hover:shadow-md transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-[#0066F5]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {item.city} · {item.seats} seats
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
