import { Metadata } from "next";
import { FaqsClient } from "./faqs-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/faqs", locale);

  return {
    title: "Preguntas Frecuentes | Eco Area Limonar",
    description:
      "Resuelve tus dudas sobre tu estancia en Eco Area Limonar. Servicios, parcelas, tarifas, cancelaciones y todo lo que necesitas saber.",
    keywords:
      "preguntas frecuentes eco area limonar, dudas area autocaravanas, faqs camping Mar Menor",
    openGraph: {
      title: "Preguntas Frecuentes | Eco Area Limonar",
      description:
        "Resuelve todas tus dudas sobre tu estancia en el Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function FaqsPage() {
  return <FaqsClient />;
}
