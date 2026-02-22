# Sistema de Diseño Eco Area Limonar

## Filosofía de diseño
**Moderno, elegante, disruptivo pero funcional**

Eco Area Limonar se destaca por un diseño que combina:
- ✨ Modernidad visual
- 🎯 Elegancia profesional
- 🚀 Innovación disruptiva
- 💼 Funcionalidad clara

---

## Paleta de Colores

### Colores Primarios

#### Azul Corporativo (Principal)
- **DEFAULT**: `#063971` - Azul corporativo oficial
- **Dark**: `#042A54` - Para hover states y énfasis
- **Light**: `#094F9A` - Para backgrounds sutiles
- **Uso**: Botones principales, headers, enlaces, elementos de marca

#### Naranja/Coral (Acción)
- **DEFAULT**: `#FF6B35` - Color de acción
- **Dark**: `#E55A2B` - Para hover
- **Uso**: CTAs principales, botón "Reservar", elementos destacados

### Colores Secundarios

#### Grises Elegantes
- **50-100**: Backgrounds sutiles
- **200-400**: Bordes y separadores
- **500-700**: Texto secundario
- **800-900**: Texto principal

---

## Tipografía

### Fuentes
- **Títulos**: Rubik (weights: 500, 600, 700, 800)
  - `font-heading` o `font-rubik`
- **Cuerpo**: Amiko (weights: 400, 600, 700)
  - `font-sans` o `font-amiko`

### Jerarquía de Títulos
```
h1: text-4xl md:text-5xl lg:text-6xl font-heading font-bold
h2: text-3xl md:text-4xl font-heading font-bold
h3: text-2xl md:text-3xl font-heading font-semibold
h4: text-xl font-heading font-semibold
```

### Texto
```
Body Large: text-lg
Body: text-base
Small: text-sm
Tiny: text-xs
```

---

## Espaciado

### Sistema de Spacing (múltiplos de 4px)
- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)
- **2XL**: 4rem (64px)
- **3XL**: 6rem (96px)

### Contenedores
```
container mx-auto px-4 md:px-6 lg:px-8
max-w-7xl mx-auto (para contenido principal)
max-w-4xl mx-auto (para contenido de lectura)
```

---

## Componentes

### Botones

#### Primario (Azul)
```tsx
className="bg-limonar-blue hover:bg-limonar-blue-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
```

#### Secundario (Naranja - CTA)
```tsx
className="bg-limonar-orange hover:bg-limonar-orange-dark text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
```

#### Outlined
```tsx
className="border-2 border-limonar-blue text-limonar-blue hover:bg-limonar-blue hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
```

#### Acción de texto (Admin / acciones secundarias)
```tsx
// Botón sutil para copiar, exportar, etc. Ej: "Copiar detalles de la reserva"
className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-limonar-blue hover:bg-blue-50 rounded-lg transition-colors"
```

### Cards

#### Estándar
```tsx
className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
```

#### Con borde de acento
```tsx
className="bg-white rounded-2xl border-t-4 border-limonar-blue shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
```

### Hero Sections

#### Estilo Moderno con Gradiente
```tsx
className="relative min-h-[70vh] bg-gradient-to-br from-limonar-blue via-limonar-blue-dark to-gray-900"
```

#### Con Overlay
```tsx
// Background con imagen
<div className="absolute inset-0">
  <Image src="..." fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
</div>
```

---

## Secciones

### Alternancia de Backgrounds
- Secciones impares: `bg-white`
- Secciones pares: `bg-gray-50`
- Secciones destacadas: `bg-gradient-to-br from-gray-50 to-blue-50`

### Padding Vertical
- Secciones estándar: `py-16`
- Secciones pequeñas: `py-12`
- Secciones grandes: `py-20` o `py-24`

---

## Iconos

### Librería
Lucide React

### Tamaños
- Small: `h-4 w-4`
- Medium: `h-6 w-6`
- Large: `h-8 w-8`
- XL: `h-12 w-12`
- Hero: `h-16 w-16`

### Colores
- Primario: `text-limonar-blue`
- Acento: `text-limonar-orange`
- Success: `text-green-500`
- Warning: `text-yellow-500`
- Error: `text-red-500`

---

## Imágenes

### Logos
- Principal color: `/images/brand/LOGO NEGRO_vf.png`
- Blanco: `/images/brand/LOGO BLANCO.png`
- Favicon: `/images/brand/favicon.png`

### Optimización
- Formato preferido: WebP
- Calidad: 85%
- Usar Next.js Image con lazy loading

---

## Animaciones y Transiciones

### Transiciones Estándar
```
transition-all duration-200
transition-colors duration-200
transition-shadow duration-300
transition-transform duration-200
```

### Hover Effects
- Botones: `hover:shadow-lg transform hover:scale-105`
- Cards: `hover:shadow-xl`
- Enlaces: `hover:text-limonar-orange transition-colors`

---

## Responsive Design

### Breakpoints
- SM: 640px
- MD: 768px
- LG: 1024px
- XL: 1280px
- 2XL: 1536px

### Mobile First
Siempre diseñar mobile-first y usar modificadores responsive:
```tsx
className="text-base md:text-lg lg:text-xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Accesibilidad

### Contraste
- Texto principal sobre blanco: Mínimo AA (4.5:1)
- Texto grande: Mínimo AA (3:1)
- Azul sobre blanco: ✅ Pasa AA
- Naranja sobre blanco: ✅ Pasa AA

### Focus States
```tsx
focus:ring-2 focus:ring-limonar-blue focus:ring-offset-2
```

---

## Ejemplos de Uso

### Hero Section Completo
```tsx
<section className="relative min-h-[80vh] bg-gradient-to-br from-limonar-blue via-limonar-blue-dark to-gray-900 overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    {/* Pattern SVG */}
  </div>
  
  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 py-20">
    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
      Título Principal
    </h1>
    <p className="text-xl text-white/90 max-w-2xl mb-8">
      Subtítulo descriptivo
    </p>
    <button className="bg-limonar-orange hover:bg-limonar-orange-dark text-white font-bold py-4 px-10 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
      Call to Action
    </button>
  </div>
</section>
```

### Card de Servicio
```tsx
<div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-limonar-blue">
  <div className="w-16 h-16 bg-limonar-blue/10 rounded-full flex items-center justify-center mb-6">
    <Icon className="h-8 w-8 text-limonar-blue" />
  </div>
  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
    Título del Servicio
  </h3>
  <p className="text-gray-600 leading-relaxed">
    Descripción del servicio
  </p>
</div>
```

---

## Checklist de Revisión

Para cada página, verificar:

- [ ] Colores de marca correctos (azul #063971, naranja #FF6B35)
- [ ] Tipografía consistente (Rubik para títulos, Amiko para cuerpo)
- [ ] Espaciado uniforme (múltiplos de 4px)
- [ ] Botones con estilos estándar
- [ ] Cards con bordes redondeados (rounded-2xl)
- [ ] Transiciones suaves en interacciones
- [ ] Responsive en todos los breakpoints
- [ ] Imágenes optimizadas (WebP)
- [ ] Gradientes sutiles en heroes
- [ ] Contraste de texto adecuado
- [ ] Focus states para accesibilidad


