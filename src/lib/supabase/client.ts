/**
 * Cliente de Supabase para el navegador (Client-side)
 * Si Supabase no está configurado, devuelve un cliente que retorna datos vacíos.
 * Útil para desarrollar la web sin base de datos; cuando definas el esquema, configura .env.local
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();

// Excluir placeholders de .env.example (tu-proyecto, your_supabase, tu_anon_key, etc.)
const urlIsPlaceholder = /tu-proyecto|your_supabase|xxx+\.supabase|ejemplo|placeholder|abra_que_poner/i.test(supabaseUrl);
const keyIsPlaceholder = /tu_anon_key|your_|ejemplo|placeholder|abra_que_poner/i.test(supabaseAnonKey);

function isValidSupabaseUrl(url: string): boolean {
  if (!url || url.length < 15) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

const isConfigured = Boolean(
  supabaseUrl && supabaseAnonKey &&
  isValidSupabaseUrl(supabaseUrl) &&
  !urlIsPlaceholder && !keyIsPlaceholder
);

const emptyBuilder = {
  eq: () => emptyBuilder, neq: () => emptyBuilder, in: () => emptyBuilder,
  order: () => emptyBuilder, limit: () => emptyBuilder,
  single: () => Promise.resolve({ data: null, error: null }),
  then: (resolve: (v: { data: never[]; error: null }) => void) => resolve({ data: [], error: null }),
};
const mockFrom = () => ({
  select: () => emptyBuilder, insert: () => emptyBuilder,
  update: () => emptyBuilder, delete: () => emptyBuilder,
});
const mockClient = {
  from: mockFrom,
  auth: { getSession: () => Promise.resolve({ data: { session: null }, error: null }) },
  storage: { from: () => ({ upload: () => Promise.resolve({ data: null, error: { message: 'Supabase no configurado' } }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
} as unknown as ReturnType<typeof createBrowserClient<Database>>;

function getRealClient() {
  try {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch {
    return mockClient;
  }
}

export function createClient() {
  return isConfigured ? getRealClient() : mockClient;
}

export const supabase = isConfigured ? getRealClient() : mockClient;
export default supabase;
