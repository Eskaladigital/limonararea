import { Metadata } from "next";
import { FaqsClient } from "@/app/es/faqs/faqs-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/faqs", locale);

  return {
    title: "Häufig gestellte Fragen | Eco Area Limonar",
    description:
      "Klären Sie Ihre Fragen zu Ihrem Aufenthalt im Eco Area Limonar. Services, Stellplätze, Tarife, Stornierungen und alles, was Sie wissen müssen.",
    keywords:
      "FAQ Eco Area Limonar, Wohnmobilstellplatz Fragen, FAQs Camping Mar Menor",
    openGraph: {
      title: "Häufig gestellte Fragen | Eco Area Limonar",
      description:
        "Klären Sie alle Ihre Fragen zu Ihrem Aufenthalt am Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function FaqsPage() {
  return <FaqsClient />;
}
