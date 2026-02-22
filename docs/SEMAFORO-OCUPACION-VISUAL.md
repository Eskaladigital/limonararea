# 🚦 Semáforo de Ocupación - Vista Previa Visual

## 📍 Ubicación en la Web

**URL**: https://www.ecoarealimonar.com/es/reservar

**Posición**: Justo debajo del widget de búsqueda, antes de "Puntos de recogida"

---

## 🎨 Diseño Visual

### Sección Completa

```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Disponibilidad por periodos                                 │
│  Consulta la ocupación de fechas clave                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ 📅 Semana   │  │ 📅 Puente   │  │ 📅 Julio    │            │
│  │    Santa    │  │    de Mayo  │  │             │            │
│  │             │  │             │  │             │            │
│  │ 29 Mar-5Abr │  │ 1-4 Mayo    │  │ 1-31 Jul    │            │
│  │             │  │             │  │             │            │
│  │ Ocupación   │  │ Ocupación   │  │ Ocupación   │            │
│  │ 50.0%       │  │ 10.4%       │  │ 2.2%        │            │
│  │ ████████░░  │  │ ██░░░░░░░░  │  │ █░░░░░░░░░  │            │
│  │             │  │             │  │             │            │
│  │ 🟡 Moderado │  │ 🟢 Disponib.│  │ 🟢 Disponib.│            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                  │
│  (... más periodos en grid responsive)                          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  🟢 Disponible (<50%)  🟡 Moderado (50-70%)                     │
│  🟠 Alta (70-90%)      🔴 Completo (>90%)                       │
│                                              12 vehículos dispon.│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Estados Visuales por Ocupación

### 🟢 Verde - Disponible (< 50%)

```
┌──────────────────────────┐
│ 📅 Julio                 │
│ 1-31 Jul                 │
│                          │
│ Ocupación                │
│ 25.0%      ●            │
│ ██████░░░░░░             │
│                          │
│ 🟢 Disponible            │
└──────────────────────────┘
Fondo: Verde claro (#f0fdf4)
Borde: Verde (#bbf7d0)
Sin animación
```

### 🟡 Amarillo - Moderado (50-70%)

```
┌──────────────────────────┐
│ 📅 Semana Santa          │
│ 29 Mar-5 Abr             │
│                          │
│ Ocupación                │
│ 65.0%      ●            │
│ ████████░░░              │
│                          │
│ 🟡 Ocupación moderada    │
└──────────────────────────┘
Fondo: Amarillo claro (#fefce8)
Borde: Amarillo (#fde047)
Sin animación
```

### 🟠 Naranja - Alta Demanda (70-90%)

```
┌──────────────────────────┐
│ 📅 Agosto                │
│ 1-31 Ago                 │
│                   ◉◉     │← Pulso animado
│ Ocupación                │
│ 85.0%                    │
│ ███████████░             │
│                          │
│ 🟠 Alta demanda          │
│ ⏰ Últimas plazas dispon.│
└──────────────────────────┘
Fondo: Naranja claro (#fff7ed)
Borde: Naranja (#fdba74)
CON animación de pulso
Mensaje extra: "Últimas plazas"
```

### 🔴 Rojo - Completo (> 90%)

```
┌──────────────────────────┐
│ 📅 Puente Pilar          │
│ 10-13 Oct                │
│                   ◉◉     │← Pulso animado
│ Ocupación                │
│ 95.0%                    │
│ ████████████             │
│                          │
│ 🔴 Completo              │
│ ⚠️ Reserva con antelac.  │
└──────────────────────────┘
Fondo: Rojo claro (#fef2f2)
Borde: Rojo (#fca5a5)
CON animación de pulso
Mensaje extra: "Reserva con antelación"
```

---

## 📱 Responsive Design

### Mobile (< 768px)
```
┌──────────────────┐
│ Periodo 1        │
│ (ancho completo) │
└──────────────────┘

┌──────────────────┐
│ Periodo 2        │
│ (ancho completo) │
└──────────────────┘

┌──────────────────┐
│ Periodo 3        │
│ (ancho completo) │
└──────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────────┐ ┌──────────────┐
│ Periodo 1    │ │ Periodo 2    │
└──────────────┘ └──────────────┘

┌──────────────┐ ┌──────────────┐
│ Periodo 3    │ │ Periodo 4    │
└──────────────┘ └──────────────┘
```

### Desktop (> 1024px)
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Periodo 1│ │ Periodo 2│ │ Periodo 3│
└──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐
│ Periodo 4│ │ Periodo 5│
└──────────┘ └──────────┘
```

---

## 🎬 Animaciones

### Skeleton Loader (Durante carga)
```
┌──────────────────────────┐
│ ▓▓▓▓▓▓░░░░░░░░░          │
│                          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░         │
│ ▓▓▓▓▓░░░░░░░░            │
└──────────────────────────┘
Aparece durante 1-2 segundos
mientras carga el API
```

### Pulso en Alta Demanda
```
Punto indicador: ● → ◉ → ● → ◉
Escala: 1.0 → 1.2 → 1.0
Duración: 2 segundos loop
Solo en periodos 🟠 y 🔴
```

---

## 💬 Textos Dinámicos

### Header
- **Español**: "Disponibilidad por periodos"
- **Inglés**: "Availability by periods"
- **Francés**: "Disponibilité par périodes"
- **Alemán**: "Verfügbarkeit nach Zeiträumen"

### Estados
- 🟢 **Disponible** / Available / Disponible / Verfügbar
- 🟡 **Ocupación moderada** / Moderate occupancy / Occupation modérée / Mäßige Auslastung
- 🟠 **Alta demanda** / High demand / Forte demande / Hohe Nachfrage
- 🔴 **Completo** / Full / Complet / Voll

### Mensajes de Urgencia
- 🔴 "⚠️ Reserva con antelación" / "Book in advance"
- 🟠 "⏰ Últimas plazas disponibles" / "Last spots available"

---

## 🔄 Actualización de Datos

- **Cache**: 1 hora (CDN)
- **Actualización**: Automática cada hora
- **Fuente de datos**: Reservas confirmadas/activas/completadas en Supabase
- **Cálculo**: Tiempo real basado en ocupación actual

---

## ✅ Checklist Visual

- [x] Colores coherentes con brand (azul/naranja Eco Area Limonar)
- [x] Iconos claros (emojis universales 🟢🟡🟠🔴)
- [x] Responsive perfecto (mobile-first)
- [x] Animaciones sutiles (no invasivas)
- [x] Accesibilidad (contraste WCAG AA)
- [x] Loading states elegantes
- [x] Error handling silencioso (no rompe página)
- [x] Touch-friendly (botones grandes mobile)

---

**Vista previa creada**: 9 febrero 2026  
**Puede verse en**: http://localhost:3000/es/reservar (dev) o https://www.ecoarealimonar.com/es/reservar (prod)
