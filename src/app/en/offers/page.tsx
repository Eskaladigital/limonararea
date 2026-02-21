import { Metadata } from "next";
import { OfertasClient } from "@/app/es/ofertas/ofertas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/ofertas", locale);

  return {
    title: "Offers and Deals | Eco Area Limonar",
    description:
      "Take advantage of our special offers on motorhome pitches. Seasonal discounts, last minute deals and long-stay offers in Los Nietos, Mar Menor.",
    keywords:
      "offers eco area limonar, motorhome pitch deals, Mar Menor offers, camping Murcia deals",
    openGraph: {
      title: "Offers and Deals | Eco Area Limonar",
      description:
        "Special discounts on motorhome pitches at the Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function OffersPage() {
  return <OfertasClient />;
}
