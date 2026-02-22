# Eco Area Limonar - Documentación del Proyecto

**Última actualización:** 22 Febrero 2026

---

## 1. ¿Qué es este proyecto?

**Eco Area Limonar** es una aplicación web para gestionar un **área de autocaravanas** en Los Nietos, Cartagena (Mar Menor, Murcia).

- **Dominio:** ecoarealimonar.com
- **Estado:** En desarrollo

En este proyecto **todo** es **parcelas**: tabla `parcels`, traducciones con `source_table: 'parcels'`, bucket de imágenes `parcels`, analíticas por parcela.

**Única excepción vehicle:** El término `vehicle_type` es válido en el contexto de **tipo de vehículo del cliente** (autocaravana, caravana, tienda, etc.) que ocupará la parcela. Se usa en `search-widget.tsx` y en query params de búsqueda.

**Campos de parcela:** Las parcelas tienen `name`, `internal_code`, `length_m`, `width_m`, etc. **NO tienen** `brand`, `model`, `seats`, `beds`.

**Nota Storage:** La app espera el bucket `parcels` en Supabase.

**Nota content_translations:** Si hay filas con `source_table = 'vehicles'`, ejecutar `supabase/migrate-content-translations-vehicles-to-parcels.sql` en el SQL Editor.

**Tabla last_minute_offers:** Si tiene `vehicle_id`, ejecutar `supabase/migrate-last-minute-offers-vehicle-to-parcel.sql` en el SQL Editor.

---

## 2. Configuración

### Supabase

- Este proyecto usa su **propia** instancia de Supabase (credenciales en `.env.local`).
- Los commits son **solo locales** hasta que se conecte con el repositorio de GitHub.

### Repositorio en GitHub

**URL**: [https://github.com/Eskaladigital/limonararea](https://github.com/Eskaladigital/limonararea)

Para conectar este proyecto con el remoto:

```bash
git init
git add .
git commit -m "Initial commit - Eco Area Limonar"
git remote add origin https://github.com/Eskaladigital/limonararea.git
git push -u origin main
```

---

## 3. Plan de trabajo

### Fase 1: Completada ✅

- [x] Admin: parcelas
- [x] Home: contenido Eco Area Limonar
- [x] Flujo reservas: textos parcela, entrada/salida
- [x] Buscador: fechas y horas

### Fase 2: Pendiente

- [ ] Completar adaptación de páginas en `/es` (ver `REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md`)
- [ ] Configurar Supabase para Eco Area Limonar
- [ ] Adaptar FAQs a área de autocaravanas
- [ ] Actualizar contacto, quiénes somos, aviso legal con datos reales

### Fase 3: Producción

- [ ] Deploy en Vercel con dominio ecoarealimonar.com
- [ ] Configurar Redsys/Stripe con comercio de Eco Area Limonar
- [ ] Emails con dominio @ecoarealimonar.com

---

## 4. Estructura de documentación

| Documento | Contenido |
|-----------|-----------|
| **docs/00-PROYECTO-ECO-AREA-LIMONAR.md** | Este archivo. Contexto y reglas. |
| **docs/01-PLAN-ECO-AREA-LIMONAR.md** | Plan de trabajo por fases. |
| **docs/04-referencia/REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md** | Revisión página a página de /es. |
| **README.md** | Guía general del proyecto. |
| **.cursor/rules/redsys-crypto.mdc** | Regla: NO modificar crypto.ts de Redsys. |

---

## 5. Para un nuevo agente

### Antes de empezar

1. Leer este documento.
2. Leer `REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md`.
3. Leer `README.md` sección "Reglas Absolutas".

### Qué hacer

- Adaptar contenido a "área de autocaravanas" y "parcelas".
- Usar credenciales de Supabase de este proyecto.
- Sustituir textos placeholder por datos reales de Eco Area Limonar.

### Qué no hacer

- Modificar `src/lib/redsys/crypto.ts` (ver regla en .cursor/rules).
