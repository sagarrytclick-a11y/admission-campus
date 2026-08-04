'use client'

import { memo } from 'react'
import { Filter, X } from 'lucide-react'

interface CollegeFiltersProps {
  courses: string[]
  states: string[]
  selectedCourse: string
  selectedState: string
  onCourseChange: (course: string) => void
  onStateChange: (state: string) => void
  /** Hide outer card chrome when parent already provides a card */
  embedded?: boolean
}

const CollegeFilters = memo(({
  courses,
  states,
  selectedCourse,
  selectedState,
  onCourseChange,
  onStateChange,
  embedded = false,
}: CollegeFiltersProps) => {
  const handleReset = () => {
    onCourseChange('all')
    onStateChange('all')
  }

  const hasActiveFilters = selectedCourse !== 'all' || selectedState !== 'all'

  return (
    <div className={embedded ? '' : 'bg-white rounded-xl border-2 border-slate-300 p-6'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#0066F5]" />
          <h3 className="text-lg font-bold text-[#1E293B]">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-[#0066F5] hover:text-[#004ED4] transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Course Filter */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-[#1E293B] mb-3">Course</label>
        <div className="space-y-2 max-h-56 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => onCourseChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCourse === 'all'
                ? 'bg-[#0066F5] text-white'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Courses
          </button>
          {courses.map((course) => (
            <button
              type="button"
              key={course}
              onClick={() => onCourseChange(course)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize ${
                selectedCourse === course
                  ? 'bg-[#0066F5] text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {course}
            </button>
          ))}
        </div>
      </div>

      {/* State / City Filter */}
      <div className="mb-2">
        <label className="block text-sm font-bold text-[#1E293B] mb-3">City</label>
        <div className="space-y-2 max-h-64 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => onStateChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedState === 'all'
                ? 'bg-[#0066F5] text-white'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Cities
          </button>
          {states.map((state) => (
            <button
              type="button"
              key={state}
              onClick={() => onStateChange(state)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize ${
                selectedState === state
                  ? 'bg-[#0066F5] text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 mt-4 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCourse !== 'all' && (
              <span className="text-xs bg-[#0066F5] text-white px-2 py-1 rounded-md">
                {selectedCourse}
              </span>
            )}
            {selectedState !== 'all' && (
              <span className="text-xs bg-[#0066F5] text-white px-2 py-1 rounded-md">
                {selectedState}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

CollegeFilters.displayName = 'CollegeFilters'

export default CollegeFilters
