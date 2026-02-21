import { Metadata } from "next";
import { FaqsClient } from "@/app/es/faqs/faqs-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/faqs", locale);

  return {
    title: "Questions fréquentes | Eco Area Limonar",
    description:
      "Résolvez vos doutes sur votre séjour à Eco Area Limonar. Services, emplacements, tarifs, annulations et tout ce que vous devez savoir.",
    keywords:
      "faq eco area limonar, questions aire camping-car, faqs camping Mar Menor",
    openGraph: {
      title: "Questions fréquentes | Eco Area Limonar",
      description:
        "Résolvez tous vos doutes sur votre séjour au Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function FaqsPage() {
  return <FaqsClient />;
}
