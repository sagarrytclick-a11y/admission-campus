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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/50" onClick={onClose}>
      <div
        className="relative bg-transparent rounded-lg w-full max-w-[280px] sm:max-w-sm mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button at top right */}
        <button
          onClick={onClose}
          className="absolute -top-2.5 -right-2.5 z-[10000] bg-white rounded-full p-1 hover:bg-gray-100 transition-colors shadow-md"
        >
          <X className="w-3 h-3 text-gray-800" />
        </button>

        {/* Popup content with image */}
        <div className="p-1">
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
