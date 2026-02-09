"use client"
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Wallet,
  Globe,
  GraduationCap,
  Users
} from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Career & Course Counseling",
    desc: "Personalized guidance to help students choose the right course and university."
  },
  {
    icon: ShieldCheck,
    title: "Visa & Admission Assistance",
    desc: "End-to-end admission and visa support with a high success rate."
  },
  {
    icon: GraduationCap,
    title: "University Applications",
    desc: "Applications to top universities across USA, UK, Canada, Australia & Europe."
  },
  {
    icon: Wallet,
    title: "Scholarships & Financial Aid",
    desc: "Support in securing scholarships and managing education finances."
  },
  {
    icon: Globe,
    title: "IELTS / TOEFL / GRE Prep",
    desc: "Expert coaching and preparation for international entrance exams."
  },
  {
    icon: Users,
    title: "Pre & Post Departure Support",
    desc: "Accommodation, travel, and student support even after admission."
  }
];

export default function ComprehensiveServices() {
  return (
    <section id="services" className="py-24 bg-gradient-to-br from-white via-blue-50 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Settings size={16} />
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Complete <span className="text-blue-600">Support System</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From initial counseling to post-arrival support, we provide comprehensive 
            services to ensure your study abroad journey is smooth and successful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <service.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {service.desc}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1">
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Settings size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-10 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Get personalized guidance from our expert counselors. 
              Schedule your free consultation today and take the first step towards your dream education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/service"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Services
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
