'use client'

import { ArrowRight } from 'lucide-react'
import { useFormModal } from '@/context/FormModalContext'

export default function AboutClientButtons() {
  const { openModal } = useFormModal()

  return (
    <button
      type="button"
      onClick={openModal}
      className="inline-flex items-center gap-2 bg-white text-[#0066F5] hover:bg-[#E8F1FF] px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
    >
      Get free counselling
      <ArrowRight size={16} />
    </button>
  )
}
