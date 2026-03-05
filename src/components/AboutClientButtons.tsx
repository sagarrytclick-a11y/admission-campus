'use client'

import { ArrowRight } from 'lucide-react'
import { useFormModal } from '@/context/FormModalContext'

export default function AboutClientButtons() {
  const { openModal } = useFormModal()

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#007BFF] hover:bg-[#10B981] text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide transition-colors"
      >
        Get Started <ArrowRight size={16} className="inline ml-2" />
      </button>
    </>
  )
}
