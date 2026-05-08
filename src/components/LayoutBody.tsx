'use client'

import { usePopup } from '@/context/PopupContext'
import { PopupModal } from './PopupModal'
import { MarqueeSlider } from './MarqueeSlider'
import { FloatingIcons } from './FloatingIcons'

interface LayoutBodyProps {
  children: React.ReactNode
}

export function LayoutBody({ children }: LayoutBodyProps) {
  const { isPopupOpen, closePopup, openPopup } = usePopup()

  return (
    <>
      {children}
      <PopupModal isOpen={isPopupOpen} onClose={closePopup} />
      <MarqueeSlider />
      <FloatingIcons onNotificationClick={openPopup} />
    </>
  )
}
