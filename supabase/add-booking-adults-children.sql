-- Añadir campos adults y children a bookings
-- Para registrar ocupación (adultos + niños) y permitir reglas de filtrado por parcela en el futuro

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS adults INT DEFAULT 2,
  ADD COLUMN IF NOT EXISTS children INT DEFAULT 0;

COMMENT ON COLUMN public.bookings.adults IS 'Número de adultos en la reserva';
COMMENT ON COLUMN public.bookings.children IS 'Número de niños en la reserva';

-- Añadir max_adults y max_children a parcels (para filtrado futuro)
-- Cuando se definan las reglas: parcelas que no cumplan se excluirán de resultados
ALTER TABLE public.parcels
  ADD COLUMN IF NOT EXISTS max_adults INT,
  ADD COLUMN IF NOT EXISTS max_children INT;

COMMENT ON COLUMN public.parcels.max_adults IS 'Máximo de adultos permitidos (null = sin límite)';
COMMENT ON COLUMN public.parcels.max_children IS 'Máximo de niños permitidos (null = sin límite)';
