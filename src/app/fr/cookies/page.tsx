import { Metadata } from "next";
import { CookiesClient } from "@/app/es/cookies/cookies-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

const COOKIES_METADATA: Metadata = {
  title: "Cookie Policy | Eco Area Limonar",
  description: "Information about the cookies we use on ecoarealimonar.com. Types of cookies, purpose and how to manage your privacy preferences.",
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
  const locale: Locale = "fr";
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
