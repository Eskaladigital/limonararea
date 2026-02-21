# Plan de trabajo - Eco Area Limonar

**Fecha:** Febrero 2025  
**Objetivo:** Dejar el proyecto listo para producción como área de autocaravanas.

---

## Resumen ejecutivo

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1 | ✅ Completada | Adaptación base: Admin parcelas, Home, flujo reservas, buscador |
| 2 | 🔄 En curso | Páginas /es, FAQs, eliminación de lo no aplicable |
| 3 | ⏳ Pendiente | Supabase propio, deploy, producción |

---

## Fase 1: Adaptación base ✅

### Admin
- [x] Sidebar: "Vehículos" → "Parcelas"
- [x] Páginas vehiculos, reservas, bloqueos, calendario, etc.: etiquetas "parcela"
- [x] Logo alt: Eco Area Limonar

### Home (es)
- [x] Metadata Eco Area Limonar, Los Nietos, Mar Menor
- [x] Hero: "Eco Area Limonar", "Tu área de autocaravanas en Los Nietos, Mar Menor"
- [x] Sección parcelas, beneficios adaptados
- [x] Servicios: Ubicación, Reservar, FAQs, Blog (eliminados IA, Mapa áreas, Parking)

### Flujo reservas
- [x] Reservar: metadata y textos parcela
- [x] Reservar client: ubicación única (Los Nietos)
- [x] Buscar: "parcelas" en textos
- [x] Buscador: sin selector de ubicación (solo fechas y horas entrada/salida)
- [x] SearchSummary: "Entrada/Salida", sin sección ubicación

### Limpieza previa (usuario)
- [x] Eliminadas carpetas [location] alquiler/venta
- [x] Eliminadas páginas Europa, Marruecos, Parking Murcia
- [x] Actualizados sitemaps, route-translations

---

## Fase 2: Completar adaptación 🔄

### Páginas /es por revisar

Ver detalle en `REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md`.

| Página | Acción |
|--------|--------|
| Contacto | Actualizar datos reales (dirección, teléfono, email) |
| Quiénes somos | Reescribir historia Eco Area Limonar |
| FAQs | Sustituir preguntas por: horarios, servicios, normas del área |
| Tarifas | Adaptar precios parcelas |
| Ofertas | Adaptar textos |
| Aviso legal, Privacidad, Cookies | Actualizar razón social, dominio |
| Blog | Adaptar categorías a Mar Menor |

### Eliminar o sustituir

| Página | Motivo |
|--------|--------|
| /ventas | No venden vehículos |
| /ventas/[slug], /ventas/videos | Idem |
| /documentacion-alquiler | DNI, carnet, fianza = alquiler vehículos |
| /guia-camper | Opcional: eliminar o adaptar a "Guía del área" |
| /video-tutoriales | Tutoriales uso camper, no aplica |
| /clientes-vip | Evaluar: ¿hay programa fidelidad? |

### Rutas

- Mantener `/vehiculos` (backend usa tabla `vehicles`) — en UI se muestra como "Parcelas".
- Opcional futuro: alias `/parcelas` → `/vehiculos`.

---

## Fase 3: Producción ⏳

### Infraestructura
- [ ] Proyecto Supabase propio para Eco Area Limonar
- [ ] Variables de entorno en .env.local (no las de Furgocasa)
- [ ] Datos iniciales: parcelas, temporadas, extras

### Deploy
- [ ] Proyecto Vercel para ecoarealimonar.com
- [ ] Dominio configurado
- [ ] Variables de entorno en Vercel

### Pagos
- [ ] Redsys: comercio Eco Area Limonar (no Furgocasa)
- [ ] Stripe: cuenta si se usa
- [ ] NO modificar `src/lib/redsys/crypto.ts`

### Emails
- [ ] SMTP/dominio @ecoarealimonar.com
- [ ] Plantillas con branding Eco Area Limonar

---

## Git y repositorios

### Historial eliminado
- El historial de Furgocasa no aplica a este proyecto.
- Eliminar `.git`: cerrar Cursor y ejecutar `rmdir /s /q .git` en la carpeta.

### Cuando crees el repo en GitHub
1. Crear repo nuevo (ej. `eco-area-limonar-app`).
2. `git init` → `git add .` → `git commit` → `git remote add origin` → `git push`.
3. Nunca conectar con el repositorio de Furgocasa.

---

## Referencias

- `docs/00-PROYECTO-ECO-AREA-LIMONAR.md` — Contexto y reglas
- `docs/04-referencia/REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md` — Revisión páginas
- `.cursor/rules/redsys-crypto.mdc` — NO tocar crypto.ts
