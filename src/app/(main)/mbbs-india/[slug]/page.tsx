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
  getAllMbbsIndiaColleges,
  getMbbsIndiaCollegeBySlug,
  getRelatedMbbsIndiaColleges,
} from "@/lib/mbbsIndiaData";
import CollegeEnquireButton from "@/app/Components/CollegeEnquireButton";
import { CollegeJsonLd, BreadcrumbJsonLd } from "@/components/SeoJsonLd";
import { collegePageSeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllMbbsIndiaColleges().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;
  const college = getMbbsIndiaCollegeBySlug(slug);
  if (!college) return { title: "MBBS College" };

  const description =
    `${college.name} in ${college.city}, ${college.stateName} — ${college.type} MBBS college. Fees: ${college.fees}. Seats: ${college.seats}. ${college.recognition} recognised.`;

  return collegePageSeo({
    name: college.name,
    description,
    path: `/mbbs-india/${college.slug}`,
    image: college.image,
    keywords: [
      college.name,
      `MBBS in ${college.stateName}`,
      `MBBS ${college.city}`,
      "NEET UG",
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
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0066F5]/10">
          <Icon className="h-5 w-5 text-[#0066F5]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function MbbsIndiaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = getMbbsIndiaCollegeBySlug(slug);
  if (!college) notFound();

  const related = getRelatedMbbsIndiaColleges(college, 4);
  const description =
    `${college.name} in ${college.city}, ${college.stateName} — ${college.type} MBBS college. Fees: ${college.fees}. Seats: ${college.seats}. ${college.recognition} recognised.`.slice(
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
  const isGovt = (college.type || "").toLowerCase().includes("government");

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <CollegeJsonLd
        name={college.name}
        description={description}
        url={`/mbbs-india/${college.slug}`}
        image={college.image}
        city={college.city}
        country="India"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "MBBS India", url: "/mbbs-india" },
          { name: college.name, url: `/mbbs-india/${college.slug}` },
        ]}
      />

      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={college.image}
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0F172A] via-[#0F172A]/92 to-[#0F172A]/70" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Link
            href="/mbbs-india"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to MBBS India
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0066F5] px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                  <Stethoscope className="h-3.5 w-3.5" />
                  MBBS India
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    isGovt
                      ? "bg-emerald-500 text-white"
                      : "bg-violet-500 text-white"
                  }`}
                >
                  {college.type || "Private"}
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-bold text-white">
                  {college.recognition}
                </span>
              </div>

              <h1 className="mb-4 text-3xl leading-tight font-bold md:text-4xl lg:text-[2.75rem]">
                {college.name}
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-white/90 md:text-base">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#38BDF8]" />
                  {college.city}, {college.stateName}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-300" />
                  {college.ranking}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: IndianRupee, label: "Annual Fees", value: college.fees },
                  { icon: Users, label: "MBBS Seats", value: String(college.seats) },
                  {
                    icon: GraduationCap,
                    label: "Entrance",
                    value: college.entranceExams?.[0] || "NEET UG",
                  },
                  {
                    icon: Building2,
                    label: "NRI Fees",
                    value: college.nriFees || "N/A",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-[#38BDF8]" />
                      <p className="text-[11px] font-bold tracking-wide text-white/60 uppercase">
                        {item.label}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug font-bold md:text-base">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={college.image}
                  alt={college.name}
                  className="h-80 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2.5">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="shrink-0 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-[#E8F1FF] hover:text-[#0066F5]"
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Section id="overview" icon={BookOpen} title="Academic Highlights">
              {(college.academicHighlights?.length ?? 0) > 0 ? (
                <ul className="space-y-3">
                  {college.academicHighlights!.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base leading-relaxed text-slate-800"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0066F5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base leading-relaxed text-slate-700">
                  Explore MBBS at {college.name} with counselling support for
                  NEET UG seat allotment, fees and admission timelines.
                </p>
              )}
              {college.stateDescription && (
                <div className="mt-6 rounded-xl border border-[#0066F5]/15 bg-[#E8F1FF] p-5">
                  <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                    {college.stateDescription}
                  </p>
                </div>
              )}
            </Section>

            <Section id="fees" icon={IndianRupee} title="Fee Structure">
              <div className="grid gap-4 sm:grid-cols-2">
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
                    className={`rounded-xl border border-slate-200 bg-slate-50 p-5 ${
                      row.wide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <p className="mb-1.5 text-xs font-bold tracking-wide text-slate-500 uppercase">
                      {row.label}
                    </p>
                    <p className="text-lg font-bold text-slate-900">{row.value}</p>
                  </div>
                ))}
                <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5 sm:col-span-2">
                  <p className="mb-1.5 text-xs font-bold tracking-wide text-cyan-700 uppercase">
                    NRI / Management Fees
                  </p>
                  <p className="text-lg font-bold text-cyan-950">
                    {college.nriFees || "NOT AVAILABLE"}
                  </p>
                </div>
              </div>
            </Section>

            <Section id="admission" icon={GraduationCap} title="Admission Process">
              <p className="mb-5 text-base leading-relaxed text-slate-800">
                {college.admissionProcess ||
                  `Admission to ${college.name} is based on NEET UG score followed by counselling as per MCC / state authority norms.`}
              </p>
              <div className="flex flex-wrap gap-2">
                {(college.entranceExams?.length
                  ? college.entranceExams
                  : ["NEET UG"]
                ).map((exam) => (
                  <span
                    key={exam}
                    className="rounded-full border border-[#0066F5]/20 bg-[#0066F5]/10 px-3.5 py-2 text-sm font-bold text-[#0066F5]"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="documents" icon={FileText} title="Documents Required">
              {(college.documentsRequired?.length ?? 0) > 0 ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {college.documentsRequired!.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-800"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {doc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-slate-700">
                  Standard NEET UG documents — admit card, scorecard, Class 10/12
                  marksheets, ID proof and allotment letter — are typically
                  required.
                </p>
              )}
            </Section>

            <Section id="placements" icon={Briefcase} title="Placements & Career">
              <p className="mb-6 text-base leading-relaxed text-slate-800">
                {college.placements ||
                  `${college.name} graduates pursue clinical practice, PG seats and roles across leading hospitals.`}
              </p>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="mb-1 text-xs font-bold text-emerald-700 uppercase">
                    Median UG
                  </p>
                  <p className="text-xl font-bold text-emerald-950">
                    {college.placementStats?.medianSalaryUG || "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-[#0066F5]/20 bg-[#E8F1FF] p-5">
                  <p className="mb-1 text-xs font-bold text-[#0047B3] uppercase">
                    Median PG
                  </p>
                  <p className="text-xl font-bold text-[#0047B3]">
                    {college.placementStats?.medianSalaryPG || "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <p className="mb-1 text-xs font-bold text-amber-700 uppercase">
                    Internship
                  </p>
                  <p className="text-xl font-bold text-amber-950">
                    {college.placementStats?.internshipStipend || "—"}
                  </p>
                </div>
              </div>
              {(college.placementStats?.topRecruiters?.length ?? 0) > 0 && (
                <div>
                  <p className="mb-3 text-sm font-bold text-slate-900">
                    Top Recruiters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {college.placementStats!.topRecruiters!.map((r) => (
                      <span
                        key={r}
                        className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700"
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
            <div className="space-y-4 lg:sticky lg:top-32">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={college.image}
                  alt={college.name}
                  className="mb-4 h-44 w-full rounded-xl object-cover"
                />
                <h3 className="mb-1 line-clamp-2 text-lg font-bold text-slate-900">
                  {college.name}
                </h3>
                <p className="mb-5 text-sm text-slate-500">
                  {college.city}, {college.stateName}
                </p>
                <div className="mb-5 space-y-3 border-b border-slate-100 pb-5 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-500">Fees</span>
                    <span className="text-right font-bold text-slate-900">
                      {college.fees}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-500">Seats</span>
                    <span className="font-bold text-slate-900">{college.seats}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-500">Type</span>
                    <span className="font-bold text-slate-900">
                      {college.type || "Private"}
                    </span>
                  </div>
                </div>
                <CollegeEnquireButton collegeName={college.name} />
                <Link
                  href="/mbbs-india"
                  className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-[#0066F5] hover:text-[#0066F5]"
                >
                  Browse more MBBS
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-2xl bg-linear-to-br from-[#0066F5] to-[#0047B3] p-6 text-white shadow-lg shadow-blue-500/20">
                <Building2 className="mb-3 h-8 w-8 text-white/80" />
                <h3 className="mb-2 text-lg font-bold">Need counselling?</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/90">
                  Get free guidance for NEET UG counselling and college
                  shortlisting.
                </p>
                <CollegeEnquireButton
                  collegeName={college.name}
                  variant="light"
                />
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              More MBBS colleges in {college.stateName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/mbbs-india/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#0066F5] hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-[#0066F5]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500">
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
