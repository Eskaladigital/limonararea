import { Metadata } from "next";
import { GuiaCamperClient } from "@/app/es/guia-camper/guia-camper-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/guia-camper", locale);

  return {
    title: "Wohnmobil-Guide | Eco Area Limonar",
    description:
      "Erfahren Sie, wie Sie Ihr Wohnmobil bedienen: Bedienfeld, Wassertanks, Strom, Heizung, Gas und mehr. Praktischer Leitfaden für Ihren Aufenthalt.",
    keywords:
      "Wohnmobil-Guide, Wohnmobil Bedienung, Camper Anleitung, Wohnmobil Betrieb, Eco Area Limonar",
    openGraph: {
      title: "Wohnmobil-Guide | Eco Area Limonar",
      description:
        "Alles, was Sie über die Bedienung Ihres Wohnmobils wissen müssen.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CamperGuidePage() {
  return <GuiaCamperClient />;
}
