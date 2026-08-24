"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Stethoscope,
  BookOpen,
  Newspaper,
  Wrench,
  Search,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useFormModal } from "@/context/FormModalContext";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import {
  useContactInfo,
  createMailtoLink,
  createTelLink,
} from "@/hooks/useContactInfo";

const navLinkBase =
  "relative px-3.5 py-2 text-[13px] font-semibold tracking-wide text-slate-600 transition-colors duration-200 rounded-lg hover:text-[#0066F5] hover:bg-[#E8F1FF]/70";

const navLinkActive =
  "text-[#0066F5] bg-[#E8F1FF] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#0066F5]";

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [collegeTypeOpen, setCollegeTypeOpen] = useState(false);
  const [mobileCollegesOpen, setMobileCollegesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { emails, phones, address } = useContactInfo();
  const { data: categories } = useCategories();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setCollegeTypeOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const clearHoverTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleCollegeTypeMouseEnter = () => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setCollegeTypeOpen(true), 80);
  };

  const handleCollegeTypeMouseLeave = () => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setCollegeTypeOpen(false), 120);
  };

  const handleToolsMouseEnter = () => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setToolsOpen(true), 80);
  };

  const handleToolsMouseLeave = () => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setToolsOpen(false), 120);
  };

  const collegeTypes = [
    ...(categories?.map((category) => ({
      name: `${category.name} Colleges`,
      href: `/colleges/category/${category.slug}`,
    })) || []),
    { name: "MD / MS Colleges", href: "/md-ms" },
    { name: "All Colleges", href: "/colleges" },
  ];

  const collegeLocations = [
    { name: "Mumbai", href: "/colleges/city/mumbai" },
    { name: "Delhi", href: "/colleges/city/delhi" },
    { name: "Bangalore", href: "/colleges/city/bangalore" },
    { name: "Hyderabad", href: "/colleges/city/hyderabad" },
    { name: "Chennai", href: "/colleges/city/chennai" },
    { name: "Pune", href: "/colleges/city/pune" },
  ];

  const toolsOptions = [
    {
      name: "NEET Score Predictor",
      href: "/tools/neet-score-predictor",
      desc: "Estimate your NEET score",
    },
    {
      name: "Compare Colleges",
      href: "/compare",
      desc: "Side-by-side college match",
    },
    { name: "About Us", href: "/about", desc: "Who we are & how we help" },
  ];

  const isToolsActive =
    pathname?.includes("/tools") ||
    pathname?.includes("/compare") ||
    pathname === "/about";

  return (
    <>
      {/* Top utility strip */}
      <div className="relative hidden overflow-hidden sm:block bg-gradient-to-r from-[#0047B3] via-[#0066F5] to-[#0047B3] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.25), transparent 45%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15), transparent 40%)",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[12px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a
              href={createTelLink(phones.primary)}
              className="flex items-center gap-1.5 font-medium text-white/95 transition hover:text-white"
            >
              <Phone size={12} className="opacity-80" />
              {phones.primary}
            </a>
            <span className="hidden h-3 w-px bg-white/30 md:block" />
            <span className="hidden items-center gap-1.5 text-white/85 md:flex">
              <MapPin size={12} className="opacity-80" />
              {address.office}
            </span>
          </div>
          <a
            href={createMailtoLink(emails.info)}
            className="flex items-center gap-1.5 font-medium text-white/95 transition hover:text-white"
          >
            <Mail size={12} className="opacity-80" />
            {emails.info}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#E2E8F0]/80 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-[height] duration-300 ${
            isScrolled ? "h-[68px]" : "h-[76px]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.jpg"
              alt="Admission Campus"
              width={64}
              height={64}
              className={`object-contain transition-all duration-300 ${
                isScrolled ? "h-12 w-12" : "h-14 w-14"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 lg:flex">
            <Link
              href="/"
              className={`${navLinkBase} ${pathname === "/" ? navLinkActive : ""}`}
            >
              Home
            </Link>

            {/* Colleges */}
            <div
              className="relative"
              onMouseEnter={handleCollegeTypeMouseEnter}
              onMouseLeave={handleCollegeTypeMouseLeave}
            >
              <button
                type="button"
                className={`${navLinkBase} inline-flex items-center gap-1.5 ${
                  pathname?.startsWith("/colleges") ? navLinkActive : ""
                }`}
              >
                <GraduationCap size={14} className="opacity-70" />
                Colleges
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    collegeTypeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {collegeTypeOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-[280px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                  <div className="border-b border-[#E8F1FF] bg-gradient-to-r from-[#E8F1FF] to-white px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066F5]">
                      Browse by type
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Find the right campus path
                    </p>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto py-1.5">
                    {collegeTypes.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`mx-1.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          pathname === item.href
                            ? "bg-[#E8F1FF] font-semibold text-[#0066F5]"
                            : "text-slate-700 hover:bg-[#F4F7FC] hover:text-[#0066F5]"
                        }`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F1FF] text-[#0066F5]">
                          <GraduationCap size={14} />
                        </span>
                        <span className="leading-snug">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/md-ms"
              className={`${navLinkBase} inline-flex items-center gap-1.5 ${
                pathname?.startsWith("/md-ms") ? navLinkActive : ""
              }`}
            >
              <Stethoscope size={14} className="opacity-70" />
              MD / MS
            </Link>

            <Link
              href="/exams"
              className={`${navLinkBase} inline-flex items-center gap-1.5 ${
                pathname?.startsWith("/exams") ? navLinkActive : ""
              }`}
            >
              <BookOpen size={14} className="opacity-70" />
              Exams
            </Link>

            <Link
              href="/blogs"
              className={`${navLinkBase} inline-flex items-center gap-1.5 ${
                pathname?.startsWith("/blogs") ? navLinkActive : ""
              }`}
            >
              <Newspaper size={14} className="opacity-70" />
              Blogs
            </Link>

            <Link
              href="/contact"
              className={`${navLinkBase} ${
                pathname?.startsWith("/contact") ? navLinkActive : ""
              }`}
            >
              Contact
            </Link>

            {/* Tools */}
            <div
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button
                type="button"
                className={`${navLinkBase} inline-flex items-center gap-1.5 ${
                  isToolsActive ? navLinkActive : ""
                }`}
              >
                <Wrench size={14} className="opacity-70" />
                Tools
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {toolsOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-[300px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                  <div className="border-b border-[#E8F1FF] bg-gradient-to-r from-[#E8F1FF] to-white px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066F5]">
                      Student tools
                    </p>
                  </div>
                  <div className="p-1.5">
                    {toolsOptions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col rounded-xl px-3.5 py-3 transition-colors ${
                          pathname === item.href
                            ? "bg-[#E8F1FF]"
                            : "hover:bg-[#F4F7FC]"
                        }`}
                      >
                        <span
                          className={`text-sm font-semibold ${
                            pathname === item.href
                              ? "text-[#0066F5]"
                              : "text-slate-800"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="mt-0.5 text-xs text-slate-500">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/colleges"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-slate-600 transition hover:border-[#0066F5]/30 hover:bg-[#E8F1FF] hover:text-[#0066F5] md:flex"
              aria-label="Search colleges"
            >
              <Search size={16} />
            </Link>

            <button
              type="button"
              onClick={openModal}
              className="group relative hidden overflow-hidden rounded-xl bg-[#0066F5] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(0,102,245,0.28)] transition hover:bg-[#0047B3] active:scale-[0.98] md:inline-flex md:items-center md:gap-2"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-500 group-hover:translate-x-full" />
              <span className="relative">Apply Now</span>
              <ArrowRight
                size={14}
                className="relative transition-transform group-hover:translate-x-0.5"
              />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-slate-700 transition hover:bg-[#E8F1FF] hover:text-[#0066F5] lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-[#E2E8F0] bg-white transition-all duration-300 lg:hidden ${
            isOpen
              ? "max-h-[min(80vh,640px)] opacity-100 shadow-[0_16px_40px_rgba(15,23,42,0.1)]"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="max-h-[min(80vh,640px)] overflow-y-auto px-4 py-4 sm:px-6">
            <div className="mb-3 rounded-2xl bg-gradient-to-br from-[#0066F5] to-[#0047B3] p-4 text-white">
              <p className="text-sm font-semibold">Need guidance?</p>
              <p className="mt-1 text-xs text-white/80">
                Free counselling for admissions &amp; counselling paths
              </p>
              <button
                type="button"
                onClick={() => {
                  openModal();
                  setIsOpen(false);
                }}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#0066F5]"
              >
                Talk to us <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-0.5">
              {[
                { href: "/", label: "Home", match: pathname === "/" },
                {
                  href: "/md-ms",
                  label: "MD / MS",
                  match: pathname?.startsWith("/md-ms"),
                },
                {
                  href: "/exams",
                  label: "Exams",
                  match: pathname?.startsWith("/exams"),
                },
                {
                  href: "/blogs",
                  label: "Blogs",
                  match: pathname?.startsWith("/blogs"),
                },
                {
                  href: "/contact",
                  label: "Contact",
                  match: pathname?.startsWith("/contact"),
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                    item.match
                      ? "bg-[#E8F1FF] text-[#0066F5]"
                      : "text-slate-700 hover:bg-[#F4F7FC]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Colleges accordion */}
            <div className="mt-3 border-t border-[#E2E8F0] pt-3">
              <button
                type="button"
                onClick={() => setMobileCollegesOpen(!mobileCollegesOpen)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-[#F4F7FC]"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Colleges
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    mobileCollegesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileCollegesOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-0.5 pb-2 pl-2">
                  {collegeTypes.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileCollegesOpen(false);
                      }}
                      className={`rounded-lg px-4 py-2.5 text-sm ${
                        pathname === item.href
                          ? "bg-[#E8F1FF] font-semibold text-[#0066F5]"
                          : "text-slate-600 hover:bg-[#F4F7FC]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Cities */}
            <div className="border-t border-[#E2E8F0] pt-3">
              <button
                type="button"
                onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-[#F4F7FC]"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Top Cities
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    mobileCitiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileCitiesOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-2 px-3 pb-3">
                  {collegeLocations.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileCitiesOpen(false);
                      }}
                      className={`rounded-xl px-3 py-2.5 text-center text-sm font-medium ${
                        pathname === item.href
                          ? "bg-[#E8F1FF] text-[#0066F5]"
                          : "bg-[#F4F7FC] text-slate-600 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="border-t border-[#E2E8F0] pt-3">
              <p className="mb-1 px-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                Tools
              </p>
              {toolsOptions.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm ${
                    pathname === item.href
                      ? "bg-[#E8F1FF] font-semibold text-[#0066F5]"
                      : "text-slate-600 hover:bg-[#F4F7FC]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-[#E2E8F0] pt-4">
              <button
                type="button"
                onClick={() => {
                  openModal();
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#0047B3]"
              >
                Start Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
