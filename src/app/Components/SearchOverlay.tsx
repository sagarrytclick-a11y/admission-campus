"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  X,
  TrendingUp,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

type ResultType = "college" | "exam" | "course";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  type: ResultType;
  subtitle?: string;
  image?: string;
};

type PopularItem = {
  name: string;
  type: ResultType;
  href: string;
  trending?: boolean;
};

const POPULAR_SEARCHES: PopularItem[] = [
  { name: "AIIMS Delhi", type: "college", href: "/colleges", trending: true },
  { name: "IIT Bombay", type: "college", href: "/colleges", trending: true },
  { name: "JEE Main", type: "exam", href: "/exams", trending: true },
  { name: "NEET", type: "exam", href: "/exams", trending: true },
  { name: "MBA", type: "course", href: "/colleges?category=management", trending: true },
  { name: "B.Tech", type: "course", href: "/colleges?category=engineering", trending: true },
  { name: "MD / MS", type: "course", href: "/md-ms", trending: true },
  { name: "CAT", type: "exam", href: "/exams", trending: true },
  { name: "Delhi University", type: "college", href: "/colleges", trending: true },
];

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
};

export default function SearchOverlay({
  open,
  onClose,
  initialQuery = "",
}: SearchOverlayProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery(initialQuery);
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, initialQuery, onClose]);

  const trimmed = query.trim();
  const isSearching = trimmed.length >= 2;

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["global-search-overlay", trimmed],
    queryFn: async (): Promise<SearchResult[]> => {
      const [collegeRes, examRes] = await Promise.all([
        fetch(
          `/api/colleges?search=${encodeURIComponent(trimmed)}&limit=12`
        ),
        fetch(`/api/exams`),
      ]);

      const collegesJson = collegeRes.ok ? await collegeRes.json() : {};
      const examsJson = examRes.ok ? await examRes.json() : { data: [] };

      const collegeResults: SearchResult[] = (
        collegesJson.data?.colleges || []
      ).map(
        (item: {
          id?: string;
          _id?: string;
          name: string;
          slug: string;
          city?: string;
          banner_url?: string;
          country?: string;
        }) => ({
          id: String(item.id || item._id || item.slug),
          name: item.name,
          slug: item.slug,
          type: "college" as const,
          subtitle: [item.city, item.country || "India"]
            .filter(Boolean)
            .join(", "),
          image: item.banner_url,
        })
      );

      const q = trimmed.toLowerCase();
      const examResults: SearchResult[] = (
        Array.isArray(examsJson.data) ? examsJson.data : []
      )
        .filter(
          (item: { name?: string; short_name?: string }) =>
            item.name?.toLowerCase().includes(q) ||
            item.short_name?.toLowerCase().includes(q)
        )
        .slice(0, 8)
        .map(
          (item: {
            id?: string;
            _id?: string;
            name: string;
            slug: string;
            short_name?: string;
            exam_type?: string;
          }) => ({
            id: String(item.id || item._id || item.slug),
            name: item.name,
            slug: item.slug,
            type: "exam" as const,
            subtitle: item.short_name || item.exam_type || "Exam",
          })
        );

      return [...collegeResults, ...examResults];
    },
    enabled: open && isSearching,
  });

  if (!open) return null;

  const hrefFor = (item: SearchResult) =>
    item.type === "exam" ? `/exams/${item.slug}` : `/colleges/${item.slug}`;

  return (
    <div
      className="fixed inset-0 z-200 bg-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <h2 className="text-center text-lg sm:text-xl font-bold text-[#0F172A]">
            Search
          </h2>
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search input */}
        <div className="flex items-center gap-3 rounded-full border-2 border-[#0066F5] bg-white px-4 sm:px-5 py-3 sm:py-3.5 shadow-sm focus-within:ring-4 focus-within:ring-[#0066F5]/15 transition-shadow">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What Are You Looking For?"
            className="w-full bg-transparent outline-none text-[#0F172A] placeholder:text-slate-400 text-sm sm:text-base font-medium"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Empty / popular */}
        {!isSearching && (
          <div className="mt-6 sm:mt-8 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#0066F5]" />
              <h3 className="text-sm font-bold text-[#0F172A]">
                Popular Searches
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POPULAR_SEARCHES.map((item) => (
                <Link
                  key={`${item.type}-${item.name}`}
                  href={item.href}
                  onClick={onClose}
                  className="group relative flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 hover:border-[#0066F5] transition-colors"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#0066F5] shrink-0" />
                  <div className="min-w-0 flex-1 pr-14">
                    <p className="text-sm font-bold text-[#0F172A] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 capitalize">
                      {item.type}
                    </p>
                  </div>
                  {item.trending && (
                    <span className="absolute top-2.5 right-2.5 rounded-md bg-[#0066F5] text-white text-[10px] font-bold px-2 py-0.5">
                      Trending
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Live results */}
        {isSearching && (
          <div className="mt-6 sm:mt-8">
            <p className="text-sm text-slate-500 mb-4">
              {isFetching
                ? "Searching…"
                : `Found ${results.length} result${results.length === 1 ? "" : "s"}`}
            </p>

            {isFetching && results.length === 0 ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-18 rounded-xl border border-slate-100 bg-slate-50 animate-pulse"
                  />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                <p className="text-slate-600 font-medium">
                  No results for “{trimmed}”
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Try another college, exam or course name
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={hrefFor(item)}
                    onClick={onClose}
                    className="flex items-center gap-3 sm:gap-4 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-3 hover:border-[#0066F5] hover:bg-[#F8FBFF] transition-colors"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-slate-100 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-[#0066F5]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm sm:text-base font-bold text-[#0F172A] truncate">
                          {item.name}
                        </p>
                        <span className="rounded-md bg-[#0066F5] text-white text-[10px] font-bold px-2 py-0.5 capitalize shrink-0">
                          {item.type}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
