import { Metadata } from "next";
import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/contact-form";
import { translateServer } from "@/lib/i18n/server-translation";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/contacto", locale);

  return {
    title: "Contact | Eco Area Limonar",
    description:
      "Contact Eco Area Limonar. Paraje El Limonar, Los Nietos, Cartagena - Murcia. We are here to answer any questions about your stay.",
    keywords:
      "contact eco area limonar, phone motorhome area Los Nietos, email camping Mar Menor",
    openGraph: {
      title: "Contact | Eco Area Limonar",
      description:
        "Contact us to book your pitch in the Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage() {
  const locale: Locale = "en";
  const t = (key: string) => translateServer(key, locale);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Contacta con nosotros")}
        subtitle={t(
          "Estamos aquí para ayudarte a planificar tu estancia perfecta"
        )}
        tag={`📍 ${t("Los Nietos, Cartagena")} · Mar Menor`}
        backgroundImage="/images/slides/limonar_area_camper_mar_menor_2.webp"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {[
              {
                label: t("Teléfono"),
                value: "+34 XXX XX XX XX",
                href: "tel:+34XXXXXXXXX",
                desc: t("Llámanos en horario de atención"),
                img: "/images/slides/limonar_area_camper_mar_menor_1.webp",
              },
              {
                label: t("Email"),
                value: "info@ecoarealimonar.com",
                href: "mailto:info@ecoarealimonar.com",
                desc: t("Te respondemos en menos de 24h"),
                img: "/images/slides/limonar_area_camper_mar_menor_5.webp",
              },
              {
                label: t("Dirección"),
                value: "Paraje El Limonar, s/n",
                extra: "30710 Los Nietos, Cartagena",
                href: "https://maps.google.com/?q=Eco+Area+Limonar+Los+Nietos+Cartagena",
                desc: t("Ver en Google Maps"),
                img: "/images/slides/limonar_area_camper_mar_menor_6.webp",
              },
              {
                label: t("Horario"),
                value: t("Todos los días"),
                extra: "08:00 – 22:00",
                desc: t("Recepción y atención al cliente"),
                img: "/images/slides/limonar_area_camper_mar_menor_4.webp",
              },
            ].map((item, i) => {
              const isLink = !!item.href;
              const Tag = isLink ? "a" : "div";
              const linkProps = isLink
                ? {
                    href: item.href,
                    target: item.href!.startsWith("http") ? "_blank" as const : undefined,
                    rel: item.href!.startsWith("http") ? "noopener noreferrer" : undefined,
                  }
                : {};

              return (
                <Tag
                  key={i}
                  {...linkProps}
                  className="group relative h-[220px] lg:h-[260px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/60 text-xs font-extrabold uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-heading font-extrabold text-white">
                      {item.value}
                    </p>
                    {item.extra && (
                      <p className="text-white/70 text-sm md:text-base">{item.extra}</p>
                    )}
                    <p className="text-white/40 text-xs md:text-sm mt-2">{item.desc}</p>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-earth mb-3">
                {t("Envíanos un mensaje")}
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                {t("Rellena el formulario y te responderemos lo antes posible")}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-earth mb-4">
            {t("¿Tienes preguntas?")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6">
            {t("Consulta nuestras preguntas frecuentes o contáctanos directamente")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <LocalizedLink
              href="/faqs"
              className="bg-earth text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-earth-deep transition-all"
            >
              {t("Ver FAQs")}
            </LocalizedLink>
            <LocalizedLink
              href="/reservar"
              className="bg-clay text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-clay-dk transition-all"
            >
              {t("Reservar parcela")}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
