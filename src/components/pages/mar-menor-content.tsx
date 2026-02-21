import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { translateServer } from "@/lib/i18n/server-translation";

interface MarMenorContentProps {
  locale: Locale;
}

export function MarMenorContent({ locale }: MarMenorContentProps) {
  const t = (key: string) => translateServer(key, locale);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("El Mar Menor")}
        subtitle={t("La mayor laguna salada de Europa: naturaleza, ecología y turismo en la costa de Murcia")}
        tag="🌊 Referencia · Ecología y turismo"
        backgroundImage="/images/slides/limonar_area_camper_mar_menor_4.webp"
        overlayOpacity={0.6}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
            {t("Referencia")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-earth mb-6 leading-tight">
            {t("Qué es el Mar Menor")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
            <p>
              {t("El Mar Menor es la mayor laguna litoral salada de Europa: unas 135 km² de agua en la costa mediterránea de Murcia (España), separada del mar abierto por el istmo de La Manga del Mar Menor. Tiene una profundidad media de unos 4 metros (máximo 7 m) y se comunica con el Mediterráneo por cinco golas o canales —El Estacio, Marchamalo y las Encañizadas—, que regulan la renovación del agua. En su interior destacan las cinco islas volcánicas: Sujeto, Perdiguera, Redonda, Ciervo y Barón, que protegen la laguna del oleaje y conforman un paisaje único.")}
            </p>
            <p>
              {t("Por su clima, sus aguas tranquilas y su entorno natural, el Mar Menor ha sido durante décadas un destino turístico y de ocio muy valorado: playas, deportes náuticos, baño en familia y una identidad paisajística y cultural inseparable de Murcia. Al mismo tiempo, es un ecosistema de alto valor ecológico —humedal, aves migratorias, praderas marinas y especies protegidas— que requiere conocimiento, respeto y medidas de conservación.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earth mb-6">
                {t("Ubicación y geografía")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("La laguna se sitúa en el sureste de la península ibérica, en la Región de Murcia. Rodeada por el Campo de Cartagena (huerta y agricultura), las salinas históricas de San Pedro y Marchamalo, y las poblaciones costeras (La Manga, Los Nietos, San Javier, Cartagena, etc.), el Mar Menor es un espacio singular: aguas hipersalinas por la evaporación, más cálidas y calmadas que el Mediterráneo, ideales para el baño y los deportes acuáticos.")}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t("El balance hídrico depende de la escorrentía continental (ramblas, drenajes), la lluvia y el intercambio con el mar a través de las golas. Esta semi-cerrazón hace que la laguna sea especialmente sensible a los aportes de nutrientes y a la calidad del agua, por lo que su conservación es una prioridad ambiental y turística.")}
              </p>
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
            {t("Naturaleza")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-earth mb-8 leading-tight">
            {t("Biodiversidad y especies emblemáticas")}
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              {t("El Mar Menor alberga una biodiversidad singular. Entre la vegetación sumergida destacan la Cymodocea nodosa y la macroalga Caulerpa prolifera, que históricamente formaron extensas praderas marinas —hábitat esencial para peces, moluscos y crustáceos— y que hoy son objeto de proyectos de restauración.")}
            </p>
            <p>
              {t("En fauna marina encontramos especies protegidas como el fartet (Aphanius iberus), pez endémico ibérico; la nacra (Pinna nobilis); y el caballito de mar del Mediterráneo (Hippocampus guttulatus). En aves, la zona húmeda atrae numerosas aves acuáticas migratorias y marinas. La laguna está incluida en Zonas de Especial Conservación (ZEC) y ZEPA.")}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: t("Praderas marinas"), desc: t("Cymodocea y Caulerpa, hábitat clave para la vida marina.") },
              { title: t("Aves migratorias"), desc: t("Gaviota de Audouin, charrancito y otras especies protegidas.") },
              { title: t("Especies emblemáticas"), desc: t("Fartet, nacra, caballito de mar y tortugas en paso.") },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-sand-lt border border-earth/10">
                <h3 className="font-heading font-bold text-earth mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("La costa del Mar Menor concentra una gran oferta turística: playas de aguas tranquilas y poco profundas, ideales para familias; vela, kayak, paddle surf y otras actividades náuticas; paseos en barco hasta las islas; cicloturismo y senderismo por el litoral; y una gastronomía basada en el pescado y el marisco de la zona. Poblaciones como Los Nietos, La Manga, Santiago de la Ribera, San Pedro del Pinatar o Cartagena ofrecen servicios y un ambiente mediterráneo muy apreciado.")}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t("Un turismo responsable —respetando las normas de las playas y espacios naturales, no vertiendo residuos y apoyando iniciativas locales— contribuye a mantener el Mar Menor como destino de referencia y a preservar su ecosistema para las generaciones futuras.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs md:text-sm font-extrabold text-earth uppercase tracking-[0.15em] mb-4">
            {t("Compromiso")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-earth mb-6 leading-tight">
            {t("Protección y recuperación del Mar Menor")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {t("En las últimas décadas el Mar Menor ha sufrido una fuerte presión por nutrientes procedentes sobre todo de la agricultura intensiva del Campo de Cartagena. La sociedad murciana y las administraciones han reaccionado con normativa y planes de actuación: Ley 3/2020, personalidad jurídica de la laguna, Consejo y Tutoría del Mar Menor, Plan Mar Menor 2025 y MAPMM, con inversiones en saneamiento, restauración de hábitats y proyectos de desnitrificación. Como área de autocaravanas a orillas del Mar Menor, en Eco Area Limonar queremos ser parte de esa referencia: dar a conocer la laguna, su valor natural y la importancia de cuidarla.")}
            </p>
          </div>
        </div>
      </section>

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
