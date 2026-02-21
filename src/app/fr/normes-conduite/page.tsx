import { Metadata } from "next";
import { NormasConductaClient } from "@/components/pages/normas-conducta-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/normas-conducta", locale);

  return {
    title: "Normes de conduite | Eco Area Limonar",
    description:
      "Règles de vie et bon usage de l'aire de camping-cars. Respect, calme et soin de l'environnement à Los Nietos, Mar Menor.",
    keywords:
      "règles aire camping-car, conduite camping, normes stationnement, Eco Area Limonar, Los Nietos",
    openGraph: {
      title: "Normes de conduite | Eco Area Limonar",
      description:
        "Règles de vie et bon usage de l'aire de camping-cars.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CodeOfConductPage() {
  return <NormasConductaClient />;
}
