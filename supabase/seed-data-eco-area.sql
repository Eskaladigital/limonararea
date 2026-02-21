-- ===========================================
-- ECO AREA LIMONAR - Datos iniciales
-- Ejecutar DESPUÉS de schema-eco-area-limonar.sql
-- Idempotente: puede ejecutarse varias veces sin duplicar
-- ===========================================

-- 1. CATEGORÍAS DE PARCELAS (parcel_categories tras migración)
INSERT INTO public.parcel_categories (name, slug, description, sort_order, is_active)
VALUES
  ('Estándar', 'estandar', 'Parcela estándar con servicios básicos', 1, true),
  ('Premium', 'premium', 'Parcela premium con más espacio y comodidades', 2, true)
ON CONFLICT (slug) DO NOTHING;

-- 2. CARACTERÍSTICAS (superficie, orientación, sombra, césped...)
INSERT INTO public.equipment (name, slug, description, icon, category, is_active, is_standard, sort_order)
VALUES
  ('Superficie 50m²', 'superficie-50', 'Aproximadamente 50 metros cuadrados', 'maximize', 'parcelas', true, false, 1),
  ('Superficie 80m²', 'superficie-80', 'Aproximadamente 80 metros cuadrados', 'maximize', 'parcelas', true, false, 2),
  ('Superficie 100m²', 'superficie-100', 'Aproximadamente 100 metros cuadrados', 'maximize', 'parcelas', true, false, 3),
  ('Orientación Sur', 'orientacion-sur', 'Orientada al sur', 'sun', 'parcelas', true, false, 10),
  ('Orientación Este', 'orientacion-este', 'Orientada al este', 'sun', 'parcelas', true, false, 11),
  ('Orientación Oeste', 'orientacion-oeste', 'Orientada al oeste', 'sun', 'parcelas', true, false, 12),
  ('Sombra', 'sombra', 'Zona con sombra natural o toldo', 'umbrella', 'parcelas', true, false, 20),
  ('Césped', 'cesped', 'Superficie con césped', 'tree-pine', 'parcelas', true, false, 21),
  ('Pavimento', 'pavimento', 'Superficie pavimentada', 'square', 'parcelas', true, false, 22),
  ('Conexión agua', 'agua', 'Punto de conexión de agua', 'droplet', 'parcelas', true, false, 30)
ON CONFLICT (slug) DO NOTHING;

-- 3. EXTRAS (luz, wifi, agua)
INSERT INTO public.extras (name, description, price_per_day, price_per_rental, price_type, max_quantity, is_active, sort_order)
VALUES
  ('Electricidad', 'Conexión eléctrica en la parcela', 3.00, 0, 'per_day', 1, true, 1),
  ('Wifi', 'Acceso a red wifi', 2.00, 0, 'per_day', 1, true, 2),
  ('Agua', 'Conexión de agua adicional', 1.50, 0, 'per_day', 1, true, 3)
ON CONFLICT (name) DO NOTHING;

-- 4. UBICACIÓN (Eco Area Limonar - única)
INSERT INTO public.locations (name, slug, address, city, postal_code, is_pickup, is_dropoff, extra_fee, is_active, sort_order)
VALUES ('Eco Area Limonar', 'los-nietos', 'Los Nietos, Cartagena', 'Cartagena', '30389', true, true, 0, true, 1)
ON CONFLICT (slug) DO NOTHING;

-- 5. TEMPORADA de ejemplo
INSERT INTO public.seasons (name, slug, start_date, end_date, year, min_days, base_price_per_day, price_less_than_week, price_one_week, price_two_weeks, price_three_weeks, is_active)
VALUES ('Temporada 2026', 'temporada-2026', '2026-01-01', '2026-12-31', 2026, 1, 25.00, 30.00, 28.00, 26.00, 25.00, true)
ON CONFLICT (slug) DO NOTHING;
