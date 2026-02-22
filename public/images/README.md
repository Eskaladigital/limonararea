# Imágenes - Eco Area Limonar

## Slides / Hero Section

Las imágenes en `/public/images/slides/` están optimizadas en formato WebP para mejor rendimiento.

### Imágenes disponibles:

- `limonar_area_camper_mar_menor_*.webp`: Imágenes del área y Mar Menor
- `AdobeStock_*.webp`: Imágenes de stock para galería y secciones

### Especificaciones:

- **Formato**: WebP
- **Calidad**: 85%
- **Reducción de tamaño**: 38-58% vs. JPEG original
- **Uso**: Hero slider en la página de inicio

### Conversión de nuevas imágenes:

Si necesitas añadir más imágenes, sigue estos pasos:

1. Coloca las imágenes JPG originales en `images/slides web/`
2. Cópialas a `public/images/slides/` con nombres descriptivos
3. Convierte a WebP usando sharp:

```javascript
const sharp = require('sharp');

sharp('input.jpg')
  .webp({ quality: 85 })
  .toFile('output.webp');
```

### Uso en el código:

```tsx
import { HeroSlider } from "@/components/hero-slider";

const images = [
  "/images/slides/hero-01.webp",
  "/images/slides/hero-02.webp",
  // ...
];

<HeroSlider images={images} autoPlayInterval={5000} />
```

## Imágenes de parcelas

Las imágenes de parcelas se gestionan desde Supabase Storage (contenido dinámico). Las imágenes estáticas de la home están en `/public/images/slides/`.

## Imágenes de stock

Las imágenes de la galería "Imagina tus próximas vacaciones" usan archivos en `slides/`. Verificar que existan antes de referenciarlas (ej. `limonar_area_camper_mar_menor_3.webp` sustituye a `AdobeStock_132830655.webp` si falta).

---

**Nota**: Todas las imágenes públicas deben optimizarse a WebP antes de subir a producción para mejorar el tiempo de carga.






