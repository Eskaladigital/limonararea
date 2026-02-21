/**
 * 🎯 SISTEMA MODULAR DE TRADUCCIONES
 * ====================================
 * 
 * Este archivo combina traducciones de múltiples módulos.
 * ESTRATEGIA DE MIGRACIÓN PROGRESIVA:
 * 
 * 1. Los módulos nuevos se añaden aquí
 * 2. El archivo legacy (translations-preload.ts) se mantiene
 * 3. Se combinan ambos en el índice principal
 * 4. Progresivamente movemos contenido del legacy a módulos
 * 
 * VENTAJAS:
 * - ✅ No rompe nada existente
 * - ✅ Migración sin riesgo
 * - ✅ Mejor organización
 * - ✅ Archivos más manejables
 */

import { commonTranslations } from './common';
import { homeTranslations } from './home';
import { offersTranslations } from './offers';
import { cookiesTranslations } from './cookies';
import { marMenorTranslations } from './mar-menor';
import { generatedTranslations } from './generated';
// Importar legacy hasta que migremos todo
import { staticTranslations as legacyTranslations } from '../../translations-preload';

/**
 * Combina todas las traducciones en un solo objeto
 * Los módulos nuevos tienen prioridad sobre legacy
 */
export const staticTranslations = {
  ...legacyTranslations,     // Base: traducciones legacy
  ...commonTranslations,      // Override: traducciones comunes
  ...homeTranslations,        // Override: home page
  ...offersTranslations,      // Override: ofertas
  ...cookiesTranslations,     // Override: cookies banner
  ...marMenorTranslations,    // Override: página Mar Menor
  ...generatedTranslations,   // Override: generadas por script
};

/**
 * Helper para crear hash de texto (usado en caché)
 */
export function generateTextHash(text: string): string {
  const str = String(text).toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Construir caché de traducciones con hash
 */
export function buildTranslationCache(): Record<string, any> {
  const cache: Record<string, any> = {};
  
  Object.entries(staticTranslations).forEach(([text, translations]) => {
    const key = generateTextHash(text);
    cache[key] = translations;
  });
  
  return cache;
}
