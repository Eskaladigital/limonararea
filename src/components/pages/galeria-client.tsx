"use client";

import { Video } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { HeroSlider } from "@/components/hero-slider";
import { useLanguage } from "@/contexts/language-context";

const galeriaImages = [
  { src: "/images/slides/limonar_area_camper_mar_menor_1.webp", alt: "Vista del área de autocaravanas", span: "col-span-2 row-span-2" },
  { src: "/images/slides/limonar_area_camper_mar_menor_2.webp", alt: "Parcelas equipadas", span: "col-span-1 row-span-1" },
  { src: "/images/slides/limonar_area_camper_mar_menor_3.webp", alt: "Instalaciones del área", span: "col-span-1 row-span-1" },
  { src: "/images/slides/limonar_area_camper_mar_menor_4.webp", alt: "Entorno Mar Menor", span: "col-span-1 row-span-1" },
  { src: "/images/slides/limonar_area_camper_mar_menor_5.webp", alt: "Área de autocaravanas", span: "col-span-1 row-span-1" },
];

const serviceImages = [
  { src: "/images/gallery/svc-electricidad.webp", label: "Electricidad 16A" },
  { src: "/images/gallery/svc-wifi.webp", label: "WiFi fibra" },
  { src: "/images/gallery/svc-seguridad.webp", label: "Seguridad 24h" },
  { src: "/images/gallery/svc-duchas.webp", label: "Sanitarios" },
  { src: "/images/gallery/svc-vaciado.webp", label: "Vaciado" },
  { src: "/images/gallery/svc-lavanderia.webp", label: "Lavandería" },
  { src: "/images/gallery/svc-bbq.webp", label: "Zona BBQ" },
  { src: "/images/gallery/svc-mascotas.webp", label: "Pet-friendly" },
];

export function GaleriaClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Galería")}
        subtitle={t("Fotos y vídeos del área de autocaravanas en Los Nietos, Mar Menor")}
        tag={`📷 ${t("Eco Area Limonar")}`}
        backgroundImage="/images/slides/AdobeStock_231250340.webp"
      />

      {/* Mosaic gallery — full bleed, no gaps */}
      <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] lg:auto-rows-[260px]">
        {galeriaImages.map((img, i) => (
          <div key={i} className={`relative overflow-hidden group ${img.span}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes={i === 0 ? "50vw" : "25vw"}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute bottom-3 left-4 text-white text-xs font-bold drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {img.alt}
            </span>
          </div>
        ))}
      </div>

      {/* Services gallery */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-earth text-center mb-12">
            {t("Nuestras instalaciones")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {serviceImages.map((img, i) => (
              <div key={i} className={`group relative rounded-2xl overflow-hidden ${i % 3 === 0 ? "h-[220px] lg:h-[280px]" : "h-[200px] lg:h-[250px]"}`}>
                <Image
                  src={img.src}
                  alt={t(img.label)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-white text-sm font-bold drop-shadow-lg">
                  {t(img.label)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-16 lg:py-20 bg-sand-lt">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-earth mb-4">
            {t("Vídeos")}
          </h2>
          <p className="text-gray-500 mb-8">
            {t("Próximamente añadiremos vídeos del área y sus instalaciones.")}
          </p>
          <div className="bg-white rounded-2xl p-12 border border-gray-100 max-w-lg mx-auto">
            <Video className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">{t("Contenido en preparación")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
