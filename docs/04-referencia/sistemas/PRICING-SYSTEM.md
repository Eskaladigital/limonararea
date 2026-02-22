# Sistema de Precios de Eco Area Limonar

## 📊 Estructura de Precios

### Principio Fundamental
**TODOS los vehículos cuestan lo mismo según la temporada**. El precio NO depende del vehículo, sino de la fecha de alquiler.

---

## 🗓️ Precios por Temporada

Los precios están definidos en la tabla `seasons` y se aplican a TODOS los vehículos:

### Temporada 2025
- **Temporada Baja**: 95€/día
- **Temporada Media**: 125€/día
- **Temporada Alta**: 155€/día
- **Navidad**: 145€/día

### Temporada 2026
- **Semana Santa**: 150€/día

---

## ➕ Extras

### Cama Adicional (4 plazas)
- **Precio**: +10€/día
- **Aplicable a**: Vehículos con opción de 4 plazas/2 camas
- **Descripción**: Segunda cama para vehículos que normalmente tienen solo una

### Otros Extras
Todos los extras están en la tabla `extras` y se suman al precio base de la temporada.

---

## 🏗️ Estructura de Base de Datos

### Tabla `seasons`
```sql
CREATE TABLE seasons (
    id UUID PRIMARY KEY,
    name VARCHAR(100),           -- "Temporada Baja", "Temporada Alta", etc.
    slug VARCHAR(100),            -- "baja", "alta", etc.
    start_date DATE,              -- Fecha inicio
    end_date DATE,                -- Fecha fin
    base_price_per_day DECIMAL,   -- 👈 PRECIO BASE PARA TODOS LOS VEHÍCULOS
    year INTEGER,                 -- 2025, 2026, etc.
    min_days INTEGER,             -- Mínimo de días de alquiler
    ...
);
```

### Tabla `vehicles`
```sql
CREATE TABLE vehicles (
    ...
    base_price_per_day DECIMAL,   -- 👈 NULL (usa precio de temporada)
                                  --    o valor específico (caso especial)
    ...
);
```

**Regla**:
- Si `vehicles.base_price_per_day` es `NULL` → usar precio de `seasons`
- Si `vehicles.base_price_per_day` tiene valor → usar ese precio (caso excepcional)

---

## 💰 Cálculo de Precio Final

```
Precio Final = 
    (Precio Temporada × Días) + 
    (Extras × Días) + 
    (Extras únicos)
```

### Ejemplo 1: Alquiler Básico
- Vehículo: Weinsberg CaraBus 600 MQ
- Temporada: Alta (155€/día)
- Días: 7
- Extras: Ninguno

**Cálculo**: 155€ × 7 = **1,085€**

### Ejemplo 2: Con Cama Adicional
- Vehículo: Dreamer D55 Fun (4 plazas)
- Temporada: Media (125€/día)
- Días: 5
- Extras: Cama adicional (+10€/día)

**Cálculo**: (125€ + 10€) × 5 = **675€**

---

## 🎯 Ventajas de este Sistema

1. **Simplicidad**: Un solo precio por temporada
2. **Mantenimiento**: Cambiar precios en un solo lugar
3. **Flexibilidad**: Casos especiales con `base_price_per_day` en vehicles
4. **Escalabilidad**: Fácil añadir nuevas temporadas o años

---

## 📝 Archivos de Configuración

### `supabase/update-pricing-system.sql`
- Actualiza la estructura de la base de datos
- Añade `base_price_per_day` a `seasons`
- Configura precios para 2025-2026
- Crea/actualiza el extra de "Cama adicional"

### `supabase/insert-vehicles-example.sql`
- Inserta vehículos SIN `base_price_per_day`
- Los vehículos heredan automáticamente el precio de la temporada

---

## 🚀 Implementación

### Paso 1: Actualizar estructura
```sql
-- Ejecutar en Supabase SQL Editor
-- Contenido de: supabase/update-pricing-system.sql
```

### Paso 2: Insertar vehículos
```sql
-- Ejecutar en Supabase SQL Editor
-- Contenido de: supabase/insert-vehicles-example.sql
```

### Paso 3: Lógica en la aplicación
El código de la app debe:
1. Obtener las fechas de alquiler
2. Buscar la temporada correspondiente en `seasons`
3. Usar `seasons.base_price_per_day` como precio base
4. Añadir extras seleccionados
5. Calcular descuentos (7 días = -10%, 14 días = -20%, etc.)

---

## 📌 Notas Importantes

- ✅ Todos los vehículos cuestan igual (según temporada)
- ✅ Los extras se añaden al precio base
- ✅ La cama adicional es un extra de 10€/día
- ✅ El campo `base_price_per_day` en vehicles es opcional
- ✅ NULL en vehicles = usa precio de temporada
- ✅ Valor en vehicles = precio especial para ese vehículo

---

## 🔄 Actualización de Precios

Para cambiar precios:

```sql
-- Actualizar precio de una temporada
UPDATE seasons 
SET base_price_per_day = 100.00 
WHERE slug = 'baja' AND year = 2025;

-- Crear nueva temporada
INSERT INTO seasons (name, slug, start_date, end_date, base_price_per_day, year)
VALUES ('Temporada Baja', 'baja', '2027-01-01', '2027-03-31', 100.00, 2027);
```

---

**Última actualización**: Enero 2025





