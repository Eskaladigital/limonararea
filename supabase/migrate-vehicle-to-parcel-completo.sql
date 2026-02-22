-- ===========================================
-- MIGRACIÓN COMPLETA: vehicle* → parcel* (Eco Area Limonar)
-- Ejecutar en Supabase SQL Editor (todo en un solo script)
--
-- Incluye:
--   1. content_translations: source_table 'vehicles' → 'parcels'
--   2. Tablas: vehicles → parcels, vehicle_* → parcel_*
--   3. Columnas: vehicle_id → parcel_id en bookings, blocked_dates y tablas de relación
--   4. search_queries: selected_vehicle_* → selected_parcel_*, vehicle_selected → parcel_selected
--
-- IMPORTANTE: Haz backup o ejecuta en un entorno de prueba primero.
-- ===========================================

BEGIN;

-- ===========================================
-- 1. CONTENT_TRANSLATIONS
-- ===========================================
UPDATE content_translations
SET source_table = 'parcels'
WHERE source_table = 'vehicles';

-- ===========================================
-- 2. TABLAS PRINCIPALES (solo si existen con nombre vehicle*)
-- ===========================================

-- Si existe "parcelas" pero no "parcels" ni "vehicles", unificar nombre
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcelas')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcels')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicles')
  THEN
    ALTER TABLE public.parcelas RENAME TO parcels;
  END IF;
END $$;

-- Renombrar tablas vehicle_* → parcel_* (solo si existen y la destino no existe)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicle_categories')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_categories')
  THEN
    ALTER TABLE public.vehicle_categories RENAME TO parcel_categories;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicles')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcels')
  THEN
    ALTER TABLE public.vehicles RENAME TO parcels;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicle_images')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_images')
  THEN
    ALTER TABLE public.vehicle_images RENAME TO parcel_images;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicle_equipment')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_equipment')
  THEN
    ALTER TABLE public.vehicle_equipment RENAME TO parcel_equipment;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicle_available_extras')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_available_extras')
  THEN
    ALTER TABLE public.vehicle_available_extras RENAME TO parcel_available_extras;
  END IF;
END $$;

-- Columnas vehicle_id → parcel_id en tablas de relación (si la columna existe)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='parcel_images' AND column_name='vehicle_id') THEN
    ALTER TABLE public.parcel_images RENAME COLUMN vehicle_id TO parcel_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='parcel_equipment' AND column_name='vehicle_id') THEN
    ALTER TABLE public.parcel_equipment RENAME COLUMN vehicle_id TO parcel_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='parcel_available_extras' AND column_name='vehicle_id') THEN
    ALTER TABLE public.parcel_available_extras RENAME COLUMN vehicle_id TO parcel_id;
  END IF;
END $$;

-- ===========================================
-- 3. BOOKINGS: vehicle_id → parcel_id
-- ===========================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='bookings' AND column_name='vehicle_id') THEN
    ALTER TABLE public.bookings RENAME COLUMN vehicle_id TO parcel_id;
  END IF;
END $$;

-- ===========================================
-- 4. BLOCKED_DATES: vehicle_id → parcel_id
-- ===========================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blocked_dates' AND column_name='vehicle_id') THEN
    ALTER TABLE public.blocked_dates RENAME COLUMN vehicle_id TO parcel_id;
  END IF;
END $$;

-- ===========================================
-- 5. SEARCH_QUERIES: columnas vehicle_* → parcel_*
-- ===========================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='search_queries' AND column_name='selected_vehicle_id') THEN
    ALTER TABLE public.search_queries RENAME COLUMN selected_vehicle_id TO selected_parcel_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='search_queries' AND column_name='vehicle_selected') THEN
    ALTER TABLE public.search_queries RENAME COLUMN vehicle_selected TO parcel_selected;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='search_queries' AND column_name='selected_vehicle_price') THEN
    ALTER TABLE public.search_queries RENAME COLUMN selected_vehicle_price TO selected_parcel_price;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='search_queries' AND column_name='vehicle_selected_at') THEN
    ALTER TABLE public.search_queries RENAME COLUMN vehicle_selected_at TO parcel_selected_at;
  END IF;
END $$;

-- Valores del funnel: 'vehicle_selected' → 'parcel_selected'
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='search_queries' AND column_name='funnel_stage') THEN
    UPDATE public.search_queries SET funnel_stage = 'parcel_selected' WHERE funnel_stage = 'vehicle_selected';
  END IF;
END $$;

-- ===========================================
-- 6. ÍNDICES (renombrar si existen)
-- ===========================================
ALTER INDEX IF EXISTS idx_vehicles_slug RENAME TO idx_parcels_slug;
ALTER INDEX IF EXISTS idx_vehicles_category RENAME TO idx_parcels_category;
ALTER INDEX IF EXISTS idx_vehicles_status RENAME TO idx_parcels_status;
ALTER INDEX IF EXISTS idx_vehicles_is_for_rent RENAME TO idx_parcels_is_for_rent;
ALTER INDEX IF EXISTS idx_vehicle_images_vehicle RENAME TO idx_parcel_images_parcel;
ALTER INDEX IF EXISTS idx_vehicle_equipment_vehicle RENAME TO idx_parcel_equipment_parcel;
ALTER INDEX IF EXISTS idx_vehicle_equipment_equipment RENAME TO idx_parcel_equipment_equipment;
ALTER INDEX IF EXISTS idx_vehicle_available_extras_vehicle RENAME TO idx_parcel_available_extras_parcel;
ALTER INDEX IF EXISTS idx_bookings_vehicle RENAME TO idx_bookings_parcel;
ALTER INDEX IF EXISTS idx_blocked_dates_vehicle RENAME TO idx_blocked_dates_parcel;

-- ===========================================
-- 7. RLS: eliminar políticas viejas y crear con nombre parcel_*
-- ===========================================
DROP POLICY IF EXISTS "public_read_vehicle_categories" ON public.parcel_categories;
DROP POLICY IF EXISTS "public_read_vehicles" ON public.parcels;
DROP POLICY IF EXISTS "public_read_vehicle_images" ON public.parcel_images;
DROP POLICY IF EXISTS "admin_all_vehicle_categories" ON public.parcel_categories;
DROP POLICY IF EXISTS "admin_all_vehicles" ON public.parcels;
DROP POLICY IF EXISTS "admin_all_vehicle_images" ON public.parcel_images;
DROP POLICY IF EXISTS "admin_all_vehicle_equipment" ON public.parcel_equipment;
DROP POLICY IF EXISTS "admin_all_vehicle_available_extras" ON public.parcel_available_extras;

-- Recrear políticas (solo si las tablas existen)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_categories') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_categories' AND policyname = 'public_read_parcel_categories') THEN
      CREATE POLICY "public_read_parcel_categories" ON public.parcel_categories FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_categories' AND policyname = 'admin_all_parcel_categories') THEN
      CREATE POLICY "admin_all_parcel_categories" ON public.parcel_categories FOR ALL
        USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
    END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcels') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcels' AND policyname = 'public_read_parcels') THEN
      CREATE POLICY "public_read_parcels" ON public.parcels FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcels' AND policyname = 'admin_all_parcels') THEN
      CREATE POLICY "admin_all_parcels" ON public.parcels FOR ALL
        USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
    END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_images') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_images' AND policyname = 'public_read_parcel_images') THEN
      CREATE POLICY "public_read_parcel_images" ON public.parcel_images FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_images' AND policyname = 'admin_all_parcel_images') THEN
      CREATE POLICY "admin_all_parcel_images" ON public.parcel_images FOR ALL
        USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
    END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_equipment') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_equipment' AND policyname = 'admin_all_parcel_equipment') THEN
      CREATE POLICY "admin_all_parcel_equipment" ON public.parcel_equipment FOR ALL
        USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
    END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcel_available_extras') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_available_extras' AND policyname = 'admin_all_parcel_available_extras') THEN
      CREATE POLICY "admin_all_parcel_available_extras" ON public.parcel_available_extras FOR ALL
        USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
    END IF;
  END IF;
END $$;

COMMIT;

-- ===========================================
-- Comprobaciones (ejecutar después si quieres verificar)
-- ===========================================
-- SELECT source_table, COUNT(*) FROM content_translations GROUP BY source_table;
-- SELECT table_name, column_name FROM information_schema.columns WHERE table_schema='public' AND (column_name LIKE '%vehicle%' OR table_name LIKE '%vehicle%') ORDER BY table_name, column_name;
