import { Metadata } from "next";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { MarMenorContent } from "@/components/pages/mar-menor-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/mar-menor", locale);

  return {
    title: "The Mar Menor | Lagoon, nature and tourism | Eco Area Limonar",
    description:
      "Reference guide to the Mar Menor: Europe's largest saltwater lagoon. Ecology, biodiversity, responsible tourism and what to see and do on the Mar Menor coast, Murcia.",
    keywords:
      "Mar Menor, saltwater lagoon Europe, nature Mar Menor, tourism Mar Menor, Murcia, ecology, biodiversity, La Manga, Los Nietos, Cartagena",
    openGraph: {
      title: "The Mar Menor | Nature and tourism | Eco Area Limonar",
      description:
        "Europe's largest saltwater lagoon: ecology, biodiversity and responsible tourism in the Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function MarMenorPage() {
  return <MarMenorContent locale="en" />;
}
