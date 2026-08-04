"use client"
import React from 'react';
import { Globe, Users, University, Landmark, ArrowUpRight } from 'lucide-react';

const destinations = [
  { country: "United States", students: "4,200+", unis: "150+", tag: "Top Universities" },
  { country: "United Kingdom", students: "3,800+", unis: "90+", tag: "Russell Group" },
  { country: "Canada", students: "5,100+", unis: "60+", tag: "PR Pathway" },
  { country: "Australia", students: "2,400+", unis: "40+", tag: "Group of Eight" },
  { country: "Europe", students: "1,200+", unis: "110+", tag: "Public Universities" },
];

export default function GlobalReach() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
              <Globe size={14} /> Study Destinations
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] leading-tight">
              Countries We <br />
              <span className="text-blue-600">Work With</span>
            </h2>
          </div>

          <p className="text-slate-600 font-medium text-base max-w-sm">
            Choose from globally recognised education systems with strong career and migration outcomes.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="relative h-[360px] rounded-3xl bg-white border border-slate-200 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500"
            >
              {/* Top */}
              <div>
                <div className="flex justify-between items-start mb-5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {dest.tag}
                  </span>
                  <ArrowUpRight size={18} className="text-slate-300" />
                </div>

                <h3 className="text-xl font-black text-[#0f172a] mb-3">
                  {dest.country}
                </h3>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#0f172a]">{dest.students}</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                      Students Placed
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <University size={16} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#0f172a]">{dest.unis}</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                      Partner Universities
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Icon */}
              <div className="absolute -right-6 -bottom-6 text-slate-100 pointer-events-none">
                <Landmark size={120} />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-14 bg-white border border-slate-200 rounded-3xl p-8 flex flex-wrap justify-center items-center gap-12 text-slate-400 font-black tracking-tight">
          <span>HARVARD</span>
          <span>OXFORD</span>
          <span>UofT</span>
          <span>MELBOURNE</span>
          <span>STANFORD</span>
        </div>
      </div>
    </section>
  );
}
