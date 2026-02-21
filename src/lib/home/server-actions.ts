import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Locale } from '../i18n/config';

function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith('http')) return null;
  return createClient(url, key);
}

export interface FeaturedParcel {
  id: string;
  name: string;
  slug: string;
  category?: { name: string };
  length_m?: number | null;
  width_m?: number | null;
  main_image: string | null;
  images: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  slug_en?: string | null;
  slug_fr?: string | null;
  slug_de?: string | null;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

// ⚡ Obtener parcelas destacadas
export const getFeaturedParcels = cache(async (): Promise<FeaturedParcel[]> => {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: parcels, error } = await supabase
    .from('parcels')
    .select(`
      *,
      category:parcel_categories(id, name),
      images:parcel_images(*)
    `)
    .eq('is_for_rent', true)
    .order('internal_code', { ascending: true })
    .limit(3);

  if (error) {
    // Tabla no existe o esquema sin crear: esperado hasta que definas el schema
    const msg = String(error?.message ?? error?.code ?? JSON.stringify(error));
    const isEmptyError = !error?.message && !error?.code;
    const isSchemaMissing =
      isEmptyError ||
      msg === '{}' ||
      /relation.*does not exist|42P01|undefined_table|does not exist/i.test(msg);
    if (isSchemaMissing) {
      // Silencioso: esquema pendiente. Crear cuando esté 100% definido.
      if (process.env.NODE_ENV === 'development') {
        console.info('[Supabase] Esquema pendiente: tabla parcels no creada aún.');
      }
    } else {
      console.error('[Supabase] Error fetching featured parcels:', error?.message || error?.code || error);
    }
    return [];
  }

  if (!parcels) return [];

  return parcels.map((parcel: any) => {
    const primaryImage = parcel.images?.find((img: any) => img.is_primary);
    const firstImage = parcel.images?.[0];
    const category = parcel.category;
    
    return {
      id: parcel.id,
      name: parcel.name,
      slug: parcel.slug,
      category,
      length_m: parcel.length_m ?? null,
      width_m: parcel.width_m ?? null,
      main_image: primaryImage?.image_url || firstImage?.image_url || null,
      images: [primaryImage?.image_url || firstImage?.image_url].filter(Boolean)
    };
  });
});

/** @deprecated Use getFeaturedParcels */
export const getFeaturedVehicles = getFeaturedParcels;

// ⚡ Obtener últimos artículos del blog
export const getLatestBlogArticles = cache(async (limit: number = 3): Promise<BlogArticle[]> => {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: articles } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      published_at,
      category:content_categories(id, name, slug)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString()) // Solo artículos con fecha <= hoy
    .order('published_at', { ascending: false })
    .limit(limit);

  if (!articles) return [];

  return articles.map(article => ({
    ...article,
    category: Array.isArray(article.category) ? article.category[0] : article.category
  }));
});

// ⚡ Obtener artículos de rutas para página LATAM
export const getRoutesArticles = cache(async (limit: number = 4, locale: Locale = 'es'): Promise<BlogArticle[]> => {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  // ⚠️ IMPORTANTE: Siempre buscar en la categoría 'rutas' (español)
  // Los artículos deben tener slugs traducidos en las columnas slug_en, slug_fr, slug_de
  const categorySlug = 'rutas';

  const { data: articles } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      slug_en,
      slug_fr,
      slug_de,
      excerpt,
      featured_image,
      published_at,
      category:content_categories!inner(id, name, slug)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString()) // Solo artículos con fecha <= hoy
    .eq('content_categories.slug', categorySlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (!articles) return [];

  // Si no es español, obtener traducciones desde content_translations
  if (locale !== 'es' && articles.length > 0) {
    const postIds = articles.map(a => a.id);
    
    const { data: translations } = await supabase
      .from('content_translations')
      .select('source_id, source_field, translated_text')
      .eq('source_table', 'posts')
      .in('source_id', postIds)
      .eq('locale', locale)
      .in('source_field', ['title', 'excerpt']);
    
    // Crear mapa de traducciones agrupado por post_id
    const translationsMap = new Map<string, { title?: string; excerpt?: string }>();
    
    translations?.forEach(t => {
      if (!translationsMap.has(t.source_id)) {
        translationsMap.set(t.source_id, {});
      }
      const postTranslations = translationsMap.get(t.source_id)!;
      if (t.source_field === 'title') {
        postTranslations.title = t.translated_text;
      } else if (t.source_field === 'excerpt') {
        postTranslations.excerpt = t.translated_text;
      }
    });
    
    // Aplicar traducciones a los artículos
    return articles.map(article => {
      const translation = translationsMap.get(article.id);
      return {
        ...article,
        title: translation?.title || article.title,
        excerpt: translation?.excerpt || article.excerpt,
        category: Array.isArray(article.category) ? article.category[0] : article.category
      };
    });
  }

  return articles.map(article => ({
    ...article,
    category: Array.isArray(article.category) ? article.category[0] : article.category
  }));
});

// ⚡ Obtener estadísticas de la empresa
export interface CompanyStats {
  totalBookings: number;
  totalVehicles: number;
  averageRating: number;
  yearsExperience: number;
}

export const getCompanyStats = cache(async (): Promise<CompanyStats> => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { totalBookings: 0, totalVehicles: 0, averageRating: 0, yearsExperience: new Date().getFullYear() - 2012 };
  }

  // Contar reservas completadas
  const { count: bookingsCount } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .in('status', ['confirmed', 'completed']);

  // Contar parcelas activas
  const { count: parcelsCount } = await supabase
    .from('parcels')
    .select('id', { count: 'exact', head: true })
    .eq('is_for_rent', true)
    .neq('status', 'inactive');

  return {
    totalBookings: bookingsCount || 500, // Valor por defecto si no hay datos
    totalVehicles: parcelsCount || 8,
    averageRating: 4.9,
    yearsExperience: new Date().getFullYear() - 2012
  };
});
