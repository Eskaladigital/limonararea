import { Metadata } from "next";
import { NormasConductaClient } from "@/components/pages/normas-conducta-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/normas-conducta", locale);

  return {
    title: "Code of Conduct | Eco Area Limonar",
    description:
      "Rules of coexistence and proper use of the motorhome area. Respect, quiet hours and environmental care in Los Nietos, Mar Menor.",
    keywords:
      "motorhome area rules, camping conduct, overnight rules, Eco Area Limonar, Los Nietos",
    openGraph: {
      title: "Code of Conduct | Eco Area Limonar",
      description:
        "Rules of coexistence and proper use of the motorhome area.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function CodeOfConductPage() {
  return <NormasConductaClient />;
}
