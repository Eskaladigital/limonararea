-- ===========================================
-- ECO AREA LIMONAR - Esquema completo
-- Ejecutar en Supabase: SQL Editor > New query > Pegar y Run
-- Orden: 1) schema 2) seed-data (opcional)
-- ===========================================

-- ===========================================
-- 1. PARCEL_CATEGORIES (tipos de parcela: Estándar, Premium...)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.parcel_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- 2. PARCELS (columnas propias de parcela)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.parcels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.parcel_categories(id) ON DELETE SET NULL,
  internal_code TEXT,
  description TEXT,
  short_description TEXT,
  -- Dimensiones parcela (metros)
  length_m NUMERIC(6,2),
  width_m NUMERIC(6,2),
  -- Precio base
  base_price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'available' CHECK (status IN ('available','maintenance','rented','inactive')),
  sort_order INT DEFAULT 0,
  is_for_rent BOOLEAN DEFAULT true,
  features JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_parcels_slug ON public.parcels(slug);
CREATE INDEX IF NOT EXISTS idx_parcels_category ON public.parcels(category_id);
CREATE INDEX IF NOT EXISTS idx_parcels_status ON public.parcels(status);
CREATE INDEX IF NOT EXISTS idx_parcels_is_for_rent ON public.parcels(is_for_rent);

-- ===========================================
-- 3. PARCEL_IMAGES (imágenes de parcelas)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.parcel_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id UUID NOT NULL REFERENCES public.parcels(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_parcel_images_parcel ON public.parcel_images(parcel_id);

-- ===========================================
-- 4. EQUIPMENT (características: superficie, orientación, sombra, césped...)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  is_standard BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- 5. PARCEL_EQUIPMENT (parcela <-> características)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.parcel_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id UUID NOT NULL REFERENCES public.parcels(id) ON DELETE CASCADE,
  equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(parcel_id, equipment_id)
);

CREATE INDEX IF NOT EXISTS idx_parcel_equipment_parcel ON public.parcel_equipment(parcel_id);
CREATE INDEX IF NOT EXISTS idx_parcel_equipment_equipment ON public.parcel_equipment(equipment_id);

-- ===========================================
-- 6. EXTRAS (servicios: luz, wifi, agua...)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.extras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_per_day NUMERIC(10,2) DEFAULT 0,
  price_per_rental NUMERIC(10,2) DEFAULT 0,
  price_type TEXT DEFAULT 'per_day' CHECK (price_type IN ('per_day','per_rental','one_time','per_unit')),
  min_quantity INT,
  max_quantity INT DEFAULT 1,
  price_per_unit NUMERIC(10,2),
  image_url TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(name)
);

-- ===========================================
-- 7. PARCEL_AVAILABLE_EXTRAS (parcela <-> extras disponibles)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.parcel_available_extras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id UUID NOT NULL REFERENCES public.parcels(id) ON DELETE CASCADE,
  extra_id UUID NOT NULL REFERENCES public.extras(id) ON DELETE CASCADE,
  default_quantity INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(parcel_id, extra_id)
);

CREATE INDEX IF NOT EXISTS idx_parcel_available_extras_parcel ON public.parcel_available_extras(parcel_id);

-- ===========================================
-- 8. LOCATIONS (una sola: Eco Area Limonar, Los Nietos)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  phone TEXT,
  email TEXT,
  opening_time TEXT DEFAULT '00:00',
  closing_time TEXT DEFAULT '23:59',
  is_pickup BOOLEAN DEFAULT true,
  is_dropoff BOOLEAN DEFAULT true,
  extra_fee NUMERIC(10,2) DEFAULT 0,
  min_days INT,
  active_from DATE,
  active_until DATE,
  active_recurring BOOLEAN DEFAULT true,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- 9. CUSTOMERS
-- ===========================================
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  dni TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  driver_license TEXT,
  driver_license_expiry DATE,
  date_of_birth DATE,
  notes TEXT,
  total_bookings INT DEFAULT 0,
  total_spent NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- 10. SEASONS (temporadas y precios)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  year INT,
  min_days INT DEFAULT 1,
  base_price_per_day NUMERIC(10,2) DEFAULT 0,
  price_less_than_week NUMERIC(10,2),
  price_one_week NUMERIC(10,2),
  price_two_weeks NUMERIC(10,2),
  price_three_weeks NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- 11. BOOKINGS
-- ===========================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE,
  parcel_id UUID NOT NULL REFERENCES public.parcels(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  pickup_location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE RESTRICT,
  dropoff_location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE RESTRICT,
  pickup_date DATE NOT NULL,
  pickup_time TEXT NOT NULL DEFAULT '10:00',
  dropoff_date DATE NOT NULL,
  dropoff_time TEXT NOT NULL DEFAULT '10:00',
  days INT NOT NULL,
  base_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  extras_price NUMERIC(12,2) DEFAULT 0,
  location_fee NUMERIC(12,2) DEFAULT 0,
  discount NUMERIC(12,2) DEFAULT 0,
  total_price NUMERIC(12,2) NOT NULL,
  amount_paid NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','in_progress','completed','cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','partial','paid','refunded')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_dni TEXT,
  customer_address TEXT,
  customer_city TEXT,
  customer_postal_code TEXT,
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_parcel ON public.bookings(parcel_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON public.bookings(pickup_date, dropoff_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Trigger para booking_number
CREATE OR REPLACE FUNCTION generate_booking_number() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
    NEW.booking_number := 'RES-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(NEW.id::TEXT, 1, 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_booking_number ON public.bookings;
CREATE TRIGGER trg_booking_number BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE generate_booking_number();

-- ===========================================
-- 12. BOOKING_EXTRAS
-- ===========================================
CREATE TABLE IF NOT EXISTS public.booking_extras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  extra_id UUID NOT NULL REFERENCES public.extras(id) ON DELETE RESTRICT,
  quantity INT DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_extras_booking ON public.booking_extras(booking_id);

-- ===========================================
-- 13. PAYMENTS
-- ===========================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  order_number TEXT,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','authorized','completed','cancelled','error','refunded')),
  payment_type TEXT CHECK (payment_type IN ('deposit','full','partial','refund')),
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_booking ON public.payments(booking_id);

-- ===========================================
-- 14. BLOCKED_DATES (bloqueos)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id UUID NOT NULL REFERENCES public.parcels(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blocked_dates_parcel ON public.blocked_dates(parcel_id);

-- ===========================================
-- 15. RLS (Row Level Security)
-- ===========================================
ALTER TABLE public.parcel_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcel_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcel_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcel_available_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

-- Políticas: público lee parcelas, categorías, imágenes, equipment, extras, locations, seasons
-- Admin (via admins) tiene acceso total
DROP POLICY IF EXISTS "public_read_parcel_categories" ON public.parcel_categories;
CREATE POLICY "public_read_parcel_categories" ON public.parcel_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_parcels" ON public.parcels;
CREATE POLICY "public_read_parcels" ON public.parcels FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_parcel_images" ON public.parcel_images;
CREATE POLICY "public_read_parcel_images" ON public.parcel_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_equipment" ON public.equipment;
CREATE POLICY "public_read_equipment" ON public.equipment FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_extras" ON public.extras;
CREATE POLICY "public_read_extras" ON public.extras FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_locations" ON public.locations;
CREATE POLICY "public_read_locations" ON public.locations FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_read_seasons" ON public.seasons;
CREATE POLICY "public_read_seasons" ON public.seasons FOR SELECT USING (true);

-- Admin full access (usando admins.user_id)
DROP POLICY IF EXISTS "admin_all_parcel_categories" ON public.parcel_categories;
CREATE POLICY "admin_all_parcel_categories" ON public.parcel_categories FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_parcels" ON public.parcels;
CREATE POLICY "admin_all_parcels" ON public.parcels FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_parcel_images" ON public.parcel_images;
CREATE POLICY "admin_all_parcel_images" ON public.parcel_images FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_equipment" ON public.equipment;
CREATE POLICY "admin_all_equipment" ON public.equipment FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_parcel_equipment" ON public.parcel_equipment;
CREATE POLICY "admin_all_parcel_equipment" ON public.parcel_equipment FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_extras" ON public.extras;
CREATE POLICY "admin_all_extras" ON public.extras FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_parcel_available_extras" ON public.parcel_available_extras;
CREATE POLICY "admin_all_parcel_available_extras" ON public.parcel_available_extras FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_locations" ON public.locations;
CREATE POLICY "admin_all_locations" ON public.locations FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_customers" ON public.customers;
CREATE POLICY "admin_all_customers" ON public.customers FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_seasons" ON public.seasons;
CREATE POLICY "admin_all_seasons" ON public.seasons FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_bookings" ON public.bookings;
CREATE POLICY "admin_all_bookings" ON public.bookings FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_booking_extras" ON public.booking_extras;
CREATE POLICY "admin_all_booking_extras" ON public.booking_extras FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_payments" ON public.payments;
CREATE POLICY "admin_all_payments" ON public.payments FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
DROP POLICY IF EXISTS "admin_all_blocked_dates" ON public.blocked_dates;
CREATE POLICY "admin_all_blocked_dates" ON public.blocked_dates FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);

-- Público puede insertar bookings (reservas)
DROP POLICY IF EXISTS "public_insert_bookings" ON public.bookings;
CREATE POLICY "public_insert_bookings" ON public.bookings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "public_insert_booking_extras" ON public.booking_extras;
CREATE POLICY "public_insert_booking_extras" ON public.booking_extras FOR INSERT WITH CHECK (true);
