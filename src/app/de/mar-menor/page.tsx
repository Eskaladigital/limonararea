import { Metadata } from "next";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { MarMenorContent } from "@/components/pages/mar-menor-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/mar-menor", locale);

  return {
    title: "Der Mar Menor | Lagune, Natur und Tourismus | Eco Area Limonar",
    description:
      "Referenzführer zum Mar Menor: Europas größte Salzwasserlagune. Ökologie, Artenvielfalt, nachhaltiger Tourismus und was man an der Küste des Mar Menor, Murcia, sehen und unternehmen kann.",
    keywords:
      "Mar Menor, Salzwasserlagune Europa, Natur Mar Menor, Tourismus Mar Menor, Murcia, Ökologie, Biodiversität, La Manga, Los Nietos, Cartagena",
    openGraph: {
      title: "Der Mar Menor | Natur und Tourismus | Eco Area Limonar",
      description:
        "Europas größte Salzwasserlagune: Ökologie, Artenvielfalt und nachhaltiger Tourismus am Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function MarMenorPage() {
  return <MarMenorContent locale="de" />;
}
