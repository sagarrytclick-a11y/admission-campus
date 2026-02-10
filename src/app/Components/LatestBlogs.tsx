"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  image?: string;
  createdAt: string;
};

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const extractDescription = (content: string) => {
  const plainText = content.replace(/<[^>]*>/g, "");
  return plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;
};

const calculateReadTime = (content: string) => {
  const wordCount = content.split(/\s+/).length;
  return `${Math.ceil(wordCount / 200)} min read`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
};

const useBlogs = () => {
  return useQuery<BlogItem[]>({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      return result.data.slice(0, 3);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default function LatestBlogs() {
  const { data: blogs, isLoading, error } = useBlogs();
  
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  if (error) return null; // Silently fail or show minimal error

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Latest Updates
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Education <span className="text-[#1E6BFF]">News & Insights</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Stay updated with latest admission news, exam notifications, 
            and career guidance from industry experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
             [1, 2, 3].map((i) => <div key={i} className="h-96 bg-slate-50 rounded-[32px] animate-pulse" />)
          ) : (
            blogs?.map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="group bg-white border border-slate-200 rounded-[32px] overflow-hidden hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_50px_rgba(30,107,255,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="h-52 overflow-hidden relative">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-[#1E6BFF] font-bold text-3xl">
                      {initials(blog.title)}
                    </div>
                  )}
                  
                  {/* Category Badge - Glass Style */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-sm border border-white/50">
                    {blog.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#1E6BFF]" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-[#1E6BFF]" />
                      {calculateReadTime(blog.content)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-[#1E6BFF] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {extractDescription(blog.content)}
                  </p>

                  <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1E6BFF] flex items-center justify-center border border-blue-100">
                        <User size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">Admission Team</span>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Bottom CTA - Matching the premium bar style */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-slate-900 border border-slate-800 rounded-[32px] px-10 py-5 shadow-2xl">
            <div className="text-left pr-6 border-r border-slate-700 hidden sm:block">
              <div className="font-extrabold text-white text-sm">100+ Articles</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expert Insights & Guides</div>
            </div>
            <Link
              href="/blogs"
              className="bg-[#1E6BFF] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}