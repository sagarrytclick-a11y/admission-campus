'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { INDIAN_CITIES } from '@/lib/cities'

const CitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const itemsPerView = 4 // Number of cities visible at once

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)
      return prevIndex <= 0 ? maxIndex : prevIndex - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)
  const totalDots = Math.ceil(INDIAN_CITIES.length / itemsPerView)

  return (
    <div className="bg-gradient-to-br from-[#1A4AB2]/5 to-[#FACC15]/5 py-16 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/10 border border-[#1A4AB2]/20 text-[#1A4AB2] px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse" />
            Explore Cities
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find Your <span className="text-[#1A4AB2]">Dream</span> College by City
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover premier educational institutions across India's top cities
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm border border-[#1A4AB2]/20 text-[#1A4AB2] p-3 rounded-full shadow-lg hover:bg-[#1A4AB2] hover:text-white transition-all duration-300"
            aria-label="Previous cities"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm border border-[#1A4AB2]/20 text-[#1A4AB2] p-3 rounded-full shadow-lg hover:bg-[#1A4AB2] hover:text-white transition-all duration-300"
            aria-label="Next cities"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {INDIAN_CITIES.map((city, index) => (
                <div
                  key={city.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div 
                    className={`group relative bg-white border-2 ${city.borderColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl ${city.hoverBg} transition-all duration-500 overflow-hidden h-full`}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon Container */}
                    <div className={`w-16 h-16 ${city.borderColor.replace('border-', 'bg-')} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>

                    {/* City Name */}
                    <h3 className={`text-lg font-bold text-slate-900 mb-2 group-hover:${city.examColor} transition-colors relative z-10`}>
                      {city.name}
                    </h3>

                    {/* Stats */}
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Colleges</p>
                        <p className={`text-sm font-bold ${city.examColor}`}>{city.stats.colleges}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Students</p>
                        <p className="text-xs font-semibold text-slate-700">{city.stats.students}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 relative z-10">
                      <Link href={city.href} className="flex-1">
                        <button className={`w-full ${city.examColor === 'text-[#1A4AB2]' ? 'bg-[#1A4AB2] hover:bg-[#1A4AB2]/90' : city.examColor === 'text-[#DC2626]' ? 'bg-[#DC2626] hover:bg-[#DC2626]/90' : city.examColor === 'text-[#059669]' ? 'bg-[#059669] hover:bg-[#059669]/90' : city.examColor === 'text-[#7C3AED]' ? 'bg-[#7C3AED] hover:bg-[#7C3AED]/90' : city.examColor === 'text-[#EA580C]' ? 'bg-[#EA580C] hover:bg-[#EA580C]/90' : 'bg-[#0891B2] hover:bg-[#0891B2]/90'} text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 transition-all duration-300 shadow`}>
                          Explore
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                      <button className={`px-3 py-2 border-2 ${city.borderColor} ${city.examColor} rounded-lg text-xs font-bold transition-all duration-300 hover:bg-slate-50`}>
                        {city.examName}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalDots }, (_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index * itemsPerView)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index * itemsPerView
                    ? 'bg-[#1A4AB2] w-8'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to city group ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/colleges">
            <button className="bg-[#1A4AB2] hover:bg-[#1A4AB2]/90 text-white font-bold py-3 px-8 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg mx-auto">
              Browse All Cities
              <MapPin size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CitySlider
