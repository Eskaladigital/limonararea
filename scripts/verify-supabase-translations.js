/**
 * Verifica que existan en Supabase (content_translations) todas las traducciones
 * que la web necesita para EN, FR, DE y NL.
 *
 * Usa .env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 * (o SUPABASE_SERVICE_ROLE_KEY si existe).
 *
 * Ejecutar: node scripts/verify-supabase-translations.js
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const LOCALES = ['en', 'fr', 'de', 'nl'];
const LOCALE_NAMES = { en: 'Inglés', fr: 'Francés', de: 'Alemán', nl: 'Neerlandés' };

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o clave de Supabase en .env.local');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Definición de qué traducciones necesita la app (según get-translations y páginas)
const CONFIG = {
  // Home y listados usan getTranslatedRecords('vehicles', ..., ['name', 'short_description'])
  // Los datos vienen de getFeaturedParcels → tabla parcels
  vehicles: {
    sourceTable: 'vehicles',
    fields: ['name', 'short_description'],
    idSource: 'parcels', // tabla de la que sacamos los IDs a comprobar
  },
  parcels: {
    sourceTable: 'parcels',
    fields: ['name'],
    idSource: 'parcels',
  },
  posts: {
    sourceTable: 'posts',
    fields: ['title', 'excerpt', 'content', 'meta_title', 'meta_description'],
    idSource: 'posts',
  },
  content_categories: {
    sourceTable: 'content_categories',
    fields: ['name'],
    idSource: 'content_categories',
  },
};

function buildKey(table, id, field, locale) {
  return `${table}:${id}:${field}:${locale}`;
}

async function fetchTableIds(tableName, select = 'id') {
  const { data, error } = await supabase.from(tableName).select(select);
  if (error) {
    console.warn(`⚠️  No se pudo leer tabla ${tableName}:`, error.message);
    return [];
  }
  return data || [];
}

async function fetchExistingTranslations() {
  const { data, error } = await supabase
    .from('content_translations')
    .select('source_table, source_id, source_field, locale')
    .in('locale', LOCALES);

  if (error) {
    console.error('❌ Error leyendo content_translations:', error.message);
    return new Set();
  }

  const set = new Set();
  (data || []).forEach((t) => {
    set.add(buildKey(t.source_table, t.source_id, t.source_field, t.locale));
  });
  return set;
}

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('  VERIFICACIÓN DE TRADUCCIONES EN SUPABASE');
  console.log('  Tabla: content_translations | Idiomas: EN, FR, DE, NL');
  console.log('='.repeat(70) + '\n');

  // 1) Comprobar que existe la tabla content_translations
  const { data: ctSample, error: ctError } = await supabase
    .from('content_translations')
    .select('source_table, source_id, source_field, locale')
    .limit(1);

  if (ctError) {
    console.error('❌ La tabla content_translations no existe o no es accesible:', ctError.message);
    console.log('\n📌 Crea la tabla en Supabase (SQL Editor) con algo como:\n');
    console.log(`
CREATE TABLE IF NOT EXISTS content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_field TEXT NOT NULL,
  locale TEXT NOT NULL,
  translated_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(source_table, source_id, source_field, locale)
);

CREATE INDEX IF NOT EXISTS idx_content_translations_lookup
  ON content_translations(source_table, source_id, locale);
`);
    console.log('   Luego vuelve a ejecutar: npm run verify:translations\n');
    process.exit(1);
  }

  const existing = await fetchExistingTranslations();
  console.log(`📦 Traducciones existentes en content_translations: ${existing.size}\n`);

  let totalMissing = 0;
  const missingByTable = {};
  const missingDetails = [];

  // 2) Parcelas/Vehicles: IDs desde parcels, pero la app puede usar source_table 'vehicles' o 'parcels'
  const parcels = await fetchTableIds('parcels', 'id, name');
  if (parcels.length > 0) {
    const tablesToCheck = ['vehicles', 'parcels'];
    const fieldsByTable = { vehicles: ['name', 'short_description'], parcels: ['name'] };
    for (const st of tablesToCheck) {
      const fields = fieldsByTable[st];
      for (const p of parcels) {
        for (const field of fields) {
          for (const locale of LOCALES) {
            const key = buildKey(st, p.id, field, locale);
            if (!existing.has(key)) {
              totalMissing++;
              missingByTable[st] = (missingByTable[st] || 0) + 1;
              missingDetails.push({
                table: st,
                id: p.id,
                name: p.name,
                field,
                locale,
              });
            }
          }
        }
      }
    }
  }

  // 3) Posts publicados
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  if (posts && posts.length > 0) {
    const fields = ['title', 'excerpt', 'content', 'meta_title', 'meta_description'];
    for (const post of posts) {
      for (const field of fields) {
        for (const locale of LOCALES) {
          const key = buildKey('posts', post.id, field, locale);
          if (!existing.has(key)) {
            totalMissing++;
            missingByTable['posts'] = (missingByTable['posts'] || 0) + 1;
            missingDetails.push({
              table: 'posts',
              id: post.id,
              name: post.title || post.slug,
              field,
              locale,
            });
          }
        }
      }
    }
  }

  // 4) Categorías de contenido
  const categories = await fetchTableIds('content_categories', 'id, name');
  if (categories.length > 0) {
    for (const cat of categories) {
      for (const field of ['name']) {
        for (const locale of LOCALES) {
          const key = buildKey('content_categories', cat.id, field, locale);
          if (!existing.has(key)) {
            totalMissing++;
            missingByTable['content_categories'] = (missingByTable['content_categories'] || 0) + 1;
            missingDetails.push({
              table: 'content_categories',
              id: cat.id,
              name: cat.name,
              field,
              locale,
            });
          }
        }
      }
    }
  }

  // Resumen por tabla
  console.log('📋 RESUMEN POR TABLA Y TRADUCCIONES FALTANTES\n');
  const tablesChecked = ['vehicles', 'parcels', 'posts', 'content_categories'];
  for (const t of tablesChecked) {
    const count = missingByTable[t] || 0;
    const icon = count === 0 ? '✅' : '⚠️';
    console.log(`   ${icon} ${t}: ${count} traducciones faltantes`);
  }

  console.log('\n' + '-'.repeat(70));
  console.log(`   TOTAL traducciones faltantes: ${totalMissing}`);
  console.log('-'.repeat(70) + '\n');

  if (totalMissing === 0) {
    console.log('✅ Tienes todas las traducciones necesarias en Supabase para EN, FR, DE y NL.\n');
    return;
  }

  // Agrupar faltantes por (table, locale) para un listado legible
  const byTableLocale = {};
  missingDetails.forEach((m) => {
    const k = `${m.table}:${m.locale}`;
    if (!byTableLocale[k]) byTableLocale[k] = [];
    byTableLocale[k].push(m);
  });

  console.log('📝 DETALLE (primeros 50 por tabla/idioma)\n');
  const keys = Object.keys(byTableLocale).sort();
  let shown = 0;
  const maxShow = 50;
  for (const k of keys) {
    const items = byTableLocale[k];
    const [table, locale] = k.split(':');
    console.log(`   ${table} → ${LOCALE_NAMES[locale] || locale} (${items.length} faltantes)`);
    items.slice(0, 5).forEach((m) => {
      const label = m.name != null ? String(m.name).slice(0, 50) : m.id;
      console.log(`      - id=${m.id} field=${m.field} | ${label}`);
    });
    if (items.length > 5) {
      console.log(`      ... y ${items.length - 5} más`);
    }
    console.log('');
    shown += items.length;
    if (shown >= maxShow) break;
  }

  console.log('💡 Puedes rellenar las traducciones en el panel de Supabase (tabla content_translations)');
  console.log('   o usar un script de generación/importación si lo tienes.\n');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
