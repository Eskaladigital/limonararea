# Sistema de traducciones – Guía completa

**Eco Area Limonar** traduce todos los textos en **5 idiomas**: ES, EN, FR, DE, NL.  
Hay **dos tipos** de contenido traducido y **dos formas** de generarlos.

---

## 1. Resumen: dos tipos de textos

| Tipo | Qué es | Dónde se guarda | Cómo se usa en la app |
|------|--------|------------------|------------------------|
| **Estáticos (UI)** | Botones, títulos, labels, mensajes de todas las páginas | Archivos en `src/lib/i18n/translations/` y `src/lib/translations-preload.ts` | `t("clave")` (cliente) y `translateServer("clave", locale)` (servidor) |
| **Dinámicos (CMS)** | Nombres/descripciones de parcelas, posts del blog, categorías | Tabla **`content_translations`** en Supabase | `getTranslatedRecords()` / `getTranslatedContent()` |

- Lo que ves en menús, formularios, CTAs y textos fijos del layout → **estáticos**.  
- Lo que viene de parcelas, blog y categorías → **dinámicos** (Supabase).

---

## 2. Textos estáticos (todas las páginas)

### Dónde viven

- **Módulos:**  
  `src/lib/i18n/translations/common.ts`, `home.ts`, `offers.ts`, `cookies.ts`, `generated.ts`
- **Legacy:**  
  `src/lib/translations-preload.ts`
- **Merge:**  
  `src/lib/i18n/translations/index.ts` combina todo en `staticTranslations`.

Cada clave tiene la forma:

```ts
"Texto en español": {
  es: "Texto en español",
  en: "English text",
  fr: "Texte français",
  de: "Deutscher Text",
  nl: "Nederlandse tekst"
}
```

### Cómo se usan en el código

- **Servidor (páginas):**  
  `translateServer(clave, locale)` → usa `staticTranslations` y el `locale` de la ruta (ej. `/en/` → `en`).
- **Cliente (componentes):**  
  `useLanguage().t(clave)` → mismo objeto según el idioma del contexto (detectado por la URL).

Si una clave no tiene traducción para el idioma actual, se muestra la clave (normalmente el texto en español).

### Scripts para traducir lo que falta (OpenAI)

1. **Volcar estado actual** (obligatorio antes de traducir):

   ```bash
   npm run dump:translations
   ```

   Genera `scripts/static-translations-dump.json` con todas las claves ya definidas.

2. **Traducir claves faltantes** (EN, FR, DE, NL):

   ```bash
   npm run translate:static
   ```

   - Lee las claves usadas en `t("...")` y `translateServer("...")` en `src/`.
   - Compara con el dump y detecta qué claves no tienen `en`, `fr`, `de` o `nl`.
   - Llama a OpenAI para traducir solo esas y escribe **`src/lib/i18n/translations/generated.ts`**.
   - La app ya importa `generatedTranslations` en `index.ts`, así que no hay que tocar más archivos.

Requisito: **`OPENAI_API_KEY`** en `.env.local`.

---

## 3. Textos dinámicos (Supabase)

### Dónde viven

Tabla en Supabase:

**`content_translations`**

| Columna | Descripción |
|---------|-------------|
| `source_table` | Tabla de origen: `parcels`, `posts`, `content_categories`, `i18n` |
| `source_id` | ID del registro (parcela, post, categoría) o clave de texto (cuando source_table es `i18n`) |
| `source_field` | Campo traducido: `name`, `title`, `excerpt`, `content`, etc. Para `i18n` suele ser `text`. |
| `locale` | `en`, `fr`, `de`, `nl` |
| `translated_text` | Texto traducido |

Origen del español: tablas `parcels`, `posts`, `content_categories`; para `i18n`, los textos origen están en `src/lib/i18n/data/mar-menor-es.json` y `src/lib/i18n/data/pages-es.json` (contacto, footer, normas, galería, header).

### Cómo se usan en la app

- **Parcelas (home, listados):**  
  `getTranslatedRecords('parcels', registros, ['name', 'short_description'], locale)`
- **Posts (blog):**  
  `getTranslatedRecords('posts', posts, ['title', 'excerpt'], locale)` y, en la página de artículo, `getTranslatedContent('posts', id, ['title', 'excerpt', 'content', 'meta_title', 'meta_description'], locale, original)`
- **Categorías:**  
  `getTranslatedRecords('content_categories', categorías, ['name'], locale)`
- **Claves i18n (páginas):**  
  Se consultan con `getTranslatedField('i18n', clave, 'text', locale)` cuando el contenido viene de `pages-es.json` o `mar-menor-es.json`.
- **API de disponibilidad:**  
  La ruta `/api/availability` acepta el parámetro `?locale=fr` (o `en`, `de`, `nl`). Si se envía, devuelve `name` y `short_description` de cada parcela (y `category.name`) traducidos desde `content_translations`, para mostrar resultados de búsqueda en el idioma correcto (ej. `/fr/recherche`).

Definición y uso: `src/lib/translations/get-translations.ts`.

### Crear la tabla en Supabase

Si aún no existe, ejecuta en **SQL Editor** el contenido de:

**`scripts/supabase-content-translations.sql`**

```sql
CREATE TABLE IF NOT EXISTS content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_field TEXT NOT NULL,
  locale TEXT NOT NULL,
  translated_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(source_table, source_id, source_field, locale)
);
CREATE INDEX IF NOT EXISTS idx_content_translations_lookup
  ON content_translations(source_table, source_id, locale);
```

### Ver qué falta en Supabase

```bash
npm run verify:translations
```

Comprueba que existan filas en `content_translations` para todos los registros y campos que la app usa (parcelas, posts publicados, categorías) y para los idiomas EN, FR, DE, NL. Muestra un resumen de lo que falta.

### Traducir todo lo que falta (OpenAI)

```bash
npm run translate:content
```

- Lee **parcelas** (parcels), **posts** publicados y **categorías** (content_categories).
- Lee también los JSON de claves i18n: **`src/lib/i18n/data/mar-menor-es.json`** (página Mar Menor) y **`src/lib/i18n/data/pages-es.json`** (contacto, footer, normas, galería, header). Para estas claves escribe en `content_translations` con `source_table: 'i18n'`, `source_field: 'text'`.
- Para cada combinación (registro/clave, campo, idioma) que no tenga fila en `content_translations`, traduce el texto original (español) con OpenAI y hace **upsert** en `content_translations`.

Requisitos en `.env.local`:

- **`OPENAI_API_KEY`**
- **`NEXT_PUBLIC_SUPABASE_URL`**
- **`SUPABASE_SERVICE_ROLE_KEY`** (recomendado) o `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 4. Idiomas

| Código | Idioma    | Rutas ejemplo     |
|--------|-----------|--------------------|
| `es`   | Español   | `/es/`, `/es/reservar`, … |
| `en`   | Inglés    | `/en/`, `/en/book`, …     |
| `fr`   | Francés   | `/fr/`, `/fr/reserver`, … |
| `de`   | Alemán    | `/de/`, `/de/buchen`, …   |
| `nl`   | Neerlandés| `/nl/`, `/nl/boeken`, …   |

Tanto los textos estáticos como los dinámicos deben tener entradas para `en`, `fr`, `de` y `nl` para que todo el sitio se vea traducido.

---

## 5. Flujo recomendado: dejar todo traducido

### Primera vez (Supabase)

1. Crear la tabla: ejecutar **`scripts/supabase-content-translations.sql`** en Supabase.
2. Comprobar:  
   `npm run verify:translations`
3. Generar traducciones dinámicas:  
   `npm run translate:content`

### Textos estáticos (UI de todas las páginas)

1. Volcar estado:  
   `npm run dump:translations`
2. Generar faltantes:  
   `npm run translate:static`

### Después de añadir contenido nuevo

- **Nuevas parcelas o posts:**  
  `npm run translate:content` (vuelve a detectar lo que falta y lo traduce).
- **Nuevas cadenas en el código** (`t("Nueva cadena")`):  
  `npm run dump:translations` y luego `npm run translate:static`.

---

## 6. Comandos rápidos

| Comando | Descripción |
|---------|-------------|
| `npm run verify:translations` | Comprueba qué traducciones dinámicas faltan en Supabase (EN, FR, DE, NL). |
| `npm run dump:translations` | Genera `static-translations-dump.json` con el estado actual de traducciones estáticas. |
| `npm run translate:static` | Traduce con OpenAI las claves estáticas faltantes y escribe `generated.ts`. |
| `npm run translate:content` | Traduce con OpenAI el contenido dinámico faltante y escribe en `content_translations`. |

---

## 7. Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/lib/i18n/translations/index.ts` | Combina legacy, common, home, offers, cookies y **generated** en `staticTranslations`. |
| `src/lib/i18n/translations/generated.ts` | Salida del script `translate:static`; no editar a mano. |
| `src/lib/i18n/server-translation.ts` | `translateServer(clave, locale)` para Server Components. |
| `src/contexts/language-context.tsx` | Provee `t(clave)` en cliente según idioma de la URL. |
| `src/lib/translations/get-translations.ts` | `getTranslatedRecords` / `getTranslatedContent` para Supabase. |
| `scripts/supabase-content-translations.sql` | SQL para crear la tabla `content_translations`. |

---

## 8. Resumen visual

```
TEXTOS EN LA WEB
├── Estáticos (UI)
│   ├── Origen: t("...") y translateServer("...") en src/
│   ├── Guardado: common.ts, home.ts, offers.ts, cookies.ts, generated.ts, translations-preload.ts
│   └── Traducir: dump:translations → translate:static (OpenAI → generated.ts)
│
└── Dinámicos (CMS)
    ├── Origen: parcelas, posts, content_categories en Supabase
    ├── Guardado: content_translations (Supabase)
    └── Traducir: verify:translations (ver qué falta) → translate:content (OpenAI → Supabase)
```

Con esto se cubre **cómo se traducen todos los textos** del proyecto: estáticos en código y dinámicos en Supabase, y los scripts que hay que ejecutar para dejarlos completos en EN, FR, DE y NL.
