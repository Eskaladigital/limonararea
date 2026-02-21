"use client";

import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import { BookOpen, Volume2, Leaf, Users, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

export function NormasConductaClient() {
  const { t } = useLanguage();

  const normas = [
    {
      icon: Volume2,
      titleKey: "Respeto del silencio",
      contentKey: "Se mantendrá silencio entre las 22:00 y las 08:00 horas para garantizar el descanso de todos.",
    },
    {
      icon: Leaf,
      titleKey: "Cuidado del entorno",
      contentKey: "No se depositarán residuos fuera de los contenedores. Mantén tu parcela limpia.",
    },
    {
      icon: Users,
      titleKey: "Convivencia",
      contentKey: "Respeta el espacio de los demás. Las mascotas deben ir atadas y recoger sus residuos.",
    },
    {
      icon: Clock,
      titleKey: "Horarios",
      contentKey: "Respeta los horarios de entrada y salida. La ocupación de la parcela es según reserva.",
    },
    {
      icon: AlertCircle,
      titleKey: "Seguridad",
      contentKey: "No se permiten hogueras. Usa las zonas habilitadas para barbacoas si las hay.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Normas de conducta")}
        subtitle={t("Convivencia y buen uso del área")}
        tag={t("Normativa")}
        backgroundImage="/images/slides/AdobeStock_95139332.webp"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-500 text-center mb-12">
              {t("Para que todos disfrutemos del área, te pedimos que respetes estas normas básicas de convivencia.")}
            </p>
            <div className="space-y-4">
              {normas.map((item, i) => (
                <div key={i} className="flex gap-5 p-6 bg-sand-lt rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-earth/10 rounded-xl flex items-center justify-center text-earth">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-extrabold text-earth mb-1">
                      {t(item.titleKey)}
                    </h2>
                    <p className="text-gray-600 text-[15px]">{t(item.contentKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[300px] lg:h-[350px] overflow-hidden">
        <Image
          src="/images/slides/limonar_area_camper_mar_menor_3.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-earth-deep/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <p className="text-white/60 mb-4">{t("¿Tienes dudas?")}</p>
          <LocalizedLink
            href="/contacto"
            className="bg-white text-earth font-extrabold px-8 py-3.5 rounded-full hover:shadow-xl transition-all"
          >
            {t("Contactar")}
          </LocalizedLink>
        </div>
      </section>
    </main>
  );
}
