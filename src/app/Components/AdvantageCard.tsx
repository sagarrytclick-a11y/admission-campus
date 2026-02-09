"use client"
import { GraduationCap, ShieldCheck, Globe, Star } from "lucide-react";

export default function AlphaWorldAdvantage() {
  const stats = [
    { label: "Students Guided", value: "15,000+" },
    { label: "Visa Success Rate", value: "99%" },
    { label: "Scholarships Secured", value: "₹2 Crore+" },
    { label: "Partner Universities", value: "200+" },
  ];

  const points = [
    {
      icon: GraduationCap,
      title: "Experienced Education Counselors",
      desc: "Certified counselors with years of experience in international admissions."
    },
    {
      icon: Globe,
      title: "Global University Network",
      desc: "Direct partnerships with universities in USA, UK, Canada, Australia & Europe."
    },
    {
      icon: ShieldCheck,
      title: "High Visa Approval Rate",
      desc: "Accurate documentation and expert guidance for maximum approval chances."
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Trusted Study Abroad Consultants
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            We help students achieve their international education goals through expert guidance,
            transparent processes, and strong global partnerships.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="border border-slate-200 bg-slate-50 p-6 text-center"
            >
              <div className="text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
              <div className="text-xs uppercase font-semibold tracking-widest text-slate-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((item, i) => (
            <div
              key={i}
              className="border border-slate-200 bg-white p-6 hover:border-blue-500 transition"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-lg mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
