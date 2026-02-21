# 🌍 Sistema modular de traducciones (textos estáticos)

Este directorio contiene las **traducciones estáticas** de la UI: botones, títulos, labels y todos los textos que usan `t("...")` o `translateServer("...")` en el código.  
Idiomas: **ES, EN, FR, DE, NL**.

## 📁 Estructura

```
src/lib/i18n/translations/
├── index.ts          # Combina todos los módulos en staticTranslations
├── common.ts         # Header, footer, botones, menús
├── home.ts           # Página home
├── offers.ts         # Ofertas y promociones
├── cookies.ts        # Banner de cookies
├── generated.ts      # Generado por script (no editar a mano)
└── README.md         # Este archivo
```

**Legacy** (fuera de esta carpeta):  
`src/lib/translations-preload.ts` — miles de claves; los módulos de aquí hacen override.

## 🔄 Orden de merge (index.ts)

```ts
staticTranslations = {
  ...legacyTranslations,     // Base
  ...commonTranslations,
  ...homeTranslations,
  ...offersTranslations,
  ...cookiesTranslations,
  ...generatedTranslations,  // Script translate:static
};
```

Las claves de los módulos posteriores sobrescriben las del legacy.

## 📝 Añadir traducciones a mano

En el módulo que corresponda (p. ej. `common.ts` o `home.ts`), añade una entrada con los 5 idiomas:

```ts
"Nueva etiqueta": {
  es: "Nueva etiqueta",
  en: "New label",
  fr: "Nouvelle étiquette",
  de: "Neues Label",
  nl: "Nieuw label"
},
```

## 🤖 Generar traducciones faltantes con OpenAI

Para que **todas** las claves usadas en el código tengan EN, FR, DE, NL:

1. Volcar estado actual:  
   `npm run dump:translations`
2. Traducir lo que falte:  
   `npm run translate:static`

El script escribe en **`generated.ts`**. No edites ese archivo a mano; si hace falta, vuelve a ejecutar el script.

## 📚 Documentación completa

Para el sistema completo (estáticos + dinámicos en Supabase, scripts y flujos):

**[docs/SISTEMA-TRADUCCIONES-COMPLETO.md](../../../docs/SISTEMA-TRADUCCIONES-COMPLETO.md)**

Ahí se explica cómo se traducen todos los textos del proyecto y qué comandos usar.
