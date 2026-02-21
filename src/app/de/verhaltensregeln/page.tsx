import { Metadata } from "next";
import { NormasConductaClient } from "@/components/pages/normas-conducta-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/normas-conducta", locale);

  return {
    title: "Verhaltensregeln | Eco Area Limonar",
    description:
      "Zusammenlebensregeln und ordnungsgemäße Nutzung des Wohnmobilstellplatzes. Respekt, Ruhezeiten und Umweltschutz in Los Nietos, Mar Menor.",
    keywords:
      "Wohnmobilstellplatz Regeln, Camping Verhaltensregeln, Übernachtungsregeln, Eco Area Limonar, Los Nietos",
    openGraph: {
      title: "Verhaltensregeln | Eco Area Limonar",
      description:
        "Zusammenlebensregeln und ordnungsgemäße Nutzung des Wohnmobilstellplatzes.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CodeOfConductPage() {
  return <NormasConductaClient />;
}
