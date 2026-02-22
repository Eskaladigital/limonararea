# Estrategia de Diseño Responsive - Eco Area Limonar

## 🎯 Filosofía: Mobile+Tablet vs Desktop

Este proyecto implementa una estrategia responsive optimizada donde:

- **Mobile + Tablet (hasta 1023px)**: Diseño apilado, táctil y vertical
- **Desktop (1024px+)**: Diseño horizontal, compacto y con mouse/teclado

## 📐 Breakpoints Principales

```css
/* Mobile pequeño: por defecto */
/* Mobile grande: 640px (sm) */
/* Tablet: 768px (md) */
/* DESKTOP: 1024px (lg) ← Breakpoint principal */
/* Desktop XL: 1280px (xl) */
/* Desktop 2XL: 1536px (2xl) */
```

## ✨ Cambios Implementados

### 1. Configuración Global

#### `tailwind.config.ts`
- ✅ Definición clara de breakpoints con comentarios
- ✅ Container responsive con padding adaptativo
- ✅ Estrategia documentada en el archivo

#### `globals.css`
- ✅ Clases utilitarias responsive:
  - `.grid-responsive-2`, `.grid-responsive-3`, `.grid-responsive-4`
  - `.text-responsive-xl`, `.text-responsive-lg`, `.text-responsive-md`
  - `.hidden-mobile`, `.hidden-desktop`
  - `.touch-target` para áreas táctiles en mobile/tablet
- ✅ Sección de padding adaptativo (`.section-padding`)
- ✅ Elementos táctiles más grandes en mobile/tablet (min 44x44px)
- ✅ Hover effects solo en desktop

### 2. Componentes del Front-end

#### Header (`src/components/layout/header.tsx`)
- ✅ Top bar optimizado con contacto visible según dispositivo
- ✅ Logo más pequeño en mobile/tablet (h-10 vs h-12)
- ✅ Botones táctiles más grandes (py-4 vs py-3)
- ✅ Menú móvil con scroll y touch targets
- ✅ Banderas de idioma en mobile, texto completo en desktop
- ✅ Max-height en menú móvil para evitar desbordamiento

#### SearchWidget (`src/components/booking/search-widget.tsx`)
- ✅ Grid de horas: apilado en mobile/tablet, horizontal en desktop
- ✅ Padding responsive (p-6 lg:p-8)
- ✅ Labels más grandes en desktop
- ✅ Botón de búsqueda con touch-target
- ✅ Texto de validación responsive

#### HomePage (`src/app/page.tsx`)
- ✅ Hero section con altura adaptativa (70vh vs 90vh)
- ✅ Títulos responsive en todas las secciones
- ✅ Grids adaptativos:
  - Modelos: 1 columna → 3 columnas
  - Precios: 1 columna → 3 columnas
  - Extras: 1 columna → 2 columnas
  - Digitalización: 1 columna → 3 columnas
  - Recursos: 1 columna → 3 columnas
  - Destinos: 2 columnas → 6 columnas
  - Blog: 1 columna → 3 columnas
- ✅ Iconos más pequeños en mobile/tablet
- ✅ Padding y spacing adaptativos
- ✅ Line-clamp en textos largos para mobile

### 3. Panel de Administración

#### AdminSidebar (`src/components/admin/sidebar.tsx`)
- ✅ Breakpoint consistente en 1024px (lg)
- ✅ Touch targets para todos los botones
- ✅ Overlay mejorado para mobile/tablet
- ✅ Scroll optimizado en navegación
- ✅ Botón cerrar con touch-target

#### AdminHeader (`src/components/admin/header.tsx`)
- ✅ Botón hamburguesa con touch-target
- ✅ Texto "Ver web" oculto en mobile/tablet
- ✅ Info de usuario compacta en mobile/tablet
- ✅ ChevronDown solo visible en desktop
- ✅ Padding responsive (py-3 lg:py-4)
- ✅ Notificaciones con max-width responsivo

## 🎨 Principios de Diseño

### Mobile + Tablet (≤1023px)
1. **Diseño vertical**: Todo apilado en una columna
2. **Touch-first**: Áreas táctiles mínimas de 44x44px
3. **Contenido prioritario**: Lo esencial primero
4. **Menús colapsables**: Navegación en hamburger
5. **Imágenes adaptadas**: Más pequeñas pero optimizadas
6. **Texto legible**: Tamaños mínimos de 14-16px
7. **Sin hover**: Solo estados activos/focus

### Desktop (≥1024px)
1. **Diseño horizontal**: Aprovecha el espacio lateral
2. **Múltiples columnas**: 2, 3, 4 o 6 columnas según sección
3. **Navegación visible**: Menús completos siempre visibles
4. **Hover effects**: Transiciones y efectos al pasar el mouse
5. **Contenido denso**: Más información simultánea
6. **Elementos compactos**: Menos padding, más eficiencia

## 📱 Dispositivos de Referencia

### Mobile + Tablet
- iPhone SE: 375px
- iPhone 12/13: 390px
- iPhone 14 Pro Max: 430px
- iPad Mini: 768px
- iPad: 810px
- iPad Pro: 1024px (límite)

### Desktop
- MacBook Air: 1280px
- MacBook Pro 14": 1512px
- Desktop 1080p: 1920px
- Desktop 4K: 3840px

## 🔧 Uso en el Código

### Ejemplos de Clases Tailwind

```tsx
// Grid responsive
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// Texto responsive
<h1 className="text-2xl lg:text-5xl">

// Padding responsive
<div className="p-6 lg:p-8">

// Ocultar/Mostrar
<span className="hidden lg:inline">Desktop only</span>
<span className="lg:hidden">Mobile/Tablet only</span>

// Touch targets
<button className="py-4 px-6 touch-target">

// Spacing
<section className="py-16 lg:py-24">
```

### Clases Personalizadas

```tsx
// En globals.css
.grid-responsive-3 // 1 col → 3 cols
.text-responsive-xl // 2xl → 4xl
.section-padding // py-12 → py-24
.touch-target // min 44x44px en mobile
```

## ✅ Checklist de Implementación

- [x] Actualizar tailwind.config.ts con breakpoints claros
- [x] Crear clases utilitarias en globals.css
- [x] Optimizar Header front-end
- [x] Optimizar SearchWidget
- [x] Optimizar HomePage completa
- [x] Optimizar AdminSidebar
- [x] Optimizar AdminHeader
- [x] Documentar estrategia

## 🚀 Próximos Pasos (Opcional)

1. Revisar páginas secundarias (vehículos, tarifas, blog, etc.)
2. Optimizar formularios largos (reservas, checkout)
3. Implementar lazy loading de imágenes
4. Optimizar performance en mobile
5. Testing en dispositivos reales
6. Ajustes finos según feedback

## 📖 Recursos

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Touch Target Sizes](https://web.dev/accessible-tap-targets/)
- [Mobile-First CSS](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)

---

**Fecha de implementación**: Enero 2026
**Versión**: 1.0
**Mantenedor**: Equipo Eco Area Limonar
