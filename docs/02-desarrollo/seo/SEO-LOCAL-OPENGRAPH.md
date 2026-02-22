# 🌍 SEO LOCAL Y OPEN GRAPH - ECO AREA LIMONAR

## 📍 ESTRATEGIA: UN SOLO SITIO, UNA UBICACIÓN

**Eco Area Limonar** es un **área de autocaravanas** con **una única ubicación física**: Los Nietos, Cartagena, Mar Menor (Murcia).

- ✅ **No hay múltiples landing pages por ciudad** (a diferencia de negocios de alquiler con varias sedes)
- ✅ **Schema correcto**: `Campground` con dirección real única
- ✅ **Keywords**: área autocaravanas Mar Menor, parcelas Los Nietos, camping Cartagena

---

## ✅ SCHEMA.ORG PARA ÁREA DE AUTOCARAVANAS

```json
{
  "@context": "https://schema.org",
  "@type": "Campground",
  "name": "Eco Area Limonar",
  "description": "Área de autocaravanas en Los Nietos, Cartagena. Parcelas con electricidad y servicios en el Mar Menor.",
  "image": "https://ecoarealimonar.com/images/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Los Nietos",
    "addressLocality": "Cartagena",
    "addressRegion": "Murcia",
    "postalCode": "30389",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.65,
    "longitude": -0.85
  },
  "telephone": "+34XXXXXXXXX",
  "url": "https://ecoarealimonar.com",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Electricidad" },
    { "@type": "LocationFeatureSpecification", "name": "Servicios" }
  ]
}
```

**Importante**: Una sola dirección real. No usar `areaServed` para otras ciudades (eso era para negocios de alquiler con entrega en múltiples sitios).

---

## 🎨 OPEN GRAPH - UN SITIO, MÚLTIPLES PÁGINAS

### Home

```typescript
openGraph: {
  title: "Eco Area Limonar | Área de Autocaravanas Mar Menor",
  description: "Parcelas para autocaravanas en Los Nietos, Cartagena. Electricidad y servicios. Reserva tu parcela en el Mar Menor.",
  type: "website",
  url: "https://www.ecoarealimonar.com/es",
  siteName: "Eco Area Limonar - Área de Autocaravanas",
  images: [{
    url: "https://www.ecoarealimonar.com/images/og-home.webp",
    width: 1200,
    height: 630,
    alt: "Eco Area Limonar - Área de autocaravanas Mar Menor",
    type: "image/webp",
  }],
  locale: "es_ES",
  countryName: "España",
},
```

### Páginas de parcela

```typescript
openGraph: {
  title: `${parcel.name} - Parcelas Autocaravanas | Eco Area Limonar`,
  description: `Parcela ${parcel.name} en Los Nietos, Mar Menor. ${parcel.length_m}m x ${parcel.width_m}m. Reserva tu estancia.`,
  url: `https://www.ecoarealimonar.com/es/parcelas/${parcel.slug}`,
  images: [parcel.hero_image || defaultOgImage],
  // ...
},
```

### Páginas estáticas (tarifas, reservar, FAQs)

```typescript
openGraph: {
  title: "Tarifas | Eco Area Limonar - Área Autocaravanas Mar Menor",
  description: "Precios y temporadas para parcelas de autocaravanas en Los Nietos. Descuentos por estancias largas.",
  url: "https://www.ecoarealimonar.com/es/tarifas",
  // ...
},
```

---

## 🎯 DIFERENCIA CON ENFOQUE MULTI-UBICACIÓN

| Aspecto | Multi-ubicación (ej. alquiler campers) | Eco Area (un solo sitio) |
|---------|----------------------------------------|---------------------------|
| Landing pages | Una por ciudad (Alicante, Valencia...) | No aplica |
| areaServed | Sí, para indicar cobertura | No necesario |
| Schema | LocalBusiness + areaServed | Campground, una dirección |
| Open Graph | Título dinámico por ciudad | Título por tipo de página (home, parcela, tarifas) |
| Keywords | "alquiler camper {ciudad}" | "área autocaravanas Mar Menor", "parcelas Los Nietos" |

---

## ✅ CHECKLIST OPEN GRAPH

- [ ] Imágenes 1200×630px mínimo
- [ ] Formato webp para rendimiento
- [ ] Alt text descriptivo
- [ ] URLs canónicas con `www` y prefijo `/es/`
- [ ] Títulos < 60 caracteres
- [ ] Descripciones 150-200 caracteres
- [ ] locale y countryName en OG

---

## 🔍 HERRAMIENTAS DE VERIFICACIÓN

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Open Graph Check**: https://www.opengraph.xyz/

---

**Última actualización**: Febrero 2026  
**Modelo**: Un solo sitio, Los Nietos / Mar Menor
