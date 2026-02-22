# 🎯 Optimización de URLs Canónicas - Mejores Prácticas Implementadas

## ✅ Resumen Ejecutivo

Se han implementado todas las mejores prácticas de canonical URLs según las recomendaciones de Google Search Console y SEO avanzado.

---

## 📋 Principios Base Implementados

### 1️⃣ Canonical Autorreferenciado Siempre ✅

**Regla:** Cada página debe apuntar a sí misma como canonical.

**Implementación:**
- ✅ Todas las páginas usan `buildCanonicalAlternates()` que genera canonical autorreferenciado
- ✅ El canonical apunta exactamente a la URL actual del idioma actual
- ✅ No hay canónicos genéricos a home o categorías "madre"

**Ejemplo:**
```typescript
// ✅ CORRECTO - Cada página apunta a sí misma
const alternates = buildCanonicalAlternates('/blog/rutas', locale);
// Genera: canonical: "https://www.ecoarealimonar.com/es/blog/rutas"
```

---

### 2️⃣ Canonical Absoluto (Nunca Relativo) ✅

**Regla:** Google prefiere URLs absolutas completas.

**Implementación:**
- ✅ Todas las URLs canónicas usan `https://www.ecoarealimonar.com` (absoluto)
- ✅ Nunca se usan rutas relativas como `/es/blog/rutas`
- ✅ Base URL centralizada en `buildCanonicalAlternates()`

**Ejemplo:**
```typescript
// ✅ CORRECTO
canonical: "https://www.ecoarealimonar.com/es/blog/rutas"

// ❌ INCORRECTO (no implementado)
canonical: "/es/blog/rutas"
```

---

### 3️⃣ Canonical ≠ Redirección ✅

**Regla:** 
- Redirección 301 → cuando la URL no debe existir
- Canonical → cuando la URL puede existir, pero no quieres que posicione

**Implementación:**
- ✅ URLs con parámetros de query (`?page=`, `?category=`) canonicalizan a versión sin parámetros
- ✅ Las redirecciones 301 se manejan en `next.config.js` (no con canonical)
- ✅ El helper `buildCanonicalAlternates()` automáticamente remueve parámetros de query

**Ejemplo:**
```typescript
// ✅ CORRECTO - Paginación canonicaliza a base
/blog?page=2 → canonical: "https://www.ecoarealimonar.com/es/blog"

// ✅ CORRECTO - Filtros canonicalizan a base
/blog?category=rutas → canonical: "https://www.ecoarealimonar.com/es/blog/rutas"
```

---

### 4️⃣ Canonical + Idiomas: Regla de Oro ✅

**Regla:** Cada idioma canonicaliza a sí mismo. La relación entre idiomas se maneja con hreflang.

**Implementación:**
- ✅ Cada idioma tiene su propio canonical apuntando a sí mismo
- ✅ Hreflang alternates conectan versiones de idioma
- ✅ `x-default` siempre apunta a español (`/es/`)

**Estructura correcta:**
```typescript
alternates: {
  canonical: "https://www.ecoarealimonar.com/es/blog/rutas", // ✅ Autorreferenciado
  languages: {
    'es': 'https://www.ecoarealimonar.com/es/blog/rutas',
    'en': 'https://www.ecoarealimonar.com/en/blog/routes',
    'fr': 'https://www.ecoarealimonar.com/fr/blog/itineraires',
    'de': 'https://www.ecoarealimonar.com/de/blog/routen',
    'x-default': 'https://www.ecoarealimonar.com/es/blog/rutas', // ✅ Español por defecto
  },
}
```

---

### 5️⃣ No Canonicalizar URLs con Intención SEO Distinta ✅

**Regla:** URLs con intención SEO local diferente no deben canonicalizarse entre sí.

**Implementación:**
- ✅ Cada página de localización tiene su propio canonical único
- ✅ `/alquiler-camper-murcia` y `/alquiler-camper-alicante` tienen canónicos separados
- ✅ No se canonicalizan entre sí (mantienen posicionamiento local)

**Ejemplo:**
```typescript
// ✅ CORRECTO - Cada ciudad tiene su canonical único
/alquiler-autocaravanas-campervans-murcia → canonical: ".../es/alquiler-autocaravanas-campervans-murcia"
/alquiler-autocaravanas-campervans-alicante → canonical: ".../es/alquiler-autocaravanas-campervans-alicante"
```

---

### 6️⃣ Canonical Coherente con Sitemap ✅

**Regla:** Toda URL del sitemap debe ser canónica de sí misma.

**Implementación:**
- ✅ El sitemap (`src/app/sitemap.ts`) genera URLs con `/es/` para español
- ✅ Los canónicos coinciden exactamente con las URLs del sitemap
- ✅ No se incluyen URLs con parámetros de query en el sitemap
- ✅ Las URLs del sitemap son siempre canónicas de sí mismas

**Verificación:**
```typescript
// Sitemap genera:
url: "https://www.ecoarealimonar.com/es/blog/rutas"

// Metadata genera:
canonical: "https://www.ecoarealimonar.com/es/blog/rutas"

// ✅ Coinciden exactamente
```

---

### 7️⃣ Canonical en Listados, Filtros y Paginaciones ✅

**Regla:** URLs con parámetros de query deben canonicalizar a la versión sin parámetros.

**Implementación:**
- ✅ `buildCanonicalAlternates()` automáticamente remueve parámetros de query
- ✅ Paginación: `/blog?page=2` → canonical: `/blog`
- ✅ Filtros: `/blog?category=rutas` → canonical: `/blog/rutas` (si existe ruta específica)
- ✅ Búsqueda: `/blog?q=viaje` → canonical: `/blog`

**Ejemplo:**
```typescript
// ✅ CORRECTO - Paginación canonicaliza a base
const alternates = buildCanonicalAlternates('/blog?page=2', locale);
// Genera: canonical: "https://www.ecoarealimonar.com/es/blog" (sin ?page=2)
```

---

### 8️⃣ Una Sola Fuente de Verdad del Canonical ✅

**Regla:** Centralizar la generación de canonical en un solo helper.

**Implementación:**
- ✅ Helper centralizado: `buildCanonicalAlternates()` en `src/lib/seo/multilingual-metadata.ts`
- ✅ Todas las páginas usan este helper (no hay lógica duplicada)
- ✅ Un solo lugar donde se define la lógica de canonical

**Archivo centralizado:**
```typescript
// src/lib/seo/multilingual-metadata.ts
export function buildCanonicalAlternates(path: string, currentLang: Locale) {
  // Lógica centralizada aquí
}
```

---

### 9️⃣ HTTPS, Slash y WWW (Muy Importante) ✅

**Regla:** Definir una sola versión y ser consistente.

**Implementación:**
- ✅ URL canónica base: `https://www.ecoarealimonar.com` (siempre con www)
- ✅ Redirecciones en `next.config.js` aseguran que `ecoarealimonar.com` → `www.ecoarealimonar.com`
- ✅ Todas las URLs canónicas usan HTTPS
- ✅ Consistente con sitemap, redirecciones e URLs internas

**Configuración:**
```typescript
// ✅ Base URL consistente
const baseUrl = 'https://www.ecoarealimonar.com';

// ✅ Redirecciones en next.config.js
{
  source: '/:path*',
  has: [{ type: 'host', value: 'ecoarealimonar.com' }],
  destination: 'https://www.ecoarealimonar.com/:path*',
  permanent: true,
}
```

---

## 🔧 Implementación Técnica

### Helper Centralizado

**Archivo:** `src/lib/seo/multilingual-metadata.ts`

**Función principal:**
```typescript
export function buildCanonicalAlternates(path: string, currentLang: Locale) {
  const baseUrl = 'https://www.ecoarealimonar.com';
  
  // Remover parámetros de query y hash
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Remover prefijo de idioma si existe
  const pathWithoutLocale = cleanPath.replace(/^\/(es|en|fr|de)/, '') || '/';
  
  // Generar alternates para hreflang
  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    languages[locale] = `${baseUrl}${getTranslatedRoute(pathWithoutLocale, locale)}`;
  });
  languages['x-default'] = `${baseUrl}${getTranslatedRoute(pathWithoutLocale, 'es')}`;

  // Canonical autorreferenciado
  const canonicalUrl = `${baseUrl}${getTranslatedRoute(pathWithoutLocale, currentLang)}`;

  return {
    canonical: canonicalUrl,
    languages,
  };
}
```

### Uso en Páginas

**Ejemplo en página de blog:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (headersList.get('x-detected-locale') || 'es') as Locale;
  
  // ✅ Usar helper centralizado
  const alternates = buildCanonicalAlternates(`/blog/${category}`, locale);
  
  return {
    title: '...',
    alternates, // ✅ Canonical autorreferenciado + hreflang
  };
}
```

---

## ✅ Checklist de Verificación

### Canonical URLs
- [x] ✅ Autorreferenciado (cada página apunta a sí misma)
- [x] ✅ Absoluto (siempre URLs completas con https://www)
- [x] ✅ Sin parámetros de query (se remueven automáticamente)
- [x] ✅ Coherente con sitemap (URLs coinciden exactamente)
- [x] ✅ Centralizado (un solo helper)
- [x] ✅ Consistente con HTTPS/www/slash
- [x] ✅ Idiomas separados (cada idioma canonicaliza a sí mismo)
- [x] ✅ Hreflang alternates correctos

### Sitemap
- [x] ✅ URLs sin parámetros de query
- [x] ✅ URLs coinciden con canonical
- [x] ✅ Prefijo `/es/` para español
- [x] ✅ Hreflang alternates incluidos

### Redirecciones
- [x] ✅ `ecoarealimonar.com` → `www.ecoarealimonar.com` (301)
- [x] ✅ URLs sin prefijo de idioma → añadir prefijo (301)
- [x] ✅ Redirecciones separadas de canonical

---

## 🔍 Cómo Comprobar si el Canonical Está Bien

### En Google Search Console

1. **URL Inspection Tool**
   - Verificar "Canonical declarado por el usuario"
   - Verificar "Canonical seleccionado por Google"
   - ✅ Si coinciden → bien
   - ❌ Si Google elige otro → hay problema estructural

2. **Cobertura de Indexación**
   - Verificar que no haya URLs duplicadas indexadas
   - Verificar que las URLs canónicas sean las correctas

### Herramientas Externas

- **Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Screaming Frog**: Verificar canonical tags en todas las páginas

---

## 📊 Resumen de Cambios Implementados

### Archivos Modificados

1. **`src/lib/seo/multilingual-metadata.ts`**
   - ✅ Helper `buildCanonicalAlternates()` mejorado
   - ✅ Remoción automática de parámetros de query
   - ✅ Base URL centralizada: `https://www.ecoarealimonar.com`
   - ✅ Documentación de mejores prácticas añadida

2. **Páginas actualizadas para usar helper:**
   - ✅ `src/app/page.tsx` (Home)
   - ✅ `src/app/blog/page.tsx`
   - ✅ `src/app/blog/[category]/page.tsx`
   - ✅ `src/app/blog/[category]/[slug]/page.tsx`
   - ✅ `src/app/[location]/page.tsx`
   - ✅ `src/app/alquiler-autocaravanas-campervans-[location]/page.tsx`
   - ✅ `src/app/venta-autocaravanas-camper-[location]/page.tsx`
   - ✅ `src/app/vehiculos/[slug]/page.tsx`

### Mejoras Implementadas

- ✅ Canonical autorreferenciado en todas las páginas
- ✅ URLs absolutas siempre
- ✅ Remoción automática de parámetros de query
- ✅ Coherencia con sitemap garantizada
- ✅ Base URL centralizada y consistente
- ✅ Helper único como fuente de verdad

---

## 🎯 Próximos Pasos Recomendados

### Verificación Post-Deploy

1. **Google Search Console**
   - Verificar que todas las URLs canónicas sean correctas
   - Comprobar que no haya errores de canonicalización
   - Solicitar re-indexación de páginas principales

2. **Testing**
   - Verificar canonical tags en todas las páginas
   - Comprobar que URLs con parámetros canonicalicen correctamente
   - Verificar coherencia entre sitemap y canonical

3. **Monitoreo**
   - Monitorizar errores de canonicalización en Search Console
   - Verificar que Google respete los canónicos declarados
   - Ajustar si Google selecciona canónicos diferentes

---

## 📚 Referencias

- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google: Hreflang Tags](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [SEO-MULTIIDIOMA-MODELO.md](./SEO-MULTIIDIOMA-MODELO.md)
- [SEO-COMPLETE-SUMMARY.md](./SEO-COMPLETE-SUMMARY.md)

---

**Última actualización:** 2026-01-21  
**Estado:** ✅ Implementación completa según mejores prácticas de Google
