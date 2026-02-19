"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";
import { useDropdownData } from "@/hooks/useDropdownData";
import { useCountryColleges } from "@/hooks/useCountryColleges";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  
  const { emails, phones, address } = useContactInfo();
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { colleges, exams, countries } = useDropdownData();
  const { data: countryColleges = [], isLoading: loadingColleges } = useCountryColleges(hoveredCountry);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Blog", href: "/blogs" },
    { name: "Services", href: "/service" },

  ];

  const dropdownContent = {
    Colleges: colleges.map(c => ({ title: c.name, href: `/colleges/${c.slug}` })),
    Exams: exams.map(e => ({ title: e.short_name, href: `/exams/${e.slug}` })),
    Countries: countries.map(c => ({
      title: `Study in ${c.name}`,
      href: `/countries/${c.slug}`,
      flag: c.flag,
      slug: c.slug
    })),
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg" : "bg-white"
    }`}>
      
      {/* TOP BAR - Hidden on mobile */}
      <div className={`hidden lg:block bg-slate-900 overflow-hidden transition-all duration-300 ${isScrolled ? "h-0" : "h-10"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 h-full text-[11px] font-bold text-white/90 uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <a href={`tel:${phones.primaryRaw}`} className="flex items-center gap-2 hover:text-[#FACC15]">
              <Phone size={12} className="text-[#FACC15]" /> +91-930477744
            </a>
            <a href={`mailto:${emails.info}`} className="flex items-center gap-2 hover:text-[#FACC15]">
              <Mail size={12} className="text-[#FACC15]" /> {emails.info}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-[#FACC15]" /> {address.office}
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative z-[50] flex-shrink-0">
            <img 
              src={SITE_IDENTITY.assets.logo.main} 
              alt="Logo" 
              className="h-12 sm:h-16 lg:h-20 w-auto transition-all"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group py-6"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => { setHoveredItem(null); setHoveredCountry(null); }}
              >
                <Link 
                  href={item.href} 
                  className={`px-2 sm:px-4 py-2 text-[11px] sm:text-[12px] font-black uppercase tracking-tight transition-all flex items-center gap-1.5 rounded-full
                    ${isActive(item.href) ? "text-[#1A4AB2] bg-blue-50" : "text-slate-700 hover:text-[#1A4AB2]"}
                  `}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className="opacity-50" />}
                </Link>

                {/* MEGA DROPDOWN (Desktop) */}
                <AnimatePresence>
                  {item.hasDropdown && hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-[90%] left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[50] ${item.name === 'Countries' ? 'w-[600px] sm:w-[700px]' : 'w-48 sm:w-64'}`}
                    >
                      <div className="flex max-h-[450px]">
                        <div className="flex-1 overflow-y-auto p-3">
                          {dropdownContent[item.name as keyof typeof dropdownContent]?.map((sub: any) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onMouseEnter={() => item.name === 'Countries' && setHoveredCountry(sub.slug)}
                              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#1A4AB2] hover:text-white transition-all group"
                            >
                              <span className="text-[12px] font-bold uppercase tracking-wide">
                                {sub.flag} {sub.title}
                              </span>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                        {item.name === 'Countries' && (
                          <div className="w-1/2 bg-slate-50 p-6 border-l">
                            <h4 className="text-[10px] font-black text-[#1A4AB2] uppercase tracking-widest mb-4">Top Colleges</h4>
                            <div className="space-y-2">
                              {countryColleges.slice(0, 5).map((col: any) => (
                                <Link key={col._id} href={`/colleges/${col.slug}`} className="block p-3 bg-white rounded-xl text-[11px] font-bold hover:border-[#1A4AB2] border border-transparent transition-all shadow-sm">
                                  {col.name}
                                </Link>
                              ))}
                              <Link href="/colleges" className="flex items-center justify-center gap-2 p-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest mt-4">
                                View All <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4 relative z-[50]">
            <button 
              onClick={openModal} 
              className="hidden sm:flex px-6 py-3 bg-[#1A4AB2] text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-slate-900 transition-all shadow-lg shadow-blue-100"
            >
              Apply Now
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors lg:hidden"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm lg:hidden z-[45]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[50] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <span className="text-xs font-black uppercase tracking-widest text-[#1A4AB2]">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-xl"><X size={20} /></button>
              </div>

              <div className="flex-grow overflow-y-auto px-6 py-4">
                {navItems.map((item) => (
                  <div key={item.name} className="mb-2">
                    <div className="flex items-center justify-between py-4">
                      <Link 
                        href={item.href} 
                        className={`text-base font-black uppercase tracking-tight ${isActive(item.href) ? 'text-[#1A4AB2]' : 'text-slate-800'}`}
                        onClick={() => !item.hasDropdown && setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <button 
                          onClick={() => setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name)}
                          className="p-2 bg-slate-50 rounded-lg"
                        >
                          <ChevronDown size={18} className={`transition-transform ${expandedMobileItem === item.name ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Dropdown Items */}
                    <AnimatePresence>
                      {item.hasDropdown && expandedMobileItem === item.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50 rounded-2xl px-4"
                        >
                          <div className="py-4 space-y-4">
                            {dropdownContent[item.name as keyof typeof dropdownContent]?.slice(0, 10).map((sub: any) => (
                              <Link 
                                key={sub.title} 
                                href={sub.href} 
                                onClick={() => setIsOpen(false)}
                                className="block text-[12px] font-bold text-slate-600 uppercase tracking-wide hover:text-[#1A4AB2]"
                              >
                                {sub.flag} {sub.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t bg-slate-50">
                <button 
                  onClick={() => { openModal(); setIsOpen(false); }}
                  className="w-full py-4 bg-[#1A4AB2] text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-200"
                >
                  Quick Apply Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
