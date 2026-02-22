"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocalizedLink } from "@/components/localized-link";
import { Calendar, Clock, ArrowRight, BookOpen, Search, Mail, Tag, ArrowLeft, Filter } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { useLanguage } from "@/contexts/language-context";
import { supabase } from "@/lib/supabase/client";
import { useParams, useSearchParams } from "next/navigation";

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
import { getCategorySlugInSpanish, getCategoryName, translateCategorySlug, blogCategoryNames } from "@/lib/blog-translations";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
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
  category: Category | null;
}

// Mapeo de slugs a nombres para mostrar
const categoryNames: Record<string, string> = {
  rutas: "Rutas",
  noticias: "Noticias",
  parcelas: "Parcelas",
  consejos: "Consejos",
  destinos: "Destinos",
  equipamiento: "Equipamiento",
};

// Descripciones por categoría
const categoryDescriptions: Record<string, string> = {
  rutas: "Las mejores rutas en camper por España y Europa. Descubre destinos increíbles, consejos de viaje y experiencias únicas.",
  noticias: "Mantente al día con las últimas novedades del mundo camper, eventos, ferias y actualidad del sector.",
  parcelas: "Todo sobre parcelas para autocaravanas: tipos, equipamiento y consejos para tu emplazamiento.",
  consejos: "Guías prácticas y consejos para sacar el máximo partido a tu experiencia camper.",
  destinos: "Descubre los mejores destinos para viajar en camper, desde playas hasta montañas.",
  equipamiento: "Todo sobre accesorios, equipamiento y gadgets para tu camper.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogCategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  
  const categorySlug = params.category as string;
  const page = parseInt(searchParams.get("page") || "1");
  const POSTS_PER_PAGE = 9;
  
  // Convertir el slug de categoría a español si no lo está (la BD tiene slugs en español)
  const esCategorySlug = getCategorySlugInSpanish(categorySlug, language);

  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // Cargar categoría usando el slug español
      const { data: categoryData } = await supabase
        .from("content_categories")
        .select("*")
        .eq("slug", esCategorySlug)
        .single();

      if (categoryData) {
        setCategory(categoryData);

        // Cargar posts de esta categoría
        const from = (page - 1) * POSTS_PER_PAGE;
        const to = from + POSTS_PER_PAGE - 1;

        let query = supabase
          .from("posts")
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
            category:content_categories(id, name, slug, description, image_url)
          `, { count: "exact" })
          .eq("category_id", categoryData.id)
          .eq("status", "published")
          .lte("published_at", new Date().toISOString()) // Solo artículos con fecha <= hoy
          .order("published_at", { ascending: false })
          .range(from, to);

        const { data: postsData, count } = await query;

        // Transformar category de array a objeto único
        const transformedPosts = postsData?.map(post => ({
          ...post,
          category: Array.isArray(post.category) ? post.category[0] : post.category
        })) || [];

        setPosts(transformedPosts);
        setTotalPosts(count || 0);
      }

      setLoading(false);
    }

    loadData();
  }, [esCategorySlug, page]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Obtener el nombre de la categoría traducido
  const categoryName = getCategoryName(esCategorySlug, language);
  
  // Obtener la descripción traducida o usar la de la BD
  const categoryDescription = category?.description || "";

  // Filtrar posts por búsqueda
  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <main className="min-h-screen bg-white font-amiko">
      <PageHero
        title={categoryName}
        subtitle={categoryDescription}
        tag={`${totalPosts} ${totalPosts === 1 ? "artículo" : "artículos"}`}
        backgroundImage="/images/slides/AdobeStock_231250340.webp"
      >
        <nav className="flex items-center justify-center gap-2 text-white/70 text-sm mb-4">
          <LocalizedLink href="/" className="hover:text-white transition-colors">Inicio</LocalizedLink>
          <span>/</span>
          <LocalizedLink href="/blog" className="hover:text-white transition-colors">Blog</LocalizedLink>
          <span>/</span>
          <span className="text-white font-medium">{categoryName}</span>
        </nav>
      </PageHero>

      {/* Navegación de categorías */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 py-4 overflow-x-auto">
            <LocalizedLink 
              href="/blog" 
              className="px-5 py-2 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all text-sm tracking-wide uppercase whitespace-nowrap"
            >
              {t("Todos")}
            </LocalizedLink>
            {Object.keys(blogCategoryNames).slice(0, 3).map((esSlug) => {
              const translatedSlug = translateCategorySlug(esSlug, language);
              const name = getCategoryName(esSlug, language);
              return (
                <LocalizedLink 
                  key={esSlug}
                  href={`/blog/${translatedSlug}`}
                  className={`px-5 py-2 rounded-full font-bold text-sm tracking-wide uppercase whitespace-nowrap transition-all ${
                    esCategorySlug === esSlug
                      ? "bg-clay text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {name}
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Buscar en esta categoría...")}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-earth focus:ring-2 focus:ring-earth/20 transition-all text-base shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              {t("No hay artículos")}
            </h2>
            <p className="text-gray-500 mb-8">
              {searchQuery 
                ? t("No se encontraron artículos con tu búsqueda")
                : t("Aún no hay artículos en esta categoría")}
            </p>
            <LocalizedLink 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-earth text-white px-6 py-3 rounded-full font-bold hover:bg-earth-deep transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("Ver todos los artículos")}
            </LocalizedLink>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                // 🌐 Solo enlazar al idioma actual si el artículo existe en ese idioma (evita 404)
                const hasTranslation = (language === 'es') || (language === 'en' && post.slug_en) || (language === 'fr' && post.slug_fr) || (language === 'de' && post.slug_de);
                const postSlug = language === 'fr' && post.slug_fr ? post.slug_fr : language === 'en' && post.slug_en ? post.slug_en : language === 'de' && post.slug_de ? post.slug_de : post.slug;
                const esCategorySlug = getCategorySlugInSpanish(categorySlug, language);
                const translatedCategory = translateCategorySlug(esCategorySlug, language);
                const href = hasTranslation
                  ? `/${language}/blog/${translatedCategory}/${postSlug}`
                  : `/es/blog/${esCategorySlug}/${post.slug}`;
                
                return (
                <article 
                  key={post.id} 
                  className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1"
                >
                  <Link href={href} className="flex flex-col h-full">
                    <div className="h-56 bg-gray-100 relative flex items-center justify-center overflow-hidden">
                      {post.featured_image ? (
                        <Image 
                          src={post.featured_image} 
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          quality={70}
                        />
                      ) : (
                        <BookOpen className="h-12 w-12 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <span className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-bold text-clay uppercase tracking-wide shadow-sm">
                        {categoryName}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-medium">
                        {post.published_at && (
                          <>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> 
                              {formatDate(post.published_at)}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 
                          {post.reading_time || 5} min
                        </span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-earth transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {t("Leer artículo")}
                        </span>
                        <ArrowRight className="h-4 w-4 text-clay transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </article>
                );
              })}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-16">
                {page > 1 && (
                  <LocalizedLink
                    href={`/blog/${categorySlug}?page=${page - 1}`}
                    className="w-12 h-12 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-sand-lt hover:border-gray-300 transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </LocalizedLink>
                )}
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <LocalizedLink
                      key={pageNum}
                      href={`/blog/${categorySlug}?page=${pageNum}`}
                      className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center transition-colors ${
                        page === pageNum
                          ? "bg-earth text-white shadow-lg transform scale-105"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-sand-lt hover:border-gray-300"
                      }`}
                    >
                      {pageNum}
                    </LocalizedLink>
                  );
                })}

                {page < totalPages && (
                  <LocalizedLink
                    href={`/blog/${categorySlug}?page=${page + 1}`}
                    className="w-12 h-12 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-sand-lt hover:border-gray-300 transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </LocalizedLink>
                )}
              </div>
            )}
          </>
        )}

        {/* CTA Newsletter */}
        <div className="mt-20 bg-gradient-to-br from-clay to-clay-dk rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <Mail className="h-12 w-12 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl font-heading font-bold mb-4">
              {t("¿Te gustan nuestros artículos?")}
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              {t("Suscríbete a nuestra newsletter y recibe los mejores contenidos directamente en tu email.")}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:bg-white/30 focus:border-white transition-all" 
              />
              <button 
                type="submit" 
                className="bg-white text-clay font-bold py-3 px-6 rounded-xl hover:bg-sand-lt transition-colors shadow-md uppercase tracking-wide"
              >
                {t("Suscribirse")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export function BlogCategoryClient() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BlogCategoryContent />
    </Suspense>
  );
}
