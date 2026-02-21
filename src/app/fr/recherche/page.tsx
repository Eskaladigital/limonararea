import { Metadata } from "next";
import { BuscarClient } from "@/app/es/buscar/buscar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "fr";
  const alternates = buildCanonicalAlternates("/buscar", locale);

  return {
    title: "Search Pitch Availability | Eco Area Limonar",
    description: "Search and compare pitch availability for your stay dates. Book your pitch online at Eco Area Limonar, Los Nietos.",
    keywords: "search pitch availability, motorhome area availability, book pitch dates, eco area limonar",
    robots: {
      index: false,
      follow: true,
    },
    alternates,
  };
}

export default function SearchPage() {
  return <BuscarClient />;
}
