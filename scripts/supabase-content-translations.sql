-- Tabla para traducciones de contenido dinámico (parcelas, posts, categorías)
-- Doc completa: docs/SISTEMA-TRADUCCIONES-COMPLETO.md
-- Ejecutar en Supabase: SQL Editor → New query → pegar y Run
-- Luego: npm run verify:translations && npm run translate:content

CREATE TABLE IF NOT EXISTS content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_field TEXT NOT NULL,
  locale TEXT NOT NULL,
  translated_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(source_table, source_id, source_field, locale)
);

CREATE INDEX IF NOT EXISTS idx_content_translations_lookup
  ON content_translations(source_table, source_id, locale);

-- Habilitar RLS si lo usas (opcional)
-- ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;
-- Política de lectura pública (la app lee con anon key):
-- CREATE POLICY "Allow read" ON content_translations FOR SELECT USING (true);
-- Política de escritura solo con service_role (scripts con SUPABASE_SERVICE_ROLE_KEY)
