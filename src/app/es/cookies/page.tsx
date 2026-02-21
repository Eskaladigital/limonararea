import { Metadata } from "next";
import { CookiesClient } from "./cookies-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {}

// 🎯 SEO Metadata - Página legal NO indexable
const COOKIES_METADATA: Metadata = {
  title: "Política de Cookies",
  description: "Información sobre las cookies que utilizamos en ecoarealimonar.com. Tipos de cookies, finalidad y cómo gestionar tus preferencias de privacidad.",
  keywords: "política cookies ecoarealimonar, cookies web, gestión cookies, privacidad ecoarealimonar",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale: Locale = 'es'; // Locale fijo
  
  const alternates = buildCanonicalAlternates('/cookies', locale);

  return {
    ...COOKIES_METADATA,
    alternates,
  };
}

// ⚡ ISR: Revalidar cada semana (contenido muy estático)
export const revalidate = 604800;

export default async function LocaleCookiesPage({ params }: PageProps) {
  return <CookiesClient />;
}
