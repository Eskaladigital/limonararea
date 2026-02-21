"use client";

import { LocalizedLink } from "@/components/localized-link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { infoEmail } from "@/lib/app-config";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);
  const [infoMobileOpen, setInfoMobileOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const isHomePage = pathname === "/" || /^\/(es|en|fr|de)\/?$/.test(pathname || "");
  const showTransparent = isHomePage && !scrolled;
  
  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  const handleLanguageChange = (lang: 'es' | 'en' | 'fr' | 'de') => {
    // setLanguage maneja toda la lógica de navegación incluyendo slugs traducidos del blog
    setLanguage(lang);
    setLanguageDropdownOpen(false);
  };

  const languages = {
    es: { name: 'Español', flag: '🇪🇸' },
    en: { name: 'English', flag: '🇬🇧' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' }
  };

  // Solo enlaces a páginas que existen
  const infoDropdown = [
    { name: t("¿Quiénes somos?"), href: "/quienes-somos" },
    { name: t("Normas de conducta"), href: "/normas-conducta" },
    { name: t("Preguntas Frecuentes"), href: "/faqs" },
    { name: t("Galería"), href: "/galeria" },
  ];

  const navigation = [
    { name: t("Ofertas"), href: "/ofertas" },
    { name: t("Parcelas"), href: "/parcelas" },
    { name: t("Tarifas"), href: "/tarifas" },
    { name: t("Blog"), href: "/blog" },
    { name: t("Contacto"), href: "/contacto" },
  ];

  // Función para verificar si una ruta está activa (pathname incluye prefijo de idioma: /es/parcelas)
  const isActiveRoute = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(es|en|fr|de)/, "") || "/";
    if (href === "/") return pathWithoutLocale === "/" || pathWithoutLocale === "";
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(href + "/");
  };

  // Detectar si estamos en una página transaccional donde NO se debe cambiar de idioma
  // (para evitar perder búsquedas, reservas en progreso, etc.)
  const isTransactionalPage = () => {
    const transactionalPaths = [
      // Búsqueda
      '/buscar', '/search', '/suche', '/recherche',
      // Reservar (cualquier subruta)
      '/reservar', '/book', '/buchen', '/reserver',
      // Pago
      '/pago', '/payment', '/paiement', '/zahlung',
    ];
    return transactionalPaths.some(p => pathname.includes(p));
  };

  // Mostrar selector de idiomas solo en páginas no transaccionales
  const showLanguageSelector = !isTransactionalPage();

  return (
    <header className="sticky top-0 z-[1000] w-full">
      {/* Top bar - Estilo V1 earth-deep */}
      <div className="bg-earth-deep text-white/80 py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 lg:gap-6">
            <a 
              href="tel:+34868364161" 
              className="flex items-center gap-2 hover:text-clay-lt transition-colors duration-200 font-medium"
              aria-label="Llamar al 868 36 41 61"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">868 36 41 61</span>
              <span className="lg:hidden sr-only">868 36 41 61</span>
            </a>
            <a 
              href={`mailto:${infoEmail}`}
              className="hidden lg:flex items-center gap-2 hover:text-clay-lt transition-colors duration-200 font-medium"
              aria-label={`Enviar email a ${infoEmail}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {infoEmail}
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector - Solo visible en páginas no transaccionales */}
            {showLanguageSelector ? (
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 hover:text-clay-lt transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10 touch-target"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden lg:inline font-medium">{languages[currentLanguage].name}</span>
                <span className="lg:hidden">{languages[currentLanguage].flag}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {languageDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[1100]"
                    onClick={() => setLanguageDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-[1200] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[160px]">
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 touch-target ${
                        currentLanguage === 'es' 
                          ? 'bg-earth text-white' 
                          : 'text-gray-700 hover:bg-earth/10'
                      }`}
                    >
                      <span className="text-xl">{languages.es.flag}</span>
                      <span className="font-medium">{languages.es.name}</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 touch-target ${
                        currentLanguage === 'en' 
                          ? 'bg-earth text-white' 
                          : 'text-gray-700 hover:bg-earth/10'
                      }`}
                    >
                      <span className="text-xl">{languages.en.flag}</span>
                      <span className="font-medium">{languages.en.name}</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('fr')}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 touch-target ${
                        currentLanguage === 'fr' 
                          ? 'bg-earth text-white' 
                          : 'text-gray-700 hover:bg-earth/10'
                      }`}
                    >
                      <span className="text-xl">{languages.fr.flag}</span>
                      <span className="font-medium">{languages.fr.name}</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('de')}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 touch-target ${
                        currentLanguage === 'de' 
                          ? 'bg-earth text-white' 
                          : 'text-gray-700 hover:bg-earth/10'
                      }`}
                    >
                      <span className="text-xl">{languages.de.flag}</span>
                      <span className="font-medium">{languages.de.name}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            ) : (
              // En páginas transaccionales, solo mostrar el idioma actual sin opción de cambiar
              <div className="flex items-center gap-2 py-1 px-2 opacity-60 cursor-not-allowed" title="Cambio de idioma no disponible durante el proceso de reserva">
                <Globe className="h-4 w-4" />
                <span className="hidden lg:inline font-medium">{languages[currentLanguage].name}</span>
                <span className="lg:hidden">{languages[currentLanguage].flag}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header - Semi-transparent sobre hero (texto visible), sólido al scroll (V5) */}
      <div className={`w-full transition-all duration-400 ${
        showTransparent ? "bg-earth-deep/40 backdrop-blur-sm" : "bg-cream/95 backdrop-blur-xl shadow-[0_1px_10px_rgba(0,0,0,0.04)]"
      }`}>
        <div className={`container mx-auto px-4 ${showTransparent ? "py-4" : "py-2"}`}>
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo - Limón + nombre */}
          <LocalizedLink href="/" className="flex items-center gap-2 group">
            {/* img nativo para evitar hydration mismatch con Next/Image en header */}
            <img
              src="/images/brand/limon.png"
              alt="Eco Area Limonar"
              width={40}
              height={40}
              className="h-8 w-8 lg:h-10 lg:w-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-sm"
              fetchPriority="high"
            />
            <span className={`font-heading font-bold text-base lg:text-lg tracking-tight transition-colors duration-200 ${
              showTransparent ? "text-white" : "text-gray-900"
            }`}>
              Eco Area Limonar
            </span>
          </LocalizedLink>

          {/* Desktop Navigation - Mejorado */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Eco Area Limonar - Menú información */}
            <div 
              className="relative"
              onMouseEnter={() => setInfoDropdownOpen(true)}
              onMouseLeave={() => setInfoDropdownOpen(false)}
            >
              <div className={`flex items-center gap-1 py-2 px-3 rounded-lg transition-colors duration-200 ${
                showTransparent ? "hover:bg-white/10" : "hover:bg-gray-50"
              }`}>
                <LocalizedLink 
                  href="/"
                  className={`font-heading font-semibold transition-colors duration-200 ${
                    showTransparent ? "text-white/90 hover:text-clay-lt" : "text-gray-800 hover:text-earth"
                  }`}
                >
                  {t("Eco Area Limonar")}
                </LocalizedLink>
                <button 
                  className={`p-1 rounded transition-colors duration-200 ${
                    showTransparent ? "hover:bg-white/10 text-white/80" : "hover:bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => setInfoDropdownOpen(!infoDropdownOpen)}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${infoDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {infoDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 z-[1200]">
                  <div className="w-56 bg-earth-deep/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 py-2 overflow-hidden">
                    {infoDropdown.map((item, index) => (
                      <LocalizedLink
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-clay-lt transition-all duration-200 border-l-4 border-transparent hover:border-clay-lt"
                      >
                        {item.name}
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <LocalizedLink
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg font-heading font-semibold text-sm transition-all duration-200 ${
                  isActiveRoute(item.href)
                    ? "text-clay hover:text-clay-dk hover:bg-clay/10" 
                    : showTransparent 
                      ? "text-white/80 hover:text-clay-lt hover:bg-white/5" 
                      : "text-gray-700 hover:text-earth hover:bg-sand/50"
                }`}
              >
                {item.name}
              </LocalizedLink>
            ))}
          </nav>

          {/* Botones CTA - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Botón Reservar */}
            <LocalizedLink
              href="/reservar"
              className="inline-flex items-center gap-2 bg-clay hover:bg-clay-dk text-white font-heading font-bold px-5 py-2 rounded-[50px] transition-all duration-300 text-sm"
            >
              {t("Reservar ahora")}
            </LocalizedLink>
          </div>

          {/* Mobile menu button - Más grande para táctil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-3 rounded-lg transition-all duration-200 touch-target ${
              showTransparent ? "text-white/90 hover:text-clay-lt hover:bg-white/10" : "text-gray-600 hover:text-earth hover:bg-sand/50"
            }`}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile/Tablet menu - Panel lateral compacto (mismo color navbar), página visible detrás */}
      {mobileMenuOpen && (
        <>
          {/* Overlay semi-transparente: se ve la página detrás, tap para cerrar */}
          <div
            className="lg:hidden fixed inset-0 z-[1100] bg-black/20 backdrop-blur-[1px] animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panel desplegable lateral - color earth-deep como navbar */}
          <div className="lg:hidden fixed top-0 right-0 z-[1200] w-[min(280px,85vw)] h-full bg-earth-deep/95 backdrop-blur-md shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full py-4 px-3 space-y-1 overflow-y-auto">
              {/* Botón cerrar */}
              <div className="flex justify-end px-2 mb-2">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors touch-target"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {/* Eco Area Limonar - Menú información */}
              <div>
                <button
                  onClick={() => setInfoMobileOpen(!infoMobileOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white/90 font-heading font-semibold hover:bg-white/10 rounded-lg transition-all duration-200 touch-target"
                >
                  <span className="text-sm">{t("Eco Area Limonar")}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${infoMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                {infoMobileOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-white/20 pl-3">
                    {infoDropdown.map((item) => (
                      <LocalizedLink
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2.5 text-sm text-white/80 hover:text-clay-lt hover:bg-white/5 rounded-lg transition-colors duration-200 touch-target"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </LocalizedLink>
                    ))}
                  </div>
                )}
              </div>

              {navigation.map((item) => (
                <LocalizedLink
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-heading font-semibold transition-all duration-200 touch-target text-sm ${
                    isActiveRoute(item.href)
                      ? "text-clay-lt bg-white/10"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </LocalizedLink>
              ))}

              {/* CTA Button */}
              <LocalizedLink
                href="/reservar"
                className="block w-full text-center bg-clay hover:bg-clay-dk text-white font-heading font-bold px-4 py-3 rounded-xl mt-4 touch-target text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Reservar ahora")}
              </LocalizedLink>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
