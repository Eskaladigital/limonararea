import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { translateServer } from "@/lib/i18n/server-translation";

interface MarMenorContentProps {
  locale: Locale;
  /** Si se pasa, se usan estas traducciones (p. ej. desde content_translations); si no, translateServer */
  t?: (key: string) => string;
}

export function MarMenorContent({ locale, t: tProp }: MarMenorContentProps) {
  const t = tProp ?? ((key: string) => translateServer(key, locale));

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("El Mar Menor")}
        subtitle={t("La mayor laguna salada de Europa: naturaleza, ecología y turismo en la costa de Murcia")}
        tag="🌊 Referencia · Ecología y turismo"
        backgroundImage="/images/slides/limonar_area_camper_mar_menor_1.webp"
        overlayOpacity={0.6}
      />

      {/* Resumen ejecutivo — ecosistema y crisis */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
            {t("Referencia")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-earth mb-6 leading-tight">
            {t("Qué es el Mar Menor")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
            <p>{t("mar_menor_resumen_p1")}</p>
            <p>{t("mar_menor_resumen_p2")}</p>
            <p>{t("mar_menor_resumen_p3")}</p>
          </div>
        </div>
      </section>

      {/* Ubicación y geografía */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
                {t("Ubicación y geografía")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t("mar_menor_ubicacion_p1")}</p>
              <p className="text-gray-600 leading-relaxed">{t("mar_menor_ubicacion_p2")}</p>
            </div>
            <div className="relative h-[320px] lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/slides/limonar_area_camper_mar_menor_2.webp"
                alt={t("Paisaje del Mar Menor al atardecer")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hidrología y química — eutrofización */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Hidrología y química del agua: eutrofización crónica")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_hidrologia_p1")}</p>
            <p>{t("mar_menor_hidrologia_p2")}</p>
          </div>
        </div>
      </section>

      {/* Biodiversidad en profundidad */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
            {t("Naturaleza")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-earth mb-6 leading-tight">
            {t("Biodiversidad: especies clave y conservación")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_biodiv_p1")}</p>
            <p>{t("mar_menor_biodiv_p2")}</p>
            <p>{t("mar_menor_biodiv_p3")}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: t("Praderas marinas"), desc: t("mar_menor_card_praderas") },
              { title: t("Aves migratorias"), desc: t("mar_menor_card_aves") },
              { title: t("Especies emblemáticas"), desc: t("mar_menor_card_especies") },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-earth/10 shadow-sm">
                <h3 className="font-heading font-bold text-earth mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia ambiental y cronología */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Historia ambiental y cronología de la crisis")}
          </h2>
          <ul className="space-y-4 text-gray-600 leading-relaxed list-none">
            <li>{t("mar_menor_cronologia_1")}</li>
            <li>{t("mar_menor_cronologia_2")}</li>
            <li>{t("mar_menor_cronologia_3")}</li>
            <li>{t("mar_menor_cronologia_4")}</li>
            <li>{t("mar_menor_cronologia_5")}</li>
            <li>{t("mar_menor_cronologia_6")}</li>
            <li>{t("mar_menor_cronologia_7")}</li>
            <li>{t("mar_menor_cronologia_8")}</li>
            <li>{t("mar_menor_cronologia_9")}</li>
            <li>{t("mar_menor_cronologia_10")}</li>
          </ul>
        </div>
      </section>

      {/* Causas y fuentes de contaminación */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Causas y fuentes de contaminación")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_causas_p1")}</p>
            <p>{t("mar_menor_causas_p2")}</p>
            <p>{t("mar_menor_causas_p3")}</p>
          </div>
        </div>
      </section>

      {/* Impactos ecológicos y socioeconómicos */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Impactos ecológicos y socioeconómicos")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_impactos_p1")}</p>
            <p>{t("mar_menor_impactos_p2")}</p>
            <p>{t("mar_menor_impactos_p3")}</p>
          </div>
        </div>
      </section>

      {/* Medidas de gestión y restauración */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Medidas de gestión y restauración")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_medidas_p1")}</p>
            <p>{t("mar_menor_medidas_p2")}</p>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border border-earth/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-earth/10">
                  <th className="text-left p-3 font-heading font-bold text-earth">{t("mar_menor_tabla_medida")}</th>
                  <th className="text-left p-3 font-heading font-bold text-earth">{t("mar_menor_tabla_coste")}</th>
                  <th className="text-left p-3 font-heading font-bold text-earth">{t("mar_menor_tabla_efectividad")}</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r1_medida")}</td><td className="p-3">{t("mar_menor_tabla_r1_coste")}</td><td className="p-3">{t("mar_menor_tabla_r1_efect")}</td></tr>
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r2_medida")}</td><td className="p-3">{t("mar_menor_tabla_r2_coste")}</td><td className="p-3">{t("mar_menor_tabla_r2_efect")}</td></tr>
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r3_medida")}</td><td className="p-3">{t("mar_menor_tabla_r3_coste")}</td><td className="p-3">{t("mar_menor_tabla_r3_efect")}</td></tr>
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r4_medida")}</td><td className="p-3">{t("mar_menor_tabla_r4_coste")}</td><td className="p-3">{t("mar_menor_tabla_r4_efect")}</td></tr>
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r5_medida")}</td><td className="p-3">{t("mar_menor_tabla_r5_coste")}</td><td className="p-3">{t("mar_menor_tabla_r5_efect")}</td></tr>
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r6_medida")}</td><td className="p-3">{t("mar_menor_tabla_r6_coste")}</td><td className="p-3">{t("mar_menor_tabla_r6_efect")}</td></tr>
                <tr className="border-t border-earth/10"><td className="p-3">{t("mar_menor_tabla_r7_medida")}</td><td className="p-3">{t("mar_menor_tabla_r7_coste")}</td><td className="p-3">{t("mar_menor_tabla_r7_efect")}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Marco legal */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Marco legal y responsabilidades")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_marco_p1")}</p>
            <p>{t("mar_menor_marco_p2")}</p>
          </div>
        </div>
      </section>

      {/* Datos y monitoreo */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Datos y monitoreo")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_datos_p1")}</p>
            <p>{t("mar_menor_datos_p2")}</p>
          </div>
        </div>
      </section>

      {/* Escenarios futuros */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Escenarios futuros y alternativas de restauración")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_escenarios_p1")}</p>
            <p>{t("mar_menor_escenarios_p2")}</p>
            <p>{t("mar_menor_escenarios_p3")}</p>
            <p>{t("mar_menor_escenarios_p4")}</p>
          </div>
        </div>
      </section>

      {/* Recomendaciones prioritarias */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
            {t("Recomendaciones prácticas prioritarias")}
          </h2>
          <ol className="space-y-3 text-gray-600 leading-relaxed list-decimal list-inside">
            <li>{t("mar_menor_recom_1")}</li>
            <li>{t("mar_menor_recom_2")}</li>
            <li>{t("mar_menor_recom_3")}</li>
            <li>{t("mar_menor_recom_4")}</li>
            <li>{t("mar_menor_recom_5")}</li>
            <li>{t("mar_menor_recom_6")}</li>
          </ol>
          <p className="mt-6 text-gray-600 leading-relaxed">{t("mar_menor_recom_final")}</p>
        </div>
      </section>

      {/* ECO: Eco Area Limonar y el ecosistema */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
            {t("Enfoque ECO")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-earth mb-6 leading-tight">
            {t("Eco Area Limonar y el Mar Menor: ecosistema, ecología y turismo responsable")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("mar_menor_eco_p1")}</p>
            <p>{t("mar_menor_eco_p2")}</p>
            <p>{t("mar_menor_eco_p3")}</p>
            <p>{t("mar_menor_eco_p4")}</p>
          </div>
        </div>
      </section>

      {/* Turismo y qué hacer */}
      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="relative h-[320px] lg:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/slides/limonar_area_camper_mar_menor_6.webp"
                alt={t("Actividades y playas del Mar Menor")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
                {t("Turismo y qué hacer en el Mar Menor")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t("mar_menor_turismo_p1")}</p>
              <p className="text-gray-600 leading-relaxed">{t("mar_menor_turismo_p2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[340px] lg:h-[400px] overflow-hidden">
        <Image
          src="/images/slides/limonar_area_camper_mar_menor_5.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-earth-deep/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold mb-4">
            {t("Tu base junto al Mar Menor")}
          </h2>
          <p className="text-white/80 max-w-lg mb-8">
            {t("Reserva tu parcela en Eco Area Limonar y descubre la laguna desde Los Nietos.")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <LocalizedLink
              href="/reservar"
              className="bg-clay text-white font-extrabold px-8 py-3 rounded-full text-sm hover:bg-clay-dk transition-all"
            >
              {t("Reservar ahora")}
            </LocalizedLink>
            <LocalizedLink
              href="/contacto"
              className="bg-white/20 backdrop-blur border border-white/40 text-white font-bold px-8 py-3 rounded-full text-sm hover:bg-white/30 transition-all"
            >
              {t("Contactar")}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
