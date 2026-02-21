import { Metadata } from "next";
import { GuiaCamperClient } from "@/app/es/guia-camper/guia-camper-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/guia-camper", locale);

  return {
    title: "Camper Guide | Eco Area Limonar",
    description:
      "Learn how to use your motorhome: control panel, water tanks, electricity, heating, gas and more. Practical guide for your stay.",
    keywords:
      "camper guide, how to use motorhome, camper manual, motorhome operation, eco area limonar",
    openGraph: {
      title: "Camper Guide | Eco Area Limonar",
      description:
        "Everything you need to know about how your motorhome works.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CamperGuidePage() {
  return <GuiaCamperClient />;
}
