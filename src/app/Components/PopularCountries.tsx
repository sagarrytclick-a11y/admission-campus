"use client";
import React from "react";
import Link from "next/link";

const countries = [
  {
    name: "Canada",
    flag: "🇨🇦",
    slug: "canada",
    description:
      "Popular for affordable education, post-study work options and PR opportunities.",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    slug: "australia",
    description:
      "Known for globally ranked universities and high quality of life.",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    slug: "united-kingdom",
    description:
      "Home to world-renowned universities with shorter degree durations.",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    slug: "united-states",
    description:
      "Offers diverse courses, top research universities and global exposure.",
  },
];

export default function PopularCountries() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            � Study Abroad
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Popular <span className="text-blue-600">Destinations</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore top study destinations with world-class universities, 
            excellent career opportunities, and student-friendly environments.
          </p>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {countries.map((country, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {country.flag}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {country.name}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 text-center">
                {country.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>High Visa Success</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Top Universities</span>
                </div>
              </div>

              <Link
                href={`/countries/${country.slug}`}
                className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Universities
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white border-2 border-slate-200 rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-left">
              <div className="font-bold text-slate-900">50+ Countries Available</div>
              <div className="text-sm text-slate-500">Find your perfect destination</div>
            </div>
            <Link
              href="/countries"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Countries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
