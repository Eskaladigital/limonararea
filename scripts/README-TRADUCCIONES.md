# Scripts de traducción

**Documentación completa:** [docs/SISTEMA-TRADUCCIONES-COMPLETO.md](../docs/SISTEMA-TRADUCCIONES-COMPLETO.md)

## Resumen

| Script | Comando | Qué hace |
|--------|---------|----------|
| Verificar Supabase | `npm run verify:translations` | Comprueba qué traducciones dinámicas faltan en `content_translations`. |
| Volcar estáticas | `npm run dump:translations` | Genera `static-translations-dump.json` (requerido antes de `translate:static`). |
| Traducir estáticas | `npm run translate:static` | OpenAI traduce claves UI faltantes → escribe `src/lib/i18n/translations/generated.ts`. |
| Traducir contenido | `npm run translate:content` | OpenAI traduce parcelas, posts, categorías y claves i18n (Mar Menor + páginas) → escribe en Supabase `content_translations`. |

## Archivos

- `verify-supabase-translations.js` — Verificación de `content_translations`.
- `dump-static-translations.ts` — Volcado de traducciones estáticas (ejecutar con `npx tsx`).
- `translate-static-pages-openai.js` — Traducción de textos de todas las páginas (UI).
- `translate-all-content-openai.js` — Traducción de contenido dinámico (Supabase). Procesa:
  - **Parcelas** (source_table `parcels`: name, short_description).
  - **Posts** y **content_categories**.
  - **Claves i18n** desde `src/lib/i18n/data/mar-menor-es.json` (página Mar Menor).
  - **Claves i18n** desde `src/lib/i18n/data/pages-es.json` (contacto, footer, normas, galería, header).
- `supabase-content-translations.sql` — SQL para crear la tabla `content_translations`.

**JSON de contenido i18n (script los vuelca a `content_translations`, source_table `i18n`):**

- `src/lib/i18n/data/mar-menor-es.json` — Textos página Mar Menor.
- `src/lib/i18n/data/pages-es.json` — Textos de contacto, footer, normas, galería, etc.

Requieren **OPENAI_API_KEY** y Supabase (URL + clave en `.env.local`) para `translate:content`.
