'use client';

import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { usePopup } from "@/context/PopupContext";
import { PopupModal } from "@/components/PopupModal";
import { MarqueeSlider } from "@/components/MarqueeSlider";
import { FloatingIcons } from "@/components/FloatingIcons";

export default function MainShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPopupOpen, closePopup, openPopup } = usePopup();

  return (
    <>
      <Navbar />
      <div className="pb-14 sm:pb-12">{children}</div>
      <Footer />
      <PopupModal isOpen={isPopupOpen} onClose={closePopup} />
      <MarqueeSlider />
      <FloatingIcons onNotificationClick={openPopup} />
    </>
  );
}
