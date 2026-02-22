# 🚀 OPTIMIZACIONES SEO - ECO AREA LIMONAR (UN SOLO SITIO)

## ✅ RESUMEN EJECUTIVO

**Eco Area Limonar** tiene **una única ubicación**: Los Nietos, Cartagena, Mar Menor. No hay múltiples landing pages por ciudad.

| Página | Prioridad | Estrategia |
|--------|-----------|------------|
| **Home** | ⭐⭐⭐⭐⭐ | Server Component, Schema Campground |
| **Parcelas** | ⭐⭐⭐⭐⭐ | Una página por parcela, SEO dinámico |
| **Tarifas, Reservar, FAQs** | ⭐⭐⭐⭐ | Server Components, metadatos |
| **Blog** | ⭐⭐⭐ | Contenido por artículo |

---

## 🎯 1. PÁGINAS DE PARCELAS (NO LANDINGS POR CIUDAD)

### 📊 Estrategia: SSG + ISR

Cada parcela tiene su propia página con SEO dinámico:

```typescript
export const revalidate = 86400;

export async function generateStaticParams() {
  const parcels = await getAllParcels();
  return parcels.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const parcel = await getParcelBySlug(params.slug);
  
  return {
    title: `${parcel.name} - Parcelas Autocaravanas Mar Menor | Eco Area Limonar`,
    description: `Parcela ${parcel.name} en Los Nietos. ${parcel.length_m}m x ${parcel.width_m}m. Electricidad y servicios. Reserva tu estancia.`,
    openGraph: { /* ... */ },
    alternates: { canonical: url },
  };
}
```

### ✅ Schema y características

- **Campground** (schema único para el área) en layout/home
- **BreadcrumbList** en páginas de parcela
- **Página por parcela**: `/es/parcelas/[slug]`, `/en/parcels/[slug]`, etc.
- **Internal linking**: Home → parcelas → reservar

---

## 🏠 2. HOME PAGE

### 📊 Estrategia Implementada: Server Component con ISR (1 hora)

#### ✅ Arquitectura

```typescript
// ⚡ Revalidación cada hora
export const revalidate = 3600;

// ✅ SERVER COMPONENT (no "use client")
export default async function HomePage() {
  // Datos fetched en el servidor
  const featuredVehicles = await getFeaturedVehicles();
  const blogArticles = await getLatestBlogArticles(3);
  const stats = await getCompanyStats();
  
  return (
    <>
      <OrganizationJsonLd />
      <ProductJsonLd vehicles={featuredVehicles} />
      <WebsiteJsonLd />
      {/* ... contenido ... */}
    </>
  );
}
```

#### ✅ SEO Home Optimizado

```typescript
export const metadata: Metadata = {
  title: "Eco Area Limonar | Área de Autocaravanas Mar Menor - Parcelas Los Nietos",
  description: "Área de autocaravanas en Los Nietos, Cartagena. Parcelas con electricidad y servicios. Reserva tu parcela en el Mar Menor.",
  keywords: "área autocaravanas Mar Menor, parcelas Los Nietos, camping Cartagena, área camper",
  openGraph: { /* Rich content */ },
  alternates: { 
    canonical: "https://www.ecoarealimonar.com/es",
    languages: {
      'es': 'https://www.ecoarealimonar.com/es',
      'en': 'https://www.ecoarealimonar.com/en',
      'fr': 'https://www.ecoarealimonar.com/fr',
      'de': 'https://www.ecoarealimonar.com/de',
      'nl': 'https://www.ecoarealimonar.com/nl',
      'x-default': 'https://www.ecoarealimonar.com/es',
    }
  },
  robots: { index: true, follow: true },
  verification: { google: 'codigo-aqui' } // ⚠️ Añadir tu código real
};
```

#### ✅ Schema.org (Campground, no LocalBusiness multi-ubicación)

1. **Campground**: Información del área (una sola ubicación)
2. **WebSite**: SearchAction para búsquedas internas
3. **BreadcrumbList**: Jerarquía de navegación

#### ✅ Características SEO Avanzadas

- ✅ **Pre-rendering**: Contenido renderizado en servidor
- ✅ **ISR**: Contenido actualizado automáticamente
- ✅ **Campground Schema**: Schema correcto para área de autocaravanas
- ✅ **Image Optimization**: Next.js Image con prioridades correctas
- ✅ **Semantic HTML**: Headers jerárquicos (h1, h2, h3)
- ✅ **Internal linking**: Home → parcelas → reservar → tarifas

---

## 📈 3. OBJETIVOS DE MÉTRICAS

### PÁGINAS DE PARCELAS

| Métrica | Objetivo |
|---------|----------|
| **First Contentful Paint** | < 2.5s |
| **SEO Score** | > 90 |
| **Indexación** | 100% indexable (Server Components) |
| **Structured Data** | Campground + BreadcrumbList |

### HOME PAGE

| Métrica | Objetivo |
|---------|----------|
| **First Contentful Paint** | < 2.5s |
| **SEO Score** | > 90 |
| **Indexación** | Completa |
| **Structured Data** | Campground + WebSite |

---

## 🔧 4. CONFIGURACIÓN TÉCNICA

### Revalidación (ISR)

```typescript
// Páginas de parcelas
export const revalidate = 86400; // 24 horas

// Home Page
export const revalidate = 3600; // 1 hora
```

### Data Fetching con React.cache

```typescript
import { cache } from 'react';

export const getParcelBySlug = cache(async (slug: string) => {
  const supabase = createClient(...);
  return await supabase.from('parcels').select('*').eq('slug', slug).single();
});
```

### generateStaticParams para parcelas

```typescript
export async function generateStaticParams() {
  const parcels = await getAllParcels();
  return parcels.map(p => ({ slug: p.slug }));
}
```

---

## 🎯 5. PRÓXIMOS PASOS RECOMENDADOS

### Acción Inmediata (Hacer Ahora)

1. **Google Search Console**
   - Añadir verificación en metadata (ya preparado)
   - Enviar sitemap.xml: `https://ecoarealimonar.com/sitemap.xml`
   - Solicitar indexación de nuevas URLs

2. **Testing**
   - Rich Results Test: https://search.google.com/test/rich-results
   - PageSpeed Insights: https://pagespeed.web.dev/
   - Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

### Corto Plazo (Esta Semana)

3. **Analytics**
   - Añadir Google Analytics 4
   - Configurar eventos de conversión
   - Tracking de búsquedas internas

4. **Schema.org Adicional**
   - Review snippets (si tienes reviews reales)
   - Video structured data (para tutoriales)

### Medio Plazo (Próximas Semanas)

5. **Content Enhancement**
   - Añadir más FAQs sobre el área y reservas
   - Crear contenido único para Mar Menor / Los Nietos
   - Añadir testimonios de clientes

6. **Performance**
   - Optimizar imágenes existentes a WebP
   - Implementar lazy loading para videos
   - CDN para assets estáticos

---

## 📊 6. MÉTRICAS A MONITORIZAR

### Core Web Vitals
- **LCP** (Largest Contentful Paint): Target < 2.5s ✅
- **FID** (First Input Delay): Target < 100ms ✅
- **CLS** (Cumulative Layout Shift): Target < 0.1 ✅

### SEO
- **Impresiones** en Google Search Console
- **CTR** (Click-Through Rate)
- **Posición media** en resultados
- **Rich results** en SERPs

### Conversión
- **Bounce Rate** de landing pages
- **Time on Page**
- **Formularios completados**
- **Reservas iniciadas**

---

## 🚀 7. COMANDOS ÚTILES

```bash
# Build y verificar
npm run build

# Ver tamaños de bundles
npm run build -- --profile

# Analizar bundle
npx @next/bundle-analyzer

# Test local
npm run dev
```

---

## ✅ 8. CHECKLIST DE VERIFICACIÓN

### Páginas de parcelas
- [ ] Server Components
- [ ] generateStaticParams implementado
- [ ] generateMetadata dinámico
- [ ] Schema Campground (en layout o home)
- [ ] Schema BreadcrumbList
- [ ] ISR configurado (24h)
- [ ] Imágenes optimizadas con Next/Image
- [ ] Canonical URLs
- [ ] Open Graph tags

### Home Page
- [ ] Server Component
- [ ] ISR configurado (1h)
- [ ] Metadata optimizada para Mar Menor / Los Nietos
- [ ] Schema Campground
- [ ] Schema WebSite + SearchAction
- [x] Imágenes optimizadas
- [x] Semantic HTML
- [x] Internal linking
- [x] Call-to-Actions claros

### General
- [x] Build exitoso
- [x] Zero errores de TypeScript
- [x] Lighthouse Score > 90
- [x] Mobile responsive
- [x] Accesibilidad (ARIA labels)

---

## 📞 SOPORTE

Si necesitas ayuda o ajustes adicionales:
- Revisar logs de compilación
- Verificar en Google Search Console
- Monitorizar Core Web Vitals
- Testear con herramientas de Google

---

**Última actualización**: Febrero 2026  
**Modelo**: Un solo sitio (Los Nietos, Mar Menor). No landing pages por ciudad.  
**Modelo SEO Multiidioma**: Ver [SEO-MULTIIDIOMA-MODELO.md](./SEO-MULTIIDIOMA-MODELO.md)
