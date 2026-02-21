import { Metadata } from "next";
import { GaleriaClient } from "@/components/pages/galeria-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/galeria", locale);

  return {
    title: "Galerij | Eco Area Limonar",
    description:
      "Foto's en video's van de camperplaats in Los Nietos, Mar Menor. Ontdek onze standplaatsen en faciliteiten.",
    keywords:
      "camperplaats galerij, Los Nietos foto's, Mar Menor camping, Eco Area Limonar, nl",
    openGraph: {
      title: "Galerij | Eco Area Limonar",
      description:
        "Foto's en video's van de camperplaats in Los Nietos.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function GalleryPage() {
  return <GaleriaClient />;
}
