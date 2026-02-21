/**
 * AUDITORÍA DEL ESQUEMA SUPABASE
 * Conecta con las credenciales de .env.local y revisa tablas/columnas
 * Detecta residuos de "vehicles" y columnas incorrectas en parcelas
 *
 * Ejecutar: node scripts/audit-schema.js
 * (desde la raíz del proyecto, con .env.local cargado)
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Tablas a probar
const TABLES_TO_PROBE = [
  'parcels', 'parcelas', 'vehicles',
  'parcel_categories', 'vehicle_categories',
  'parcel_images', 'vehicle_images',
  'parcel_equipment', 'vehicle_equipment',
  'parcel_available_extras', 'vehicle_available_extras',
  'bookings', 'blocked_dates', 'equipment', 'extras', 'locations', 'seasons'
];

// Columnas de VEHÍCULO que NO deben estar en parcels (matrícula, motor, ITV, etc.)
const VEHICLE_COLUMNS = [
  'plate_number', 'brand', 'model', 'year',
  'fuel_type', 'transmission', 'mileage', 'mileage_unit',
  'engine_power', 'engine_displacement',
  'registration_date', 'next_itv_date', 'warranty_until',
  'previous_owners', 'condition',
  'has_bathroom', 'has_kitchen', 'has_ac', 'has_heating',
  'has_solar_panel', 'has_awning',
  'seats', 'beds', 'passengers',
  'is_for_sale', 'sale_price', 'sale_price_negotiable',
  'sale_status', 'sale_description', 'sale_highlights',
  'sale_meta_title', 'sale_meta_description'
];

// Columnas correctas para parcels (según schema-eco-area-limonar.sql)
const PARCEL_CORRECT_COLUMNS = [
  'id', 'name', 'slug', 'category_id', 'internal_code',
  'description', 'short_description', 'length_m', 'width_m',
  'base_price_per_day', 'status', 'sort_order',
  'is_for_rent', 'features', 'created_at', 'updated_at'
];

async function probeTable(tableName) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);

  if (error) {
    return { exists: false, error: error.message };
  }
  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  return { exists: true, columns, empty: !data || data.length === 0 };
}

async function main() {
  console.log('\n============================================');
  console.log('AUDITORÍA ESQUEMA SUPABASE - Eco Area Limonar');
  console.log('Conectando a:', SUPABASE_URL);
  console.log('============================================\n');

  const seen = new Set();
  const results = {};
  let issues = [];
  const fixSql = [];

  for (const tableName of [...new Set(TABLES_TO_PROBE)]) {
    if (seen.has(tableName)) continue;
    seen.add(tableName);

    const r = await probeTable(tableName);
    results[tableName] = r;

    if (r.exists) {
      const colInfo = r.columns.length > 0 ? `(${r.columns.length} cols)` : '(vacía, cols del schema)';
      console.log(`✓ Tabla: ${tableName} ${colInfo}`);

      if (r.columns.length > 0) {
        console.log(`  Columnas:`, r.columns.join(', '));
      } else {
        console.log(`  (Tabla vacía - usando schema de referencia)`);
      }

      // Comprobar nombre incorrecto
      if (tableName.startsWith('vehicle')) {
        issues.push(`❌ Tabla "${tableName}" debería llamarse parcel_*`);
      }
      if (tableName === 'parcelas') {
        issues.push(`❌ Tabla "parcelas" (español) - usar "parcels" (inglés)`);
      }

      // Para parcels/parcelas/vehicles: comprobar columnas
      const mainParcelTables = ['parcels', 'parcelas', 'vehicles'];
      if (mainParcelTables.includes(tableName)) {
        const colsToCheck = r.columns.length > 0 ? r.columns : [...PARCEL_CORRECT_COLUMNS, ...VEHICLE_COLUMNS];
        const wrongCols = colsToCheck.filter(c => VEHICLE_COLUMNS.includes(c));
        if (wrongCols.length > 0) {
          issues.push(`❌ En ${tableName}: columnas de VEHÍCULO: ${wrongCols.join(', ')}`);
          wrongCols.forEach(c => console.log(`    ⚠ ${c}`));
          wrongCols.forEach(c => fixSql.push(`ALTER TABLE public.${tableName} DROP COLUMN IF EXISTS ${c};`));
        }
      }

      // Comprobar vehicle_id
      if (r.columns.includes('vehicle_id')) {
        issues.push(`❌ En ${tableName}: columna vehicle_id debería ser parcel_id`);
        fixSql.push(`-- En ${tableName}: ALTER TABLE ... RENAME COLUMN vehicle_id TO parcel_id`);
      }

      console.log('');
    } else {
      console.log(`✗ Tabla ${tableName}: ${r.error || 'no existe'}\n`);
    }
  }

  console.log('============================================');
  console.log('RESUMEN DE PROBLEMAS');
  console.log('============================================');
  if (issues.length === 0) {
    console.log('✓ No se detectaron problemas');
  } else {
    issues.forEach(i => console.log(i));
  }

  if (fixSql.length > 0) {
    console.log('\n============================================');
    console.log('SQL DE CORRECCIÓN (guardar en supabase/fix-schema.sql)');
    console.log('============================================\n');
    fixSql.forEach(s => console.log(s));
  }
  console.log('\n');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
