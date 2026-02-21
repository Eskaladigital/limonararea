import { createClient } from "@/lib/supabase/server";
import InformesClient from "./informes-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Informes | Eco Area Limonar",
};

async function getInformesData() {
  const supabase = await createClient();
  
  // Obtener parcelas
  const { data: parcels, error: parcelsError } = await supabase
    .from('parcels')
    .select('id, name, slug, internal_code, is_for_rent, status')
    .order('internal_code', { ascending: true, nullsFirst: false });

  if (parcelsError) {
    console.error('Error fetching parcels:', parcelsError);
  }

  // Obtener todas las reservas con datos de la parcela
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select(`
      id,
      parcel_id,
      customer_id,
      pickup_date,
      dropoff_date,
      total_price,
      status,
      created_at,
      customer_name,
      customer_email,
      days,
      parcel:parcels(id, name, internal_code)
    `)
    .order('pickup_date', { ascending: false });

  if (bookingsError) {
    console.error('Error fetching bookings:', bookingsError);
  }

  // Obtener temporadas
  const { data: seasons, error: seasonsError } = await supabase
    .from('seasons')
    .select('id, name, slug, start_date, end_date, is_active')
    .order('start_date', { ascending: true });

  if (seasonsError) {
    console.error('Error fetching seasons:', seasonsError);
  }

  return { 
    vehicles: parcels || [], 
    bookings: bookings || [], 
    seasons: seasons || [] 
  };
}

export default async function InformesPage() {
  const { vehicles, bookings, seasons } = await getInformesData();

  return (
    <InformesClient
      vehicles={vehicles}
      bookings={bookings}
      seasons={seasons}
    />
  );
}
