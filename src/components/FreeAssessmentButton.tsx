'use client'

import { useFormModal } from "@/context/FormModalContext";

export default function FreeAssessmentButton() {
  const { openModal } = useFormModal();

  return (
    <button className="bg-white border border-slate-200 text-[#1E293B] px-8 py-4 rounded-xl font-semibold hover:border-[#007BFF] hover:text-[#007BFF] transition-all">
      Free Assessment
    </button>
  )
}
