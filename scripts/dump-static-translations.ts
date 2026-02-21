/**
 * Vuelca staticTranslations (merge de todos los módulos) a JSON.
 * Uso: npx tsx scripts/dump-static-translations.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Importar el merge real (mismo que usa la app)
import { staticTranslations } from '../src/lib/i18n/translations';

const outPath = path.join(__dirname, 'static-translations-dump.json');
const obj: Record<string, Record<string, string>> = {};

for (const [key, value] of Object.entries(staticTranslations)) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    obj[key] = value as Record<string, string>;
  }
}

fs.writeFileSync(outPath, JSON.stringify(obj, null, 0), 'utf8');
console.log('Written', Object.keys(obj).length, 'keys to', outPath);
