# ✅ Redsys Habilitado - Resumen de Cambios

**Fecha**: 23 de Enero de 2026  
**Estado**: ✅ REDSYS HABILITADO CON LOGS COMPLETOS

---

## 🎯 Cambios Realizados

### 1. ✅ Redsys Habilitado en Frontend
- **Archivo**: `src/app/reservar/[id]/pago/page.tsx`
- Redsys ahora es el método por defecto
- Botón habilitado y funcional
- Selector muestra ambas opciones (Redsys y Stripe)

### 2. ✅ Sistema de Logs Extensos Implementado

#### Frontend (Consola del Navegador)
- 5 fases con información detallada
- Validación de parámetros
- Decodificación de datos Redsys
- Seguimiento del formulario

#### Backend - Initiate (Vercel Logs)
- 8 fases con información completa
- Validación de configuración
- Verificación de parámetros
- Decodificación de firma

#### Backend - Notification (Vercel Logs)
- 7 fases con seguimiento del pago
- Validación de firma HMAC-SHA256
- Actualización de reserva
- Envío de emails

### 3. ✅ Variables de Entorno Corregidas
- **Archivo**: `.env.local`
- `REDSYS_TERMINAL`: Cambiado de `1` a `001` ✅
- `NEXT_PUBLIC_URL`: Añadida con valor `https://www.ecoarealimonar.com` ✅

---

## 🚀 Cómo Probar

### Paso 1: Reiniciar el Servidor (IMPORTANTE)

```bash
# Si estás en desarrollo local, reinicia:
# Ctrl+C para detener
npm run dev
```

**⚠️ IMPORTANTE**: Si la app está en Vercel, las variables de entorno se actualizan automáticamente en el próximo deploy.

### Paso 2: Hacer una Prueba de Pago

1. Crea una reserva de prueba
2. Ve a la página de pago
3. **Abre las DevTools (F12)** → Pestaña Console
4. Selecciona **Redsys** (debería estar seleccionado por defecto)
5. Haz clic en **"Pagar"**
6. **MANTÉN LA CONSOLA ABIERTA** para ver los logs

### Paso 3: Revisar los Logs

#### En el Navegador
Verás logs como estos:

```
================================================================================
💳 FRONTEND - INICIANDO PROCESO DE PAGO
================================================================================
📊 [1/5] Información del pago: {...}
🔴 [2/5] Método seleccionado: REDSYS
📥 [3/5] Respuesta del servidor recibida
✅ [3/5] Respuesta exitosa del backend
🔍 [3/5] Parámetros Redsys (decodificados): {...}
📤 [5/5] Formulario creado con éxito
🚀 [5/5] Enviando formulario a Redsys...
================================================================================
```

#### En Vercel (Backend)
1. Ve a https://vercel.com
2. Abre tu proyecto `limonar-app`
3. Ve a **Functions** > Busca la función `api/redsys/initiate`
4. Haz clic en **Logs**

O usa CLI:
```bash
vercel logs --follow
```

---

## 🔍 Qué Verificar en los Logs

### 1. Configuración de Redsys (Backend)

Busca esta sección en los logs de Vercel:

```javascript
⚙️ [4/8] Configuración de Redsys: {
  merchantCode: '347036410',      // ✅ Tu FUC
  terminal: '001',                // ✅ Debe ser '001' (con ceros)
  hasSecretKey: true,             // ✅ Debe ser true
  secretKeyLength: 32,            // ✅ Debe ser > 0
  urlOk: 'https://www.ecoarealimonar.com/pago/exito',
  urlKo: 'https://www.ecoarealimonar.com/pago/error',
  notificationUrl: 'https://www.ecoarealimonar.com/api/redsys/notification',
  environment: 'production'
}
```

**Verifica**:
- ✅ `merchantCode` es `347036410`
- ✅ `terminal` es `001` (NO `1`)
- ✅ `hasSecretKey` es `true`
- ✅ `secretKeyLength` es mayor que 0
- ✅ Todas las URLs son `https://www.ecoarealimonar.com/...`

### 2. Parámetros Enviados a Redsys

```javascript
✅ [5/8] Parámetros decodificados correctamente: {
  "DS_MERCHANT_AMOUNT": "9500",           // ✅ Céntimos
  "DS_MERCHANT_ORDER": "FC2601231234XXXX",// ✅ Formato correcto
  "DS_MERCHANT_MERCHANTCODE": "347036410",
  "DS_MERCHANT_CURRENCY": "978",          // ✅ Euro
  "DS_MERCHANT_TRANSACTIONTYPE": "0",     
  "DS_MERCHANT_TERMINAL": "001",          // ✅ Con ceros
  "DS_MERCHANT_MERCHANTURL": "https://www.ecoarealimonar.com/api/redsys/notification",
  "DS_MERCHANT_URLOK": "https://www.ecoarealimonar.com/pago/exito",
  "DS_MERCHANT_URLKO": "https://www.ecoarealimonar.com/pago/error"
}
```

### 3. Validaciones Críticas

```javascript
🔍 [5/8] Validaciones de parámetros: {
  conversionCorrecta: true,        // ✅ DEBE SER TRUE
  orderLength: 12,                 // ✅ DEBE SER 12
  orderFormatCorrecto: true,       // ✅ DEBE SER TRUE
}
```

---

## 🚨 Si Aparece un Error

### Error SIS0042 (Datos enviados incorrectos)

**Si aparece este error**, copia TODOS los logs y verifica:

1. **Terminal**: Debe ser `001` no `1`
2. **URLs**: Deben ser exactamente las configuradas en Redsys
3. **Merchant Code**: Debe ser `347036410`
4. **Amount**: Debe estar en céntimos (95€ = 9500)

### Error de Firma Inválida

Si Redsys dice "firma inválida":

1. Verifica que la `REDSYS_SECRET_KEY` sea correcta
2. Verifica que no tenga espacios al inicio/final
3. Contacta con Redsys para confirmar la clave

### Error 404 en Recursos de Redsys

Si ves errores como:
```
GET https://sis.redsys.es/sis/comercios/img/logotipos/--logo.png 404
```

Esto indica que Redsys no reconoce tu FUC. Contacta con soporte de Redsys.

---

## 📞 Contactar con Redsys (si es necesario)

Si después de verificar todo sigue habiendo errores:

**Email**: soporte.comercios@redsys.es  
**Teléfono**: 902 33 25 45  
**Horario**: L-V 9:00-18:00

**Proporciona**:
- FUC: 347036410
- Terminal: 001
- Error específico
- Logs completos (frontend + backend)
- URLs configuradas

---

## 📚 Documentación

- **REDSYS-HABILITADO-LOGS-EXTENSOS.md** - Guía completa de logs
- **CHECKLIST-CONTACTO-REDSYS.md** - Información para contactar con Redsys
- **REDSYS-CONFIGURACION.md** - Documentación técnica completa

---

## ✅ Checklist de Verificación

### Antes de Probar
- [x] Redsys habilitado en el código
- [x] Logs extensos implementados
- [x] Terminal corregido a `001`
- [x] `NEXT_PUBLIC_URL` añadida
- [ ] Servidor reiniciado (si es local)

### Durante la Prueba
- [ ] DevTools abierta (F12)
- [ ] Método Redsys seleccionado
- [ ] Logs visibles en consola

### Después de la Prueba
- [ ] Revisar logs del navegador
- [ ] Revisar logs de Vercel
- [ ] Verificar parámetros enviados
- [ ] Confirmar validaciones

---

## 🎯 Próximo Paso

**AHORA**: Haz una prueba de pago con una reserva real y revisa los logs. Si hay algún error, copia TODOS los logs (frontend y backend) para analizarlos.

**Tarjeta de prueba Redsys** (si estás en modo test):
```
Número: 4548 8120 4940 0004
Caducidad: 12/30
CVV: 123
```

---

**Estado**: ✅ TODO LISTO PARA PROBAR  
**Siguiente acción**: Realizar prueba de pago y revisar logs
