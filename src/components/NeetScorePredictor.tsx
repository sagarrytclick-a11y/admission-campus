'use client'

import React, { useMemo, useState } from 'react'
import { Calculator, Target, GraduationCap, TrendingUp, Info, RotateCcw } from 'lucide-react'

type Category = 'general' | 'obc' | 'ews' | 'sc' | 'st'

interface Prediction {
  rankMin: number
  rankMax: number
  percentile: string
  chances: { label: string; level: 'High' | 'Moderate' | 'Low'; color: string }[]
  tip: string
}

function predictFromScore(score: number, category: Category): Prediction {
  // Static illustrative bands (not official cutoffs)
  const bands: { min: number; rankMin: number; rankMax: number; percentile: string }[] = [
    { min: 700, rankMin: 1, rankMax: 150, percentile: '99.9+' },
    { min: 650, rankMin: 150, rankMax: 2500, percentile: '99.5+' },
    { min: 600, rankMin: 2500, rankMax: 12000, percentile: '98+' },
    { min: 550, rankMin: 12000, rankMax: 35000, percentile: '95+' },
    { min: 500, rankMin: 35000, rankMax: 70000, percentile: '90+' },
    { min: 450, rankMin: 70000, rankMax: 120000, percentile: '80+' },
    { min: 400, rankMin: 120000, rankMax: 200000, percentile: '70+' },
    { min: 350, rankMin: 200000, rankMax: 350000, percentile: '55+' },
    { min: 0, rankMin: 350000, rankMax: 800000, percentile: '<50' },
  ]

  const band = bands.find((b) => score >= b.min) || bands[bands.length - 1]

  // Category softens rank slightly for reserved categories (static demo only)
  const categoryFactor: Record<Category, number> = {
    general: 1,
    ews: 0.92,
    obc: 0.88,
    sc: 0.72,
    st: 0.68,
  }
  const factor = categoryFactor[category]
  const rankMin = Math.max(1, Math.round(band.rankMin * factor))
  const rankMax = Math.round(band.rankMax * factor)

  const chances: Prediction['chances'] = []
  if (score >= 620) {
    chances.push({ label: 'Govt. MBBS (AIQ)', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
    chances.push({ label: 'Top State Colleges', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
    chances.push({ label: 'Deemed / Private', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
  } else if (score >= 550) {
    chances.push({ label: 'Govt. MBBS (AIQ)', level: 'Moderate', color: 'bg-amber-50 text-amber-700 border-amber-100' })
    chances.push({ label: 'State Quota MBBS', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
    chances.push({ label: 'Private MBBS', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
  } else if (score >= 480) {
    chances.push({ label: 'Govt. MBBS (AIQ)', level: 'Low', color: 'bg-red-50 text-red-700 border-red-100' })
    chances.push({ label: 'State Quota / BDS', level: 'Moderate', color: 'bg-amber-50 text-amber-700 border-amber-100' })
    chances.push({ label: 'Private MBBS', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
  } else if (score >= 400) {
    chances.push({ label: 'Govt. MBBS', level: 'Low', color: 'bg-red-50 text-red-700 border-red-100' })
    chances.push({ label: 'Private MBBS', level: 'Moderate', color: 'bg-amber-50 text-amber-700 border-amber-100' })
    chances.push({ label: 'AYUSH / Allied', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
  } else {
    chances.push({ label: 'Govt. / Private MBBS', level: 'Low', color: 'bg-red-50 text-red-700 border-red-100' })
    chances.push({ label: 'AYUSH Courses', level: 'Moderate', color: 'bg-amber-50 text-amber-700 border-amber-100' })
    chances.push({ label: 'Retake / Prep Plan', level: 'High', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' })
  }

  let tip = 'Focus on consistent mock tests and weak-area revision.'
  if (score >= 650) tip = 'Strong score — shortlist AIIMS / top govt colleges and prepare for counselling.'
  else if (score >= 550) tip = 'Competitive range — balance AIQ + state quota options carefully.'
  else if (score >= 450) tip = 'Explore private & state options; counselling strategy matters a lot.'
  else tip = 'Consider improvement plan or allied medical pathways with expert counselling.'

  return { rankMin, rankMax, percentile: band.percentile, chances, tip }
}

interface NeetScorePredictorProps {
  compact?: boolean
  className?: string
}

export default function NeetScorePredictor({ compact = false, className = '' }: NeetScorePredictorProps) {
  const [physics, setPhysics] = useState('')
  const [chemistry, setChemistry] = useState('')
  const [biology, setBiology] = useState('')
  const [category, setCategory] = useState<Category>('general')
  const [submitted, setSubmitted] = useState(false)

  const clamp = (value: string, max: number) => {
    if (value === '') return ''
    const n = Math.min(max, Math.max(0, Number(value) || 0))
    return String(n)
  }

  const total = useMemo(() => {
    return (Number(physics) || 0) + (Number(chemistry) || 0) + (Number(biology) || 0)
  }, [physics, chemistry, biology])

  const prediction = useMemo(() => {
    if (!submitted) return null
    return predictFromScore(total, category)
  }, [submitted, total, category])

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setPhysics('')
    setChemistry('')
    setBiology('')
    setCategory('general')
    setSubmitted(false)
  }

  const inputClass =
    'w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1E293B] text-sm font-medium focus:bg-white focus:border-[#0066F5] focus:ring-2 focus:ring-[#0066F5]/15 outline-none transition-all'

  return (
    <div className={`bg-white border-2 border-slate-200 rounded-xl overflow-hidden ${className}`}>
      {!compact && (
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-[#F8FAFC]">
          <div className="h-10 w-10 rounded-lg bg-[#0066F5]/10 text-[#0066F5] flex items-center justify-center">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E293B]">NEET Score Predictor</h3>
            <p className="text-xs text-[#64748B]">Estimate rank range from your subject scores</p>
          </div>
        </div>
      )}

      <form onSubmit={handlePredict} className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">
              Physics (0–180)
            </label>
            <input
              type="number"
              min={0}
              max={180}
              value={physics}
              onChange={(e) => setPhysics(clamp(e.target.value, 180))}
              placeholder="0"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">
              Chemistry (0–180)
            </label>
            <input
              type="number"
              min={0}
              max={180}
              value={chemistry}
              onChange={(e) => setChemistry(clamp(e.target.value, 180))}
              placeholder="0"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">
              Biology (0–360)
            </label>
            <input
              type="number"
              min={0}
              max={360}
              value={biology}
              onChange={(e) => setBiology(clamp(e.target.value, 360))}
              placeholder="0"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
          <div>
            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as Category)
                if (submitted) setSubmitted(true)
              }}
              className={inputClass}
            >
              <option value="general">General</option>
              <option value="ews">EWS</option>
              <option value="obc">OBC-NCL</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
            <span className="text-xs font-semibold text-[#64748B]">Total Score</span>
            <span className="text-lg font-bold text-[#0066F5]">{total}<span className="text-sm text-slate-400 font-medium">/720</span></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            type="submit"
            className="flex-1 sm:flex-[2] py-2.5 sm:py-3 bg-[#0066F5] hover:bg-[#004ED4] text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Target size={16} />
            Predict Rank
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-[#64748B] rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
      </form>

      {prediction && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 border-t border-slate-100 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
              <div className="flex items-center gap-2 text-[#64748B] text-[10px] font-bold uppercase tracking-wider mb-1">
                <TrendingUp size={12} /> Est. Rank Range
              </div>
              <p className="text-lg font-bold text-[#1E293B]">
                {prediction.rankMin.toLocaleString()} – {prediction.rankMax.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
              <div className="flex items-center gap-2 text-[#64748B] text-[10px] font-bold uppercase tracking-wider mb-1">
                <Target size={12} /> Percentile
              </div>
              <p className="text-lg font-bold text-[#0066F5]">{prediction.percentile}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
              <div className="flex items-center gap-2 text-[#64748B] text-[10px] font-bold uppercase tracking-wider mb-1">
                <GraduationCap size={12} /> Score
              </div>
              <p className="text-lg font-bold text-[#1E293B]">{total} / 720</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Admission Chances</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {prediction.chances.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-lg border px-3 py-2.5 ${item.color}`}
                >
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] font-semibold mt-0.5 opacity-80">{item.level} Chance</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-3">
            <Info size={16} className="text-[#0066F5] shrink-0 mt-0.5" />
            <p className="text-xs text-[#1E293B] leading-relaxed">
              <span className="font-bold">Tip: </span>
              {prediction.tip} This is a static estimate for guidance only — not an official NTA result.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
