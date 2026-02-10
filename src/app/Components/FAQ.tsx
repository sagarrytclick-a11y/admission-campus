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
      question: "What services does Alpha World Education provide?",
      answer: "We provide end-to-end study abroad support including university admissions, visa assistance, scholarships, documentation, pre-departure guidance, and post-arrival support.",
      category: "benefits"
    },
    {
      question: "How do I apply through Alpha World Education?",
      answer: "The process includes profile evaluation, course & country selection, document preparation, university applications, offer acceptance, visa filing, and departure support.",
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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none opacity-60" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Common Queries
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Frequently Asked <span className="text-[#1E6BFF]">Questions</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Clear answers to common questions about studying abroad with Alpha World Education. 
            We're here to simplify your journey.
          </p>
        </div>

        {/* Modern Category Pill Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-[#1E6BFF] text-white border-[#1E6BFF] shadow-lg shadow-blue-200"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List - Refined Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`group transition-all duration-300 rounded-[24px] border ${
                openIndex === index 
                ? "bg-blue-50/30 border-[#1E6BFF]/20 shadow-sm" 
                : "bg-white border-slate-200 hover:border-[#1E6BFF]/30"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    openIndex === index ? "bg-[#1E6BFF] text-white" : "bg-slate-50 text-[#1E6BFF]"
                  }`}>
                    <HelpCircle size={18} />
                  </div>
                  <span className={`font-bold text-base transition-colors ${
                    openIndex === index ? "text-slate-900" : "text-slate-700 group-hover:text-[#1E6BFF]"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-[#1E6BFF]" : "text-slate-400"
                  }`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-20 pb-8 text-slate-500 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact CTA Footer Section */}
        <div className="mt-20 bg-slate-900 rounded-[40px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E6BFF] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-[#FFD700] mx-auto mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-sm">
              Speak with our certified education consultants and get a personalised roadmap for your future.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={openModal}
                className="px-10 py-4 bg-[#1E6BFF] text-white rounded-full font-bold text-sm hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Phone size={18} /> Free Counselling
              </button>
              <button
                onClick={openModal}
                className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold text-sm hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
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