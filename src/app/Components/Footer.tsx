"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Instagram, Linkedin, Twitter, ChevronUp } from 'lucide-react';
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from '@/context/FormModalContext';

const Footer = () => {
  const { emails, phones, address } = useContactInfo();
  const { openModal } = useFormModal();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Colleges", href: "/colleges" },
    { name: "Exams Guide", href: "/exams" },
    { name: "Latest Blogs", href: "/blogs" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-[#020617] text-slate-400 pt-20 pb-10 px-6 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand Info (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              {/* <Image 
                src={`/logo.jpg`} 
                alt="Logo" width={45} height={45} 
                className="rounded-xl brightness-110"
              /> */}
              <span className="text-xl font-black text-white uppercase tracking-tighter">
                {SITE_IDENTITY.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              {SITE_IDENTITY.description}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: MessageCircle, href: createWhatsAppLink(phones.primary) }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#1A4AB2] hover:text-white transition-all">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#1A4AB2]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Contact</h4>
            <div className="space-y-5 text-sm">
              <a href={createTelLink(phones.primary)} className="flex items-center gap-4 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[#1A4AB2]"><Phone size={14}/></div>
                {phones.primary}
              </a>
              <a href={createMailtoLink(emails.info)} className="flex items-center gap-4 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[#1A4AB2]"><Mail size={14}/></div>
                <span className="lowercase">{emails.info}</span>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[#1A4AB2] shrink-0"><MapPin size={14}/></div>
                <span className="leading-relaxed">{address.full}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter/CTA (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-[32px] bg-white/[0.03] border border-white/5">
              <h4 className="text-white font-bold text-sm mb-2">Ready to Start?</h4>
              <p className="text-xs text-slate-500 mb-6">Get a personalized counseling session for free.</p>
              <button 
                onClick={openModal}
                className="w-full bg-[#1A4AB2] text-white py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-2 group"
              >
                Book Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Compliance & Credits */}
        <div className="pt-8 border-t border-slate-900 flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
              © {new Date().getFullYear()} {SITE_IDENTITY.name} • All Rights Reserved
            </p>
            <p className="text-[9px] text-slate-600 leading-relaxed max-w-2xl">
              Disclaimer: Counseling services are provided based on industry availability. Final admission decisions are made by respective educational institutions.
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/term" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#1A4AB2] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 group"
        >
          <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
