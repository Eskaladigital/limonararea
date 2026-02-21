-- ===========================================
-- Crear tabla admins y primer administrador
-- Ejecuta en Supabase: SQL Editor > New query > Pegar y Run
-- ===========================================

-- 1. Crear tabla admins PRIMERO (si no existe)
-- Sin FK a auth.users para evitar errores de referencia entre schemas
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Quitar FK si existe (para permitir insertar sin usuario en auth.users)
ALTER TABLE public.admins DROP CONSTRAINT IF EXISTS admins_user_id_fkey;

-- 3. Habilitar RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 4. Política: admins pueden leer su propio registro (idempotente)
DROP POLICY IF EXISTS "admins_select_own" ON public.admins;
CREATE POLICY "admins_select_own" ON public.admins
  FOR SELECT USING (auth.uid() = user_id);

-- 5. Insertar tu usuario como administrador
-- Usuario: contacto@eskaladigital.com (UID de Supabase Auth)
INSERT INTO public.admins (user_id, email, name, is_active, role)
VALUES (
  'ae477f76-e0dd-468f-a6fb-5267ced60cd2',
  'contacto@eskaladigital.com',
  'Administrador',
  true,
  'admin'
)
ON CONFLICT (user_id) DO UPDATE SET
  is_active = true,
  updated_at = now();

-- Verificar
SELECT * FROM public.admins WHERE email = 'contacto@eskaladigital.com';
