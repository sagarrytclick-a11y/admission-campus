'use client'

import { ArrowRight } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function ContactClientButton() {
  const { openModal } = useFormModal();

  return (
    <button
      onClick={openModal}
      className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
    >
      Start Your Journey <ArrowRight size={18} className="inline ml-2" />
    </button>
  )
}
