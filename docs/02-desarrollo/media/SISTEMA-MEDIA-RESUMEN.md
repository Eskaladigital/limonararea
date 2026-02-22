# 📸 Sistema de Gestión de Media - Eco Area Limonar

## ✅ **¿Qué hemos implementado?**

### **1. Configuración de Supabase Storage**
- ✅ Buckets creados: `vehicles`, `blog`
- ✅ Script SQL para políticas RLS: `supabase/configurar-storage-policies.sql`
- ✅ Políticas configuradas para:
  - Lectura pública (todos pueden ver)
  - Solo administradores pueden subir, actualizar y eliminar

---

### **2. Funciones Helper de Storage**
📁 `src/lib/supabase/storage.ts`

**Funciones disponibles:**
- `uploadFile(bucket, file, path?)` - Subir un archivo
- `uploadFiles(bucket, files)` - Subir múltiples archivos
- `deleteFile(bucket, path)` - Eliminar un archivo
- `deleteFiles(bucket, paths)` - Eliminar múltiples archivos
- `listFiles(bucket, path)` - Listar archivos (servidor)
- `listFilesClient(bucket, path)` - Listar archivos (cliente)
- `getPublicUrl(bucket, path)` - Obtener URL pública
- `formatFileSize(bytes)` - Formatear tamaño de archivo
- `validateFileType(file)` - Validar tipo de imagen
- `validateFileSize(file)` - Validar tamaño (max 10MB)

---

### **3. Página de Gestión de Media**
📁 `src/app/administrator/(protected)/media/page.tsx`

**URL:** `http://localhost:3000/administrator/media`

**Características:**
- ✅ **Tabs** para cambiar entre buckets (Vehículos 🚐 / Blog 📝)
- ✅ **Drag & Drop** para subir imágenes
- ✅ **Upload masivo** (múltiples archivos a la vez)
- ✅ **Búsqueda** de imágenes por nombre
- ✅ **Vista Grid/Lista** (cambio con botón)
- ✅ **Preview** de imágenes en modal
- ✅ **Copiar URL** de imagen
- ✅ **Descargar** imagen
- ✅ **Eliminar** imagen con confirmación
- ✅ **Estadísticas** (total archivos, resultados, bucket actual)

**Controles:**
- 🔍 Barra de búsqueda
- 📤 Botón "Subir Nueva"
- 👁️ Ver imagen (modal)
- 📋 Copiar URL
- 🗑️ Eliminar

---

### **4. Componente Selector de Imágenes Reutilizable**
📁 `src/components/media/image-selector.tsx`

**Props:**
```typescript
interface ImageSelectorProps {
  bucket: BucketType;           // 'vehicles' o 'blog'
  isOpen: boolean;               // Controla visibilidad
  onClose: () => void;           // Callback para cerrar
  onSelect: (imageUrl: string) => void;  // Callback con URL seleccionada
  currentImage?: string;         // Imagen actual (opcional)
}
```

**Características:**
- ✅ Modal elegante y responsive
- ✅ Búsqueda de imágenes
- ✅ Upload directo desde el selector
- ✅ Previsualización de imágenes
- ✅ Indicador visual de imagen seleccionada
- ✅ Diseño consistente con el resto del admin

**Uso:**
```tsx
import { ImageSelector } from "@/components/media/image-selector";

const [isOpen, setIsOpen] = useState(false);
const [imageUrl, setImageUrl] = useState("");

<ImageSelector
  bucket="vehicles"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSelect={(url) => {
    setImageUrl(url);
    // Guardar URL en el formulario/estado
  }}
  currentImage={imageUrl}
/>
```

---

## 🚀 **Cómo usar el sistema**

### **Desde la página de Media:**

1. Ve a: `http://localhost:3000/administrator/media`
2. Selecciona el bucket (Vehículos o Blog)
3. **Opción 1:** Arrastra imágenes a la zona de drop
4. **Opción 2:** Haz clic en "Subir Nueva"
5. Las imágenes se suben automáticamente
6. Usa la búsqueda para encontrar imágenes
7. Copia la URL con el botón 📋
8. Elimina imágenes no deseadas con 🗑️

---

### **Desde el editor de vehículos (próximo paso):**

1. En el formulario de edición de vehículo
2. Haz clic en "Seleccionar imagen"
3. Se abre el selector modal
4. Busca o sube una nueva imagen
5. Selecciona la imagen deseada
6. La URL se guarda automáticamente en el formulario

---

## 📋 **Pasos pendientes**

### **TODO:**
- [ ] Integrar `ImageSelector` en `/administrator/vehiculos/[id]/editar`
- [ ] Añadir campo de imagen principal en formulario de vehículo
- [ ] Crear tabla `vehicle_images` si no existe
- [ ] Integrar en editor de blog (cuando lo creemos)

---

## 🔐 **Seguridad (RLS)**

Las políticas de seguridad garantizan que:
- ✅ **Todos** pueden VER las imágenes (público)
- ✅ **Solo administradores** pueden SUBIR imágenes
- ✅ **Solo administradores** pueden ACTUALIZAR imágenes
- ✅ **Solo administradores** pueden ELIMINAR imágenes

---

## 📦 **Dependencias instaladas**

```bash
npm install react-dropzone --legacy-peer-deps
```

---

## 🎨 **Diseño y UX**

- **Colores:** Azul Eco Area Limonar (#1e40af) para acciones principales
- **Iconos:** Lucide React para consistencia
- **Transiciones:** Suaves y profesionales
- **Responsive:** Funciona en móvil, tablet y desktop
- **Feedback visual:** Estados de carga, selección, hover, etc.

---

## ⚡ **Próximos pasos recomendados**

1. **Ejecutar el script SQL:**
   - Abre Supabase Dashboard
   - Ve a SQL Editor
   - Ejecuta `supabase/configurar-storage-policies.sql`

2. **Probar la página de media:**
   - Ve a `/administrator/media`
   - Sube algunas imágenes de prueba
   - Verifica que se ven correctamente

3. **Integrar en vehículos:**
   - Añadir botón "Seleccionar imagen" en el formulario
   - Conectar con `ImageSelector`
   - Guardar URL en base de datos

4. **Optimizaciones futuras:**
   - Compresión automática de imágenes
   - Generación de thumbnails
   - Lazy loading en la galería
   - Paginación para muchas imágenes

---

## 💡 **Tips de uso**

- **Nombres de archivo:** Usa nombres descriptivos (ej: `knaus-boxstar-exterior-1.jpg`)
- **Organización:** Los buckets separan las imágenes por propósito
- **Backups:** Las imágenes en Supabase Storage están respaldadas automáticamente
- **URLs públicas:** Las URLs son permanentes y se pueden usar directamente en el HTML

---

¡El sistema de media está listo para usar! 🎉

