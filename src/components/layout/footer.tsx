"use client";

import { LocalizedLink } from "@/components/localized-link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  Cookie
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { infoEmail } from "@/lib/app-config";

export function Footer() {
  const { t } = useLanguage();
  
  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCookieSettings"));
    }
  };

  return (
    <footer className="bg-earth-deep text-white/90">
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Company Info */}
          <div className="space-y-6">
            <LocalizedLink href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/brand/limon.png"
                alt="Eco Area Limonar"
                width={56}
                height={56}
                className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-sm"
              />
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                Eco Area Limonar
              </span>
            </LocalizedLink>
            <p className="text-white/60 leading-relaxed text-base">
              {t("Área de autocaravanas en Los Nietos, Mar Menor. Parcelas equipadas para tu estancia.")}
            </p>
            <div className="flex gap-3.5">
              <a 
                href="https://facebook.com/ecoarealimonar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-clay transition-all duration-200 hover:scale-110"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://instagram.com/ecoarealimonar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-clay transition-all duration-200 hover:scale-110"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://youtube.com/ecoarealimonar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-clay transition-all duration-200 hover:scale-110"
                aria-label="Suscríbete a nuestro canal de YouTube"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-white">{t("Enlaces rápidos")}</h3>
            <ul className="space-y-3.5">
              {[
                { name: t("Parcelas"), href: "/parcelas" },
                { name: t("Ofertas"), href: "/ofertas" },
                { name: t("Tarifas"), href: "/tarifas" },
                { name: t("Blog"), href: "/blog" },
                { name: t("Preguntas Frecuentes"), href: "/faqs" },
                { name: t("Contacto"), href: "/contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <LocalizedLink 
                    href={link.href}
                    className="text-white/60 hover:text-clay-lt transition-colors duration-200 text-base"
                  >
                    {link.name}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-white">{t("Legal")}</h3>
            <ul className="space-y-3.5">
              {[
                { name: t("Aviso legal"), href: "/aviso-legal" },
                { name: t("Política de privacidad"), href: "/privacidad" },
                { name: t("Política de cookies"), href: "/cookies" },
                { name: t("Tarifas y condiciones"), href: "/tarifas" },
              ].map((link) => (
                <li key={link.href}>
                  <LocalizedLink 
                    href={link.href}
                    className="text-white/60 hover:text-clay-lt transition-colors duration-200 text-base"
                  >
                    {link.name}
                  </LocalizedLink>
                </li>
              ))}
              <li>
                <button 
                  onClick={openCookieSettings}
                  className="text-white/60 hover:text-clay-lt transition-colors duration-200 text-base flex items-center gap-2.5"
                  aria-label={t("Abrir configuración de cookies")}
                >
                  <Cookie className="h-4.5 w-4.5" aria-hidden="true" />
                  {t("Configurar cookies")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-white">{t("Contacto")}</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5 group">
                <MapPin className="h-5 w-5 text-clay flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                <span className="text-white/60 text-base leading-relaxed">
                  Paraje El Limonar, s/n<br />
                  30710 Los Nietos, Cartagena - Murcia
                </span>
              </li>
              <li>
                <a 
                  href="tel:+34868364161" 
                  className="flex items-center gap-3.5 text-white/60 hover:text-clay-lt transition-colors duration-200 group"
                  aria-label="Llamar al 868 36 41 61"
                >
                  <Phone className="h-5 w-5 text-clay group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  <span className="text-base">868 36 41 61</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${infoEmail}`} 
                  className="flex items-center gap-3.5 text-white/60 hover:text-clay-lt transition-colors duration-200 group"
                  aria-label={`Enviar email a ${infoEmail}`}
                >
                  <Mail className="h-5 w-5 text-clay group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  <span className="text-base">{infoEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-base">
          <p className="font-medium text-white/60">
            © {new Date().getFullYear()} Eco Area Limonar. {t("Todos los derechos reservados.")}
          </p>
          <div className="flex items-center gap-8">
            <LocalizedLink href="/aviso-legal" className="hover:text-white transition-colors duration-200">{t("Aviso legal")}</LocalizedLink>
            <LocalizedLink href="/privacidad" className="hover:text-white transition-colors duration-200">{t("Privacidad")}</LocalizedLink>
            <LocalizedLink href="/cookies" className="hover:text-white transition-colors duration-200">{t("Cookies")}</LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
