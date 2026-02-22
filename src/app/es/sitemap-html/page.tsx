import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { LocalizedLink } from "@/components/localized-link";
import { buildCanonicalAlternates } from "@/lib/seo/multilingual-metadata";
import { translateServer } from "@/lib/i18n/server-translation";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {}

export const revalidate = 86400;

const SITEMAP_HTML_METADATA: Metadata = {
  title: "Sitemap HTML",
  description: "Mapa del sitio en HTML con todas las URLs públicas.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale: Locale = 'es'; // Locale fijo
  
  const alternates = buildCanonicalAlternates('/sitemap-html', locale);

  return {
    ...SITEMAP_HTML_METADATA,
    alternates,
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type CategoryRow = {
  slug: string;
  name?: string | null;
};

type PostRow = {
  slug: string;
  title?: string | null;
  category?: CategoryRow | CategoryRow[] | null;
};

type ParcelRow = {
  slug: string;
  name?: string | null;
};

const staticPages: Array<{ path: string; label: string }> = [
  { path:"/", label:"Inicio" },
  { path:"/blog", label:"Blog" },
  { path:"/parcelas", label:"Parcelas" },
  { path:"/tarifas", label:"Tarifas" },
  { path:"/reservar", label:"Reservar" },
  { path:"/buscar", label:"Buscar" },
  { path:"/contacto", label:"Contacto" },
  { path:"/como-funciona", label:"Cómo funciona" },
  { path:"/mapa-areas", label:"Mapa de áreas" },
  { path:"/ofertas", label:"Ofertas" },
  { path:"/publicaciones", label:"Publicaciones" },
  { path:"/clientes-vip", label:"Clientes VIP" },
  { path:"/quienes-somos", label:"Quiénes somos" },
  { path:"/mar-menor", label:"El Mar Menor" },
  { path:"/faqs", label:"FAQs" },
  { path:"/como-reservar-fin-semana", label:"Cómo reservar fin de semana" },
  { path:"/inteligencia-artificial", label:"Inteligencia artificial" },
  { path:"/aviso-legal", label:"Aviso legal" },
  { path:"/privacidad", label:"Privacidad" },
  { path:"/cookies", label:"Cookies" },
  { path:"/pago/exito", label:"Pago éxito" },
  { path:"/pago/error", label:"Pago error" },
  { path:"/pago/cancelado", label:"Pago cancelado" },
  { path:"/sitemap-html", label:"Sitemap HTML" },
];

const faqPages: Array<{ slug: string; label: string }> = [
  { slug:"edad-minima-alquiler", label:"Edad mínima alquiler" },
  { slug:"permiso-conducir", label:"Permiso de conducir" },
  { slug:"alquiler-fin-semana", label:"Alquiler fin de semana" },
  { slug:"como-reservar", label:"Cómo reservar" },
  { slug:"precios-impuestos", label:"Precios e impuestos" },
  { slug:"accesorios-gratuitos", label:"Accesorios gratuitos" },
  { slug:"proposito-fianza", label:"Propósito de la fianza" },
  { slug:"horarios-entrega", label:"Horarios de entrega" },
  { slug:"documentos-necesarios", label:"Documentos necesarios" },
  { slug:"funcionamiento-camper", label:"Funcionamiento de la camper" },
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

export default async function LocaleSitemapHtmlPage({ params }: PageProps) {
  const locale: Locale = 'es'; // Locale fijo
  
  const t = (key: string) => translateServer(key, locale);
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [
    { data: posts },
    { data: categories },
    { data: parcelsRent },
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("slug, title, category:content_categories(slug)")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString()) // Solo artículos con fecha <= hoy
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
  const rentList = (parcelsRent || []) as ParcelRow[];

  return (
    <>
<main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-earth via-earth-deep to-earth-deep py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Sitemap HTML
            </h1>
            <p className="text-white/80 text-lg">
              Listado completo de URLs públicas.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
                Páginas principales
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
                Blog - Categorías
              </h2>
              <ul className="space-y-2">
                {categoryList.map((category) => (
                  <li key={category.slug}>
                    <LocalizedLink
                      href={`/blog/${category.slug}`}
                      className="text-earth hover:text-clay transition-colors"
                    >
                      {buildLabel(`/blog/${category.slug}`)}
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
                Blog - Artículos
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
                Parcelas en alquiler
              </h2>
              <ul className="space-y-2">
                {rentList.map((parcel) => {
                  const path = `/parcelas/${parcel.slug}`;
                  return (
                    <li key={parcel.slug}>
                      <LocalizedLink
                        href={path}
                        className="text-earth hover:text-clay transition-colors"
                      >
                        {buildLabel(path, locale)}
                      </LocalizedLink>
                      {parcel.name && (
                        <span className="text-gray-400 text-sm ml-2">
                          {parcel.name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
                FAQs detalladas
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
</>
  );
}
