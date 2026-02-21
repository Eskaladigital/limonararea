import { Metadata } from "next";
import { headers } from "next/headers";
import { ReservarClient } from "@/app/es/reservar/reservar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { baseUrl } from "@/lib/app-config";

const RESERVAR_METADATA: Metadata = {
  title: "Book Pitch Online | Eco Area Limonar",
  description: "Book your pitch at Eco Area Limonar online. Select dates, choose your pitch and complete your booking. Motorhome area in Los Nietos, Mar Menor.",
  keywords: "book motorhome pitch, motorhome area Los Nietos, Mar Menor, book online eco area limonar",
  openGraph: {
    title: "Book Pitch Online | Eco Area Limonar",
    description: "Book your pitch in a few steps. Los Nietos, Mar Menor.",
    type: "website",
    url: `${baseUrl}/fr/reserver`,
    siteName: "Eco Area Limonar",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary",
    title: "Book Pitch Online | Eco Area Limonar",
    description: "Book your pitch in a few steps.",
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
  const locale = (headersList.get('x-detected-locale') || 'fr') as Locale;
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
