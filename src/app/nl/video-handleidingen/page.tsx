import { Metadata } from "next";
import { VideoTutorialesClient } from "@/app/es/video-tutoriales/video-tutoriales-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/video-tutoriales", locale);

  return {
    title: "Video-handleidingen | Eco Area Limonar",
    description: "Video-handleidingen over hoe uw camper werkt. Bedieningspaneel, water, elektriciteit, verwarming, koelkast en meer systemen stap voor stap uitgelegd.",
    keywords: "camper video-handleiding, hoe gebruik je een camper, bedieningspaneel handleiding, videos ecoarealimonar",
    openGraph: {
      title: "Video-handleidingen | Eco Area Limonar",
      description: "Leer hoe u uw camper gebruikt met onze video-handleidingen.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "nl_NL",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function VideoHandleidingenPage() {
  return <VideoTutorialesClient />;
}
