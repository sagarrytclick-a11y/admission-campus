'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface PopupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PopupModal({ isOpen, onClose }: PopupModalProps) {
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#12141D]/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-transparent rounded-lg w-full max-w-[280px] sm:max-w-sm mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2.5 -right-2.5 z-[10000] bg-[#1E212B] border border-white/10 rounded-full p-1.5 hover:border-[#0066F5]/50 hover:text-[#0066F5] transition-all duration-300 shadow-lg shadow-black/40 text-[#F8FAFC]"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="p-1 rounded-xl border border-white/5 bg-[#1E212B] shadow-lg shadow-black/40 overflow-hidden">
          <img
            src="/mbbs.png"
            alt="MBBS Admission"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
