'use client'

import React from 'react'
import { useFormModal } from '@/context/FormModalContext'
import { X, Send, User, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'

export const FormModal: React.FC = () => {
  const { isOpen, closeModal, formData, updateFormData, resetForm } = useFormModal()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

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
    } catch (error) {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop - High-end Blur */}
      <div
        className="absolute inset-0 bg-[#12141D]/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-slate-100 w-full max-w-lg sm:max-w-xl overflow-hidden transform transition-all">
        
        {/* Decorative Top Accent */}
        <div className="h-2 w-full bg-linear-to-r from-[#007BFF] via-[#007BFF] to-[#007BFF]" />

        {/* Header Section */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-7 lg:pt-8 pb-4 sm:pb-5 lg:pb-6 flex justify-between items-start">
          <div className="flex-1 pr-2 sm:pr-0">
            <h2 className="text-xl sm:text-2xl lg:text-2xl font-black text-[#1E293B] tracking-tight leading-tight">
              Get in <span className="text-[#007BFF]">Touch</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">
              Connect with our senior admission strategists.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-[#007BFF] hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-7 lg:pb-8 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            
            {/* Input Wrapper Component Style */}
            {[
              { id: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'Enter your name' },
              { id: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'email@example.com' },
              { id: 'number', label: 'Contact Number', type: 'tel', icon: Phone, placeholder: '+91 XXXXX XXXXX' },
              { id: 'city', label: 'Current City', type: 'text', icon: MapPin, placeholder: 'e.g. Mumbai' }
            ].map((field) => (
              <div key={field.id} className="group">
                <label className="text-[10px] sm:text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5 block">
                  {field.label}
                </label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors">
                    <field.icon size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <input
                    type={field.type}
                    required
                    value={(formData as any)[field.id]}
                    onChange={(e) => updateFormData({ [field.id]: e.target.value })}
                    className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl text-[#1E293B] placeholder:text-slate-400 focus:bg-white focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/5 outline-none transition-all font-semibold text-sm"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Status Feedback */}
          {submitStatus === 'success' && (
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-emerald-50 text-emerald-700 rounded-xl sm:rounded-2xl border border-emerald-100 animate-in fade-in zoom-in">
              <CheckCircle2 size={16} className="sm:w-5 sm:h-5" />
              <p className="text-xs sm:text-sm font-bold">Request received! Our experts will contact you soon.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-[#64748B] bg-slate-100 hover:bg-slate-200 rounded-xl sm:rounded-2xl transition-all active:scale-95"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] px-4 sm:px-6 py-3 sm:py-4 bg-[#007BFF] hover:bg-[#0056CC] text-white rounded-xl sm:rounded-2xl font-bold text-sm shadow-[0_10px_25px_-5px_rgba(74,144,226,0.4)] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} className="sm:w-4 sm:h-4" />
                  Submit Inquiry
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Accent */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
          <p className="text-[9px] sm:text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">
            Privacy Protected • Secure Submission
          </p>
        </div>
      </div>
    </div>
  )
}