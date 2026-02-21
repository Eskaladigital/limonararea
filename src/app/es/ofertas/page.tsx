import { Metadata } from "next";
import { OfertasClient } from "./ofertas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/ofertas", locale);

  return {
    title: "Ofertas y Descuentos | Eco Area Limonar",
    description:
      "Aprovecha nuestras ofertas especiales en parcelas para autocaravanas. Descuentos de temporada, última hora y estancias largas en Los Nietos, Mar Menor.",
    keywords:
      "ofertas eco area limonar, descuentos parcelas autocaravanas, ofertas Mar Menor, camping ofertas Murcia",
    openGraph: {
      title: "Ofertas y Descuentos | Eco Area Limonar",
      description:
        "Descuentos especiales en parcelas para autocaravanas en el Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function OfertasPage() {
  return <OfertasClient />;
}
