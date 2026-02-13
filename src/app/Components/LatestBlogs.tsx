"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  

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

  if (error) return null;

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1A4AB2]/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Latest Updates
          </div>
          <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter">
            Education <span className="text-[#1A4AB2]">News & Insights</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            Stay updated with the latest admission news, exam notifications, 
            and career guidance from our expert counselling team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {isLoading ? (
             [1, 2, 3].map((i) => <div key={i} className="h-[450px] bg-slate-100 rounded-[40px] animate-pulse" />)
          ) : (
            blogs?.map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="group bg-white border border-slate-200 rounded-[40px] overflow-hidden hover:border-[#1A4AB2]/30 hover:shadow-[0_30px_60px_rgba(26,74,178,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="h-60 overflow-hidden relative">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A4AB2]/5 to-[#1A4AB2]/10 text-[#1A4AB2] font-black text-4xl">
                      {initials(blog.title)}
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/50">
                    {blog.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#1A4AB2]" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-[#1A4AB2]" />
                      {calculateReadTime(blog.content)}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-3 group-hover:text-[#1A4AB2] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {extractDescription(blog.content)}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1A4AB2]/5 text-[#1A4AB2] flex items-center justify-center border border-[#1A4AB2]/10">
                        <User size={14} />
                      </div>
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Admission Team</span>
                    </div>
                    
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-300 shadow-sm">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-slate-900 border border-slate-800 rounded-[32px] px-8 py-4 shadow-2xl">
            <div className="text-left pr-6 border-r border-slate-700 hidden md:block">
              <div className="font-extrabold text-white text-base tracking-tight">100+ Expert Articles</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">In-depth Insights & Career Guides</div>
            </div>
            <Link
              href="/blogs"
              className="bg-[#1A4AB2] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
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