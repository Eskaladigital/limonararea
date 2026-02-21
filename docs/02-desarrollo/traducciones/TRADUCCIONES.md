# Sistema de traducciones – Desarrollo

Este documento resume cómo trabajar con traducciones en el proyecto.  
**Documento de referencia completo:** [docs/SISTEMA-TRADUCCIONES-COMPLETO.md](../../SISTEMA-TRADUCCIONES-COMPLETO.md).

---

## Dos tipos de textos

| Tipo | Dónde se guardan | Cómo traducir lo que falta |
|------|-------------------|----------------------------|
| **Estáticos (UI)** | `src/lib/i18n/translations/*.ts` y `translations-preload.ts` | `npm run dump:translations` → `npm run translate:static` |
| **Dinámicos (CMS)** | Tabla `content_translations` en Supabase | `npm run verify:translations` → `npm run translate:content` |

---

## Uso en código

### Textos estáticos

- **Servidor:** `translateServer("Clave en español", locale)` — en páginas y `generateMetadata`.
- **Cliente:** `const { t } = useLanguage();` y luego `t("Clave en español")`.

La clave suele ser el texto en español. Debe existir en alguno de los módulos de `src/lib/i18n/translations/` (o en legacy) con `es`, `en`, `fr`, `de`, `nl`.

### Textos dinámicos (Supabase)

- **Listas:** `getTranslatedRecords('vehicles'|'posts'|'content_categories', registros, campos, locale)`.
- **Un registro:** `getTranslatedContent('posts', id, ['title','excerpt',...], locale, original)`.

Ver `src/lib/translations/get-translations.ts`.

---

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run verify:translations` | Comprueba qué traducciones dinámicas faltan en Supabase (EN, FR, DE, NL). |
| `npm run dump:translations` | Genera `scripts/static-translations-dump.json` (estado actual de claves estáticas). |
| `npm run translate:static` | Traduce con OpenAI las claves estáticas faltantes → escribe `generated.ts`. |
| `npm run translate:content` | Traduce con OpenAI parcelas, posts y categorías → escribe en `content_translations`. |

Requisito para los scripts de traducción: **OPENAI_API_KEY** en `.env.local`.  
Para `translate:content`: Supabase configurado y tabla `content_translations` creada (ver `scripts/supabase-content-translations.sql`).

---

## Idiomas

ES (español), EN (inglés), FR (francés), DE (alemán), NL (neerlandés).  
Rutas: `/es/`, `/en/`, `/fr/`, `/de/`, `/nl/` con slugs traducidos por idioma.

---

## Más detalle

- **Guía completa (flujos, tablas, archivos):** [SISTEMA-TRADUCCIONES-COMPLETO.md](../../SISTEMA-TRADUCCIONES-COMPLETO.md)  
- **Blog (content_translations, slugs):** [SISTEMA-TRADUCCIONES-BLOG.md](../../SISTEMA-TRADUCCIONES-BLOG.md)  
- **Módulos estáticos:** [src/lib/i18n/translations/README.md](../../../src/lib/i18n/translations/README.md)
