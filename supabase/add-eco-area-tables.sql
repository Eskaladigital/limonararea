-- ===========================================
-- ECO AREA LIMONAR - Tablas adicionales
-- Añade: search_queries, last_minute_offers + RPC get_active_last_minute_offers
--
-- CÓMO APLICAR:
-- 1. Supabase Dashboard → SQL Editor → New query
-- 2. Pegar este archivo completo y Run
--
-- O con DATABASE_URL en .env.local:
--   node scripts/apply-eco-area-tables.js
-- ===========================================

-- ===========================================
-- 1. SEARCH_QUERIES (tracking de búsquedas y conversión)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  searched_at TIMESTAMPTZ DEFAULT now(),
  pickup_date DATE NOT NULL,
  dropoff_date DATE NOT NULL,
  pickup_time TEXT DEFAULT '10:00',
  dropoff_time TEXT DEFAULT '10:00',
  rental_days INT NOT NULL,
  advance_days INT,
  pickup_location TEXT,
  dropoff_location TEXT,
  pickup_location_id UUID REFERENCES public.locations(id),
  dropoff_location_id UUID REFERENCES public.locations(id),
  same_location BOOLEAN DEFAULT true,
  category_slug TEXT,
  parcels_available_count INT DEFAULT 0,
  season_applied TEXT,
  avg_price_shown NUMERIC(10,2),
  had_availability BOOLEAN DEFAULT false,
  parcel_selected BOOLEAN DEFAULT false,
  selected_parcel_id UUID REFERENCES public.parcels(id),
  selected_parcel_price NUMERIC(10,2),
  parcel_selected_at TIMESTAMPTZ,
  time_to_select_seconds INT,
  booking_created BOOLEAN DEFAULT false,
  booking_id UUID REFERENCES public.bookings(id),
  booking_created_at TIMESTAMPTZ,
  time_to_booking_seconds INT,
  total_conversion_seconds INT,
  funnel_stage TEXT DEFAULT 'search_only' CHECK (funnel_stage IN ('search_only', 'parcel_selected', 'booking_created')),
  locale TEXT,
  user_agent_type TEXT CHECK (user_agent_type IN ('mobile', 'desktop', 'tablet')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_search_queries_session ON public.search_queries(session_id);
CREATE INDEX IF NOT EXISTS idx_search_queries_searched_at ON public.search_queries(searched_at);
CREATE INDEX IF NOT EXISTS idx_search_queries_funnel ON public.search_queries(funnel_stage);

-- RLS
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_all_search_queries" ON public.search_queries;
CREATE POLICY "admin_all_search_queries" ON public.search_queries FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "public_insert_search_queries" ON public.search_queries;
CREATE POLICY "public_insert_search_queries" ON public.search_queries FOR INSERT WITH CHECK (true);

-- ===========================================
-- 2. LAST_MINUTE_OFFERS (ofertas última hora)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.last_minute_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id UUID NOT NULL REFERENCES public.parcels(id) ON DELETE CASCADE,
  pickup_location_id UUID REFERENCES public.locations(id),
  dropoff_location_id UUID REFERENCES public.locations(id),
  detected_start_date DATE,
  detected_end_date DATE,
  detected_days INT,
  offer_start_date DATE NOT NULL,
  offer_end_date DATE NOT NULL,
  offer_days INT NOT NULL,
  original_price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount_percentage INT NOT NULL DEFAULT 0,
  final_price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'detected' CHECK (status IN ('detected','published','reserved','expired','ignored')),
  booking_id UUID REFERENCES public.bookings(id),
  previous_booking_id UUID,
  next_booking_id UUID,
  admin_notes TEXT,
  detected_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ,
  reserved_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_last_minute_offers_parcel ON public.last_minute_offers(parcel_id);
CREATE INDEX IF NOT EXISTS idx_last_minute_offers_status ON public.last_minute_offers(status);
CREATE INDEX IF NOT EXISTS idx_last_minute_offers_dates ON public.last_minute_offers(offer_start_date, offer_end_date);

-- RLS
ALTER TABLE public.last_minute_offers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_published_offers" ON public.last_minute_offers;
CREATE POLICY "public_read_published_offers" ON public.last_minute_offers FOR SELECT
  USING (status = 'published');
DROP POLICY IF EXISTS "admin_all_last_minute_offers" ON public.last_minute_offers;
CREATE POLICY "admin_all_last_minute_offers" ON public.last_minute_offers FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);

-- ===========================================
-- 3. RPC get_active_last_minute_offers
-- ===========================================
CREATE OR REPLACE FUNCTION public.get_active_last_minute_offers()
RETURNS TABLE (
  id UUID,
  parcel_id UUID,
  parcel_name TEXT,
  parcel_slug TEXT,
  parcel_image_url TEXT,
  parcel_internal_code TEXT,
  offer_start_date DATE,
  offer_end_date DATE,
  offer_days INT,
  original_price_per_day NUMERIC,
  discount_percentage INT,
  final_price_per_day NUMERIC,
  total_original_price NUMERIC,
  total_final_price NUMERIC,
  savings NUMERIC,
  pickup_location_id UUID,
  pickup_location_name TEXT,
  pickup_location_address TEXT,
  dropoff_location_id UUID,
  dropoff_location_name TEXT,
  dropoff_location_address TEXT,
  status TEXT
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    o.id,
    o.parcel_id,
    p.name AS parcel_name,
    p.slug AS parcel_slug,
    (SELECT pi.image_url FROM parcel_images pi WHERE pi.parcel_id = o.parcel_id AND pi.is_primary LIMIT 1) AS parcel_image_url,
    p.internal_code AS parcel_internal_code,
    o.offer_start_date,
    o.offer_end_date,
    o.offer_days,
    o.original_price_per_day,
    o.discount_percentage,
    o.final_price_per_day,
    o.original_price_per_day * o.offer_days AS total_original_price,
    o.final_price_per_day * o.offer_days AS total_final_price,
    (o.original_price_per_day - o.final_price_per_day) * o.offer_days AS savings,
    o.pickup_location_id,
    pl.name AS pickup_location_name,
    pl.address AS pickup_location_address,
    o.dropoff_location_id,
    dl.name AS dropoff_location_name,
    dl.address AS dropoff_location_address,
    o.status
  FROM last_minute_offers o
  JOIN parcels p ON p.id = o.parcel_id
  LEFT JOIN locations pl ON pl.id = o.pickup_location_id
  LEFT JOIN locations dl ON dl.id = o.dropoff_location_id
  WHERE o.status = 'published'
    AND o.offer_end_date >= CURRENT_DATE
  ORDER BY o.offer_start_date;
$$;
