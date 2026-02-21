import { Metadata } from "next";
import { CookiesClient } from "@/app/es/cookies/cookies-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const COOKIES_METADATA: Metadata = {
  title: "Cookie-Richtlinie | Eco Area Limonar",
  description: "Informationen über die Cookies, die wir auf ecoarealimonar.com verwenden. Cookie-Arten, Zweck und Verwaltung Ihrer Datenschutzeinstellungen.",
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

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/cookies", locale);

  return {
    ...COOKIES_METADATA,
    alternates,
  };
}

export const revalidate = 604800;

export default function CookiesPage() {
  return <CookiesClient />;
}
