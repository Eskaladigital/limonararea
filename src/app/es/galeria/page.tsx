import { Metadata } from "next";
import { GaleriaClient } from "@/components/pages/galeria-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/galeria", locale);

  return {
    title: "Galería | Eco Area Limonar",
    description:
      "Fotos y vídeos del área de autocaravanas en Los Nietos, Mar Menor. Conoce nuestras parcelas e instalaciones.",
    keywords:
      "galería área autocaravanas, fotos Los Nietos, Mar Menor camping, Eco Area Limonar",
    openGraph: {
      title: "Galería | Eco Area Limonar",
      description:
        "Fotos y vídeos del área de autocaravanas en Los Nietos.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function GaleriaPage() {
  return <GaleriaClient />;
}
