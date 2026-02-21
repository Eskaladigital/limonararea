-- ===========================================
-- 10 PARCELAS DE EJEMPLO - Eco Area Limonar
-- Ejecutar DESPUÉS de seed-data-eco-area.sql
-- Datos inventados para poder modificar y reutilizar
-- ===========================================

-- Eliminar parcelas de ejemplo si existen (por internal_code)
DELETE FROM public.parcels WHERE internal_code LIKE 'P-%';

-- Insertar 10 parcelas de ejemplo
INSERT INTO public.parcels (
  name, slug, category_id, internal_code, description, short_description,
  length_m, width_m, base_price_per_day, status, sort_order, is_for_rent
)
SELECT
  v.name, v.slug,
  (SELECT id FROM public.parcel_categories WHERE slug = v.cat_slug LIMIT 1),
  v.internal_code, v.description, v.short_description,
  v.length_m, v.width_m, v.base_price_per_day,
  'available', v.sort_order, true
FROM (VALUES
  -- Estándar
  ('Parcela Sol', 'parcela-sol', 'estandar', 'P-001',
   'Parcela soleada con vistas al área común. Ideal para parejas o familias pequeñas. Césped natural y zona de sombra bajo pino.',
   'Parcela 8×6m con césped y sombra.',
   8, 6, 95, 1),
  ('Parcela Luna', 'parcela-luna', 'estandar', 'P-002',
   'Parcela tranquila orientada al este. Despierta con el sol de la mañana. Pavimento compactado y conexión de agua próxima.',
   'Parcela 9×7m orientación este.',
   9, 7, 99, 2),
  ('Parcela Mar', 'parcela-mar', 'estandar', 'P-003',
   'A pocos minutos andando del Mar Menor. Parcela con sombra natural y espacio para tender. Ideal para estancias largas.',
   'Parcela 10×8m cerca del mar.',
   10, 8, 105, 3),
  ('Parcela Brisa', 'parcela-brisa', 'estandar', 'P-004',
   'Parcela ventilada con orientación sur-oeste. Césped y zona pavimentada para la mesa. Perfecta para barbacoas.',
   'Parcela 8×7m con zona barbacoa.',
   8, 7, 97, 4),
  ('Parcela Cala', 'parcela-cala', 'estandar', 'P-005',
   'Una de las parcelas más solicitadas. Buena sombra, césped y vistas despejadas. Acceso directo a servicios.',
   'Parcela 9×8m premium estándar.',
   9, 8, 109, 5),
  -- Premium
  ('Parcela Vista', 'parcela-vista', 'premium', 'P-006',
   'Parcela premium con más espacio. Orientación sur, césped extenso y zona de sombra amplia. Las mejores vistas del área.',
   'Parcela premium 12×10m.',
   12, 10, 125, 6),
  ('Parcela Playa', 'parcela-playa', 'premium', 'P-007',
   'La más cercana a la playa. Superficie amplia, pavimento y césped. Ideal para autocaravanas grandes.',
   'Parcela premium 14×10m junto al mar.',
   14, 10, 135, 7),
  ('Parcela Palmera', 'parcela-palmera', 'premium', 'P-008',
   'Sombra natural bajo palmeras. Parcela extra grande para grupos o familias. Doble punto de agua.',
   'Parcela XL 15×12m con palmeras.',
   15, 12, 145, 8),
  ('Parcela Jardín', 'parcela-jardin', 'premium', 'P-009',
   'Parcela tipo jardín con césped en todo el perímetro. Privacidad y tranquilidad. Orientación este.',
   'Parcela jardín 11×9m.',
   11, 9, 119, 9),
  ('Parcela Estrella', 'parcela-estrella', 'premium', 'P-010',
   'Nuestra parcela estrella. Máximo espacio, mejor ubicación, todas las comodidades. Reserva con antelación.',
   'Parcela premium 16×12m top.',
   16, 12, 155, 10)
) AS v(name, slug, cat_slug, internal_code, description, short_description, length_m, width_m, base_price_per_day, sort_order);

-- Opcional: asignar equipamiento a algunas parcelas (si existe equipment)
-- Descomenta y ajusta si tienes equipment con esos slugs
/*
INSERT INTO public.parcel_equipment (parcel_id, equipment_id)
SELECT p.id, e.id
FROM public.parcels p
CROSS JOIN public.equipment e
WHERE p.internal_code = 'P-001' AND e.slug IN ('superficie-50', 'orientacion-sur', 'cesped', 'sombra')
ON CONFLICT (parcel_id, equipment_id) DO NOTHING;
*/
