'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react'
import { INDIAN_CITIES } from '@/lib/cities'

const theme = {
  primary: '#007BFF',      // Blue primary
  secondary: '#007BFF',    // Blue from logo
  accent: '#FF6B35',       // Orange accent
  dark: '#12141D',         // Dark background
  light: '#F8FAFC',        // Light text
  muted: '#94A3B8',        // Muted text
  cardBg: '#1E212B',       // Card background
};

const CitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  const maxIndex = Math.max(0, INDIAN_CITIES.length - itemsPerView)

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else if (window.innerWidth < 1280) setItemsPerView(3)
      else setItemsPerView(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-blue-50 font-sans text-slate-800">
      <div className="max-w-6xl px-4 sm:px-[20px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-[#1E293B]">
              Popular Cities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">Find top colleges across India's educational hubs.</p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handlePrev} 
              className="p-1.5 sm:p-2 border border-slate-200 rounded-lg hover:bg-[#007BFF] hover:border-[#007BFF] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={16} className="sm:size-5 text-slate-600" />
            </button>
            <button 
              onClick={handleNext} 
              className="p-1.5 sm:p-2 border border-slate-200 rounded-lg hover:bg-[#007BFF] hover:border-[#007BFF] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ChevronRight size={16} className="sm:size-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {INDIAN_CITIES.map((city) => (
              <div
                key={city.id}
                className="flex-shrink-0 px-1.5 sm:px-2 lg:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="border-2 border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:border-[#007BFF] hover:shadow-lg transition-all duration-200 bg-white h-full group">

                  <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                    <div className="p-1 sm:p-1.5 lg:p-2 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
                      <MapPin size={12} className="sm:size-4 text-[#007BFF]" />
                    </div>
                    <span className="text-[6px] sm:text-[8px] lg:text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-blue-50 px-1 sm:px-1.5 lg:px-2 py-0.5 rounded border border-blue-200">
                      {city.examName}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base lg:text-xl font-semibold mb-1 text-slate-800 group-hover:text-[#007BFF] transition-colors">{city.name}</h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 mb-3 sm:mb-4 lg:mb-6 font-medium">{city.stats.colleges} Institutions</p>

                  <Link href={city.href}>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-[10px] sm:text-xs lg:text-sm font-bold text-[#007BFF] hover:text-[#007BFF] transition-colors group-hover:translate-x-1 transform duration-200">
                      View Directory <ArrowRight size={10} className="sm:size-3 lg:size-5" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default CitySlider