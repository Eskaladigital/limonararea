/**
 * AUDITORÍA Y GENERACIÓN DE FIX PARA ESQUEMA SUPABASE
 * 1. Conecta con .env.local a Supabase
 * 2. Revisa tablas existentes
 * 3. Compara con schema correcto (parcelas sin columnas de vehículo)
 * 4. Genera supabase/fix-parcel-columns.sql
 *
 * Ejecutar: node scripts/audit-and-fix-schema.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Faltan credenciales en .env.local');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Columnas de VEHÍCULO que NO deben estar en parcels
const VEHICLE_COLUMNS_TO_DROP = [
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

async function probeTable(tableName) {
  const { data, error } = await supabase.from(tableName).select('*').limit(1);
  if (error) return { exists: false, error: error.message };
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
  return { exists: true, columns };
}

async function main() {
  console.log('\n============================================');
  console.log('AUDITORÍA ESQUEMA - Conectando a Supabase');
  console.log('URL:', SUPABASE_URL);
  console.log('============================================\n');

  const tables = ['parcels', 'parcelas', 'vehicles', 'parcel_categories', 'bookings', 'blocked_dates'];
  const report = [];
  const dropStatements = [];

  for (const t of tables) {
    const r = await probeTable(t);
    if (r.exists) {
      console.log(`✓ ${t}: ${r.columns.length} columnas`);
      report.push({ table: t, columns: r.columns });

      if (t === 'parcels' || t === 'parcelas' || t === 'vehicles') {
        const toDrop = r.columns.length > 0
          ? r.columns.filter(c => VEHICLE_COLUMNS_TO_DROP.includes(c))
          : VEHICLE_COLUMNS_TO_DROP; // Si vacía, asumir que las tiene (schema actual)
        if (toDrop.length > 0) {
          console.log(`  ❌ Columnas de vehículo a eliminar: ${toDrop.length}`);
          toDrop.forEach(c => {
            dropStatements.push(`ALTER TABLE public.${t} DROP COLUMN IF EXISTS ${c};`);
          });
        }
      }
    } else {
      console.log(`✗ ${t}: ${r.error}`);
    }
  }

  // Generar script SQL de corrección
  const fixSql = `-- ===========================================
-- FIX: Eliminar columnas de vehículo de parcels
-- Generado por: node scripts/audit-and-fix-schema.js
-- Ejecutar en Supabase SQL Editor
-- ===========================================

BEGIN;

${dropStatements.join('\n')}

COMMIT;
`;

  const outPath = path.join(__dirname, '..', 'supabase', 'fix-parcel-columns.sql');
  fs.writeFileSync(outPath, fixSql, 'utf8');
  console.log(`\n✓ Script generado: supabase/fix-parcel-columns.sql`);
  console.log(`  (${dropStatements.length} sentencias ALTER TABLE)\n`);
}

main().catch(e => { console.error(e); process.exit(1); });
