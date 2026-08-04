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
    <section className="py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-4xl mx-auto px-6 lg:px-24">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[#007BFF] mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Support Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1E293B]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748B] text-sm max-w-xl mx-auto font-medium">
            Everything you need to know about the admission process and our specialized services.
          </p>
        </div>

        {/* Category Filter - Simple Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-5 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border ${
                activeCategory === cat.id
                  ? "bg-[#007BFF] text-white border-[#007BFF] shadow-sm"
                  : "bg-[#F8FAFC] text-[#64748B] border-slate-100 hover:border-[#007BFF] hover:text-[#007BFF]"
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
                  ? "bg-[#F8FAFC] border-[#007BFF]"
                  : "bg-white border-slate-100 hover:border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle size={18} className={`${openIndex === index ? "text-[#007BFF]" : "text-slate-300"}`} />
                  <span className="font-semibold text-sm md:text-base text-[#1E293B]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown size={18} className={`transition-transform text-[#64748B] ${openIndex === index ? "rotate-180 text-[#007BFF]" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-6 pb-6 text-[#64748B] text-xs md:text-sm leading-relaxed font-medium ml-8">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Minimal Box */}
        <div className="mt-16 bg-[#F8FAFC] border border-slate-100 rounded-lg p-10 text-center">
          <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[#007BFF] mx-auto mb-6 shadow-sm">
            <MessageSquare size={22} />
          </div>
          <h3 className="text-xl font-bold text-[#1E293B] mb-2">
            Still have questions?
          </h3>
          <p className="text-[#64748B] text-xs font-medium mb-8">
            Speak with our expert counselors and get a personalized roadmap for your career.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={openModal}
              className="px-6 py-3 bg-[#1E293B] text-white rounded-md font-bold text-[10px] uppercase tracking-wider hover:bg-[#007BFF] transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={14} /> Free Counselling
            </button>
            <button
              onClick={openModal}
              className="px-6 py-3 bg-white border border-slate-200 text-[#1E293B] rounded-md font-bold text-[10px] uppercase tracking-wider hover:border-[#007BFF] hover:text-[#007BFF] transition-all flex items-center justify-center gap-2"
            >
              <Mail size={14} /> Contact Support
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}