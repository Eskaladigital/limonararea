import { Metadata } from "next";
import { GuiaCamperClient } from "@/app/es/guia-camper/guia-camper-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/guia-camper", locale);

  return {
    title: "Camper Gids | Eco Area Limonar",
    description:
      "Leer hoe u uw camper gebruikt: bedieningspaneel, watertanks, elektriciteit, verwarming, gas en meer. Praktische gids voor uw verblijf.",
    keywords:
      "camper gids, hoe gebruik je een camper, camper handleiding, camper bediening, eco area limonar, nl",
    openGraph: {
      title: "Camper Gids | Eco Area Limonar",
      description:
        "Alles wat u moet weten over hoe uw camper werkt.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CamperGuidePage() {
  return <GuiaCamperClient />;
}
