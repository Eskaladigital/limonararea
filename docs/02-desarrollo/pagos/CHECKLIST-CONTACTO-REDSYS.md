# 📞 Checklist para Contactar con Redsys y Habilitar Pagos

## 📋 Resumen de la Situación Actual

### ✅ Lo que YA tienes implementado
- ✅ Código de integración completo (frontend + backend)
- ✅ Sistema de cifrado 3DES y firmas HMAC-SHA256
- ✅ Endpoints API (`/api/redsys/initiate` y `/api/redsys/notification`)
- ✅ Tabla de pagos en base de datos configurada
- ✅ Sistema dual con Stripe como alternativa

### 🔴 El Problema Actual
- **Error**: SIS0042 ("Error en datos enviados")
- **Síntoma**: Redsys rechaza los pagos y devuelve errores 404 en recursos (CSS, JS, logo)
- **Causa probable**: Configuración incompleta o incorrecta del comercio en Redsys

---

## 🎯 Información que Necesitas ANTES de Contactar

### 1. Datos de Tu Comercio (Recopilar de tu contrato/banco)

Necesitas confirmar los siguientes datos con tu banco o con quien contrató Redsys:

- [ ] **FUC (Código de Comercio)**: Actualmente tienes `347036410`
  - ¿Es correcto este número?
  - ¿Está dado de alta y ACTIVO?

- [ ] **Terminal**: Actualmente configurado como `001`
  - ¿Es el terminal correcto?
  - ¿Hay más terminales disponibles?

- [ ] **Clave Secreta (Secret Key)**:
  - ¿Tienes la clave correcta en formato Base64?
  - ¿Es para producción o para pruebas?

- [ ] **Entorno**:
  - ¿Estás usando entorno de **pruebas** o **producción**?
  - ¿Tu FUC está habilitado para ambos entornos?

---

## 🔐 Acceso al Panel de Administración de Redsys

### URLs de Acceso

**Entorno de PRUEBAS:**
```
https://sis-t.redsys.es:25443/admincanales-web/index.jsp#/login
```

**Entorno de PRODUCCIÓN:**
```
https://canales.redsys.es/admincanales-web/index.jsp#/loginCaixa
```

### Pasos para Acceder

1. **Solicita credenciales de acceso** (si no las tienes):
   - Contacta a tu banco o al equipo que contrató Redsys
   - Necesitas: Usuario y contraseña del panel de administración

2. **Una vez dentro, navega a**:
   ```
   Menú > Administración > Configuración de comercio
   ```

3. **Verifica la siguiente información**:
   - [ ] Estado del comercio (Activo / Inactivo)
   - [ ] Terminal configurado
   - [ ] Clave de firma SHA-256
   - [ ] URLs configuradas

---

## ⚙️ Configuración Obligatoria en Panel Redsys

### URLs que DEBES Configurar

Dependiendo de tu entorno actual:

#### Para PRODUCCIÓN (www.ecoarealimonar.com):

```
URL de Notificación:
https://www.ecoarealimonar.com/api/redsys/notification

URL OK (Éxito):
https://www.ecoarealimonar.com/pago/exito

URL KO (Error):
https://www.ecoarealimonar.com/pago/error
```

#### Para PRUEBAS (localhost o desarrollo):

Si estás probando localmente, necesitas usar **ngrok** para exponer tu servidor:

```bash
# Instalar ngrok: https://ngrok.com/
ngrok http 3000

# Te dará una URL como: https://abc123.ngrok.io
```

Luego configura:
```
URL de Notificación:
https://abc123.ngrok.io/api/redsys/notification

URL OK:
https://abc123.ngrok.io/pago/exito

URL KO:
https://abc123.ngrok.io/pago/error
```

### Opciones de Configuración Importantes

En el panel de Redsys, verifica/configura:

- [ ] **Notificación online**: ACTIVADA
- [ ] **Tipo de sincronización**: ASÍNCRONA (recomendado)
- [ ] **URL de notificación**: La URL de tu API
- [ ] **URLs OK/KO**: Las URLs de tu aplicación
- [ ] **Enviar parámetros en URLs**: ACTIVADO (para recibir `Ds_Order` en redirección)
- [ ] **Dominios permitidos**: Añadir `www.ecoarealimonar.com` (o tu dominio)

---

## 📧 Email para Contactar con Soporte Redsys

### Datos de Contacto

**Email**: `soporte.comercios@redsys.es`  
**Teléfono**: `902 33 25 45`  
**Horario**: Lunes a Viernes, 9:00 - 18:00

### Plantilla de Email (Copiar y Adaptar)

```
Asunto: Solicitud de Ayuda - Error SIS0042 en Comercio 347036410

Estimado equipo de Redsys,

Soy [TU NOMBRE], del comercio [NOMBRE DE TU EMPRESA - Eco Area Limonar].

Estamos integrando vuestra pasarela de pago en nuestra plataforma web y nos encontramos 
con un problema que necesitamos resolver urgentemente.

INFORMACIÓN DEL COMERCIO:
- Código de Comercio (FUC): 347036410
- Terminal: 001
- Entorno: [PRUEBAS / PRODUCCIÓN - especificar]
- Dominio: https://www.ecoarealimonar.com

PROBLEMA ENCONTRADO:
Al intentar procesar un pago, recibimos el error SIS0042 ("Error en datos enviados").
Además, observamos errores 404 en los siguientes recursos:
- https://sis.redsys.es/sis/estilos/formulario/comercio/-1--ni.css
- https://sis.redsys.es/sis/comercios/img/logotipos/--logo.png
- https://sis.redsys.es/sis/javascript/unica/-1-ni.js

Esto sugiere que Redsys no reconoce correctamente nuestro código de comercio.

DATOS TÉCNICOS:
- Los parámetros que enviamos son correctos (amount, order, terminal, merchantCode)
- La firma HMAC-SHA256 se calcula correctamente con la clave secreta
- El formulario se genera y envía correctamente a vuestro servidor

PREGUNTAS:
1. ¿Está el comercio 347036410 dado de alta correctamente en vuestro sistema?
2. ¿Está el terminal 001 activo y configurado?
3. ¿Necesitamos autorizar las URLs de callback en algún lado?
4. ¿Hay alguna configuración pendiente en el panel de administración?
5. ¿Podéis proporcionarnos acceso al panel de Canales si no lo tenemos?

URLs QUE NECESITAMOS CONFIGURAR:
- URL de notificación: https://www.ecoarealimonar.com/api/redsys/notification
- URL OK: https://www.ecoarealimonar.com/pago/exito
- URL KO: https://www.ecoarealimonar.com/pago/error

INFORMACIÓN ADICIONAL:
- Método de integración: Redirección (POST a vuestro servidor)
- Versión de firma: HMAC-SHA256
- Tipo de transacción: Pago (autorización + captura)

¿Podrían ayudarnos a resolver este problema? Estamos disponibles para una llamada 
o videollamada si es necesario para agilizar la solución.

Gracias de antemano por su ayuda.

Saludos cordiales,
[TU NOMBRE]
[TU CARGO]
[NOMBRE DE LA EMPRESA]
[TELÉFONO DE CONTACTO]
[EMAIL DE CONTACTO]
```

---

## 🔍 Verificaciones que Debes Hacer

### 1. Verificar Variables de Entorno

En tu archivo `.env.local`, asegúrate de tener:

```env
# Redsys
REDSYS_MERCHANT_CODE=347036410
REDSYS_TERMINAL=001
REDSYS_SECRET_KEY=tu_clave_secreta_en_base64
REDSYS_ENVIRONMENT=production  # o "test" según corresponda

# URL pública
NEXT_PUBLIC_URL=https://www.ecoarealimonar.com
```

**Importante**: La `REDSYS_SECRET_KEY` debe ser:
- En formato Base64
- Sin espacios al inicio o al final
- La clave correcta proporcionada por tu banco

### 2. Verificar que el Endpoint de Notificación es Accesible

El endpoint `/api/redsys/notification` DEBE:
- ✅ Ser accesible públicamente (no estar detrás de autenticación)
- ✅ Responder 200 OK siempre (incluso si hay un error interno)
- ✅ Aceptar requests POST con Content-Type: application/x-www-form-urlencoded

**Puedes probarlo con curl**:

```bash
# Desde terminal (fuera de tu red local si es posible)
curl -X POST https://www.ecoarealimonar.com/api/redsys/notification \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Ds_SignatureVersion=HMAC_SHA256_V1&Ds_MerchantParameters=test&Ds_Signature=test"
```

Debería devolver algo como:
```json
{"success": false, "error": "Invalid signature"}
```

Si no obtienes respuesta, el endpoint no es accesible.

### 3. Usar la Herramienta de Firma Online de Redsys

Redsys proporciona una herramienta para validar firmas:

**URL**: https://pagosonline.redsys.es/firma-online-redsys.html

**Pasos**:
1. Accede a la herramienta
2. Introduce los mismos parámetros que usas en tu código:
   - Merchant Code: `347036410`
   - Terminal: `001`
   - Order Number: El que genera tu sistema (ej: `FC2601231234XXXX`)
   - Amount: En céntimos (ej: `9500` para 95€)
3. Introduce tu clave secreta
4. Compara la firma generada con la que genera tu código

Si las firmas coinciden → Tu código está bien  
Si no coinciden → Hay un problema en el algoritmo de firma

---

## 🧪 Testing con Tarjetas de Prueba

Una vez resuelto el problema de configuración, usa estas tarjetas para probar:

### Tarjeta de Pago EXITOSO
```
Número: 4548 8120 4940 0004
Caducidad: 12/30 (cualquier fecha futura)
CVV: 123
CIP/PIN: 123456 (si lo solicita)
```

### Tarjeta DENEGADA (sin fondos)
```
Número: 4548 8100 0000 0003
Caducidad: 12/30
CVV: 123
```

### Tarjeta CADUCADA
```
Número: 4548 8100 0000 0011
Caducidad: 12/20 (fecha pasada)
CVV: 123
```

---

## 📊 Información Técnica para Redsys

Si te preguntan detalles técnicos, estos son tus datos:

### Método de Integración
- **Tipo**: Redirección (POST a servidor Redsys)
- **Firma**: HMAC-SHA256 (Ds_SignatureVersion: "HMAC_SHA256_V1")
- **Codificación**: Base64 para parámetros
- **Formato de datos**: JSON codificado en Base64

### Parámetros que Envías
```json
{
  "DS_MERCHANT_AMOUNT": "9500",           // 95€ en céntimos
  "DS_MERCHANT_ORDER": "FC2601231234XXXX", // Número único de pedido
  "DS_MERCHANT_MERCHANTCODE": "347036410",
  "DS_MERCHANT_CURRENCY": "978",          // Euro
  "DS_MERCHANT_TRANSACTIONTYPE": "0",     // Autorización
  "DS_MERCHANT_TERMINAL": "001",
  "DS_MERCHANT_MERCHANTURL": "https://www.ecoarealimonar.com/api/redsys/notification",
  "DS_MERCHANT_URLOK": "https://www.ecoarealimonar.com/pago/exito",
  "DS_MERCHANT_URLKO": "https://www.ecoarealimonar.com/pago/error"
}
```

### Flujo de Pago
```
1. Usuario en tu web → Clic en "Pagar"
2. Tu backend genera parámetros + firma
3. Envías formulario POST a Redsys
4. Usuario completa pago en Redsys
5. Redsys envía notificación a tu URL
6. Tu backend valida firma y actualiza BD
7. Redsys redirige al usuario a URL OK/KO
```

---

## ✅ Checklist Final Antes de Contactar

Marca todo lo que hayas verificado:

### Datos del Comercio
- [ ] Tengo el FUC correcto
- [ ] Tengo el terminal correcto
- [ ] Tengo la clave secreta en Base64
- [ ] Sé si estoy en pruebas o producción

### Accesos
- [ ] Tengo acceso al panel de Canales (o sé cómo solicitarlo)
- [ ] Conozco las credenciales de mi cuenta bancaria/Redsys

### Configuración Técnica
- [ ] Mi endpoint `/api/redsys/notification` es accesible públicamente
- [ ] He probado con curl que responde
- [ ] Mis variables de entorno están correctamente configuradas
- [ ] He verificado la firma con la herramienta online de Redsys

### URLs
- [ ] He preparado las URLs de notificación y redirección
- [ ] Si uso localhost, tengo ngrok configurado
- [ ] Las URLs son HTTPS (no HTTP)

### Documentación
- [ ] He leído la documentación oficial de Redsys
- [ ] Entiendo el flujo de pago por redirección
- [ ] Conozco los códigos de respuesta de Redsys

---

## 🚨 Problemas Comunes y Soluciones

### "No tengo acceso al panel de Canales"
**Solución**: Solicítalo en el email a soporte. Es necesario para configurar URLs.

### "No sé si mi FUC está activo"
**Solución**: Pregunta directamente a soporte en el email. Ellos lo pueden verificar.

### "Las notificaciones no llegan"
**Causas posibles**:
1. URL no accesible públicamente → Verificar con curl desde otra red
2. URL no configurada en Redsys → Configurar en panel Canales
3. Endpoint devuelve error 500 → Revisar logs de tu servidor

### "Error SIS0042 persiste"
**Posibles causas**:
1. FUC no está dado de alta → Contactar soporte
2. Terminal incorrecto → Verificar con soporte
3. Clave secreta incorrecta → Obtener la correcta
4. Dominio no autorizado → Configurar en panel Canales

---

## 📚 Recursos Útiles

### Documentación Oficial de Redsys
- **Inicio**: https://pagosonline.redsys.es/desarrolladores-inicio.html
- **Redirección**: https://pagosonline.redsys.es/conexion-redireccion.html
- **Códigos de respuesta**: https://pagosonline.redsys.es/rm-codigos-de-respuesta.html
- **Herramienta de firma**: https://pagosonline.redsys.es/firma-online-redsys.html

### Documentación de tu Proyecto
- `REDSYS-CONFIGURACION.md` - Configuración completa de Redsys
- `METODOS-PAGO-RESUMEN.md` - Resumen del sistema dual de pagos
- `DESHABILITACION-TEMPORAL-REDSYS.md` - Estado actual de Redsys

### Alternativa Mientras Tanto
- `STRIPE-CONFIGURACION.md` - Configurar Stripe como alternativa
- `STRIPE-VERCEL-PRODUCCION.md` - Setup rápido en Vercel

---

## 🎯 Próximos Pasos Recomendados

1. **URGENTE - Recopilar información** (30 min)
   - Confirmar datos del comercio (FUC, terminal, clave)
   - Intentar acceder al panel de Canales
   - Verificar endpoint público

2. **Contactar con Redsys** (mismo día)
   - Enviar email a soporte (usa la plantilla de arriba)
   - Si es urgente, llamar al 902 33 25 45

3. **Mientras esperas respuesta** (1-2 horas)
   - Configurar Stripe como alternativa funcional
   - Leer: `STRIPE-VERCEL-PRODUCCION.md`
   - Así puedes seguir recibiendo pagos

4. **Cuando Redsys responda** (1-3 días)
   - Seguir sus instrucciones
   - Configurar URLs en panel Canales
   - Probar con tarjetas de test
   - Activar en producción

---

## 📞 Soporte Adicional

Si necesitas ayuda adicional:

**Redsys**:
- Email: soporte.comercios@redsys.es
- Teléfono: 902 33 25 45
- Horario: L-V 9:00-18:00

**Tu Banco** (quien te contrató Redsys):
- Contacta al gestor que te vendió el TPV virtual
- Ellos pueden ayudarte a verificar el estado de tu comercio

---

**Fecha**: 23 de Enero de 2026  
**Estado**: Redsys deshabilitado temporalmente, Stripe activo  
**Prioridad**: ALTA - Redsys tiene comisiones mucho más bajas (0.3% vs 1.5%)
