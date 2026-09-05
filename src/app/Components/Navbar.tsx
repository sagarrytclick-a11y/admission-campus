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
  Wrench,
  Search,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useFormModal } from "@/context/FormModalContext";
import Image from "next/image";
import {
  useContactInfo,
  createMailtoLink,
  createTelLink,
} from "@/hooks/useContactInfo";
import SearchOverlay from "@/app/Components/SearchOverlay";
import NavMegaMenuTrigger, {
  ApiMegaPanel,
  StaticMegaPanel,
} from "@/app/Components/NavMegaMenu";
import { NAV_STATIC_MENUS } from "@/lib/navMenuData";

const navLinkBase =
  "relative px-3.5 py-2 text-[13px] font-semibold tracking-wide text-slate-600 transition-colors duration-200 rounded-lg hover:text-[#0066F5] hover:bg-[#E8F1FF]/70";

const navLinkActive =
  "text-[#0066F5] bg-[#E8F1FF] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#0066F5]";

type OpenMenu =
  | "md-ms"
  | "mbbs-india"
  | "mbbs-abroad"
  | "engineering"
  | "management"
  | "tools"
  | null;

const API_MENUS = [
  {
    key: "engineering" as const,
    label: "Engineering",
    title: "Engineering Colleges",
    description:
      "B.Tech & M.Tech programs across top institutes in India.",
    categorySlug: "engineering",
    allHref: "/colleges/category/engineering",
  },
  {
    key: "management" as const,
    label: "Management",
    title: "Management Colleges",
    description:
      "MBA & business schools with fees, rankings and admission help.",
    categorySlug: "management",
    allHref: "/colleges/category/management",
  },
];

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { emails, phones, address } = useContactInfo();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsOpen(false);
    setOpenMenu(null);
    setMobileOpen(null);
    /* eslint-enable react-hooks/set-state-in-effect */
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

  const handleEnter = (key: OpenMenu) => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setOpenMenu(key), 80);
  };

  const handleLeave = () => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 140);
  };

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

  const toggleMobile = (key: string) =>
    setMobileOpen((prev) => (prev === key ? null : key));

  const activeStaticMenu = NAV_STATIC_MENUS.find((m) => m.key === openMenu);
  const activeApiMenu = API_MENUS.find((m) => m.key === openMenu);
  const isMegaOpen = Boolean(activeStaticMenu || activeApiMenu);

  return (
    <>
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

      <nav
        className={`relative sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#E2E8F0]/80 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
        onMouseLeave={handleLeave}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-[height] duration-300 ${
            isScrolled ? "h-[68px]" : "h-[76px]"
          }`}
        >
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

          <div
            className="hidden items-center gap-0.5 lg:flex"
            onMouseEnter={clearHoverTimeout}
          >
            <Link
              href="/"
              className={`${navLinkBase} ${pathname === "/" ? navLinkActive : ""}`}
            >
              Home
            </Link>

            {NAV_STATIC_MENUS.map((menu) => (
              <NavMegaMenuTrigger
                key={menu.key}
                label={menu.label}
                open={openMenu === menu.key}
                active={pathname?.startsWith(menu.allHref) ?? false}
                onEnter={() => handleEnter(menu.key)}
              />
            ))}

            {API_MENUS.map((menu) => (
              <NavMegaMenuTrigger
                key={menu.key}
                label={menu.label}
                open={openMenu === menu.key}
                active={pathname?.includes(menu.categorySlug) ?? false}
                onEnter={() => handleEnter(menu.key)}
              />
            ))}

            <div
              className="relative"
              onMouseEnter={() => handleEnter("tools")}
            >
              <button
                type="button"
                className={`${navLinkBase} inline-flex items-center gap-1.5 ${
                  isToolsActive || openMenu === "tools" ? navLinkActive : ""
                }`}
              >
                <Wrench size={14} className="opacity-70" />
                Tools
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    openMenu === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu === "tools" && (
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

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setIsOpen(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-slate-600 transition hover:border-[#0066F5]/30 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
              aria-label="Open search"
            >
              <Search size={16} />
            </button>

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

        {/* Full-width mega menu — aligned to nav container, not the trigger */}
        {isMegaOpen && (
          <div
            className="absolute inset-x-0 top-full z-50 hidden lg:block"
            onMouseEnter={clearHoverTimeout}
          >
            {/* Overlap bridge so hover doesn't drop between bar and panel */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="-mt-1 border-t border-transparent pt-3">
                {activeStaticMenu ? (
                  <StaticMegaPanel
                    key={activeStaticMenu.key}
                    menu={activeStaticMenu}
                  />
                ) : null}
                {activeApiMenu ? (
                  <ApiMegaPanel
                    key={activeApiMenu.key}
                    title={activeApiMenu.title}
                    description={activeApiMenu.description}
                    categorySlug={activeApiMenu.categorySlug}
                    allHref={activeApiMenu.allHref}
                    enabled
                  />
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Mobile */}
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

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                pathname === "/"
                  ? "bg-[#E8F1FF] text-[#0066F5]"
                  : "text-slate-700 hover:bg-[#F4F7FC]"
              }`}
            >
              Home
            </Link>

            {NAV_STATIC_MENUS.map((menu) => (
              <div key={menu.key} className="border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => toggleMobile(menu.key)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-[#F4F7FC]"
                >
                  <span className="text-[15px] font-semibold text-slate-700">
                    {menu.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${
                      mobileOpen === menu.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpen === menu.key && (
                  <div className="flex flex-col gap-0.5 pb-2 pl-2">
                    <Link
                      href={menu.allHref}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0066F5]"
                    >
                      {menu.allLabel}
                    </Link>
                    {menu.regions.slice(0, 8).map((region) => (
                      <Link
                        key={region.slug}
                        href={`${menu.allHref}?${menu.key === "mbbs-abroad" ? "country" : "state"}=${region.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-[#F4F7FC]"
                      >
                        {region.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {API_MENUS.map((menu) => (
              <div key={menu.key} className="border-t border-[#E2E8F0]">
                <Link
                  href={menu.allHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-700 hover:bg-[#F4F7FC]"
                >
                  {menu.label}
                  <ChevronDown size={16} className="-rotate-90 text-slate-400" />
                </Link>
              </div>
            ))}

            <div className="mt-1 border-t border-[#E2E8F0] pt-3">
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
