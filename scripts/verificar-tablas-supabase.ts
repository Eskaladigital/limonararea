/**
 * Verifica que las tablas de Supabase usen el esquema PARCEL (no vehicle).
 * Lista tablas esperadas, comprueba que existan y que bookings use parcel_id.
 *
 * Ejecutar: npx tsx scripts/verificar-tablas-supabase.ts
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY/ANON_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

// Tablas que DEBEN existir según SUPABASE-SCHEMA-REAL.md (esquema parcel)
const TABLAS_ESPERADAS = [
  'parcels',
  'parcel_categories',
  'parcel_images',
  'parcel_equipment',
  'equipment',
  'extras',
  'bookings',
  'booking_extras',
  'blocked_dates',
  'seasons',
  'locations',
  'customers',
  'search_queries',
  'payments',
];

// Tablas que NO deben usarse (legacy vehicle)
const TABLAS_LEGACY_EVITAR = ['vehicles', 'vehicle_categories', 'vehicle_images', 'vehicle_equipment'];

async function main() {
  console.log('=== Verificación tablas Supabase (esquema PARCEL) ===\n');

  let ok = true;

  // 1. Comprobar tablas esperadas
  console.log('--- Tablas que deben existir (parcel_*) ---');
  for (const table of TABLAS_ESPERADAS) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .limit(0);
    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
      ok = false;
    } else {
      console.log(`✅ ${table}${count != null ? ` (≈${count} filas)` : ''}`);
    }
  }

  // 2. Comprobar que NO existan tablas "vehicle" (o avisar si existen)
  console.log('\n--- Tablas legacy "vehicle" (no usar en app) ---');
  for (const table of TABLAS_LEGACY_EVITAR) {
    const { error } = await supabase.from(table).select('*').limit(0);
    if (error) {
      console.log(`✅ ${table}: no existe (correcto, usar parcel_*)`);
    } else {
      console.log(`⚠️ ${table}: EXISTE - la app debe usar parcel_* en su lugar`);
    }
  }

  // 3. bookings debe tener parcel_id (no vehicle_id)
  console.log('\n--- Columna en bookings (debe ser parcel_id) ---');
  const { data: bookingSample, error: bookingError } = await supabase
    .from('bookings')
    .select('parcel_id')
    .limit(1);
  if (bookingError) {
    const errMsg = bookingError.message || '';
    if (errMsg.includes('parcel_id') || errMsg.includes('column')) {
      console.log('❌ bookings: no tiene columna parcel_id. Error:', bookingError.message);
      ok = false;
    } else {
      console.log('⚠️ bookings:', bookingError.message);
    }
  } else {
    console.log('✅ bookings.parcel_id existe');
  }

  // 4. blocked_dates debe tener parcel_id
  const { error: blockedError } = await supabase
    .from('blocked_dates')
    .select('parcel_id')
    .limit(1);
  if (blockedError && (blockedError.message?.includes('parcel_id') || blockedError.message?.includes('column'))) {
    console.log('❌ blocked_dates: no tiene columna parcel_id. Error:', blockedError.message);
    ok = false;
  } else if (!blockedError) {
    console.log('✅ blocked_dates.parcel_id existe');
  }

  console.log('\n=== Resumen ===');
  if (ok) {
    console.log('✅ Esquema correcto: tablas parcel_* y bookings/blocked_dates con parcel_id');
  } else {
    console.log('❌ Hay errores; revisar mensajes arriba.');
  }
  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
