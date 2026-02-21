import { Metadata } from "next";
import { GaleriaClient } from "@/components/pages/galeria-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/galeria", locale);

  return {
    title: "Galerie | Eco Area Limonar",
    description:
      "Fotos und Videos des Wohnmobilstellplatzes in Los Nietos, Mar Menor. Entdecken Sie unsere Stellplätze und Einrichtungen.",
    keywords:
      "Wohnmobilstellplatz Galerie, Los Nietos Fotos, Mar Menor Camping, Eco Area Limonar",
    openGraph: {
      title: "Galerie | Eco Area Limonar",
      description:
        "Fotos und Videos des Wohnmobilstellplatzes in Los Nietos.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function GalleryPage() {
  return <GaleriaClient />;
}
