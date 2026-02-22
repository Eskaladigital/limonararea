# 📸 Gestión de Imágenes en Supabase Storage

## 🎯 REGLAS ABSOLUTAS

### ⚠️ REGLAS DE ORO - NO VIOLAR NUNCA

1. **NUNCA subir imágenes directamente a la carpeta `public/` para contenido dinámico**
   - `public/` es SOLO para assets estáticos de diseño (logos, iconos, favicons)
   - Todo contenido dinámico DEBE estar en Supabase Storage

2. **SIEMPRE optimizar imágenes antes de subir**
   - Formato: WebP (mejor compresión)
   - Resolución: Según el bucket (ver tabla abajo)
   - Calidad: Según el bucket (ver tabla abajo)

3. **SIEMPRE usar la carpeta correcta según el tipo de contenido**
   - No mezclar tipos de imágenes entre buckets
   - Respetar la estructura de carpetas dentro de cada bucket

4. **NUNCA eliminar imágenes sin verificar que no están en uso**
   - Usar el panel `/administrator/media` para verificar
   - Buscar referencias en la base de datos antes de eliminar

---

## 📦 ESTRUCTURA DE BUCKETS

Supabase Storage tiene **4 buckets públicos** para diferentes tipos de contenido:

```
Supabase Storage (https://uygxrqqtdebyzllvbuef.supabase.co/storage/v1/object/public/)
│
├── 🚐 vehicles/          → Imágenes de vehículos de la flota
├── 📝 blog/             → Imágenes de artículos del blog
├── 🎁 extras/           → Imágenes de extras/equipamiento
└── 🌍 media/            → Imágenes generales de la web (localización, slides, etc.)
```

---

## 🚐 BUCKET: `vehicles`

### ✅ Propósito
Almacenar **TODAS** las imágenes de los vehículos de la flota de alquiler.

### 📁 Estructura

```
vehicles/
├── {vehicle_slug}/                    # Slug del vehículo (ej: "volkswagen-california")
│   ├── principal.webp                 # ⚠️ Imagen principal (OBLIGATORIA)
│   ├── galeria_01.webp               # Imagen 1 de galería
│   ├── galeria_02.webp               # Imagen 2 de galería
│   ├── galeria_03.webp               # Imagen 3 de galería
│   └── ...                           # Más imágenes de galería
```

### 📏 Especificaciones

| Tipo | Resolución | Calidad | Peso Objetivo | Notas |
|------|-----------|---------|---------------|-------|
| **Principal** | 1200x800 | 90% | ~150-250 KB | Imagen destacada en listados y detalle |
| **Galería** | 1200x800 | 85% | ~120-200 KB | Imágenes adicionales en detalle del vehículo |

### 🔗 Referencias en Base de Datos

**Tabla `vehicles`:**
```sql
- image: TEXT  -- URL a vehicles/{slug}/principal.webp
```

**Tabla `vehicle_images`:**
```sql
- vehicle_id: UUID           -- FK a vehicles.id
- image_url: TEXT            -- URL a vehicles/{slug}/galeria_XX.webp
- display_order: INTEGER     -- Orden de visualización
- is_main: BOOLEAN           -- FALSE (la principal está en vehicles.image)
```

### ✅ Cuándo Usar

- Al crear un nuevo vehículo
- Al actualizar imágenes de un vehículo existente
- Al añadir fotos a la galería de un vehículo

### ❌ NO Usar Para

- Imágenes de blog
- Imágenes de extras/equipamiento
- Imágenes de localización
- Imágenes de diseño general de la web

---

## 📝 BUCKET: `blog`

### ✅ Propósito
Almacenar imágenes de los artículos del blog (featured images, imágenes inline del contenido).

### 📁 Estructura

```
blog/
├── 2025/                             # Año de publicación
│   ├── 01/                          # Mes de publicación (01-12)
│   │   ├── nombre_imagen_1.webp     # Imagen del post
│   │   ├── nombre_imagen_2.webp
│   │   └── ...
│   ├── 02/
│   └── ...
├── 2026/
│   ├── 01/
│   └── ...
└── ...
```

**⚠️ IMPORTANTE**: La estructura es `YYYY/MM/` (ej: `2025/01/`, `2026/12/`)

### 📏 Especificaciones

| Tipo | Resolución | Calidad | Peso Objetivo | Notas |
|------|-----------|---------|---------------|-------|
| **Featured Image** | 1200x630 | 90% | ~150-250 KB | Open Graph, redes sociales |
| **Inline Content** | Variable | 85% | ~100-200 KB | Imágenes dentro del contenido |

### 🔗 Referencias en Base de Datos

**Tabla `posts`:**
```sql
- featured_image: TEXT       -- URL a blog/YYYY/MM/featured.webp
- content: TEXT              -- HTML con <img src="https://.../blog/YYYY/MM/imagen.webp">
- images: JSONB              -- Array de URLs: ["https://.../blog/YYYY/MM/img1.webp", ...]
- published_at: TIMESTAMP    -- Fecha de publicación (determina carpeta YYYY/MM)
```

### ✅ Cuándo Usar

- Al crear un artículo nuevo en el blog
- Al actualizar la imagen destacada de un artículo
- Al insertar imágenes en el contenido del artículo (TinyMCE)

### ❌ NO Usar Para

- Imágenes de vehículos
- Imágenes de extras
- Imágenes de localización

### 🔧 Script de Migración

```bash
# Migrar imágenes de blog desde carpeta local a Supabase
node scripts/migrate-blog-images-to-supabase.js
```

**Lógica del Script:**
1. Lee artículos publicados de la tabla `posts`
2. Extrae URLs de imágenes del campo `content` y `featured_image`
3. Busca imágenes en `limonar_images/blog/YYYY.MM/` o `YYYY/MM/`
4. Optimiza a WebP (90% calidad)
5. Sube a `blog/YYYY/MM/`
6. Actualiza URLs en la base de datos

---

## 🎁 BUCKET: `extras`

### ✅ Propósito
Almacenar imágenes de los **extras** y **equipamiento** disponible para alquilar.

### 📁 Estructura

```
extras/
├── silla_bebe.webp
├── mesa_camping.webp
├── bicicleta_adulto.webp
├── toldo_lateral.webp
└── ...
```

**Nomenclatura:** `nombre_descriptivo_en_minusculas_con_guiones_bajos.webp`

### 📏 Especificaciones

| Tipo | Resolución | Calidad | Peso Objetivo | Notas |
|------|-----------|---------|---------------|-------|
| **Icono de Extra** | 400x400 | 85% | ~30-60 KB | Imágenes pequeñas para cards |

### 🔗 Referencias en Base de Datos

**Tabla `extras`:**
```sql
- name: TEXT                 -- Nombre del extra
- icon: TEXT                 -- URL a extras/{nombre}.webp
- description: TEXT
- price_per_day: DECIMAL
```

**Tabla `equipment`:**
```sql
- name: TEXT                 -- Nombre del equipamiento
- icon: TEXT                 -- URL a extras/{nombre}.webp (mismo bucket que extras)
- description: TEXT
```

### ✅ Cuándo Usar

- Al crear un nuevo extra
- Al crear un nuevo equipamiento
- Al actualizar la imagen de un extra/equipamiento existente

### ❌ NO Usar Para

- Imágenes de vehículos
- Imágenes de blog
- Imágenes de localización

---

## 🌍 BUCKET: `media`

### ✅ Propósito
Almacenar imágenes generales de la web que NO encajan en los otros buckets: imágenes de localización, slides hero, banners, etc.

### 📁 Estructura

```
media/
├── locations/                         # Imágenes de ciudades/destinos
│   ├── limonar_alquiler_autocaravanas_campervan_murcia.webp
│   ├── limonar_alquiler_autocaravanas_campervan_alicante.webp
│   ├── limonar_alquiler_autocaravanas_campervan_valencia.webp
│   └── ...                           # 6 ciudades principales
│
└── slides/                           # Imágenes HERO para páginas de localización
    ├── limonar_campervans_alquiler_autocaravanas_motorhome_rent_murcia.webp
    ├── limonar_campervans_alquiler_autocaravanas_motorhome_rent_alicante.webp
    ├── limonar_campervans_alquiler_autocaravanas_motorhome_rent_cartagena.webp
    └── ...                           # 31 ciudades
```

### 📏 Especificaciones

#### **Subcarpeta `locations/`** (Tarjetas pequeñas)

| Tipo | Resolución | Calidad | Peso Objetivo | Notas |
|------|-----------|---------|---------------|-------|
| **Card de destino** | 800x600 | 85% | ~80-120 KB | Grid "Principales destinos para visitar" |

#### **Subcarpeta `slides/`** (Hero de alta calidad)

| Tipo | Resolución | Calidad | Peso Objetivo | Notas |
|------|-----------|---------|---------------|-------|
| **Hero de localización** | 1920x1080 | 90% | ~300-500 KB | Imagen principal full-screen en `/[location]/page` |

### 🔗 Referencias en Código

**`src/components/destinations-grid.tsx`:**
```typescript
const FEATURED_DESTINATIONS: Destination[] = [
  {
    name: "ALICANTE",
    region: "Comunidad Valenciana",
    slug: "alicante",
    image: "https://uygxrqqtdebyzllvbuef.supabase.co/storage/v1/object/public/media/locations/limonar_alquiler_autocaravanas_campervan_alicante.webp"
  },
  // ...
];
```

**`src/app/[location]/page.tsx`:**
```typescript
const LOCATION_HERO_IMAGES: Record<string, string> = {
  "Murcia": "https://uygxrqqtdebyzllvbuef.supabase.co/storage/v1/object/public/media/slides/limonar_campervans_alquiler_autocaravanas_motorhome_rent_murcia.webp",
  "Alicante": "https://uygxrqqtdebyzllvbuef.supabase.co/storage/v1/object/public/media/slides/limonar_campervans_alquiler_autocaravanas_motorhome_rent_alicante.webp",
  // ... 31 ciudades
};
```

### ✅ Cuándo Usar

#### `media/locations/`:
- Al añadir una nueva ciudad al grid "Principales destinos"
- Al actualizar la imagen de una ciudad en el grid

#### `media/slides/`:
- Al crear una nueva página de localización
- Al actualizar la imagen hero de una página de localización existente

### ❌ NO Usar Para

- Imágenes de vehículos → usar `vehicles/`
- Imágenes de blog → usar `blog/`
- Imágenes de extras → usar `extras/`

### 🔧 Scripts de Migración

```bash
# Subir imágenes de tarjetas de destinos (800x600)
node scripts/upload-location-images.js

# Subir imágenes de hero slides (1920x1080)
node scripts/upload-hero-slides.js
```

---

## 🛠️ HERRAMIENTAS Y SCRIPTS

### 📋 Panel de Administración

**URL:** `https://www.ecoarealimonar.com/administrator/media`

**Funcionalidades:**
- ✅ Ver contenido de TODOS los buckets
- ✅ Subir archivos (drag & drop o selector)
- ✅ Crear carpetas
- ✅ Eliminar archivos
- ✅ Previsualizar imágenes
- ✅ Copiar URL pública
- ✅ Buscar archivos por nombre

**⚠️ IMPORTANTE:** Usar este panel para gestionar contenido de Supabase Storage, NO subir directamente desde el dashboard de Supabase.

### 🔧 Scripts de Optimización

Todos los scripts están en `scripts/` y usan:
- **Sharp** para optimización de imágenes
- **dotenv** para variables de entorno
- **@supabase/supabase-js** para subida

#### Scripts disponibles:

| Script | Propósito | Origen | Destino |
|--------|-----------|--------|---------|
| `optimize-hero-images.js` | Optimizar slides hero de la home | `images/slides web/` | `public/images/slides/` |
| `upload-location-images.js` | Subir tarjetas de destinos | `limonar_images/fotos_lugares/` | `media/locations/` |
| `upload-hero-slides.js` | Subir hero slides de localizaciones | `limonar_images/slides/` | `media/slides/` |
| `migrate-blog-images-to-supabase.js` | Migrar imágenes de blog | `limonar_images/blog/` | `blog/YYYY/MM/` |

---

## 📊 FLUJO DE TRABAJO RECOMENDADO

### 🆕 Añadir Nueva Imagen

1. **Identificar tipo de contenido:**
   - ¿Es de un vehículo? → `vehicles/`
   - ¿Es de un artículo de blog? → `blog/`
   - ¿Es de un extra/equipamiento? → `extras/`
   - ¿Es de localización o slide? → `media/`

2. **Preparar imagen:**
   - Convertir a WebP
   - Optimizar resolución según bucket (ver tabla)
   - Ajustar calidad según bucket (ver tabla)

3. **Subir:**
   - **Opción A (Recomendada):** Usar panel `/administrator/media`
   - **Opción B:** Usar script correspondiente (si existe)
   - **Opción C:** Subir desde dashboard de Supabase (solo si es necesario)

4. **Actualizar referencias:**
   - Si es vehículo → actualizar `vehicles.image` o insertar en `vehicle_images`
   - Si es blog → actualizar `posts.featured_image`, `posts.content` o `posts.images`
   - Si es extra → actualizar `extras.icon` o `equipment.icon`
   - Si es localización/slide → actualizar código en componente React

### 🗑️ Eliminar Imagen

1. **Verificar uso:**
   - Buscar en base de datos: `SELECT * FROM posts WHERE content LIKE '%nombre_imagen%'`
   - Buscar en código: `grep -r "nombre_imagen" src/`

2. **Si NO está en uso:**
   - Ir a `/administrator/media`
   - Seleccionar bucket
   - Buscar archivo
   - Eliminar

3. **Si SÍ está en uso:**
   - Primero reemplazar referencias en BD o código
   - Luego eliminar

---

## ⚠️ ERRORES COMUNES Y CÓMO EVITARLOS

### ❌ Error: "Imagen no carga en la web"

**Causas:**
- URL incorrecta (typo, bucket equivocado, nombre mal escrito)
- Permisos del bucket no configurados (RLS)
- Imagen no subida correctamente

**Solución:**
1. Verificar que la imagen existe en Supabase Storage (panel `/administrator/media`)
2. Copiar URL exacta desde el panel
3. Verificar que el bucket es `public` (ver `supabase/configurar-storage-media-extras.sql`)

### ❌ Error: "Imagen en `public/` pero no se actualiza"

**Causas:**
- Contenido dinámico en `public/` (NUNCA hacer esto)
- Caché del navegador o CDN

**Solución:**
1. Mover imagen a Supabase Storage (bucket correcto)
2. Actualizar referencias en BD o código
3. Eliminar imagen de `public/`

### ❌ Error: "Imagen muy pesada, tarda en cargar"

**Causas:**
- No optimizada a WebP
- Resolución demasiado alta
- Calidad demasiado alta

**Solución:**
1. Re-optimizar con Sharp:
   ```javascript
   await sharp(input)
     .webp({ quality: 85 })
     .resize(1200, 800, { fit: 'cover' })
     .toFile(output);
   ```
2. Volver a subir

### ❌ Error: "No encuentro la imagen en Supabase"

**Causas:**
- Buscando en bucket equivocado
- Nombre de archivo incorrecto
- Carpeta incorrecta dentro del bucket

**Solución:**
1. Ir a `/administrator/media`
2. Cambiar a cada bucket uno por uno
3. Usar la función de búsqueda
4. Verificar estructura de carpetas (ver sección "Estructura" de cada bucket)

---

## 📚 DOCUMENTACIÓN RELACIONADA

- **[SISTEMA-MEDIA-RESUMEN.md](./SISTEMA-MEDIA-RESUMEN.md)** - Resumen del sistema de media/imágenes
- **[GALERIA-MULTIPLE-VEHICULOS.md](./GALERIA-MULTIPLE-VEHICULOS.md)** - Galería de vehículos
- **[IMAGENES-HERO-SLIDES.md](./IMAGENES-HERO-SLIDES.md)** - Imágenes hero de la home
- **[IMAGENES-HERO-LOCALIZACIONES.md](./IMAGENES-HERO-LOCALIZACIONES.md)** - Imágenes hero de localizaciones
- **[MIGRACION-IMAGENES-BLOG-RESUMEN.md](./MIGRACION-IMAGENES-BLOG-RESUMEN.md)** - Migración de imágenes del blog
- **[supabase/configurar-storage-media-extras.sql](./supabase/configurar-storage-media-extras.sql)** - Configuración de buckets

---

## 🎯 RESUMEN RÁPIDO

| Contenido | Bucket | Carpeta | Resolución | Calidad | Script |
|-----------|--------|---------|-----------|---------|--------|
| **Vehículo principal** | `vehicles` | `{slug}/principal.webp` | 1200x800 | 90% | Manual |
| **Galería vehículo** | `vehicles` | `{slug}/galeria_XX.webp` | 1200x800 | 85% | Manual |
| **Blog featured** | `blog` | `YYYY/MM/featured.webp` | 1200x630 | 90% | `migrate-blog-images-to-supabase.js` |
| **Blog inline** | `blog` | `YYYY/MM/imagen.webp` | Variable | 85% | `migrate-blog-images-to-supabase.js` |
| **Extra/Equipamiento** | `extras` | `nombre.webp` | 400x400 | 85% | Manual |
| **Card de destino** | `media` | `locations/ciudad.webp` | 800x600 | 85% | `upload-location-images.js` |
| **Hero de localización** | `media` | `slides/ciudad.webp` | 1920x1080 | 90% | `upload-hero-slides.js` |

---

**Última actualización:** 21 de Enero de 2026  
**Versión:** 1.0
