-- ===========================================
-- FIX: parcelas (español) → parcels (inglés)
-- Ejecutar si tienes tabla "parcelas" y quieres "parcels"
-- ===========================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcelas')
  AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcels')
  THEN
    ALTER TABLE public.parcelas RENAME TO parcels;
    RAISE NOTICE 'Renombrado parcelas → parcels';
  ELSIF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcelas')
  AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='parcels')
  THEN
    -- Ambas existen: eliminar parcelas si está vacía, si no avisar
    IF (SELECT COUNT(*) FROM public.parcelas) = 0 THEN
      DROP TABLE public.parcelas CASCADE;
      RAISE NOTICE 'Eliminada tabla parcelas vacía (parcels ya existe)';
    ELSE
      RAISE EXCEPTION 'Existen parcelas y parcels con datos. Revisar manualmente.';
    END IF;
  END IF;
END $$;
