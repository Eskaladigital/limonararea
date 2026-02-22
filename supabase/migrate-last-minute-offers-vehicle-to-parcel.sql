-- ===========================================
-- MIGRACIÓN: last_minute_offers vehicle_id → parcel_id
-- Eco Area Limonar - Ejecutar en Supabase SQL Editor
--
-- Si la tabla last_minute_offers tiene vehicle_id, la renombra a parcel_id
-- y actualiza la FK para referenciar parcels en lugar de vehicles.
-- ===========================================

DO $$
BEGIN
  -- Renombrar columna vehicle_id → parcel_id si existe
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'last_minute_offers' 
    AND column_name = 'vehicle_id'
  ) THEN
    -- Eliminar FK antigua si existe (vehicles)
    ALTER TABLE public.last_minute_offers 
      DROP CONSTRAINT IF EXISTS last_minute_offers_vehicle_id_fkey;
    
    -- Renombrar columna
    ALTER TABLE public.last_minute_offers 
      RENAME COLUMN vehicle_id TO parcel_id;
    
    -- Añadir FK a parcels
    ALTER TABLE public.last_minute_offers 
      ADD CONSTRAINT last_minute_offers_parcel_id_fkey 
      FOREIGN KEY (parcel_id) REFERENCES public.parcels(id) ON DELETE CASCADE;
  END IF;
END $$;
