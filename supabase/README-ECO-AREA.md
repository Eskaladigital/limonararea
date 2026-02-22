# Eco Area Limonar - Supabase

## Orden de ejecución

1. **create-first-admin.sql** – Ya ejecutado (admins existe)
2. **schema-eco-area-limonar.sql** – Esquema completo
3. **add-eco-area-tables.sql** – search_queries, last_minute_offers + RPC
4. **seed-data-eco-area.sql** – Datos iniciales (opcional)

## Cómo ejecutar

1. Abre el **SQL Editor** en tu proyecto Supabase
2. Copia y pega el contenido de `schema-eco-area-limonar.sql`
3. Ejecuta (Run)
4. Copia y pega el contenido de `add-eco-area-tables.sql`
5. Ejecuta (Run)
6. Copia y pega el contenido de `seed-data-eco-area.sql`
7. Ejecuta (Run)

**Alternativa:** Con `DATABASE_URL` en `.env.local`: `node scripts/apply-eco-area-tables.js`

## Estructura del esquema

| Tabla | Uso en Eco Area |
|-------|-----------------|
| **parcels** | Parcelas (área de autocaravanas) |
| **parcel_categories** | Tipos de parcela (Estándar, Premium) |
| **parcel_images** | Imágenes de parcelas |
| **equipment** | Características (superficie, orientación, sombra, césped...) |
| **parcel_equipment** | Parcela ↔ características |
| **extras** | Servicios (luz, wifi, agua) |
| **parcel_available_extras** | Parcela ↔ extras disponibles |
| **locations** | Ubicación única (Eco Area Limonar, Los Nietos) |
| **seasons** | Temporadas y precios |
| **bookings** | Reservas (parcel_id) |
| **customers** | Clientes |
| **payments** | Pagos |
| **search_queries** | Tracking búsquedas y conversión (analytics) |
| **last_minute_offers** | Ofertas última hora (parcel_id) |

**RPC:** `get_active_last_minute_offers` – Ofertas publicadas con datos de parcela

## Datos iniciales (seed)

- **Categorías**: Estándar, Premium
- **Características**: Superficie 50/80/100m², Orientación, Sombra, Césped, Pavimento, Agua
- **Extras**: Electricidad (3€/día), Wifi (2€/día), Agua (1,50€/día)
- **Ubicación**: Eco Area Limonar, Los Nietos
- **Temporada**: 2026 con precios de ejemplo
