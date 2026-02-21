import { Metadata } from "next";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { MarMenorContent } from "@/components/pages/mar-menor-content";
import { getI18nTranslations } from "@/lib/translations/get-translations";
import marMenorEs from "@/lib/i18n/data/mar-menor-es.json";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/mar-menor", locale);

  return {
    title: "De Mar Menor | Lagune, natuur en toerisme | Eco Area Limonar",
    description:
      "Referentiegids voor de Mar Menor: de grootste zoutwaterlagune van Europa. Ecologie, biodiversiteit, verantwoord toerisme en wat te zien en doen aan de kust van de Mar Menor, Murcia.",
    keywords:
      "Mar Menor, zoutwaterlagune Europa, natuur Mar Menor, toerisme Mar Menor, Murcia, ecologie, biodiversiteit, La Manga, Los Nietos, Cartagena",
    openGraph: {
      title: "De Mar Menor | Natuur en toerisme | Eco Area Limonar",
      description:
        "De grootste zoutwaterlagune van Europa: ecologie, biodiversiteit en verantwoord toerisme in de Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function MarMenorPage() {
  const locale: Locale = "nl";
  const keys = Object.keys(marMenorEs as Record<string, string>);
  const translations = await getI18nTranslations(keys, locale, marMenorEs as Record<string, string>);
  const t = (key: string) => translations[key] ?? key;
  return <MarMenorContent locale={locale} t={t} />;
}
