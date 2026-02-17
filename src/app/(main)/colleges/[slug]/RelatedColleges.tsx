'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCountryName } from "@/lib/normalize"

import { Button } from '@/components/ui/button'
import {
  MapPin,
  DollarSign,
  Clock,
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  
  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
}

interface RelatedCollegesProps {
  currentCollegeSlug: string
}

const fetchRelatedColleges = async (slug: string): Promise<College[]> => {
    const response = await fetch(`/api/colleges/${slug}/related`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch related colleges')
    }
    
    return result.data;
  };
  
  export default function RelatedColleges({ currentCollegeSlug }: RelatedCollegesProps) {
  const { data: colleges = [], isLoading, isError, error } = useQuery({
    queryKey: ['related-colleges', currentCollegeSlug],
    queryFn: () => fetchRelatedColleges(currentCollegeSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Error Loading Related Colleges</h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Please try again later or explore our complete collection of top-ranked universities
        </p>
        <Link href="/colleges">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2">
            Explore All Colleges
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="h-48 bg-slate-200 animate-pulse" />
            <div className="p-6">
              <div className="h-6 bg-slate-200 rounded-lg mb-3 animate-pulse" />
              <div className="h-4 bg-slate-100 rounded-lg mb-4 w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-8 bg-slate-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-slate-100 rounded-lg animate-pulse" />
              </div>
              <div className="h-10 bg-slate-200 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">No Related Colleges Found</h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Explore our complete collection of top-ranked universities worldwide
        </p>
        <Link href="/colleges">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2">
            Explore All Colleges
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Colleges</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore similar institutions that might interest you
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => {
          const country = college.country_ref
          const countryName = getCountryName(college.country_ref)
          const countryFlag = typeof country === 'object' ? country.flag : ''

          return (
            <div key={college._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full">
              <div className="relative h-48 flex-shrink-0">
                <img
                  src={college.banner_url || `https://picsum.photos/seed/${college.slug}/400/300`}
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Ranking Badge */}
                {college.ranking && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-white border-none px-3 py-1 rounded-full text-xs font-medium">
                      #{typeof college.ranking === 'object' ? college.ranking.country_ranking || college.ranking.world_ranking : college.ranking}
                    </Badge>
                  </div>
                )}
                
                {/* Country Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 border-none px-3 py-1 rounded-full text-xs font-medium">
                    {getCountryName(college.country_ref)}
                  </Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg text-slate-900 mb-4 line-clamp-2 min-h-[3.5rem]">
                  {college.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-medium mb-1">Yearly Fees</div>
                    <div className="flex items-center text-blue-600 font-semibold">
                      {/* <DollarSign size={16} /> */}
                      <span>
                        {college.fees 
                          ? `$${college.fees.toLocaleString()}`
                          : college.fees_structure?.courses?.[0]?.annual_tuition_fee || 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-medium mb-1">Duration</div>
                    <div className="flex items-center text-slate-700 font-semibold">
                      <Clock size={16} className="mr-1 text-slate-400" />
                      <span>
                        {college.duration || college.fees_structure?.courses?.[0]?.duration || 'N/A'} years
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href={`/colleges/${college.slug}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
