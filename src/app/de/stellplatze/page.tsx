import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ParcelListClient } from "@/components/parcel/parcel-list-client";
import { LocalizedLink } from "@/components/localized-link";
import { PageHero } from "@/components/layout/page-hero";
import { translateServer } from "@/lib/i18n/server-translation";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { sortParcelEquipment } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/parcelas", locale);

  return {
    title: "Wohnmobil-Stellplätze | Eco Area Limonar",
    description:
      "Entdecken Sie unsere geräumigen und ausgestatteten Stellplätze in Los Nietos, Mar Menor. Strom, Wasser, WLAN und alle Leistungen inklusive. Ab 95€/Tag.",
    keywords:
      "Wohnmobil-Stellplätze, Camping Mar Menor, Eco Area Limonar Stellplätze, Los Nietos Stellplätze, Cartagena",
    openGraph: {
      title: "Wohnmobil-Stellplätze | Eco Area Limonar",
      description:
        "Geräumige Stellplätze mit allen Leistungen am Mar Menor. Ab 95€/Tag.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

async function loadParcels() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("parcels")
    .select(
      `*, parcel_images:parcel_images(*), parcel_equipment(id, equipment(*))`
    )
    .eq("is_for_rent", true)
    .neq("status", "inactive")
    .order("internal_code");

  if (error || !data) return [];

  return data.map((p) => {
    const sorted = (p.parcel_images as any[] || []).sort((a: any, b: any) => {
      if (a.is_primary) return -1;
      if (b.is_primary) return 1;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
    const main = sorted.find((i: any) => i.is_primary) || sorted[0];
    return {
      ...p,
      main_image: main,
      images: sorted.slice(0, 3).map((i: any) => i.image_url),
      parcel_equipment: sortParcelEquipment(
        (p as any).parcel_equipment?.map((pe: any) => pe.equipment) || []
      ),
    };
  });
}

export const revalidate = 3600;

export default async function ParcelsPage() {
  const locale: Locale = "de";
  const t = (key: string) => translateServer(key, locale);
  const parcels = await loadParcels();

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Nuestras Parcelas")}
        subtitle={t(
          "Amplias, equipadas y a pocos minutos del Mar Menor"
        )}
        tag={`☀️ ${t("Los Nietos")} · Mar Menor · ${t("320 días de sol")}`}
        backgroundImage="/images/slides/limonar_area_camper_mar_menor_6.webp"
      />

      <section className="bg-earth-deep py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { icon: "⚡", label: t("Electricidad 16A") },
              { icon: "📶", label: t("WiFi fibra") },
              { icon: "🚿", label: t("Sanitarios") },
              { icon: "🔄", label: t("Vaciado incluido") },
              { icon: "🛡️", label: t("Seguridad 24h") },
              { icon: "🐾", label: t("Pet-friendly") },
            ].map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-white/80 text-xs md:text-sm font-semibold">
                <span className="text-base md:text-lg">{f.icon}</span> {f.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <ParcelListClient initialParcels={parcels} />
        </div>
      </section>

      <section className="relative h-[350px] lg:h-[450px] overflow-hidden">
        <Image
          src="/images/slides/limonar_area_camper_mar_menor_1.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-earth-deep/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold mb-3">
            {t("¿No encuentras lo que buscas?")}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-6 max-w-md">
            {t("Contáctanos y te ayudaremos a encontrar la parcela perfecta para ti.")}
          </p>
          <div className="flex gap-3">
            <LocalizedLink
              href="/contacto"
              className="bg-white text-earth font-extrabold px-8 py-3.5 rounded-full text-sm hover:shadow-xl transition-all"
            >
              {t("Contactar")}
            </LocalizedLink>
            <LocalizedLink
              href="/reservar"
              className="bg-clay text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-clay-dk transition-all"
            >
              {t("Reservar")}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
