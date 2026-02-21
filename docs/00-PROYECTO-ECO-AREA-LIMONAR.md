# Eco Area Limonar - Documentación del Proyecto

**Última actualización:** Febrero 2025

---

## 1. ¿Qué es este proyecto?

**Eco Area Limonar** es una aplicación web para gestionar un **área de autocaravanas** en Los Nietos, Cartagena (Mar Menor, Murcia).

- **Origen:** Copia adaptada del proyecto FURGOCASA (alquiler de campers).
- **Destino:** Área de autocaravanas con parcelas (no alquiler de vehículos).
- **Dominio:** ecoarealimonar.com
- **Estado:** En desarrollo / adaptación.

---

## 2. Regla absoluta: NO afectar a Furgocasa

### ⛔ PROHIBIDO

- **NUNCA** conectar este repositorio con el remoto de Furgocasa.
- **NUNCA** hacer push a ningún repositorio que pueda afectar a furgocasa.com.
- **NUNCA** usar credenciales de Supabase de Furgocasa en este proyecto.

### ✅ Correcto

- Este proyecto usa su **propia** instancia de Supabase (credenciales en `.env.local`).
- Este proyecto tiene **su propio** historial Git local.
- Los commits son **solo locales** hasta que se cree un repositorio nuevo para Eco Area Limonar.

---

## 3. Git: historial eliminado

### Decisión tomada

El historial Git heredado de Furgocasa **no tiene sentido** para este proyecto. Cuando creas un proyecto nuevo, hasta que no añades un repositorio de GitHub, no hay commits ni nada pendiente.

### Eliminar el historial (si aún existe)

**Cierra Cursor** (para que suelte el bloqueo de `.git`) y en una terminal ejecuta:

```bash
cd "e:\Acttax Dropbox\Narciso Pardo\Eskala IA\W - LIMONAR AREA CAMPER\limonar-app"
rmdir /s /q .git
```

O en PowerShell:
```powershell
Remove-Item -Recurse -Force .git
```

Esto elimina todo el historial. El proyecto queda como una carpeta normal, sin control de versiones.

### Repositorio oficial en GitHub

**URL**: [https://github.com/Eskaladigital/limonararea](https://github.com/Eskaladigital/limonararea)  
**Clone**: `https://github.com/Eskaladigital/limonararea.git`

Para conectar este proyecto local con el remoto (primera vez o tras `rmdir .git`):

```bash
git init
git add .
git commit -m "Initial commit - Eco Area Limonar"
git remote add origin https://github.com/Eskaladigital/limonararea.git
git push -u origin main
```

Así empiezas con historial limpio, solo de Eco Area Limonar.

---

## 4. Plan de trabajo (para nuevos agentes)

### Fase 1: Adaptación completada ✅

- [x] Admin: vehículos → parcelas (etiquetas)
- [x] Home: contenido Eco Area Limonar
- [x] Flujo reservas: textos parcela, entrada/salida
- [x] Buscador: sin selector de ubicación (solo fechas y horas)
- [x] Eliminación de páginas no aplicables (Europa, Marruecos, Parking Murcia, etc.)

### Fase 2: Pendiente

- [ ] Completar adaptación de páginas en `/es` (ver `REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md`)
- [ ] Configurar Supabase propio para Eco Area Limonar
- [ ] Adaptar FAQs a preguntas de área de autocaravanas
- [ ] Revisar/eliminar: ventas, documentación-alquiler, guía-camper, video-tutoriales
- [ ] Actualizar contacto, quiénes somos, aviso legal con datos reales

### Fase 3: Producción

- [ ] Deploy en Vercel con dominio ecoarealimonar.com
- [ ] Configurar Redsys/Stripe con comercio de Eco Area Limonar
- [ ] Emails con dominio @ecoarealimonar.com

---

## 5. Estructura de documentación

| Documento | Contenido |
|-----------|-----------|
| **docs/00-PROYECTO-ECO-AREA-LIMONAR.md** | Este archivo. Contexto y reglas. |
| **docs/01-PLAN-ECO-AREA-LIMONAR.md** | Plan de trabajo por fases. |
| **docs/04-referencia/REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md** | Revisión página a página de /es. |
| **README.md** | Guía general del proyecto (actualizado). |
| **.cursor/rules/redsys-crypto.mdc** | Regla: NO modificar crypto.ts de Redsys. |

---

## 6. Para un nuevo agente

### Antes de empezar

1. Leer este documento.
2. Leer `REVISION-PAGINAS-ES-AREA-AUTOCARAVANAS.md`.
3. Regla: **NO tocar Furgocasa**. Este es un proyecto independiente.

### Qué hacer

- Adaptar contenido a "área de autocaravanas" y "parcelas".
- Sustituir Furgocasa → Eco Area Limonar en textos.
- Sustituir furgocasa.com → ecoarealimonar.com.
- Usar credenciales de Supabase de este proyecto (no de Furgocasa).

### Qué no hacer

- Conectar con repositorio de Furgocasa.
- Modificar `src/lib/redsys/crypto.ts` (ver regla en .cursor/rules).
- Cambiar lógica que afecte a Furgocasa (no aplica, son proyectos separados).
