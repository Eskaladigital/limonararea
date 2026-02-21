import { Metadata } from "next";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { MarMenorContent } from "@/components/pages/mar-menor-content";
import { getI18nTranslations } from "@/lib/translations/get-translations";
import marMenorEs from "@/lib/i18n/data/mar-menor-es.json";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/mar-menor", locale);

  return {
    title: "Le Mar Menor | Lagune, nature et tourisme | Eco Area Limonar",
    description:
      "Guide de référence du Mar Menor : la plus grande lagune salée d'Europe. Écologie, biodiversité, tourisme responsable et que voir et faire sur la côte du Mar Menor, Murcie.",
    keywords:
      "Mar Menor, lagune salée Europe, nature Mar Menor, tourisme Mar Menor, Murcie, écologie, biodiversité, La Manga, Los Nietos, Cartagena",
    openGraph: {
      title: "Le Mar Menor | Nature et tourisme | Eco Area Limonar",
      description:
        "La plus grande lagune salée d'Europe : écologie, biodiversité et tourisme responsable au Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function MarMenorPage() {
  const locale: Locale = "fr";
  const keys = Object.keys(marMenorEs as Record<string, string>);
  const translations = await getI18nTranslations(keys, locale, marMenorEs as Record<string, string>);
  const t = (key: string) => translations[key] ?? key;
  return <MarMenorContent locale={locale} t={t} />;
}
