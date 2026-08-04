'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PopupContextType {
  isPopupOpen: boolean
  openPopup: () => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    // Show popup after 6 seconds when page loads
    const timer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 6000)
    
    return () => clearTimeout(timer)
  }, [])

  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export function usePopup() {
  const context = useContext(PopupContext)
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}
