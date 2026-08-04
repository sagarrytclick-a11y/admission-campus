import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import NeetScorePredictor from '@/components/NeetScorePredictor'

export const metadata: Metadata = {
  title: 'NEET Score Predictor | Admission Campus',
  description:
    'Estimate your NEET rank range from Physics, Chemistry and Biology scores. Free static NEET score predictor tool.',
}

export default function NeetScorePredictorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0066F5] text-white py-[32px] px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            Free Tool
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            NEET Score Predictor
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed">
            Enter your subject scores to get an estimated rank range and college admission chances.
          </p>
        </div>
      </section>

      <section className="py-[32px] px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <NeetScorePredictor />
          <p className="mt-4 text-center text-[11px] text-[#94A3B8]">
            For counselling support,{' '}
            <Link href="/contact" className="text-[#0066F5] font-semibold hover:underline">
              talk to our mentors
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
