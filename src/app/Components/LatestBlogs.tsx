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

// Function to generate initials from author name (using title as fallback)
const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Function to extract description from content (first 150 characters)
const extractDescription = (content: string) => {
  const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
};

// Function to calculate read time (approximate)
const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readTimeMinutes} min read`;
};

// Function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Custom hook to fetch blogs
const useBlogs = () => {
  return useQuery<BlogItem[]>({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch blogs");
      }
      return result.data.slice(0, 3); // Get only the latest 3 blogs
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export default function LatestBlogs() {
  const { data: blogs, isLoading, error } = useBlogs();

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Latest News & Articles
          </h2>
          <p className="text-red-600">Failed to load blog posts. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
   <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📰 Latest Updates
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Education <span className="text-blue-600">News & Insights</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with latest admission news, exam notifications, 
            study abroad trends, and career guidance from industry experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogs?.map((blog) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog.slug}`}
              className="group bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-48 bg-slate-100 overflow-hidden relative">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {initials(blog.title)}
                      </div>
                      <div className="text-sm text-blue-500">Article</div>
                    </div>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {calculateReadTime(blog.content)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {extractDescription(blog.content)}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Admission Team</span>
                  </div>
                  
                  <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-lg">
            <div className="text-left">
              <div className="font-bold text-slate-900">100+ Articles</div>
              <div className="text-sm text-slate-500">Expert insights & guides</div>
            </div>
            <Link
              href="/blogs"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
