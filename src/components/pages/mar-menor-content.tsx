import { LocalizedLink } from "@/components/localized-link";
import { HeroSlider } from "@/components/hero-slider";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { translateServer } from "@/lib/i18n/server-translation";
import { Waves, Droplets, Fish, Bird, Leaf, AlertTriangle, Shield, TrendingUp, BarChart3, MapPin, Heart } from "lucide-react";

interface MarMenorContentProps {
  locale: Locale;
  /** Si se pasa, se usan estas traducciones (p. ej. desde content_translations); si no, translateServer */
  t?: (key: string) => string;
}

export function MarMenorContent({ locale, t: tProp }: MarMenorContentProps) {
  const t = tProp ?? ((key: string) => translateServer(key, locale));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero con slider - más impactante */}
      <section className="relative min-h-[70vh] lg:min-h-[75vh] flex flex-col justify-center overflow-hidden -mt-[7rem] pt-[7rem]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroSlider 
            images={[
              "/images/slides/limonar_area_camper_mar_menor_1.webp",
              "/images/slides/limonar_area_camper_mar_menor_2.webp",
              "/images/slides/limonar_area_camper_mar_menor_5.webp",
              "/images/slides/AdobeStock_231250340.webp",
            ]}
            autoPlayInterval={7000}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-clay-lt text-xs md:text-sm font-bold uppercase tracking-[0.16em] mb-4 py-1.5 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              🌊 Referencia · Ecología y turismo
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.6)' }}>
              {t("El Mar Menor")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
              {t("La mayor laguna salada de Europa: naturaleza, ecología y turismo en la costa de Murcia")}
            </p>
          </div>
        </div>
      </section>

      {/* Resumen ejecutivo condensado con bullets y stats */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
                {t("Referencia")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
                {t("Qué es el Mar Menor")}
              </h2>
              
              {/* Stats destacadas */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="text-3xl font-heading font-extrabold text-blue-600">~135</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">km² laguna</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                  <div className="text-3xl font-heading font-extrabold text-red-600">85%</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">praderas perdidas</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <div className="text-3xl font-heading font-extrabold text-green-600">675M€</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">plan recuperación</div>
                </div>
              </div>

              {/* Bullets condensados */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <Waves className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <p className="text-base">{t("mar_menor_bullet_laguna")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <p className="text-base">{t("mar_menor_bullet_crisis")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <Shield className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <p className="text-base">{t("mar_menor_bullet_planes")}</p>
                </div>
              </div>

              {/* Quote destacado */}
              <div className="mt-8 p-6 rounded-xl bg-clay/5 border-l-4 border-clay">
                <p className="text-lg font-medium text-gray-800 italic">
                  "{t("mar_menor_quote_solucion")}"
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="relative h-[180px] rounded-2xl overflow-hidden">
                  <Image src="/images/slides/limonar_area_camper_mar_menor_3.webp" alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
                <div className="relative h-[240px] rounded-2xl overflow-hidden">
                  <Image src="/images/slides/limonar_area_camper_mar_menor_6.webp" alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="relative h-[240px] rounded-2xl overflow-hidden">
                  <Image src="/images/slides/AdobeStock_83679015.webp" alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
                <div className="relative h-[180px] rounded-2xl overflow-hidden">
                  <Image src="/images/slides/AdobeStock_47883789.webp" alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECO: Condensado y más directo */}
      <section className="relative min-h-[420px] lg:min-h-[480px] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/slides/limonar_area_camper_mar_menor_4.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-earth-deep/80 backdrop-blur-[1px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-clay-lt text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] mb-4 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
              {t("Enfoque ECO")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              {t("Eco Area Limonar y el Mar Menor: ecosistema, ecología y turismo responsable")}
            </h2>
            <div className="max-w-2xl mx-auto space-y-4 text-white/95 leading-relaxed text-base md:text-lg">
              <p>{t("mar_menor_eco_compromiso")}</p>
              <p>{t("mar_menor_eco_info")}</p>
            </div>
            <div className="mt-8">
              <LocalizedLink
                href="/reservar"
                className="inline-flex items-center gap-2 bg-clay hover:bg-clay-dk text-white font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-xl"
              >
                <Waves className="h-5 w-5" />
                {t("Reservar ahora")}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación condensada */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1 shadow-2xl">
              <Image
                src="/images/slides/limonar_area_camper_mar_menor_2.webp"
                alt={t("Paisaje del Mar Menor al atardecer")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white/90 text-sm backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full inline-flex">
                  <MapPin className="h-4 w-4" />
                  Los Nietos, Mar Menor, Murcia
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
                <MapPin className="h-4 w-4" />
                Geografía
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
                {t("Ubicación y geografía")}
              </h2>
              <ul className="space-y-3 text-gray-700 leading-relaxed mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-clay font-bold mt-1">•</span>
                  <span>{t("mar_menor_ubi_litoral")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-clay font-bold mt-1">•</span>
                  <span>{t("mar_menor_ubi_hipersalinas")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-clay font-bold mt-1">•</span>
                  <span>{t("mar_menor_ubi_semicerrada")}</span>
                </li>
              </ul>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "~135 km²", label: "Superficie" },
                  { value: "4-7 m", label: "Profundidad" },
                  { value: "42 PSU", label: "Salinidad" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-white border border-earth/10">
                    <div className="text-2xl font-heading font-extrabold text-clay mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidrología condensada */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
                <Droplets className="h-4 w-4" />
                Hidrología
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
                {t("Hidrología y química del agua: eutrofización crónica")}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-gray-800">{t("mar_menor_hidro_intro")}</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">→</span>
                    <span>{t("mar_menor_hidro_nitratos")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">→</span>
                    <span>{t("mar_menor_hidro_acuifero")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>{t("mar_menor_hidro_oxigeno")}</span>
                  </li>
                </ul>
                <p className="text-base text-gray-600 italic">{t("mar_menor_hidro_blooms")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="font-heading font-bold text-red-900">{t("mar_menor_card_crisis_title")}</h3>
                </div>
                <p className="text-sm text-red-800 leading-relaxed">{t("mar_menor_card_crisis_desc")}</p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                  <h3 className="font-heading font-bold text-blue-900">{t("mar_menor_card_oxigeno_title")}</h3>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">{t("mar_menor_card_oxigeno_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biodiversidad condensada */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <Leaf className="h-4 w-4" />
              {t("Naturaleza")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
              {t("Biodiversidad: especies clave y conservación")}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">{t("mar_menor_biodiv_comunidades")}</p>
              <div className="inline-flex flex-wrap items-center gap-4 text-red-600 font-bold text-sm justify-center">
                <span>{t("mar_menor_especies_fartet")}</span>
                <span>•</span>
                <span>{t("mar_menor_especies_nacra")}</span>
                <span>•</span>
                <span>{t("mar_menor_especies_caballito")}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Leaf, title: t("Praderas marinas"), desc: t("mar_menor_card_praderas"), color: "from-green-500 to-emerald-600" },
              { icon: Bird, title: t("Aves migratorias"), desc: t("mar_menor_card_aves"), color: "from-sky-500 to-blue-600" },
              { icon: Fish, title: t("Especies emblemáticas"), desc: t("mar_menor_card_especies"), color: "from-orange-500 to-amber-600" },
            ].map((item, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-white border-2 border-earth/10 hover:border-earth/30 transition-all shadow-sm hover:shadow-xl overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4 shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-heading font-extrabold text-earth text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia ambiental y cronología */}
      <section className="py-16 lg:py-24 bg-earth-deep text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-4 leading-tight">
              {t("Historia ambiental y cronología de la crisis")}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              {t("mar_menor_cronologia_title")}
            </p>
          </div>
          <div className="relative">
            {/* Línea temporal */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20 hidden lg:block" />
            
            <div className="space-y-8">
              {[
                { period: t("Años 70"), text: t("mar_menor_cronologia_1"), status: "ok" },
                { period: "1972-73", text: t("mar_menor_cronologia_2"), status: "neutral" },
                { period: "1979", text: t("mar_menor_cronologia_3"), status: "warning" },
                { period: "1980-90", text: t("mar_menor_cronologia_4"), status: "warning" },
                { period: t("Años 90"), text: t("mar_menor_cronologia_5"), status: "warning" },
                { period: "2015-16", text: t("mar_menor_cronologia_6"), status: "alert" },
                { period: "2019", text: t("mar_menor_cronologia_7"), status: "alert" },
                { period: "2021", text: t("mar_menor_cronologia_8"), status: "alert" },
                { period: "2022", text: t("mar_menor_cronologia_9"), status: "neutral" },
                { period: "2025", text: t("mar_menor_cronologia_10"), status: "neutral" },
              ].map((item, i) => (
                <div key={i} className="relative pl-0 lg:pl-20">
                  {/* Punto en la línea */}
                  <div className={`hidden lg:block absolute left-6 top-2 w-5 h-5 rounded-full border-4 ${
                    item.status === "ok" ? "bg-green-400 border-green-300" :
                    item.status === "alert" ? "bg-red-400 border-red-300" :
                    item.status === "warning" ? "bg-orange-400 border-orange-300" :
                    "bg-blue-400 border-blue-300"
                  }`} />
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === "ok" ? "bg-green-500/20 text-green-300" :
                        item.status === "alert" ? "bg-red-500/20 text-red-300" :
                        item.status === "warning" ? "bg-orange-500/20 text-orange-300" :
                        "bg-blue-500/20 text-blue-300"
                      }`}>
                        {item.period}
                      </div>
                      <p className="text-white/90 leading-relaxed flex-1">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Causas condensadas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="/images/slides/AdobeStock_85606851.webp"
                alt="Agricultura intensiva"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-red-600 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
                <AlertTriangle className="h-4 w-4" />
                {t("Contaminación")}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
                {t("Causas y fuentes de contaminación")}
              </h2>
              <p className="text-lg font-medium text-gray-800 mb-4">{t("mar_menor_causas_evidencia")}</p>
              <ul className="space-y-3 text-gray-700 leading-relaxed mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <span>{t("mar_menor_causas_nitratos")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <span>{t("mar_menor_causas_porcinas")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">•</span>
                  <span>{t("mar_menor_causas_superavit")}</span>
                </li>
              </ul>
              <div className="p-6 rounded-xl bg-red-50 border-2 border-red-200">
                <p className="text-sm text-red-900 font-bold">⚠️ {t("mar_menor_card_alerta_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impactos condensados */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <TrendingUp className="h-4 w-4" />
              {t("Impactos")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
              {t("Impactos ecológicos y socioeconómicos")}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border-2 border-earth/10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-heading font-extrabold text-earth text-xl">{t("Ecológicos")}</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_eco_1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_eco_2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_eco_3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_eco_4")}</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-white border-2 border-earth/10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-heading font-extrabold text-earth text-xl">{t("Socioeconómicos")}</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_socio_1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_socio_2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_socio_3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{t("mar_menor_impactos_socio_4")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Medidas condensadas - solo tabla con highlights */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <Shield className="h-4 w-4" />
              {t("Soluciones")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-6 leading-tight">
              {t("Medidas de gestión y restauración")}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">{t("mar_menor_medidas_intro")}</p>
            </div>
          </div>
          
          <div className="mt-12 bg-sand-lt rounded-2xl p-6 lg:p-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-earth/20">
                    <th className="text-left p-4 font-heading font-extrabold text-earth text-base">{t("mar_menor_tabla_medida")}</th>
                    <th className="text-left p-4 font-heading font-extrabold text-earth text-base">{t("mar_menor_tabla_coste")}</th>
                    <th className="text-left p-4 font-heading font-extrabold text-earth text-base">{t("mar_menor_tabla_efectividad")}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {[
                    { medida: t("mar_menor_tabla_r1_medida"), coste: t("mar_menor_tabla_r1_coste"), efect: t("mar_menor_tabla_r1_efect") },
                    { medida: t("mar_menor_tabla_r2_medida"), coste: t("mar_menor_tabla_r2_coste"), efect: t("mar_menor_tabla_r2_efect") },
                    { medida: t("mar_menor_tabla_r3_medida"), coste: t("mar_menor_tabla_r3_coste"), efect: t("mar_menor_tabla_r3_efect") },
                    { medida: t("mar_menor_tabla_r4_medida"), coste: t("mar_menor_tabla_r4_coste"), efect: t("mar_menor_tabla_r4_efect") },
                    { medida: t("mar_menor_tabla_r5_medida"), coste: t("mar_menor_tabla_r5_coste"), efect: t("mar_menor_tabla_r5_efect") },
                    { medida: t("mar_menor_tabla_r6_medida"), coste: t("mar_menor_tabla_r6_coste"), efect: t("mar_menor_tabla_r6_efect") },
                    { medida: t("mar_menor_tabla_r7_medida"), coste: t("mar_menor_tabla_r7_coste"), efect: t("mar_menor_tabla_r7_efect") },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-earth/10 hover:bg-white/50 transition-colors">
                      <td className="p-4 font-medium">{row.medida}</td>
                      <td className="p-4">{row.coste}</td>
                      <td className="p-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          row.efect.includes("Muy alta") ? "bg-green-100 text-green-800" :
                          row.efect.includes("Alta") ? "bg-blue-100 text-blue-800" :
                          row.efect.includes("Media") ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {row.efect}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Marco legal - super condensado */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <Shield className="h-4 w-4" />
              {t("Legislación")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-4 leading-tight">
              {t("Marco legal y responsabilidades")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { year: "2020", title: "Ley 3/2020", desc: "Recuperación y protección del Mar Menor", color: "bg-blue-500" },
              { year: "2022", title: "Personalidad jurídica", desc: "Primera laguna de Europa con derechos propios", color: "bg-green-500" },
              { year: "2024", title: "Interés general", desc: "Real Decreto del Consejo de Ministros", color: "bg-orange-500" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border-2 border-earth/10 hover:border-clay/30 transition-all shadow-sm hover:shadow-lg text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.color} text-white font-heading font-extrabold text-xl mb-4 shadow-lg`}>
                  {item.year}
                </div>
                <h3 className="font-heading font-extrabold text-earth mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datos - super condensado */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <BarChart3 className="h-4 w-4" />
              {t("Ciencia y datos")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-4 leading-tight">
              {t("Datos y monitoreo")}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">{t("mar_menor_datos_intro")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Droplets, label: t("Parámetros"), items: [t("Temperatura"), t("Salinidad"), t("Oxígeno"), t("Clorofila-a"), t("Nutrientes")] },
              { icon: Bird, label: t("Programas"), items: ["IEO-CSIC BELICH", t("Boyas oceanográficas"), "Sentinel-2", "MODIS"] },
              { icon: BarChart3, label: t("Datos abiertos"), items: ["Canal Mar Menor", t("Informes técnicos"), t("Series temporales"), "Copernicus"] },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-sand-lt border-2 border-earth/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-clay/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-clay" />
                  </div>
                  <h3 className="font-heading font-extrabold text-earth">{item.label}</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {item.items.map((subitem, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-clay">•</span>
                      {subitem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escenarios - más compacto */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-earth-deep to-earth text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-clay-lt text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <TrendingUp className="h-4 w-4" />
              {t("Futuro")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-4 leading-tight">
              {t("Escenarios futuros y alternativas de restauración")}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">{t("mar_menor_escenarios_intro")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: t("Optimista"), color: "from-green-500 to-emerald-600", icon: "✓", desc: t("mar_menor_escenarios_optimista") },
              { title: t("Intermedio"), color: "from-yellow-500 to-orange-500", icon: "~", desc: t("mar_menor_escenarios_intermedio") },
              { title: t("Pesimista"), color: "from-red-500 to-rose-600", icon: "✕", desc: t("mar_menor_escenarios_pesimista") },
            ].map((esc, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${esc.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${esc.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {esc.icon}
                    </div>
                    <h3 className="font-heading font-extrabold text-xl">{esc.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{esc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recomendaciones - compactas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-clay text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <Shield className="h-4 w-4" />
              {t("Acción prioritaria")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-4 leading-tight">
              {t("Recomendaciones prácticas prioritarias")}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">{t("mar_menor_recom_intro")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "1", priority: t("Alta"), text: t("mar_menor_recom_breve_1"), icon: AlertTriangle },
              { num: "2", priority: t("Alta"), text: t("mar_menor_recom_breve_2"), icon: Droplets },
              { num: "3", priority: t("Media-Alta"), text: t("mar_menor_recom_breve_3"), icon: Leaf },
              { num: "4", priority: t("Alta"), text: t("mar_menor_recom_breve_4"), icon: Shield },
              { num: "5", priority: t("Media"), text: t("mar_menor_recom_breve_5"), icon: TrendingUp },
              { num: "6", priority: t("Media"), text: t("mar_menor_recom_breve_6"), icon: Heart },
            ].map((item, i) => (
              <div key={i} className="group relative p-6 rounded-xl bg-sand-lt border-2 border-earth/10 hover:border-clay/30 transition-all shadow-sm hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-clay text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-lg">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${
                      item.priority === t("Alta") ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.priority}
                    </div>
                    <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 rounded-xl bg-clay/5 border-2 border-clay/20 text-center">
            <p className="text-gray-800 font-medium italic">{t("mar_menor_recom_urgencia")}</p>
          </div>
        </div>
      </section>

      {/* Turismo - condensado */}
      <section className="relative min-h-[480px] lg:min-h-[560px] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/slides/limonar_area_camper_mar_menor_6.webp"
            alt={t("Actividades y playas del Mar Menor")}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-deep/90 via-earth-deep/70 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-clay-lt text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-4">
              <Waves className="h-4 w-4" />
              {t("Turismo responsable")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight mb-6">
              {t("Turismo y qué hacer en el Mar Menor")}
            </h2>
            <p className="text-white/95 leading-relaxed text-base md:text-lg mb-6">
              {t("mar_menor_turismo_intro")}
            </p>
            <div className="flex flex-wrap gap-3">
              <LocalizedLink
                href="/reservar"
                className="inline-flex items-center gap-2 bg-clay hover:bg-clay-dk text-white font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-xl"
              >
                {t("Reservar ahora")}
              </LocalizedLink>
              <LocalizedLink
                href="/contacto"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/40 text-white font-bold px-8 py-4 rounded-full text-base hover:bg-white/30 transition-all"
              >
                {t("Contactar")}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final mejorado */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-olive to-earth text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-clay-lt text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] mb-6">
              <Heart className="h-4 w-4" />
              Eco Area Limonar
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-6 leading-tight">
              {t("Tu base junto al Mar Menor")}
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("Reserva tu parcela en Eco Area Limonar y descubre la laguna desde Los Nietos.")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <LocalizedLink
                href="/reservar"
                className="inline-flex items-center gap-2 bg-clay hover:bg-clay-dk text-white font-extrabold px-10 py-4 rounded-full text-lg transition-all shadow-2xl hover:scale-105"
              >
                <Waves className="h-5 w-5" />
                {t("Reservar ahora")}
              </LocalizedLink>
              <LocalizedLink
                href="/contacto"
                className="inline-flex items-center gap-2 bg-white text-earth font-bold px-10 py-4 rounded-full text-lg hover:bg-white/90 transition-all shadow-xl"
              >
                {t("Contactar")}
              </LocalizedLink>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Los Nietos, Cartagena
              </div>
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4" />
                5 min al Mar Menor
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
