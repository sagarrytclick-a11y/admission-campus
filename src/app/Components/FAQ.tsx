"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  Award
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const { openModal } = useFormModal();

  const categories = [
    { id: "all", name: "All" },
    { id: "admissions", name: "Admissions" },
    { id: "process", name: "Process" },
    { id: "support", name: "Support" },
    { id: "benefits", name: "Benefits" }
  ];

  const faqs = [
    {
      question: "What services does Alpha World Education provide?",
      answer:
        "We provide end-to-end study abroad support including university admissions, visa assistance, scholarships, documentation, pre-departure guidance, and post-arrival support.",
      category: "benefits"
    },
    {
      question: "How do I apply through Alpha World Education?",
      answer:
        "The process includes profile evaluation, course & country selection, document preparation, university applications, offer acceptance, visa filing, and departure support.",
      category: "process"
    },
    {
      question: "Which countries can I study in?",
      answer:
        "We assist students for USA, UK, Canada, Australia, Germany, Ireland, New Zealand, and major European destinations.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements?",
      answer:
        "Eligibility depends on the university and course, but generally includes academic records, English proficiency (IELTS/TOEFL), SOP, and financial documents.",
      category: "admissions"
    },
    {
      question: "Do you help with scholarships?",
      answer:
        "Yes. We help students identify and apply for merit-based and need-based scholarships offered by universities and governments.",
      category: "benefits"
    },
    {
      question: "How long does the process take?",
      answer:
        "The entire process typically takes 2–4 months. Starting early improves admission and visa success.",
      category: "process"
    },
    {
      question: "What support do you provide after admission?",
      answer:
        "We assist with visa filing, accommodation guidance, pre-departure briefing, travel planning, and ongoing student support.",
      category: "support"
    }
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter(f => f.category === activeCategory);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600">
            FAQs
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-600">
            Clear answers to common questions about studying abroad with
            Alpha World Education.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-1" />
                  <span className="font-semibold text-slate-800">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition ${
                    openIndex === index ? "rotate-180 text-blue-600" : "text-slate-400"
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Need Personal Guidance?
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto mb-8">
            Speak with our certified education consultants and get a
            personalised study abroad roadmap.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={openModal}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Free Counselling
            </button>
            <button
              onClick={openModal}
              className="px-8 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:border-blue-600 transition flex items-center justify-center gap-2"
            >
              <Mail size={18} /> Contact Us
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
