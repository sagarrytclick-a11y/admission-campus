import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Globe,
  Target,
  GraduationCap,
  BookOpen,
  Award,
  Zap,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import AboutClientButtons from "@/components/AboutClientButtons";

export default function AboutPage() {
  const pillars = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "Make quality education accessible with transparent guidance and personalised counselling for every student.",
    },
    {
      icon: Globe,
      title: "Our Vision",
      desc: "Be India’s most trusted admission partner — helping students choose the right college and career path.",
    },
    {
      icon: ShieldCheck,
      title: "Our Values",
      desc: "Integrity, clarity and student success drive every recommendation we make at Admission Campus.",
    },
  ];

  const offers = [
    {
      icon: Users,
      title: "Career Counselling",
      desc: "Personalised guidance to match aptitude, goals and entrance scores with the right courses.",
    },
    {
      icon: CheckCircle2,
      title: "Admission Assistance",
      desc: "End-to-end help for applications, documentation and counselling rounds.",
    },
    {
      icon: Stethoscope,
      title: "MD / MS Guidance",
      desc: "Dedicated NEET PG support — college shortlisting, fees clarity and seat strategy.",
    },
    {
      icon: Zap,
      title: "Scholarship Support",
      desc: "Help finding merit and need-based options so finances don’t block your dream college.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Students Guided", icon: Users },
    { value: "6000+", label: "Institutions", icon: GraduationCap },
    { value: "200+", label: "Exams Covered", icon: BookOpen },
    { value: "98+", label: "MD/MS Colleges", icon: Award },
  ];

  return (
    <main className="min-h-screen bg-[#F4F7FC] text-[#0F172A]">
      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[#0B1220]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B1220]/75 via-[#0B1220]/60 to-[#0B1220]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0066F5]/40 via-transparent to-[#0047B3]/30" />
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-[32rem] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(0,102,245,0.55), transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16 pb-16 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 mb-6">
            <HeartHandshake size={14} className="text-white" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">
              About Admission Campus
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl mx-auto mb-4">
            Empowering futures with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">clear guidance</span>
              <span className="absolute inset-x-0 bottom-1 h-2.5 bg-[#0066F5]/50 rounded-sm -z-0" />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl mx-auto mb-8">
            We help students discover the right colleges, understand entrance
            exams, and secure admissions — with expert counselling and
            transparent processes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <AboutClientButtons />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold px-6 py-3 text-sm hover:bg-white/20 transition-colors"
            >
              Talk to us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-8 bg-[#F4F7FC] rounded-t-[2rem]" />
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-2 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 text-center hover:border-[#0066F5]/40 transition-colors"
              >
                <stat.icon className="w-5 h-5 text-[#0066F5] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0066F5] mb-2">
              Who we are
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Built around students — not sales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl border border-[#E2E8F0] p-7 hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F1FF] text-[#0066F5] flex items-center justify-center mb-5 group-hover:bg-[#0066F5] group-hover:text-white transition-colors">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#0066F5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story band */}
      <section className="py-12 md:py-14 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0066F5] mb-2">
              Our story
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4 leading-tight">
              From confusion to clarity — that&apos;s the journey we own
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
              Choosing a college in India can feel overwhelming: rankings, fees,
              cut-offs, counselling rounds. Admission Campus was built to cut
              through the noise with honest advice and structured support.
            </p>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
              Whether you&apos;re targeting MD/MS, engineering, management or
              medical UG — our counsellors help you shortlist smartly and apply
              confidently.
            </p>
            <Link
              href="/md-ms"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0066F5] hover:underline"
            >
              Explore MD / MS colleges
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm min-h-[260px] bg-[#E8F1FF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pinimg.com/1200x/65/2a/75/652a75f2f15af37a7a13dc57ded22239.jpg"
              alt="Students discussing admissions"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B1220]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                Trusted guidance
              </p>
              <p className="text-lg font-bold">
                Counselling that puts your goals first
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0066F5] mb-2">
              What we offer
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
              Support for every step of admissions
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              A complete system for students planning higher education in India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offers.map((service) => (
              <div
                key={service.title}
                className="group bg-white p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/10 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E8F1FF] text-[#0066F5] flex items-center justify-center mb-4 group-hover:bg-[#0066F5] group-hover:text-white transition-colors">
                  <service.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2 group-hover:text-[#0066F5] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#0066F5] text-white overflow-hidden relative px-6 sm:px-10 py-10 md:py-12 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(255,255,255,0.25), transparent 50%)",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to plan your next admission?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-7">
              Get a free counselling call — we&apos;ll help you shortlist
              colleges and map your next steps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <AboutClientButtons />
              <Link
                href="/colleges"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white text-white font-bold px-6 py-3 text-sm hover:bg-white hover:text-[#0066F5] transition-colors"
              >
                Browse colleges
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
