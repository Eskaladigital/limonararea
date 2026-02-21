import { Metadata } from "next";
import { headers } from "next/headers";
import { ReservarClient } from "./reservar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { baseUrl } from "@/lib/app-config";

const RESERVAR_METADATA: Metadata = {
  title: "Stellplatz online buchen | Eco Area Limonar",
  description: "Buchen Sie Ihren Stellplatz bei Eco Area Limonar online. Wählen Sie Daten, wählen Sie Ihren Stellplatz und schließen Sie Ihre Buchung ab. Wohnmobilstellplatz in Los Nietos, Mar Menor.",
  keywords: "Wohnmobil-Stellplatz buchen, Wohnmobilstellplatz Los Nietos, Mar Menor, online buchen Eco Area Limonar",
  openGraph: {
    title: "Stellplatz online buchen | Eco Area Limonar",
    description: "Buchen Sie Ihren Stellplatz in wenigen Schritten. Los Nietos, Mar Menor.",
    type: "website",
    url: `${baseUrl}/de/buchen`,
    siteName: "Eco Area Limonar",
    locale: "de_DE",
  },
  twitter: {
    card: "summary",
    title: "Stellplatz online buchen | Eco Area Limonar",
    description: "Buchen Sie Ihren Stellplatz in wenigen Schritten.",
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
  const locale = (headersList.get('x-detected-locale') || 'de') as Locale;
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
