"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  ChevronUp,
} from "lucide-react";
import { SITE_IDENTITY } from "@/site-identity";
import {
  useContactInfo,
  createMailtoLink,
  createTelLink,
  createWhatsAppLink,
} from "@/hooks/useContactInfo";

const exploreLinks = [
  { name: "Colleges", href: "/colleges" },
  { name: "MD / MS", href: "/md-ms" },
  { name: "Entrance Exams", href: "/exams" },
  { name: "Blogs & Updates", href: "/blogs" },
  { name: "Compare Colleges", href: "/compare" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "NEET Predictor", href: "/tools/neet-score-predictor" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/term" },
];

const Footer = () => {
  const { emails, phones, address, socials } = useContactInfo();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#0B1220] font-sans text-slate-400">
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 10% -10%, rgba(0,102,245,0.35), transparent), radial-gradient(ellipse 60% 40% at 90% 0%, rgba(0,71,179,0.25), transparent)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#0066F5]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main columns */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="rounded-xl bg-white p-1.5 shadow-lg shadow-black/20 transition group-hover:ring-2 group-hover:ring-[#0066F5]/40">
                <Image
                  src="/logo.jpg"
                  alt={SITE_IDENTITY.name}
                  width={44}
                  height={44}
                  className="rounded-lg object-contain"
                />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                {SITE_IDENTITY.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {SITE_IDENTITY.tagline || SITE_IDENTITY.description}. Expert
              counselling for Indian universities, exams &amp; career paths.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                {
                  icon: Instagram,
                  href: socials.instagram,
                  label: "Instagram",
                },
                { icon: Linkedin, href: socials.linkedin, label: "LinkedIn" },
                {
                  icon: MessageCircle,
                  href: socials.whatsapp || createWhatsAppLink(phones.primary),
                  label: "WhatsApp",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-[#0066F5]/50 hover:bg-[#0066F5] hover:text-white"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-slate-400 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#0066F5] transition-all group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-slate-400 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#0066F5] transition-all group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Get in touch
            </h4>
            <div className="space-y-4 text-sm">
              <a
                href={createTelLink(phones.primary)}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-3 transition hover:border-[#0066F5]/30 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0066F5]/15 text-[#0066F5]">
                  <Phone size={15} />
                </span>
                <span className="font-medium text-slate-200">
                  {phones.primary}
                </span>
              </a>
              <a
                href={createMailtoLink(emails.info)}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-3 transition hover:border-[#0066F5]/30 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0066F5]/15 text-[#0066F5]">
                  <Mail size={15} />
                </span>
                <span className="font-medium lowercase text-slate-200">
                  {emails.info}
                </span>
              </a>
              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0066F5]/15 text-[#0066F5]">
                  <MapPin size={15} />
                </span>
                <div className="space-y-2 text-[13px] leading-snug text-slate-400">
                  <p>
                    <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-[#0066F5]">
                      Noida
                    </span>
                    {address.office}
                  </p>
                  <p className="border-t border-white/5 pt-2">
                    <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-[#0066F5]">
                      Lucknow
                    </span>
                    Admission Campus, 2nd floor, opposite Hotel Golden Tulip,
                    4 Station Road, Hussainganj, Lucknow 226001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer + bottom */}
        <div className="border-t border-white/8 pb-8 pt-8">
          <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-4 sm:px-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300">
              Important disclaimer
            </p>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Admission Campus provides educational consulting and guidance
              only. We do not guarantee admissions, placements, or visa
              approvals. College details are sourced from public institutional
              data — please verify directly with the institution. We are not
              affiliated with any government board or university. Academic and
              financial decisions remain solely your responsibility.
            </p>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-[12px] text-slate-500 sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-300">
                {SITE_IDENTITY.name}
              </span>
              . All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <Link href="/privacy" className="hover:text-[#0066F5]">
                Privacy
              </Link>
              <Link href="/term" className="hover:text-[#0066F5]">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-[#0066F5]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isScrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0066F5] text-white shadow-[0_10px_30px_rgba(0,102,245,0.4)] transition hover:-translate-y-0.5 hover:bg-[#0047B3] active:scale-95"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
