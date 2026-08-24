'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Stethoscope, Heart, Brain, Bone, Eye, Baby, Activity, Pill, ArrowRight } from 'lucide-react'
import { useFormModal } from '@/context/FormModalContext'
import { formatRankingLabel } from '@/lib/formatRanking'

const medicalSpecialties = [
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "General Medicine",
    description: "Comprehensive healthcare services for all ages",
    duration: "5.5 Years",
    seats: "5000+"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Cardiology",
    description: "Specialized care for heart conditions",
    duration: "6 Years",
    seats: "500+"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neurology",
    description: "Advanced treatment for neurological disorders",
    duration: "6 Years",
    seats: "300+"
  },
  {
    icon: <Bone className="w-8 h-8" />,
    title: "Orthopedics",
    description: "Bone and joint care specialists",
    duration: "6 Years",
    seats: "400+"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Ophthalmology",
    description: "Eye care and vision treatment",
    duration: "5.5 Years",
    seats: "600+"
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: "Pediatrics",
    description: "Specialized healthcare for children",
    duration: "5.5 Years",
    seats: "800+"
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Surgery",
    description: "Advanced surgical procedures and care",
    duration: "6 Years",
    seats: "700+"
  },
  {
    icon: <Pill className="w-8 h-8" />,
    title: "Pharmacology",
    description: "Medicine and drug research",
    duration: "5.5 Years",
    seats: "1000+"
  }
]

interface College {
  name: string
  ranking: string
  neetScore: string
  image?: string
  slug?: string
}

export default function MedicalSection() {
  const [activeTab, setActiveTab] = useState('colleges')
  const { openModal } = useFormModal()

  // Fetch medical colleges using React Query
  const { data: colleges = [], isLoading, error } = useQuery<College[]>({
    queryKey: ['medicalColleges'],
    queryFn: async () => {
      try {
        // Fetch medical colleges from your local API
        const response = await fetch('/api/colleges?category=medical&limit=6&page=1')
        
        if (response.ok) {
          const result = await response.json()
          
          if (result.success && result.data?.colleges && result.data.colleges.length > 0) {
            // Transform the API data to match our format - take exactly 6 colleges
            const transformedData = result.data.colleges.slice(0, 6).map((college: any, index: number) => ({
              name: college.name || `Medical College ${index + 1}`,
              ranking: formatRankingLabel(college.ranking?.country_ranking || college.legacy_ranking) || `#${index + 1}`,
              neetScore: college.fees_structure?.courses?.[0]?.annual_tuition_fee ? `${college.fees_structure.courses[0].annual_tuition_fee}` : `${720 - index * 5}+`,
              image: college.banner_url || `/Hero/hero-${(index % 3) + 1}.jpg`,
              slug: college.slug,
            }))
            
            return transformedData
          } else {
            throw new Error('No medical colleges found in API response')
          }
        } else {
          throw new Error(`API request failed with status: ${response.status}`)
        }
      } catch (error) {
        
        // Fallback to hardcoded medical college data
        const fallbackData = [
          { name: "AIIMS Delhi", ranking: "#1", neetScore: "720+", image: "/Hero/hero-1.jpg", slug: "" },
          { name: "PGIMER Chandigarh", ranking: "#2", neetScore: "715+", image: "/Hero/hero-2.jpg", slug: "" },
          { name: "CMC Vellore", ranking: "#3", neetScore: "710+", image: "/Hero/hero-3.jpg", slug: "" },
          { name: "JIPMER Puducherry", ranking: "#4", neetScore: "705+", image: "/Hero/hero-1.jpg", slug: "" },
          { name: "KMC Manipal", ranking: "#5", neetScore: "700+", image: "/Hero/hero-2.jpg", slug: "" },
          { name: "GMC Mumbai", ranking: "#6", neetScore: "695+", image: "/Hero/hero-3.jpg", slug: "" }
        ]
        return fallbackData
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
  })

  return (
    <div className="py-8 px-4 bg-[#F4F7FC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Medical Education in India
          </h2>
          <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto">
            Pursue your dream of becoming a doctor with world-class medical education
            and training at India&apos;s top institutions
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-1 inline-flex">
            <button
              type="button"
              onClick={() => setActiveTab('specialties')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'specialties'
                  ? 'bg-[#0066F5] text-white'
                  : 'text-[#64748B] hover:text-[#0066F5]'
              }`}
            >
              Medical Specialties
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('colleges')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'colleges'
                  ? 'bg-[#0066F5] text-white'
                  : 'text-[#64748B] hover:text-[#0066F5]'
              }`}
            >
              Top Medical Colleges
            </button>
          </div>
        </div>

        {activeTab === 'specialties' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalSpecialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/10 transition-all"
              >
                <div className="text-[#0066F5] mb-4">{specialty.icon}</div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                  {specialty.title}
                </h3>
                <p className="text-[#64748B] mb-4 text-sm">{specialty.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Duration:</span>
                  <span className="font-semibold text-[#0F172A]">{specialty.duration}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-[#64748B]">Seats:</span>
                  <span className="font-semibold text-[#0F172A]">{specialty.seats}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'colleges' && (
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] animate-pulse">
                    <div className="h-48 bg-slate-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-100 rounded" />
                      <div className="h-10 bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college: College, index: number) => {
                  const href = college.slug
                    ? `/colleges/${college.slug}`
                    : "/colleges/category/medical";
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-xl overflow-hidden border border-[#E2E8F0] hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all flex flex-col"
                    >
                      <div className="h-48 bg-slate-100 relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = `/Hero/hero-${(index % 3) + 1}.jpg`;
                          }}
                        />
                        <div className="absolute top-2.5 right-2.5 left-2.5 flex justify-end">
                          <span
                            title={college.ranking}
                            className="inline-block max-w-full bg-[#0066F5] text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-md leading-snug line-clamp-2 text-left"
                          >
                            {college.ranking}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#0066F5] transition-colors line-clamp-2">
                          {college.name}
                        </h3>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[#64748B] text-sm">Fees / Score</span>
                          <span className="font-semibold text-[#0066F5] text-sm bg-[#E8F1FF] px-2 py-1 rounded-md">
                            {college.neetScore}
                          </span>
                        </div>

                        <Link
                          href={href}
                          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] text-white font-bold py-2.5 text-sm hover:bg-[#0047B3] transition-colors"
                        >
                          View Details
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center bg-[#0066F5] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Start Your Medical Journey Today</h3>
          <p className="mb-6 text-white/85">
            Get expert guidance for NEET preparation and medical college admissions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-[#0066F5] px-6 py-3 rounded-xl font-semibold hover:bg-[#E8F1FF] transition-colors"
            >
              Explore Medical Colleges
            </button>
            <button
              type="button"
              onClick={openModal}
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#0066F5] transition-colors"
            >
              Get Free Counselling
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
