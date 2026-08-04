'use client'

import { useEffect, useState } from 'react'

export function MarqueeSlider() {
  const [institutions] = useState([
    { name: "MBBS in India", url: "#" },
    { name: "MBBS Admission", url: "#" },
    { name: "Medical Colleges India", url: "#" },
    { name: "NEET PG", url: "#" },
    { name: "MBBS Courses", url: "#" },
    { name: "AIIMS Delhi", url: "#" },
    { name: "JIPMER", url: "#" },
    { name: "Medical Counselling", url: "#" }
  ])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-3 z-1000 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* First set of items */}
        {institutions.map((institution, index) => (
          <div key={`first-${index}`} className="flex items-center mx-8">
            <a 
              href={institution.url} 
              className="hover:text-yellow-300 transition-colors text-sm font-medium"
            >
              {institution.name}
            </a>
            <span className="mx-2 text-blue-300">|</span>
          </div>
        ))}
        
        {/* Duplicate set for continuous scroll */}
        {institutions.map((institution, index) => (
          <div key={`second-${index}`} className="flex items-center mx-8">
            <a 
              href={institution.url} 
              className="hover:text-yellow-300 transition-colors text-sm font-medium"
            >
              {institution.name}
            </a>
            <span className="mx-2 text-blue-300">|</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
