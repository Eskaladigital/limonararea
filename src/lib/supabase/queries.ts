/**
 * Queries reutilizables de Supabase
 * Funciones helper para consultas comunes
 *
 * IMPORTANTE: Para datos públicos (parcelas, categorías, etc.) usar el cliente
 * público `supabase` definido abajo. NO usar createClient() de ./server ya que
 * usa cookies y falla en generateMetadata de Next.js 15.
 *
 * @updated 2026-01-23 - Fix error 500 en páginas de parcelas
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClient } from './server';

// Cliente público para queries de datos públicos (sin cookies)
// ⚠️ CRÍTICO: Usar este cliente para parcelas, categorías, etc.
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ==============================================
// PARCELAS
// ==============================================

/**
 * Obtener todas las parcelas (para administrador)
 */
export async function getAllParcels() {
  const supabaseServer = await createClient();
  const { data, error } = await supabaseServer
    .from('parcels')
    .select(`
      *,
      category:parcel_categories(*)
    `)
    .order('internal_code', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Error fetching all parcels:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/** @deprecated Usar getAllParcels */
export const getAllVehicles = getAllParcels;

/**
 * Obtener todas las parcelas disponibles para alquiler
 */
export async function getAvailableParcels() {
  const { data, error } = await supabase
    .from('parcels')
    .select(`
      *,
      category:parcel_categories(*),
      images:parcel_images(*)
    `)
    .eq('is_for_rent', true)
    .neq('status', 'inactive')
    .order('internal_code', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Error fetching parcels:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/** @deprecated Usar getAvailableParcels */
export const getAvailableVehicles = getAvailableParcels;

/**
 * Obtener una parcela por slug (Server-side)
 */
export async function getParcelBySlug(slug: string) {
  const { data, error } = await supabase
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
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching parcel:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/** @deprecated Usar getParcelBySlug */
export const getVehicleBySlug = getParcelBySlug;

/**
 * Obtener parcelas en venta
 */
export async function getParcelsForSale() {
  const { data, error } = await supabase
    .from('parcels')
    .select(`
      *,
      category:parcel_categories(*),
      images:parcel_images(*)
    `)
    .eq('is_for_sale', true)
    .eq('sale_status', 'available')
    .order('internal_code', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Error fetching parcels for sale:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/** @deprecated Usar getParcelsForSale */
export const getVehiclesForSale = getParcelsForSale;

// ==============================================
// CATEGORÍAS
// ==============================================

/**
 * Obtener todas las categorías de parcelas
 */
export async function getParcelCategories() {
  const { data, error } = await supabase
    .from('parcel_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching parcel categories:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/** @deprecated Usar getParcelCategories */
export const getVehicleCategories = getParcelCategories;

// ==============================================
// UBICACIONES
// ==============================================

/**
 * Obtener ubicaciones activas
 */
export async function getActiveLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching locations:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

// ==============================================
// EXTRAS
// ==============================================

/**
 * Obtener extras activos
 */
export async function getActiveExtras() {
  const { data, error } = await supabase
    .from('extras')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching extras:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

// ==============================================
// BLOG/PUBLICACIONES
// ==============================================

/**
 * Obtener posts publicados
 */
export async function getPublishedPosts(postType?: 'blog' | 'publication' | 'news') {
  let query = supabase
    .from('posts')
    .select(`
      *,
      category:content_categories(*),
      author:admins(*)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (postType) {
    query = query.eq('post_type', postType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Obtener un post por slug
 */
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:content_categories(*),
      author:admins(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

// ==============================================
// FUNCIONES AVANZADAS (Server-side con service_role)
// ==============================================

/**
 * Verificar disponibilidad de una parcela (RPC; nombre en BD: check_vehicle_availability)
 */
export async function checkParcelAvailability(
  parcelId: string,
  pickupDate: string,
  dropoffDate: string
) {
  const { data, error } = await supabase
    .rpc('check_vehicle_availability', {
      p_vehicle_id: parcelId,
      p_pickup_date: pickupDate,
      p_dropoff_date: dropoffDate,
    });

  if (error) {
    console.error('Error checking parcel availability:', error);
    return { available: false, error };
  }

  return { available: data, error: null };
}

/** @deprecated Usar checkParcelAvailability */
export const checkVehicleAvailability = checkParcelAvailability;

/**
 * Crear una reserva (Server-side)
 * Nota: Esta función debería llamarse desde una API route
 */
export async function createBooking(bookingData: any) {
  const supabaseServer = await createClient();
  const { data, error } = await supabaseServer
    .from('bookings')
    .insert(bookingData)
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

// ==============================================
// RESERVAS (ADMINISTRADOR)
// ==============================================

/**
 * Obtener todas las reservas (para administrador)
 */
export async function getAllBookings() {
  const supabaseServer = await createClient();
  const { data, error } = await supabaseServer
    .from('bookings')
    .select(`
      *,
      parcel:parcels(id, name, slug, internal_code),
      customer:customers(id, name, email, phone)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all bookings:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Obtener estadísticas avanzadas del dashboard
 */
export async function getDashboardStats() {
  const supabaseServer = await createClient();
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString();
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0).toISOString();
  
  // 1. PARCELAS
  const { data: parcelsData } = await supabaseServer
    .from('parcels')
    .select('id, name, status, is_for_rent, base_price_per_day');

  // 2. RESERVAS (completas con relaciones)
  const { data: bookingsData } = await supabaseServer
    .from('bookings')
    .select(`
      id, 
      status, 
      payment_status,
      total_price, 
      amount_paid,
      pickup_date, 
      dropoff_date,
      pickup_time,
      dropoff_time,
      created_at, 
      parcel_id,
      customer_id,
      customer_name,
      parcel:parcels(name),
      customer:customers(name, total_bookings)
    `);
  
  // 3. PAGOS
  const { data: paymentsData } = await supabaseServer
    .from('payments')
    .select('id, amount, status, created_at, booking_id');
  
  // 4. DAÑOS PENDIENTES (tabla legacy vehicle_damages - no existe en Eco Area)
  let damagesData: { id: string }[] | null = null;
  const { data: damagesResult } = await supabaseServer
    .from('vehicle_damages')
    .select('id, vehicle_id, severity, repair_cost, status')
    .neq('status', 'repaired');
  // Si la tabla no existe (Eco Area), Supabase devuelve error; ignorar
  if (damagesResult) damagesData = damagesResult;

  // ===== CÁLCULOS =====
  // Parcelas disponibles (considerando reservas activas HOY)
  // IMPORTANTE: misma lógica que el calendario (status !== 'cancelled', rango fechas)
  const activeBookings = bookingsData?.filter(b =>
    b.status !== 'cancelled' &&
    b.pickup_date <= todayStr &&
    b.dropoff_date >= todayStr
  ) || [];

  const occupiedParcelIds = new Set(activeBookings.map(b => b.parcel_id));
  const totalParcels = parcelsData?.length || 0;
  const availableParcels = totalParcels - occupiedParcelIds.size;
  const parcelsInMaintenance = parcelsData?.filter(p => p.status === 'maintenance').length || 0;
  
  // Tasa de ocupación (últimos 30 días)
  const last30DaysBookings = bookingsData?.filter(b => 
    b.pickup_date >= thirtyDaysAgo && 
    b.status !== 'cancelled'
  ) || [];
  
  const totalDaysAvailable = totalParcels * 30;
  const totalDaysRented = last30DaysBookings.reduce((sum, b) => {
    const start = new Date(b.pickup_date);
    const end = new Date(b.dropoff_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return sum + days;
  }, 0);
  const occupancyRate = totalDaysAvailable > 0 ? (totalDaysRented / totalDaysAvailable) * 100 : 0;
  
  // Reservas por estado
  const todayBookings = bookingsData?.filter(b => b.pickup_date === todayStr).length || 0;
  const pendingBookings = bookingsData?.filter(b => b.status === 'pending').length || 0;
  const confirmedBookings = bookingsData?.filter(b => b.status === 'confirmed').length || 0;
  const inProgressBookings = bookingsData?.filter(b => b.status === 'in_progress').length || 0;
  const completedBookings = bookingsData?.filter(b => b.status === 'completed').length || 0;
  
  // Ingresos
  const monthRevenue = bookingsData?.filter(b => 
    b.created_at >= firstDayOfMonth && 
    (b.status === 'confirmed' || b.status === 'completed' || b.status === 'in_progress')
  ).reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;
  
  const lastMonthRevenue = bookingsData?.filter(b => 
    b.created_at >= lastMonth && 
    b.created_at <= lastMonthEnd &&
    (b.status === 'confirmed' || b.status === 'completed' || b.status === 'in_progress')
  ).reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;
  
  const totalRevenue = bookingsData?.filter(b => 
    b.status === 'confirmed' || b.status === 'completed' || b.status === 'in_progress'
  ).reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;
  
  const pendingRevenue = bookingsData?.filter(b => 
    b.status !== 'cancelled' && 
    (b.payment_status === 'pending' || b.payment_status === 'partial')
  ).reduce((sum, b) => sum + ((b.total_price || 0) - (b.amount_paid || 0)), 0) || 0;
  
  // Ingreso promedio por reserva
  const confirmedAndCompleted = bookingsData?.filter(b => 
    b.status === 'confirmed' || b.status === 'completed' || b.status === 'in_progress'
  ) || [];
  const averageBookingValue = confirmedAndCompleted.length > 0 
    ? totalRevenue / confirmedAndCompleted.length 
    : 0;
  
  // Parcela más rentable (últimos 30 días)
  const parcelRevenue = new Map<string, { name: string; revenue: number; bookings: number }>();
  last30DaysBookings.forEach(b => {
    if (b.status !== 'cancelled') {
      const parcelName = b.parcel?.name || 'Desconocido';
      const current = parcelRevenue.get(b.parcel_id) || { name: parcelName, revenue: 0, bookings: 0 };
      parcelRevenue.set(b.parcel_id, {
        name: parcelName,
        revenue: current.revenue + (b.total_price || 0),
        bookings: current.bookings + 1
      });
    }
  });
  
  const topParcel = Array.from(parcelRevenue.values())
    .sort((a, b) => b.revenue - a.revenue)[0] || null;
  
  // Cliente más frecuente
  const customerBookings = new Map<string, { name: string; bookings: number; spent: number }>();
  bookingsData?.forEach(b => {
    if (b.customer_id && b.status !== 'cancelled') {
      const customerName = b.customer?.name || b.customer_name || 'Desconocido';
      const current = customerBookings.get(b.customer_id) || { name: customerName, bookings: 0, spent: 0 };
      customerBookings.set(b.customer_id, {
        name: customerName,
        bookings: current.bookings + 1,
        spent: current.spent + (b.total_price || 0)
      });
    }
  });
  
  const topCustomer = Array.from(customerBookings.values())
    .sort((a, b) => b.bookings - a.bookings)[0] || null;
  
  // Alertas (parcelas no tienen ITV; se mantiene 0 por compatibilidad)
  const itvAlerts = 0;
  
  const pendingPayments = bookingsData?.filter(b => 
    b.status !== 'cancelled' && 
    b.payment_status === 'pending'
  ).length || 0;
  
  const unrepairedDamages = damagesData?.length || 0;
  
  // Gráfico de ingresos últimos 30 días (agrupado por día)
  const revenueByDay = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    revenueByDay.set(dateStr, 0);
  }
  
  bookingsData?.forEach(b => {
    const bookingDate = b.created_at.split('T')[0];
    if (revenueByDay.has(bookingDate) && (b.status === 'confirmed' || b.status === 'completed' || b.status === 'in_progress')) {
      revenueByDay.set(bookingDate, (revenueByDay.get(bookingDate) || 0) + (b.total_price || 0));
    }
  });
  
  const revenueChart = Array.from(revenueByDay.entries()).map(([date, revenue]) => ({
    date,
    revenue
  }));
  
  // Próximas entregas y recogidas (hoy y mañana)
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const upcomingActions = bookingsData?.filter(b => 
    (b.pickup_date === todayStr || b.pickup_date === tomorrow || 
     b.dropoff_date === todayStr || b.dropoff_date === tomorrow) &&
    b.status !== 'cancelled'
  ).map(b => ({
    id: b.id,
    type: b.pickup_date === todayStr || b.pickup_date === tomorrow ? 'pickup' : 'dropoff',
    date: b.pickup_date === todayStr || b.pickup_date === tomorrow ? b.pickup_date : b.dropoff_date,
    time: b.pickup_date === todayStr || b.pickup_date === tomorrow ? b.pickup_time : b.dropoff_time,
    customer: b.customer_name,
    parcel: b.parcel?.name || 'Parcela',
    bookingId: b.id
  })) || [];
  
  return {
    // Básicas
    todayBookings,
    totalParcels,
    availableParcels,
    parcelsInMaintenance,
    
    // Reservas
    pendingBookings,
    confirmedBookings,
    inProgressBookings,
    completedBookings,
    
    // Financiero
    monthRevenue,
    lastMonthRevenue,
    totalRevenue,
    pendingRevenue,
    averageBookingValue,
    
    // Métricas avanzadas
    occupancyRate,
    topParcel,
    topCustomer,
    
    // Alertas
    itvAlerts,
    pendingPayments,
    unrepairedDamages,
    
    // Datos para gráficos
    revenueChart,
    upcomingActions: upcomingActions.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    }).slice(0, 10)
  };
}




