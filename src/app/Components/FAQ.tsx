"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const { openModal } = useFormModal();

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "admissions", name: "Admissions" },
    { id: "process", name: "Process" },
    { id: "support", name: "Support" },
    { id: "benefits", name: "Scholarships" }
  ];

  const faqs = [
    {
      question: "What services does Admission Campus provide?",
      answer: "We provide comprehensive admission support including university applications, visa assistance, scholarship guidance, documentation help, pre-departure orientation, and post-admission support for students.",
      category: "benefits"
    },
    {
      question: "How do I apply through Admission Campus?",
      answer: "Our streamlined process includes profile assessment, course selection, document preparation, application submission, offer management, visa processing, and enrollment support.",
      category: "process"
    },
    {
      question: "Which countries can I study in?",
      answer: "We assist students for USA, UK, Canada, Australia, Germany, Ireland, New Zealand, and major European destinations.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements?",
      answer: "Eligibility depends on the university and course, but generally includes academic records, English proficiency (IELTS/TOEFL), SOP, and financial documents.",
      category: "admissions"
    },
    {
      question: "Do you help with scholarships?",
      answer: "Yes. We help students identify and apply for merit-based and need-based scholarships offered by universities and governments.",
      category: "benefits"
    }
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter(f => f.category === activeCategory);

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1A4AB2]/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none opacity-60" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Common Queries
          </div>
          <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter">
            Frequently Asked <span className="text-[#1A4AB2]">Questions</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Clear answers to common questions about college admissions and applications.
            We're here to simplify your path to higher education success.
          </p>
        </div>

        {/* Category Pill Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat.id
                  ? "bg-[#1A4AB2] text-white border-[#1A4AB2] shadow-xl shadow-blue-900/20"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#1A4AB2] hover:text-[#1A4AB2]"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 rounded-[40px] border ${openIndex === index
                  ? "bg-white border-[#1A4AB2]/20 shadow-[0_30px_60px_rgba(26,74,178,0.08)]"
                  : "bg-white border-slate-200 hover:border-[#1A4AB2]/30"
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-10 py-8 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${openIndex === index ? "bg-[#1A4AB2] text-white rotate-6" : "bg-[#1A4AB2]/5 text-[#1A4AB2]"
                    }`}>
                    <HelpCircle size={20} />
                  </div>
                  <span className={`font-extrabold text-base transition-colors ${openIndex === index ? "text-slate-900" : "text-slate-700 group-hover:text-[#1A4AB2]"
                    }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${openIndex === index ? "border-[#1A4AB2] bg-[#1A4AB2]/5 rotate-180" : "border-slate-200"
                  }`}>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "text-[#1A4AB2]" : "text-slate-400"
                      }`}
                  />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                <div className={`px-20 pb-8 text-slate-600 text-sm leading-relaxed`}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer Section */}
        <div className="mt-24 bg-slate-900 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A4AB2] opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-[#FACC15] mx-auto mb-8 shadow-inner">
              <MessageSquare size={30} />
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Still have questions?
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-base leading-relaxed">
              Speak with our expert admission counselors and get a personalized roadmap for your academic journey.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={openModal}
                className="px-10 py-4 bg-[#1A4AB2] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <Phone size={18} /> Free Counselling
              </button>
              <button
                onClick={openModal}
                className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Mail size={18} /> Contact Support
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;