import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { LocalizedLink } from "@/components/localized-link";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";

export const revalidate = 86400;

const SITEMAP_HTML_METADATA: Metadata = {
  title: "HTML Sitemap | Eco Area Limonar",
  description: "HTML-sitemap met alle openbare URL's.",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = "nl";
  const alternates = buildCanonicalAlternates("/sitemap-html", locale);

  return {
    ...SITEMAP_HTML_METADATA,
    alternates,
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type CategoryRow = { slug: string; name?: string | null };
type PostRow = { slug: string; title?: string | null; category?: CategoryRow | CategoryRow[] | null };
type VehicleRow = { slug: string; name?: string | null };

const staticPages: Array<{ path: string; label: string }> = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/parcelas", label: "Standplaatsen" },
  { path: "/tarifas", label: "Tarieven" },
  { path: "/reservar", label: "Boeken" },
  { path: "/buscar", label: "Zoeken" },
  { path: "/contacto", label: "Contact" },
  { path: "/guia-camper", label: "Campergids" },
  { path: "/ofertas", label: "Aanbiedingen" },
  { path: "/publicaciones", label: "Publicaties" },
  { path: "/quienes-somos", label: "Over ons" },
  { path: "/faqs", label: "Veelgestelde vragen" },
  { path: "/video-tutoriales", label: "Video-handleidingen" },
  { path: "/aviso-legal", label: "Juridische mededeling" },
  { path: "/privacidad", label: "Privacy" },
  { path: "/cookies", label: "Cookies" },
  { path: "/galeria", label: "Galerij" },
  { path: "/normas-conducta", label: "Gedragsregels" },
  { path: "/sitemap-html", label: "Sitemap HTML" },
];

const faqPages: Array<{ slug: string; label: string }> = [
  { slug: "edad-minima-alquiler", label: "Minimale huurleeftijd" },
  { slug: "permiso-conducir", label: "Rijbewijs" },
  { slug: "alquiler-fin-semana", label: "Weekendverhuur" },
  { slug: "como-reservar", label: "Hoe te boeken" },
  { slug: "precios-impuestos", label: "Prijzen en belastingen" },
  { slug: "accesorios-gratuitos", label: "Gratis accessoires" },
  { slug: "proposito-fianza", label: "Doel van de borg" },
  { slug: "horarios-entrega", label: "Ophaaluren" },
  { slug: "documentos-necesarios", label: "Vereiste documenten" },
  { slug: "funcionamiento-camper", label: "Werking van de camper" },
];

function getCategorySlug(category: PostRow["category"]) {
  if (!category) return "general";
  if (Array.isArray(category)) return category[0]?.slug || "general";
  return category.slug || "general";
}

function buildLabel(path: string, locale: Locale) {
  if (path === "/") return `${baseUrl}/${locale}`;
  return `${baseUrl}/${locale}${path}`;
}

export default async function SitemapHtmlPage() {
  const locale: Locale = "nl";
  const t = (key: string) => translateServer(key, locale);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [
    { data: posts },
    { data: categories },
    { data: vehiclesRent },
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("slug, title, category:content_categories(slug)")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false }),
    supabase
      .from("content_categories")
      .select("slug, name")
      .order("name", { ascending: true }),
    supabase
      .from("parcels")
      .select("slug, name")
      .eq("is_for_rent", true)
      .neq("status", "inactive")
      .order("internal_code", { ascending: true, nullsFirst: false }),
  ]);

  const postList = (posts || []) as PostRow[];
  const categoryList = (categories || []) as CategoryRow[];
  const rentList = (vehiclesRent || []) as VehicleRow[];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-earth via-earth-deep to-earth-deep py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Sitemap HTML
          </h1>
          <p className="text-white/80 text-lg">
            Volledige lijst van openbare URL&apos;s.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
              Hoofdpagina&apos;s
            </h2>
            <ul className="space-y-2">
              {staticPages.map((page) => (
                <li key={page.path}>
                  <LocalizedLink
                    href={page.path}
                    className="text-earth hover:text-clay transition-colors"
                  >
                    {buildLabel(page.path, locale)}
                  </LocalizedLink>
                  <span className="text-gray-400 text-sm ml-2">
                    {page.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
              Blog - Categorieën
            </h2>
            <ul className="space-y-2">
              {categoryList.map((category) => (
                <li key={category.slug}>
                  <LocalizedLink
                    href={`/blog/${category.slug}`}
                    className="text-earth hover:text-clay transition-colors"
                  >
                    {buildLabel(`/blog/${category.slug}`, locale)}
                  </LocalizedLink>
                  {category.name && (
                    <span className="text-gray-400 text-sm ml-2">
                      {category.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
              Blog - Artikelen
            </h2>
            <ul className="space-y-2">
              {postList.map((post) => {
                const categorySlug = getCategorySlug(post.category);
                const href = `/${locale}/blog/${categorySlug}/${post.slug}`;
                return (
                  <li key={post.slug}>
                    <Link
                      href={href}
                      className="text-earth hover:text-clay transition-colors"
                    >
                      {buildLabel(`/blog/${categorySlug}/${post.slug}`, locale)}
                    </Link>
                    {post.title && (
                      <span className="text-gray-400 text-sm ml-2">
                        {post.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
              Standplaatsen te huur
            </h2>
            <ul className="space-y-2">
              {rentList.map((vehicle) => {
                const path = `/parcelas/${vehicle.slug}`;
                return (
                  <li key={vehicle.slug}>
                    <LocalizedLink
                      href={path}
                      className="text-earth hover:text-clay transition-colors"
                    >
                      {buildLabel(path, locale)}
                    </LocalizedLink>
                    {vehicle.name && (
                      <span className="text-gray-400 text-sm ml-2">
                        {vehicle.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
              Gedetailleerde veelgestelde vragen
            </h2>
            <ul className="space-y-2">
              {faqPages.map((faq) => {
                const path = `/faqs/${faq.slug}`;
                return (
                  <li key={faq.slug}>
                    <LocalizedLink
                      href={path}
                      className="text-earth hover:text-clay transition-colors"
                    >
                      {buildLabel(path, locale)}
                    </LocalizedLink>
                    <span className="text-gray-400 text-sm ml-2">
                      {faq.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
