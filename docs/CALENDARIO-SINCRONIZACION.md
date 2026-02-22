# 📅 Sincronización de Calendario con Móviles

## ✨ ¿Qué es esto?

Sistema de suscripción a calendario iCalendar (.ics) que permite a los administradores de Eco Area Limonar recibir automáticamente las entregas y recogidas de vehículos en sus calendarios nativos (iPhone, Android, Outlook, etc.).

**Funciona exactamente como Notion Calendar**: sincronización automática en segundo plano sin necesidad de interacción manual.

## 🎯 Características

- ✅ **Sincronización automática** cada pocas horas
- ✅ **Compatible** con iOS, Android, Outlook, Google Calendar
- ✅ **Eventos de entregas** (🟢) y **recogidas** (🔴)
- ✅ **Información completa**: cliente, vehículo, ubicación, hora
- ✅ **Notificaciones** del sistema operativo
- ✅ **Aparece en pantalla de inicio** del móvil
- ✅ **Token compartido** para todo el equipo
- ✅ **Configuración de una sola vez**

## 🏗️ Arquitectura

### Componentes Creados

```
src/lib/calendar/
  └── ics-generator.ts         # Generador de archivos iCalendar

src/app/api/calendar/entregas/
  └── route.ts                 # Endpoint de suscripción

src/app/administrator/(protected)/calendario/
  └── page.tsx                 # Botón de suscripción añadido

docs/
  └── CALENDARIO-SINCRONIZACION.md  # Esta documentación
```

### Flujo de Datos

```
┌─────────────────────────────────────────┐
│  1. Usuario en /administrator/calendario│
│     Click en "Sincronizar Calendario"   │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  2. Modal muestra URL de suscripción    │
│     + Instrucciones paso a paso         │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  3. Usuario copia URL y la añade        │
│     a su calendario nativo (una vez)    │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  4. Sistema Operativo sincroniza        │
│     automáticamente cada X horas        │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  GET /api/calendar/entregas?token=XXX   │
│  - Valida token de autenticación        │
│  - Carga reservas próximos 6 meses      │
│  - Genera archivo .ics dinámico         │
│  - Devuelve con headers correctos       │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  5. Calendario nativo se actualiza      │
│     Eventos aparecen automáticamente    │
└─────────────────────────────────────────┘
```

## 🔐 Seguridad

### Token de Autenticación

El endpoint está protegido con un token compartido configurado en variables de entorno:

```bash
# .env
CALENDAR_SUBSCRIPTION_TOKEN=tu_token_secreto_aqui
NEXT_PUBLIC_CALENDAR_TOKEN=tu_token_secreto_aqui
```

**Recomendaciones de seguridad:**

1. **Cambiar el token por defecto** (`limonar2026`) por uno seguro
2. Usar un generador de contraseñas seguras
3. No compartir el token fuera del equipo de Eco Area Limonar
4. Si un empleado deja la empresa, cambiar el token

### Generador de Token Seguro

```bash
# En terminal, genera un token aleatorio seguro:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📱 Guía de Uso para Administradores

### Configuración Inicial (Una Sola Vez)

#### iPhone / iPad

1. Accede a `/administrator/calendario`
2. Click en **"Sincronizar con mi Calendario"**
3. Click en el botón de **copiar** junto a la URL
4. Abre la app **Calendario** nativa de iOS
5. Toca **"Calendarios"** (abajo en el centro)
6. Toca **"Añadir calendario"** → **"Añadir suscripción"**
7. Pega la URL copiada
8. Dale un nombre descriptivo: **"Eco Area Limonar - Entregas"**
9. Elige un color (recomendado: naranja 🟠)
10. ¡Listo! Ya recibirás eventos automáticamente

#### Android / Google Calendar

1. Accede a `/administrator/calendario`
2. Click en **"Sincronizar con mi Calendario"**
3. Click en el botón de **copiar** junto a la URL
4. Abre **Google Calendar** en el **navegador** (no en la app)
5. En el menú lateral izquierdo, busca **"Otros calendarios"**
6. Haz click en el **+** (más)
7. Selecciona **"Desde URL"**
8. Pega la URL copiada
9. Haz click en **"Añadir calendario"**
10. ¡Listo! Sincronizará automáticamente con tu móvil Android

#### Outlook / Microsoft

1. Accede a `/administrator/calendario`
2. Click en **"Sincronizar con mi Calendario"**
3. Click en el botón de **copiar** junto a la URL
4. Abre **Outlook.com** en el navegador
5. Haz click en **"Agregar calendario"**
6. Selecciona **"Suscribirse desde la web"**
7. Pega la URL copiada
8. Dale un nombre y elige el color
9. ¡Listo! Se sincronizará automáticamente

### ¿Qué Verás en Tu Calendario?

Cada reserva genera **2 eventos**:

#### 🟢 Evento de ENTREGA (Pickup)
```
Título: 🟢 ENTREGA - FU0018 (Juan Pérez)
Hora: 10:00 - 10:30
Ubicación: Eco Area Limonar Murcia
Descripción:
  Entrega de vehículo
  
  Vehículo: California Ocean
  Cliente: Juan Pérez
  Teléfono: 666 123 456
  Reserva: FU0018
  Ubicación: Eco Area Limonar Murcia
  C/ Ejemplo 123
```

#### 🔴 Evento de DEVOLUCIÓN (Dropoff)
```
Título: 🔴 DEVOLUCIÓN - FU0018 (Juan Pérez)
Hora: 18:00 - 18:30
Ubicación: Eco Area Limonar Murcia
Descripción:
  Devolución de vehículo
  
  Vehículo: California Ocean
  Cliente: Juan Pérez
  Teléfono: 666 123 456
  Reserva: FU0018
  Ubicación: Eco Area Limonar Murcia
  C/ Ejemplo 123
```

### Frecuencia de Sincronización

- **iOS**: Cada 1-2 horas aproximadamente
- **Android**: Cada 2-4 horas aproximadamente
- **Outlook**: Cada 3-4 horas aproximadamente

**Nota**: La frecuencia exacta depende del sistema operativo y no se puede controlar desde Eco Area Limonar.

## 🛠️ Configuración Técnica

### Variables de Entorno

Añadir a `.env` y `.env.local`:

```bash
# Token para suscripción de calendario
# Cambiar por un token seguro en producción
CALENDAR_SUBSCRIPTION_TOKEN=tu_token_secreto_aqui
NEXT_PUBLIC_CALENDAR_TOKEN=tu_token_secreto_aqui
```

### Endpoint API

```
GET /api/calendar/entregas?token=tu_token_secreto_aqui
```

**Parámetros:**
- `token` (requerido): Token de autenticación

**Respuesta:**
- Content-Type: `text/calendar; charset=utf-8`
- Formato: iCalendar (.ics)
- Incluye eventos de los próximos 6 meses

### Formato iCalendar

El endpoint genera un archivo `.ics` estándar compatible con:
- Apple Calendar (iOS, macOS)
- Google Calendar
- Microsoft Outlook
- Mozilla Thunderbird
- Cualquier cliente que soporte RFC 5545

## 🔧 Mantenimiento

### Cambiar el Token

Si necesitas cambiar el token (por seguridad o rotación):

1. Actualiza las variables de entorno en Vercel/tu hosting
2. Reinicia la aplicación
3. **Importante**: Todos los usuarios deberán:
   - Eliminar la suscripción antigua de su calendario
   - Añadir la nueva suscripción con el nuevo token

### Verificar Funcionamiento

Para verificar que el endpoint funciona:

1. Copia la URL de suscripción
2. Ábrela en un navegador
3. Deberías ver contenido de texto plano comenzando con:
   ```
   BEGIN:VCALENDAR
   VERSION:2.0
   ...
   ```

Si ves "Unauthorized - Token inválido", verifica las variables de entorno.

### Monitoreo

El endpoint registra logs en la consola:

```
[Calendar API] Error fetching bookings: ...
[Calendar API] Error: ...
```

Monitorear estos logs en Vercel Logs o tu plataforma de hosting.

## ❓ FAQ

### ¿Por qué no aparecen los eventos inmediatamente?

Los calendarios nativos sincronizan cada pocas horas. Para forzar una actualización manual:
- **iOS**: Cierra y abre la app Calendario
- **Android**: Abre Google Calendar en el navegador y recarga
- **Outlook**: Ve a Configuración → Calendarios → Actualizar

### ¿Puedo personalizar las notificaciones?

Sí, en tu calendario nativo:
- **iOS**: Calendario → Calendarios → (i) junto a "Eco Area Limonar" → Alertas
- **Android**: Google Calendar → Configuración → Notificaciones
- **Outlook**: Configuración → Notificaciones de calendario

### ¿Los eventos se pueden editar?

No, son de solo lectura. Cualquier cambio debe hacerse en Eco Area Limonar y se sincronizará automáticamente.

### ¿Qué pasa si elimino un evento del calendario?

Volverá a aparecer en la próxima sincronización. Para eliminarlo permanentemente, cancela la reserva en Eco Area Limonar.

### ¿Puedo compartir esta URL con clientes?

**NO**. Esta URL contiene información privada de todos los clientes. Solo para uso interno del equipo de Eco Area Limonar.

## 📊 Alcance

### Eventos Incluidos

- ✅ Reservas confirmadas
- ✅ Reservas pendientes
- ✅ Reservas en curso
- ❌ Reservas canceladas (no se muestran)
- ❌ Reservas completadas de hace más de 1 semana

### Período Temporal

- **Hacia atrás**: 7 días (para ver entregas recientes)
- **Hacia adelante**: 6 meses
- **Total**: ~180 días de eventos visibles

## 🚀 Mejoras Futuras (Opcionales)

1. **Tokens personales por usuario**
   - Cada admin tiene su propia URL
   - Permite revocar acceso individual
   - Requiere tabla `calendar_tokens` en BD

2. **Filtros personalizables**
   - Solo entregas en Murcia
   - Solo un vehículo específico
   - Solo tus propias reservas asignadas

3. **Colores por tipo de evento**
   - Verde para entregas
   - Rojo para recogidas
   - Amarillo para eventos pendientes

4. **Recordatorios personalizados**
   - Alertas 1 hora antes
   - Alertas el día anterior
   - Configurables por usuario

## 📞 Soporte

Si tienes problemas con la sincronización:

1. Verifica que la URL esté correcta
2. Verifica que el token sea correcto
3. Prueba abrir la URL en un navegador
4. Consulta los logs del servidor
5. Contacta al equipo técnico

---

**Última actualización**: Enero 2026  
**Versión**: 1.0.0  
**Autor**: Sistema Eco Area Limonar
