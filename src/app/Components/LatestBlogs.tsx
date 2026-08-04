"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar, Newspaper, Sparkles } from "lucide-react";
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
  return plainText.length > 100 ? plainText.substring(0, 100) + "..." : plainText;
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
    <section className="py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        
        {/* Simple Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#007BFF] mb-3">
              <Newspaper size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Latest Updates</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-3">Latest Blogs</h2>
            <p className="text-[#64748B] text-sm max-w-xl font-medium leading-relaxed">
              Stay updated with the latest admission news, exam notifications, and expert career guidance.
            </p>
          </div>
          <Link href="/blogs" className="text-sm font-bold text-[#007BFF] hover:underline flex items-center gap-1 transition-all">
            View All Articles <ArrowRight size={14} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
             [1, 2, 3].map((i) => <div key={i} className="h-96 bg-white rounded-xl animate-pulse border-2 border-slate-300" />)
          ) : (
            blogs?.map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="group bg-white border-2 border-slate-300 rounded-xl overflow-hidden hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/20 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="h-52 overflow-hidden border-b-2 border-slate-300 bg-slate-50">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-[#007BFF] font-bold text-3xl border border-slate-300">
                      {initials(blog.title)}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#007BFF]" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-[#007BFF]" />
                      {calculateReadTime(blog.content)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#1E293B] leading-snug mb-3 group-hover:text-[#007BFF] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-[#64748B] text-xs leading-relaxed mb-6 line-clamp-2 font-medium">
                    {extractDescription(blog.content)}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-200/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#007BFF]">
                        <User size={14} />
                      </div>
                      <span className="text-[10px] font-bold text-[#1E293B] uppercase tracking-wider">Expert Team</span>
                    </div>
                    <ArrowRight size={16} className="text-[#007BFF] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Simple Bottom Banner */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 bg-[#F8FAFC] border border-slate-100 rounded-lg px-10 py-8">
            <div className="text-left">
              <div className="flex items-center gap-2 text-[#007BFF] mb-1">
                <Sparkles size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Knowledge Base</span>
              </div>
              <h3 className="font-bold text-[#1E293B] text-lg">100+ Expert Articles & Career Guides</h3>
            </div>
            
            <Link
              href="/blogs"
              className="w-full md:w-auto bg-[#1E293B] text-white px-8 py-3 rounded-md text-sm font-bold hover:bg-[#007BFF] transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              View Full Library
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}