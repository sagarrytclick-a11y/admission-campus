// Centralized City Configuration - Single Source of Truth
// This file contains all city definitions used across the application

export interface CityConfig {
  id: string
  name: string
  slug: string
  description: string
  gradient: string
  examName: string
  examColor: string
  borderColor: string
  hoverBg: string
  href: string
  features: string[]
  stats: {
    colleges: string
    students: string
    avgFees?: string
  }
}

// Indian Cities - Matches the admin college form dropdown
export const INDIAN_CITIES: CityConfig[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    slug: "mumbai",
    description: "Financial capital with premier engineering, management, and medical institutions. Home to IIT Bombay, NMIMS, and top medical colleges.",
    gradient: "from-[#1A4AB2] via-[#1A4AB2]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#1A4AB2]",
    borderColor: "border-[#1A4AB2]",
    hoverBg: "hover:bg-[#1A4AB2]/5",
    href: "/colleges/city/mumbai",
    features: ["IIT Bombay", "NMIMS", "Top Medical Colleges"],
    stats: { colleges: "500+", students: "2L+", avgFees: "₹2-15L" }
  },
  {
    id: "delhi",
    name: "Delhi",
    slug: "delhi",
    description: "Educational hub with IIT Delhi, Delhi University, AIIMS, and premier management schools offering diverse programs.",
    gradient: "from-[#DC2626] via-[#DC2626]/90 to-slate-900",
    examName: "NEET",
    examColor: "text-[#DC2626]",
    borderColor: "border-[#DC2626]",
    hoverBg: "hover:bg-[#DC2626]/5",
    href: "/colleges/city/delhi",
    features: ["IIT Delhi", "AIIMS", "DU Colleges"],
    stats: { colleges: "600+", students: "3L+", avgFees: "₹1-20L" }
  },
  {
    id: "noida",
    name: "Noida",
    slug: "noida",
    description: "Emerging educational hub with modern infrastructure and growing number of engineering and management institutions.",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#059669]",
    borderColor: "border-[#059669]",
    hoverBg: "hover:bg-[#059669]/5",
    href: "/colleges/city/noida",
    features: ["Amity University", "JSSATE", "Top Engineering Colleges"],
    stats: { colleges: "150+", students: "80K+", avgFees: "₹1-8L" }
  },
  {
    id: "bangalore",
    name: "Bangalore",
    slug: "bangalore",
    description: "Silicon Valley of India with excellent engineering colleges, research institutions, and vibrant startup ecosystem.",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    examName: "CAT",
    examColor: "text-[#059669]",
    borderColor: "border-[#059669]",
    hoverBg: "hover:bg-[#059669]/5",
    href: "/colleges/city/bangalore",
    features: ["IISc", "RV College", "Top B-Schools"],
    stats: { colleges: "400+", students: "2.5L+", avgFees: "₹3-18L" }
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    slug: "hyderabad",
    description: "Emerging educational destination with IIT Hyderabad, BITS Pilani campus, and excellent medical institutions.",
    gradient: "from-[#7C3AED] via-[#7C3AED]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#7C3AED]",
    borderColor: "border-[#7C3AED]",
    hoverBg: "hover:bg-[#7C3AED]/5",
    href: "/colleges/city/hyderabad",
    features: ["IIT Hyderabad", "BITS Pilami", "NIMS"],
    stats: { colleges: "350+", students: "2L+", avgFees: "₹2-12L" }
  },
  {
    id: "chennai",
    name: "Chennai",
    slug: "chennai",
    description: "Traditional educational hub with IIT Madras, Anna University, and renowned medical and engineering institutions.",
    gradient: "from-[#EA580C] via-[#EA580C]/90 to-slate-900",
    examName: "NEET",
    examColor: "text-[#EA580C]",
    borderColor: "border-[#EA580C]",
    hoverBg: "hover:bg-[#EA580C]/5",
    href: "/colleges/city/chennai",
    features: ["IIT Madras", "Anna University", "CMC Vellore"],
    stats: { colleges: "450+", students: "2.2L+", avgFees: "₹1.5-15L" }
  },
  {
    id: "kolkata",
    name: "Kolkata",
    slug: "kolkata",
    description: "Cultural and educational center with prestigious institutions and rich academic heritage.",
    gradient: "from-[#DC2626] via-[#DC2626]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#DC2626]",
    borderColor: "border-[#DC2626]",
    hoverBg: "hover:bg-[#DC2626]/5",
    href: "/colleges/city/kolkata",
    features: ["IIT Kharagpur", "Jadavpur University", "Medical Colleges"],
    stats: { colleges: "300+", students: "1.8L+", avgFees: "₹1-10L" }
  },
  {
    id: "pune",
    name: "Pune",
    slug: "pune",
    description: "Oxford of the East with SPPU, top engineering colleges, and growing management education ecosystem.",
    gradient: "from-[#0891B2] via-[#0891B2]/90 to-slate-900",
    examName: "CAT",
    examColor: "text-[#0891B2]",
    borderColor: "border-[#0891B2]",
    hoverBg: "hover:bg-[#0891B2]/5",
    href: "/colleges/city/pune",
    features: ["SPPU", "COEP", "SIBM"],
    stats: { colleges: "380+", students: "1.8L+", avgFees: "₹2-10L" }
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    slug: "ahmedabad",
    description: "Growing educational destination with IIM Ahmedabad and quality engineering institutions.",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    examName: "CAT",
    examColor: "text-[#059669]",
    borderColor: "border-[#059669]",
    hoverBg: "hover:bg-[#059669]/5",
    href: "/colleges/city/ahmedabad",
    features: ["IIM Ahmedabad", "Nirma University", "Engineering Colleges"],
    stats: { colleges: "200+", students: "1.2L+", avgFees: "₹1.5-12L" }
  },
  {
    id: "jaipur",
    name: "Jaipur",
    slug: "jaipur",
    description: "Pink city emerging as educational hub with modern infrastructure and diverse institutions.",
    gradient: "from-[#7C3AED] via-[#7C3AED]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#7C3AED]",
    borderColor: "border-[#7C3AED]",
    hoverBg: "hover:bg-[#7C3AED]/5",
    href: "/colleges/city/jaipur",
    features: ["MNIT Jaipur", "Rajasthan University", "Medical Colleges"],
    stats: { colleges: "180+", students: "1L+", avgFees: "₹1-8L" }
  },
  {
    id: "surat",
    name: "Surat",
    slug: "surat",
    description: "Diamond city with growing educational institutions and technical colleges.",
    gradient: "from-[#EA580C] via-[#EA580C]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#EA580C]",
    borderColor: "border-[#EA580C]",
    hoverBg: "hover:bg-[#EA580C]/5",
    href: "/colleges/city/surat",
    features: ["SVNIT", "Engineering Colleges", "Management Institutes"],
    stats: { colleges: "120+", students: "80K+", avgFees: "₹1-6L" }
  },
  {
    id: "lucknow",
    name: "Lucknow",
    slug: "lucknow",
    description: "City of Nawabs with prestigious educational institutions and research centers.",
    gradient: "from-[#DC2626] via-[#DC2626]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#DC2626]",
    borderColor: "border-[#DC2626]",
    hoverBg: "hover:bg-[#DC2626]/5",
    href: "/colleges/city/lucknow",
    features: ["IIM Lucknow", "Engineering Colleges", "Medical Institutes"],
    stats: { colleges: "150+", students: "1L+", avgFees: "₹1-8L" }
  },
  {
    id: "kanpur",
    name: "Kanpur",
    slug: "kanpur",
    description: "Industrial city with IIT Kanpur and quality technical institutions.",
    gradient: "from-[#1A4AB2] via-[#1A4AB2]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#1A4AB2]",
    borderColor: "border-[#1A4AB2]",
    hoverBg: "hover:bg-[#1A4AB2]/5",
    href: "/colleges/city/kanpur",
    features: ["IIT Kanpur", "Engineering Colleges", "Technical Institutes"],
    stats: { colleges: "100+", students: "80K+", avgFees: "₹1-6L" }
  },
  {
    id: "nagpur",
    name: "Nagpur",
    slug: "nagpur",
    description: "Orange city with growing educational infrastructure and technical institutions.",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#059669]",
    borderColor: "border-[#059669]",
    hoverBg: "hover:bg-[#059669]/5",
    href: "/colleges/city/nagpur",
    features: ["VNIT Nagpur", "Engineering Colleges", "Management Institutes"],
    stats: { colleges: "90+", students: "60K+", avgFees: "₹1-5L" }
  },
  {
    id: "indore",
    name: "Indore",
    slug: "indore",
    description: "Clean city emerging as educational hub with quality institutions.",
    gradient: "from-[#7C3AED] via-[#7C3AED]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#7C3AED]",
    borderColor: "border-[#7C3AED]",
    hoverBg: "hover:bg-[#7C3AED]/5",
    href: "/colleges/city/indore",
    features: ["IIM Indore", "Engineering Colleges", "Management Institutes"],
    stats: { colleges: "110+", students: "70K+", avgFees: "₹1-6L" }
  },
  {
    id: "thane",
    name: "Thane",
    slug: "thane",
    description: "Mumbai's neighbor with growing educational institutions and modern infrastructure.",
    gradient: "from-[#0891B2] via-[#0891B2]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#0891B2]",
    borderColor: "border-[#0891B2]",
    hoverBg: "hover:bg-[#0891B2]/5",
    href: "/colleges/city/thane",
    features: ["Engineering Colleges", "Management Institutes", "Technical Centers"],
    stats: { colleges: "80+", students: "50K+", avgFees: "₹1-5L" }
  },
  {
    id: "bhopal",
    name: "Bhopal",
    slug: "bhopal",
    description: "City of lakes with quality educational institutions and research centers.",
    gradient: "from-[#DC2626] via-[#DC2626]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#DC2626]",
    borderColor: "border-[#DC2626]",
    hoverBg: "hover:bg-[#DC2626]/5",
    href: "/colleges/city/bhopal",
    features: ["Engineering Colleges", "Medical Institutes", "Technical Universities"],
    stats: { colleges: "120+", students: "80K+", avgFees: "₹1-6L" }
  },
  {
    id: "visakhapatnam",
    name: "Visakhapatnam",
    slug: "visakhapatnam",
    description: "Coastal city with growing educational institutions and technical colleges.",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#059669]",
    borderColor: "border-[#059669]",
    hoverBg: "hover:bg-[#059669]/5",
    href: "/colleges/city/visakhapatnam",
    features: ["Engineering Colleges", "Technical Institutes", "Management Centers"],
    stats: { colleges: "70+", students: "50K+", avgFees: "₹1-5L" }
  },
  {
    id: "pimpri-chinchwad",
    name: "Pimpri-Chinchwad",
    slug: "pimpri-chinchwad",
    description: "Industrial twin city of Pune with growing technical and management institutions.",
    gradient: "from-[#7C3AED] via-[#7C3AED]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#7C3AED]",
    borderColor: "border-[#7C3AED]",
    hoverBg: "hover:bg-[#7C3AED]/5",
    href: "/colleges/city/pimpri-chinchwad",
    features: ["Engineering Colleges", "Technical Institutes", "Management Centers"],
    stats: { colleges: "60+", students: "40K+", avgFees: "₹1-4L" }
  },
  {
    id: "patna",
    name: "Patna",
    slug: "patna",
    description: "Historic city with growing educational institutions and quality colleges.",
    gradient: "from-[#DC2626] via-[#DC2626]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#DC2626]",
    borderColor: "border-[#DC2626]",
    hoverBg: "hover:bg-[#DC2626]/5",
    href: "/colleges/city/patna",
    features: ["Engineering Colleges", "Medical Institutes", "Technical Universities"],
    stats: { colleges: "80+", students: "60K+", avgFees: "₹1-5L" }
  },
  {
    id: "vadodara",
    name: "Vadodara",
    slug: "vadodara",
    description: "Cultural city with quality educational institutions and technical colleges.",
    gradient: "from-[#059669] via-[#059669]/90 to-slate-900",
    examName: "JEE",
    examColor: "text-[#059669]",
    borderColor: "border-[#059669]",
    hoverBg: "hover:bg-[#059669]/5",
    href: "/colleges/city/vadodara",
    features: ["Engineering Colleges", "Management Institutes", "Technical Centers"],
    stats: { colleges: "70+", students: "50K+", avgFees: "₹1-5L" }
  }
]

// Featured cities for homepage display (top 6 cities)
export const FEATURED_CITIES: CityConfig[] = INDIAN_CITIES.slice(0, 6)

// Helper functions
export const getCityBySlug = (slug: string): CityConfig | undefined => {
  return INDIAN_CITIES.find(city => city.slug === slug)
}

export const getCityName = (slug: string): string => {
  const city = getCityBySlug(slug)
  return city ? city.name : slug.charAt(0).toUpperCase() + slug.slice(1)
}

export const getAllCitySlugs = (): string[] => {
  return INDIAN_CITIES.map(city => city.slug)
}

// City options for dropdowns (matches admin form)
export const CITY_OPTIONS = INDIAN_CITIES.map(city => ({
  value: city.slug,
  label: city.name
}))

// Default featured cities for homepage
export const DEFAULT_FEATURED_CITIES = [
  "mumbai", "delhi", "noida", "bangalore", "hyderabad", "chennai"
]
