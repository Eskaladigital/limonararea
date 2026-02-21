import { createClient } from "@/lib/supabase/server";
import { BlogListClient } from "./blog-list-client";
import { cache } from "react";
import { headers } from "next/headers";
import { getTranslatedRecords, type Locale } from "@/lib/translations/get-translations";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  post_count?: number;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  slug_en?: string | null;
  slug_fr?: string | null;
  slug_de?: string | null;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  reading_time: number;
  views: number;
  is_featured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

const POSTS_PER_PAGE = 12;

// ⚡ Cache la función de obtención de datos
const getBlogData = cache(async (page: number, categorySlug?: string, searchQuery?: string) => {
  const supabase = await createClient();
  
  // Calcular offset para paginación
  const offset = (page - 1) * POSTS_PER_PAGE;
  
  // Query base para posts
  let postsQuery = supabase
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
      reading_time,
      views,
      is_featured,
      category:content_categories(id, name, slug)
    `, { count: 'exact' })
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString()); // Solo artículos con fecha <= hoy

  // Filtro por categoría
  if (categorySlug) {
    const { data: category } = await supabase
      .from('content_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    
    if (category) {
      postsQuery = postsQuery.eq('category_id', category.id);
    }
  }

  // Filtro por búsqueda
  if (searchQuery) {
    postsQuery = postsQuery.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
  }

  // Ordenar y paginar
  postsQuery = postsQuery
    .order('published_at', { ascending: false })
    .range(offset, offset + POSTS_PER_PAGE - 1);

  const { data: postsData, error: postsError, count } = await postsQuery;

  if (postsError) {
    if (typeof window === 'undefined') {
      console.warn('[Blog] Table not available:', postsError.message);
    }
    return { posts: [], categories: [], totalCount: 0, featuredPosts: [] };
  }

  // Transformar category de array a objeto único
  const posts = postsData?.map(post => ({
    ...post,
    category: Array.isArray(post.category) ? post.category[0] : post.category
  })) || [];

  // Obtener posts destacados (solo en la primera página sin filtros)
  let featuredPosts: Post[] = [];
  let featuredIds: string[] = [];
  
  if (page === 1 && !categorySlug && !searchQuery) {
    const { data: featuredData } = await supabase
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
        reading_time,
        views,
        is_featured,
        category:content_categories(id, name, slug)
      `)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString()) // Solo artículos con fecha <= hoy
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (featuredData) {
      featuredPosts = featuredData.map(post => ({
        ...post,
        category: Array.isArray(post.category) ? post.category[0] : post.category
      }));
      featuredIds = featuredData.map(post => post.id);
    }
  }

  // Filtrar posts regulares para excluir los destacados
  const regularPosts = posts.filter(post => !featuredIds.includes(post.id));

  // Cargar categorías con contador
  const { data: categoriesData } = await supabase
    .from('content_categories')
    .select('id, name, slug, description')
    .order('name');

  let categories: Category[] = [];
  if (categoriesData) {
    // Obtener conteo de posts por categoría de manera eficiente
    const categoriesWithCount = await Promise.all(
      categoriesData.map(async (category) => {
        const { count } = await supabase
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published')
          .lte('published_at', new Date().toISOString()) // Solo artículos con fecha <= hoy
          .eq('category_id', category.id);
        
        return {
          ...category,
          post_count: count || 0,
        };
      })
    );
    categories = categoriesWithCount;
  }

  return { 
    posts: regularPosts, 
    categories, 
    totalCount: count || 0,
    featuredPosts 
  };
});

export async function BlogContent({ 
  searchParams 
}: { 
  searchParams: { page?: string; category?: string; q?: string } 
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const categorySlug = searchParams.category;
  const searchQuery = searchParams.q;

  const headersList = await headers();
  const locale = (headersList.get('x-detected-locale') || 'es') as Locale;

  try {
    const { posts, categories, totalCount, featuredPosts } = await getBlogData(
      page, 
      categorySlug, 
      searchQuery
    );

    const translatedPosts = posts.length > 0
      ? await getTranslatedRecords('posts', posts, ['title', 'excerpt'], locale)
      : [];

    const translatedFeaturedPosts = featuredPosts.length > 0
      ? await getTranslatedRecords('posts', featuredPosts, ['title', 'excerpt'], locale)
      : [];

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return (
      <BlogListClient 
        initialPosts={translatedPosts}
        categories={categories}
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
        featuredPosts={translatedFeaturedPosts}
        selectedCategory={categorySlug}
        searchQuery={searchQuery}
      />
    );
  } catch (error) {
    console.error('BlogContent error:', error);
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-2">El blog estará disponible próximamente.</p>
        <p className="text-gray-400 text-sm">Estamos preparando contenido para ti.</p>
      </div>
    );
  }
}
