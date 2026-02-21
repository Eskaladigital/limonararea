import { Metadata } from "next";
import { VideoTutorialesClient } from "@/app/es/video-tutoriales/video-tutoriales-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "de";
  const alternates = buildCanonicalAlternates("/video-tutoriales", locale);

  return {
    title: "Video-Anleitungen | Eco Area Limonar",
    description: "Video-Anleitungen zur Funktionsweise Ihres Wohnmobils. Bedienfeld, Wasser, Strom, Heizung, Kühlschrank und weitere Systeme Schritt für Schritt erklärt.",
    keywords: "Camper Video-Anleitung, Wohnmobil Bedienung, Bedienfeld Tutorial, Videos Eco Area Limonar",
    openGraph: {
      title: "Video-Anleitungen | Eco Area Limonar",
      description: "Lernen Sie mit unseren Video-Anleitungen, wie Sie Ihr Wohnmobil bedienen.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "de_DE",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function VideoTutorialsPage() {
  return <VideoTutorialesClient />;
}
