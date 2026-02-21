import { Metadata } from "next";
import { VideoTutorialesClient } from "@/app/es/video-tutoriales/video-tutoriales-client";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/video-tutoriales", locale);

  return {
    title: "Video Tutorials | Eco Area Limonar",
    description: "Video tutorials about how your motorhome works. Control panel, water, electricity, heating, fridge and more systems explained step by step.",
    keywords: "camper video tutorial, how to use motorhome, control panel tutorial, videos ecoarealimonar",
    openGraph: {
      title: "Video Tutorials | Eco Area Limonar",
      description: "Learn how to use your motorhome with our video tutorials.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export default function VideoTutorialsPage() {
  return <VideoTutorialesClient />;
}
