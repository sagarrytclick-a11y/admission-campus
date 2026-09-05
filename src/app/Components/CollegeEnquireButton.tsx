"use client";

import { useFormModal } from "@/context/FormModalContext";

type Props = {
  collegeName: string;
  variant?: "primary" | "light";
};

export default function CollegeEnquireButton({
  collegeName,
  variant = "primary",
}: Props) {
  const { openModal } = useFormModal();

  const className =
    variant === "light"
      ? "w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-white text-[#0066F5] text-sm font-bold hover:bg-[#E8F1FF] hover:text-slate-900 transition-colors"
      : "w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#0066F5] text-white text-sm font-bold hover:bg-[#0047B3] transition-colors";

  return (
    <button
      type="button"
      onClick={() => openModal()}
      className={className}
      aria-label={`Enquire about ${collegeName}`}
    >
      Get Free Counselling
    </button>
  );
}
