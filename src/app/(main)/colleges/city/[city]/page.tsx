'use client'

import React, { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useAllColleges } from '@/hooks/useColleges'
import { useCityBySlug } from '@/hooks/useAdminCities'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import BackgroundSlider from '@/components/BackgroundSlider'
import { MapPin } from 'lucide-react'

// Theme Constants
const PRIMARY_BLUE = "#0066F5"

export default function CityCollegesPage() {
  const params = useParams()
  const citySlug = params.city as string

  // Fetch dynamic city data by exact slug
  const { data: cityData, isLoading: cityLoading } = useCityBySlug(citySlug)

  // Create dynamic city info from API data
  const cityInfo = useMemo(() => {
    if (cityData) {
      return {
        name: cityData.name,
        color: PRIMARY_BLUE,
        gradient: "from-[#0066F5] via-[#0066F5]/90 to-slate-900",
        description: cityData.description || "Explore educational institutions in this city",
        features: cityData.features || ["Top Colleges", "Research Centers", "Educational Hub"],
        stats: { colleges: "100+", students: "50K+", avgFees: "₹1-10L" },
        examName: "JEE",
        examColor: "text-[#0066F5]",
        borderColor: "border-[#0066F5]",
        hoverBg: "hover:bg-[#0066F5]/5",
        href: `/colleges/city/${citySlug}`,
        cityImage: cityData.cityImage
      }
    } else {
      // Fallback for when city data is not found
      return {
        name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
        color: PRIMARY_BLUE,
        gradient: "from-[#0066F5] via-[#0066F5]/90 to-slate-900",
        description: "Explore educational institutions in this city",
        features: ["Top Colleges", "Research Centers", "Educational Hub"],
        stats: { colleges: "100+", students: "50K+", avgFees: "₹1-10L" },
        examName: "JEE",
        examColor: "text-[#0066F5]",
        borderColor: "border-[#0066F5]",
        hoverBg: "hover:bg-[#0066F5]/5",
        href: `/colleges/city/${citySlug}`
      }
    }
  }, [cityData, citySlug])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter by city on the server
  const {
    data: collegesResponse = { colleges: [], total: 0, page: 1, totalPages: 1, hasMore: false },
    isLoading: collegesLoading,
    isError,
    error,
    refetch
  } = useAllColleges('', 'all', 'all', undefined, citySlug)

  const colleges = collegesResponse.colleges || []
  const isLoading = cityLoading || collegesLoading

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Hero Header Skeleton */}
        <div className="bg-slate-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[32px]">
            <div className="text-center mb-8">
              <div className="h-8 bg-slate-700 rounded-full w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="h-16 bg-slate-700 rounded-lg w-3/4 mx-auto mb-6 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-[32px] bg-slate-50">
      {/* Hero Header */}
      <div className={`relative bg-linear-to-br ${cityInfo.gradient} text-white`}>
        <BackgroundSlider>
          <div />
        </BackgroundSlider>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-[32px]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
              <MapPin className="w-4 h-4" />
              {cityInfo.name} Colleges
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Top Colleges in <span className="text-[#FACC15]">{cityInfo.name}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl py-5 mx-auto px-6 lg:px-8 pb-16">
        <CollegeMapping
          colleges={colleges}
          isLoading={isLoading}
          isError={isError}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onRefetch={refetch}
          emptyMessage={`No Colleges Found in ${cityInfo.name}`}
        />
      </div>
    </div>
  )
}
