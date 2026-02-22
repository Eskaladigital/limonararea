/**
 * Script para generar contenido único de ciudades con OpenAI
 * 
 * Este script genera contenido SEO optimizado y único para cada ubicación
 * incluyendo: atracciones, áreas de pernocta, rutas, gastronomía, etc.
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { getJson } from 'serpapi';
import { resolve } from 'path';

// Cargar variables de entorno desde .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Usar service role para escritura
);

const SERPAPI_KEY = process.env.SERPAPI_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface LocationTarget {
  id: string;
  slug: string;
  name: string;
  province: string;
  region: string;
}

interface GeneratedContent {
  introduction: string;
  attractions: Array<{
    title: string;
    description: string;
    type: 'historical' | 'natural' | 'cultural' | 'leisure';
  }>;
  parking_areas: Array<{
    name: string;
    description: string;
    services: string[];
    approximate_location: string;
  }>;
  routes: Array<{
    title: string;
    description: string;
    duration: string;
    difficulty: string;
  }>;
  gastronomy: string;
  practical_tips: string;
}

/**
 * Determina si una ubicación está más cerca de Murcia o Madrid
 */
function getNearestOffice(location: LocationTarget): 'murcia' | 'madrid' {
  // Provincias cercanas a Madrid (alquileres de larga duración)
  const madridProvinces = ['Madrid', 'Toledo', 'Guadalajara', 'Segovia', 'Ávila'];
  
  // Por defecto, todo lo demás está más cerca de Murcia
  return madridProvinces.includes(location.province) ? 'madrid' : 'murcia';
}

/**
 * Busca en Google con SerpAPI y devuelve resultados resumidos (sin marketplaces)
 */
async function searchGoogle(query: string): Promise<string> {
  if (!SERPAPI_KEY) {
    return '(sin resultados - SerpAPI no configurada)';
  }
  
  try {
    const response = await getJson({
      engine: 'google',
      api_key: SERPAPI_KEY,
      q: query,
      location: 'Spain',
      gl: 'es',
      hl: 'es',
      num: 10,
    });

    const results: string[] = [];

    // Dominios de marketplaces/portales/agregadores a filtrar
    const blockedDomains = [
      'milanuncios', 'wallapop', 'autoscout24', 'coches.net', 'motor.es',
      'vibbo', 'segundamano', 'facebook.com/marketplace',
      'ebay', 'amazon', 'idealista', 'fotocasa', 'trovit', 'mundoanuncio',
      'autocasion', 'standvirtual', 'carfax', 'sumauto', 'cochesnet',
      'campermanía', 'furgovw', 'tripadvisor', 'booking.com', 'airbnb',
      'expedia', 'kayak', 'trivago', 'park4night', 'campercontact', 'ioverlander'
    ];
    const isBlocked = (url: string, title: string) => {
      const lower = (url + ' ' + title).toLowerCase();
      return blockedDomains.some(d => lower.includes(d));
    };
    
    // Resultados orgánicos (sin marketplaces, ordenados por posición Google)
    if (response.organic_results) {
      let count = 0;
      for (const r of response.organic_results.slice(0, 10)) {
        if (isBlocked(r.link || '', r.title || '')) continue;
        const position = r.position ? `#${r.position}` : '';
        results.push(`- ${position} ${r.title}: ${r.snippet || ''}`);
        count++;
        if (count >= 5) break;
      }
    }
    
    // Local results (Google Maps) - ordenados por rating * reviews (mejor primero)
    if (response.local_results?.places) {
      const sortedPlaces = [...response.local_results.places].sort((a: any, b: any) => {
        const scoreA = (a.rating || 0) * (a.reviews || 0);
        const scoreB = (b.rating || 0) * (b.reviews || 0);
        return scoreB - scoreA;
      });
      for (const p of sortedPlaces.slice(0, 5)) {
        const rating = p.rating ? ` (${p.rating}★, ${p.reviews || 0} reseñas)` : '';
        results.push(`- [LOCAL DESTACADO] ${p.title}${rating} - ${p.address || ''}`);
      }
    }

    return results.length > 0 ? results.join('\n') : '(sin resultados relevantes)';
  } catch (error) {
    console.log(`   ⚠️  Error en búsqueda "${query}": ${(error as Error).message}`);
    return '(error en búsqueda)';
  }
}

/**
 * Realiza las búsquedas de contexto local para una ciudad (orientado a TURISTA/ALQUILER)
 */
async function searchLocalContext(location: LocationTarget): Promise<string> {
  console.log(`   🔍 Buscando datos reales con SerpAPI...`);
  
  const searches = [
    `área autocaravanas pernocta camping ${location.name} ${location.province}`,
    `ruta autocaravana camper desde ${location.name}`,
    `qué ver ${location.name} turismo`,
    `gastronomía platos típicos ${location.name} ${location.province}`,
    `normativa autocaravanas ZBE ${location.name}`,
  ];

  const results: string[] = [];
  
  for (const query of searches) {
    const searchResults = await searchGoogle(query);
    results.push(`\n### Búsqueda: "${query}"\n${searchResults}`);
    // Pequeña espera entre búsquedas para no saturar
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`   ✅ ${searches.length} búsquedas completadas`);
  return results.join('\n');
}

/**
 * Genera contenido único para una ubicación usando OpenAI
 */
async function generateLocationContent(location: LocationTarget): Promise<GeneratedContent> {
  const nearestOffice = getNearestOffice(location);
  const officeName = nearestOffice === 'murcia' ? 'Murcia (Casillas)' : 'Madrid';
  const isSede = location.name === 'Murcia' || location.name === 'Madrid';
  
  const sedeContext = isSede 
    ? `${location.name} ${location.name === 'Murcia' ? 'es la sede principal' : 'ofrece servicio de recogida para alquileres de larga duración'} de Eco Area Limonar.`
    : `Eco Area Limonar tiene su sede en ${officeName}. Para ${location.name}, sé transparente: no hay sede física allí, pero la recogida en ${officeName} merece la pena por la cercanía y la calidad de las campers. Calcula la distancia aproximada desde ${location.name} a ${officeName} y menciónala de forma natural.`;

  // Buscar datos reales con SerpAPI
  const localContext = await searchLocalContext(location);

  const prompt = `Eres un redactor copywriter especializado en temática de viajes y en posicionamiento SEO para empresas de alquiler de autocaravanas camper.

**CONTEXTO DE Eco Area Limonar:**
${sedeContext}

**DATOS REALES ENCONTRADOS EN GOOGLE** (usa estos datos para escribir contenido con nombres, lugares y datos reales):
${localContext}

**TU MISIÓN:**
Crear contenido SEO optimizado, extenso y de máxima calidad para la landing page de "${location.name}, ${location.province}, ${location.region}".

**OBJETIVO SEO:**
Posicionarse en búsquedas como:
- "alquiler de camper ${location.name}"
- "alquiler de autocaravanas ${location.name}"
- "alquiler de motorhomes ${location.province}"
- "casas rodantes ${location.name}"

**REQUISITOS CRÍTICOS:**

1. **Contenido turístico específico y real:**
   - Lugares de interés turístico REALES de ${location.name}
   - Rutas cercanas con distancias REALES
   - Gastronomía típica de ${location.province}
   - NO inventes datos: usa solo información VERIFICABLE

2. **Información práctica para autocaravanas:**
   - Áreas de pernocta cercanas (con distancias específicas)
   - Campings y servicios reales
   - Normativas locales, ZBE (Zonas de Bajas Emisiones)
   - Mejor época para visitar

3. **Tono y estilo:**
   - Informativo, profesional, como una guía de turismo
   - Sin exageraciones ("destino ideal", "maravilloso")
   - Datos reales y útiles para el viajero
   - NO mencionar empresas competidoras
   - NUNCA mencionar apps de terceros como Park4Night, CamperContact, iOverlander, etc.
   - SIEMPRE recomendar Mapa Eco Area Limonar (www.mapalimonar.com) cuando se necesite mencionar una app para encontrar áreas de autocaravanas
   - Transparente sobre la ubicación de Eco Area Limonar

4. **Formato HTML limpio:**
   - UTF-8, sin estilos ni clases CSS
   - Usa <h2>, <h3>, <p>, <ul><li>
   - NO uses <h1>

5. **Extensión:** 1500-2000 palabras totales

6. **SEO Keywords:** Integra naturalmente: "autocaravana", "camper", "alquiler", "motorhome", "casa rodante", "${location.name}"

**GENERA EL CONTENIDO EN FORMATO JSON CON ESTA ESTRUCTURA:**

{
  "introduction": "<p>Párrafo introductorio extenso (300-400 palabras) en HTML sobre viajar en autocaravana a ${location.name}. Describe qué hace única a esta ciudad/región para el turismo en camper. ${!isSede ? 'Menciona de forma natural y transparente que Eco Area Limonar está en ' + officeName + ', indicando la distancia aproximada y por qué merece la pena.' : 'Menciona que Eco Area Limonar tiene servicio aquí.'} Usa keywords: alquiler autocaravana, camper, ${location.name}.</p>",
  
  "attractions": [
    {
      "title": "Nombre REAL del lugar turístico",
      "description": "<p>Descripción completa (150-200 palabras) en HTML. Incluye qué se puede ver, hacer, historia relevante, horarios si es importante. Menciona por qué es interesante visitarlo en autocaravana.</p>",
      "type": "historical|natural|cultural|leisure"
    }
  ],
  // CRÍTICO: Incluir 5-6 atracciones REALES y específicas de ${location.name}. Si es una ciudad pequeña, incluye atracciones de la provincia cercana.
  
  "parking_areas": [
    {
      "name": "Nombre REAL del área/camping/parking",
      "description": "<p>Descripción detallada (120-150 palabras) en HTML. Ubicación exacta, cómo llegar desde ${location.name}, características, tarifa aproximada si se conoce.</p>",
      "services": ["agua", "electricidad", "vaciado", "wifi", "duchas"],
      "approximate_location": "A X km de ${location.name}, zona exacta o dirección"
    }
  ],
  // 3-4 áreas REALES. Si no conoces áreas específicas verificables, menciona zonas generales donde está permitido pernoctar o campings cercanos.
  
  "routes": [
    {
      "title": "Ruta: [Nombre descriptivo]",
      "description": "<p>Descripción completa de la ruta (180-250 palabras) en HTML. Pueblos/ciudades que visitar, distancias REALES desde ${location.name}, paisajes, puntos de interés específicos en el camino, dónde parar. Asegúrate de que las distancias y lugares sean CORRECTOS.</p>",
      "duration": "X días / X horas de conducción",
      "difficulty": "Fácil|Media|Difícil"
    }
  ],
  // 3-4 rutas REALES desde/cerca de ${location.name}. Verifica que las distancias sean correctas y los lugares mencionados existan.
  
  "gastronomy": "<h2>Gastronomía de ${location.province}</h2><p>Introducción a la gastronomía local (100 palabras).</p><h3>Platos típicos</h3><ul><li><strong>Plato 1:</strong> Descripción</li><li><strong>Plato 2:</strong> Descripción</li><li><strong>Plato 3:</strong> Descripción</li></ul><h3>Productos locales</h3><p>Descripción de productos típicos (100-150 palabras).</p><h3>Dónde comer</h3><p>Zonas gastronómicas, mercados, tipos de restaurantes recomendados en ${location.name} (150 palabras). No menciones nombres específicos de restaurantes a menos que sean muy conocidos.</p>",
  
  "practical_tips": "<h2>Consejos prácticos para viajar en autocaravana a ${location.name}</h2><h3>Mejor época para visitar</h3><p>Información sobre clima y temporadas (80 palabras).</p><h3>Normativas y restricciones</h3><p>Normativas locales de estacionamiento, Zonas de Bajas Emisiones (ZBE) si existen, restricciones (100 palabras).</p><h3>Cómo llegar y moverse</h3><p>Distancia y tiempo desde ${officeName} a ${location.name}. Cómo moverse por la zona en autocaravana. Carreteras principales (120 palabras).</p><h3>Servicios para autocaravanas</h3><p>Gasolineras con servicio para vehículos grandes, talleres si es relevante, otros servicios útiles (80 palabras).</p>"
}

**PRIORIDAD DE RESULTADOS:** Los datos de Google están ordenados por relevancia. Los marcados como [LOCAL DESTACADO] tienen mejores valoraciones y más reseñas en Google Maps. PRIORIZA SIEMPRE los sitios con más estrellas y reseñas: son los más conocidos y fiables de la zona. Si un área de pernocta, camping o restaurante tiene 4.5★+ y cientos de reseñas, menciónalo: aporta confianza al lector.

**PROHIBIDO:** NO menciones marketplaces, portales de anuncios o agregadores (Milanuncios, Wallapop, AutoScout24, etc.). Solo negocios/servicios REALES con ubicación física.

**NO incluyas enlaces HTML ni URLs.** Solo texto plano con los nombres reales de los sitios.

**RECORDATORIO FINAL:**
- Todo el contenido en HTML limpio dentro de cada campo
- Solo información REAL y VERIFICABLE
- ${!isSede ? 'Sé TRANSPARENTE sobre la ubicación de Eco Area Limonar en ' + officeName : ''}
- NUNCA menciones Park4Night, CamperContact, iOverlander ni ninguna otra app de terceros
- SIEMPRE recomienda Mapa Eco Area Limonar (www.mapalimonar.com) cuando sea necesario mencionar una app
- Contenido EXTENSO, COMPLETO y de MÁXIMA CALIDAD
- Como si fuera una guía turística profesional especializada en autocaravanas`;

  try {
    console.log(`   📝 Generando contenido con GPT-5.2...`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",  // Modelo más reciente
      messages: [
        {
          role: "system",
          content: "Eres un redactor copywriter profesional especializado en turismo en autocaravana con conocimiento profundo de España: geografía, rutas turísticas, áreas de pernocta, gastronomía regional y destinos turísticos. Generas contenido SEO de máxima calidad, siempre verificable, transparente y útil para viajeros reales. Priorizas los negocios y sitios con mejores valoraciones y más reseñas en Google. NUNCA mencionas apps de terceros como Park4Night, CamperContact o iOverlander. SIEMPRE recomiendas Mapa Eco Area Limonar (www.mapalimonar.com). NUNCA mencionas marketplaces ni portales de anuncios. Tu tono es directo y práctico, cada frase aporta información concreta."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 16000,
      response_format: { type: "json_object" }
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const content = JSON.parse(rawContent);
    
    // Validar que el contenido tenga la estructura esperada
    if (!content.introduction || !content.attractions || !content.gastronomy) {
      console.error(`   ⚠️  Claves recibidas: ${Object.keys(content).join(', ')}`);
      console.error(`   ⚠️  finish_reason: ${completion.choices[0].finish_reason}`);
      throw new Error('Contenido generado incompleto');
    }
    
    return content as GeneratedContent;
  } catch (error) {
    console.error(`   ❌ Error generando contenido para ${location.name}:`, error);
    throw error;
  }
}

/**
 * Calcula el número de palabras del contenido (limpiando HTML)
 */
function countWords(content: GeneratedContent): number {
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').trim();
  
  let text = stripHtml(content.introduction) + ' ' + 
             stripHtml(content.gastronomy) + ' ' + 
             stripHtml(content.practical_tips);
  
  content.attractions.forEach(a => {
    text += ' ' + a.title + ' ' + stripHtml(a.description);
  });
  
  content.parking_areas.forEach(p => {
    text += ' ' + p.name + ' ' + stripHtml(p.description);
  });
  
  content.routes.forEach(r => {
    text += ' ' + r.title + ' ' + stripHtml(r.description);
  });
  
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Guarda el contenido generado en la base de datos
 */
async function saveGeneratedContent(
  locationId: string,
  content: GeneratedContent
): Promise<void> {
  const wordCount = countWords(content);

  // Sanitizar contenido para Supabase:
  // El contenido ya viene parseado, los \uXXXX ya están decodificados a caracteres reales.
  // Solo limpiar recursivamente strings para quitar chars de control.
  function sanitizeStrings(obj: any): any {
    if (typeof obj === 'string') {
      return obj.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '');
    }
    if (Array.isArray(obj)) return obj.map(sanitizeStrings);
    if (obj && typeof obj === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = sanitizeStrings(value);
      }
      return result;
    }
    return obj;
  }
  const sanitized = sanitizeStrings(content);
  
  const { error } = await supabase
    .from('location_targets')
    .update({
      content_sections: sanitized,
      content_generated_at: new Date().toISOString(),
      content_word_count: wordCount,
      updated_at: new Date().toISOString()
    })
    .eq('id', locationId);

  if (error) {
    throw new Error(`Error guardando contenido: ${error.message}`);
  }
  
  console.log(`   💾 Guardado en Supabase (${wordCount} palabras)`);
}

/**
 * Genera contenido para todas las ubicaciones activas
 */
async function generateAllContent(regenerate: boolean = false): Promise<void> {
  console.log('🚀 Iniciando generación de contenido con OpenAI GPT-5.2\n');
  console.log('━'.repeat(60));

  // Obtener todas las ubicaciones activas
  const { data: locations, error } = await supabase
    .from('location_targets')
    .select('id, slug, name, province, region, content_generated_at')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('❌ Error obteniendo ubicaciones:', error);
    return;
  }

  const total = locations?.length || 0;
  console.log(`📍 Encontradas ${total} ubicaciones activas\n`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const location of locations || []) {
    processed++;
    
    // Si ya tiene contenido y no queremos regenerar, saltar
    if (!regenerate && location.content_generated_at) {
      skipped++;
      console.log(`⏭️  [${processed}/${total}] ${location.name} - Ya tiene contenido (usar --regenerate para sobrescribir)`);
      continue;
    }

    try {
      console.log(`\n🔄 [${processed}/${total}] Generando contenido para ${location.name}, ${location.province}...`);
      
      const startTime = Date.now();
      const content = await generateLocationContent(location);
      await saveGeneratedContent(location.id, content);
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      
      console.log(`✅ ${location.name} completado en ${duration}s\n`);
      
      // Esperar 3 segundos entre llamadas para no saturar la API
      if (processed < total) {
        console.log('   ⏳ Esperando 3 segundos...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      errors++;
      console.error(`❌ Error con ${location.name}:`, error);
      console.log('');
    }
  }

  console.log('━'.repeat(60));
  console.log('\n✨ Proceso completado!');
  console.log(`   ✅ Generados: ${processed - skipped - errors}`);
  console.log(`   ⏭️  Saltados: ${skipped}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log('');
}

/**
 * Genera contenido para una sola ubicación
 */
async function generateSingleContent(slug: string): Promise<void> {
  console.log('🚀 Generando contenido para ubicación específica\n');
  console.log('━'.repeat(60));
  
  const { data: location, error } = await supabase
    .from('location_targets')
    .select('id, slug, name, province, region')
    .eq('slug', slug)
    .single();

  if (error || !location) {
    console.error('❌ Ubicación no encontrada:', slug);
    return;
  }

  console.log(`📍 Ubicación: ${location.name}, ${location.province}\n`);

  try {
    const startTime = Date.now();
    const content = await generateLocationContent(location);
    await saveGeneratedContent(location.id, content);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log(`\n✅ Contenido generado exitosamente en ${duration}s`);
    console.log(`   📊 ${countWords(content)} palabras totales`);
    console.log(`   🎯 ${content.attractions.length} atracciones`);
    console.log(`   🅿️  ${content.parking_areas.length} áreas de pernocta`);
    console.log(`   🗺️  ${content.routes.length} rutas`);
    
    console.log('\n📝 Vista previa (primeras 200 caracteres):');
    const preview = content.introduction.replace(/<[^>]*>/g, '').substring(0, 200);
    console.log(`   "${preview}..."\n`);
    
  } catch (error) {
    console.error('❌ Error generando contenido:', error);
  }
  
  console.log('━'.repeat(60));
}

// Script principal
const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

if (command === 'all') {
  const regenerate = param === '--regenerate';
  generateAllContent(regenerate);
} else if (command === 'single' && param) {
  generateSingleContent(param);
} else {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║  GENERADOR DE CONTENIDO LOCAL CON IA - Eco Area Limonar             ║
╚════════════════════════════════════════════════════════════════╝

Uso:
  npm run generate-content:all
    → Genera contenido solo para ubicaciones sin contenido
  
  npm run generate-content:regenerate
    → Regenera TODAS las ubicaciones (sobrescribe existente)
  
  npm run generate-content single murcia
    → Genera solo para una ubicación específica (por slug)

Ejemplos:
  npm run generate-content:all
  npm run generate-content single cartagena
  npm run generate-content single alicante
  `);
}
