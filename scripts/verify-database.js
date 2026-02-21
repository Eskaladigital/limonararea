/**
 * VERIFICACIÓN COMPLETA DE LA BASE DE DATOS - Eco Area Limonar
 * Conecta con .env.local y verifica:
 * - Tablas existentes y columnas esperadas
 * - Nuevas columnas (adults, children en bookings; max_adults, max_children en parcels)
 * - Conteo de registros
 * - Integridad referencial básica
 *
 * Ejecutar: node scripts/verify-database.js
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

// Esquema esperado: tablas y columnas requeridas
const SCHEMA = {
  parcel_categories: ['id', 'name', 'slug', 'sort_order', 'is_active'],
  parcels: ['id', 'name', 'slug', 'category_id', 'base_price_per_day', 'status', 'is_for_rent', 'max_adults', 'max_children'],
  parcel_images: ['id', 'parcel_id', 'image_url', 'is_primary'],
  equipment: ['id', 'name', 'slug', 'is_active'],
  parcel_equipment: ['id', 'parcel_id', 'equipment_id'],
  extras: ['id', 'name', 'price_type', 'is_active'],
  parcel_available_extras: ['id', 'parcel_id', 'extra_id'],
  locations: ['id', 'name', 'slug', 'extra_fee', 'is_active'],
  customers: ['id', 'email', 'name'],
  seasons: ['id', 'name', 'slug', 'start_date', 'end_date', 'min_days', 'is_active'],
  bookings: ['id', 'parcel_id', 'pickup_date', 'dropoff_date', 'days', 'total_price', 'status', 'adults', 'children'],
  booking_extras: ['id', 'booking_id', 'extra_id', 'quantity', 'total_price'],
  payments: ['id', 'booking_id', 'amount', 'status'],
  blocked_dates: ['id', 'parcel_id', 'start_date', 'end_date'],
};

// Tablas opcionales (pueden no existir)
const OPTIONAL_TABLES = ['search_queries', 'admins', 'coupons', 'coupon_usage', 'posts', 'post_categories'];

async function probeTable(tableName, selectCols = '*') {
  const { data, error } = await supabase.from(tableName).select(selectCols).limit(1);
  if (error) return { exists: false, error: error.message };
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
  return { exists: true, columns };
}

/** Comprueba si una columna existe (funciona aunque la tabla esté vacía) */
async function columnExists(tableName, columnName) {
  const { error } = await supabase.from(tableName).select(columnName).limit(1);
  return !error;
}

async function countTable(tableName) {
  const { count, error } = await supabase.from(tableName).select('*', { count: 'exact', head: true });
  if (error) return null;
  return count;
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('  VERIFICACIÓN BASE DE DATOS - Eco Area Limonar');
  console.log('  URL:', SUPABASE_URL);
  console.log('='.repeat(60) + '\n');

  const issues = [];
  const fixSql = [];
  const counts = {};

  // 1. Verificar tablas principales
  console.log('📋 1. TABLAS Y COLUMNAS\n');

  for (const [tableName, requiredCols] of Object.entries(SCHEMA)) {
    const r = await probeTable(tableName);
    if (r.exists) {
      counts[tableName] = await countTable(tableName);
      // Si tabla vacía, no podemos verificar columnas desde select
      if (r.columns.length === 0) {
        console.log(`   ○ ${tableName}: vacía (${counts[tableName]} registros) - columnas no verificadas`);
      } else {
        const missing = requiredCols.filter(c => !r.columns.includes(c));
        if (missing.length > 0) {
          console.log(`   ❌ ${tableName}: Faltan columnas: ${missing.join(', ')}`);
          issues.push(`Tabla ${tableName}: faltan ${missing.join(', ')}`);
          if (tableName === 'bookings' && (missing.includes('adults') || missing.includes('children'))) {
            fixSql.push('-- Añadir a bookings:');
            if (missing.includes('adults')) fixSql.push('ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS adults INT DEFAULT 2;');
            if (missing.includes('children')) fixSql.push('ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS children INT DEFAULT 0;');
          }
          if (tableName === 'parcels' && (missing.includes('max_adults') || missing.includes('max_children'))) {
            fixSql.push('-- Añadir a parcels:');
            if (missing.includes('max_adults')) fixSql.push('ALTER TABLE public.parcels ADD COLUMN IF NOT EXISTS max_adults INT;');
            if (missing.includes('max_children')) fixSql.push('ALTER TABLE public.parcels ADD COLUMN IF NOT EXISTS max_children INT;');
          }
        } else {
          console.log(`   ✓ ${tableName}: OK (${r.columns.length} columnas, ${counts[tableName]} registros)`);
        }
      }
    } else {
      console.log(`   ❌ ${tableName}: ${r.error}`);
      issues.push(`Tabla ${tableName}: no existe o error - ${r.error}`);
    }
  }

  // 2. Tablas opcionales
  console.log('\n📋 2. TABLAS OPCIONALES\n');
  for (const tableName of OPTIONAL_TABLES) {
    const r = await probeTable(tableName);
    if (r.exists) {
      counts[tableName] = await countTable(tableName);
      console.log(`   ✓ ${tableName}: existe (${counts[tableName] ?? 0} registros)`);
    } else {
      console.log(`   ○ ${tableName}: no existe (opcional)`);
    }
  }

  // 3. Conteo de registros
  console.log('\n📊 3. CONTEO DE REGISTROS\n');
  const keyTables = ['parcels', 'parcel_categories', 'bookings', 'customers', 'locations', 'seasons', 'extras'];
  for (const t of keyTables) {
    const c = counts[t];
    console.log(`   ${t}: ${c !== null && c !== undefined ? c : '?'}`);
  }

  // 4. Verificar columnas críticas en tablas vacías (adults, children, max_adults, max_children)
  console.log('\n📋 4. COLUMNAS CRÍTICAS (tablas vacías)\n');
  const criticalChecks = [
    { table: 'bookings', column: 'adults', desc: 'bookings.adults' },
    { table: 'bookings', column: 'children', desc: 'bookings.children' },
    { table: 'parcels', column: 'max_adults', desc: 'parcels.max_adults' },
    { table: 'parcels', column: 'max_children', desc: 'parcels.max_children' },
  ];
  for (const { table, column, desc } of criticalChecks) {
    const exists = await columnExists(table, column);
    if (exists) {
      console.log(`   ✓ ${desc}`);
    } else {
      console.log(`   ❌ ${desc} - NO EXISTE`);
      issues.push(`Falta columna ${desc}`);
      if (table === 'bookings') {
        if (column === 'adults') fixSql.push('ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS adults INT DEFAULT 2;');
        if (column === 'children') fixSql.push('ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS children INT DEFAULT 0;');
      }
      if (table === 'parcels') {
        if (column === 'max_adults') fixSql.push('ALTER TABLE public.parcels ADD COLUMN IF NOT EXISTS max_adults INT;');
        if (column === 'max_children') fixSql.push('ALTER TABLE public.parcels ADD COLUMN IF NOT EXISTS max_children INT;');
      }
    }
  }

  // 5. Integridad básica
  console.log('\n🔗 5. INTEGRIDAD REFERENCIAL\n');

  // Bookings con parcel_id que no existe
  const { data: bookings } = await supabase.from('bookings').select('parcel_id');
  const { data: parcelIds } = await supabase.from('parcels').select('id');
  const validParcelIds = new Set((parcelIds || []).map(p => p.id));
  if (bookings?.length) {
    const orphanBookings = bookings.filter(b => b.parcel_id && !validParcelIds.has(b.parcel_id));
    if (orphanBookings.length > 0) {
      console.log(`   ❌ ${orphanBookings.length} bookings con parcel_id inexistente`);
      issues.push(`${orphanBookings.length} bookings huérfanos (parcel_id no existe)`);
    } else {
      console.log(`   ✓ Bookings: todos los parcel_id son válidos`);
    }
  }

  // Parcelas sin categoría (category_id null está permitido)
  const { data: parcelsNoCat } = await supabase.from('parcels').select('id').is('category_id', null);
  if (parcelsNoCat?.length > 0) {
    console.log(`   ⚠ ${parcelsNoCat.length} parcelas sin categoría (category_id null)`);
  }

  // Locations: debe haber al menos una (murcia o los-nietos según config)
  const locCount = counts['locations'] ?? 0;
  if (locCount === 0) {
    console.log(`   ❌ No hay locations - necesaria al menos una`);
    issues.push('Falta al menos una location');
  } else {
    const { data: locs } = await supabase.from('locations').select('slug');
    const slugs = (locs || []).map(l => l.slug).filter(Boolean);
    const hasMurcia = slugs.includes('murcia');
    const hasLosNietos = slugs.includes('los-nietos');
    if (hasMurcia || hasLosNietos) {
      console.log(`   ✓ Location OK (slugs: ${slugs.join(', ')})`);
    } else {
      console.log(`   ⚠ Locations existen pero sin slug murcia/los-nietos (actual: ${slugs.join(', ')})`);
      issues.push(`Location: se espera slug murcia o los-nietos. Actual: ${slugs.join(', ')}`);
    }
  }

  // 6. Resumen
  console.log('\n' + '='.repeat(60));
  console.log('  RESUMEN');
  console.log('='.repeat(60));
  if (issues.length === 0) {
    console.log('\n   ✅ Base de datos OK. No se detectaron problemas.\n');
  } else {
    console.log('\n   ⚠ Problemas detectados:\n');
    issues.forEach(i => console.log(`   - ${i}`));
    if (fixSql.length > 0) {
      console.log('\n   SQL de corrección (ejecutar en Supabase SQL Editor):\n');
      fixSql.forEach(s => console.log(`   ${s}`));
      console.log('\n   O ejecutar: supabase/add-booking-adults-children.sql\n');
    }
    console.log('');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
