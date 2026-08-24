'use client'

import React, { useState, useEffect } from 'react'

interface BackgroundSliderProps {
  children: React.ReactNode
}

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  //baground change

  const slides = [
    {
      id: 1,
      gradient: 'from-[#0066F5]/20 via-[#0066F5]/20 to-[#E8F1FF]0/20',
      pattern: 'bg-gradient-to-br'
    },
    {
      id: 2,
      gradient: 'from-[#0066F5]/10 via-[#0066F5]/10 to-[#0047B3]/10',
      pattern: 'bg-gradient-to-tr'
    },
    {
      id: 3,
      gradient: 'from-green-500/10 via-emerald-400/10 to-teal-500/10',
      pattern: 'bg-gradient-to-bl'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 ${slide.pattern} ${slide.gradient} transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Subtle animated overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/40" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFB800' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default BackgroundSlider