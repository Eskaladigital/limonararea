import { Metadata } from "next";
import { SearchWidget } from "@/components/booking/search-widget";
import { HeroSlider } from "@/components/hero-slider";
import { BlogArticleLink } from "@/components/blog/blog-article-link";
import { LocalizedLink } from "@/components/localized-link";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { ogImageUrl } from "@/lib/app-config";
import { Zap, Sun, Waves, TreePine, ShieldCheck, UtensilsCrossed } from "lucide-react";
import { getFeaturedVehicles, getLatestBlogArticles, getCompanyStats } from "@/lib/home/server-actions";
import { OrganizationJsonLd, ProductJsonLd, WebsiteJsonLd } from "@/components/home/organization-jsonld";
import { getTranslatedRecords } from "@/lib/translations/get-translations";

import Image from "next/image";

/**
 * 🎯 HOME ESPAÑOL - /es
 * =====================
 * 
 * Página principal del sitio en español.
 * Locale fijo: 'es'
 */

interface HomePageProps {
  // Sin params dinámicos - locale fijo
}

/**
 * 🎯 Metadata SEO optimizada para español
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = 'es'; // Locale fijo
  const t = (key: string) => translateServer(key, locale);
  
  // Locale para OpenGraph
  const ogLocales: Record<string, string> = {
    es: 'es_ES',
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE'
  };
  
  // ✅ Canonical autorreferenciado
  const alternates = buildCanonicalAlternates('/', locale);
  
  return {
    title: `${t("Eco Area Limonar - Área de Autocaravanas Los Nietos")}`,
    description: `${t("Área de autocaravanas en Los Nietos, Cartagena")}. ${t("Mar Menor, Murcia")}. ${t("Parcelas con electricidad, agua y servicios")}. ${t("¡Reserva tu parcela ahora!")}`,
    keywords: "área autocaravanas, Los Nietos, Mar Menor, Cartagena, Murcia, parcelas autocaravanas, camping autocaravanas, eco area limonar",
    authors: [{ name: "Eco Area Limonar" }],
    openGraph: {
      title: `${t("Eco Area Limonar - Área de Autocaravanas Los Nietos")}`,
      description: `${t("Tu área de autocaravanas en el Mar Menor")}. ${t("Parcelas desde 95€/día con todos los servicios")}. Los Nietos, Cartagena.`,
      type: "website",
      url: alternates.canonical,
      siteName: t("Eco Area Limonar - Área de Autocaravanas"),
      images: [
        { url: ogImageUrl, width: 1920, height: 1080, alt: `Eco Area Limonar - ${t("Área de Autocaravanas Los Nietos")}`, type: "image/webp" },
      ],
      locale: ogLocales[locale] || 'es_ES',
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("Eco Area Limonar - Área de Autocaravanas Los Nietos")}`,
      description: `${t("Área de autocaravanas en Los Nietos, Mar Menor")}. ${t("Parcelas con electricidad, agua y servicios")}.`,
      images: [ogImageUrl],
    },
    alternates,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'tu-codigo-de-verificacion-aqui',
    },
  };
}

// ⚡ ISR: Revalidar cada 2 horas (contenido cambia poco)
export const revalidate = 7200;

// ✅ SERVER COMPONENT
export default async function LocaleHomePage() {
  const locale: Locale = 'es'; // Locale fijo para español
  
  // Función helper para traducciones
  const t = (key: string) => translateServer(key, locale);
  
  // Cargar datos en el servidor
  const featuredVehiclesRaw = await getFeaturedVehicles();
  const blogArticlesRaw = await getLatestBlogArticles(3);
  const stats = await getCompanyStats();
  
  // Aplicar traducciones a los vehículos destacados
  const featuredVehicles = await getTranslatedRecords(
    'vehicles',
    featuredVehiclesRaw,
    ['name', 'short_description'],
    locale
  );
  const featuredVehiclesHome = featuredVehicles.slice(0, 3);
  
  // Aplicar traducciones a los posts del blog
  const blogArticles = await getTranslatedRecords(
    'posts',
    blogArticlesRaw,
    ['title', 'excerpt'],
    locale
  );
  
  // Traducir nombres de categorías si no es español
  if (locale !== 'es') {
    for (const article of blogArticles) {
      if (article.category?.id) {
        const translatedCats = await getTranslatedRecords(
          'content_categories',
          [article.category],
          ['name'],
          locale
        );
        if (translatedCats[0]?.name) {
          article.category = { ...article.category, name: translatedCats[0].name };
        }
      }
    }
  }

  return (
    <>
      <OrganizationJsonLd />
      <ProductJsonLd parcels={featuredVehicles} />
      <WebsiteJsonLd />
      
      {/* Hero Section - V5 fullscreen + V6 buscador split (mt negativo para que el header lo sobrevuele) */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden -mt-[7rem] pt-[calc(7rem+6rem)] pb-12 px-4 lg:min-h-[70vh] lg:pt-[215px] lg:pb-[215px]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroSlider 
            images={[
              "/images/slides/AdobeStock_47883789.webp",
              "/images/slides/AdobeStock_83679015.webp",
              "/images/slides/AdobeStock_231250340.webp",
              "/images/slides/limonar_area_camper_mar_menor_4.webp",
            ]}
            autoPlayInterval={8000}
          />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl">
          {/* Grid: texto izq + buscador der (V6) en desktop; apilado en mobile */}
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-10 items-center">
            {/* Columna izquierda - texto */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-clay-lt text-xs md:text-sm font-bold uppercase tracking-[0.16em] mb-4 py-1.5 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                ☀️ {t("Los Nietos")} · Mar Menor · {t("320 días de sol")}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-semibold text-white leading-tight mb-3 tracking-tight" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.5)' }}>
                {t("Siente el")} <em className="text-olive-lt">Mediterráneo</em><br />
                {t("desde tu autocaravana")}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                {t("Parcelas de máxima calidad con todos los servicios incluidos, a pocos minutos del Mar Menor.")}
              </p>
              <div className="hidden lg:flex items-center gap-6 text-white/80">
                <div className="text-center">
                  <span className="block text-2xl lg:text-3xl font-extrabold">50+</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{t("Parcelas")}</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl lg:text-3xl font-extrabold">24h</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{t("Seguridad")}</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl lg:text-3xl font-extrabold">4.8★</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{t("Valoración")}</span>
                </div>
              </div>
            </div>

            {/* Columna derecha - buscador V6 */}
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
              <SearchWidget variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ BANNER NOVEDADES ══════ */}
      <section className="relative bg-earth-deep">
        <div className="container mx-auto px-4 py-4 lg:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <span className="inline-flex items-center gap-2 bg-clay/90 text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
              {t("Reserva anticipada")}
            </span>
            <p className="text-white/90 text-sm md:text-base font-medium">
              {t("Ya puedes reservar tu parcela para la temporada 2026. Plazas limitadas con descuento por reserva anticipada.")}
            </p>
            <LocalizedLink
              href="/reservar"
              className="text-clay-lt text-sm font-bold hover:text-white transition-colors whitespace-nowrap"
            >
              {t("Reservar ahora")} →
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* ══════ STORYTELLING - Más que un área ══════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-clay font-bold text-sm uppercase tracking-widest mb-3">
                {t("Más que un área de autocaravanas")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-earth leading-tight mb-6">
                {t("Un lugar donde conectar con el Mediterráneo")}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                {t("En Eco Area Limonar no solo aparcas tu autocaravana: vives una experiencia. Amaneceres sobre el Mar Menor, atardeceres que tiñen el cielo de naranja y la tranquilidad de un entorno natural privilegiado. Todo eso, con servicios de primera y a pocos minutos de la playa.")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Waves, title: t("Mar Menor"), desc: t("La laguna salada más grande de Europa, a solo 5 minutos") },
                  { icon: Sun, title: t("320 días de sol"), desc: t("Uno de los climas más cálidos de Europa, todo el año") },
                  { icon: TreePine, title: t("Naturaleza"), desc: t("Parque Regional de Calblanque y sierras litorales") },
                  { icon: ShieldCheck, title: t("Tranquilidad"), desc: t("Entorno tranquilo y seguro, lejos del turismo masivo") },
                  { icon: UtensilsCrossed, title: t("Gastronomía"), desc: t("Caldero murciano, pescado fresco y mercados locales") },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-olive" />
                    </div>
                    <div>
                      <p className="font-bold text-earth text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="relative h-[200px] lg:h-[260px] rounded-2xl overflow-hidden">
                  <Image src="/images/slides/limonar_area_camper_mar_menor_1.webp" alt={t("Mar Menor")} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
                <div className="relative h-[140px] lg:h-[180px] rounded-2xl overflow-hidden">
                  <Image src="/images/stock/mar-menor-sunset-1.jpg" alt={t("Atardeceres sobre el Mar Menor")} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="relative h-[140px] lg:h-[180px] rounded-2xl overflow-hidden">
                  <Image src="/images/stock/mar-menor-beach-1.jpg" alt={t("A minutos de playas vírgenes")} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
                <div className="relative h-[200px] lg:h-[260px] rounded-2xl overflow-hidden">
                  <Image src="/images/slides/limonar_area_camper_mar_menor_2.webp" alt={t("Naturaleza")} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ 1. ENCUENTRA TU PARCELA ══════ */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth text-center mb-4">
            {t("Encuentra tu parcela perfecta")}
          </h2>

          <p className="text-center text-gray-500 max-w-lg mx-auto mb-12 text-sm md:text-base">
            {t("Amplias, equipadas y a pocos minutos del Mar Menor")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
            {featuredVehiclesHome.map((vehicle) => (
              <LocalizedLink
                key={vehicle.id}
                href={`/parcelas/${vehicle.slug}`}
                className="group relative h-[340px] lg:h-[400px] rounded-2xl overflow-hidden"
              >
                {vehicle.main_image ? (
                  <Image
                    src={vehicle.main_image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    quality={75}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-earth to-earth-deep" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-extrabold text-white mb-1 drop-shadow-lg">
                    {vehicle.name}
                  </h3>
                  {vehicle.category?.name && (
                    <p className="text-white/70 text-sm md:text-base mb-3">{vehicle.category.name}</p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-clay-lt text-sm md:text-base font-bold group-hover:translate-x-1 transition-transform">
                    {t("Descubrir")} →
                  </span>
                </div>
              </LocalizedLink>
            ))}
          </div>

          <div className="text-center mt-10">
            <LocalizedLink
              href="/parcelas"
              className="inline-flex items-center gap-2 bg-earth text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-earth-deep transition-all hover:shadow-lg"
            >
              {t("Ver todas las parcelas")}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* ══════ 2. EXPLORA NUESTRAS INSTALACIONES (estilo Ballena Alegre grid fotos) ══════ */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth text-center mb-12">
            {t("Explora nuestras instalaciones")}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 max-w-6xl mx-auto">
            {[
              { img: "/images/gallery/svc-wifi.webp", title: t("WiFi fibra óptica"), tall: true },
              { img: "/images/gallery/svc-seguridad.webp", title: t("Seguridad 24h"), tall: false },
              { img: "/images/gallery/svc-duchas.webp", title: t("Sanitarios"), tall: false },
              { img: "/images/gallery/svc-vaciado.webp", title: t("Vaciado de aguas"), tall: true },
              { img: "/images/gallery/svc-lavanderia.webp", title: t("Lavandería"), tall: false },
              { img: "/images/gallery/svc-bbq.webp", title: t("Zona barbacoa"), tall: true },
              { img: "/images/gallery/svc-mascotas.webp", title: t("Pet-friendly"), tall: true },
              { img: "/images/slides/limonar_area_camper_mar_menor_3.webp", title: t("Playa a minutos"), tall: false },
            ].map((svc, i) => (
              <div
                key={i}
                className={`group relative rounded-xl overflow-hidden cursor-default ${
                  svc.tall ? "h-[240px] lg:h-[300px]" : "h-[180px] lg:h-[220px]"
                }`}
              >
                <Image
                  src={svc.img}
                  alt={svc.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm md:text-base lg:text-lg drop-shadow-md">{svc.title}</h3>
                  <span className="inline-block mt-1 text-xs font-extrabold uppercase tracking-wider text-white/60 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {t("Incluido")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HIGHLIGHTS EXPERIENCIALES ══════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              {
                img: "/images/stock/mar-menor-sunset-2.jpg",
                title: t("Atardeceres sobre el Mar Menor"),
                desc: t("Cada tarde, un espectáculo de colores sobre las aguas más tranquilas del Mediterráneo."),
              },
              {
                img: "/images/slides/AdobeStock_155661264.webp",
                title: t("A minutos de playas vírgenes"),
                desc: t("Calblanque, Islas Menores y calas escondidas que solo los locales conocen."),
              },
              {
                img: "/images/slides/AdobeStock_95139332.webp",
                title: t("Tu rincón de tranquilidad"),
                desc: t("Desconecta del ruido de la ciudad. Reconecta con lo que importa."),
              },
            ].map((card, i) => (
              <div key={i} className="group relative h-[380px] lg:h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-extrabold text-white mb-2 drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xs">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ GALERÍA MOSAICO ASPIRACIONAL ══════ */}
      <section className="py-16 lg:py-20 bg-sand-lt overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth text-center mb-3">
            {t("Imagina tus próximas vacaciones")}
          </h2>
        </div>
        <div className="max-w-[1400px] mx-auto px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3 auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[200px]">
            <div className="relative rounded-xl overflow-hidden row-span-2 group">
              <Image src="/images/slides/limonar_area_camper_mar_menor_4.webp" alt="Eco Area Limonar" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src="/images/stock/mar-menor-sunset-3.jpg" alt={t("Atardeceres sobre el Mar Menor")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden row-span-2 group">
              <Image src="/images/slides/AdobeStock_85606851.webp" alt={t("Naturaleza")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src="/images/stock/mar-menor-beach-1.jpg" alt={t("A minutos de playas vírgenes")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src="/images/slides/AdobeStock_132830655.webp" alt="Camper life" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden row-span-2 group">
              <Image src="/images/slides/limonar_area_camper_mar_menor_6.webp" alt="Eco Area Limonar" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src="/images/slides/AdobeStock_102980322.webp" alt={t("Mar Menor")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src="/images/stock/mar-menor-sky-1.jpg" alt={t("320 días de sol")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src="/images/slides/AdobeStock_47883789.webp" alt={t("Tu rincón de tranquilidad")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <LocalizedLink
            href="/galeria"
            className="inline-flex items-center gap-2 bg-earth text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-earth-deep transition-all hover:shadow-lg"
          >
            {t("Ver toda la galería")}
          </LocalizedLink>
        </div>
      </section>

      {/* ══════ 3. TARIFAS ══════ */}
      <section className="py-16 lg:py-24 bg-earth-deep text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-center mb-3">
            {t("Precios transparentes")}
          </h2>
          <p className="text-center text-white/40 text-sm md:text-base mb-12">
            {t("Todo incluido. Sin letra pequeña.")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { season: t("Temporada Baja"), price: "95", popular: false },
              { season: t("Temporada Media"), price: "125", popular: true },
              { season: t("Temporada Alta"), price: "155", popular: false },
            ].map((tier, i) => (
              <div key={i} className={`rounded-2xl p-7 text-center transition-all relative ${
                tier.popular
                  ? "bg-white text-gray-800 shadow-2xl scale-[1.03]"
                  : "bg-white/[0.04] border border-white/[0.08]"
              }`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-clay text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                    {t("Más popular")}
                  </span>
                )}
                <p className={`text-sm md:text-base font-bold mb-1 ${tier.popular ? "text-earth" : "text-white/70"}`}>{tier.season}</p>
                <p className={`text-5xl md:text-6xl font-heading font-extrabold mb-0.5 ${tier.popular ? "text-clay" : "text-white"}`}>
                  {tier.price}<span className="text-xl font-normal">€</span>
                </p>
                <p className="text-xs md:text-sm opacity-40 mb-6">{t("/ día / parcela")}</p>
                <ul className="text-left space-y-2.5 mb-6 text-sm md:text-base">
                  {[t("Parcela + electricidad"), t("Agua + WiFi"), t("Sanitarios + vaciado")].map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5">
                      <span className={`font-bold ${tier.popular ? "text-olive" : "text-olive-lt"}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <LocalizedLink
                  href="/reservar"
                  className={`block w-full py-3 rounded-full text-sm font-bold transition-all ${
                    tier.popular
                      ? "bg-clay text-white hover:bg-clay-dk shadow-lg"
                      : "bg-white/[0.06] text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {t("Reservar")}
                </LocalizedLink>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LocalizedLink
              href="/tarifas"
              className="text-white/60 text-sm font-bold hover:text-white transition-colors"
            >
              {t("Ver todas las tarifas y descuentos")} →
            </LocalizedLink>
            <LocalizedLink
              href="/ofertas"
              className="inline-flex items-center gap-2 bg-clay hover:bg-clay-dk text-white font-bold px-6 py-3 rounded-full transition-all shadow-lg text-sm"
            >
              <Zap className="h-4 w-4" />
              {t("Ofertas de última hora")}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* ══════ 5. OPINIONES ══════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth text-center mb-3">
            {t("Lo que dicen nuestros huéspedes")}
          </h2>
          <p className="text-center text-gray-400 text-sm md:text-base mb-12">
            4.8★ · 500+ {t("valoraciones")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { text: t("El mejor área del sureste. Impecable, parcelas enormes y un trato inmejorable. Repetiremos seguro."), name: "María y Roberto", from: "Valencia" },
              { text: "Perfect for winter sun. Great WiFi for remote work, always clean. We stayed two weeks and loved it.", name: "Klaus & Hannah", from: "Berlin" },
              { text: "Notre deuxième maison. On revient chaque hiver. Sécurité excellente, soleil garanti.", name: "Jean-Pierre", from: "Marseille" },
            ].map((review, i) => (
              <div key={i} className="relative bg-sand-lt rounded-2xl p-8">
                <span className="text-5xl text-earth/10 font-heading absolute top-4 left-6">&ldquo;</span>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6 relative z-10 pt-4">
                  {review.text}
                </p>
                <div>
                  <p className="text-sm md:text-base font-bold text-earth">{review.name}</p>
                  <p className="text-xs md:text-sm text-gray-400">{review.from}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 6. BLOG ══════ */}
      {blogArticles.length > 0 && (
        <section className="py-16 lg:py-24 bg-sand-lt">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth text-center mb-12">
              {t("Consejos y experiencias")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {blogArticles.map((article) => (
                <BlogArticleLink
                  key={article.id}
                  categorySlug={article.category?.slug}
                  slug={article.slug}
                  className="group relative h-[280px] lg:h-[340px] rounded-2xl overflow-hidden"
                >
                  {article.featured_image ? (
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-earth to-earth-deep" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    {article.category && (
                      <span className="inline-block bg-clay text-white px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        {article.category.name}
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-white drop-shadow-lg line-clamp-2 group-hover:text-clay-lt transition-colors">
                      {article.title}
                    </h3>
                    <span className="text-white/60 text-xs md:text-sm font-bold mt-2 inline-flex items-center gap-1 group-hover:text-white transition-colors">
                      {t("Leer más")} →
                    </span>
                  </div>
                </BlogArticleLink>
              ))}
            </div>

            <div className="text-center mt-10">
              <LocalizedLink
                href="/blog"
                className="inline-flex items-center gap-2 bg-earth text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-earth-deep transition-all"
              >
                {t("Ver más artículos")}
              </LocalizedLink>
            </div>
          </div>
        </section>
      )}

      {/* ══════ 7. CIFRAS + UBICACIÓN ══════ */}
      <section className="relative">
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <Image
            src="/images/slides/limonar_area_camper_mar_menor_5.webp"
            alt={t("Costa de Murcia")}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-earth-deep/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-10">
              {t("Eco Area Limonar en cifras")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
              <div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold">{stats.yearsExperience}+</p>
                <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider mt-1">{t("Años")}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold">{stats.totalBookings}+</p>
                <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider mt-1">{t("Reservas")}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold">{stats.totalVehicles}</p>
                <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider mt-1">{t("Parcelas")}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold">{stats.averageRating}★</p>
                <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider mt-1">{t("Valoración")}</p>
              </div>
            </div>
            <p className="mt-10 text-white/60 text-sm md:text-base max-w-md">
              {t("Paraje El Limonar · Los Nietos · 30710 Cartagena · Murcia")}
            </p>
          </div>
        </div>
      </section>

      {/* ══════ 8. CTA FINAL ══════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-4">
            {t("¿Listo para tu próxima aventura?")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8">
            {t("Reserva tu parcela y disfruta del Mediterráneo. Cancelación gratuita hasta 48h antes.")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <LocalizedLink
              href="/reservar"
              className="bg-clay text-white font-extrabold px-10 py-4 rounded-full text-base hover:bg-clay-dk hover:shadow-xl transition-all"
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
    </>
  );
}
