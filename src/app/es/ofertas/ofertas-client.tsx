"use client";

import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import { HeroSlider } from "@/components/hero-slider";
import { Mail, Clock, Calendar, Zap, Shield, Map, Phone, Smile, AlertCircle, CalendarClock, Truck, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { infoEmail } from "@/lib/app-config";
import { useState, useEffect } from "react";
import Image from "next/image";

interface LastMinuteOffer {
  id: string;
  parcel_id?: string;
  parcel_name?: string;
  parcel_slug?: string;
  parcel_image_url?: string | null;
  parcel_internal_code?: string;
  offer_start_date: string;
  offer_end_date: string;
  offer_days: number;
  original_price_per_day: number;
  discount_percentage: number;
  final_price_per_day: number;
  total_original_price: number;
  total_final_price: number;
  savings: number;
  pickup_location_id: string;
  pickup_location_name: string;
  pickup_location_address: string;
  dropoff_location_id: string;
  dropoff_location_name: string;
  dropoff_location_address: string;
}

export function OfertasClient() {
  const { t, locale } = useLanguage();
  const [lastMinuteOffers, setLastMinuteOffers] = useState<LastMinuteOffer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    fetchLastMinuteOffers();
  }, []);

  const fetchLastMinuteOffers = async () => {
    try {
      const response = await fetch('/api/offers/last-minute');
      const data = await response.json();
      setLastMinuteOffers(data.offers || []);
    } catch (error) {
      console.error('Error fetching last minute offers:', error);
    } finally {
      setLoadingOffers(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatPrice = (price: number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(numPrice);
  };

  const benefits = [
    { icon: <Zap className="w-8 h-8 text-white" />, title: "Todo incluido", desc: "Electricidad, agua, WiFi y vaciado en cada parcela" },
    { icon: <Map className="w-8 h-8 text-white" />, title: "Mar Menor", desc: "A minutos de las mejores playas de la costa de Murcia" },
    { icon: <Phone className="w-8 h-8 text-white" />, title: "Atención 24h", desc: "Recepción y soporte siempre disponible" },
    { icon: <Shield className="w-8 h-8 text-white" />, title: "Sin sorpresas", desc: "Precio transparente. Sin extras ocultos" },
    { icon: <Smile className="w-8 h-8 text-white" />, title: "Pet-friendly", desc: "Tu mascota es bienvenida en nuestras parcelas" },
    { icon: <Calendar className="w-8 h-8 text-white" />, title: "320 días de sol", desc: "Disfruta del mejor clima de Europa todo el año" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Ofertas y Descuentos")}
        subtitle={t("Aprovecha nuestras ofertas especiales y ahorra en tu estancia")}
        tag={`🔥 ${t("Eco Area Limonar")}`}
        backgroundImage="/images/slides/AdobeStock_231250340.webp"
      />

      {/* Intro */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-earth mb-4">
            {t("Ahorra en tu estancia")}
          </h2>
          <p className="text-gray-500 mb-6">
            {t("Consulta nuestras ofertas de última hora y aprovecha los mejores precios para tu próxima escapada al Mar Menor.")}
          </p>
          <div className="inline-flex items-start gap-3 bg-sand-lt rounded-xl p-4 text-left">
            <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              <strong className="text-gray-700">{t("Esta página se actualiza regularmente.")}</strong> {t("Te recomendamos visitarla de vez en cuando para encontrar tu oportunidad.")}
            </p>
          </div>
        </div>
      </section>

      {/* OFERTAS DE ÚLTIMA HORA */}
      <section id="ultima-hora" className="py-4 bg-earth-deep scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <CalendarClock className="w-4 h-4 text-white/60" />
            <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider">
              {t("Ofertas de Última Hora")}
            </h2>
          </div>
        </div>
      </section>

      {/* Ofertas de Última Hora - Contenido */}
      <section className="py-20 bg-gradient-to-br from-sand-lt to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Explicación */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-clay/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <CalendarClock className="w-8 h-8 text-clay" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-4">
                    {t("¿Qué son las Ofertas de Última Hora?")}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t("En temporada alta (verano, Semana Santa...) aplicamos periodos mínimos de alquiler (por ejemplo, 7 días en agosto). Esto puede generar pequeños huecos entre reservas que no cumplen el mínimo.")}
                  </p>
                  <div className="bg-clay/5 rounded-xl p-4 border border-clay/20">
                    <p className="text-gray-700 font-medium flex items-start gap-2">
                      <span className="text-lg">💡</span>
                      <span>{t("Ejemplo: Si un alquiler termina el 15 de agosto y el siguiente empieza el 20, esos 5 días no se pueden alquilar normalmente. ¡Pero los ofrecemos con descuento especial!")}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ofertas disponibles o mensaje de no disponible */}
            {loadingOffers ? (
              <div className="bg-sand-lt rounded-3xl p-10 md:p-14 text-center border border-gray-200">
                <Loader2 className="w-10 h-10 text-clay animate-spin mx-auto mb-4" />
                <p className="text-gray-500">{t("Cargando ofertas...")}</p>
              </div>
            ) : lastMinuteOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {lastMinuteOffers.map((offer) => (
                  <div 
                    key={offer.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    {/* Imagen de la parcela */}
                    <LocalizedLink href={`/reservar/oferta/${offer.id}`} className="block">
                      <div className="h-64 relative bg-sand overflow-hidden">
                        {offer.parcel_image_url ? (
                          <Image
                            src={offer.parcel_image_url ?? ''}
                            alt={offer.parcel_name ?? ''}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Truck className="w-16 h-16 text-gray-300" />
                          </div>
                        )}
                        {/* Badge de descuento */}
                        <div className="absolute top-4 left-4 bg-clay text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                          -{offer.discount_percentage}%
                        </div>
                      </div>
                    </LocalizedLink>

                    {/* Contenido */}
                    <div className="p-6">
                      <LocalizedLink href={`/reservar/oferta/${offer.id}`}>
                        <h4 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-clay transition-colors">
                          {offer.parcel_name}
                        </h4>
                      </LocalizedLink>
                      
                      {/* Características y fechas */}
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1.5 bg-sand px-2.5 py-1 rounded-full">
                          <Calendar className="w-4 h-4 text-earth" />
                          {formatDate(offer.offer_start_date)} - {formatDate(offer.offer_end_date)}
                        </span>
                        <span className="flex items-center gap-1.5 bg-clay/10 px-2.5 py-1 rounded-full text-clay font-medium">
                          <Clock className="w-4 h-4" />
                          {offer.offer_days} {t("días")}
                        </span>
                      </div>
                      {offer.pickup_location_name && (
                        <p className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
                          <Map className="w-4 h-4 text-green-600" />
                          {offer.pickup_location_name}
                        </p>
                      )}

                      {/* Precios y CTA */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-gray-400 line-through text-sm">
                            {formatPrice(offer.total_original_price)}
                          </span>
                          <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded">
                            {t("Ahorras")} {formatPrice(offer.savings)}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(offer.total_final_price)}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({formatPrice(offer.final_price_per_day)}/{t("día")})
                          </span>
                        </div>
                        <LocalizedLink
                          href={`/reservar/oferta/${offer.id}`}
                          className="flex items-center justify-center gap-2 w-full bg-clay hover:bg-clay-dk text-white font-bold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
                        >
                          <CalendarClock className="w-5 h-5" />
                          {t("Reservar ahora")}
                        </LocalizedLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-sand-lt rounded-3xl p-10 md:p-14 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-700 mb-3">
                  {t("No hay ofertas de última hora disponibles")}
                </h4>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {t("Actualmente no tenemos huecos disponibles entre reservas. Esta sección se actualiza regularmente, ¡vuelve a visitarnos pronto!")}
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-earth font-medium">
                  <Clock className="w-4 h-4" />
                  {t("Las ofertas de última hora suelen aparecer en temporada alta")}
                </div>
              </div>
            )}

            {/* Tip de notificación */}
            <div className="mt-8 bg-earth/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 bg-earth rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-700 font-medium">
                  {t("¿Quieres que te avisemos cuando haya ofertas?")}
                </p>
                <p className="text-gray-500 text-sm">
                  {t("Escríbenos a")} <a href={`mailto:${infoEmail}`} className="text-earth hover:underline">{infoEmail}</a> {t("y te incluiremos en nuestra lista de alertas.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos — photo slider */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <HeroSlider 
          images={[
            "/images/slides/limonar_area_camper_mar_menor_1.webp",
            "/images/slides/limonar_area_camper_mar_menor_2.webp",
            "/images/slides/limonar_area_camper_mar_menor_4.webp",
            "/images/slides/limonar_area_camper_mar_menor_5.webp",
          ]}
          autoPlayInterval={10000}
        />
        <div className="absolute inset-0 bg-earth-deep/75 z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-heading font-extrabold mb-10">
            {t("¿POR QUÉ ECO AREA LIMONAR?")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.slice(0, 6).map((b, i) => (
              <div key={i} className="text-center">
                <div className="mb-2">{b.icon}</div>
                <p className="text-sm font-bold">{t(b.title)}</p>
              </div>
            ))}
          </div>
          <LocalizedLink
            href="/reservar"
            className="mt-10 bg-clay text-white font-extrabold py-4 px-10 rounded-full hover:bg-clay-dk transition-all text-base"
          >
            {t("¡EMPEZAR AHORA!")}
          </LocalizedLink>
        </div>
      </section>
    </main>
  );
}
