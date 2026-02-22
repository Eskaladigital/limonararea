# 🚦 Sistema de Semáforo de Ocupación

## 📋 Descripción

Sistema visual que muestra la ocupación de periodos clave (Semana Santa, verano, puentes) con indicadores tipo semáforo para acelerar la decisión de reserva de los usuarios.

## 🎯 Objetivo

- **Crear urgencia visual** en periodos de alta demanda
- **Transparencia** con información real de ocupación
- **Acelerar conversión** mostrando disponibilidad limitada
- **Reducir consultas** sobre disponibilidad

## 📊 Impacto Esperado

- **+15-25% conversión** en periodos de alta demanda
- **+10-15% engagement** (exploración de fechas)
- **-20% consultas** sobre disponibilidad

## 🏗️ Arquitectura

### 1. API Endpoint
**Ruta**: `/api/occupancy-highlights`

**Método**: `GET`

**Response**:
```json
{
  "success": true,
  "periods": [
    {
      "id": "semana-santa-2026",
      "name": "Semana Santa",
      "start_date": "2026-03-29",
      "end_date": "2026-04-05",
      "occupancy_rate": 65.5,
      "status": "moderate",
      "color": "yellow",
      "label": "Ocupación moderada",
      "icon": "🟡"
    }
  ],
  "metadata": {
    "total_vehicles": 8,
    "total_periods": 5,
    "generated_at": "2026-02-09T..."
  }
}
```

**Cache**: 
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=7200`
- Se cachea en CDN por 1 hora
- Rate limit: 120 req/minuto

### 2. Componente Frontend
**Archivo**: `src/components/booking/occupancy-highlights.tsx`

**Características**:
- Responsive (grid 1/2/3 columnas)
- Animación de pulso en periodos de alta demanda
- Skeleton loader durante carga
- Fallback silencioso si hay error
- Click-friendly para mobile

### 3. Integración en Página
**Archivo**: `src/app/es/reservar/reservar-client.tsx`

**Ubicación**: Entre el SearchWidget y los puntos de recogida

## 🎨 Lógica de Colores (Solo periodos con >= 50% ocupación)

| Ocupación | Color | Estado | Label | Comportamiento |
|-----------|-------|--------|-------|----------------|
| 50-70% | 🟡 Amarillo | `moderate` | "Ocupación moderada" | Normal |
| 70-90% | 🟠 Naranja | `high` | "Alta demanda" | **Pulso animado** |
| > 90% | 🔴 Rojo | `full` | "Completo" | **Pulso animado** |

**⚠️ IMPORTANTE**: Los periodos con ocupación < 50% (verde) **NO se muestran**. Solo queremos crear urgencia cuando realmente haya demanda alta.

**Comportamiento**:
- Si **todos** los periodos tienen < 50% ocupación → El componente **no se muestra** (return null)
- Si **algún** periodo tiene >= 50% → Se muestran solo los periodos con alta demanda

## 📅 Periodos Destacados 2026

Los periodos están **hardcodeados** en el endpoint y deben actualizarse anualmente:

```typescript
const KEY_PERIODS_2026 = [
  { id: "semana-santa-2026", name: "Semana Santa", start: "2026-03-29", end: "2026-04-05" },
  { id: "puente-mayo-2026", name: "Puente de Mayo", start: "2026-05-01", end: "2026-05-04" },
  { id: "verano-julio-2026", name: "Julio", start: "2026-07-01", end: "2026-07-31" },
  { id: "verano-agosto-2026", name: "Agosto", start: "2026-08-01", end: "2026-08-31" },
  { id: "puente-pilar-2026", name: "Puente del Pilar", start: "2026-10-10", end: "2026-10-13" },
  { id: "puente-diciembre-2026", name: "Puente Diciembre", start: "2026-12-05", end: "2026-12-08" },
];
```

**⚠️ IMPORTANTE**: Actualizar estas fechas a principios de cada año.

## 🔧 Cálculo de Ocupación

El cálculo es idéntico al usado en el dashboard de administrador (`informes-client.tsx`):

1. **Total días disponibles** = Días del periodo × Vehículos alquilables
2. **Días ocupados**: Se cuentan fechas únicas ocupadas por cada vehículo
3. **Tasa de ocupación** = (Días ocupados / Total disponible) × 100

**Estados de reserva considerados**:
- `confirmed`
- `in_progress`
- `completed`

## 🌍 Traducciones

Las traducciones están en `src/lib/translations-preload.ts`:

```typescript
"Disponibilidad por periodos": { es: "...", en: "...", fr: "...", de: "..." }
"Consulta la ocupación de fechas clave": { ... }
"Ocupación": { ... }
"Completo": { ... }
// ... etc
```

## 🚀 Testing

### Local
```bash
npm run dev
# Visitar: http://localhost:3000/es/reservar
```

### Testing del API
```bash
curl http://localhost:3000/api/occupancy-highlights
```

### Verificar con datos reales
1. Ir al admin: `/administrator/reservas`
2. Crear reservas de prueba en periodos clave
3. Recargar `/es/reservar` (esperar cache 1h o limpiar caché)
4. Verificar que los colores cambien según ocupación

## 📝 Mantenimiento Anual

### A principios de año:
1. Actualizar `KEY_PERIODS_2026` → `KEY_PERIODS_2027` en `/api/occupancy-highlights/route.ts`
2. Ajustar fechas de:
   - Semana Santa
   - Puentes festivos
   - Periodos vacacionales
3. Commit y deploy

### Opcional:
- Ajustar umbrales de color (línea 41-65 del endpoint)
- Añadir/quitar periodos según demanda histórica

## 🎯 Posibles Mejoras Futuras

1. **Panel admin** para gestionar periodos (en lugar de hardcodear)
2. **Calendario interactivo** completo (365 días)
3. **Click en periodo** → Pre-rellenar SearchWidget
4. **Ocupación por vehículo específico** (no solo promedio)
5. **Predicción ML** de ocupación futura basada en históricos
6. **Notificaciones push** cuando un periodo cambie a disponible

## 🐛 Troubleshooting

### No se ven los datos
1. Verificar que hay vehículos con `is_for_rent=true` y `status='available'`
2. Verificar que hay reservas con estados válidos
3. Revisar console del navegador (hay logs de errores)
4. Verificar API: `/api/occupancy-highlights` devuelve 200

### Los colores no son correctos
1. Verificar cálculo manual en admin (`/administrator/informes`)
2. Comparar con lógica de `getOccupancyStatus()` (línea 41 del endpoint)

### Cache no se actualiza
1. Esperar 1 hora (cache CDN)
2. O desplegar nueva versión (invalida cache)
3. O cambiar parámetro en URL: `/api/occupancy-highlights?v=2`

## 📚 Referencias

- Lógica de cálculo: `src/app/administrator/(protected)/informes/informes-client.tsx` (línea 360+)
- Componente visual: `src/components/booking/occupancy-highlights.tsx`
- API: `src/app/api/occupancy-highlights/route.ts`
- Integración: `src/app/es/reservar/reservar-client.tsx`
- Traducciones: `src/lib/translations-preload.ts`

---

**Creado**: Febrero 2026  
**Versión**: 1.0  
**Mantenedor**: Eco Area Limonar Dev Team
