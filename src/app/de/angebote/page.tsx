import { Metadata } from "next";
import { OfertasClient } from "@/app/es/ofertas/ofertas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/ofertas", locale);

  return {
    title: "Angebote und Aktionen | Eco Area Limonar",
    description:
      "Nutzen Sie unsere Sonderangebote für Wohnmobil-Stellplätze. Saisonrabatte, Last-Minute-Angebote und Langzeitangebote in Los Nietos, Mar Menor.",
    keywords:
      "Angebote Eco Area Limonar, Wohnmobil-Stellplatz Aktionen, Mar Menor Angebote, Camping Murcia Rabatte",
    openGraph: {
      title: "Angebote und Aktionen | Eco Area Limonar",
      description:
        "Sonderrabatte auf Wohnmobil-Stellplätze am Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function OffersPage() {
  return <OfertasClient />;
}
