import { Metadata } from "next";
import { FaqsClient } from "@/app/es/faqs/faqs-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/faqs", locale);

  return {
    title: "Veelgestelde Vragen | Eco Area Limonar",
    description:
      "Los uw twijfels op over uw verblijf bij Eco Area Limonar. Diensten, standplaatsen, tarieven, annuleringen en alles wat u moet weten.",
    keywords:
      "faq eco area limonar, camperplaats vragen, veelgestelde vragen camping Mar Menor, nl",
    openGraph: {
      title: "Veelgestelde Vragen | Eco Area Limonar",
      description:
        "Los al uw twijfels op over uw verblijf aan de Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function FaqsPage() {
  return <FaqsClient />;
}
