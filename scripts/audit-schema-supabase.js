/**
 * AUDITORÍA DEL ESQUEMA REAL EN SUPABASE
 * Lee .env.local y comprueba qué tablas y columnas existen.
 * Objetivo: ver el estado real antes de migrar vehicle* → parcel*.
 *
 * Opción 1 (solo .env.local): Prueba tablas conocidas y lista columnas cuando hay datos.
 * Opción 2 (con DATABASE_URL): Consulta information_schema y lista TODO (tablas vacías incluidas).
 *
 * Ejecutar: node scripts/audit-schema-supabase.js
 *
 * Para listado completo: en Supabase → Project Settings → Database copia "Connection string"
 * (URI) y añádela a .env.local como DATABASE_URL (o SUPABASE_DB_URL).
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

// Tablas a probar (nombres posibles legacy + actuales)
const TABLES_TO_PROBE = [
  'vehicles',
  'parcels',
  'parcelas',
  'vehicle_categories',
  'parcel_categories',
  'vehicle_images',
  'parcel_images',
  'vehicle_equipment',
  'parcel_equipment',
  'vehicle_available_extras',
  'parcel_available_extras',
  'bookings',
  'blocked_dates',
  'search_queries',
  'content_translations',
  'customers',
  'locations',
  'seasons',
  'extras',
  'equipment',
  'admins',
  'payments',
  'booking_extras',
];

async function auditWithSupabaseClient() {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const results = [];
  for (const tableName of TABLES_TO_PROBE) {
    const { data, error } = await supabase.from(tableName).select('*').limit(1);
    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        results.push({ table: tableName, exists: false });
      } else {
        results.push({ table: tableName, exists: false, error: error.message });
      }
    } else {
      const columns = data?.length > 0 ? Object.keys(data[0]) : [];
      const { count } = await supabase.from(tableName).select('*', { count: 'exact', head: true });
      results.push({
        table: tableName,
        exists: true,
        columns,
        count: count ?? 0,
        empty: data?.length === 0,
      });
    }
  }
  return results;
}

async function auditWithPg() {
  let pg;
  try {
    pg = require('pg');
  } catch {
    console.warn('⚠ DATABASE_URL está definido pero el paquete "pg" no está instalado.');
    console.warn('   Para listado completo: npm install pg\n');
    return null;
  }
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();
  const q = `
    SELECT t.table_name, c.column_name, c.data_type, c.ordinal_position
    FROM information_schema.tables t
    JOIN information_schema.columns c ON t.table_schema = c.table_schema AND t.table_name = c.table_name
    WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
    ORDER BY t.table_name, c.ordinal_position
  `;
  const res = await client.query(q);
  await client.end();
  const byTable = {};
  for (const row of res.rows) {
    if (!byTable[row.table_name]) byTable[row.table_name] = [];
    byTable[row.table_name].push({ name: row.column_name, type: row.data_type });
  }
  return byTable;
}

function printReport(supabaseResults, pgSchema) {
  console.log('\n' + '='.repeat(70));
  console.log('  AUDITORÍA DEL ESQUEMA SUPABASE - Eco Area Limonar');
  console.log('  (Estado real antes de migrar vehicle* → parcel*)');
  console.log('='.repeat(70) + '\n');

  if (pgSchema) {
    console.log('📋 TODAS LAS TABLAS (desde information_schema vía DATABASE_URL)\n');
    const tableNames = Object.keys(pgSchema).sort();
    let hasVehicle = false;
    for (const tableName of tableNames) {
      const cols = pgSchema[tableName];
      const colNames = cols.map(c => c.name);
      const vehicleCols = colNames.filter(c => c.toLowerCase().includes('vehicle'));
      if (tableName.toLowerCase().includes('vehicle') || vehicleCols.length > 0) {
        hasVehicle = true;
        console.log(`   ⚠ ${tableName}`);
        console.log(`      columnas: ${colNames.join(', ')}`);
        if (vehicleCols.length > 0) {
          console.log(`      → con "vehicle": ${vehicleCols.join(', ')}`);
        }
        console.log('');
      } else {
        console.log(`   ✓ ${tableName}`);
        console.log(`      ${colNames.join(', ')}\n`);
      }
    }
    if (hasVehicle) {
      console.log('\n📌 RESUMEN: Hay tablas o columnas con "vehicle". Ejecutar migración SQL cuando quieras.\n');
    }

    // content_translations: valores distintos de source_table
    if (pgSchema['content_translations']) {
      console.log('📋 content_translations: columnas presentes:', pgSchema['content_translations'].map(c => c.name).join(', '));
    }
    return;
  }

  // Sin DATABASE_URL: report con lo que sacamos del cliente
  const existing = supabaseResults.filter(r => r.exists);
  const missing = supabaseResults.filter(r => !r.exists);

  console.log('📋 TABLAS QUE SÍ EXISTEN\n');
  const withVehicle = [];
  for (const r of existing) {
    const tableHasVehicle = r.table.toLowerCase().includes('vehicle');
    const colsWithVehicle = (r.columns || []).filter(c => c.toLowerCase().includes('vehicle'));
    if (tableHasVehicle || colsWithVehicle.length > 0) {
      withVehicle.push({ ...r, vehicleCols: colsWithVehicle });
    }
    const colInfo = r.columns?.length ? r.columns.join(', ') : '(vacía → columnas no detectadas sin DATABASE_URL)';
    const mark = tableHasVehicle || colsWithVehicle.length ? '⚠' : '✓';
    console.log(`   ${mark} ${r.table} (${r.count ?? 0} registros)`);
    console.log(`      ${colInfo}\n`);
  }

  if (missing.length > 0) {
    console.log('📋 TABLAS QUE NO EXISTEN (o inaccesibles)\n');
    missing.forEach(({ table, error }) => {
      console.log(`   ○ ${table}${error ? ` — ${error}` : ''}`);
    });
    console.log('');
  }

  if (withVehicle.length > 0) {
    console.log('📌 TABLAS/COLUMNAS CON "vehicle" (a migrar a parcel*):\n');
    withVehicle.forEach(({ table, columns, vehicleCols }) => {
      console.log(`   - ${table}`);
      if (vehicleCols?.length) console.log(`     columnas con "vehicle": ${vehicleCols.join(', ')}`);
      if (columns?.length) console.log(`     todas: ${columns.join(', ')}`);
      console.log('');
    });
  } else if (existing.length > 0) {
    console.log('📌 No se detectaron tablas ni columnas con "vehicle" en las tablas con datos.\n');
    console.log('   (Para comprobar columnas de tablas vacías —bookings, blocked_dates, search_queries— usa DATABASE_URL.)\n');
  }

  console.log('💡 Listado completo (tablas vacías + tipos de columna): añade a .env.local');
  console.log('   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres');
  console.log('   Luego: npm install pg  y  npm run db:audit-schema\n');
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o clave Supabase en .env.local');
    process.exit(1);
  }

  if (DATABASE_URL) {
    try {
      const pgSchema = await auditWithPg();
      if (pgSchema) {
        printReport(null, pgSchema);
        return;
      }
    } catch (e) {
      console.warn('⚠ DATABASE_URL presente pero fallo al conectar con pg:', e.message);
      console.warn('   Comprobando con Supabase client...\n');
    }
  }

  const results = await auditWithSupabaseClient();
  printReport(results, null);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
