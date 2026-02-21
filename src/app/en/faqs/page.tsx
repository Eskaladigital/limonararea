import { Metadata } from "next";
import { FaqsClient } from "@/app/es/faqs/faqs-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/faqs", locale);

  return {
    title: "Frequently Asked Questions | Eco Area Limonar",
    description:
      "Resolve your doubts about your stay at Eco Area Limonar. Services, pitches, rates, cancellations and everything you need to know.",
    keywords:
      "faq eco area limonar, motorhome area questions, faqs camping Mar Menor",
    openGraph: {
      title: "Frequently Asked Questions | Eco Area Limonar",
      description:
        "Resolve all your doubts about your stay at the Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function FaqsPage() {
  return <FaqsClient />;
}
