import React from "react";
import {
  Users,
  CheckCircle2,
  Globe,
  Target,
  GraduationCap,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#12141D] text-[#F8FAFC]">

      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Empowering Futures at
            <span className="text-[#007BFF]"> Admission Campus</span>
          </h1>

          <p className="text-lg text-[#94A3B8] leading-relaxed">
            Admission Campus helps students discover the best colleges,
            understand entrance exams, and secure admissions with
            expert guidance and transparent processes.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-[#1E212B]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div className="bg-[#12141D] p-8 rounded-xl border border-slate-800">
            <Target className="text-[#007BFF] mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              To make quality education accessible by providing transparent
              admission guidance and personalized counseling to students.
            </p>
          </div>

          <div className="bg-[#12141D] p-8 rounded-xl border border-slate-800">
            <Globe className="text-[#007BFF] mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              To become the most trusted platform helping millions of students
              choose the right university and build successful careers.
            </p>
          </div>

          <div className="bg-[#12141D] p-8 rounded-xl border border-slate-800">
            <Award className="text-[#007BFF] mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Integrity, transparency, and student success drive everything
              we do at Admission Campus.
            </p>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {[
              {
                value: "50K+",
                label: "Students Helped",
                icon: <Users className="text-[#007BFF]" size={20} />,
              },
              {
                value: "6000+",
                label: "Institutions",
                icon: <GraduationCap className="text-[#007BFF]" size={20} />,
              },
              {
                value: "200+",
                label: "Exams Covered",
                icon: <BookOpen className="text-[#007BFF]" size={20} />,
              },
              {
                value: "150+",
                label: "Countries",
                icon: <Globe className="text-[#007BFF]" size={20} />,
              },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[#94A3B8] uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">
              What We <span className="text-[#007BFF]">Offer</span>
            </h2>
            <p className="text-[#94A3B8]">
              Complete support system for students planning higher education.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                icon: <Users size={24} />,
                title: "Career Counseling",
                desc: "Personalized guidance to help students choose the right career path."
              },
              {
                icon: <CheckCircle2 size={24} />,
                title: "Admission Assistance",
                desc: "End-to-end help in applying to top colleges and universities."
              },
              {
                icon: <Zap size={24} />,
                title: "Scholarship Support",
                desc: "Guidance to secure merit-based and financial scholarships."
              },
              {
                icon: <Globe size={24} />,
                title: "Global Universities",
                desc: "Access to universities and colleges across the world."
              }
            ].map((service, i) => (

              <div
                key={i}
                className="bg-[#1E212B] p-8 rounded-xl border border-slate-800 hover:border-[#007BFF] transition"
              >
                <div className="text-[#007BFF] mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {service.desc}
                </p>
              </div>

            ))}

          </div>

        </div>
      </section>

    </main>
  );
}