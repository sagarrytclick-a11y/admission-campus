'use client'

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import Link from 'next/link'
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react'
import { useAdminCities } from '@/hooks/useAdminCities'

// Types
interface AdminCity {
  _id: string
  id: string
  name: string
  slug: string
  country_ref: {
    _id: string
    name: string
    slug: string
  }
  description: string
  cityImage: string
  features: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface CityCardProps {
  city: AdminCity
}

interface CitySliderTheme {
  primary: string
  secondary: string
  accent: string
  dark: string
  light: string
  muted: string
  cardBg: string
}

// Constants
const THEME: CitySliderTheme = {
  primary: '#007BFF',
  secondary: '#007BFF',
  accent: '#FF6B35',
  dark: '#12141D',
  light: '#F8FAFC',
  muted: '#94A3B8',
  cardBg: '#1E212B',
}

// Memoized CityCard Component
const CityCard = memo<CityCardProps>(({ city }) => {
  return (
    <div className="shrink-0 px-1.5 sm:px-2 lg:px-3">
      <div className="border-2 border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:border-[#007BFF] hover:shadow-lg transition-all duration-200 bg-white h-full group">
        {/* City Image */}
        {city.cityImage && (
          <div className="w-full h-20 sm:h-24 lg:h-32 mb-3 sm:mb-4 rounded-lg overflow-hidden">
            <img
              src={city.cityImage}
              alt={`${city.name} city`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        )}

        <h3 className="text-sm sm:text-base lg:text-xl font-semibold mb-1 text-slate-800 group-hover:text-[#007BFF] transition-colors">
          {city.name}
        </h3>

        <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 mb-3 sm:mb-4 lg:mb-6 font-medium">
          Top Colleges Available
        </p>

        <Link href={`/colleges/city/${city.slug}`}>
          <span className="inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-[10px] sm:text-xs lg:text-sm font-bold text-[#007BFF] hover:text-[#007BFF] transition-colors group-hover:translate-x-1 transform duration-200">
            View Colleges <ArrowRight size={10} className="sm:size-3 lg:size-5" />
          </span>
        </Link>
      </div>
    </div>
  )
})

CityCard.displayName = 'CityCard'

// Custom hook for slider logic
const useSlider = (maxIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  return { currentIndex, handleNext, handlePrev }
}

// Custom hook for responsive items per view
const useResponsiveItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(4)

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

  return itemsPerView
}

// Main CitySlider Component
const CitySlider = () => {
  const itemsPerView = useResponsiveItemsPerView()

  // Enhanced data fetching with better caching
  const { data: citiesData, isLoading: citiesLoading, error } = useAdminCities({
    page: 1,
    limit: 1000 // Fetch all cities for the slider
  })

  // Memoized data processing
  const indianCities = useMemo(() => {
    return citiesData?.cities?.filter(city =>
      city.country_ref.slug === 'india'
    ) || []
  }, [citiesData?.cities])

  const maxIndex = Math.max(0, indianCities.length - itemsPerView)

  const { currentIndex, handleNext, handlePrev } = useSlider(maxIndex)

  // Loading state component
  const LoadingSkeleton = () => (
    <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007BFF]"></div>
    </div>
  )

  // Error state component
  const ErrorState = ({ message }: { message: string }) => (
    <div className="flex justify-center items-center h-48">
      <div className="text-center">
        <p className="text-red-600 mb-2">Failed to load cities</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )

  // Empty state component
  const EmptyState = () => (
    <div className="flex justify-center items-center h-48">
      <p className="text-slate-600">No cities available</p>
    </div>
  )

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

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={indianCities.length <= itemsPerView}
              className="p-1.5 sm:p-2 border border-slate-200 rounded-lg hover:bg-[#007BFF] hover:border-[#007BFF] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} className="sm:size-5 text-slate-600" />
            </button>
            <button
              onClick={handleNext}
              disabled={indianCities.length <= itemsPerView}
              className="p-1.5 sm:p-2 border border-slate-200 rounded-lg hover:bg-[#007BFF] hover:border-[#007BFF] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} className="sm:size-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div className="relative overflow-hidden">
          {citiesLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState message={error.message} />
          ) : indianCities.length > 0 ? (
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {indianCities.map((city) => (
                <CityCard key={city._id} city={city} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

      </div>
    </section>
  )
}

export default CitySlider