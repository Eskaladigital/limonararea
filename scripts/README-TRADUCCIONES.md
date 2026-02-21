# Scripts de traducción

**Documentación completa:** [docs/SISTEMA-TRADUCCIONES-COMPLETO.md](../docs/SISTEMA-TRADUCCIONES-COMPLETO.md)

## Resumen

| Script | Comando | Qué hace |
|--------|---------|----------|
| Verificar Supabase | `npm run verify:translations` | Comprueba qué traducciones dinámicas faltan en `content_translations`. |
| Volcar estáticas | `npm run dump:translations` | Genera `static-translations-dump.json` (requerido antes de `translate:static`). |
| Traducir estáticas | `npm run translate:static` | OpenAI traduce claves UI faltantes → escribe `src/lib/i18n/translations/generated.ts`. |
| Traducir contenido | `npm run translate:content` | OpenAI traduce parcelas, posts y categorías → escribe en Supabase `content_translations`. |

## Archivos

- `verify-supabase-translations.js` — Verificación de `content_translations`.
- `dump-static-translations.ts` — Volcado de traducciones estáticas (ejecutar con `npx tsx`).
- `translate-static-pages-openai.js` — Traducción de textos de todas las páginas (UI).
- `translate-all-content-openai.js` — Traducción de contenido dinámico (Supabase).
- `supabase-content-translations.sql` — SQL para crear la tabla `content_translations`.

Requieren **OPENAI_API_KEY** (y Supabase para `translate:content`).
