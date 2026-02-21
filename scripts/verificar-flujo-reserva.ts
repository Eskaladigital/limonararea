/**
 * Verifica el flujo de reserva contra Supabase:
 * 1. Búsqueda: parcelas disponibles (misma query que /api/availability)
 * 2. Detalle: cargar una parcela por ID (misma query que /reservar/parcela)
 * 3. Extras y ubicaciones
 *
 * Ejecutar: npx dotenv -e .env.local -- npx tsx scripts/verificar-flujo-reserva.ts
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

// Fechas de prueba: hoy + 7 y hoy + 10
const today = new Date();
const pickupDate = new Date(today);
pickupDate.setDate(pickupDate.getDate() + 7);
const dropoffDate = new Date(today);
dropoffDate.setDate(dropoffDate.getDate() + 10);
const pickupStr = pickupDate.toISOString().slice(0, 10);
const dropoffStr = dropoffDate.toISOString().slice(0, 10);

async function main() {
  console.log('=== Verificación flujo reserva (Supabase) ===\n');
  console.log('Fechas de prueba:', pickupStr, '->', dropoffStr);

  let ok = true;

  // --- 1. Query igual que /api/availability: parcelas para búsqueda ---
  console.log('\n--- 1. Búsqueda (parcelas disponibles) ---');
  const { data: parcels, error: parcelsError } = await supabase
    .from('parcels')
    .select(`
      *,
      category:parcel_categories(*),
      images:parcel_images(*),
      parcel_equipment(
        id,
        equipment(*)
      )
    `)
    .eq('is_for_rent', true)
    .eq('status', 'available')
    .order('sort_order', { ascending: true });

  if (parcelsError) {
    console.log('❌ Error parcelas:', parcelsError.message);
    ok = false;
  } else {
    console.log('✅ Parcelas (is_for_rent, status=available):', parcels?.length ?? 0);
    if (parcels?.length) {
      const p = parcels[0];
      console.log('   Primera:', p.name, '| id:', p.id, '| category:', (p as any).category?.name ?? 'sin categoria');
    }
  }

  // --- 2. Query igual que /reservar/parcela: una parcela por ID con category ---
  const parcelId = parcels?.[0]?.id;
  if (!parcelId) {
    console.log('\n--- 2. Detalle parcela (reservar/parcela) ---');
    console.log('⏭️ Sin parcelas, no se puede probar carga por ID');
  } else {
    console.log('\n--- 2. Detalle parcela (reservar/parcela) ---');
    const { data: parcelDetail, error: detailError } = await supabase
      .from('parcels')
      .select(`
        *,
        category:parcel_categories(*),
        images:parcel_images(*),
        parcel_equipment(
          id,
          notes,
          equipment(*)
        )
      `)
      .eq('id', parcelId)
      .eq('is_for_rent', true)
      .neq('status', 'inactive')
      .single();

    if (detailError) {
      console.log('❌ Error detalle parcela:', detailError.message);
      ok = false;
    } else if (!parcelDetail) {
      console.log('❌ Parcela no encontrada para id:', parcelId);
      ok = false;
    } else {
      const cat = (parcelDetail as any).category;
      console.log('✅ Parcela cargada:', parcelDetail.name);
      console.log('   category:', cat ? `${cat.name} (slug: ${cat.slug})` : 'FALTA (revisar relación)');
      console.log('   images:', (parcelDetail as any).images?.length ?? 0);
      console.log('   parcel_equipment:', (parcelDetail as any).parcel_equipment?.length ?? 0);
    }
  }

  // --- 3. Extras (igual que reservar/parcela) ---
  console.log('\n--- 3. Extras activos ---');
  const { data: extras, error: extrasError } = await supabase
    .from('extras')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (extrasError) {
    console.log('❌ Error extras:', extrasError.message);
    ok = false;
  } else {
    console.log('✅ Extras activos:', extras?.length ?? 0);
  }

  // --- 4. Ubicaciones (location fee) ---
  console.log('\n--- 4. Ubicaciones (fee) ---');
  const { data: locations, error: locError } = await supabase
    .from('locations')
    .select('slug, extra_fee')
    .in('slug', ['los-nietos', 'cartagena']);

  if (locError) {
    console.log('❌ Error locations:', locError.message);
    ok = false;
  } else {
    console.log('✅ Locations:', locations?.length ?? 0, locations ?? []);
  }

  // --- 5. Reservas y bloqueos (solapamiento fechas prueba) ---
  console.log('\n--- 5. Disponibilidad (bookings + blocked_dates) ---');
  const { data: conflictingBookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('parcel_id')
    .neq('status', 'cancelled')
    .in('payment_status', ['partial', 'paid'])
    .or(`and(pickup_date.lte.${dropoffStr},dropoff_date.gte.${pickupStr})`);

  if (bookingsError) {
    console.log('❌ Error bookings:', bookingsError.message);
    ok = false;
  } else {
    console.log('✅ Reservas que solapan:', conflictingBookings?.length ?? 0);
  }

  const { data: blockedDates, error: blockedError } = await supabase
    .from('blocked_dates')
    .select('parcel_id')
    .or(`and(start_date.lte.${dropoffStr},end_date.gte.${pickupStr})`);

  if (blockedError) {
    console.log('❌ Error blocked_dates:', blockedError.message);
    ok = false;
  } else {
    console.log('✅ Bloqueos que solapan:', blockedDates?.length ?? 0);
  }

  // --- 6. Temporadas (para precios) ---
  console.log('\n--- 6. Temporadas activas ---');
  const { data: seasons, error: seasonsError } = await supabase
    .from('seasons')
    .select('*')
    .eq('is_active', true)
    .lte('start_date', dropoffStr)
    .gte('end_date', pickupStr);

  if (seasonsError) {
    console.log('❌ Error seasons:', seasonsError.message);
    ok = false;
  } else {
    console.log('✅ Temporadas en rango:', seasons?.length ?? 0);
  }

  console.log('\n=== Resultado ===');
  console.log(ok ? '✅ Flujo verificado correctamente' : '❌ Hay errores; revisar mensajes arriba');
  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
