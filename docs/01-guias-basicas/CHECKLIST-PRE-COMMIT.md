# ✅ CHECKLIST PRE-COMMIT - Eco Area Limonar

**Usa este checklist ANTES de hacer commit de cambios en páginas públicas**

---

## 🔍 INSPECCIÓN DE PÁGINA

### ¿Modificaste alguno de estos archivos?

```
src/app/
  ├── page.tsx                    ⚠️ Home
  ├── vehiculos/
  │   ├── page.tsx                ⚠️ Lista de vehículos
  │   └── [slug]/page.tsx         ⚠️ Detalle de vehículo
  ├── blog/
  │   ├── page.tsx                ⚠️ Lista de blog
  │   └── [category]/
  │       └── [slug]/page.tsx     ⚠️ Artículo
  ├── contacto/page.tsx           ⚠️ Contacto
  ├── tarifas/page.tsx            ⚠️ Tarifas
  ├── ofertas/page.tsx            ⚠️ Ofertas
  ├── faqs/page.tsx               ⚠️ FAQs
  ├── quienes-somos/page.tsx      ⚠️ Quiénes somos
  ├── mapa-areas/page.tsx         ⚠️ Mapa de áreas
  └── [location]/page.tsx         ⚠️ Ubicaciones
```

**Si modificaste CUALQUIERA de estas → CONTINÚA con el checklist**

---

## 🚨 CHECKLIST CRÍTICO

### 1. ✅ Server Component

```typescript
// ❌ PROHIBIDO encontrar esto:
"use client";

export default function MiPagina() { ... }

// ✅ DEBE ser así:
export default function MiPagina() { ... }
// O
export default async function MiPagina() { ... }
```

- [ ] La página NO tiene `"use client"` al inicio
- [ ] Es un Server Component (sin "use client")
- [ ] Es async si carga datos del servidor

---

### 2. ✅ Metadatos SEO

```typescript
// ✅ DEBE tener esto:
export const metadata: Metadata = {
  title: "...",
  description: "...",
  keywords: "...",
  openGraph: { ... }
};
```

- [ ] Tiene `export const metadata`
- [ ] Tiene `title` descriptivo
- [ ] Tiene `description` de 150-160 caracteres
- [ ] Tiene `keywords` relevantes
- [ ] Tiene `openGraph` configurado

---

### 3. ✅ Sistema de Traducción Correcto

```typescript
// ❌ PROHIBIDO en Server Component:
const { t } = useLanguage();

// ✅ CORRECTO en Server Component:
import { translateServer } from "@/lib/i18n/server-translation";
const t = (key: string) => translateServer(key, 'es');

// ✅ CORRECTO en Client Component:
"use client";
import { useLanguage } from "@/contexts/language-context";
const { t } = useLanguage();
```

- [ ] Si es Server Component → usa `translateServer()`
- [ ] Si es Client Component → usa `useLanguage()`
- [ ] NO mezcla ambos sistemas

---

### 4. ✅ Importaciones Correctas

```typescript
// ✅ DEBE importar:
import { translateServer } from "@/lib/i18n/server-translation";

// ❌ NO DEBE importar en Server Component:
import { useLanguage } from "@/contexts/language-context";
```

- [ ] Importa `translateServer` si es Server Component
- [ ] NO importa `useLanguage` en Server Components
- [ ] Importa solo lo necesario

---

### 5. ✅ Carga de Datos

```typescript
// ✅ CORRECTO - Carga en servidor:
export default async function MiPagina() {
  const data = await loadData(); // Carga en servidor
  return <Component data={data} />
}

// ❌ INCORRECTO - Carga en cliente:
"use client";
export default function MiPagina() {
  const [data, setData] = useState(null);
  useEffect(() => { loadData(); }, []); // ❌ NO
}
```

- [ ] Los datos se cargan en el servidor (async function)
- [ ] NO usa `useState` + `useEffect` para cargar datos iniciales
- [ ] Pasa datos a Client Components como props

---

### 6. ✅ Estructura HTML SEO

```typescript
// ✅ DEBE tener contenido SEO estático:
export default async function MiPagina() {
  return (
    <>
      <Header />
      <main>
        <h1>Título visible para Google</h1>
        <p>Contenido pre-renderizado</p>
        <ClientComponent /> {/* Solo lo interactivo */}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] Tiene `<h1>` con título principal
- [ ] Tiene contenido HTML estático visible
- [ ] Los Client Components son solo para interactividad
- [ ] El SEO content no está dentro de Client Components

---

### 7. ✅ Client Components Separados

```typescript
// ✅ CORRECTO - Separar lo interactivo:

// src/app/mi-pagina/page.tsx (Server)
import { MiClientComponent } from "@/components/mi-client-component";

export default async function MiPagina() {
  const data = await loadData();
  return (
    <main>
      <h1>Título SEO</h1> {/* Server */}
      <MiClientComponent data={data} /> {/* Client */}
    </main>
  );
}

// src/components/mi-client-component.tsx (Client)
"use client";
export function MiClientComponent({ data }) {
  const [state, setState] = useState(null);
  // Lógica interactiva aquí
}
```

- [ ] Las partes interactivas están en componentes separados
- [ ] Esos componentes tienen `"use client"`
- [ ] La página principal NO tiene `"use client"`

---

## 📊 RESULTADO FINAL

### ✅ TODO CORRECTO - Puedes hacer commit

- [ ] Todos los checkboxes marcados ✅
- [ ] No hay `"use client"` en páginas públicas
- [ ] Usa `translateServer()` correctamente
- [ ] Tiene metadatos SEO
- [ ] Carga datos en servidor

### ❌ ENCONTRASTE PROBLEMAS - NO HACER COMMIT

**Lee estos documentos AHORA:**

1. **REGLAS-ARQUITECTURA-NEXTJS.md** ⚠️
2. **GUIA-TRADUCCION.md** ⚠️
3. **AUDITORIA-SEO-CRITICA.md**

---

## 🆘 ¿Dudas?

**Si tienes dudas → Es Server Component**

**Regla de oro:**
- Página pública = Server Component
- Componente interactivo dentro = Client Component

---

## 📝 Test Rápido

```bash
# Buscar "use client" en páginas públicas (NO debería encontrar)
grep -r "use client" src/app/*/page.tsx
grep -r "use client" src/app/*/*/page.tsx

# Si encuentra alguno → ERROR CRÍTICO
```

---

**Fecha**: 8 de Enero, 2026  
**Versión**: 1.0
