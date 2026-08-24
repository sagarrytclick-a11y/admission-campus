"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  useContactInfo,
  createMailtoLink,
  createTelLink,
  createWhatsAppLink,
} from "@/hooks/useContactInfo";

interface ContactInfoProps {
  variant?: "full" | "compact" | "minimal";
  showLabels?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

function ContactItem({
  icon,
  href,
  children,
  label,
  showLabels,
  textClasses,
}: {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
  label?: string;
  showLabels: boolean;
  textClasses: string;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 transition-all duration-300 ${textClasses} text-[#94A3B8] hover:text-[#0066F5]`}
    >
      {icon}
      <div>
        {showLabels && label && (
          <span className="block text-xs text-[#94A3B8]/70">{label}</span>
        )}
        <span className="font-medium text-[#F8FAFC]">{children}</span>
      </div>
    </a>
  );
}

export default function ContactInfo({
  variant = "full",
  showLabels = true,
  className = "",
  orientation = "horizontal",
}: ContactInfoProps) {
  const { emails, phones, address } = useContactInfo();

  const textClasses = variant === "minimal" ? "text-sm" : "text-base";
  const containerClasses =
    orientation === "horizontal"
      ? `flex items-center gap-4 ${className}`
      : `flex flex-col gap-3 ${className}`;

  const itemProps = { showLabels, textClasses };

  if (variant === "minimal") {
    return (
      <div className={containerClasses}>
        <ContactItem
          {...itemProps}
          icon={<Phone size={16} />}
          href={createTelLink(phones.primary)}
        >
          {phones.primary}
        </ContactItem>
        <ContactItem
          {...itemProps}
          icon={<Mail size={16} />}
          href={createMailtoLink(emails.info)}
        >
          {emails.info}
        </ContactItem>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={containerClasses}>
        <ContactItem
          {...itemProps}
          icon={<Phone size={16} />}
          href={createTelLink(phones.primary)}
          label="Call Us"
        >
          {phones.primary}
        </ContactItem>
        <ContactItem
          {...itemProps}
          icon={<Mail size={16} />}
          href={createMailtoLink(emails.info)}
          label="Email Us"
        >
          {emails.info}
        </ContactItem>
        <ContactItem
          {...itemProps}
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
        {...itemProps}
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
              key={phone}
              {...itemProps}
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
        {...itemProps}
        icon={<Mail size={18} />}
        href={createMailtoLink(emails.info)}
        label="General Email"
      >
        {emails.info}
      </ContactItem>

      <ContactItem
        {...itemProps}
        icon={<Mail size={18} />}
        href={createMailtoLink(emails.contact)}
        label="Admissions Email"
      >
        {emails.contact}
      </ContactItem>

      <ContactItem
        {...itemProps}
        icon={<MessageCircle size={18} />}
        href={createWhatsAppLink(phones.primaryRaw)}
        label="WhatsApp"
      >
        Chat on WhatsApp
      </ContactItem>

      <ContactItem
        {...itemProps}
        icon={<MapPin size={18} />}
        href="#"
        label="Office Address"
      >
        {address.full}
      </ContactItem>
    </div>
  );
}

export const PhoneContact = ({ className = "" }: { className?: string }) => {
  const { phones } = useContactInfo();
  return (
    <a
      href={createTelLink(phones.primary)}
      className={`flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#0066F5] ${className}`}
    >
      <Phone size={16} />
      <span>{phones.primary}</span>
    </a>
  );
};

export const EmailContact = ({ className = "" }: { className?: string }) => {
  const { emails } = useContactInfo();
  return (
    <a
      href={createMailtoLink(emails.info)}
      className={`flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#0066F5] ${className}`}
    >
      <Mail size={16} />
      <span>{emails.info}</span>
    </a>
  );
};

export const WhatsAppContact = ({ className = "" }: { className?: string }) => {
  const { phones } = useContactInfo();
  return (
    <a
      href={createWhatsAppLink(phones.primaryRaw)}
      className={`flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#0066F5] ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={16} />
      <span>WhatsApp</span>
    </a>
  );
};

export const AddressContact = ({ className = "" }: { className?: string }) => {
  const { address } = useContactInfo();
  return (
    <div
      className={`flex items-center gap-2 text-[#94A3B8] ${className}`}
    >
      <MapPin size={16} />
      <span>{address.full}</span>
    </div>
  );
};
