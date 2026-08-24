'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface AdminModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AdminModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  showFooter = true,
  confirmText = 'Save',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  size = 'md',
}: AdminModalProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-9 w-9 p-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 text-slate-900">{children}</div>

        {showFooter && (
          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="border-slate-200 text-slate-700"
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                onClick={() => onConfirm()}
                disabled={loading}
                className="bg-[#0066F5] text-white hover:bg-[#0047B3]"
              >
                {loading ? 'Saving...' : confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
