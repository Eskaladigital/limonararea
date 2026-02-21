import { Metadata } from "next";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { MarMenorContent } from "@/components/pages/mar-menor-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/mar-menor", locale);

  return {
    title: "El Mar Menor | Laguna, naturaleza y turismo | Eco Area Limonar",
    description:
      "Guía de referencia del Mar Menor: la mayor laguna salada de Europa. Ecología, biodiversidad, turismo responsable y qué ver y hacer en la costa del Mar Menor, Murcia.",
    keywords:
      "Mar Menor, laguna salada Europa, naturaleza Mar Menor, turismo Mar Menor, Murcia, ecología, biodiversidad, La Manga, Los Nietos, Cartagena",
    openGraph: {
      title: "El Mar Menor | Naturaleza y turismo | Eco Area Limonar",
      description:
        "La mayor laguna salada de Europa: ecología, biodiversidad y turismo responsable en el Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default async function MarMenorPage() {
  return <MarMenorContent locale="es" />;
}
