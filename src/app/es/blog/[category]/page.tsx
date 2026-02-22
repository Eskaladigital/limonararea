import { Metadata } from "next";
import { BlogCategoryClient } from "./blog-category-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";

const categoryMeta: Record<string, { name: string; description: string }> = {
  rutas: {
    name: "Rutas en Camper",
    description: "Las mejores rutas en camper por España y Europa. Descubre destinos increíbles, consejos de viaje y experiencias únicas para tu próxima aventura.",
  },
  noticias: {
    name: "Noticias Camper",
    description: "Mantente al día con las últimas novedades del mundo camper. Eventos, ferias, actualidad del sector y tendencias del caravaning.",
  },
  parcelas: {
    name: "Parcelas y Emplazamientos",
    description: "Todo sobre parcelas para autocaravanas: tipos, equipamiento, consejos para elegir tu emplazamiento ideal.",
  },
  consejos: {
    name: "Consejos para Viajeros",
    description: "Guías prácticas y consejos útiles para sacar el máximo partido a tu experiencia camper. Tips de expertos viajeros.",
  },
  destinos: {
    name: "Destinos Camper",
    description: "Descubre los mejores destinos para viajar en camper. Playas, montañas, pueblos con encanto y lugares únicos.",
  },
  equipamiento: {
    name: "Equipamiento y Accesorios",
    description: "Todo sobre accesorios, equipamiento y gadgets para tu camper. Reviews, comparativas y recomendaciones.",
  },
};

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeStr, category } = await params;
  const locale = localeStr as Locale;
  const t = (key: string) => translateServer(key, locale);
  
  const meta = categoryMeta[category] || {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Artículos sobre ${category} en el blog de Eco Area Limonar. Consejos, guías y experiencias de viaje en camper.`,
  };

  const alternates = buildCanonicalAlternates(`/blog/${category}`, locale);

  const ogLocales: Record<Locale, string> = {
    es: "es_ES",
    en: "en_US",
    fr: "fr_FR",
    de: "de_DE",
  };

  return {
    title: `${meta.name} - ${t("Blog Camper")}`,
    description: meta.description,
    keywords: `blog camper ${category}, artículos ${category}, viajes camper, ecoarealimonar blog`,
    openGraph: {
      title: `${meta.name} - ${t("Blog Camper")}`,
      description: meta.description,
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: ogLocales[locale] || "es_ES",
    },
    twitter: {
      card: "summary",
      title: `${meta.name} - ${t("Blog Camper")}`,
      description: meta.description,
    },
    alternates,
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
}

export default function LocaleBlogCategoryPage() {
  return <BlogCategoryClient />;
}
