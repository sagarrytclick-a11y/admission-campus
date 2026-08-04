'use client'

import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCities } from '@/hooks/useCities'

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

const CityCard = memo<CityCardProps>(({ city }) => {
  return (
    <div className="shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] snap-start px-2">
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
        <div className="relative h-36 sm:h-40 lg:h-44 overflow-hidden">
          {city.cityImage ? (
            <img
              src={city.cityImage}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-slate-200" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-sm sm:text-base font-semibold tracking-wide">
              {city.name}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-white/85">
              <MapPin size={12} /> India
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
            Top Colleges Available
          </p>

          <Link href={`/colleges/city/${city.slug}`}>
            <div className="flex items-center justify-between text-sm font-semibold group/link">
              <span className="text-[#5B7DBA] group-hover/link:text-[#4a69a8] transition-colors">
                View Colleges
              </span>
              <ArrowRight
                size={16}
                className="text-[#5B7DBA] group-hover/link:translate-x-1 transition-all"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
})

CityCard.displayName = 'CityCard'

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

const CitySlider = () => {
  const itemsPerView = useResponsiveItemsPerView()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const { data: citiesData, isLoading: citiesLoading, error } = useCities({
    page: 1,
    limit: 1000,
    country: 'india',
  })

  const indianCities = useMemo(() => {
    return citiesData?.cities || []
  }, [citiesData?.cities])

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollPrev(el.scrollLeft > 4)
    setCanScrollNext(el.scrollLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [indianCities.length, itemsPerView, updateScrollButtons])

  const scrollByCard = useCallback((direction: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-city-card]')
    const amount = card ? card.offsetWidth * Math.max(1, Math.min(itemsPerView, 2)) : el.clientWidth * 0.8
    el.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    })
  }, [itemsPerView])

  return (
    <section className="py-[32px] bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Popular Cities
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Find top colleges across India&apos;s educational hubs.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard('prev')}
              disabled={!canScrollPrev}
              className="w-9 h-9 rounded-full bg-white shadow hover:shadow-md border border-slate-200 flex items-center justify-center hover:bg-[#5B7DBA] hover:text-white transition disabled:opacity-40"
              aria-label="Previous cities"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard('next')}
              disabled={!canScrollNext}
              className="w-9 h-9 rounded-full bg-white shadow hover:shadow-md border border-slate-200 flex items-center justify-center hover:bg-[#5B7DBA] hover:text-white transition disabled:opacity-40"
              aria-label="Next cities"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          {citiesLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B7DBA]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">Failed to load cities</div>
          ) : indianCities.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-mandatory scrollbar-hide pb-1 -mx-2 px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {indianCities.map(city => (
                <div key={city._id} data-city-card>
                  <CityCard city={city} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">No cities available</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CitySlider
