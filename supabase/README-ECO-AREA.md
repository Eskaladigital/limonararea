# Eco Area Limonar - Supabase

## Orden de ejecución

1. **create-first-admin.sql** – Ya ejecutado (admins existe)
2. **schema-eco-area-limonar.sql** – Esquema completo
3. **seed-data-eco-area.sql** – Datos iniciales (opcional)

## Cómo ejecutar

1. Abre el **SQL Editor** en tu proyecto Supabase
2. Copia y pega el contenido de `schema-eco-area-limonar.sql`
3. Ejecuta (Run)
4. Copia y pega el contenido de `seed-data-eco-area.sql`
5. Ejecuta (Run)

## Estructura del esquema

| Tabla | Uso en Eco Area |
|-------|-----------------|
| **vehicles** | Parcelas |
| **vehicle_categories** | Tipos de parcela (Estándar, Premium) |
| **vehicle_images** | Imágenes de parcelas |
| **equipment** | Características (superficie, orientación, sombra, césped...) |
| **vehicle_equipment** | Parcela ↔ características |
| **extras** | Servicios (luz, wifi, agua) |
| **vehicle_available_extras** | Parcela ↔ extras disponibles |
| **locations** | Ubicación única (Eco Area Limonar, Los Nietos) |
| **seasons** | Temporadas y precios |
| **bookings** | Reservas |
| **customers** | Clientes |
| **payments** | Pagos |

## Datos iniciales (seed)

- **Categorías**: Estándar, Premium
- **Características**: Superficie 50/80/100m², Orientación, Sombra, Césped, Pavimento, Agua
- **Extras**: Electricidad (3€/día), Wifi (2€/día), Agua (1,50€/día)
- **Ubicación**: Eco Area Limonar, Los Nietos
- **Temporada**: 2026 con precios de ejemplo
