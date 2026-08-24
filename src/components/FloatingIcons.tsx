'use client'

import { Bell, Phone } from 'lucide-react'

interface FloatingIconsProps {
  onNotificationClick: () => void
}

export function FloatingIcons({ onNotificationClick }: FloatingIconsProps) {
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number
    const phoneNumber = "9220606908"
    const message = "Hello! I'm interested in admission information."
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="fixed bottom-20 right-3 sm:right-6 flex flex-col gap-3 sm:gap-4 z-[2000]">
      {/* WhatsApp Icon */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3.5 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Contact on WhatsApp"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Notification Icon */}
      <button
        onClick={onNotificationClick}
        className="bg-[#0066F5] hover:bg-[#0066F5] text-white rounded-full p-3.5 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Show notifications"
      >
        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  )
}
