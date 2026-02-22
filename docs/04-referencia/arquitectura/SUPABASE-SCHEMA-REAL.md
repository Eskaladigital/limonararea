# 📊 SCHEMA REAL DE SUPABASE - ECO AREA LIMONAR

**Actualizado:** 2026-02-22  
**⚠️ USAR COMO REFERENCIA DEFINITIVA**

> **Eco Area Limonar**: Tablas `parcels`, `parcel_images`, `parcel_equipment`. Bookings y `last_minute_offers` usan `parcel_id`. Las parcelas **NO tienen** `brand`, `model`, `seats`, `beds` (herencia Eco Area Limonar).

---

## ⚠️ REGLAS OBLIGATORIAS PARA QUERIES

### 1. SIEMPRE usar `*` en relaciones
```typescript
// ✅ CORRECTO
.select('*, images:parcel_images(*)')

// ❌ INCORRECTO - Puede fallar
.select('*, images:parcel_images(url, alt)')
```

### 2. Nombres de tablas EXACTOS (Eco Area Limonar)
- ✅ `parcel_categories` (tipos de parcela)
- ✅ `parcels` (parcelas)
- ✅ `parcel_images` (imágenes)
- ✅ `parcel_equipment` (relación parcela ↔ equipment)

### 3. Bookings y Blocked_dates usan `parcel_id` (NO vehicle_id)

---

## 📋 TABLA: `parcels`

**Columnas (solo parcelas, sin datos de vehículo):**

```
id, name, slug, category_id, internal_code,
description, short_description,
length_m, width_m,
base_price_per_day, status, sort_order,
is_for_rent, features,
created_at, updated_at
```

### ⚠️ Campos críticos para disponibilidad:
```sql
is_for_rent BOOLEAN      -- Para alquiler
status VARCHAR           -- 'available', 'rented', 'maintenance', 'inactive'
```

### Query correcta para parcelas:
```typescript
const { data } = await supabase
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
  .eq('is_for_rent', true)
  .eq('status', 'available')
```

---

## 📋 TABLA: `parcel_categories`

**Columnas: 9**

```
id, name, slug, description, image_url, 
sort_order, is_active, created_at, updated_at
```

### Query correcta:
```typescript
const { data } = await supabase
  .from('parcel_categories')
  .select('*')
  .eq('is_active', true)
  .order('sort_order', { ascending: true })
```

---

## 📋 TABLA: `parcel_images`

**Columnas: 8**

```
id, parcel_id, image_url, alt_text, sort_order, 
is_primary, created_at, updated_at
```

### ⚠️ IMPORTANTE: Nombres reales de campos
- ✅ `image_url` (NO `url`)
- ✅ `alt_text` (NO `alt`)
- ✅ `is_primary` (NO `is_main`)

### Query correcta:
```typescript
const { data } = await supabase
  .from('parcel_images')
  .select('*')
  .eq('parcel_id', parcelId)
  .order('is_primary', { ascending: false })
  .order('sort_order', { ascending: true })
```

---

## 📋 TABLA: `parcel_equipment`

**Columnas: 5**

```
id, parcel_id, equipment_id, notes, created_at
```

### Relación: Muchos a Muchos
- `parcels` ←→ `parcel_equipment` ←→ `equipment`

### Query correcta (desde parcels):
```typescript
const { data } = await supabase
  .from('parcels')
  .select(`
    *,
    parcel_equipment(
      id,
      notes,
      equipment(*)
    )
  `)
```

---

## 📋 TABLA: `equipment`

**Total de columnas: 11**

```
id, name, slug, description, icon, category,
is_active, is_standard, sort_order, created_at, updated_at
```

### ⚠️ Campo `category` EXISTE en equipment
Valores: `confort`, `energia`, `exterior`, `multimedia`, `seguridad`, `agua`

### Query correcta:
```typescript
const { data } = await supabase
  .from('equipment')
  .select('*')
  .eq('is_active', true)
  .order('category', { ascending: true })
  .order('sort_order', { ascending: true })
```

---

## 📋 TABLA: `extras`

**Total de columnas: 15**

```
id, name, description, price_per_day, price_per_rental,
price_type, min_quantity, max_quantity, image_url, is_active, sort_order,
created_at, updated_at, icon, price_per_unit
```

- `min_quantity` (INTEGER, nullable): Para `per_day` = mínimo de días a facturar (ej. parking 4 días); para `per_unit` = cantidad mínima al seleccionar.

### ⚠️ IMPORTANTE: Esta tabla NO tiene columna `category`

### Query correcta:
```typescript
const { data } = await supabase
  .from('extras')
  .select('*')
  .eq('is_active', true)
  .order('sort_order', { ascending: true })
```

---

## 📋 TABLA: `bookings`

**Columnas (Eco Area usa parcel_id):**
```
id, customer_id, parcel_id, pickup_date, dropoff_date,
pickup_time, dropoff_time, pickup_location_id, dropoff_location_id,
total_days, base_price, extras_price, location_fee,
total_price, status, payment_status, payment_method,
created_at, updated_at, vehicle_type, adults, children
```

---

## 📋 TABLA: `booking_extras`

**Tabla vacía actualmente**

### Columnas esperadas (según schema.sql):
```
id, booking_id, extra_id, quantity, 
price_per_unit, total_price, created_at
```

---

## 📋 TABLA: `seasons`

**Total de columnas: 15**

```
id, name, slug, start_date, end_date, min_days, is_active,
created_at, updated_at, base_price_per_day, year,
price_less_than_week, price_one_week, price_two_weeks, price_three_weeks
```

### ⚠️ LÓGICA DE PRECIOS:

Los campos de precio son **valores fijos en euros** por día:
- `price_less_than_week` (< 7 días): Precio por día
- `price_one_week` (7-13 días): Precio por día
- `price_two_weeks` (14-20 días): Precio por día  
- `price_three_weeks` (21+ días): Precio por día

**Ejemplo real de la BD:**
```json
{
  "name": "Temporada Media - Fin Diciembre 2025",
  "base_price_per_day": 95,
  "price_less_than_week": 125,  // Alquiler < 7 días: 125€/día
  "price_one_week": 115,         // Alquiler 7-13 días: 115€/día
  "price_two_weeks": 105,        // Alquiler 14-20 días: 105€/día
  "price_three_weeks": 95        // Alquiler 21+ días: 95€/día
}
```

### Query correcta para obtener temporada activa:
```typescript
const { data: season } = await supabase
  .from('seasons')
  .select('*')
  .eq('is_active', true)
  .lte('start_date', pickupDate)
  .gte('end_date', pickupDate)
  .single()
```

### Cálculo de precio correcto:
```typescript
function getPricePerDay(days: number, season: Season) {
  if (days >= 21) return season.price_three_weeks;
  if (days >= 14) return season.price_two_weeks;
  if (days >= 7) return season.price_one_week;
  return season.price_less_than_week;
}
```

---

## 📋 TABLA: `locations`

**Total de columnas: 20**

```
id, name, slug, address, city, postal_code,
latitude, longitude, phone, email,
opening_time, closing_time, is_pickup, is_dropoff,
extra_fee, notes, is_active, created_at, updated_at, sort_order
```

### Query correcta:
```typescript
const { data } = await supabase
  .from('locations')
  .select('*')
  .eq('is_active', true)
  .eq('is_pickup', true)
  .order('sort_order', { ascending: true })
```

---

## 📋 TABLA: `search_queries`

**Tracking de búsquedas y funnel de conversión (analytics):**
```
id, session_id, searched_at, pickup_date, dropoff_date,
pickup_time, dropoff_time, rental_days, advance_days,
pickup_location_id, dropoff_location_id, same_location,
category_slug, parcels_available_count, season_applied,
avg_price_shown, had_availability, parcel_selected,
selected_parcel_id, selected_parcel_price, parcel_selected_at,
booking_created, booking_id, funnel_stage, locale, user_agent_type
```

---

## 📋 TABLA: `last_minute_offers`

**Ofertas de última hora (huecos entre reservas):**
```
id, parcel_id, pickup_location_id, dropoff_location_id,
detected_start_date, detected_end_date, offer_start_date, offer_end_date,
original_price_per_day, discount_percentage, final_price_per_day,
status (detected|published|reserved|expired|ignored),
booking_id, admin_notes, created_at, updated_at
```

**RPC:** `get_active_last_minute_offers()` – Ofertas publicadas con datos de parcela.

---

## 🔍 ERRORES COMUNES Y SOLUCIONES

### ❌ Error: "column extras.category does not exist"
**Solución:** La tabla `extras` NO tiene columna `category`. Usar `sort_order` para ordenar.

### ❌ Error: "column parcel_images_1.url does not exist"
**Solución:** El campo correcto es `image_url`, no `url`. Mejor usar `select('*')`.

### ❌ Error: "column parcels.is_available does not exist"
**Solución:** Los campos correctos son `is_for_rent` y `status`.

---

## ✅ QUERIES DEFINITIVAS POR PÁGINA

### Página: `/buscar` (resultados de búsqueda)
```typescript
// API: /api/availability
const { data: parcels } = await supabase
  .from('parcels')
  .select(`
    *,
    category:parcel_categories(*),
    images:parcel_images(*)
  `)
  .eq('is_for_rent', true)
  .eq('status', 'available')
```

### Página: `/reservar/parcela` (detalles antes de reservar)
```typescript
const { data: parcel } = await supabase
  .from('parcels')
  .select(`
    *,
    category:parcel_categories(*),
    images:parcel_images(*),
    parcel_equipment(id, notes, equipment(*))
  `)
  .eq('id', parcelId)
  .eq('is_for_rent', true)
  .neq('status', 'inactive')
  .single()

const { data: extras } = await supabase
  .from('extras')
  .select('*')
  .eq('is_active', true)
  .order('sort_order', { ascending: true })
```

### Página: `/parcelas/[slug]` (detalle de parcela)
```typescript
const { data: parcel } = await supabase
  .from('parcels')
  .select(`
    *,
    category:parcel_categories(*),
    images:parcel_images(*),
    parcel_equipment(id, notes, equipment(*))
  `)
  .eq('slug', slug)
  .single()
```

---

## 📝 RESUMEN DE CAMPOS CRÍTICOS

| Tabla | Campo Correcto | ❌ Error Común |
|-------|---------------|----------------|
| parcels | `is_for_rent` | `is_available` |
| parcels | `status` | - |
| parcel_categories | `parcel_categories` | `categories` |
| parcel_images | `image_url` | `url` |
| parcel_images | `alt_text` | `alt` |
| parcel_images | `is_primary` | `is_main` |
| extras | `is_active` | `is_available` |
| extras | ❌ NO tiene `category` | `category` |
| equipment | ✅ SÍ tiene `category` | - |

---

**Última actualización:** 2026-02-22  
**Fuente:** schema-eco-area-limonar.sql + add-eco-area-tables.sql
