"use client";

import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import { HeroSlider } from "@/components/hero-slider";
import { 
  CheckCircle, Calendar, Euro, AlertCircle,
  Clock, CreditCard, Info
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { contactEmail } from "@/lib/app-config";
import { SeasonsCalendar } from "@/components/seasons-calendar";
import Image from "next/image";

const pricingTable = [
  { season: "Baja", color: "bg-earth", lessThanWeek: "95,00", oneWeek: "85,00", twoWeeks: "75,00", threeWeeks: "65,00" },
  { season: "Media", color: "bg-clay", lessThanWeek: "125,00", oneWeek: "115,00", twoWeeks: "105,00", threeWeeks: "95,00" },
  { season: "Alta", color: "bg-red-500", lessThanWeek: "155,00", oneWeek: "145,00", twoWeeks: "135,00", threeWeeks: "125,00" },
];

const discounts = [
  { percentage: "hasta -10%", description: "Estancias de 7 días o más (Temp. Baja)", icon: "📅" },
  { percentage: "hasta -20%", description: "Estancias de 14 días o más (Temp. Baja)", icon: "🗓️" },
  { percentage: "hasta -30%", description: "Estancias de 21 días o más (Temp. Baja)", icon: "🔥" },
];

const includedFree = [
  "Conexión de agua en la parcela",
  "Punto de vaciado de aguas grises y negras",
  "Parcelas amplias con sombra y césped",
  "Acceso a zonas comunes y duchas",
];

const extrasOptional = [
  { name: "Electricidad", price: "3,00 €", per: "día" },
  { name: "Wifi Premium", price: "2,00 €", per: "día" },
];

const cancellationPolicy = [
  { period: "Más de 30 días antes", charge: "GRATIS", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  { period: "Entre 29 y 15 días", charge: "25% del total", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  { period: "Entre 14 y 7 días", charge: "50% del total", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  { period: "Menos de 7 días", charge: "100% del total", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
];

export function TarifasClient() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Tarifas y Condiciones")}
        subtitle={t("Información clara y transparente sobre precios y condiciones")}
        tag={`💰 ${t("Eco Area Limonar")}`}
        backgroundImage="/images/slides/AdobeStock_95139332.webp"
      />

      {/* ── Tabla de Tarifas ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t("Precios por parcela")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("Tarifas orientativas por noche según temporada y duración")}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm text-orange-800">
                <strong>{t("Nota:")}</strong> {t("Estos precios son orientativos y pueden variar según la demanda. Consulta el precio exacto en nuestro buscador de disponibilidad.")}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-earth text-white">
                      <th className="py-3 md:py-6 px-2 md:px-6 text-left font-heading font-bold text-xs md:text-lg border-r border-white/20">
                        {t("Temporada")}
                      </th>
                      <th className="py-3 md:py-6 px-2 md:px-6 text-center font-heading font-bold text-xs md:text-base border-r border-white/20 bg-white/5">
                        <span className="hidden md:inline">{t("Menos de 7 noches")}</span>
                        <span className="md:hidden">&lt;7</span>
                      </th>
                      <th className="py-3 md:py-6 px-2 md:px-6 text-center font-heading font-bold text-xs md:text-base border-r border-white/20 bg-white/10">
                        <span className="hidden md:inline">{t("7 noches o más")}</span>
                        <span className="md:hidden">7+</span>
                      </th>
                      <th className="py-3 md:py-6 px-2 md:px-6 text-center font-heading font-bold text-xs md:text-base border-r border-white/20 bg-white/5">
                        <span className="hidden md:inline">{t("14 noches o más")}</span>
                        <span className="md:hidden">14+</span>
                      </th>
                      <th className="py-3 md:py-6 px-2 md:px-6 text-center font-heading font-bold text-xs md:text-base bg-white/10">
                        <span className="hidden md:inline">{t("21 noches o más")}</span>
                        <span className="md:hidden">21+</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingTable.map((row, index) => (
                      <tr key={row.season} className={`group hover:bg-sand/30 transition-colors ${index % 2 === 0 ? 'bg-sand-lt/50' : 'bg-white'}`}>
                        <td className="py-3 md:py-6 px-2 md:px-6 font-bold text-gray-900 border-r border-gray-100">
                          <div className="flex items-center gap-1 md:gap-2">
                            <span className={`w-2 md:w-3 h-2 md:h-3 rounded-full flex-shrink-0 ${row.color}`} />
                            <span className="text-sm md:text-base">{t(row.season)}</span>
                          </div>
                        </td>
                        <td className="py-3 md:py-6 px-2 md:px-6 text-center text-gray-600 font-bold text-sm md:text-xl border-r border-gray-100 group-hover:text-earth transition-colors">
                          {row.lessThanWeek}€
                        </td>
                        <td className="py-3 md:py-6 px-2 md:px-6 text-center text-earth font-bold text-base md:text-2xl border-r border-gray-100 bg-earth/5">
                          {row.oneWeek}€
                        </td>
                        <td className="py-3 md:py-6 px-2 md:px-6 text-center text-gray-600 font-bold text-sm md:text-xl border-r border-gray-100 group-hover:text-earth transition-colors">
                          {row.twoWeeks}€
                        </td>
                        <td className="py-3 md:py-6 px-2 md:px-6 text-center text-gray-600 font-bold text-sm md:text-xl group-hover:text-earth transition-colors">
                          {row.threeWeeks}€
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-earth" />
                  {t("Cómputo de noches")}
                </h4>
                <p className="text-sm text-gray-600">
                  {t("La estancia se calcula por noches completas. La entrada es a partir de las 14:00 y la salida antes de las 12:00.")}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-earth" />
                  {t("Pago seguro")}
                </h4>
                <p className="text-sm text-gray-600">
                  {t("Pago con tarjeta de débito o crédito a través de pasarela segura. Confirmación inmediata por email.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Descuentos por duración ── */}
      <section id="descuentos" className="py-24 bg-gradient-to-br from-earth to-earth-deep text-white relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-clay/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t("Cuanto más tiempo, mejor precio")}
            </h2>
            <p className="text-white/80 text-lg">
              {t("Descuentos automáticos según la duración de tu estancia")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {discounts.map((discount, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="text-4xl mb-4">{discount.icon}</div>
                <div className="text-6xl font-heading font-bold text-white mb-4 tracking-tight drop-shadow-lg">{discount.percentage}</div>
                <p className="text-white font-medium text-lg px-4 py-2 bg-white/10 rounded-full inline-block">{t(discount.description)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <LocalizedLink 
              href="/reservar" 
              className="inline-block bg-white text-earth font-extrabold text-lg py-4 px-10 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {t("Consultar precio para mis fechas")}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* ── Qué incluye / Extras ── */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t("¿Qué incluye tu parcela?")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("Todo lo esencial está incluido. Añade extras si los necesitas.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-green-50/50 border border-green-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-green-800">
                    {t("Incluido en el precio")}
                  </h3>
                  <p className="text-green-700 text-sm">{t("Sin sorpresas ni costes ocultos")}</p>
                </div>
              </div>
              <ul className="space-y-4">
                {includedFree.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/50 border border-blue-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Euro className="h-8 w-8 text-earth" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-earth">
                    {t("Extras opcionales")}
                  </h3>
                  <p className="text-earth text-sm">{t("Mayor comodidad a tu medida")}</p>
                </div>
              </div>
              <ul className="space-y-4">
                {extrasOptional.map((item) => (
                  <li key={item.name} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                    <span className="text-gray-700 font-medium">{t(item.name)}</span>
                    <span className="bg-earth/10 text-earth px-3 py-1 rounded-lg font-bold text-sm">
                      {item.price} / {t(item.per)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calendario de temporadas ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t("Calendario de temporadas")}
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              {t("Consulta qué temporada aplica en tus fechas")}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded" />
                <span className="text-sm font-medium text-gray-700">{t("Temporada Baja")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-200 border-2 border-orange-300 rounded" />
                <span className="text-sm font-medium text-gray-700">{t("Temporada Media")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-200 border-2 border-red-300 rounded" />
                <span className="text-sm font-medium text-gray-700">{t("Temporada Alta")}</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="bg-sand-lt rounded-3xl p-6 md:p-8 shadow-inner">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-earth bg-white py-3 px-6 rounded-xl shadow-sm inline-block">
                  {t("Calendario")} {currentYear}
                </h3>
              </div>
              <SeasonsCalendar year={currentYear} hidePassedMonths={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Estancia mínima ── */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t("Duración de la estancia")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("Noches mínimas según temporada")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white border-2 border-blue-100 rounded-3xl p-8 text-center hover:border-earth transition-colors group">
              <h3 className="font-heading font-bold text-lg text-gray-500 mb-4 uppercase tracking-wider group-hover:text-earth transition-colors">
                {t("Temp. Baja y Media")}
              </h3>
              <div className="text-6xl font-heading font-bold text-earth mb-2 group-hover:scale-110 transition-transform duration-300">2</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{t("Noches mínimo")}</p>
            </div>

            <div className="bg-white border-2 border-orange-100 rounded-3xl p-8 text-center hover:border-clay transition-colors group">
              <h3 className="font-heading font-bold text-lg text-gray-500 mb-4 uppercase tracking-wider group-hover:text-clay transition-colors">
                {t("Temporada Alta")}
              </h3>
              <div className="text-6xl font-heading font-bold text-clay mb-2 group-hover:scale-110 transition-transform duration-300">7</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{t("Noches mínimo")}</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm border border-gray-100">
            <Clock className="h-6 w-6 text-earth flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{t("Horarios")}</h4>
              <p className="text-gray-600 text-sm">
                {t("Entrada a partir de las 14:00h. Salida antes de las 12:00h. Si necesitas flexibilidad, consúltanos.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Política de cancelación ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t("Cancelación flexible")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("Cancela gratis hasta 30 días antes de tu llegada")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {cancellationPolicy.map((item, index) => (
              <div key={index} className={`rounded-2xl p-8 text-center shadow-lg border-t-8 ${item.border} bg-white`}>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 h-10 flex items-center justify-center">{t(item.period)}</p>
                <p className={`text-3xl font-heading font-bold ${item.color}`}>{t(item.charge)}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-earth-deep/5 border border-earth/20 rounded-2xl p-6 flex items-start gap-4">
            <Info className="h-6 w-6 text-earth flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              {t("Las cancelaciones se procesan automáticamente. El reembolso se realiza por el mismo método de pago en un plazo de 5-10 días laborables.")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Requisitos ── */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t("¿Qué necesitas para reservar?")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <span className="text-4xl mb-4 block">📧</span>
              <h3 className="font-bold text-gray-900 mb-2">{t("Email y teléfono")}</h3>
              <p className="text-sm text-gray-500">{t("Para enviarte la confirmación")}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <span className="text-4xl mb-4 block">🆔</span>
              <h3 className="font-bold text-gray-900 mb-2">{t("DNI o Pasaporte")}</h3>
              <p className="text-sm text-gray-500">{t("Del titular de la reserva")}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <span className="text-4xl mb-4 block">💳</span>
              <h3 className="font-bold text-gray-900 mb-2">{t("Tarjeta bancaria")}</h3>
              <p className="text-sm text-gray-500">{t("Pago seguro online con Redsys")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative h-[350px] lg:h-[400px] overflow-hidden">
        <HeroSlider 
          images={[
            "/images/slides/limonar_area_camper_mar_menor_1.webp",
            "/images/slides/limonar_area_camper_mar_menor_2.webp",
            "/images/slides/limonar_area_camper_mar_menor_3.webp",
            "/images/slides/limonar_area_camper_mar_menor_5.webp",
          ]}
          autoPlayInterval={11000}
        />
        <div className="absolute inset-0 bg-earth-deep/70 z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-heading font-extrabold mb-4">
            {t("¿Tienes dudas sobre los precios?")}
          </h2>
          <p className="text-white/70 mb-8 max-w-md">
            {t("Escríbenos y te ayudamos a encontrar la mejor opción para tu estancia.")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LocalizedLink 
              href="/reservar" 
              className="bg-clay text-white font-extrabold py-4 px-10 rounded-full hover:bg-clay-dk transition-all text-base"
            >
              {t("Reservar ahora")}
            </LocalizedLink>
            <LocalizedLink 
              href="/contacto" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all text-base"
            >
              {t("Contactar")}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
