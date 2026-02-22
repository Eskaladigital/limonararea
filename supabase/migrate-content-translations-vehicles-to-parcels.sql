-- Migración: content_translations source_table 'vehicles' → 'parcels'
-- Ejecutar en Supabase SQL Editor si tienes filas con source_table = 'vehicles'
-- (legacy). Tras esto, la app usa solo 'parcels'.

UPDATE content_translations
SET source_table = 'parcels'
WHERE source_table = 'vehicles';

-- Comprobar: SELECT source_table, COUNT(*) FROM content_translations GROUP BY source_table;
