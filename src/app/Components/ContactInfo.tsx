"use client";

import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";

interface ContactInfoProps {
  variant?: 'full' | 'compact' | 'minimal';
  showLabels?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export default function ContactInfo({ 
  variant = 'full', 
  showLabels = true, 
  className = '',
  orientation = 'horizontal'
}: ContactInfoProps) {
  const { emails, phones, socials, address } = useContactInfo();

  const baseClasses = "flex items-center gap-2 transition-all duration-300";
  const textClasses = variant === 'minimal' ? 'text-sm' : 'text-base';
  const containerClasses = orientation === 'horizontal' 
    ? `flex items-center gap-4 ${className}`
    : `flex flex-col gap-3 ${className}`;

  const ContactItem = ({ 
    icon, 
    href, 
    children, 
    label 
  }: { 
    icon: React.ReactNode; 
    href: string; 
    children: React.ReactNode; 
    label?: string;
  }) => (
    <a 
      href={href}
      className={`${baseClasses} ${textClasses} text-[#94A3B8] hover:text-[#0066F5]`}
    >
      {icon}
      <div>
        {showLabels && label && (
          <span className="text-xs text-[#94A3B8]/70 block">{label}</span>
        )}
        <span className="font-medium text-[#F8FAFC]">{children}</span>
      </div>
    </a>
  );

  if (variant === 'minimal') {
    return (
      <div className={containerClasses}>
        <ContactItem 
          icon={<Phone size={16} />}
          href={createTelLink(phones.primary)}
        >
          {phones.primary}
        </ContactItem>
        <ContactItem 
          icon={<Mail size={16} />}
          href={createMailtoLink(emails.info)}
        >
          {emails.info}
        </ContactItem>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={containerClasses}>
        <ContactItem 
          icon={<Phone size={16} />}
          href={createTelLink(phones.primary)}
          label="Call Us"
        >
          {phones.primary}
        </ContactItem>
        <ContactItem 
          icon={<Mail size={16} />}
          href={createMailtoLink(emails.info)}
          label="Email Us"
        >
          {emails.info}
        </ContactItem>
        <ContactItem 
          icon={<MessageCircle size={16} />}
          href={createWhatsAppLink(phones.primaryRaw)}
          label="WhatsApp"
        >
          WhatsApp
        </ContactItem>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <ContactItem 
        icon={<Phone size={18} />}
        href={createTelLink(phones.primary)}
        label="Primary Phone"
      >
        {phones.primary}
      </ContactItem>
      
      {phones.additional.length > 0 && (
        <div className="flex flex-col gap-1">
          {phones.additional.map((phone, index) => (
            <ContactItem 
              key={index}
              icon={<Phone size={16} />}
              href={createTelLink(phone)}
              label={`Phone ${index + 2}`}
            >
              {phone}
            </ContactItem>
          ))}
        </div>
      )}
      
      <ContactItem 
        icon={<Mail size={18} />}
        href={createMailtoLink(emails.info)}
        label="General Email"
      >
        {emails.info}
      </ContactItem>
      
      <ContactItem 
        icon={<Mail size={18} />}
        href={createMailtoLink(emails.contact)}
        label="Admissions Email"
      >
        {emails.contact}
      </ContactItem>
      
      <ContactItem 
        icon={<MessageCircle size={18} />}
        href={createWhatsAppLink(phones.primaryRaw)}
        label="WhatsApp"
      >
        Chat on WhatsApp
      </ContactItem>
      
      <ContactItem 
        icon={<MapPin size={18} />}
        href="#"
        label="Office Address"
      >
        {address.full}
      </ContactItem>
    </div>
  );
}

export const PhoneContact = ({ className = '' }: { className?: string }) => {
  const { phones } = useContactInfo();
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {phones.all.map((phone, index) => (
        <a
          key={index}
          href={createTelLink(phone)}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#0066F5] transition-all duration-300"
        >
          <Phone size={16} />
          <span className="font-medium text-[#F8FAFC]">{phone}</span>
        </a>
      ))}
    </div>
  );
};

export const EmailContact = ({ className = '' }: { className?: string }) => {
  const { emails } = useContactInfo();
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <a
        href={createMailtoLink(emails.info)}
        className="flex items-center gap-2 text-[#94A3B8] hover:text-[#0066F5] transition-all duration-300"
      >
        <Mail size={16} />
        <span className="font-medium text-[#F8FAFC]">{emails.info}</span>
      </a>
      <a
        href={createMailtoLink(emails.contact)}
        className="flex items-center gap-2 text-[#94A3B8] hover:text-[#0066F5] transition-all duration-300"
      >
        <Mail size={16} />
        <span className="font-medium text-[#F8FAFC]">{emails.contact}</span>
      </a>
    </div>
  );
};

export const SocialContact = ({ className = '' }: { className?: string }) => {
  const { socials } = useContactInfo();
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <a
        href={socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#94A3B8] hover:text-[#0066F5] transition-all duration-300"
      >
        <MessageCircle size={16} />
        <span className="font-medium text-[#F8FAFC]">WhatsApp</span>
      </a>
      <a
        href={socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#94A3B8] hover:text-[#0066F5] transition-all duration-300"
      >
        <span className="font-medium text-[#F8FAFC]">Instagram</span>
      </a>
      <a
        href={socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#94A3B8] hover:text-[#0066F5] transition-all duration-300"
      >
        <span className="font-medium text-[#F8FAFC]">LinkedIn</span>
      </a>
    </div>
  );
};
