# 📦 GUÍA DEFINITIVA - QUERIES DE PARCELAS (Eco Area Limonar)

**Última actualización:** 2026-02-22  
**Basado en:** SUPABASE-SCHEMA-REAL.md

> **Nota:** Este proyecto usa **parcelas** (tabla `parcels`). No hay tablas `vehicles`. La única referencia válida a "vehicle" es `vehicle_type` = tipo de vehículo del cliente (autocaravana, caravana, tienda) que ocupará la parcela.

---

## ⚠️ REGLA DE ORO

**SIEMPRE usar `*` en las relaciones. NUNCA especificar campos manualmente.**

```typescript
// ✅ CORRECTO
.select('*, images:parcel_images(*)')

// ❌ INCORRECTO
.select('*, images:parcel_images(image_url, alt_text, is_primary)')
```

---

## 📋 PÁGINAS PRINCIPALES DE PARCELAS

### 1️⃣ Página: `/parcelas/[slug]` - Detalle de parcela

**Archivo:** `src/app/es/parcelas/[slug]/page.tsx` (y equivalentes en /en, /fr, /de)  
**Función:** `getVehicleBySlug()` en `src/lib/supabase/queries.ts` (devuelve parcelas)

**Query:**
```typescript
const { data, error } = await supabase
  .from('parcels')
  .select(`
    *,
    category:parcel_categories(*),
    images:parcel_images(*),
    parcel_equipment(
      id,
      notes,
      equipment(*)
    )
  `)
  .eq('slug', slug)
  .single()
```

**Uso:**
- Muestra detalles de la parcela (nombre, internal_code, dimensiones, descripción)
- Incluye galería de imágenes
- Muestra equipamiento (parcel_equipment)
- **Columnas de parcela:** `name`, `internal_code`, `length_m`, `width_m`, `description`. **NO existen** `brand`, `model`, `seats`, `beds`, `fuel_type` (herencia Eco Area Limonar).

---

### 2️⃣ Página: `/reservar/parcela` - Detalle + Extras (RESERVA)

**Archivo:** `src/app/es/reservar/parcela/page.tsx`  
**Función:** `loadData()` (local, Client Component)

**Query de parcela:**
```typescript
const { data: parcelData, error: parcelError } = await supabase
  .from('parcels')
  .select(`
    *,
    category:parcel_categories(*),
    images:parcel_images(*),
    parcel_equipment(
      id,
      notes,
      equipment(*)
    )
  `)
  .eq('id', parcelId)
  .eq('is_for_rent', true)
  .neq('status', 'inactive')
  .single()
```

**Query de extras:**
```typescript
const { data: extrasData, error: extrasError } = await supabase
  .from('extras')
  .select('*')
  .eq('is_active', true)
  .order('sort_order', { ascending: true })
  .order('name', { ascending: true })
```

**Diferencias con otras páginas:**
- ✅ Busca por `id` en lugar de `slug`
- ✅ Carga extras disponibles
- ✅ Permite añadir extras con cantidad
- ✅ Calcula precio total con extras
- ⚠️ Es Client Component (usa `"use client"`)

---

## 🔧 COMPONENTES COMUNES

### ParcelGallery (antes VehicleGallery)

**Archivo:** `src/components/parcel/parcel-gallery.tsx` (o `vehicle-gallery.tsx` si aún existe)

**Props esperados:**
```typescript
interface ParcelImage {
  image_url: string;      // ⚠️ Nombre real en BD
  alt_text: string | null; // ⚠️ Nombre real en BD
  sort_order: number;
  is_primary: boolean;     // ⚠️ Nombre real en BD
}

interface ParcelGalleryProps {
  images: ParcelImage[];
  parcelName: string;
}
```

**Uso:**
```typescript
<ParcelGallery 
  images={parcel.images || []} 
  parcelName={parcel.name} 
/>
```

⚠️ **IMPORTANTE:** El componente espera `is_primary`, NO `is_main`.

---

### ParcelEquipmentDisplay (antes VehicleEquipmentDisplay)

**Archivo:** `src/components/parcel/equipment-display.tsx`

**Props:**
```typescript
<ParcelEquipmentDisplay
  equipment={parcel.parcel_equipment?.map(pe => pe.equipment) || []}
  variant="grid"
  groupByCategory={true}
  title="Equipamiento incluido"
/>
```

**Renderizado condicional:**
```typescript
{parcel.parcel_equipment && parcel.parcel_equipment.length > 0 && (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <ParcelEquipmentDisplay ... />
  </div>
)}
```

---

## 📊 CAMPOS IMPORTANTES DE LA TABLA `parcels`

### Campos de disponibilidad (RESERVA):
```typescript
is_for_rent: boolean     // true para mostrar en reserva
status: string          // 'available', 'rented', 'maintenance', 'inactive'
base_price_per_day: number
```

### Campos de parcela (Eco Area Limonar):
```typescript
id, slug, name, internal_code,
length_m, width_m,           // Dimensiones en metros
description, short_description,
category_id  // Relación con parcel_categories
```

### ⚠️ Campos que NO existen en parcelas

**NO usar** (herencia de Eco Area Limonar/vehículos): `brand`, `model`, `seats`, `beds`, `fuel_type`, `transmission`, `year`, `is_for_sale`, `sale_status`, `sale_price`.

---

## 📸 CAMPOS DE LA TABLA `parcel_images`

**Nombres REALES en la base de datos:**
```typescript
id: UUID
parcel_id: UUID
image_url: string        // ⚠️ NO 'url'
alt_text: string         // ⚠️ NO 'alt'
is_primary: boolean      // ⚠️ NO 'is_main'
sort_order: number
created_at: timestamp
updated_at: timestamp
```

**Ordenamiento correcto:**
```typescript
parcelData.images.sort((a, b) => {
  if (a.is_primary) return -1;
  if (b.is_primary) return 1;
  return (a.sort_order || 999) - (b.sort_order || 999);
});
```

---

## 🛠️ RELACIÓN `parcel_equipment`

**Estructura:**
```
parcels (1) ←→ (N) parcel_equipment (N) ←→ (1) equipment
```

**Query correcta:**
```typescript
parcel_equipment(
  id,
  notes,
  equipment(*)  // ⚠️ Usar * para obtener todos los campos de equipment
)
```

**Uso en el componente:**
```typescript
const equipmentList = parcel.parcel_equipment?.map(pe => pe.equipment) || []
```

---

## ❌ ERRORES COMUNES

### Error 1: Usar nombres de campos incorrectos
```typescript
// ❌ INCORRECTO
images.map(img => img.url)          // Campo NO EXISTE
images.map(img => img.alt)          // Campo NO EXISTE
images.map(img => img.is_main)      // Campo NO EXISTE

// ✅ CORRECTO
images.map(img => img.image_url)
images.map(img => img.alt_text)
images.map(img => img.is_primary)
```

### Error 2: Especificar campos manualmente
```typescript
// ❌ INCORRECTO - Puede causar errores
.select('*, images:parcel_images(image_url, alt_text)')

// ✅ CORRECTO - Siempre usar *
.select('*, images:parcel_images(*)')
```

### Error 3: Usar is_available
```typescript
// ❌ INCORRECTO - Campo NO EXISTE
.eq('is_available', true)

// ✅ CORRECTO
.eq('is_for_rent', true)
.neq('status', 'inactive')
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de modificar cualquier página de parcelas:

- [ ] ¿Estás usando `*` en todas las relaciones?
- [ ] ¿Usas `is_primary` en lugar de `is_main`?
- [ ] ¿Usas `image_url` en lugar de `url`?
- [ ] ¿Usas `alt_text` en lugar de `alt`?
- [ ] ¿Usas `is_for_rent` en lugar de `is_available`?
- [ ] ¿Incluyes `parcel_equipment` si necesitas equipamiento?
- [ ] ¿Ordenas las imágenes por `is_primary` primero?
- [ ] ¿Evitas usar `brand`, `model`, `seats`, `beds` (no existen en parcelas)?

---

## 🔗 DOCUMENTOS RELACIONADOS

- **[REGLAS-SUPABASE-OBLIGATORIAS.md](./REGLAS-SUPABASE-OBLIGATORIAS.md)** - Reglas generales
- **[SUPABASE-SCHEMA-REAL.md](./SUPABASE-SCHEMA-REAL.md)** - Schema completo
- **[FLUJO-RESERVAS-CRITICO.md](./FLUJO-RESERVAS-CRITICO.md)** - Flujo de reservas
- **[SISTEMA-OFERTAS-ULTIMA-HORA.md](../sistemas/SISTEMA-OFERTAS-ULTIMA-HORA.md)** - Ofertas con parcel_id

---

**Última verificación:** 2026-02-22  
**Estado:** ✅ Migración vehicle→parcel completada. Parcelas sin campos Eco Area Limonar.
