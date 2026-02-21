-- ===========================================
-- FIX: Eliminar trigger sync_passengers_seats
-- Ese trigger usaba columnas eliminadas (passengers, seats)
-- Ejecutar en Supabase SQL Editor
-- ===========================================

DO $$
DECLARE
  r RECORD;
BEGIN
  -- Buscar y eliminar cualquier trigger en parcels que use sync_passengers_seats
  FOR r IN
    SELECT tgname
    FROM pg_trigger t
    JOIN pg_proc p ON t.tgfoid = p.oid
    JOIN pg_class c ON t.tgrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'public' AND c.relname = 'parcels' AND p.proname = 'sync_passengers_seats'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON public.parcels', r.tgname);
  END LOOP;
END $$;

DROP FUNCTION IF EXISTS public.sync_passengers_seats();
