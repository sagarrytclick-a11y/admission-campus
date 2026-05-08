'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface PopupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PopupModal({ isOpen, onClose }: PopupModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-8">
      <div className="relative bg-transparent rounded-lg max-w-md w-full">
        {/* Close button at top right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-[10000] bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
        >
          <X className="w-4 h-4 text-gray-800" />
        </button>
        
        {/* Popup content with image */}
        <div className="p-4">
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
