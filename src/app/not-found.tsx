'use client';

import Link from "next/link";
import { useEffect } from "react";
import {
  Home,
  MapPin,
  Calendar,
  Phone,
  ArrowRight,
  TreePine,
  Sun,
  Waves,
} from "lucide-react";

function AnimatedCamper() {
  return (
    <div className="relative w-72 h-44 mx-auto">
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {/* Sky gradient */}
        <defs>
          <linearGradient id="sky404" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A8AB8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="road404" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EDE4D6" />
            <stop offset="50%" stopColor="#D4C5A9" />
            <stop offset="100%" stopColor="#EDE4D6" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="280" height="140" rx="16" fill="url(#sky404)" />

        {/* Mountains */}
        <polygon points="0,100 40,55 80,100" fill="#0C6E9C" opacity="0.12" />
        <polygon points="60,100 110,40 160,100" fill="#064A6E" opacity="0.1" />
        <polygon points="140,100 200,50 260,100" fill="#0C6E9C" opacity="0.08" />

        {/* Sun */}
        <circle cx="230" cy="35" r="18" fill="#F5A623" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="230" cy="35" r="12" fill="#FFD166" opacity="0.5" />

        {/* Palm tree */}
        <rect x="55" y="68" width="4" height="32" rx="2" fill="#2D9B4E" opacity="0.5" />
        <ellipse cx="57" cy="64" rx="14" ry="8" fill="#2D9B4E" opacity="0.35" />
        <ellipse cx="50" cy="68" rx="10" ry="6" fill="#5BBF6E" opacity="0.3" />

        {/* Road */}
        <rect x="0" y="100" width="280" height="18" fill="url(#road404)" />
        <line x1="20" y1="109" x2="60" y2="109" stroke="#D4900E" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.4" />
        <line x1="80" y1="109" x2="120" y2="109" stroke="#D4900E" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.4" />
        <line x1="140" y1="109" x2="180" y2="109" stroke="#D4900E" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.4" />
        <line x1="200" y1="109" x2="240" y2="109" stroke="#D4900E" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.4" />

        {/* Campervan body */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 2,-1.5; 0,0; -1,0.5; 0,0"
            dur="3s"
            repeatCount="indefinite"
          />

          {/* Main body */}
          <rect x="110" y="68" width="80" height="32" rx="4" fill="#064A6E" />
          {/* Cabin */}
          <rect x="175" y="60" width="28" height="40" rx="4" fill="#0C6E9C" />
          {/* Roof rack */}
          <rect x="112" y="65" width="60" height="4" rx="2" fill="#064A6E" />

          {/* Windows */}
          <rect x="180" y="64" width="18" height="14" rx="3" fill="#87CEEB" opacity="0.85" />
          <rect x="116" y="74" width="16" height="12" rx="2" fill="#87CEEB" opacity="0.7" />
          <rect x="137" y="74" width="16" height="12" rx="2" fill="#87CEEB" opacity="0.7" />
          <rect x="158" y="74" width="12" height="12" rx="2" fill="#87CEEB" opacity="0.7" />

          {/* Accent stripe */}
          <rect x="112" y="90" width="68" height="3" rx="1.5" fill="#F5A623" />

          {/* Headlight */}
          <circle cx="200" cy="88" r="3" fill="#FFD166" />

          {/* Wheels */}
          <circle cx="132" cy="100" r="9" fill="#1E293B" />
          <circle cx="132" cy="100" r="4.5" fill="#475569" />
          <circle cx="190" cy="100" r="9" fill="#1E293B" />
          <circle cx="190" cy="100" r="4.5" fill="#475569" />
        </g>

        {/* Dust particles */}
        <circle cx="105" cy="98" r="2" fill="#D4C5A9" opacity="0.5">
          <animate attributeName="cx" values="105;80;60" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.2;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="102" r="1.5" fill="#D4C5A9" opacity="0.4">
          <animate attributeName="cx" values="100;70;45" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Seagulls */}
        <path d="M20,30 Q25,25 30,30" stroke="#064A6E" strokeWidth="1.2" fill="none" opacity="0.2" />
        <path d="M40,22 Q44,18 48,22" stroke="#064A6E" strokeWidth="1" fill="none" opacity="0.15" />
      </svg>
    </div>
  );
}

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const url = window.location.href;
      const path = window.location.pathname;
      const search = window.location.search;
      const referrer = document.referrer;

      (window as any).gtag('event', 'page_not_found', {
        page_location: url,
        page_path: path,
        page_search: search,
        page_referrer: referrer,
        event_category: 'Error',
        event_label: '404 - Page Not Found',
        non_interaction: false,
      });

      (window as any).gtag('event', 'exception', {
        description: `404: ${path}${search}`,
        fatal: false,
        page_location: url,
      });
    }
  }, []);

  const quickLinks = [
    { href: "/es", icon: Home, label: "Inicio" },
    { href: "/es/parcelas", icon: MapPin, label: "Parcelas" },
    { href: "/es/tarifas", icon: Calendar, label: "Tarifas" },
    { href: "/es/contacto", icon: Phone, label: "Contacto" },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          {/* 404 number + illustration */}
          <div className="relative mb-8">
            <p className="text-[9rem] md:text-[12rem] font-heading font-extrabold text-earth/[0.06] leading-none select-none pointer-events-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedCamper />
            </div>
          </div>

          {/* Message */}
          <div className="mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-earth mb-3">
              Ruta no encontrada
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
              La página que buscas no existe o ha cambiado de dirección.
              Pero tranquilo, el Mediterráneo sigue esperándote.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link
              href="/es"
              className="inline-flex items-center justify-center gap-2 bg-earth text-white font-bold px-7 py-3.5 rounded-xl hover:bg-earth-deep transition-all hover:-translate-y-0.5 shadow-lg text-sm"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </Link>
            <Link
              href="/es/reservar"
              className="inline-flex items-center justify-center gap-2 bg-clay text-white font-bold px-7 py-3.5 rounded-xl hover:bg-clay-dk transition-all hover:-translate-y-0.5 shadow-lg text-sm"
            >
              <MapPin className="w-4 h-4" />
              Reservar parcela
            </Link>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <div className="flex items-center gap-2 bg-sand-lt border border-sand rounded-full px-4 py-2">
              <Sun className="w-4 h-4 text-clay" />
              <span className="text-xs font-bold text-earth">320 días de sol</span>
            </div>
            <div className="flex items-center gap-2 bg-sand-lt border border-sand rounded-full px-4 py-2">
              <Waves className="w-4 h-4 text-earth" />
              <span className="text-xs font-bold text-earth">Mar Menor</span>
            </div>
            <div className="flex items-center gap-2 bg-sand-lt border border-sand rounded-full px-4 py-2">
              <TreePine className="w-4 h-4 text-olive" />
              <span className="text-xs font-bold text-earth">Parcelas premium</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white border-[1.5px] border-sand rounded-2xl p-6 md:p-8">
            <p className="text-xs font-extrabold text-earth uppercase tracking-[0.1em] mb-5">
              Enlaces rápidos
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-sand-lt hover:bg-earth hover:text-white transition-all duration-200"
                >
                  <link.icon className="w-5 h-5 text-earth group-hover:text-white transition-colors" />
                  <span className="text-sm font-bold text-earth group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact banner */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-earth-deep rounded-2xl p-8 md:p-10 text-center text-white">
            <Phone className="w-8 h-8 mx-auto mb-4 text-clay-lt" />
            <h2 className="text-lg md:text-xl font-heading font-bold mb-2">
              ¿Necesitas ayuda?
            </h2>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              Nuestro equipo está disponible para ayudarte a encontrar lo que necesitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/es/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-earth font-bold px-6 py-3 rounded-xl text-sm hover:bg-sand-lt transition-all"
              >
                <Phone className="w-4 h-4" />
                Contactar
              </Link>
              <a
                href="https://wa.me/34673414053"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-olive text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-olive/90 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
