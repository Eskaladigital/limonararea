import { Metadata } from "next";
import { TarifasClient } from "@/app/es/tarifas/tarifas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/tarifas", locale);

  return {
    title: "Preise und Tarife | Eco Area Limonar",
    description:
      "Informieren Sie sich über unsere Wohnmobil-Stellplatzpreise in Los Nietos, Mar Menor. Preise ab 95€/Tag je nach Saison. Langzeitrabatte verfügbar.",
    keywords:
      "Preise Eco Area Limonar, Wohnmobil-Stellplatz Preise, Camping Mar Menor Tarife, Los Nietos Preise",
    openGraph: {
      title: "Preise und Tarife | Eco Area Limonar",
      description:
        "Transparente Preise ab 95€/Tag. Rabatte bis -30% für Langzeitaufenthalte. Alles inklusive.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function RatesPage() {
  return <TarifasClient />;
}
