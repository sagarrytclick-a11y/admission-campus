'use client'

interface LayoutBodyProps {
  children: React.ReactNode
}

export function LayoutBody({ children }: LayoutBodyProps) {
  return (
    <>
      {children}
    </>
  )
}
