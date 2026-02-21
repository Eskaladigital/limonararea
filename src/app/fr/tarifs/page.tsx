import { Metadata } from "next";
import { TarifasClient } from "@/app/es/tarifas/tarifas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/tarifas", locale);

  return {
    title: "Tarifs et prix | Eco Area Limonar",
    description:
      "Consultez nos tarifs d'emplacements camping-car à Los Nietos, Mar Menor. Prix à partir de 95€/jour selon la saison. Réductions longue durée disponibles.",
    keywords:
      "tarifs eco area limonar, prix emplacements camping-car, tarifs camping Mar Menor, prix Los Nietos",
    openGraph: {
      title: "Tarifs et prix | Eco Area Limonar",
      description:
        "Prix transparents à partir de 95€/jour. Réductions jusqu'à -30% pour les longs séjours. Tout inclus.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function RatesPage() {
  return <TarifasClient />;
}
