import { Metadata } from "next";
import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import { translateServer } from "@/lib/i18n/server-translation";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/quienes-somos", locale);

  return {
    title: "Über uns | Eco Area Limonar",
    description:
      "Entdecken Sie Eco Area Limonar, einen Wohnmobilstellplatz in Los Nietos, am Ufer des Mar Menor. Premium-Stellplätze, voller Service und 320 Sonnentage.",
    keywords:
      "Eco Area Limonar, über uns, Wohnmobilstellplatz Los Nietos, Camping Mar Menor, Cartagena Murcia",
    openGraph: {
      title: "Über uns | Eco Area Limonar",
      description:
        "Premium-Wohnmobilstellplatz am Ufer des Mar Menor. Entdecken Sie unsere Geschichte.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function AboutUsPage() {
  const locale: Locale = "de";
  const t = (key: string) => translateServer(key, locale);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Eco Area Limonar")}
        subtitle={t(
          "Tu área de autocaravanas en Los Nietos, a orillas del Mar Menor"
        )}
        tag={`🌊 ${t("Cartagena, Murcia")} · ${t("320 días de sol")}`}
        backgroundImage="/images/slides/limonar_area_camper_mar_menor_4.webp"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
                {t("Nuestra historia")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
                {t("Un rincón mediterráneo para viajeros")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  {t("Eco Area Limonar nace con la idea de crear un espacio único para los amantes del turismo en autocaravana. Situado en el paraje El Limonar, en Los Nietos (Cartagena), nuestro área ofrece las mejores condiciones para disfrutar del Mar Menor y la costa de Murcia.")}
                </p>
                <p>
                  {t("Con más de 50 parcelas amplias, niveladas y con todos los servicios incluidos —electricidad, agua, WiFi fibra óptica, vaciado de aguas grises y negras, seguridad 24h— queremos que tu estancia sea cómoda, segura y relajada.")}
                </p>
                <p>
                  {t("Nos mueve la pasión por el Mediterráneo, el respeto por el entorno natural y la vocación de ofrecer un servicio excelente.")}
                </p>
              </div>
            </div>
            <div className="relative h-[350px] lg:h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/images/slides/limonar_area_camper_mar_menor_2.webp"
                alt={t("Atardecer en el Mar Menor")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth text-center mb-12">
            {t("Lo que nos define")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {[
              {
                img: "/images/gallery/svc-wifi.webp",
                title: t("Calidad sin letra pequeña"),
                desc: t("Todo incluido en la tarifa. Transparencia total."),
              },
              {
                img: "/images/gallery/svc-seguridad.webp",
                title: t("Seguridad y tranquilidad"),
                desc: t("Cámaras, barrera de acceso y atención personalizada."),
              },
              {
                img: "/images/gallery/svc-mascotas.webp",
                title: t("Respeto por el entorno"),
                desc: t("Eco-friendly, pet-friendly y sostenible."),
              },
            ].map((v, i) => (
              <div key={i} className="group relative h-[300px] lg:h-[380px] rounded-2xl overflow-hidden">
                <Image src={v.img} alt={v.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-extrabold text-white mb-1">{v.title}</h3>
                  <p className="text-white/60 text-sm md:text-base">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[350px] lg:h-[400px] overflow-hidden">
        <Image src="/images/slides/limonar_area_camper_mar_menor_5.webp" alt="" fill className="object-cover" sizes="100vw" loading="lazy" />
        <div className="absolute inset-0 bg-earth-deep/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-10">
            {t("En cifras")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {[
              { num: "50+", label: t("Parcelas") },
              { num: "320", label: t("Días de sol") },
              { num: "24h", label: t("Seguridad") },
              { num: "4.8★", label: t("Valoración") },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold">{s.num}</p>
                <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-4">
            {t("¿Listo para tu aventura?")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8">
            {t("Reserva tu parcela y disfruta del Mediterráneo")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <LocalizedLink
              href="/reservar"
              className="bg-clay text-white font-extrabold px-10 py-4 rounded-full text-base hover:bg-clay-dk transition-all"
            >
              {t("Reservar ahora")}
            </LocalizedLink>
            <LocalizedLink
              href="/contacto"
              className="bg-white border-2 border-earth text-earth font-bold px-10 py-4 rounded-full text-base hover:bg-earth hover:text-white transition-all"
            >
              {t("Contactar")}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
