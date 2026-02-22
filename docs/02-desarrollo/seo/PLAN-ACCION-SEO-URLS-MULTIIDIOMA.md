# 📋 PLAN DE ACCIÓN SEO - URLs MULTIIDIOMA
**Fecha inicio:** 24 enero 2026  
**Estado:** 🚀 EN EJECUCIÓN  
**Documento referencia:** `AUDITORIA-SEO-URLS-MULTIIDIOMA.md`

---

## 🎯 OBJETIVO GENERAL

Corregir la arquitectura de URLs multiidioma para eliminar señales contradictorias a Google y mejorar el posicionamiento SEO en los 4 idiomas (ES, EN, FR, DE).

---

## 📊 FASES DEL PLAN

| Fase | Descripción | Duración | Estado |
|------|-------------|----------|--------|
| 1 | Correcciones Inmediatas | 2 horas | 🚀 EN CURSO |
| 2 | Limpieza y Optimización | 1-2 días | ⏳ PENDIENTE |
| 3 | Migración a [locale] | 1-2 semanas | ⏳ PENDIENTE |
| 4 | Testing y Validación | 3-4 días | ⏳ PENDIENTE |
| 5 | Deploy y Monitoreo | Continuo | ⏳ PENDIENTE |

---

## 🔥 FASE 1: CORRECCIONES INMEDIATAS (HOY)

**Objetivo:** Eliminar problemas críticos sin afectar funcionamiento actual  
**Duración:** 2 horas  
**Riesgo:** ⚠️ Bajo

### ✅ Tareas Completadas

- [x] **1.1. Eliminar `public/robots.txt` duplicado**
  - ❌ Archivo conflictivo removido
  - ✅ Solo queda `src/app/robots.ts` (dinámico)
  - **Resultado:** Evitamos conflicto entre robots.txt estático y dinámico

### 📋 Tareas en Progreso

- [ ] **1.2. Verificar redirecciones críticas**
  - Crear script de validación de URLs
  - Probar redirecciones principales
  - Documentar resultados

- [ ] **1.3. Preparar auditoría Google Search Console**
  - Documentar URLs actuales para comparar
  - Crear checklist de verificación
  - Preparar reporte de URLs indexadas

---

## 🔧 FASE 2: LIMPIEZA Y OPTIMIZACIÓN (1-2 días)

**Objetivo:** Optimizar configuración actual antes de migración  
**Duración:** 1-2 días  
**Riesgo:** ⚠️ Medio

### 📋 Tareas Planificadas

- [ ] **2.1. Consolidar redirecciones en next.config.js**
  - Eliminar redirecciones duplicadas
  - Optimizar cadenas de redirección
  - Documentar cada redirección con comentarios
  - **Archivos afectados:** `next.config.js`

- [ ] **2.2. Simplificar rewrites**
  - Agrupar rewrites por idioma
  - Eliminar rewrites sin uso
  - Optimizar patrones de matching
  - **Archivos afectados:** `next.config.js`

- [ ] **2.3. Optimizar middleware**
  - Mejorar lógica de detección de locale
  - Reducir complejidad de traducciones
  - Añadir logging para debugging
  - **Archivos afectados:** `src/middleware.ts`

- [ ] **2.4. Crear script de validación de URLs**
  - Script para probar todas las URLs
  - Verificar redirecciones funcionan
  - Detectar enlaces rotos
  - **Nuevo archivo:** `scripts/validate-urls.js`

---

## 🏗️ FASE 3: MIGRACIÓN A ARQUITECTURA [locale] (1-2 semanas)

**Objetivo:** Implementar estructura física correcta por idioma  
**Duración:** 1-2 semanas  
**Riesgo:** 🔴 Alto

### 📋 Subtareas Detalladas

#### 3.1. Preparación (Día 1-2)

- [ ] **3.1.1. Crear rama git dedicada**
  ```bash
  git checkout -b feature/locale-architecture-migration
  ```

- [ ] **3.1.2. Backup base de datos**
  - Exportar esquema completo
  - Backup de tablas críticas
  - Guardar en carpeta segura

- [ ] **3.1.3. Crear estructura base [locale]**
  ```
  src/app/[locale]/
  ├── layout.tsx
  ├── page.tsx
  └── ... (se irán migrando páginas)
  ```

#### 3.2. Migración Sistema de Traducciones (Día 3-5)

- [ ] **3.2.1. Ampliar tabla de traducciones en Supabase**
  - Añadir soporte para contenido dinámico
  - Migrar traducciones existentes
  - Crear funciones helper

- [ ] **3.2.2. Actualizar `getTranslatedRecords()`**
  - Soportar más tipos de contenido
  - Optimizar queries
  - Cachear traducciones frecuentes

- [ ] **3.2.3. Crear sistema de fallback**
  - Si no hay traducción → español
  - Log de traducciones faltantes
  - UI para añadir traducciones

#### 3.3. Migración de Páginas (Día 6-10)

**Orden de migración (por prioridad SEO):**

1. **HOME (Día 6)**
   - [ ] Migrar `src/app/page.tsx` → `src/app/[locale]/page.tsx`
   - [ ] Traducir contenido estático
   - [ ] Probar en 4 idiomas
   - [ ] Verificar metadata

2. **VEHÍCULOS (Día 7)**
   - [ ] Migrar `src/app/vehiculos/` → `src/app/[locale]/vehiculos/`
   - [ ] Traducir descripciones
   - [ ] Actualizar componentes cliente
   - [ ] Probar slugs dinámicos

3. **BLOG (Día 8)**
   - [ ] Migrar `src/app/blog/` → `src/app/[locale]/blog/`
   - [ ] Traducir categorías
   - [ ] Migrar posts
   - [ ] Actualizar sistema de slugs

4. **PÁGINAS INFORMATIVAS (Día 9)**
   - [ ] Quiénes somos
   - [ ] Cómo funciona
   - [ ] Guía camper
   - [ ] FAQs
   - [ ] Contacto

5. **PÁGINAS COMERCIALES (Día 10)**
   - [ ] Tarifas
   - [ ] Reservar
   - [ ] Ofertas
   - [ ] Ventas

#### 3.4. Actualizar Routing y Middleware (Día 11-12)

- [ ] **3.4.1. Simplificar middleware**
  - Eliminar lógica de rewrites
  - Solo routing a [locale] correcto
  - Mantener redirecciones legacy

- [ ] **3.4.2. Eliminar rewrites de next.config.js**
  - Quitar rewrites gradualmente
  - Mantener solo redirecciones 301
  - Documentar cambios

- [ ] **3.4.3. Actualizar componentes de navegación**
  - `LocalizedLink` usar rutas físicas
  - Actualizar header/footer
  - Actualizar sitemap

#### 3.5. Actualizar Sitemap y Metadata (Día 13-14)

- [ ] **3.5.1. Separar sitemap por idioma**
  - Crear `sitemap-es.xml`
  - Crear `sitemap-en.xml`
  - Crear `sitemap-fr.xml`
  - Crear `sitemap-de.xml`
  - Crear `sitemap.xml` (índice)

- [ ] **3.5.2. Verificar canonical y hreflang**
  - Revisar todas las páginas
  - Probar con validator
  - Corregir errores

---

## 🧪 FASE 4: TESTING Y VALIDACIÓN (3-4 días)

**Objetivo:** Asegurar todo funciona antes de deploy  
**Duración:** 3-4 días  
**Riesgo:** ⚠️ Medio

### 📋 Checklist de Testing

#### 4.1. Testing Funcional

- [ ] **Navegación**
  - [ ] Links internos funcionan en 4 idiomas
  - [ ] Cambio de idioma funciona
  - [ ] Breadcrumbs correctos
  - [ ] Menús traducidos

- [ ] **Formularios**
  - [ ] Búsqueda funciona
  - [ ] Reservas funcionan
  - [ ] Contacto funciona
  - [ ] Validaciones traducidas

- [ ] **Contenido Dinámico**
  - [ ] Vehículos cargan traducidos
  - [ ] Blog carga traducido
  - [ ] Precios correctos
  - [ ] Fechas formateadas por locale

#### 4.2. Testing SEO

- [ ] **URLs**
  - [ ] Todas las URLs responden 200 OK
  - [ ] No hay enlaces rotos
  - [ ] Redirecciones 301 funcionan
  - [ ] No hay cadenas de redirecciones

- [ ] **Metadata**
  - [ ] Title correcto por idioma
  - [ ] Description correcto
  - [ ] Canonical correcto
  - [ ] Hreflang correcto
  - [ ] OpenGraph correcto

- [ ] **Sitemap**
  - [ ] Sitemap índice funciona
  - [ ] Sitemaps por idioma funcionan
  - [ ] URLs coinciden con sitemap
  - [ ] LastModified actualizado

- [ ] **Robots.txt**
  - [ ] Accesible en /robots.txt
  - [ ] Sitemap referenciado
  - [ ] Rutas bloqueadas correctas

#### 4.3. Testing Performance

- [ ] **Core Web Vitals**
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
  - [ ] Performance score > 90

- [ ] **Carga de Páginas**
  - [ ] Home carga rápido
  - [ ] Páginas dinámicas optimizadas
  - [ ] Imágenes optimizadas
  - [ ] Caché funcionando

#### 4.4. Testing Cross-browser

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile (iOS)
- [ ] Mobile (Android)

---

## 🚀 FASE 5: DEPLOY Y MONITOREO (Continuo)

**Objetivo:** Deploy seguro y monitoreo post-lanzamiento  
**Duración:** Continuo  
**Riesgo:** 🔴 Alto

### 5.1. Pre-Deploy

- [ ] **5.1.1. Crear entorno de staging**
  - Deploy a staging.ecoarealimonar.com
  - Probar exhaustivamente
  - Invitar equipo a probar

- [ ] **5.1.2. Documentación**
  - Actualizar README
  - Documentar cambios
  - Crear guía de rollback

- [ ] **5.1.3. Comunicación**
  - Notificar al equipo
  - Programar ventana de deploy
  - Preparar mensajes de status

### 5.2. Deploy a Producción

- [ ] **5.2.1. Deploy gradual**
  ```bash
  # Paso 1: Merge a main
  git merge feature/locale-architecture-migration
  
  # Paso 2: Deploy a Vercel
  vercel --prod
  
  # Paso 3: Verificar funcionamiento
  npm run validate-urls
  ```

- [ ] **5.2.2. Verificación inmediata (primeros 30 min)**
  - [ ] Home carga correctamente
  - [ ] Vehículos carga
  - [ ] Blog carga
  - [ ] Formularios funcionan
  - [ ] No hay errores 500

- [ ] **5.2.3. Verificación completa (primeras 2 horas)**
  - [ ] Probar todas las URLs principales
  - [ ] Verificar analytics funcionando
  - [ ] Revisar logs de errores
  - [ ] Monitorear métricas

### 5.3. Post-Deploy

- [ ] **5.3.1. Reenviar sitemap a Google (Día 1)**
  - Google Search Console → Sitemaps
  - Enviar nuevo sitemap.xml
  - Esperar indexación

- [ ] **5.3.2. Monitoreo Semana 1**
  - [ ] URLs indexadas (diario)
  - [ ] Errores 404 (diario)
  - [ ] Performance (diario)
  - [ ] Tráfico orgánico (diario)

- [ ] **5.3.3. Monitoreo Semana 2-4**
  - [ ] Posicionamiento keywords (semanal)
  - [ ] Tráfico por idioma (semanal)
  - [ ] Conversiones (semanal)
  - [ ] Core Web Vitals (semanal)

- [ ] **5.3.4. Auditoría Mes 1**
  - Comparar tráfico mes anterior
  - Analizar cambios en posicionamiento
  - Identificar mejoras adicionales
  - Crear reporte ejecutivo

---

## 📊 MÉTRICAS DE ÉXITO

### KPIs Principales

| Métrica | Antes | Meta | Actual |
|---------|-------|------|--------|
| URLs indexadas (total) | ~180 | ~180 | - |
| URLs indexadas EN | 0 | 45 | - |
| URLs indexadas FR | 0 | 45 | - |
| URLs indexadas DE | 0 | 45 | - |
| Errores 404 | ? | < 5 | - |
| Tiempo carga promedio | ? | < 2s | - |
| Core Web Vitals score | ? | > 90 | - |

### KPIs Secundarios

| Métrica | Antes | Meta (3 meses) | Actual |
|---------|-------|----------------|--------|
| Tráfico orgánico total | - | +20% | - |
| Tráfico orgánico EN | - | +50% | - |
| Tráfico orgánico FR | - | +30% | - |
| Tráfico orgánico DE | - | +30% | - |
| Conversión orgánica | - | +15% | - |
| Bounce rate | - | -10% | - |

---

## 🚨 PLAN DE CONTINGENCIA

### Problemas Comunes y Soluciones

#### Problema 1: Caída de tráfico > 20%
**Síntomas:** Tráfico orgánico cae más del 20% en primera semana  
**Causas posibles:**
- URLs no redirigen correctamente
- Google no ha reindexado
- Errores en canonical/hreflang

**Solución:**
1. Revisar redirecciones 301
2. Forzar reindexación en Search Console
3. Verificar sitemap
4. Si persiste > 7 días: considerar rollback

#### Problema 2: Errores 500 en producción
**Síntomas:** Errores de servidor, páginas no cargan  
**Causas posibles:**
- Error en queries a Supabase
- Traducciones faltantes
- Middleware mal configurado

**Solución:**
1. Revisar logs de Vercel
2. Identificar páginas afectadas
3. Hotfix inmediato
4. Si es crítico: rollback

#### Problema 3: URLs duplicadas indexadas
**Síntomas:** Google indexa URLs antiguas y nuevas  
**Causas posibles:**
- Redirecciones 301 faltantes
- Canonical incorrecto
- Sitemap antiguo activo

**Solución:**
1. Verificar redirecciones
2. Actualizar canonical
3. Desindexar URLs antiguas
4. Reenviar sitemap

### Procedimiento de Rollback

**Si es necesario volver atrás:**

```bash
# 1. Revertir último deploy
vercel rollback

# 2. O revertir commit
git revert <commit-hash>
git push origin main

# 3. Reenviar sitemap antiguo
# Search Console → Sitemaps → Submit old sitemap
```

---

## 📝 LOG DE CAMBIOS

### 24 enero 2026

**Fase 1 - Correcciones Inmediatas**
- ✅ Eliminado `public/robots.txt` duplicado
- 🚀 Creado plan de acción completo
- 🚀 Iniciando verificación de redirecciones

---

## 📞 CONTACTOS Y RESPONSABLES

**Responsable técnico:** [TU NOMBRE]  
**Responsable SEO:** [NOMBRE]  
**Soporte Vercel:** support@vercel.com  
**Soporte Supabase:** support@supabase.com

---

## ✅ PRÓXIMO PASO INMEDIATO

**AHORA:** Completar Fase 1.2 - Crear script de validación de URLs
**Archivo:** `scripts/validate-urls.js`
**Tiempo estimado:** 30 minutos
