"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight, AlertCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
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
  const { colleges, exams, countries, loading, error } = useDropdownData();
  
  const { data: countryColleges = [], isLoading: loadingColleges } = useCountryColleges(hoveredCountry);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Blog", href: "/blogs" },
    { name: "Services", href: "/service" },
    { name: "About", href: "/about" },
    { name: "Contact us", href: "/contact" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-white"
    }`}>
      
      {/* TOP CONTACT BAR */}
      <div className={`hidden lg:block transition-all duration-500 overflow-hidden ${isScrolled ? "max-h-0" : "max-h-12 bg-blue-600"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-[13px] text-white/90">
          <div className="flex items-center gap-6">
            <a href={`tel:${phones.primaryRaw}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} className="text-blue-200" /> {phones.primary}
            </a>
            <a href={`mailto:${emails.info}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-blue-200" /> {emails.info}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-blue-200" /> {address.office}
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="border-b border-blue-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="relative z-10 transition-transform hover:scale-105">
              <img src={SITE_IDENTITY.assets.logo.main} alt="Logo" className="h-12 lg:h-14 w-auto object-contain" />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group py-2"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => { setHoveredItem(null); setHoveredCountry(null); }}
                >
                  <Link 
                    href={item.href} 
                    className={`relative px-4 py-2 text-[15px] font-bold transition-all duration-300 flex items-center gap-1.5 rounded-lg
                      ${isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"}
                    `}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredItem === item.name ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* DESKTOP DROPDOWN */}
                  <AnimatePresence>
                    {item.hasDropdown && hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-blue-50 overflow-hidden z-[60] 
                          ${item.name === 'Countries' ? 'w-[750px]' : 'w-64'}`}
                      >
                        <div className="flex max-h-[500px]">
                          {/* Countries Column */}
                          <div className={`${item.name === 'Countries' ? 'w-1/2 border-r border-blue-50' : 'w-full'} overflow-y-auto p-2 custom-scrollbar`}>
                            {dropdownContent[item.name as keyof typeof dropdownContent]?.map((subItem: any) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                onMouseEnter={() => item.name === 'Countries' && setHoveredCountry(subItem.slug)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all group/item"
                              >
                                <span className="flex items-center gap-3 font-semibold text-sm">
                                  {subItem.flag && <span>{subItem.flag}</span>}
                                  {subItem.title}
                                </span>
                                {item.name === 'Countries' && <ChevronRight size={14} className="opacity-50 group-hover/item:opacity-100" />}
                              </Link>
                            ))}
                          </div>

                          {/* Dynamic University Preview for Countries */}
                          {item.name === 'Countries' && (
                            <div className="w-1/2 bg-slate-50/50 p-4 overflow-y-auto custom-scrollbar">
                              <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">Top Universities</h4>
                              {loadingColleges ? (
                                <div className="space-y-3">
                                  {[1,2,3].map(i => <div key={i} className="h-8 bg-blue-100/50 animate-pulse rounded-lg" />)}
                                </div>
                              ) : countryColleges.length > 0 ? (
                                <div className="space-y-1">
                                  {countryColleges.slice(0, 6).map((college: any) => (
                                    <Link key={college._id} href={`/colleges/${college.slug}`} className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-blue-100">
                                      {college.name}
                                    </Link>
                                  ))}
                                  <Link href={`/colleges?country=${hoveredCountry}`} className="block mt-4 text-center py-2.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-transform hover:scale-[1.02]">
                                    View All Universities
                                  </Link>
                                </div>
                              ) : (
                                <div className="text-center py-10 text-slate-400 text-sm">Select a country to view colleges</div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={openModal} className="hidden lg:flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-bold rounded-full transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-blue-300 items-center gap-2 group">
                Apply Now
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="lg:hidden p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-b border-blue-50 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-slate-50 last:border-0">
                  <div 
                    className="flex items-center justify-between py-4"
                    onClick={() => item.hasDropdown && setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name)}
                  >
                    <Link 
                      href={item.href} 
                      className={`text-lg font-bold ${isActive(item.href) ? "text-blue-600" : "text-slate-800"}`}
                      onClick={(e) => item.hasDropdown && e.preventDefault()}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMobileItem === item.name ? "rotate-180" : ""}`} />
                    )}
                  </div>
                  
                  {item.hasDropdown && expandedMobileItem === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="pb-4 pl-4 grid grid-cols-1 gap-2"
                    >
                      {dropdownContent[item.name as keyof typeof dropdownContent]?.slice(0, 8).map((sub: any) => (
                        <Link 
                          key={sub.title} 
                          href={sub.href} 
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-semibold text-slate-500 hover:text-blue-600 py-2 flex items-center gap-2"
                        >
                          {sub.flag} {sub.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <button onClick={() => { openModal(); setIsOpen(false); }} className="w-full mt-6 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-all">
                Get Admission Help
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}