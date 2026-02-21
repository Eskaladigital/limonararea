import { Metadata } from "next";
import { TarifasClient } from "@/app/es/tarifas/tarifas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/tarifas", locale);

  return {
    title: "Tarieven en Prijzen | Eco Area Limonar",
    description:
      "Bekijk onze camperstandplaats tarieven in Los Nietos, Mar Menor. Prijzen vanaf 95€/dag afhankelijk van het seizoen. Langverblijf kortingen beschikbaar.",
    keywords:
      "tarieven eco area limonar, camperstandplaats prijzen, camping Mar Menor tarieven, Los Nietos prijzen, nl",
    openGraph: {
      title: "Tarieven en Prijzen | Eco Area Limonar",
      description:
        "Transparante prijzen vanaf 95€/dag. Kortingen tot -30% voor lang verblijf. Alles inbegrepen.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function RatesPage() {
  return <TarifasClient />;
}
