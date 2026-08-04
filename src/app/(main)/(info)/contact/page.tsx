"use client"
import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin } from "lucide-react";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";

export default function ContactPage() {

  const { emails, phones, address, socials } = useContactInfo();

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      value: phones.primary,
      link: createTelLink(phones.primary),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with us",
      link: createWhatsAppLink(phones.primaryRaw),
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      value: emails.info,
      link: createMailtoLink(emails.info),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Office",
      value: `${address.office}, ${address.city}`,
      link: "#",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center">

      <div className="max-w-7xl mx-auto mt-24 px-6 lg:px-20 w-full">

        {/* Title */}

        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">
          Contact Us
        </h1>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {contactCards.map((card, i) => (

            <a
              key={i}
              href={card.link}
              className="group relative backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex flex-col items-center text-center">

                <div className={`bg-gradient-to-r ${card.color} w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition`}>
                  <card.icon className="text-white" size={28} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">
                  {card.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {card.value}
                </p>

              </div>

            </a>

          ))}

        </div>

        {/* Social */}

        <div className="flex justify-center gap-6 mt-20">

          <a
            href={socials?.instagram}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-pink-500 hover:bg-white/20 transition"
          >
            <Instagram size={20} />
          </a>

          <a
            href={socials?.linkedin}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-white/20 transition"
          >
            <Linkedin size={20} />
          </a>

          <a
            href={createWhatsAppLink(phones.primaryRaw)}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-green-500 hover:bg-white/20 transition"
          >
            <MessageCircle size={20} />
          </a>

        </div>

      </div>

    </div>
  );
}