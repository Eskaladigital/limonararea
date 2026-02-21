import { Metadata } from "next";
import { BuscarClient } from "@/app/es/buscar/buscar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/buscar", locale);

  return {
    title: "Stellplatzverfügbarkeit suchen | Eco Area Limonar",
    description: "Suchen und vergleichen Sie die Stellplatzverfügbarkeit für Ihre Aufenthaltsdaten. Buchen Sie Ihren Stellplatz online bei Eco Area Limonar, Los Nietos.",
    keywords: "Stellplatzverfügbarkeit suchen, Wohnmobil-Stellplatz Verfügbarkeit, Stellplatz Termine buchen, Eco Area Limonar",
    robots: {
      index: false,
      follow: true,
    },
    alternates,
  };
}

export default function SearchPage() {
  return <BuscarClient />;
}
