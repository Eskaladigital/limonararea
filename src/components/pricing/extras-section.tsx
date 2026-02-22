"use client";

import { CheckCircle, Euro } from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";
import { useLanguage } from "@/contexts/language-context";

/**
 * 🎯 COMPONENTE: ExtrasSection
 * ============================
 * 
 * Sección visual que muestra qué incluye el precio de la parcela
 * y qué extras tienen coste adicional (según schema extras).
 * 
 * Eco Area Limonar: parcelas con electricidad, agua, wifi como extras.
 */

const includedItems = [
  "Conexión de agua en la parcela",
  "Punto de vaciado de aguas grises y negras",
  "Cancelación gratuita hasta 60 días antes",
  "Parcelas amplias con sombra y césped",
];

const optionalExtras = [
  { name: "Electricidad", price: "3,00", unit: "€", per: "día", highlight: true },
  { name: "Wifi", price: "2,00", unit: "€", per: "día" },
  { name: "Agua adicional", price: "1,50", unit: "€", per: "día" },
];

interface ExtrasSectionProps {
  /**
   * Título de la sección (opcional)
   * Por defecto: "¿Qué incluye tu alquiler?"
   */
  title?: string;
  
  /**
   * Fondo de la sección (opcional)
   * Por defecto: "bg-gray-50"
   */
  backgroundColor?: string;
  
  /**
   * Mostrar enlace a página de tarifas (opcional)
   * Por defecto: true
   */
  showMoreLink?: boolean;
}

export function ExtrasSection({ 
  title, 
  backgroundColor = "bg-gray-50",
  showMoreLink = true 
}: ExtrasSectionProps) {
  const { t } = useLanguage();
  
  const sectionTitle = title || t("¿Qué incluye tu parcela?");
  
  return (
    <section className={`py-10 lg:py-14 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-3">
            {sectionTitle}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Qué está incluido en el precio y qué tiene coste adicional")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Incluido sin coste */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 rounded-3xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
                <CheckCircle className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-green-900">
                  {t("Incluido sin coste")}
                </h3>
                <p className="text-green-700 text-sm lg:text-base font-medium">
                  {t("Todo lo necesario para disfrutar de tu estancia en el Mar Menor")}
                </p>
              </div>
            </div>
            
            <ul className="space-y-3 lg:space-y-4">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-white p-3 lg:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium text-sm lg:text-base">{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Extras opcionales */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-3xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="bg-limonar-blue p-3 rounded-2xl shadow-lg">
                <Euro className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-limonar-blue">
                  {t("Extras opcionales")}
                </h3>
                <p className="text-blue-700 text-sm lg:text-base font-medium">
                  {t("Complementos adicionales para mayor comodidad")}
                </p>
              </div>
            </div>

            <ul className="space-y-3 lg:space-y-4">
              {optionalExtras.map((item) => (
                <li 
                  key={item.name} 
                  className={`flex items-center justify-between p-3 lg:p-4 rounded-xl shadow-sm hover:shadow-md transition-all ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-orange-50 to-limonar-orange/10 border-2 border-limonar-orange/30 hover:border-limonar-orange' 
                      : 'bg-white'
                  }`}
                >
                  <span className={`font-medium text-sm lg:text-base ${
                    item.highlight ? 'text-gray-900 font-bold' : 'text-gray-800'
                  }`}>
                    {t(item.name)}
                    {item.highlight && (
                      <span className="ml-2 text-xs bg-limonar-orange text-white px-2 py-0.5 rounded-full font-bold uppercase">
                        {t("Popular")}
                      </span>
                    )}
                  </span>
                  <span className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg font-bold text-xs lg:text-sm whitespace-nowrap ${
                    item.highlight
                      ? 'bg-limonar-orange text-white shadow-md'
                      : 'bg-limonar-blue/10 text-limonar-blue'
                  }`}>
                    {item.price}{item.unit} / {t(item.per)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Información destacada */}
        <div className="mt-6 lg:mt-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-limonar-orange/10 via-yellow-50 to-limonar-orange/10 border-2 border-limonar-orange/30 rounded-2xl p-4 lg:p-6">
            <div className="flex items-start gap-3">
              <div className="bg-limonar-orange/20 p-2 rounded-xl flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-limonar-orange" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-base lg:text-lg">
                  {t("Servicios para tu estancia")}
                </h4>
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  {t("Agua y vaciado incluidos en la parcela. Añade electricidad, wifi o agua adicional según necesites durante tu estancia.")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enlace a tarifas completas */}
        {showMoreLink && (
          <div className="text-center mt-6 lg:mt-8">
            <LocalizedLink
              href="/tarifas"
              className="inline-flex items-center gap-2 text-limonar-blue font-bold uppercase tracking-wider hover:text-limonar-blue-dark transition-colors text-base lg:text-lg group"
            >
              {t("Ver información completa de tarifas y condiciones")} 
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </LocalizedLink>
          </div>
        )}
      </div>
    </section>
  );
}
