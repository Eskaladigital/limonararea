import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getTranslatedRoute } from '@/lib/route-translations';
import { translateCategorySlug } from '@/lib/blog-translations';
import { i18n, type Locale } from '@/lib/i18n/config';

/**
 * SITEMAP POR IDIOMA - MEJOR PRÁCTICA MULTIIDIOMA
 * ================================================
 * 
 * ✅ Cada idioma tiene su propio sitemap:
 * - /sitemap-es.xml → Solo URLs en español (/es/...)
 * - /sitemap-en.xml → Solo URLs en inglés (/en/...)
 * - /sitemap-fr.xml → Solo URLs en francés (/fr/...)
 * - /sitemap-de.xml → Solo URLs en alemán (/de/...)
 * 
 * ✅ Cada URL incluye hreflang alternates para conectar versiones de idioma
 * ✅ Cada URL es canónica de sí misma
 * ✅ No se incluyen URLs con parámetros de query
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const LOCALES: Locale[] = i18n.locales as unknown as Locale[];

type CategoryRow = { slug: string; name?: string | null };
type PostRow = {
  slug: string;
  slug_en?: string | null;
  slug_fr?: string | null;
  slug_de?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
  category?: CategoryRow | CategoryRow[] | null;
};
type ParcelRow = { slug: string; updated_at?: string | null };

/**
 * Genera parámetros estáticos para todos los idiomas
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Genera el sitemap XML para un idioma específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> | { locale: string } }
) {
  // Manejar tanto Promise como objeto directo (para build estático)
  const paramsResolved = params instanceof Promise ? await params : params;
  const locale = paramsResolved?.locale;
  
  // Validar que el locale sea válido
  if (!locale || !LOCALES.includes(locale as Locale)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const currentLocale = locale as Locale;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const now = new Date();

  // Cargar datos desde Supabase
  const [
    { data: posts },
    { data: categories },
    { data: parcelsRent },
  ] = await Promise.all([
    supabase
      .from('posts')
      .select(`
        slug,
        slug_en,
        slug_fr,
        slug_de,
        updated_at,
        published_at,
        category:content_categories(slug)
      `)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString()) // Solo artículos con fecha <= hoy
      .order('published_at', { ascending: false }),
    supabase
      .from('content_categories')
      .select('slug, name')
      .order('name'),
    supabase
      .from('parcels')
      .select('slug, updated_at')
      .eq('is_for_rent', true)
      .neq('status', 'inactive')
      .order('internal_code', { ascending: true, nullsFirst: false }),
  ]);

  const postList = (posts || []) as PostRow[];
  const categoryList = (categories || []) as CategoryRow[];
  const rentList = (parcelsRent || []) as ParcelRow[];

  const entries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
    alternates?: {
      languages: Record<string, string>;
    };
  }> = [];

  /**
   * Añade una entrada al sitemap SOLO para el idioma actual
   * Incluye hreflang alternates para conectar versiones de idioma
   */
  const addEntry = (
    path: string,
    options: {
      lastModified?: Date | string;
      changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      priority?: number;
    } = {}
  ) => {
    // Generar alternates para hreflang (todas las versiones de idioma)
    const alternates: Record<string, string> = {};
    LOCALES.forEach((lang) => {
      const translatedPath = getTranslatedRoute(`/es${path}`, lang);
      alternates[lang] = `${BASE_URL}${translatedPath}`;
    });
    // x-default apunta a español
    alternates['x-default'] = `${BASE_URL}/es${path}`;

    // Solo añadir la URL del idioma actual al sitemap
    const translatedPath = getTranslatedRoute(`/es${path}`, currentLocale);
    entries.push({
      url: `${BASE_URL}${translatedPath}`,
      lastModified: options.lastModified 
        ? (typeof options.lastModified === 'string' ? new Date(options.lastModified) : options.lastModified)
        : now,
      changeFrequency: options.changeFrequency || 'weekly',
      priority: options.priority || 0.7,
      alternates: {
        languages: alternates,
      },
    });
  };

  // Páginas estáticas
  const staticPages: Array<{ path: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }> = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { path: '/parcelas', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/tarifas', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/reservar', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/como-funciona', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/mapa-areas', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/ofertas', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/publicaciones', priority: 0.5, changeFrequency: 'weekly' },
    { path: '/clientes-vip', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/quienes-somos', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/mar-menor', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faqs', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/como-reservar-fin-semana', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/inteligencia-artificial', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/aviso-legal', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/sitemap-html', priority: 0.2, changeFrequency: 'monthly' },
  ];

  staticPages.forEach((page) => {
    addEntry(page.path, {
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    });
  });

  // Páginas de FAQ
  const faqPages = [
    'edad-minima-alquiler',
    'permiso-conducir',
    'alquiler-fin-semana',
    'como-reservar',
    'precios-impuestos',
    'accesorios-gratuitos',
    'proposito-fianza',
    'horarios-entrega',
    'documentos-necesarios',
    'funcionamiento-camper',
  ];

  faqPages.forEach((slug) => {
    addEntry(`/faqs/${slug}`, {
      priority: 0.4,
      changeFrequency: 'monthly',
    });
  });

  // Categorías del blog
  categoryList.forEach((category) => {
    addEntry(`/blog/${category.slug}`, {
      priority: 0.7,
      changeFrequency: 'daily',
    });
  });

  // Artículos del blog - SOLO si el artículo existe en el idioma actual (evita 404)
  const postExistsInLocale = (post: PostRow): boolean => {
    if (currentLocale === 'es') return true;
    if (currentLocale === 'en') return !!post.slug_en;
    if (currentLocale === 'fr') return !!post.slug_fr;
    if (currentLocale === 'de') return !!post.slug_de;
    return false;
  };
  const getPostSlugForLocale = (post: PostRow, locale: Locale): string =>
    locale === 'es' ? post.slug : locale === 'en' ? (post.slug_en || post.slug) : locale === 'fr' ? (post.slug_fr || post.slug) : (post.slug_de || post.slug);
  postList.forEach((post) => {
    if (!postExistsInLocale(post)) return;
    const categorySlug = Array.isArray(post.category)
      ? post.category[0]?.slug || 'general'
      : post.category?.slug || 'general';
    const availableLocales: Locale[] = ['es'];
    if (post.slug_en) availableLocales.push('en');
    if (post.slug_fr) availableLocales.push('fr');
    if (post.slug_de) availableLocales.push('de');
    const translatedCategory = translateCategorySlug(categorySlug, currentLocale);
    const slug = getPostSlugForLocale(post, currentLocale);
    const alternates: Record<string, string> = {};
    availableLocales.forEach((lang) => {
      const altCategory = translateCategorySlug(categorySlug, lang);
      const altSlug = getPostSlugForLocale(post, lang);
      alternates[lang] = `${BASE_URL}/${lang}/blog/${altCategory}/${altSlug}`;
    });
    alternates['x-default'] = `${BASE_URL}/es/blog/${categorySlug}/${post.slug}`;
    entries.push({
      url: `${BASE_URL}/${currentLocale}/blog/${translatedCategory}/${slug}`,
      lastModified: post.updated_at || post.published_at || now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: alternates },
    });
  });

  // Parcelas en alquiler
  rentList.forEach((parcel) => {
    addEntry(`/parcelas/${parcel.slug}`, {
      priority: 0.7,
      changeFrequency: 'weekly',
      lastModified: parcel.updated_at || now,
    });
  });

  // Generar XML del sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map((entry) => {
  const alternatesXml = entry.alternates?.languages
    ? Object.entries(entry.alternates.languages)
        .map(([lang, url]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(url)}" />`)
        .join('\n')
    : '';
  
  return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
${alternatesXml}
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}

/**
 * Escapa caracteres XML especiales
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
