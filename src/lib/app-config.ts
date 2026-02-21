/**
 * Configuración central de la aplicación.
 * Usa variables de entorno; reemplaza con tus valores cuando tengas dominio y Supabase.
 */

export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'http://localhost:3000';

export const contactEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || process.env.COMPANY_EMAIL || 'contacto@ejemplo.com';
export const infoEmail = process.env.NEXT_PUBLIC_INFO_EMAIL || process.env.NEXT_PUBLIC_COMPANY_EMAIL || process.env.INFO_EMAIL || process.env.COMPANY_EMAIL || 'info@ejemplo.com';

/** URL para imágenes OpenGraph - usa imagen local o placeholder */
export const ogImageUrl = `${baseUrl}/images/slides/hero-11.webp`;
