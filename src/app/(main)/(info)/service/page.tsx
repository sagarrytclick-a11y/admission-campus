import React from 'react';
import { GraduationCap, FileText, DollarSign, BookOpen, TrendingUp, Home, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import FAQ from "@/app/Components/FAQ";
import FreeAssessmentButton from "@/components/FreeAssessmentButton";

const ServicesPage = () => {
  const services = [
    {
      title: "College Admissions", 
      desc: "Strategic matching with top-tier institutions based on your academic profile.",
      icon: <GraduationCap size={24} />
    },
    {
      title: "Exam Preparation", 
      desc: "Intensive preparation for JEE, NEET, and CAT with proven success rates.",
      icon: <FileText size={24} />
    },
    {
      title: "Campus Housing", 
      desc: "Verified, safe, and convenient accommodation near major universities.",
      icon: <Home size={24} />
    },
    {
      title: "Scholarships", 
      desc: "Navigate financial aid and secure exclusive scholarship opportunities.",
      icon: <DollarSign size={24} />
    },
    {
      title: "Career Guidance", 
      desc: "Personalized mentorship to align your degree with industry opportunities.",
      icon: <TrendingUp size={24} />
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-white">
      
      {/* Hero Section */}
      <section className="py-20 bg-[#1E293B] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#007BFF]/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Star className="w-4 h-4" />
            Premium Services
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Complete Admission Support
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            From strategic college selection to visa processing — we manage every step.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
              Our <span className="text-[#007BFF]">Services</span>
            </h2>
            <p className="text-[#64748B] text-lg">
              Comprehensive guidance tailored to your academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 bg-[#F8FAFC] border border-slate-200 rounded-xl hover:border-[#007BFF] hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-xl bg-[#007BFF]/10 text-[#007BFF] flex items-center justify-center mb-6 group-hover:bg-[#007BFF] group-hover:text-white transition-all">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-[#1E293B] mb-3 group-hover:text-[#007BFF] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-[#64748B] leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                <div className="pt-4 border-t border-slate-200/50">
                  <Link href="#" className="inline-flex items-center gap-2 text-[#007BFF] font-medium hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-8 py-4 mb-8">
            <ShieldCheck className="w-6 h-6 text-[#007BFF]" />
            <span className="text-[#64748B] font-medium">50+ Years of Excellence</span>
          </div>
          
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Ready to <span className="text-[#007BFF]">Get Started?</span>
          </h2>
          
          <p className="text-[#64748B] text-lg mb-8">
            Join thousands of students who've achieved their dream education goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2">
              Talk to Expert
              <ArrowRight size={18} />
            </Link>
            
            <FreeAssessmentButton />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <FAQ />
      </section>
    </div>
  );
};

export default ServicesPage;