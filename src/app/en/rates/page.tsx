import { Metadata } from "next";
import { TarifasClient } from "@/app/es/tarifas/tarifas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/tarifas", locale);

  return {
    title: "Rates and Prices | Eco Area Limonar",
    description:
      "Check our motorhome pitch rates in Los Nietos, Mar Menor. Prices from 95€/day depending on season. Long-stay discounts available.",
    keywords:
      "rates eco area limonar, motorhome pitch prices, camping Mar Menor rates, Los Nietos prices",
    openGraph: {
      title: "Rates and Prices | Eco Area Limonar",
      description:
        "Transparent prices from 95€/day. Discounts up to -30% for long stays. All included.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function RatesPage() {
  return <TarifasClient />;
}
