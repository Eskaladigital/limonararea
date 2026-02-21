# 📂 Archivos Temporales - Documentación de Soluciones

Esta carpeta contiene documentación de problemas resueltos, configuraciones temporales y guías de implementación.

## 🤖 Filtrado de Bots en Analytics (RECIENTE)

### Estado Actual: Solo Vercel Firewall
**Fecha**: 26 de enero de 2026

El sistema de filtrado de bots está implementado en **dos niveles**:

1. **✅ ACTIVO**: Vercel Firewall (Bot Protection + AI Bots)
2. **❌ REVERTIDO**: Filtro isBot() en código

### Archivos relacionados:

| Archivo | Descripción |
|---------|-------------|
| **REVERSION-FILTRO-BOTS.md** | 📖 Documentación completa del sistema |
| **GUIA-RAPIDA-REACTIVACION.md** | ⚡ Instrucciones para reactivar filtro de código |
| `../../supabase/cleanup-bot-searches.sql` | 🧹 Script para limpiar datos históricos |

### ¿Qué hacer ahora?

**Opción A - Mantener solo Vercel (RECOMENDADO):**
1. Esperar 1-2 semanas
2. Monitorear `/administrator/busquedas`
3. Verificar que el tráfico desde Lanzhou desaparezca
4. Ejecutar script de limpieza histórica

**Opción B - Reactivar filtro de código:**
1. Leer `GUIA-RAPIDA-REACTIVACION.md`
2. Seguir los 5 pasos
3. Desplegar a producción
4. Verificar en 24-48 horas

### Links Importantes:
- Vercel Firewall: https://vercel.com/furgocasa/webfurgocasa/firewall/rules#bot-management
- Analytics: https://www.furgocasa.com/administrator/busquedas
- Supabase: Dashboard de búsquedas

---

## 📊 Otros Problemas Documentados

### Analytics y Estadísticas
- `DEBUGGING-ANALYTICS.md` - Problemas con Google Analytics
- `CORRECCION-STATS-CLIENTES.md` - Corrección de estadísticas de clientes

### Problemas de Frontend
- `PROBLEMA-ABORTERROR-HOME.md` - Errores AbortError en home
- `SOLUCION-DROPDOWNS-Z-INDEX.md` - Problemas de z-index en dropdowns

### Soluciones Implementadas
- `SOLUCION-BLOG-FRONTEND.md` - Configuración del blog
- `SOLUCION-RAPIDA-MEDIA.md` - Solución rápida para media queries

### Configuraciones
- `REGLA-CALCULO-DIAS-ALQUILER.md` - Lógica de cálculo de días
- `STRIPE-SETUP-RAPIDO.md` - Configuración rápida de Stripe

---

## 🔍 Búsqueda Rápida

### Para problemas de bots:
```bash
# Leer documentación completa
cat REVERSION-FILTRO-BOTS.md

# Guía rápida de reactivación
cat GUIA-RAPIDA-REACTIVACION.md

# Script de limpieza
cat ../../supabase/cleanup-bot-searches.sql
```

### Para verificar en Supabase:
```sql
-- Ver búsquedas recientes
SELECT COUNT(*) FROM search_queries 
WHERE searched_at >= CURRENT_DATE - INTERVAL '24 hours';

-- Ver sesiones sospechosas
SELECT session_id, COUNT(*) as searches
FROM search_queries
WHERE searched_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY session_id
HAVING COUNT(*) > 10
ORDER BY searches DESC;
```

---

## ⚠️ Nota Importante

**URL Canónica**: Usar `https://ecoarealimonar.com` (producción)

---

## 📅 Última Actualización

**26 de enero de 2026**: Reversión de filtro isBot(), manteniendo solo Vercel Firewall activo.
