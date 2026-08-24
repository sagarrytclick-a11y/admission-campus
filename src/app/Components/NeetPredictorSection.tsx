'use client'

import Link from 'next/link'
import { ArrowRight, Calculator, Target, GraduationCap } from 'lucide-react'
import NeetScorePredictor from '@/components/NeetScorePredictor'

export default function NeetPredictorSection() {
  return (
    <section className="py-[32px] bg-[#F8FAFC] border-y border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left copy */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 text-[#0066F5] mb-4">
              <Calculator size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Free Tools</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-3">
              NEET Score <span className="text-[#0066F5]">Predictor</span>
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6 max-w-md">
              Instantly estimate your NEET rank range from Physics, Chemistry and Biology scores —
              and see where you may stand for MBBS admissions.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { icon: Target, text: 'Subject-wise score input (out of 720)' },
                { icon: GraduationCap, text: 'Category-based rank estimate' },
                { icon: Calculator, text: 'Govt / Private chance overview' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-[#1E293B] font-medium">
                  <span className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-[#0066F5] flex items-center justify-center shrink-0">
                    <item.icon size={16} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            <Link
              href="/tools/neet-score-predictor"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0066F5] hover:underline"
            >
              Open full tool page <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: predictor widget */}
          <NeetScorePredictor compact />
        </div>
      </div>
    </section>
  )
}
