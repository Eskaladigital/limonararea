-- ===========================================
-- MIGRACIÓN: vehicle* → parcel* (inglés coherente)
-- Ejecutar en Supabase SQL Editor sobre BD existente
-- Renombra tablas y columnas sin perder datos
--
-- Resultado:
--   vehicle_categories → parcel_categories
--   vehicles → parcels
--   vehicle_images → parcel_images (vehicle_id → parcel_id)
--   vehicle_equipment → parcel_equipment (vehicle_id → parcel_id)
--   vehicle_available_extras → parcel_available_extras (vehicle_id → parcel_id)
--   bookings.vehicle_id → parcel_id
--   blocked_dates.vehicle_id → parcel_id
--
-- IMPORTANTE: Tras ejecutar, hay que actualizar el código para usar
-- .from('parcels'), .from('parcel_images'), etc.
-- ===========================================

BEGIN;

-- 0. Si existe parcelas (español) pero no vehicles/parcels, renombrar parcelas → parcels
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcelas')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcels')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='vehicles')
  THEN
    ALTER TABLE public.parcelas RENAME TO parcels;
  END IF;
END $$;

-- 1. Renombrar tablas principales
ALTER TABLE IF EXISTS public.vehicle_categories RENAME TO parcel_categories;
ALTER TABLE IF EXISTS public.vehicles RENAME TO parcels;

-- 2. Renombrar vehicle_images y columna vehicle_id → parcel_id
ALTER TABLE IF EXISTS public.vehicle_images RENAME TO parcel_images;
ALTER TABLE IF EXISTS public.parcel_images RENAME COLUMN vehicle_id TO parcel_id;

-- 3. Renombrar vehicle_equipment y columna
ALTER TABLE IF EXISTS public.vehicle_equipment RENAME TO parcel_equipment;
ALTER TABLE IF EXISTS public.parcel_equipment RENAME COLUMN vehicle_id TO parcel_id;

-- 4. Renombrar vehicle_available_extras y columna
ALTER TABLE IF EXISTS public.vehicle_available_extras RENAME TO parcel_available_extras;
ALTER TABLE IF EXISTS public.parcel_available_extras RENAME COLUMN vehicle_id TO parcel_id;

-- 5. Actualizar parcels: category_id sigue igual (referencia a parcel_categories ya renombrada)
-- La FK se actualiza automáticamente al renombrar vehicle_categories

-- 6. Bookings: vehicle_id → parcel_id
ALTER TABLE IF EXISTS public.bookings RENAME COLUMN vehicle_id TO parcel_id;

-- 7. Blocked_dates: vehicle_id → parcel_id
ALTER TABLE IF EXISTS public.blocked_dates RENAME COLUMN vehicle_id TO parcel_id;

-- 8. Renombrar índices
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

-- 9. RLS: las políticas se dropean al renombrar tabla, hay que recrearlas
DROP POLICY IF EXISTS "public_read_vehicle_categories" ON public.parcel_categories;
DROP POLICY IF EXISTS "public_read_vehicles" ON public.parcels;
DROP POLICY IF EXISTS "public_read_vehicle_images" ON public.parcel_images;
DROP POLICY IF EXISTS "admin_all_vehicle_categories" ON public.parcel_categories;
DROP POLICY IF EXISTS "admin_all_vehicles" ON public.parcels;
DROP POLICY IF EXISTS "admin_all_vehicle_images" ON public.parcel_images;
DROP POLICY IF EXISTS "admin_all_vehicle_equipment" ON public.parcel_equipment;
DROP POLICY IF EXISTS "admin_all_vehicle_available_extras" ON public.parcel_available_extras;

CREATE POLICY "public_read_parcel_categories" ON public.parcel_categories FOR SELECT USING (true);
CREATE POLICY "public_read_parcels" ON public.parcels FOR SELECT USING (true);
CREATE POLICY "public_read_parcel_images" ON public.parcel_images FOR SELECT USING (true);
CREATE POLICY "admin_all_parcel_categories" ON public.parcel_categories FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
CREATE POLICY "admin_all_parcels" ON public.parcels FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
CREATE POLICY "admin_all_parcel_images" ON public.parcel_images FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
CREATE POLICY "admin_all_parcel_equipment" ON public.parcel_equipment FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);
CREATE POLICY "admin_all_parcel_available_extras" ON public.parcel_available_extras FOR ALL
  USING ((SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true) = 1);

COMMIT;
