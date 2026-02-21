import { Suspense } from "react";
import { Metadata } from "next";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogSkeleton } from "@/components/blog/blog-skeleton";
import { PageHero } from "@/components/layout/page-hero";
import { HeroSlider } from "@/components/hero-slider";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "en";
  const alternates = buildCanonicalAlternates("/blog", locale);

  return {
    title: "Motorhome Travel Blog | Eco Area Limonar",
    description:
      "Tips, routes and experiences to enjoy the Mar Menor by motorhome. Travel guides, must-visit destinations and camper life on the coast of Murcia.",
    keywords:
      "motorhome blog, camper travel Mar Menor, Murcia motorhome routes, camper life, eco area limonar blog",
    authors: [{ name: "Eco Area Limonar" }],
    openGraph: {
      title: "Motorhome Travel Blog | Eco Area Limonar",
      description:
        "Tips, routes and experiences for your next motorhome adventure at the Mar Menor.",
      type: "website",
      url: alternates.canonical,
      siteName: "Eco Area Limonar",
      locale: "en_US",
    },
    alternates,
    robots: { index: true, follow: true },
  };
}

export const revalidate = 86400;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const locale: Locale = "en";
  const t = (key: string) => translateServer(key, locale);
  const resolvedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Blog de Viajes")}
        subtitle={t(
          "Consejos, rutas y experiencias para tu próxima aventura en autocaravana"
        )}
        tag={`📖 ${t("Eco Area Limonar")}`}
        backgroundImage="/images/slides/AdobeStock_47883789.webp"
      />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <Suspense fallback={<BlogSkeleton />}>
            <BlogContent searchParams={resolvedSearchParams} />
          </Suspense>
        </div>
      </section>

      <section className="relative h-[300px] lg:h-[350px] overflow-hidden">
        <HeroSlider 
          images={[
            "/images/slides/hero-12.webp",
            "/images/slides/hero-13.webp",
            "/images/slides/hero-14.webp",
          ]}
          autoPlayInterval={9000}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-deep/80 via-earth/80 to-earth-deep/80 z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl lg:text-3xl font-heading font-extrabold mb-3">
            {t("¿Quieres más inspiración?")}
          </h2>
          <p className="text-white/60 text-sm mb-6 max-w-md">
            {t("Síguenos en redes sociales para no perderte ninguna aventura")}
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com/ecoarealimonar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-earth font-bold px-6 py-3 rounded-full text-sm hover:shadow-xl transition-all"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/ecoarealimonar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-earth font-bold px-6 py-3 rounded-full text-sm hover:shadow-xl transition-all"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
