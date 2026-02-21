import { Metadata } from "next";
import { TarifasClient } from "./tarifas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/tarifas", locale);

  return {
    title: "Tarifas y Precios | Eco Area Limonar",
    description:
      "Consulta las tarifas de nuestras parcelas para autocaravanas en Los Nietos, Mar Menor. Precios desde 95€/día según temporada. Descuentos por estancias largas.",
    keywords:
      "tarifas eco area limonar, precios parcelas autocaravanas, camping Mar Menor precios, parcelas Los Nietos precio",
    openGraph: {
      title: "Tarifas y Precios | Eco Area Limonar",
      description:
        "Precios transparentes desde 95€/día. Descuentos hasta -30% por larga estancia. Todo incluido.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function TarifasPage() {
  return <TarifasClient />;
}
