import type { Locale } from './i18n/config';
import { blogCategoryTranslations, translateCategorySlug, getCategorySlugInSpanish, translatePostSlug, getPostSlugInSpanish } from './blog-translations';

/**
 * Mapeo de rutas traducidas
 * Ahora con soporte para ES, EN, FR, DE, NL
 */
export const routeTranslations = {
  // Páginas principales
  "/": { 
    es: "/", 
    en: "/", 
    fr: "/", 
    de: "/",
    nl: "/" 
  },
  "/reservar": { 
    es: "/reservar", 
    en: "/book", 
    fr: "/reserver", 
    de: "/buchen",
    nl: "/boeken" 
  },
  "/reservar/parcela": { 
    es: "/reservar/parcela", 
    en: "/book/parcel", 
    fr: "/reserver/parcelle", 
    de: "/buchen/stellplatz",
    nl: "/boeken/perceel" 
  },
  "/reservar/nueva": { 
    es: "/reservar/nueva", 
    en: "/book/new", 
    fr: "/reserver/nouvelle", 
    de: "/buchen/neu",
    nl: "/boeken/nieuw" 
  },
  // Segmentos individuales para rutas dinámicas (ej: /reservar/{id}/parcela)
  "/parcela": { 
    es: "/parcela", 
    en: "/parcel", 
    fr: "/parcelle", 
    de: "/stellplatz",
    nl: "/perceel" 
  },
  "/nueva": { 
    es: "/nueva", 
    en: "/new", 
    fr: "/nouvelle", 
    de: "/neu",
    nl: "/nieuw" 
  },
  "/buscar": { 
    es: "/buscar", 
    en: "/search", 
    fr: "/recherche", 
    de: "/suche",
    nl: "/zoeken" 
  },
  "/parcelas": { 
    es: "/parcelas", 
    en: "/parcels", 
    fr: "/emplacements", 
    de: "/stellplatze",
    nl: "/percelen" 
  },
  "/tarifas": { 
    es: "/tarifas", 
    en: "/rates", 
    fr: "/tarifs", 
    de: "/preise",
    nl: "/tarieven" 
  },
  "/contacto": { 
    es: "/contacto", 
    en: "/contact", 
    fr: "/contact", 
    de: "/kontakt",
    nl: "/contact" 
  },
  "/ofertas": { 
    es: "/ofertas", 
    en: "/offers", 
    fr: "/offres", 
    de: "/angebote",
    nl: "/aanbiedingen" 
  },
  "/ventas": { 
    es: "/ventas", 
    en: "/sales", 
    fr: "/ventes", 
    de: "/verkauf",
    nl: "/verkoop" 
  },
  "/blog": { 
    es: "/blog", 
    en: "/blog", 
    fr: "/blog", 
    de: "/blog",
    nl: "/blog" 
  },
  "/blog/rutas": { 
    es: "/blog/rutas", 
    en: "/blog/routes", 
    fr: "/blog/itineraires", 
    de: "/blog/routen",
    nl: "/blog/routes" 
  },
  "/blog/noticias": { 
    es: "/blog/noticias", 
    en: "/blog/news", 
    fr: "/blog/actualites", 
    de: "/blog/nachrichten",
    nl: "/blog/nieuws" 
  },
  "/blog/vehiculos": { 
    es: "/blog/vehiculos", 
    en: "/blog/vehicles", 
    fr: "/blog/vehicules", 
    de: "/blog/fahrzeuge",
    nl: "/blog/voertuigen" 
  },
  "/blog/consejos": { 
    es: "/blog/consejos", 
    en: "/blog/tips", 
    fr: "/blog/conseils", 
    de: "/blog/tipps",
    nl: "/blog/tips" 
  },
  "/blog/destinos": { 
    es: "/blog/destinos", 
    en: "/blog/destinations", 
    fr: "/blog/destinations", 
    de: "/blog/reiseziele",
    nl: "/blog/bestemmingen" 
  },
  "/blog/equipamiento": { 
    es: "/blog/equipamiento", 
    en: "/blog/equipment", 
    fr: "/blog/equipement", 
    de: "/blog/ausrustung",
    nl: "/blog/uitrusting" 
  },
  "/publicaciones": { 
    es: "/publicaciones", 
    en: "/publications", 
    fr: "/publications", 
    de: "/publikationen",
    nl: "/publicaties" 
  },
  
  // Páginas de información
  "/quienes-somos": { 
    es: "/quienes-somos", 
    en: "/about-us", 
    fr: "/a-propos", 
    de: "/uber-uns",
    nl: "/over-ons" 
  },
  "/guia-camper": { 
    es: "/guia-camper", 
    en: "/camper-guide", 
    fr: "/guide-camping-car", 
    de: "/wohnmobil-guide",
    nl: "/camper-gids" 
  },
  "/inteligencia-artificial": { 
    es: "/inteligencia-artificial", 
    en: "/artificial-intelligence", 
    fr: "/intelligence-artificielle", 
    de: "/kunstliche-intelligenz",
    nl: "/kunstmatige-intelligentie" 
  },
  "/mapa-areas": { 
    es: "/mapa-areas", 
    en: "/areas-map", 
    fr: "/carte-zones", 
    de: "/gebietskarte",
    nl: "/gebiedskaart" 
  },
  "/video-tutoriales": { 
    es: "/video-tutoriales", 
    en: "/video-tutorials", 
    fr: "/tutoriels-video", 
    de: "/video-anleitungen",
    nl: "/video-handleidingen" 
  },
  "/normas-conducta": { 
    es: "/normas-conducta", 
    en: "/code-of-conduct", 
    fr: "/normes-conduite", 
    de: "/verhaltensregeln",
    nl: "/gedragsregels" 
  },
  "/galeria": { 
    es: "/galeria", 
    en: "/gallery", 
    fr: "/galerie", 
    de: "/galerie",
    nl: "/galerij" 
  },
  "/faqs": { 
    es: "/faqs", 
    en: "/faqs", 
    fr: "/faqs", 
    de: "/faqs",
    nl: "/veelgestelde-vragen" 
  },
  
  // Páginas secundarias
  "/clientes-vip": { 
    es: "/clientes-vip", 
    en: "/vip-clients", 
    fr: "/clients-vip", 
    de: "/vip-kunden",
    nl: "/vip-klanten" 
  },
  "/documentacion-alquiler": { 
    es: "/documentacion-alquiler", 
    en: "/rental-documentation", 
    fr: "/documentation-location", 
    de: "/mietdokumentation",
    nl: "/huurdocumentatie" 
  },
  "/como-funciona": { 
    es: "/como-funciona", 
    en: "/how-it-works", 
    fr: "/comment-ca-marche", 
    de: "/wie-es-funktioniert",
    nl: "/hoe-het-werkt" 
  },
  "/como-reservar-fin-semana": { 
    es: "/como-reservar-fin-semana", 
    en: "/weekend-booking", 
    fr: "/reservation-weekend", 
    de: "/wochenend-buchung",
    nl: "/weekend-boeking" 
  },
  "/sitemap-html": { 
    es: "/sitemap-html", 
    en: "/sitemap-html", 
    fr: "/sitemap-html", 
    de: "/sitemap-html",
    nl: "/sitemap-html" 
  },
  
  // Páginas legales
  "/aviso-legal": { 
    es: "/aviso-legal", 
    en: "/legal-notice", 
    fr: "/mentions-legales", 
    de: "/impressum",
    nl: "/juridische-mededeling" 
  },
  "/privacidad": { 
    es: "/privacidad", 
    en: "/privacy", 
    fr: "/confidentialite", 
    de: "/datenschutz",
    nl: "/privacy" 
  },
  "/cookies": { 
    es: "/cookies", 
    en: "/cookies", 
    fr: "/cookies", 
    de: "/cookies",
    nl: "/cookies" 
  },
  
  // Páginas de pago
  "/pago/exito": {
    es: "/pago/exito",
    en: "/payment/success",
    fr: "/paiement/succes",
    de: "/zahlung/erfolg",
    nl: "/betaling/succes"
  },
  "/pago/error": {
    es: "/pago/error",
    en: "/payment/error",
    fr: "/paiement/erreur",
    de: "/zahlung/fehler",
    nl: "/betaling/fout"
  },
  // Segmentos individuales para rutas dinámicas con ID (ej: /reservar/{id}/pago)
  "/pago": {
    es: "/pago",
    en: "/payment",
    fr: "/paiement",
    de: "/zahlung",
    nl: "/betaling"
  },
  "/confirmacion": {
    es: "/confirmacion",
    en: "/confirmation",
    fr: "/confirmation",
    de: "/bestaetigung",
    nl: "/bevestiging"
  },
} as const;

/**
 * Busca una ruta en routeTranslations de forma BIDIRECCIONAL
 * Dado un path en CUALQUIER idioma, encuentra la traducción al idioma destino
 * Ejemplo: /stellplatze (alemán) -> busca en todas las traducciones -> devuelve /parcelas (español)
 */
function findRouteTranslation(pathSegment: string, targetLang: Locale): string | null {
  const segmentWithSlash = pathSegment.startsWith('/') ? pathSegment : '/' + pathSegment;
  
  // Primero intentar coincidencia directa con las claves (rutas en español)
  if (routeTranslations[segmentWithSlash as keyof typeof routeTranslations]) {
    return routeTranslations[segmentWithSlash as keyof typeof routeTranslations][targetLang];
  }
  
  // Si no coincide con las claves, buscar en todos los valores de todas las traducciones
  for (const [esRoute, translations] of Object.entries(routeTranslations)) {
    // Verificar si el segmento coincide con alguna traducción (en, fr, de)
    for (const [lang, translatedRoute] of Object.entries(translations)) {
      if (translatedRoute === segmentWithSlash) {
        // Encontrado! Devolver la traducción al idioma destino
        return translations[targetLang as keyof typeof translations];
      }
    }
  }
  
  return null;
}

/**
 * Obtiene la ruta traducida con prefijo de idioma
 * Ejemplo: /es/contacto -> /en/contact
 * Ejemplo: /de/stellplatze -> /es/parcelas (búsqueda bidireccional)
 * Ejemplo localización: /es/alquiler-autocaravanas-campervans/murcia -> /en/rent-campervan-motorhome/murcia
 * Ejemplo blog categoría: /es/blog/rutas -> /en/blog/routes
 * Ejemplo blog artículo: /es/blog/rutas/mi-articulo -> /en/blog/routes/mi-articulo
 */
export function getTranslatedRoute(path: string, targetLang: Locale): string {
  // Eliminar query params y hash
  const basePath = path.split('?')[0].split('#')[0];
  const queryAndHash = path.substring(basePath.length);
  
  // Remover el prefijo de idioma actual si existe
  const segments = basePath.split('/').filter(Boolean);
  let cleanPath = basePath;
  let currentLocale: Locale | null = null;
  
  if (segments.length > 0 && ['es', 'en', 'fr', 'de', 'nl'].includes(segments[0])) {
    currentLocale = segments[0] as Locale;
    cleanPath = '/' + segments.slice(1).join('/');
    if (cleanPath === '/') cleanPath = '/';
  }
  
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  
  // Buscar traducción de la ruta limpia
  let translatedPath = cleanPath;
  
  // CASO ESPECIAL: Rutas del blog
  // Detectar: /blog/{category}/{slug} o /blog/{category}
  const blogPattern = /^\/blog\/([^/]+)(?:\/([^/]+))?$/;
  const blogMatch = cleanPath.match(blogPattern);
  
  if (blogMatch) {
    const [, categorySlug, articleSlug] = blogMatch;
    
    // Obtener slug de categoría en español (puede venir en cualquier idioma si path no tiene prefijo)
    let esCategorySlug: string;
    if (currentLocale && currentLocale !== 'es') {
      esCategorySlug = getCategorySlugInSpanish(categorySlug, currentLocale);
    } else if (blogCategoryTranslations[categorySlug as keyof typeof blogCategoryTranslations]) {
      esCategorySlug = categorySlug; // Ya está en español
    } else {
      // Path sin prefijo con categoría en en/fr/de/nl - detectar idioma origen
      const detected = (['en', 'fr', 'de', 'nl'] as Locale[]).map((lang) => getCategorySlugInSpanish(categorySlug, lang)).find((s) => s !== categorySlug);
      esCategorySlug = detected ?? categorySlug;
    }
    
    // Traducir la categoría al idioma destino
    const translatedCategory = translateCategorySlug(esCategorySlug, targetLang);
    
    if (articleSlug) {
      // Es un artículo: /blog/{category}/{slug}
      const esArticleSlug = currentLocale && currentLocale !== 'es'
        ? getPostSlugInSpanish(articleSlug, currentLocale)
        : articleSlug;
      
      const translatedArticle = translatePostSlug(esArticleSlug, targetLang);
      translatedPath = `/blog/${translatedCategory}/${translatedArticle}`;
    } else {
      // Es listado de categoría: /blog/{category}
      translatedPath = `/blog/${translatedCategory}`;
    }
  } else {
    // Intentar coincidencia exacta BIDIRECCIONAL (funciona desde cualquier idioma)
    const exactTranslation = findRouteTranslation(cleanPath, targetLang);
    if (exactTranslation) {
      translatedPath = exactTranslation;
    } else {
      // Si es una ruta dinámica normal, traducir TODOS los segmentos BIDIRECCIONALMENTE
      const pathSegments = cleanPath.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        const translatedSegments: string[] = [];
        
        for (const segment of pathSegments) {
          // Usar búsqueda bidireccional para cada segmento
          const translatedSegment = findRouteTranslation(segment, targetLang);
          if (translatedSegment) {
            // Quitar la barra inicial del resultado
            translatedSegments.push(translatedSegment.substring(1));
          } else {
            // Si no tiene traducción, mantener el segmento original (ej: IDs, slugs)
            translatedSegments.push(segment);
          }
        }
        
        translatedPath = '/' + translatedSegments.join('/');
      }
    }
  }
  
  // Añadir prefijo de idioma
  const finalPath = `/${targetLang}${translatedPath}`;
  
  return finalPath + queryAndHash;
}

/**
 * Obtiene el idioma desde una ruta con prefijo
 * Ejemplo: /es/contacto -> 'es'
 */
export function getLanguageFromRoute(path: string): Locale {
  const basePath = path.split('?')[0].split('#')[0];
  const segments = basePath.split('/').filter(Boolean);
  
  // Verificar si el primer segmento es un idioma válido
  if (segments.length > 0) {
    const firstSegment = segments[0];
    if (['es', 'en', 'fr', 'de', 'nl'].includes(firstSegment)) {
      return firstSegment as Locale;
    }
  }
  
  // Si no hay prefijo, asumir español (default)
  return 'es';
}

/**
 * Remueve el prefijo de idioma de una ruta
 * Ejemplo: /es/contacto -> /contacto
 */
export function removeLanguagePrefix(path: string): string {
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length > 0 && ['es', 'en', 'fr', 'de', 'nl'].includes(segments[0])) {
    return '/' + segments.slice(1).join('/') || '/';
  }
  
  return path;
}

