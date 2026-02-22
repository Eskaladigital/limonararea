=================================================================
CONFIGURACIÓN DE REDIRECCIÓN VERCEL → DOMINIO PERSONALIZADO
Fecha: 20 de enero de 2026
=================================================================

## ✅ CAMBIO REALIZADO

Se ha configurado una redirección permanente (308) desde la URL de Vercel
hacia el dominio personalizado.

### Archivo modificado:
`next.config.js`

### Redirección configurada:
```
weblimonar.vercel.app/* → https://www.ecoarealimonar.com/*
```

## 🎯 ¿Qué hace esta configuración?

Cuando alguien visite cualquier URL de `weblimonar.vercel.app`, será
automáticamente redirigido a `www.ecoarealimonar.com` manteniendo la ruta.

### Ejemplos:
- `weblimonar.vercel.app/` → `https://www.ecoarealimonar.com/`
- `weblimonar.vercel.app/es` → `https://www.ecoarealimonar.com/es`
- `weblimonar.vercel.app/blog/articulo` → `https://www.ecoarealimonar.com/blog/articulo`

## 🔍 Beneficios SEO

### 1. Evita contenido duplicado
Google ya no verá el mismo contenido en dos dominios diferentes.

### 2. Consolida autoridad
Toda la autoridad SEO se concentra en `www.ecoarealimonar.com`

### 3. Redirección permanente (308)
- HTTP 308: Permanent Redirect
- Similar a 301, pero preserva el método HTTP
- Google transferirá el PageRank al dominio principal

### 4. Canonical URL única
Todas las URLs apuntan a una sola versión canónica.

## 📊 Impacto en herramientas

### Google Search Console
- Las visitas se contabilizarán solo en `www.ecoarealimonar.com`
- Los enlaces a `*.vercel.app` transferirán autoridad

### Google Analytics
- Todo el tráfico se registrará en el dominio correcto
- No se dividirán las estadísticas

### Meta Pixel / Facebook Ads
- Las conversiones se rastrearán correctamente
- Un solo dominio verificado

## 🚀 ¿Cuándo se activa?

La redirección se activará automáticamente cuando:
1. Hagas commit de los cambios
2. Push al repositorio en GitHub
3. Vercel redespliegue automáticamente (1-2 minutos)

## ✅ Verificación

Después del despliegue, prueba:

1. Visita `https://weblimonar.vercel.app/`
2. Deberías ser redirigido automáticamente a `https://www.ecoarealimonar.com/`
3. La barra de direcciones mostrará el dominio nuevo

### Comando para verificar (opcional):
```bash
curl -I https://weblimonar.vercel.app/
```

Deberías ver:
```
HTTP/2 308
location: https://www.ecoarealimonar.com/
```

## 📝 Notas técnicas

### ¿Por qué 308 y no 301?

- **301**: Permanent Redirect (puede cambiar método POST a GET)
- **308**: Permanent Redirect (preserva el método HTTP original)
- Next.js usa 308 por defecto con `permanent: true`

### ¿Se puede revertir?

Sí, simplemente elimina la configuración de `next.config.js` y 
redesplega. Sin embargo, Google puede tardar días/semanas en 
olvidar la redirección.

### ¿Afecta al desarrollo local?

No, porque:
1. La condición `has: [{ type: 'host', value: 'weblimonar.vercel.app' }]`
   solo se aplica cuando el host es exactamente ese
2. En local usas `localhost:3000`

## 🔐 Seguridad

Esta configuración también previene:
- Phishing con URLs similares a tu dominio de Vercel
- Confusión de usuarios entre múltiples URLs
- Problemas con cookies/sesiones entre dominios

## 📚 Referencias

- [Next.js Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)
- [Vercel Domain Management](https://vercel.com/docs/concepts/projects/domains)
- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/canonicalization)

=================================================================
RESUMEN
=================================================================

✅ Redirección configurada correctamente
✅ SEO optimizado (contenido único)
✅ Autoridad concentrada en dominio principal
✅ Preparado para Google indexación

Próximo paso: Commit y push para activar la redirección.
=================================================================
