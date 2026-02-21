import { Metadata } from "next";
import { CookiesClient } from "@/app/es/cookies/cookies-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const COOKIES_METADATA: Metadata = {
  title: "Cookiebeleid | Eco Area Limonar",
  description: "Informatie over de cookies die wij gebruiken op ecoarealimonar.com. Soorten cookies, doel en hoe u uw privacyvoorkeuren kunt beheren.",
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
  const locale: Locale = "nl";
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
