# Revisión de páginas /es para Eco Area Limonar (área de autocaravanas)

**Fecha:** Febrero 2025  
**Objetivo:** Valorar cada página en español según su utilidad para un área de autocaravanas (parcelas, Los Nietos, Mar Menor) vs. el proyecto original FURGOCASA (alquiler de campers).

---

## Resumen ejecutivo

| Categoría | Cantidad | Acción |
|-----------|----------|--------|
| ✅ Sirven (adaptar textos) | 12 | Mantener y adaptar contenido |
| ⚠️ Dudoso (evaluar) | 4 | Decidir según estrategia |
| ❌ No sirven (eliminar) | 5 | Eliminar o sustituir por equivalente |
| 🔧 Flujo reservas (cambiar lógica) | 6 | Cambiar vehículos → parcelas |

---

## 1. Páginas que SIRVEN (mantener y adaptar)

### `/es` (Home)
- **Contenido actual:** Alquiler campers, flota premium, kilómetros ilimitados, recogida Murcia/Madrid.
- **Para área:** Adaptar a parcelas, ubicación Los Nietos, servicios del área, CTA "Reservar parcela".
- **Acción:** Reescribir textos, cambiar imágenes, sección "vehículos destacados" → "nuestras parcelas" o "servicios".

### `/es/contacto`
- **Contenido actual:** Furgocasa, Casillas Murcia, teléfono, email.
- **Para área:** Eco Area Limonar, Los Nietos, datos de contacto reales.
- **Acción:** Actualizar dirección, teléfono, email, mapa.

### `/es/quienes-somos`
- **Contenido actual:** Empresa familiar alquiler campers desde 2012, flota, 500 viajes.
- **Para área:** Historia del área, ubicación privilegiada Mar Menor, filosofía.
- **Acción:** Reescribir historia, cifras (parcelas, años, visitantes).

### `/es/blog`
- **Contenido actual:** Blog viajes camper, rutas, consejos.
- **Para área:** Puede servir para contenido Mar Menor, Los Nietos, turismo autocaravanas.
- **Acción:** Mantener estructura; adaptar categorías y artículos a zona Mar Menor / área.

### `/es/faqs`
- **Contenido actual:** FAQs alquiler campers (permiso conducir, fianza, equipamiento, agua, cocina).
- **Para área:** FAQs reserva parcelas, horarios, servicios, normas del área.
- **Acción:** Sustituir preguntas por: horarios entrada/salida, servicios incluidos, normas, mascotas, etc.

### `/es/tarifas`
- **Contenido actual:** Precios alquiler campers por día, temporadas, extras.
- **Para área:** Precios parcelas por noche/día, temporadas, servicios.
- **Acción:** Adaptar estructura; cambiar precios y conceptos (parcelas vs vehículos).

### `/es/ofertas`
- **Contenido actual:** Ofertas alquiler campers, descuentos temporada.
- **Para área:** Ofertas parcelas, estancias largas, temporada baja.
- **Acción:** Adaptar textos; lógica similar (ofertas en BD).

### `/es/aviso-legal`
- **Contenido actual:** Furgocasa S.L., términos uso.
- **Para área:** Eco Area Limonar, datos empresa.
- **Acción:** Actualizar razón social, datos legales.

### `/es/privacidad`
- **Contenido actual:** Política privacidad Furgocasa.
- **Para área:** Misma estructura, nuevo responsable.
- **Acción:** Actualizar responsable del tratamiento.

### `/es/cookies`
- **Contenido actual:** Política cookies furgocasa.com.
- **Para área:** ecoarealimonar.com.
- **Acción:** Actualizar dominio y textos.

### `/es/pago/exito`, `/es/pago/error`, `/es/pago/cancelado`
- **Contenido actual:** Mensajes genéricos de pago.
- **Para área:** Sirven; solo adaptar textos si mencionan "vehículo" o "camper".
- **Acción:** Revisar y adaptar si hace falta.

### `/es/publicaciones`
- **Contenido actual:** Redirige a `/es/blog`.
- **Para área:** Mantener redirección.
- **Acción:** Ninguna.

---

## 2. Páginas DUDOSAS (evaluar según estrategia)

### `/es/guia-camper`
- **Contenido actual:** Guía uso camper (panel control, agua, electricidad, calefacción, gas).
- **Para área:** Los visitantes llegan con su propio camper; no alquilan.
- **Evaluación:** Puede ser útil como "Consejos para tu estancia" o "Servicios del área" (agua, electricidad, vaciado).
- **Opciones:** (A) Eliminar. (B) Adaptar a "Guía del área" (servicios, normas, consejos).

### `/es/clientes-vip`
- **Contenido actual:** Programa fidelización Furgocasa (10% descuento, prioridad, extras).
- **Para área:** Podría adaptarse a "Clientes frecuentes" o "Programa fidelidad" del área.
- **Opciones:** (A) Eliminar si no hay programa. (B) Adaptar si se quiere fidelizar visitantes.

### `/es/video-tutoriales`
- **Contenido actual:** Tutoriales uso camper (panel, agua, nevera, etc.).
- **Para área:** No aplica; no alquilan vehículos.
- **Opciones:** (A) Eliminar. (B) Sustituir por videos del área, instalaciones, entorno.

### `/es/ventas/videos`
- **Contenido actual:** Videos campers en venta (YouTube).
- **Para área:** No venden vehículos.
- **Opciones:** Eliminar o sustituir por videos del área / Mar Menor.

---

## 3. Páginas que NO SIRVEN (eliminar o sustituir)

### `/es/ventas`
- **Contenido actual:** Listado autocaravanas y campers en venta.
- **Para área:** No aplica; no se venden vehículos.
- **Acción:** Eliminar carpeta `/es/ventas` (y `ventas/[slug]`, `ventas/videos`).

### `/es/ventas/[slug]`
- **Contenido actual:** Ficha detalle vehículo en venta.
- **Acción:** Eliminar con `/es/ventas`.

### `/es/vehiculos`
- **Contenido actual:** Listado flota campers para alquilar.
- **Para área:** Sustituir por "Parcelas" o "Servicios" (tipos de parcela, equipamiento).
- **Acción:** Renombrar/adaptar a parcelas o eliminar si no hay tipos distintos.

### `/es/vehiculos/[slug]`
- **Contenido actual:** Ficha detalle camper (plazas, camas, equipamiento).
- **Para área:** Ficha parcela (tipo, servicios, precio).
- **Acción:** Adaptar a parcelas o eliminar.

### `/es/documentacion-alquiler`
- **Contenido actual:** DNI, carnet conducir, fianza 1000€, firma contrato, recogida vehículo.
- **Para área:** No aplica; reserva parcela no requiere carnet ni fianza de vehículo.
- **Acción:** Eliminar o sustituir por "Documentación reserva" (solo si se pide algo específico).

---

## 4. Flujo de reservas (cambiar lógica)

### `/es/reservar`
- **Contenido actual:** Inicio reserva camper (fechas, vehículo).
- **Para área:** Inicio reserva parcela (fechas, tipo parcela si aplica).
- **Acción:** Adaptar flujo: fechas → parcela (o solo fechas) → pago.

### `/es/reservar/vehiculo`
- **Contenido actual:** Selección vehículo, extras (sillas, placas solares, etc.).
- **Para área:** Selección parcela/tipo, extras (electricidad, agua, etc.).
- **Acción:** Adaptar o fusionar con `/reservar/nueva`.

### `/es/reservar/nueva`
- **Contenido actual:** Formulario reserva con vehículo, fechas, extras.
- **Para área:** Formulario reserva parcela, fechas, servicios.
- **Acción:** Adaptar campos (vehículo → parcela).

### `/es/reservar/[id]`
- **Contenido actual:** Detalle reserva (vehículo, recogida, devolución).
- **Para área:** Detalle reserva (parcela, entrada, salida).
- **Acción:** Adaptar textos y campos.

### `/es/reservar/[id]/pago`
- **Contenido actual:** Pago reserva alquiler.
- **Para área:** Misma lógica; adaptar textos.
- **Acción:** Revisar textos.

### `/es/reservar/[id]/confirmacion`
- **Contenido actual:** Confirmación reserva.
- **Para área:** Adaptar textos.
- **Acción:** Revisar textos.

### `/es/reservar/oferta/[offerId]`
- **Contenido actual:** Reserva con oferta aplicada.
- **Para área:** Mantener si hay ofertas; adaptar textos.
- **Acción:** Revisar.

### `/es/buscar`
- **Contenido actual:** Buscar disponibilidad campers.
- **Para área:** Buscar disponibilidad parcelas.
- **Acción:** Adaptar lógica y textos.

---

## 5. Otras páginas

### `/es/sitemap-html`
- **Acción:** Mantener; se actualiza con las rutas que queden.

### `/es/pago/test`
- **Acción:** Mantener para pruebas; no indexar.

### `/es/blog/[category]`, `/es/blog/[category]/[slug]`
- **Acción:** Mantener estructura; contenido en Supabase.

### `/es/faqs/[slug]`
- **Acción:** Mantener si hay FAQs individuales; adaptar contenido.

---

## 6. Checklist de acciones recomendadas

### Eliminar
- [ ] `/es/ventas` (y subrutas)
- [ ] `/es/documentacion-alquiler` (o sustituir por doc. reserva parcela)
- [ ] `/es/video-tutoriales` (o sustituir por videos del área)
- [ ] `/es/guia-camper` (o adaptar a guía del área)

### Adaptar contenido (textos, metadata, SEO)
- [ ] Home, Contacto, Quiénes somos
- [ ] FAQs (reescribir preguntas)
- [ ] Tarifas, Ofertas
- [ ] Aviso legal, Privacidad, Cookies
- [ ] Blog (categorías, artículos)
- [ ] Flujo reservar (vehículo → parcela)
- [ ] Buscar (campers → parcelas)

### Decidir
- [ ] Clientes VIP: ¿hay programa fidelidad?
- [ ] Guía camper: ¿eliminar o "Guía del área"?
- [ ] Video tutoriales: ¿eliminar o videos del área?
- [ ] Vehículos: ¿convertir en Parcelas o eliminar?

---

## 7. Referencias de marca a sustituir

En todas las páginas revisar y sustituir:
- **Furgocasa** → Eco Area Limonar
- **furgocasa.com** → ecoarealimonar.com
- **info@furgocasa.com** → info@ecoarealimonar.com
- **Alquiler de campers/autocaravanas** → Reserva de parcelas / Área de autocaravanas
- **Vehículos, flota, camper** → Parcelas, servicios, estancia
- **Recogida, devolución** → Entrada, salida
- **Murcia, Casillas, Madrid** → Los Nietos, Cartagena, Mar Menor
