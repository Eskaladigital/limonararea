/**
 * Cliente de Supabase para el servidor (API Routes y Server Components)
 * Si Supabase no está configurado, retorna un cliente mock (datos vacíos).
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './database.types';

const emptyBuilder = {
  eq: () => emptyBuilder, neq: () => emptyBuilder, in: () => emptyBuilder,
  order: () => emptyBuilder, limit: () => emptyBuilder, like: () => emptyBuilder,
  single: () => Promise.resolve({ data: null, error: null }),
  then: (resolve: (v: { data: never[]; error: null }) => void) => resolve({ data: [], error: null }),
};
const mockFrom = () => ({
  select: () => emptyBuilder, insert: () => emptyBuilder, update: () => emptyBuilder, delete: () => emptyBuilder,
});
const createMockClient = () => ({
  from: mockFrom,
  auth: { getSession: () => Promise.resolve({ data: { session: null }, error: null }) },
  storage: { from: () => ({ upload: () => Promise.resolve({ data: null, error: null }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
} as any);

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith('http')) {
    return createMockClient();
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // El método `set` fue llamado desde un Server Component.
            // Esto se puede ignorar si tienes middleware para refrescar
            // las sesiones de usuario.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // El método `delete` fue llamado desde un Server Component.
            // Esto se puede ignorar si tienes middleware para refrescar
            // las sesiones de usuario.
          }
        },
      },
    }
  );
}

// Cliente con service_role - SOLO PARA OPERACIONES ADMINISTRATIVAS QUE BYPASEAN RLS
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !url.startsWith('http')) {
    return createMockClient();
  }
  const { createClient } = require('@supabase/supabase-js');

  return createClient<Database>(
    url,
    key,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
