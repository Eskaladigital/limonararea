import { Metadata } from "next";
import { OfertasClient } from "@/app/es/ofertas/ofertas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/ofertas", locale);

  return {
    title: "Offres et promotions | Eco Area Limonar",
    description:
      "Profitez de nos offres spéciales sur les emplacements camping-car. Réductions saisonnières, offres de dernière minute et séjours longue durée à Los Nietos, Mar Menor.",
    keywords:
      "offres eco area limonar, promotions emplacements camping-car, offres Mar Menor, promotions camping Murcie",
    openGraph: {
      title: "Offres et promotions | Eco Area Limonar",
      description:
        "Réductions spéciales sur les emplacements camping-car au Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function OffersPage() {
  return <OfertasClient />;
}
