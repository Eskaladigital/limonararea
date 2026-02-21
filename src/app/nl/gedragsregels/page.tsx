import { Metadata } from "next";
import { NormasConductaClient } from "@/components/pages/normas-conducta-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/normas-conducta", locale);

  return {
    title: "Gedragsregels | Eco Area Limonar",
    description:
      "Regels voor samenleven en correct gebruik van de camperplaats. Respect, stilte-uren en milieuzorg in Los Nietos, Mar Menor.",
    keywords:
      "camperplaats regels, camping gedragsregels, overnachtingsregels, Eco Area Limonar, Los Nietos, nl",
    openGraph: {
      title: "Gedragsregels | Eco Area Limonar",
      description:
        "Regels voor samenleven en correct gebruik van de camperplaats.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CodeOfConductPage() {
  return <NormasConductaClient />;
}
