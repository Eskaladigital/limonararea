/**
 * Script para verificar qué tablas existen en Supabase.
 * Ejecutar: npx dotenv -e .env.local -- npx tsx scripts/check-supabase-schema.ts
 * Requiere: .env.local con NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  // Listar tablas del schema public
  const { data: tables, error } = await supabase.rpc('get_tables', {});
  
  // Si no existe la función, usar query directa
  const { data: raw, error: rawError } = await supabase
    .from('information_schema' as any)
    .select('*');

  // Tablas del esquema parcel (Eco Area Limonar)
  const knownTables = [
    'admins', 'parcels', 'parcel_categories', 'parcel_images', 'parcel_equipment',
    'parcel_available_extras', 'equipment', 'extras', 'bookings', 'booking_extras',
    'customers', 'seasons', 'locations', 'payments', 'blocked_dates',
    'posts', 'content_categories', 'content_translations', 'coupons', 'coupon_usage'
  ];

  console.log('=== Verificación de tablas en Supabase ===\n');

  for (const table of knownTables) {
    try {
      const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: false }).limit(1);
      if (error) {
        console.log(`❌ ${table}: ${error.message} (code: ${error.code})`);
      } else {
        console.log(`✅ ${table}: existe${count != null ? ` (${count} filas)` : ''}`);
      }
    } catch (e) {
      console.log(`❌ ${table}: ${(e as Error).message}`);
    }
  }

  // Probar admins específicamente (create-first-admin lo crea)
  console.log('\n=== Tabla admins ===');
  const { data: admins } = await supabase.from('admins').select('*');
  console.log('Admins:', admins?.length ?? 0, admins ?? []);
}

main().catch(console.error);
