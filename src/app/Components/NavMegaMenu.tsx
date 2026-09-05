"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  NavCollege,
  NavStaticMenu,
  splitByType,
} from "@/lib/navMenuData";
import { useNavCategoryColleges } from "@/hooks/useNavCategoryColleges";

const navLinkBase =
  "relative px-3.5 py-2 text-[13px] font-semibold tracking-wide text-slate-600 transition-colors duration-200 rounded-lg hover:text-[#0066F5] hover:bg-[#E8F1FF]/70";

const navLinkActive =
  "text-[#0066F5] bg-[#E8F1FF] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#0066F5]";

type TriggerProps = {
  label: string;
  open: boolean;
  active: boolean;
  onEnter: () => void;
};

function CollegeLink({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-1.5 rounded-md px-1 py-1 text-[13px] text-slate-700 transition hover:text-[#0066F5]"
    >
      <span className="leading-snug">{name}</span>
      <ArrowUpRight
        size={12}
        className="mt-0.5 shrink-0 opacity-0 transition group-hover:opacity-60"
      />
    </Link>
  );
}

function CollegeColumns({
  leftTitle,
  rightTitle,
  left,
  right,
  viewAllHref,
}: {
  leftTitle: string;
  rightTitle: string;
  left: { name: string; href: string }[];
  right: { name: string; href: string }[];
  viewAllHref?: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto overscroll-contain p-4 sm:grid-cols-2 [scrollbar-width:thin] [scrollbar-color:#0066F5_#E8F1FF]">
        <div className="min-h-0">
          <p className="mb-2 sticky top-0 bg-white pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {leftTitle}
          </p>
          <div className="flex flex-col gap-0.5">
            {left.length === 0 ? (
              <p className="text-sm text-slate-400">No colleges yet</p>
            ) : (
              left.map((c) => (
                <CollegeLink key={c.href + c.name} name={c.name} href={c.href} />
              ))
            )}
          </div>
        </div>
        <div className="min-h-0">
          <p className="mb-2 sticky top-0 bg-white pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {rightTitle}
          </p>
          <div className="flex flex-col gap-0.5">
            {right.length === 0 ? (
              <p className="text-sm text-slate-400">No colleges yet</p>
            ) : (
              right.map((c) => (
                <CollegeLink key={c.href + c.name} name={c.name} href={c.href} />
              ))
            )}
          </div>
        </div>
      </div>
      {viewAllHref ? (
        <div className="shrink-0 border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-center">
          <Link
            href={viewAllHref}
            className="text-xs font-bold uppercase tracking-wide text-[#0066F5] hover:text-[#0047B3]"
          >
            View all colleges →
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function StaticMegaPanel({ menu }: { menu: NavStaticMenu }) {
  const [region, setRegion] = useState<string>("all");

  const colleges = useMemo(() => {
    if (region === "all") {
      return menu.regions.flatMap((r) => r.colleges);
    }
    return menu.regions.find((r) => r.slug === region)?.colleges || [];
  }, [menu.regions, region]);

  const { government, private: privateCols } = useMemo(
    () => splitByType(colleges),
    [colleges]
  );

  const limit = 6;
  const left = government.slice(0, limit).map((c: NavCollege) => ({
    name: c.name,
    href: menu.collegeHref(c.slug),
  }));
  const right = privateCols.slice(0, limit).map((c: NavCollege) => ({
    name: c.name,
    href: menu.collegeHref(c.slug),
  }));

  return (
    <div className="flex h-[min(62vh,440px)] w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="hidden w-[220px] shrink-0 flex-col border-r border-[#E8F1FF] bg-gradient-to-b from-[#E8F1FF] to-white p-5 sm:flex">
        <h3 className="text-lg font-bold text-[#0F172A]">{menu.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {menu.description}
        </p>
        <Link
          href={menu.allHref}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#0066F5] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(0,102,245,0.25)] transition hover:bg-[#0047B3]"
        >
          {menu.allLabel}
        </Link>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#E2E8F0] px-4 py-3 [scrollbar-width:thin]">
          <button
            type="button"
            onClick={() => setRegion("all")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              region === "all"
                ? "bg-[#0066F5] text-white shadow-sm shadow-[#0066F5]/30"
                : "bg-[#E8F1FF] text-[#0047B3] hover:bg-[#D6E8FF]"
            }`}
          >
            {menu.filterLabel}
          </button>
          {menu.regions.map((r) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => setRegion(r.slug)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                region === r.slug
                  ? "bg-[#0066F5] text-white shadow-sm shadow-[#0066F5]/30"
                  : "bg-[#E8F1FF] text-[#0047B3] hover:bg-[#D6E8FF]"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="shrink-0 border-b border-[#E2E8F0] px-4 py-3 sm:hidden">
          <Link
            href={menu.allHref}
            className="inline-flex rounded-lg bg-[#0066F5] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#0047B3]"
          >
            {menu.allLabel}
          </Link>
        </div>

        <CollegeColumns
          leftTitle="Government Colleges"
          rightTitle="Private Colleges"
          left={left}
          right={right}
          viewAllHref={
            region === "all"
              ? menu.allHref
              : `${menu.allHref}?${menu.key === "mbbs-abroad" ? "country" : "state"}=${region}`
          }
        />
      </div>
    </div>
  );
}

export function ApiMegaPanel({
  title,
  description,
  categorySlug,
  allHref,
  enabled,
}: {
  title: string;
  description: string;
  categorySlug: string;
  allHref: string;
  enabled: boolean;
}) {
  const [city, setCity] = useState("all");
  const { data: colleges = [], isLoading } = useNavCategoryColleges(
    categorySlug,
    enabled
  );

  const cities = useMemo(() => {
    const set = new Set<string>();
    for (const c of colleges) {
      if (c.city) set.add(c.city);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [colleges]);

  const filtered = useMemo(() => {
    if (city === "all") return colleges;
    return colleges.filter(
      (c) => c.city?.toLowerCase() === city.toLowerCase()
    );
  }, [colleges, city]);

  const shown = filtered.slice(0, 12);
  const mid = Math.ceil(shown.length / 2);
  const left = shown.slice(0, mid).map((c) => ({
    name: c.name,
    href: `/colleges/${c.slug}`,
  }));
  const right = shown.slice(mid).map((c) => ({
    name: c.name,
    href: `/colleges/${c.slug}`,
  }));

  return (
    <div className="flex h-[min(62vh,440px)] w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="hidden w-[220px] shrink-0 flex-col border-r border-[#E8F1FF] bg-gradient-to-b from-[#E8F1FF] to-white p-5 sm:flex">
        <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
        <Link
          href={allHref}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#0066F5] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(0,102,245,0.25)] transition hover:bg-[#0047B3]"
        >
          All Colleges
        </Link>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#E2E8F0] px-4 py-3 [scrollbar-width:thin]">
          <button
            type="button"
            onClick={() => setCity("all")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              city === "all"
                ? "bg-[#0066F5] text-white shadow-sm shadow-[#0066F5]/30"
                : "bg-[#E8F1FF] text-[#0047B3] hover:bg-[#D6E8FF]"
            }`}
          >
            All Cities
          </button>
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                city === c
                  ? "bg-[#0066F5] text-white shadow-sm shadow-[#0066F5]/30"
                  : "bg-[#E8F1FF] text-[#0047B3] hover:bg-[#D6E8FF]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center p-10 text-sm text-slate-500">
            Loading colleges…
          </div>
        ) : (
          <CollegeColumns
            leftTitle="Colleges"
            rightTitle="More Colleges"
            left={left}
            right={right}
            viewAllHref={allHref}
          />
        )}
      </div>
    </div>
  );
}

/** Trigger only — panel is rendered by Navbar under the full nav bar */
export default function NavMegaMenuTrigger({
  label,
  open,
  active,
  onEnter,
}: TriggerProps) {
  return (
    <button
      type="button"
      className={`${navLinkBase} inline-flex items-center gap-1.5 ${
        active || open ? navLinkActive : ""
      }`}
      aria-expanded={open}
      onMouseEnter={onEnter}
    >
      {label}
      <ChevronDown
        size={13}
        className={`transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
