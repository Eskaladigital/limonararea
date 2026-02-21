import { Metadata } from "next";
import { GuiaCamperClient } from "@/app/es/guia-camper/guia-camper-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/guia-camper", locale);

  return {
    title: "Guide camping-car | Eco Area Limonar",
    description:
      "Apprenez à utiliser votre camping-car : panneau de contrôle, réservoirs d'eau, électricité, chauffage, gaz et plus. Guide pratique pour votre séjour.",
    keywords:
      "guide camping-car, comment utiliser camping-car, manuel camping-car, fonctionnement camping-car, eco area limonar",
    openGraph: {
      title: "Guide camping-car | Eco Area Limonar",
      description:
        "Tout ce que vous devez savoir sur le fonctionnement de votre camping-car.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "fr_FR",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CamperGuidePage() {
  return <GuiaCamperClient />;
}
