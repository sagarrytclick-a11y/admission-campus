'use client'

import React, { useEffect } from 'react'
import { useFormModal } from '@/context/FormModalContext'
import { X, Send, User, Mail, Phone, MapPin, CheckCircle2, AlertCircle, GraduationCap } from 'lucide-react'

export const FormModal: React.FC = () => {
  const { isOpen, closeModal, formData, updateFormData, resetForm } = useFormModal()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          resetForm()
          closeModal()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        throw new Error('Failed')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    resetForm()
    setSubmitStatus('idle')
    closeModal()
  }

  if (!isOpen) return null

  const fields = [
    { id: 'name' as const, label: 'Full Name', type: 'text', icon: User, placeholder: 'Enter your name', autoComplete: 'name' },
    { id: 'email' as const, label: 'Email Address', type: 'email', icon: Mail, placeholder: 'email@example.com', autoComplete: 'email' },
    { id: 'number' as const, label: 'Contact Number', type: 'tel', icon: Phone, placeholder: '+91 XXXXX XXXXX', autoComplete: 'tel' },
    { id: 'city' as const, label: 'Current City', type: 'text', icon: MapPin, placeholder: 'e.g. Mumbai', autoComplete: 'address-level2' },
  ]

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-[#12141D]/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[calc(100vw-1.5rem)] sm:max-w-md md:max-w-lg flex flex-col max-h-[min(88dvh,640px)] sm:max-h-[90vh] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden animate-in zoom-in-95 fade-in duration-200"
      >
        <div className="h-1.5 w-full bg-[#0066F5] shrink-0" />

        {/* Header */}
        <div className="shrink-0 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 flex items-start justify-between gap-3 border-b border-slate-100">
          <div className="min-w-0 flex items-start gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#0066F5]/10 text-[#0066F5]">
              <GraduationCap size={18} className="sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 pt-0.5">
              <h2
                id="form-modal-title"
                className="text-base sm:text-xl font-bold text-[#1E293B] tracking-tight leading-tight"
              >
                Get in <span className="text-[#0066F5]">Touch</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 leading-snug">
                Connect with our admission strategists.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 p-2 -mr-1 text-slate-400 hover:text-[#0066F5] hover:bg-[#BFDBFE]/60 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable fields */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-3.5 sm:py-4 space-y-3 min-h-0">
          <div className="grid grid-cols-1 gap-3">
            {fields.map((field) => (
              <div key={field.id} className="group">
                <label
                  htmlFor={`modal-${field.id}`}
                  className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066F5] transition-colors pointer-events-none">
                    <field.icon size={15} />
                  </div>
                  <input
                    id={`modal-${field.id}`}
                    type={field.type}
                    required
                    autoComplete={field.autoComplete}
                    inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : 'text'}
                    value={formData[field.id]}
                    onChange={(e) => updateFormData({ [field.id]: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1E293B] placeholder:text-slate-400 focus:bg-white focus:border-[#0066F5] focus:ring-2 focus:ring-[#0066F5]/15 outline-none transition-all text-sm font-medium"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}

            <div className="group">
              <label
                htmlFor="modal-course"
                className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block"
              >
                Course you&apos;re looking for
              </label>
              <div className="relative">
                <select
                  id="modal-course"
                  value={formData.course_category}
                  onChange={(e) => updateFormData({ course_category: e.target.value })}
                  className="w-full pl-3 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1E293B] focus:bg-white focus:border-[#0066F5] focus:ring-2 focus:ring-[#0066F5]/15 outline-none transition-all text-sm font-medium appearance-none"
                >
                  <option value="">Select a course category</option>
                  <option value="Medical">Medical</option>
                  <option value="Management">Management</option>
                  <option value="Law">Law</option>
                  <option value="Design">Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Online MBA">Online MBA</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2.5 p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <CheckCircle2 size={16} className="shrink-0" />
              <p className="text-xs font-semibold">Request received! We&apos;ll contact you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2.5 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
              <AlertCircle size={16} className="shrink-0" />
              <p className="text-xs font-semibold">Something went wrong. Please try again.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 px-4 sm:px-6 pt-3 pb-4 sm:pb-5 border-t border-slate-100 bg-white">
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 sm:py-3 text-sm font-semibold text-[#64748B] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors active:scale-[0.98]"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[1.6] py-2.5 sm:py-3 bg-[#0066F5] hover:bg-[#004ED4] text-white rounded-lg font-semibold text-sm shadow-md shadow-[#0066F5]/25 transition-colors active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2.5 text-center text-[10px] text-[#94A3B8] font-medium tracking-wide">
            Privacy protected · Secure submission
          </p>
        </div>
      </form>
    </div>
  )
}
