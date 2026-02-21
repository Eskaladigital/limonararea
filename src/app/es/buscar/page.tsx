import { Metadata } from "next";
import { BuscarClient } from "./buscar-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {}

// 🎯 SEO Metadata - Único y optimizado para /buscar
const BUSCAR_METADATA: Metadata = {
  title: "Buscar Disponibilidad de Parcelas",
  description: "Busca y compara la disponibilidad de parcelas para tus fechas de estancia. Reserva online tu parcela en Eco Area Limonar, Los Nietos.",
  keywords: "buscar parcela disponible, disponibilidad área autocaravanas, reservar parcela fechas, eco area limonar",
  robots: {
    index: false, // Página de resultados de búsqueda, no indexar
    follow: true,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale: Locale = 'es'; // Locale fijo
  
  const alternates = buildCanonicalAlternates('/buscar', locale);

  return {
    ...BUSCAR_METADATA,
    alternates,
    openGraph: {
      ...BUSCAR_METADATA,
      url: alternates.canonical,
    },
  };
}

export default async function LocaleBuscarPage({ params }: PageProps) {
  return <BuscarClient />;
}
