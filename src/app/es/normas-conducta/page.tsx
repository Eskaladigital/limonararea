import { Metadata } from "next";
import { NormasConductaClient } from "@/components/pages/normas-conducta-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "es";
  const alternates = buildCanonicalAlternates("/normas-conducta", locale);

  return {
    title: "Normas de conducta | Eco Area Limonar",
    description:
      "Normas de convivencia y buen uso del área de autocaravanas. Respeto, silencio y cuidado del entorno en Los Nietos, Mar Menor.",
    keywords:
      "normas área autocaravanas, conducta camping, reglas pernocta, Eco Area Limonar, Los Nietos",
    openGraph: {
      title: "Normas de conducta | Eco Area Limonar",
      description:
        "Normas de convivencia y buen uso del área de autocaravanas.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "es_ES",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function NormasConductaPage() {
  return <NormasConductaClient />;
}
