import { Metadata } from "next";
import { GuiaCamperClient } from "./guia-camper-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/guia-camper", locale);

  return {
    title: "Guía Camper | Eco Area Limonar",
    description:
      "Aprende a usar tu autocaravana: panel de control, depósitos de agua, electricidad, calefacción, gas y más. Guía práctica para tu estancia.",
    keywords:
      "guía camper, cómo usar autocaravana, manual camper, funcionamiento camper, eco area limonar",
    openGraph: {
      title: "Guía Camper | Eco Area Limonar",
      description:
        "Todo lo que necesitas saber sobre el funcionamiento de tu autocaravana.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function GuiaCamperPage() {
  return <GuiaCamperClient />;
}
