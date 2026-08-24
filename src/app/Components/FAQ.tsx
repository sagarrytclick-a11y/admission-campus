"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function FAQ() {
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
      answer: "We provide comprehensive admission support including university applications, visa assistance, scholarship guidance, documentation help, and post-admission support for students.",
      category: "benefits"
    },
    {
      question: "How do I apply through Admission Campus?",
      answer: "Our streamlined process includes profile assessment, course selection, document preparation, application submission, and enrollment support.",
      category: "process"
    },
    {
      question: "Which countries can I study in?",
      answer: "We assist students for USA, UK, Canada, Australia, Germany, Ireland, New Zealand, and major European destinations.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements?",
      answer: "Eligibility generally includes academic records, English proficiency (IELTS/TOEFL), SOP, and financial documents depending on the university.",
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
    <section className="py-8 sm:py-[32px] bg-white font-sans text-[#1E293B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-[#0066F5] mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Support Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1E293B]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748B] text-sm max-w-xl mx-auto font-medium">
            Everything you need to know about the admission process and our specialized services.
          </p>
        </div>

        {/* Category Filter - Simple Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`min-h-10 px-4 sm:px-5 py-2.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
                activeCategory === cat.id
                  ? "bg-[#0066F5] text-white border-[#0066F5] shadow-sm"
                  : "bg-[#F8FAFC] text-[#64748B] border-slate-100 hover:border-[#0066F5] hover:text-[#0066F5]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List - Clean Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all border rounded-lg ${
                openIndex === index
                  ? "bg-[#F8FAFC] border-[#0066F5]"
                  : "bg-white border-slate-100 hover:border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center gap-3 text-left"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <HelpCircle size={18} className={`shrink-0 ${openIndex === index ? "text-[#0066F5]" : "text-slate-300"}`} />
                  <span className="font-semibold text-sm md:text-base text-[#1E293B]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown size={18} className={`shrink-0 transition-transform text-[#64748B] ${openIndex === index ? "rotate-180 text-[#0066F5]" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-[#64748B] text-xs md:text-sm leading-relaxed font-medium sm:ml-8">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}