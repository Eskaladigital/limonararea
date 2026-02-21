import { Metadata } from "next";
import { headers } from "next/headers";
import { ReservarClient } from "./reservar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";
import { baseUrl } from "@/lib/app-config";

// 🎯 SEO Metadata - Único y optimizado para /reservar
const RESERVAR_METADATA: Metadata = {
  title: "Reservar Parcela Online",
  description: "Reserva tu parcela en Eco Area Limonar online. Selecciona fechas, elige parcela y completa tu reserva. Área de autocaravanas en Los Nietos, Mar Menor.",
  keywords: "reservar parcela autocaravanas, área autocaravanas Los Nietos, Mar Menor, reserva online eco area limonar",
  openGraph: {
    title: "Reservar Parcela Online",
    description: "Reserva tu parcela en pocos pasos. Los Nietos, Mar Menor.",
    type: "website",
    url: `${baseUrl}/es/reservar`,
    siteName: "Eco Area Limonar",
    locale: "es_ES",
  },
  twitter: {
    card: "summary",
    title: "Reservar Parcela Online",
    description: "Reserva tu parcela en pocos pasos.",
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
  const locale = (headersList.get('x-detected-locale') || 'es') as Locale;
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

export default function ReservarPage() {
  return <ReservarClient />;
}
