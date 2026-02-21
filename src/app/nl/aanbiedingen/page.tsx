import { Metadata } from "next";
import { OfertasClient } from "@/app/es/ofertas/ofertas-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/ofertas", locale);

  return {
    title: "Aanbiedingen en Deals | Eco Area Limonar",
    description:
      "Profiteer van onze speciale aanbiedingen op camperstandplaatsen. Seizoenskortingen, last minute deals en langverblijf aanbiedingen in Los Nietos, Mar Menor.",
    keywords:
      "aanbiedingen eco area limonar, camperstandplaats deals, Mar Menor aanbiedingen, camping Murcia deals, nl",
    openGraph: {
      title: "Aanbiedingen en Deals | Eco Area Limonar",
      description:
        "Speciale kortingen op camperstandplaatsen aan de Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function OffersPage() {
  return <OfertasClient />;
}
