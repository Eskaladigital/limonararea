# 🔐 GUÍA PASO A PASO: Cambiar Token del Calendario

**Fecha**: 5 de Febrero, 2026  
**Objetivo**: Cambiar el token hardcodeado `limonar2026` por uno seguro

---

## ⚠️ IMPORTANTE ANTES DE EMPEZAR

- ✅ **NO afecta funcionalidad** - Todo seguirá funcionando igual
- ✅ **Solo cambia el token** - Los usuarios tendrán que actualizar su suscripción
- ✅ **Reversible** - Si algo falla, puedes volver al token anterior

---

## 📋 PASO 1: Generar Token Seguro

### Opción A: Desde Terminal (Recomendado)

```bash
# Abre tu terminal y ejecuta:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Ejemplo de salida:**
```
a3f8b9c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0
```

### Opción B: Desde Navegador

1. Abre la consola del navegador (F12)
2. Ejecuta:
```javascript
Array.from(crypto.getRandomValues(new Uint8Array(32)))
  .map(b => b.toString(16).padStart(2, '0'))
  .join('')
```

### Opción C: Generador Online

Ve a: https://www.random.org/strings/
- Longitud: 64 caracteres
- Caracteres: Hexadecimal (0-9, a-f)
- Copia el resultado

---

## 📋 PASO 2: Añadir Token en Vercel

### 2.1. Acceder a Vercel

1. Ve a: https://vercel.com
2. Inicia sesión con tu cuenta
3. Selecciona el proyecto **limonar-app**

### 2.2. Ir a Environment Variables

1. En el menú lateral, haz clic en **Settings**
2. En el submenú, haz clic en **Environment Variables**

### 2.3. Añadir Primera Variable (Servidor)

1. Haz clic en **Add New**
2. Completa:
   - **Key**: `CALENDAR_SUBSCRIPTION_TOKEN`
   - **Value**: `[PEGA_TU_TOKEN_GENERADO]` (el token que generaste en Paso 1)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
3. Haz clic en **Save**

### 2.4. Añadir Segunda Variable (Cliente)

1. Haz clic en **Add New** otra vez
2. Completa:
   - **Key**: `NEXT_PUBLIC_CALENDAR_TOKEN`
   - **Value**: `[MISMO_TOKEN_DE_ANTES]` (el mismo token que pusiste arriba)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
3. Haz clic en **Save**

### 2.5. Verificar Variables Añadidas

Deberías ver estas dos variables en la lista:

| Key | Value (oculto) | Environments |
|-----|----------------|--------------|
| `CALENDAR_SUBSCRIPTION_TOKEN` | `***` | Production, Preview, Development |
| `NEXT_PUBLIC_CALENDAR_TOKEN` | `***` | Production, Preview, Development |

---

## 📋 PASO 3: Actualizar Código (YO LO HARÉ)

Ahora actualizaré el código para usar las variables de entorno en lugar del token hardcodeado.

**Archivos a modificar:**
1. `src/lib/calendar/calendar-handler.ts`
2. `src/app/administrator/(protected)/calendario/page.tsx`

**Cambios:**
- Mantener fallback por seguridad (si no hay variable, usa el token anterior)
- Priorizar variable de entorno sobre token hardcodeado

---

## 📋 PASO 4: Hacer Deploy en Vercel

### Opción A: Deploy Automático (Recomendado)

1. Haz commit y push de los cambios:
```bash
git add .
git commit -m "feat: cambiar token calendario a variable de entorno"
git push
```

2. Vercel hará deploy automáticamente

### Opción B: Deploy Manual

1. En Vercel, ve a **Deployments**
2. Haz clic en **Redeploy** en el último deployment
3. Espera a que termine (2-3 minutos)

---

## 📋 PASO 5: Verificar que Funciona

### 5.1. Verificar en Producción

1. Ve a: `https://www.ecoarealimonar.com/administrator/calendario`
2. Deberías ver la URL con el nuevo token (no `limonar2026`)
3. Copia la URL y pégala en el navegador
4. Deberías ver el archivo `.ics` del calendario

### 5.2. Probar Endpoint Directamente

Abre en el navegador:
```
https://www.ecoarealimonar.com/api/calendar/entregas?token=[TU_NUEVO_TOKEN]
```

**Deberías ver:**
- Si el token es correcto: Archivo `.ics` con eventos del calendario
- Si el token es incorrecto: Error "Unauthorized - Token inválido"

---

## 📋 PASO 6: Notificar a Tu Equipo

**IMPORTANTE**: Todos los que tengan el calendario suscrito necesitarán actualizarlo.

### Mensaje para el Equipo:

```
🔔 ACTUALIZACIÓN DE CALENDARIO

Hemos cambiado el token de seguridad del calendario de entregas.

Si tienes el calendario suscrito en tu móvil, necesitas actualizarlo:

1. Ve a: https://www.ecoarealimonar.com/administrator/calendario
2. Copia la nueva URL de suscripción
3. Elimina la suscripción antigua en tu calendario
4. Añade la nueva suscripción con la nueva URL

El nuevo token es: [COMPARTIR SOLO CON TU EQUIPO]

Si tienes problemas, avísame.
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Problema 1: "Token inválido" después del cambio

**Causa**: El código aún usa el token hardcodeado  
**Solución**: 
1. Verifica que las variables están en Vercel
2. Verifica que el deploy se completó
3. Espera 2-3 minutos (puede haber caché)

### Problema 2: La URL sigue mostrando `limonar2026`

**Causa**: La variable `NEXT_PUBLIC_CALENDAR_TOKEN` no está configurada  
**Solución**:
1. Ve a Vercel → Settings → Environment Variables
2. Verifica que `NEXT_PUBLIC_CALENDAR_TOKEN` existe
3. Haz redeploy

### Problema 3: El calendario no carga en móvil

**Causa**: Token antiguo en la suscripción  
**Solución**:
1. Elimina la suscripción antigua del calendario
2. Añade la nueva con el nuevo token

---

## ✅ CHECKLIST FINAL

- [ ] Token generado y guardado en lugar seguro
- [ ] Variable `CALENDAR_SUBSCRIPTION_TOKEN` añadida en Vercel
- [ ] Variable `NEXT_PUBLIC_CALENDAR_TOKEN` añadida en Vercel
- [ ] Código actualizado (YO LO HARÉ)
- [ ] Deploy completado en Vercel
- [ ] Verificado que funciona en producción
- [ ] Equipo notificado del cambio

---

## 🔒 SEGURIDAD POST-CAMBIO

Después de cambiar el token:

1. ✅ **Eliminar token antiguo del código** (YO LO HARÉ)
2. ✅ **No compartir el nuevo token públicamente**
3. ✅ **Solo compartir con tu equipo de confianza**
4. ✅ **Considerar rotar el token cada 6-12 meses**

---

## 📞 ¿NECESITAS AYUDA?

Si algo no funciona:
1. Verifica que las variables están en Vercel
2. Verifica que el deploy se completó
3. Revisa los logs de Vercel para errores
4. Prueba con el token antiguo temporalmente si es urgente

---

**Última actualización**: 5 de Febrero, 2026
