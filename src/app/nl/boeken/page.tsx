import { Metadata } from "next";
import { headers } from "next/headers";
import { ReservarClient } from "./reservar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { baseUrl } from "@/lib/app-config";

const RESERVAR_METADATA: Metadata = {
  title: "Standplaats Online Boeken | Eco Area Limonar",
  description: "Boek uw standplaats bij Eco Area Limonar online. Selecteer data, kies uw standplaats en voltooi uw boeking. Camperterrein in Los Nietos, Mar Menor.",
  keywords: "standplaats boeken camper, camperterrein Los Nietos, Mar Menor, online boeken eco area limonar",
  openGraph: {
    title: "Standplaats Online Boeken | Eco Area Limonar",
    description: "Boek uw standplaats in enkele stappen. Los Nietos, Mar Menor.",
    type: "website",
    url: `${baseUrl}/nl/boeken`,
    siteName: "Eco Area Limonar",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary",
    title: "Standplaats Online Boeken | Eco Area Limonar",
    description: "Boek uw standplaats in enkele stappen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = (headersList.get('x-detected-locale') || 'nl') as Locale;
  const alternates = buildCanonicalAlternates('/reservar', locale);

  return {
    ...RESERVAR_METADATA,
    alternates,
    openGraph: {
      ...(RESERVAR_METADATA.openGraph || {}),
      url: alternates.canonical,
    },
  };
}

export default function BookPage() {
  return <ReservarClient />;
}
