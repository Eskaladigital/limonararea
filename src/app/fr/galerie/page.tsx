import { Metadata } from "next";
import { GaleriaClient } from "@/components/pages/galeria-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/galeria", locale);

  return {
    title: "Galerie | Eco Area Limonar",
    description:
      "Photos et vidéos de l'aire de camping-cars à Los Nietos, Mar Menor. Découvrez nos emplacements et installations.",
    keywords:
      "galerie aire camping-car, photos Los Nietos, camping Mar Menor, Eco Area Limonar",
    openGraph: {
      title: "Galerie | Eco Area Limonar",
      description:
        "Photos et vidéos de l'aire de camping-cars à Los Nietos.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function GalleryPage() {
  return <GaleriaClient />;
}
