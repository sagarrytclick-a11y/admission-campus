'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useFormModal } from "@/context/FormModalContext";
import { useCategories } from "@/hooks/useCategories";

const ExploreTopCourses = () => {
  const { openModal } = useFormModal();
  const { data: categories, isLoading, error } = useCategories();

  const fallbackCategories = [
    {
      title: "Engineering",
      description: "Explore B.Tech and M.Tech programs in top technical institutes.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/category/engineering",
      count: "5000+ Colleges"
    },
    {
      title: "Medical",
      description: "Find medical colleges for MBBS and healthcare specializations.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/category/medical",
      count: "850+ Colleges"
    },
    {
      title: "Management",
      description: "Discover business schools for MBA and leadership programs.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/category/management",
      count: "3200+ Colleges"
    }
  ];

  const transformedCategories = categories?.map(category => ({
    title: category.name,
    description: category.description,
    image: category.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=60&w=500",
    href: `/colleges/category/${category.slug}`,
    count: "Popular Choice"
  })) || fallbackCategories;

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto font-sans text-[#0F172A]">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[#0066F5] mb-3">
          <Sparkles size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Course Categories</span>
        </div>
        <h2 className="text-3xl text-[#0F172A] font-bold tracking-tight mb-3">Top Courses in India 2026</h2>
        <p className="text-[#64748B] text-sm max-w-2xl font-medium leading-relaxed">
          Select a category to find the best institutions and entrance exam guides for your academic journey.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
              <div className="aspect-video w-full bg-slate-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-slate-200 rounded animate-pulse w-28" />
                <div className="h-16 bg-slate-200 rounded animate-pulse" />
                <div className="h-10 bg-slate-200 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Failed to load categories. Showing default categories.</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {transformedCategories.map((item: { title: string; description: string; image: string; href: string; count: string }, index: number) => (
            <Link key={index} href={item.href} className="group block h-full">
              <div className="h-full border border-[#E2E8F0] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 bg-white flex flex-col">
                <div className="aspect-video w-full overflow-hidden bg-slate-50 border-b border-[#E2E8F0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] group-hover:text-[#0066F5] transition-colors">
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-bold text-[#0066F5] uppercase tracking-wider bg-[#E8F1FF] border border-[#0066F5]/15 px-2 py-1 rounded-md">
                      {item.count}
                    </span>
                  </div>

                  <p className="text-[#64748B] text-sm mb-6 leading-relaxed line-clamp-3 min-h-18">
                    {item.description}
                  </p>

                  <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] text-white text-sm font-bold py-2.5 group-hover:bg-[#0047B3] transition-colors">
                    View Details
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 sm:mt-16 pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1">Need career guidance?</h3>
          <p className="text-[#64748B] text-sm font-medium">Talk to our experts for a personalized admission roadmap.</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="bg-[#0066F5] text-white px-6 sm:px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#0047B3] transition-colors w-full sm:w-auto"
        >
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default ExploreTopCourses
