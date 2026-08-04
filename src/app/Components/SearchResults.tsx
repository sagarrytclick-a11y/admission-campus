'use client'
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Search, ArrowRight, AlertCircle, RefreshCw, MapPin } from 'lucide-react'
import { useAllColleges } from '@/hooks/useColleges'
import Link from 'next/link'

/**
 * SEARCH RESULTS COMPONENT
 * Handles only the search and results display
 */
const SearchResults = memo(({ category, color }: { category: string; color: string }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: collegesResponse = { colleges: [] }, isLoading } = useAllColleges(debouncedSearchTerm, 'all', 'all')

  const colleges = useMemo(() => {
    return collegesResponse.colleges.filter((college: any) => 
      college.categories?.includes(category)
    )
  }, [collegesResponse.colleges, category])

  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return colleges.slice(startIndex, startIndex + itemsPerPage)
  }, [colleges, currentPage])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  const handleClear = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setCurrentPage(1)
  }

  if (isLoading) return (
    <div className="py-20 text-center">
      <div className="w-12 h-12 border-4 border-slate-200 rounded-full animate-spin mx-auto mb-4" style={{ borderTop: `4px solid ${color}` }} />
      <p className="text-[#64748B] font-medium">Updating results...</p>
    </div>
  )

  if (colleges.length === 0) return (
    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
      <AlertCircle className="mx-auto text-[#64748B] mb-4" size={40} />
      <p className="text-[#64748B] font-medium">No matching {category} colleges found</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      {/* Search Bar */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <div 
            className="relative flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-colors" 
            style={{ ['--focus-border-color']: color } as React.CSSProperties }
          >
            <Search className="ml-4 text-[#64748B]" size={20} />
            <input
              type="text"
              placeholder={`Search ${category} colleges by name, city or state...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 bg-transparent text-[#1E293B] placeholder-[#64748B] focus:outline-none"
              style={{ ['--focus-border-color']: color } as React.CSSProperties }
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="mr-4 text-[#64748B] transition-colors"
                style={{ ['--hover-color']: color } as React.CSSProperties }
              >
                <RefreshCw size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedColleges.map((college: any) => (
          <Link key={college._id} href={`/colleges/${college.slug}`} className="group">
            <div 
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full" 
              style={{ ['--hover-border-color']: color } as React.CSSProperties }
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={college.banner_url || "https://images.unsplash.com/photo-1562774053-701939374585"} 
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 
                  className="text-xl font-bold text-[#1E293B] transition-colors mb-3" 
                  style={{ ['--hover-color']: color } as React.CSSProperties }
                >
                  {college.name}
                </h3>
                
                <div className="flex items-center gap-2 text-[#64748B] text-sm mb-4">
                  <MapPin size={14} style={{ color }} />
                  <span>{college.city}, {college.country}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748B]">Annual Fees:</span>
                    <span className="text-lg font-bold text-[#1E293B]">
                      {college.fees_structure?.courses?.[0]?.annual_tuition_fee || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748B]">Program:</span>
                    <span className="text-sm font-medium text-[#1E293B]">
                      {category === 'engineering' ? 'B.Tech / M.Tech' : 
                       category === 'medical' ? 'MBBS / BDS' : 'MBA / PGDM'}
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-[#64748B] font-medium">View Details</span>
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white group-hover:bg-[#1E293B] transition-all" 
                    style={{ backgroundColor: color }}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <button 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            className="px-5 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium transition-all disabled:opacity-50"
            style={{ ['--hover-border-color']: color, ['--hover-color']: color } as React.CSSProperties }
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                  currentPage === i + 1 
                    ? 'text-white' 
                    : 'bg-white border border-slate-200 text-[#64748B]'
                }`}
                style={{ 
                  backgroundColor: currentPage === i + 1 ? color : 'transparent',
                  ['--hover-border-color']: color
                } as React.CSSProperties }
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            className="px-5 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium transition-all disabled:opacity-50"
            style={{ ['--hover-border-color']: color, ['--hover-color']: color } as React.CSSProperties }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
})

export default SearchResults
