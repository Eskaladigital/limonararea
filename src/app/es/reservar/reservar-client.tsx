"use client";

import { SearchWidget } from "@/components/booking/search-widget";
import { OccupancyHighlights } from "@/components/booking/occupancy-highlights";
import { PageHero } from "@/components/layout/page-hero";
import { MapPin, Clock, Phone, Car, CheckCircle, Calendar, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const locations = [
  {
    id: "los-nietos",
    name: "Eco Area Limonar",
    slug: "los-nietos", // slug para compatibilidad con API
    address: "Los Nietos, Cartagena",
    city: "Mar Menor, Murcia",
    phone: "+34 868 364 161",
    hours: "Consultar horarios de entrada y salida",
    description: "Área de autocaravanas en Los Nietos, a pocos minutos del Mar Menor",
    features: ["Electricidad", "Agua", "Vaciado", "Cerca del Mar Menor"],
    image: "/images/locations/murcia.jpg",
    available: true,
  },
];

export function ReservarClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-sand-lt">
      <PageHero
        title={t("Reserva tu aventura")}
        subtitle={t("Selecciona tus fechas y encuentra la parcela perfecta para tu estancia")}
        className="pt-8 md:pt-12 pb-48 relative overflow-visible"
      >
        <div className="max-w-5xl mx-auto -mb-32">
          <SearchWidget variant="full" />
        </div>
      </PageHero>

      {/* Occupancy Highlights - Nuevo semáforo de ocupación */}
      <section className="pt-40 pb-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <OccupancyHighlights />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
            {t("Nuestra ubicación")}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((location) => (
              <div key={location.id} className="bg-sand-lt rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-earth/10 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-earth" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{location.name}</h3>
                    <p className="text-gray-600 text-sm">{location.address}</p>
                    <p className="text-gray-500 text-sm">{location.city}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{location.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{location.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {location.features.map((feature) => (
                        <span key={feature} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
            {t("¿Cómo funciona?")}
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Calendar, title: "1. Elige fechas", desc: "Selecciona tus fechas de estancia" },
              { icon: Car, title: "2. Elige parcela", desc: "Compara y selecciona tu parcela" },
              { icon: CreditCard, title: "3. Paga señal", desc: "Solo el 30% para confirmar" },
              { icon: CheckCircle, title: "4. ¡A disfrutar!", desc: "Llega y disfruta del Mar Menor" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-clay/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-clay" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(step.title)}</h3>
                <p className="text-gray-600 text-sm">{t(step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
