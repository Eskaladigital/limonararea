import { Metadata } from "next";
import { GaleriaClient } from "@/components/pages/galeria-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/galeria", locale);

  return {
    title: "Gallery | Eco Area Limonar",
    description:
      "Photos and videos of the motorhome area in Los Nietos, Mar Menor. Discover our pitches and facilities.",
    keywords:
      "motorhome area gallery, Los Nietos photos, Mar Menor camping, Eco Area Limonar",
    openGraph: {
      title: "Gallery | Eco Area Limonar",
      description:
        "Photos and videos of the motorhome area in Los Nietos.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function GalleryPage() {
  return <GaleriaClient />;
}
