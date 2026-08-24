"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  useContactInfo,
  createMailtoLink,
  createTelLink,
  createWhatsAppLink,
} from "@/hooks/useContactInfo";
import ContactForm from "@/app/Components/ContactForm";
import { useFormModal } from "@/context/FormModalContext";

export default function ContactPage() {
  const { emails, phones, address, socials } = useContactInfo();
  const { openModal } = useFormModal();

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      value: phones.primary,
      link: createTelLink(phones.primary),
      hint: "Mon–Sat · 10am–7pm",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with counsellors",
      link: createWhatsAppLink(phones.primaryRaw),
      hint: "Quick replies",
    },
    {
      icon: Mail,
      title: "Email",
      value: emails.info,
      link: createMailtoLink(emails.info),
      hint: "We reply within 24 hrs",
    },
    {
      icon: MapPin,
      title: "Visit Office",
      value: `${address.office}, ${address.city}`,
      link: "#",
      hint: "Noida & Lucknow",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Hero band */}
      <section className="relative overflow-hidden bg-[#0066F5] text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 90% 20%, rgba(0,102,245,0.35), transparent 50%), linear-gradient(135deg, #0047B3, #0066F5 55%, #0047B3)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-20 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 mb-4">
            <Clock className="w-3.5 h-3.5" />
            We&apos;re here to help
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto mb-4">
            Contact{" "}
            <span className="text-white">Admission Campus</span>
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Talk to our counsellors for MD/MS, Management, Engineering and
            medical admissions — counselling, shortlisting and documentation
            support.
          </p>
          <button
            type="button"
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 rounded-xl bg-white text-[#0066F5] font-bold px-6 py-3.5 text-sm hover:bg-[#E8F1FF] transition-colors"
          >
            Get Free Counselling
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-8 pb-16 relative z-10">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.link}
              className="group bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:border-[#0066F5]/40 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F1FF] text-[#0066F5] flex items-center justify-center mb-4 group-hover:bg-[#0066F5] group-hover:text-white transition-colors">
                <card.icon size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-[#64748B] line-clamp-2 mb-2 break-all">
                {card.value}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0066F5]">
                {card.hint}
              </p>
            </a>
          ))}
        </div>

        {/* Form + info */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
            <p className="brand-eyebrow mb-2">Send a message</p>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
              Tell us how we can help
            </h2>
            <p className="text-sm text-[#64748B] mb-6">
              Share your details and our team will get back with the right
              guidance for your course.
            </p>
            <ContactForm hideHeader />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-[#0B1220] text-white p-6 md:p-8 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#0066F5] via-[#0066F5] to-[#0047B3]" />
              <h3 className="text-lg font-bold mb-3">Why students choose us</h3>
              <ul className="space-y-3 text-sm text-white/85">
                {[
                  "Personalised college shortlisting",
                  "NEET / entrance counselling support",
                  "Transparent fee & documentation help",
                  "MD/MS, Management & Engineering focus",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0066F5] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0F172A] mb-4">
                Follow Admission Campus
              </h3>
              <div className="flex gap-3">
                <a
                  href={socials?.instagram || "#"}
                  className="w-11 h-11 rounded-xl bg-[#E8F1FF] text-[#0066F5] flex items-center justify-center hover:bg-[#0066F5] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={socials?.linkedin || "#"}
                  className="w-11 h-11 rounded-xl bg-[#E8F1FF] text-[#0066F5] flex items-center justify-center hover:bg-[#0066F5] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={createWhatsAppLink(phones.primaryRaw)}
                  className="w-11 h-11 rounded-xl bg-[#E8F1FF] text-[#0066F5] flex items-center justify-center hover:bg-[#0066F5] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
