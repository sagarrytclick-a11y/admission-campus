'use client'

import React from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  ArrowRight,
  TrendingUp,
} from 'lucide-react'

const CitySection = () => {
  // Theme Color Tokens
  const PRIMARY_BLUE = "#1A4AB2"
  const ACCENT_GOLD = "#FACC15"

  const cities = [
    {
      title: "Engineering",
      description: "Explore top engineering colleges offering B.Tech, M.Tech programs with excellent placement records and cutting-edge research facilities.",
      examName: "JEE",
      examColor: "text-[#1A4AB2]",
      borderColor: "border-[#1A4AB2]",
      hoverBg: "hover:bg-[#1A4AB2]/5",
      href: "/colleges/engineering",
      features: ["Top IITs & NITs", "Excellent Placements", "Research Opportunities"],
      stats: { colleges: "5000+", exams: "JEE Main, GATE" }
    },
    {
      title: "Medical Sciences",
      description: "Discover premier medical institutions offering MBBS, BDS, and specialized healthcare programs with advanced clinical training.",
      examName: "NEET",
      examColor: "text-[#10B981]",
      borderColor: "border-[#10B981]",
      hoverBg: "hover:bg-[#10B981]/5",
      href: "/colleges/medical",
      features: ["AIIMS & Top Medical", "Clinical Exposure", "Research Programs"],
      stats: { colleges: "800+", exams: "NEET UG, NEET PG" }
    },
    {
      title: "Management Studies",
      description: "Find leading business schools offering MBA, PGDM programs with strong industry connections and leadership development.",
      examName: "CAT",
      examColor: "text-[#8B5CF6]",
      borderColor: "border-[#8B5CF6]",
      hoverBg: "hover:bg-[#8B5CF6]/5",
      href: "/colleges/management",
      features: ["Top B-Schools", "Corporate Connect", "Leadership Programs"],
      stats: { colleges: "3000+", exams: "CAT, XAT, MAT" }
    }
  ]

  return (
    <div className="bg-white py-24 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/10 border border-[#1A4AB2]/20 text-[#1A4AB2] px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse" />
            Explore Top Courses
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Find Your <span className="text-[#1A4AB2]">Perfect</span> Career Path
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover premier institutions across Engineering, Medical, and Management streams. 
            Explore comprehensive details about entrance exams, rankings, and admission guidance.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {cities.map((category, index) => (
            <div 
              key={index} 
              className={`group relative bg-white border-2 ${category.borderColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl ${category.hoverBg} transition-all duration-500 overflow-hidden`}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className={`w-20 h-20 ${category.borderColor.replace('border-', 'bg-')} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <MapPin className="w-8 h-8 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className={`text-2xl font-bold text-slate-900 mb-4 group-hover:${category.examColor} transition-colors relative z-10`}>
                {category.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
                {category.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-6 relative z-10">
                {category.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${category.examColor === 'text-[#1A4AB2]' ? 'bg-[#1A4AB2]' : category.examColor === 'text-[#10B981]' ? 'bg-[#10B981]' : 'bg-[#8B5CF6]'} rounded-full`} />
                    <span className="text-sm font-semibold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 relative z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Colleges</p>
                    <p className={`text-lg font-bold ${category.examColor}`}>{category.stats.colleges}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Exams</p>
                    <p className="text-sm font-semibold text-slate-700">{category.stats.exams}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Matching the Image Design */}
              <div className="flex gap-3 relative z-10">
                <Link href={category.href} className="flex-1">
                  <button className={`w-full ${category.examColor === 'text-[#1A4AB2]' ? 'bg-[#1A4AB2] hover:bg-[#1A4AB2]/90' : category.examColor === 'text-[#10B981]' ? 'bg-[#10B981] hover:bg-[#10B981]/90' : 'bg-[#8B5CF6] hover:bg-[#8B5CF6]/90'} text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg`}>
                    Explore Exams
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className={`px-4 py-3 border-2 ${category.borderColor} ${category.examColor} rounded-xl text-sm font-bold transition-all duration-300 hover:bg-slate-50`}>
                  {category.examName}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#1A4AB2]/5 to-[#FACC15]/5 rounded-3xl p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Not Sure Which Path to Choose?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Get personalized recommendations based on your interests, scores, and career goals. 
            Our AI-powered counselor helps you find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/colleges">
              <button className="bg-[#1A4AB2] hover:bg-[#1A4AB2]/90 text-white font-bold py-4 px-8 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg">
                Browse All Colleges
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/exams">
              <button className="bg-white hover:bg-slate-50 text-[#1A4AB2] border-2 border-[#1A4AB2] font-bold py-4 px-8 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300">
                View All Exams
                <TrendingUp size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitySection
