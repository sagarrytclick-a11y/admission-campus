"use client";

import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { usePopup } from "@/context/PopupContext";
import { PopupModal } from "@/components/PopupModal";
import { MarqueeSlider } from "@/components/MarqueeSlider";
import { FloatingIcons } from "@/components/FloatingIcons";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPopupOpen, closePopup, openPopup } = usePopup();

  return (
    <>
      <Navbar />
      <div className="">
        {children}
      </div>
      <Footer />
      <PopupModal isOpen={isPopupOpen} onClose={closePopup} />
      <MarqueeSlider />
      <FloatingIcons onNotificationClick={openPopup} />
    </>
  );
}
