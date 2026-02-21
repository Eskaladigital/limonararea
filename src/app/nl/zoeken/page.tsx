import { Metadata } from "next";
import { BuscarClient } from "@/app/es/buscar/buscar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/buscar", locale);

  return {
    title: "Zoek Beschikbaarheid Standplaatsen | Eco Area Limonar",
    description: "Zoek en vergelijk beschikbaarheid van standplaatsen voor uw verblijfdata. Boek uw standplaats online bij Eco Area Limonar, Los Nietos.",
    keywords: "zoek standplaats beschikbaarheid, camperplaats beschikbaarheid, boek standplaats data, eco area limonar",
    robots: {
      index: false,
      follow: true,
    },
    alternates,
  };
}

export default function ZoekenPage() {
  return <BuscarClient />;
}
