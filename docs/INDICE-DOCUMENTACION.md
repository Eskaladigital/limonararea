# 📚 ÍNDICE MAESTRO DE DOCUMENTACIÓN - Eco Area Limonar

**Proyecto**: Eco Area Limonar - Área de autocaravanas  
**Dominio objetivo**: ecoarealimonar.com  
**Proyecto**: Eco Area Limonar - Área de autocaravanas  
**Última actualización**: 22 Febrero 2026

Este documento es tu punto de partida para encontrar documentación del proyecto.

---

## 📋 DOCUMENTOS PRINCIPALES ECO AREA LIMONAR

| Documento | Descripción |
|----------|-------------|
| **[00-PROYECTO-ECO-AREA-LIMONAR.md](./00-PROYECTO-ECO-AREA-LIMONAR.md)** | Contexto, reglas, estado Git |
| **[01-PLAN-ECO-AREA-LIMONAR.md](./01-PLAN-ECO-AREA-LIMONAR.md)** | Plan de trabajo por fases |
| **[REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md](./04-referencia/REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md)** | Revisión página a página de /es |

### 🔧 Fix reciente (22 Feb 2026): Migración vehicle→parcel + BD Eco Area

- **last_minute_offers**: `vehicle_id` → `parcel_id` (script `supabase/migrate-last-minute-offers-vehicle-to-parcel.sql`).
- **API**: check-availability y search-tracking usan solo `parcel_id`, `parcel_selected`.
- **Frontend**: Eliminados fallbacks `vehicle`, `vehicle_id` en URLs, booking, ofertas, confirmación, pago.
- **Campos no aplicables**: Eliminadas referencias a `brand`, `model`, `seats`, `beds` (parcelas no los tienen).
- **BD**: `add-eco-area-tables.sql` añade `search_queries`, `last_minute_offers` y RPC `get_active_last_minute_offers`.
- **Detalle**: [CHANGELOG.md](../CHANGELOG.md) → v4.4.8

### 🔧 Fix anterior (21 Feb 2026): i18n Tarifas + Búsqueda (FR/DE/NL)

- **Tarifas**: Porcentajes, "¿Qué incluye tu parcela?", "Electricidad", calendario con meses y días en idioma correcto (date-fns locale).
- **Búsqueda / recherche**: Textos traducidos ("Buscando parcelas...", "Modificar", fechas por idioma); API `/api/availability?locale=` devuelve nombres y descripciones de parcelas traducidos desde `content_translations`.
- **Contenido BD**: `pages-es.json` procesado por el script de IA → traducciones en `content_translations` (source_table `i18n`).
- **Detalle**: [CHANGELOG.md](../CHANGELOG.md) → v4.4.7 | [README.md](../README.md) → Última actualización 21 Feb 2026

### 🔧 Fix anterior (22 Feb 2026): Home - Tarjetas parcelas + imagen galería

- **Tarjetas horizontales**: Sección "Encuentra tu parcela perfecta" con tarjetas más compactas (h-56 lg:h-64).
- **Imagen galería**: Sustituida `AdobeStock_132830655.webp` por `limonar_area_camper_mar_menor_3.webp`. [CHANGELOG.md](../CHANGELOG.md) → v4.4.6

### 🔧 Fix anterior (21 Feb 2026): Hidratación Header

- **Problema**: "Hydration failed" en rutas con Header (p. ej. `/es/faqs`) por diferencia servidor/cliente en el logo (Next.js `Image` vs placeholder).
- **Solución**: Logo del Header en `src/components/layout/header.tsx` pasó a `<img>` nativo; mismo markup en SSR y cliente.
- **Detalle**: [CHANGELOG.md](../CHANGELOG.md) → v4.4.4

### 📦 Repositorio GitHub (21 Feb 2026)

- **Repo**: [github.com/Eskaladigital/limonararea](https://github.com/Eskaladigital/limonararea) — rama **main**. Primer push realizado.
- **Git**: Ver README (Estado de Git) para comandos y troubleshooting (index.lock, permission denied).

---

## 🌍 VERSIÓN - BLOG MULTIIDIOMA

**✅ ESTADO: COMPLETADO** - URLs, títulos y excerpts traducidos en todo el blog.

**MEJORAS IMPLEMENTADAS**: Sistema completo de traducción para el blog.
- **URLs traducidas**: Slugs específicos por idioma (`slug_fr`, `slug_en`, `slug_de`)
- **Contenido traducido**: Títulos y excerpts desde `content_translations`
- **Páginas afectadas**: Blog principal (`/blog`)
- **Fallback inteligente**: Usa español si no hay traducción disponible

Ver **[SISTEMA-TRADUCCIONES-COMPLETO.md](./SISTEMA-TRADUCCIONES-COMPLETO.md)** para cómo se traducen todos los textos (estáticos + Supabase) y qué scripts usar.  
Ver **[02-desarrollo/traducciones/TRADUCCIONES.md](./02-desarrollo/traducciones/TRADUCCIONES.md)** e **I18N_IMPLEMENTATION.md** para detalles de desarrollo.

### 🎯 Highlights v1.0.14:
- ✅ **URLs SEO-friendly**: `/fr/blog/itineraires/noels-differents...` (no español)
- ✅ **Títulos traducidos**: Desde `content_translations` con `source_field='title'`
- ✅ **Excerpts traducidos**: Desde `content_translations` con `source_field='excerpt'`
- ✅ **4 errores críticos corregidos**: Queries incorrectas, columnas inexistentes
- ✅ **Sistema unificado**: Misma lógica en blog principal y páginas especiales

### 🔧 Archivos Modificados:
```
src/lib/home/server-actions.ts          - Query content_translations corregida
src/components/blog/blog-article-link.tsx - Selección slug traducido
src/components/blog/blog-list-client.tsx  - URLs con slugs traducidos
src/components/blog/blog-content.tsx      - Fetch slugs + traducciones
```

### 🐛 Errores Corregidos:
1. **Query incorrecta**: Usaba `language` en vez de `locale`
2. **Columnas inexistentes**: Buscaba `translated_title` en vez de `source_field + translated_text`
3. **Slugs en español**: Links usaban `article.slug` en todos los idiomas
4. **Títulos sin traducir**: No consultaba `content_translations`

---

## 🎟️ SISTEMA DE CUPONES DE DESCUENTO

**✅ ESTADO: TOTALMENTE FUNCIONAL** - Sistema completo de cupones implementado.

**NUEVA FUNCIONALIDAD**: Cupones de descuento para el proceso de reserva.
- **gift**: Un solo uso, personalizados (ej: `RAMON20`)
- **permanent**: Múltiples usos, promociones (ej: `INV2026`)

Ver **[SISTEMA-CUPONES.md](./04-referencia/sistemas/SISTEMA-CUPONES.md)** para detalles completos.

### 🎯 Highlights v1.0.12:
- ✅ **Panel Admin**: Nueva sección `/administrator/cupones`
- ✅ **Validación en tiempo real**: API `/api/coupons/validate`
- ✅ **Integración reservas**: Campo de cupón en `/reservar/nueva`
- ✅ **Cupón INV2026 activo**: 15% descuento, mín 10 días, hasta 20 marzo

### 📦 SQL a ejecutar:
```
01-create-coupons-table.sql
02-create-coupon-usage-table.sql
03-add-coupon-columns-to-bookings.sql
04-create-coupon-validation-function.sql
05-setup-coupon-rls-policies.sql
06-insert-sample-coupons.sql
```

---

## 🔴 VERSIÓN 1.0.11 - Fix error 500 páginas detalle

### 🎯 Highlights v1.0.11:
- ✅ **Cliente Supabase universal**: `@supabase/supabase-js` en lugar de `createBrowserClient`
- ✅ **Renderizado dinámico**: `force-dynamic` para evitar problemas de caché
- ✅ **Middleware actualizado**: Exclusiones para sw-admin.js, workbox, manifests
- ✅ **Try-catch headers()**: Fallback cuando no está disponible

### ⚠️ Lección Aprendida:
- **NO usar `createBrowserClient`** en Server Components
- **Páginas con middleware i18n** funcionan mejor con `force-dynamic`
- **Service Workers no toleran redirecciones** - excluir del middleware

---

## 🔧 VERSIÓN 1.0.8 - FIX CRÍTICO BÚSQUEDA Y SEO

**✅ ESTADO: TOTALMENTE FUNCIONAL** - Página de búsqueda y Analytics restaurados.

**PROBLEMA RESUELTO**: La página `/buscar` dejó de funcionar tras la auditoría SEO de metatítulos. Al separar componentes client/server, se simplificaron incorrectamente las props del `VehicleCard`. **AHORA FUNCIONA CORRECTAMENTE**.

Ver **[CHANGELOG.md](./CHANGELOG.md)** para:
- 🔧 **v1.0.8 (ACTUAL)**: Fix crítico búsqueda + CSP Google Analytics
- 🎨 **v1.0.7**: Layout condicional admin vs público
- 🏗️ **v1.0.6**: Refactorización layout global
- 🎨 **v1.0.5**: Unificación visualización vehículos Home
- 🔴 **v1.0.4**: Fix crítico sistema autenticación - Eliminado singleton
- ✅ **v1.0.3**: Sistema dual de pagos (Redsys + Stripe)

### 🎯 Highlights v1.0.8:
- ✅ **VehicleCard restaurado**: Props `pricing` y `searchParams` correctas
- ✅ **SearchSummary completo**: Fondo azul, cálculo de días funcional
- ✅ **CSP actualizado**: Google Analytics sin errores de bloqueo
- ✅ **iOS Safari fix**: Campos de fecha con ancho correcto en formulario de reserva

### ⚠️ Lección Aprendida:
Al refactorizar código para SEO (separar client/server), **copiar exactamente** el código original. No simplificar ni "mejorar" durante la refactorización.

---

## 🔴 VERSIÓN 1.0.4 - FIX CRÍTICO AUTENTICACIÓN

**✅ ESTADO: TOTALMENTE FUNCIONAL** - Fix crítico del sistema de autenticación aplicado.

**PROBLEMA RESUELTO**: TODAS las secciones del administrador dejaron de funcionar debido a un patrón singleton en el cliente Supabase. **AHORA TODAS FUNCIONAN**.

### 🚨 Highlights v1.0.4:
- 🔴 **FIX CRÍTICO**: Eliminado singleton en `src/lib/supabase/client.ts`
- ✅ **TODAS las secciones del admin funcionando**: Vehículos, Reservas, Clientes, Pagos, Extras, Equipamiento, Temporadas, Ubicaciones, Calendario
- ✅ **Calendario optimizado**: Carga en lotes de booking_extras
- ✅ **Meta Pixel**: Carga condicional sin errores
- ✅ **Validaciones**: Checks de null antes de usar datos

**⚠️ LECCIÓN APRENDIDA**: SI ALGO FUNCIONA, NO LO TOQUES. Ver `README.md` sección "Reglas Absolutas".

---

## 🚨 DOCUMENTOS CRÍTICOS - LEER PRIMERO

**⚠️ OBLIGATORIO leer antes de modificar cualquier código**

| Documento | Descripción | Cuándo leer |
|-----------|-------------|-------------|
| **[README.md](./README.md)** | Punto de entrada principal, arquitectura completa | **SIEMPRE PRIMERO** |
| **[CHANGELOG.md](./CHANGELOG.md)** | Historial versiones, **v1.0.11 FIX ERROR 500** | Al debuggear o deployar |
| **[AUDITORIA-SEGURIDAD-2026.md](./03-mantenimiento/AUDITORIA-SEGURIDAD-2026.md)** | 🔒 **NUEVO** - Auditoría completa de seguridad | Antes de deployar cambios críticos |
| **[ATAQUES-EXTERNOS-AMENAZAS.md](./03-mantenimiento/ATAQUES-EXTERNOS-AMENAZAS.md)** | 🔒 **NUEVO** - Análisis de amenazas externas | Para entender riesgos de seguridad |
| **[REGLAS-ARQUITECTURA-NEXTJS.md](./REGLAS-ARQUITECTURA-NEXTJS.md)** | ⚠️ **INCLUYE REGLAS DE SUPABASE CLIENT** | Antes de tocar CUALQUIER código |
| **[REGLAS-SUPABASE-OBLIGATORIAS.md](./REGLAS-SUPABASE-OBLIGATORIAS.md)** | ⚠️ **REGLAS OBLIGATORIAS** - Queries a Supabase | ANTES de hacer ANY query |
| **[SUPABASE-SCHEMA-REAL.md](./SUPABASE-SCHEMA-REAL.md)** | Schema real con campos exactos | Al consultar tablas |
| **[GUIA-QUERIES-VEHICULOS.md](./04-referencia/vehiculos/GUIA-QUERIES-VEHICULOS.md)** | Queries parcelas (tabla parcels) | Antes de tocar `/parcelas/**` o `/reservar/parcela` |
| **[GESTION-CLIENTES-OBLIGATORIO.md](./GESTION-CLIENTES-OBLIGATORIO.md)** | ⚠️ Gestión de clientes | Antes de tocar `/reservar/nueva` o formularios de cliente |
| **[FLUJO-RESERVAS-CRITICO.md](./FLUJO-RESERVAS-CRITICO.md)** | ⚠️ **CORE DEL NEGOCIO** - Flujo de reservas | Antes de tocar /reservar/** |
| **[SISTEMA-CUPONES.md](./SISTEMA-CUPONES.md)** | 🎟️ Sistema de cupones de descuento | Antes de tocar cupones o `/reservar/nueva` |
| **[GUIA-TRADUCCION.md](./GUIA-TRADUCCION.md)** | Sistema de traducción dual | Cuando uses `t()` |
| **[CHECKLIST-PRE-COMMIT.md](./CHECKLIST-PRE-COMMIT.md)** | Verificación pre-commit | Antes de cada commit |

---

## 📖 DOCUMENTACIÓN POR ÁREA

### 🔐 **Autenticación y Sistema de Datos (CRÍTICO)**

| Documento | Descripción |
|-----------|-------------|
| **[CHANGELOG.md](./CHANGELOG.md)** | Fix crítico sistema autenticación v1.0.4 (ver sección v1.0.4) |
| **[CONFIGURACION-META-PIXEL.md](./CONFIGURACION-META-PIXEL.md)** | Configuración Meta Pixel con carga condicional |
| **[CONFIGURACION-GOOGLE-ANALYTICS.md](./CONFIGURACION-GOOGLE-ANALYTICS.md)** | Configuración Google Analytics (G-G5YLBN5XXZ) con exclusión de páginas admin |
| **README.md** | Sección "Sistema de Autenticación - CÓMO FUNCIONA" |

### 🔒 **Seguridad (NUEVO - Febrero 2026)**

| Documento | Descripción |
|-----------|-------------|
| **[AUDITORIA-SEGURIDAD-2026.md](./03-mantenimiento/AUDITORIA-SEGURIDAD-2026.md)** | ⚠️ **NUEVO** - Auditoría completa de seguridad con vulnerabilidades identificadas |
| **[ATAQUES-EXTERNOS-AMENAZAS.md](./03-mantenimiento/ATAQUES-EXTERNOS-AMENAZAS.md)** | ⚠️ **NUEVO** - Análisis detallado de amenazas externas y vectores de ataque |
| **[CORRECCIONES-SEGURAS-SIN-AFECTAR.md](./03-mantenimiento/CORRECCIONES-SEGURAS-SIN-AFECTAR.md)** | ⚠️ **NUEVO** - Estrategia de correcciones de seguridad sin afectar funcionalidad |
| **[GUIA-CAMBIAR-TOKEN-CALENDARIO.md](./03-mantenimiento/GUIA-CAMBIAR-TOKEN-CALENDARIO.md)** | ⚠️ **NUEVO** - Guía paso a paso para cambiar tokens de calendario en Vercel |

### 🌍 Internacionalización (i18n)

| Documento | Descripción |
|-----------|-------------|
| **[I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md)** | Sistema de URLs localizadas, middleware |
| **[TRADUCCIONES.md](./TRADUCCIONES.md)** | Traducciones estáticas, diccionario |
| **[GUIA-TRADUCCION.md](./GUIA-TRADUCCION.md)** | Sistema dual translateServer vs useLanguage |

### 🔍 SEO

| Documento | Descripción |
|-----------|-------------|
| **[SEO-MULTIIDIOMA-MODELO.md](./SEO-MULTIIDIOMA-MODELO.md)** | ⚠️ **CRÍTICO** - Modelo SEO multiidioma con /es/ obligatorio |
| **[AUDITORIA-SEO-CRITICA.md](./AUDITORIA-SEO-CRITICA.md)** | Por qué Server Components son críticos |
| **[NORMAS-SEO-OBLIGATORIAS.md](./NORMAS-SEO-OBLIGATORIAS.md)** | Normas SEO del proyecto |

### 👨‍💼 Administración

| Documento | Descripción |
|-----------|-------------|
| **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** | Configuración inicial, roles |
| **[BUSCADOR-GLOBAL-ADMIN.md](./BUSCADOR-GLOBAL-ADMIN.md)** | Buscador global inteligente |
| **[PWA-ADMIN-GUIA.md](./PWA-ADMIN-GUIA.md)** | ⚠️ **NUEVO** - PWA para panel de administrador |
| **[ICONOS-PWA.md](./ICONOS-PWA.md)** | Generación de iconos para PWA |

### 🖼️ Sistema de Medios y Storage

| Documento | Descripción |
|-----------|-------------|
| **[GESTION-IMAGENES-SUPABASE.md](./GESTION-IMAGENES-SUPABASE.md)** | ⚠️ **GUÍA MAESTRA** - Reglas absolutas, estructura de buckets, especificaciones técnicas |
| **[RESUMEN-FINAL-SISTEMA-COMPLETO.md](./RESUMEN-FINAL-SISTEMA-COMPLETO.md)** | ⚠️ Resumen ejecutivo de toda la integración |
| **[GALERIA-VEHICULOS-STORAGE-INTEGRADO.md](./GALERIA-VEHICULOS-STORAGE-INTEGRADO.md)** | ⚠️ Galería de vehículos integrada con storage |
| **[GESTION-MEDIA-STORAGE.md](./GESTION-MEDIA-STORAGE.md)** | ⚠️ Documentación completa del sistema de media storage |
| **[SOLUCION-RAPIDA-MEDIA.md](./SOLUCION-RAPIDA-MEDIA.md)** | ⚠️ Solución rápida en 3 pasos (4 minutos) |
| **[FAQ-MEDIA-STORAGE.md](./FAQ-MEDIA-STORAGE.md)** | ⚠️ Preguntas frecuentes sobre storage |
| **[RESUMEN-CAMBIOS-MEDIA.md](./RESUMEN-CAMBIOS-MEDIA.md)** | ⚠️ Resumen de cambios implementados |
| **[SISTEMA-MEDIA-RESUMEN.md](./SISTEMA-MEDIA-RESUMEN.md)** | Gestión de medios y Storage (referencia anterior) |
| **[GALERIA-MULTIPLE-VEHICULOS.md](./GALERIA-MULTIPLE-VEHICULOS.md)** | Galería múltiple con drag & drop (documentación original) |
| **[SLIDER-IMAGENES-VEHICULOS.md](./SLIDER-IMAGENES-VEHICULOS.md)** | Slider de 2-3 imágenes en tarjetas de vehículos |
| **[IMAGENES-HERO-SLIDES.md](./IMAGENES-HERO-SLIDES.md)** | Imágenes hero de la homepage |
| **[MIGRACION-IMAGENES-BLOG-RESUMEN.md](./MIGRACION-IMAGENES-BLOG-RESUMEN.md)** | Migración de imágenes del blog a Supabase Storage |

### 💼 Reservas

| Documento | Descripción |
|-----------|-------------|
| **[FLUJO-RESERVAS-CRITICO.md](./FLUJO-RESERVAS-CRITICO.md)** | ⚠️ **CORE DEL NEGOCIO** - Flujo completo paso a paso |
| **[GESTION-CLIENTES-OBLIGATORIO.md](./GESTION-CLIENTES-OBLIGATORIO.md)** | ⚠️ **NUEVO** - Reglas gestión de clientes |
| **[REGLA-CALCULO-DIAS-ALQUILER.md](./REGLA-CALCULO-DIAS-ALQUILER.md)** | ⚠️ **CRÍTICO** - Cálculo de días con períodos de 24h |
| **[RESUMEN-IMPLEMENTACION-DIAS.md](./RESUMEN-IMPLEMENTACION-DIAS.md)** | Resumen técnico de la implementación del cálculo de días |

### 💳 Pagos y Notificaciones

| Documento | Descripción |
|-----------|-------------|
| **[REDSYS-CONFIGURACION.md](./REDSYS-CONFIGURACION.md)** | Integración con TPV Redsys (0.3% comisión) |
| **[STRIPE-CONFIGURACION.md](./STRIPE-CONFIGURACION.md)** | ⚠️ **NUEVO** - Integración con Stripe (alternativa) |
| **[STRIPE-VERCEL-PRODUCCION.md](./STRIPE-VERCEL-PRODUCCION.md)** | ⚠️ **NUEVO** - 🚀 Configurar Stripe en Vercel (USAR ESTE) |
| **[STRIPE-SETUP-RAPIDO.md](./STRIPE-SETUP-RAPIDO.md)** | Guía para desarrollo local (localhost) |
| **[METODOS-PAGO-RESUMEN.md](./METODOS-PAGO-RESUMEN.md)** | ⚠️ **NUEVO** - Comparativa y decisiones de métodos de pago |
| **[SISTEMA-EMAILS.md](./SISTEMA-EMAILS.md)** | Sistema completo de envío de emails |
| **[PRUEBAS-EMAILS.md](./PRUEBAS-EMAILS.md)** | Guía de testing del sistema de emails |
| **[IMPLEMENTACION-EMAILS-RESUMEN.md](./IMPLEMENTACION-EMAILS-RESUMEN.md)** | Resumen técnico de la implementación |

### 📅 Temporadas

| Documento | Descripción |
|-----------|-------------|
| **[SISTEMA_TEMPORADAS.md](./SISTEMA_TEMPORADAS.md)** | Gestión de temporadas y tarifas |

### 🎨 Diseño

| Documento | Descripción |
|-----------|-------------|
| **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** | Sistema de diseño, colores, tipografía |
| **[RESPONSIVE_STRATEGY.md](./RESPONSIVE_STRATEGY.md)** | Estrategia responsive, breakpoints |

### ✍️ Contenido y Blog

| Documento | Descripción |
|-----------|-------------|
| **[TINY_EDITOR_README.md](./TINY_EDITOR_README.md)** | Configuración de TinyMCE |
| **[GENERACION-CONTENIDO-IA.md](./GENERACION-CONTENIDO-IA.md)** | Herramientas IA para clientes |
| **[SOLUCION-BLOG-FRONTEND.md](./SOLUCION-BLOG-FRONTEND.md)** | ⚠️ Solución: Blog no carga en frontend (RLS) |

### 🗄️ Base de Datos

⚠️ **DOCUMENTOS CRÍTICOS:**
- **[REGLAS-SUPABASE-OBLIGATORIAS.md](./REGLAS-SUPABASE-OBLIGATORIAS.md)** - ⚠️ LEER ANTES DE QUERIES
- **[SUPABASE-SCHEMA-REAL.md](./SUPABASE-SCHEMA-REAL.md)** - Schema real con campos exactos
- **[GUIA-QUERIES-VEHICULOS.md](./04-referencia/vehiculos/GUIA-QUERIES-VEHICULOS.md)** - Queries parcelas (tabla parcels)
- **[GESTION-CLIENTES-OBLIGATORIO.md](./GESTION-CLIENTES-OBLIGATORIO.md)** - ⚠️ **NUEVO** - Gestión de clientes

Ver carpeta `supabase/`:
- **[supabase/README-ECO-AREA.md](../supabase/README-ECO-AREA.md)** - Orden de ejecución Eco Area
- **[supabase/schema-eco-area-limonar.sql](../supabase/schema-eco-area-limonar.sql)** - Esquema completo
- **[supabase/add-eco-area-tables.sql](../supabase/add-eco-area-tables.sql)** - search_queries, last_minute_offers + RPC
- **[supabase/create-first-admin.sql](../supabase/create-first-admin.sql)** - Crear admin

Ver carpeta `scripts/`:
- **`migrate-old-data.ts`** - Script principal de migración (mejorado)
- **`fix-customer-links.ts`** - Reparación automática post-migración
- **`link-bookings-interactive.ts`** - Vinculación interactiva manual

---

## 🎯 GUÍAS RÁPIDAS

### Estoy empezando
1. Lee **[README.md](./README.md)** - **SECCIÓN "REGLAS ABSOLUTAS"** ⚠️
2. Lee **[CHANGELOG.md](./CHANGELOG.md)** v1.0.4 - Ver qué se rompió antes
3. Configura con **[supabase/SETUP.md](./supabase/SETUP.md)**
4. Crea admin con **[ADMIN_SETUP.md](./ADMIN_SETUP.md)**

### Voy a trabajar con autenticación o datos
1. Lee **[README.md](./README.md)** sección "Sistema de Autenticación" ⚠️ **OBLIGATORIO**
2. Lee **[CHANGELOG.md](./CHANGELOG.md)** v1.0.4 ⚠️
3. Lee **[REGLAS-SUPABASE-OBLIGATORIAS.md](./REGLAS-SUPABASE-OBLIGATORIAS.md)** ⚠️
4. **NO TOQUES** `src/lib/supabase/client.ts` ni `server.ts`
5. **NO TOQUES** los hooks `use-paginated-data.ts`, `use-admin-data.ts`, `use-all-data-progressive.ts`

### Voy a trabajar con reservas o clientes
1. Lee **[FLUJO-RESERVAS-CRITICO.md](./FLUJO-RESERVAS-CRITICO.md)** ⚠️ **OBLIGATORIO**
2. Lee **[GESTION-CLIENTES-OBLIGATORIO.md](./GESTION-CLIENTES-OBLIGATORIO.md)** ⚠️ **NUEVO**
3. Lee **[REGLA-CALCULO-DIAS-ALQUILER.md](./REGLA-CALCULO-DIAS-ALQUILER.md)** ⚠️ **CRÍTICO**
4. Verifica que existen todas las páginas listadas
5. NO modifiques el flujo sin documentar

### Voy a modificar una página pública
1. Lee **[REGLAS-ARQUITECTURA-NEXTJS.md](./REGLAS-ARQUITECTURA-NEXTJS.md)** ⚠️
2. Lee **[GUIA-TRADUCCION.md](./GUIA-TRADUCCION.md)** ⚠️
3. Antes de commit: **[CHECKLIST-PRE-COMMIT.md](./CHECKLIST-PRE-COMMIT.md)** ⚠️

### Voy a trabajar con traducciones
1. Lee **[GUIA-TRADUCCION.md](./GUIA-TRADUCCION.md)** ⚠️
2. Consulta **[TRADUCCIONES.md](./TRADUCCIONES.md)**
3. Revisa **[I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md)**

### Voy a trabajar con SEO
1. Lee **[AUDITORIA-SEO-CRITICA.md](./AUDITORIA-SEO-CRITICA.md)**
2. Aplica **[NORMAS-SEO-OBLIGATORIAS.md](./NORMAS-SEO-OBLIGATORIAS.md)**
3. Verifica con **[CHECKLIST-PRE-COMMIT.md](./CHECKLIST-PRE-COMMIT.md)**

### Voy a configurar pagos o emails
1. Lee **[METODOS-PAGO-RESUMEN.md](./METODOS-PAGO-RESUMEN.md)** ⚠️ **NUEVO** - Ver estado actual
2. Para Redsys: **[REDSYS-CONFIGURACION.md](./REDSYS-CONFIGURACION.md)**
3. Para Stripe EN PRODUCCIÓN: **[STRIPE-VERCEL-PRODUCCION.md](./STRIPE-VERCEL-PRODUCCION.md)** ⚠️ **NUEVO** 🚀
4. Para Stripe en local: **[STRIPE-SETUP-RAPIDO.md](./STRIPE-SETUP-RAPIDO.md)**
5. Para emails: **[SISTEMA-EMAILS.md](./SISTEMA-EMAILS.md)**
6. Testing de emails: **[PRUEBAS-EMAILS.md](./PRUEBAS-EMAILS.md)**

### Voy a trabajar con imágenes, storage o gestión de media
1. Lee **[RESUMEN-FINAL-SISTEMA-COMPLETO.md](./RESUMEN-FINAL-SISTEMA-COMPLETO.md)** ⚠️ **NUEVO** - Visión general
2. Para setup rápido: **[SOLUCION-RAPIDA-MEDIA.md](./SOLUCION-RAPIDA-MEDIA.md)** ⚠️ - Solución en 4 minutos
3. Para entender storage: **[GESTION-MEDIA-STORAGE.md](./GESTION-MEDIA-STORAGE.md)** ⚠️ - Documentación completa
4. Para galería de vehículos: **[GALERIA-VEHICULOS-STORAGE-INTEGRADO.md](./GALERIA-VEHICULOS-STORAGE-INTEGRADO.md)** ⚠️ **NUEVO**
5. Consulta dudas en: **[FAQ-MEDIA-STORAGE.md](./FAQ-MEDIA-STORAGE.md)** ⚠️ **NUEVO**
6. Ejecuta script SQL: `supabase/configurar-storage-media-extras.sql`
7. Verifica con diagnóstico: `supabase/diagnostico-storage-completo.sql`

### Voy a trabajar con parcelas/imágenes
1. Lee **[SISTEMA-MEDIA-RESUMEN.md](./02-desarrollo/media/SISTEMA-MEDIA-RESUMEN.md)**
2. Para galería: **[GALERIA-VEHICULOS-STORAGE-INTEGRADO.md](./02-desarrollo/media/GALERIA-VEHICULOS-STORAGE-INTEGRADO.md)** (aplica a parcelas)

---

## 🗂️ ARCHIVOS DE DOCUMENTACIÓN ACTIVOS

```
📁 limonar-app/
├── 🚨 README.md                           ← Punto de entrada + REGLAS ABSOLUTAS
├── 📋 CHANGELOG.md                        ← Historial (v1.0.5 VEHÍCULOS + v1.0.4 FIX CRÍTICO)
├── 🔴 REGLAS-ARQUITECTURA-NEXTJS.md       ← INCLUYE REGLAS SUPABASE CLIENT
├── 🔴 REGLAS-SUPABASE-OBLIGATORIAS.md     ← ⚠️ LEER ANTES DE QUERIES
├── 🔴 CONFIGURACION-META-PIXEL.md         ← Meta Pixel condicional
├── 🔴 CONFIGURACION-GOOGLE-ANALYTICS.md   ← ⚠️ NUEVO - Google Analytics con exclusión admin
├── 🚨 SUPABASE-SCHEMA-REAL.md             ← Schema real con campos exactos
├── 🚨 PAGINAS-VEHICULOS-GARANTIA.md       ← ⚠️ Garantía páginas vehículos
├── 🚨 GESTION-CLIENTES-OBLIGATORIO.md     ← ⚠️ Gestión de clientes
├── 🚨 FLUJO-RESERVAS-CRITICO.md           ← CORE DEL NEGOCIO
├── 🚨 REGLA-CALCULO-DIAS-ALQUILER.md      ← ⚠️ CRÍTICO - Cálculo días 24h
├── 📖 RESUMEN-IMPLEMENTACION-DIAS.md      ← Resumen técnico días
├── 🚨 GUIA-TRADUCCION.md                  ← CRÍTICO
├── 🚨 CHECKLIST-PRE-COMMIT.md             ← Usar antes de commit
├── 🚨 AUDITORIA-SEO-CRITICA.md            ← Leer antes de cambios
├── 🚨 NORMAS-SEO-OBLIGATORIAS.md          ← Normas SEO
├── 📖 I18N_IMPLEMENTATION.md              ← i18n técnico
├── 📖 TRADUCCIONES.md                     ← Traducciones
├── 📖 GUIA-QUERIES-VEHICULOS.md           ← Queries vehículos
├── 📖 ADMIN_SETUP.md                      ← Setup admin
├── 📖 BUSCADOR-GLOBAL-ADMIN.md            ← Buscador
├── 📖 PWA-ADMIN-GUIA.md                   ← ⚠️ NUEVO - PWA panel administrador
├── 📖 ICONOS-PWA.md                       ← Generación iconos PWA
├── 📖 RESUMEN-FINAL-SISTEMA-COMPLETO.md  ← ⚠️ NUEVO - Resumen ejecutivo integración completa
├── 📖 GALERIA-VEHICULOS-STORAGE-INTEGRADO.md ← ⚠️ NUEVO - Galería + Storage integrados
├── 📖 SISTEMA-MEDIA-RESUMEN.md            ← Medios (referencia anterior)
├── 📖 GESTION-MEDIA-STORAGE.md            ← ⚠️ NUEVO - Gestión completa de storage
├── 📖 SOLUCION-RAPIDA-MEDIA.md            ← ⚠️ NUEVO - Solución rápida en 4 minutos
├── 📖 FAQ-MEDIA-STORAGE.md                ← ⚠️ NUEVO - Preguntas frecuentes storage
├── 📖 RESUMEN-CAMBIOS-MEDIA.md            ← ⚠️ NUEVO - Resumen cambios media
├── 📖 GALERIA-MULTIPLE-VEHICULOS.md       ← Galería vehículos (doc original)
├── 📖 SISTEMA_TEMPORADAS.md               ← Temporadas
├── 📖 REDSYS-CONFIGURACION.md             ← Pagos Redsys
├── 📖 STRIPE-CONFIGURACION.md             ← ⚠️ NUEVO - Pagos Stripe (referencia)
├── 📖 STRIPE-VERCEL-PRODUCCION.md         ← ⚠️ NUEVO - 🚀 Setup Stripe EN PRODUCCIÓN
├── 📖 STRIPE-SETUP-RAPIDO.md              ← Setup Stripe en localhost
├── 📖 METODOS-PAGO-RESUMEN.md             ← ⚠️ NUEVO - Comparativa pagos
├── 📖 SISTEMA-EMAILS.md                   ← Sistema de emails
├── 📖 PRUEBAS-EMAILS.md                   ← ⚠️ NUEVO - Testing de emails
├── 📖 IMPLEMENTACION-EMAILS-RESUMEN.md    ← ⚠️ NUEVO - Resumen implementación
├── 📖 TINY_EDITOR_README.md               ← TinyMCE
├── 📖 GENERACION-CONTENIDO-IA.md          ← IA tools
├── 📖 SOLUCION-BLOG-FRONTEND.md           ← ⚠️ Blog no carga (RLS)
├── 📖 DESIGN_SYSTEM.md                    ← Diseño
├── 📖 RESPONSIVE_STRATEGY.md              ← Responsive
└── 📁 supabase/
    ├── README.md
    ├── SETUP.md
    └── *.sql
```

---

## 🔍 BUSCAR INFORMACIÓN

### Por Tema

- **Autenticación y datos**: `CHANGELOG.md` v1.0.4, `REGLAS-SUPABASE-OBLIGATORIAS.md`
- **Cliente Supabase**: `README.md` sección "Sistema de Autenticación", `REGLAS-ARQUITECTURA-NEXTJS.md`
- **Calendario admin**: `CHANGELOG.md` v1.0.4 (sección calendario)
- **Meta Pixel**: `CONFIGURACION-META-PIXEL.md`
- **Google Analytics**: `CONFIGURACION-GOOGLE-ANALYTICS.md` ⚠️ **NUEVO**
- **Reservas**: `FLUJO-RESERVAS-CRITICO.md` ⚠️ **CORE DEL NEGOCIO**
- **Clientes**: `GESTION-CLIENTES-OBLIGATORIO.md` ⚠️ **NUEVO**
- **Cálculo de días**: `REGLA-CALCULO-DIAS-ALQUILER.md` ⚠️ **CRÍTICO**
- **Arquitectura y reglas**: `REGLAS-ARQUITECTURA-NEXTJS.md`
- **Traducciones**: `GUIA-TRADUCCION.md`, `TRADUCCIONES.md`
- **SEO**: `SEO-MULTIIDIOMA-MODELO.md`, `PAGINAS-MOTORHOME-EUROPA-MULTIIDIOMA.md`, `AUDITORIA-SEO-CRITICA.md`, `NORMAS-SEO-OBLIGATORIAS.md`
- **i18n**: `I18N_IMPLEMENTATION.md`
- **Admin**: `ADMIN_SETUP.md`, `BUSCADOR-GLOBAL-ADMIN.md`, `PWA-ADMIN-GUIA.md` ⚠️ **NUEVO**
- **Medios**: `GESTION-MEDIA-STORAGE.md` ⚠️ **NUEVO**, `SOLUCION-RAPIDA-MEDIA.md` ⚠️ **NUEVO**, `FAQ-MEDIA-STORAGE.md` ⚠️ **NUEVO**, `SISTEMA-MEDIA-RESUMEN.md`, `GALERIA-MULTIPLE-VEHICULOS.md`
- **Pagos**: `METODOS-PAGO-RESUMEN.md` ⚠️ **NUEVO**, `REDSYS-CONFIGURACION.md`, `STRIPE-CONFIGURACION.md` ⚠️ **NUEVO**
- **Emails**: `SISTEMA-EMAILS.md`, `PRUEBAS-EMAILS.md`
- **Blog**: `SOLUCION-BLOG-FRONTEND.md` ⚠️ Si no cargan artículos
- **Base de datos**: `supabase/README.md`, `supabase/schema.sql`

### Por Pregunta

| Pregunta | Documento |
|----------|-----------|
| ¿Por qué el admin dejó de funcionar? | `CHANGELOG.md` v1.0.4 |
| ¿Cómo uso correctamente el cliente Supabase? | `README.md` + `REGLAS-ARQUITECTURA-NEXTJS.md` |
| ¿Puedo modificar `client.ts` o `server.ts`? | **NO** - Ver `README.md` sección "Reglas Absolutas" |
| ¿Por qué el calendario no carga? | `CHANGELOG.md` v1.0.4 (sección calendario) |
| ¿Cómo configuro Meta Pixel? | `CONFIGURACION-META-PIXEL.md` |
| ¿Cómo configuro Google Analytics? | `CONFIGURACION-GOOGLE-ANALYTICS.md` ⚠️ **NUEVO** |
| ¿Puedo usar `"use client"` en esta página? | `REGLAS-ARQUITECTURA-NEXTJS.md` |
| ¿Cómo traduzco en Server Component? | `GUIA-TRADUCCION.md` |
| ¿Por qué no puedo usar useLanguage()? | `GUIA-TRADUCCION.md` |
| ¿Cómo configuro SEO? | `NORMAS-SEO-OBLIGATORIAS.md` |
| ¿Cómo creo un admin? | `ADMIN_SETUP.md` |
| ¿Cómo subo imágenes? | `SISTEMA-MEDIA-RESUMEN.md` |
| ¿Cómo funciona el pago? | `METODOS-PAGO-RESUMEN.md`, `REDSYS-CONFIGURACION.md` |
| ¿Cómo configurar Stripe EN PRODUCCIÓN? | `STRIPE-VERCEL-PRODUCCION.md` ⚠️ **NUEVO** 🚀 |
| ¿Cómo configurar Stripe en local? | `STRIPE-SETUP-RAPIDO.md` |
| ¿Qué método de pago usar? | `METODOS-PAGO-RESUMEN.md` ⚠️ **NUEVO** |
| ¿Cómo configurar emails automáticos? | `SISTEMA-EMAILS.md` |
| ¿Cómo probar el sistema de emails? | `PRUEBAS-EMAILS.md` ⚠️ **NUEVO** |
| ¿Cómo subo imágenes? | `GESTION-MEDIA-STORAGE.md`, `SOLUCION-RAPIDA-MEDIA.md` ⚠️ **NUEVO** |
| ¿Cómo creo carpetas en storage? | `SOLUCION-RAPIDA-MEDIA.md` ⚠️ **NUEVO** |
| ¿Por qué "Nueva Carpeta" no funciona? | `SOLUCION-RAPIDA-MEDIA.md` ⚠️ **NUEVO** |
| ¿Cómo organizo imágenes por buckets? | `GESTION-MEDIA-STORAGE.md`, `FAQ-MEDIA-STORAGE.md` ⚠️ **NUEVO** |
| ¿Cómo funcionan las temporadas? | `SISTEMA_TEMPORADAS.md` |
| ¿Por qué no cargan los artículos del blog? | `SOLUCION-BLOG-FRONTEND.md` |
| ¿Cómo se calculan los días de alquiler? | `REGLA-CALCULO-DIAS-ALQUILER.md` ⚠️ **CRÍTICO** |
| ¿Por qué cobran día completo si excedo 1 minuto? | `REGLA-CALCULO-DIAS-ALQUILER.md` ⚠️ **CRÍTICO** |
| ¿Cómo instalar el panel de admin como PWA? | `PWA-ADMIN-GUIA.md` ⚠️ **NUEVO** |
| ¿Qué vulnerabilidades de seguridad se encontraron? | `AUDITORIA-SEGURIDAD-2026.md` ⚠️ **NUEVO** |
| ¿Qué amenazas externas existen? | `ATAQUES-EXTERNOS-AMENAZAS.md` ⚠️ **NUEVO** |
| ¿Cómo cambiar el token del calendario? | `GUIA-CAMBIAR-TOKEN-CALENDARIO.md` ⚠️ **NUEVO** |

---

## ✅ DOCUMENTOS OBSOLETOS ELIMINADOS

Estos documentos ya NO existen (fueron eliminados):

### Eliminados el 8 de Enero, 2026:
- ❌ `MULTIIDIOMA-AUDIT.md` - Obsoleto
- ❌ `MULTIIDIOMA-INFORME-COMPLETO.md` - Obsoleto
- ❌ `CORRECCION-ENLACES-MULTIIDIOMA.md` - Obsoleto
- ❌ `CORRECCION-NAVEGACION.md` - Obsoleto
- ❌ `OPTIMIZACION-NAVEGACION.md` - Obsoleto
- ❌ `AUDITORIA-SEO-ENLACES-COMPLETA.md` - Obsoleto
- ❌ `OPTIMIZACION-SEO-COMPLETADA.md` - Obsoleto
- ❌ `JERARQUIA-SEO-LOCATIONS.md` - Obsoleto
- ❌ `SEO-LOCATIONS-IMPLEMENTATION.md` - Obsoleto
- ❌ `SEO-LOCATIONS-MULTILANG.md` - Obsoleto
- ❌ `ESTADO-ACTUAL-MEDIA.md` - Obsoleto
- ❌ `SELECTOR-CON-CARPETAS-COMPLETO.md` - Obsoleto
- ❌ `SELECTOR-IMAGENES-INTEGRADO.md` - Obsoleto
- ❌ `SISTEMA-CARPETAS-MEDIA.md` - Obsoleto
- ❌ `SISTEMA-IMAGENES-VEHICULOS.md` - Obsoleto
- ❌ `ORGANIZACION-BLOG-CARPETAS.md` - Obsoleto
- ❌ `RESUMEN-MIGRACION-BLOG.md` - Obsoleto
- ❌ `BLOG-TRANSLATION-README.md` - Obsoleto

### Eliminados el 20 de Enero, 2026:
- ❌ `DOCUMENTACION-COMPLETA-v1.0.4.md` - Resumen temporal de auditoría (información ya está en README.md y CHANGELOG.md)
- ❌ `FIX-SINGLETON-PENDIENTE.md` - Lista de archivos pendientes de corrección (ya completado)
- ❌ `CORRECCION-ERRORES-ADMIN.md` - Fix crítico v1.0.4 (información completa en CHANGELOG.md v1.0.4)
- ❌ `CORRECCION-CALENDARIO.md` - Fix calendario v1.0.4 (información completa en CHANGELOG.md v1.0.4)
- ❌ `CORRECCION-CLIENTES-TOTALES.md` - Fix simple ya aplicado (información en CHANGELOG.md)
- ❌ `CORRECCION-CUSTOMER-PHONE-OBLIGATORIO.md` - Fix simple ya aplicado (información en CHANGELOG.md)
- ❌ `FIX-CRITICO-TRIGGERS-CLIENTES.md` - Redundante con CORRECCION-STATS-CLIENTES.md (más completo)
- ❌ `FIX-VALIDACION-HORAS-RESERVAS.md` - Fix ya aplicado (información técnica en código y SISTEMA-PREVENCION-CONFLICTOS.md)
- ❌ `FIX-EDICION-RESERVAS.md` - Fix ya aplicado (información técnica en código)

---

## 🔄 MANTENIMIENTO DE DOCUMENTACIÓN

### Reglas

1. **Nunca duplicar** - Si existe doc similar, actualizar el existente
2. **Nombres descriptivos** - Usar nombres claros y específicos
3. **Fecha al pie** - Incluir fecha de última actualización
4. **Eliminar obsoletos** - Borrar docs que ya no aplican
5. **Actualizar índice** - Mantener este archivo actualizado

### Proceso para nuevo documento

1. ¿Es crítico? → Agregar a sección CRÍTICOS del README
2. ¿Es técnico? → Agregar a sección correspondiente
3. Actualizar este índice
4. Agregar link en README principal

---

**Proyecto**: Eco Area Limonar - Área de autocaravanas  
**Última auditoría MDs**: Febrero 2026
