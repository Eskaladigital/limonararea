/**
 * Configuración centralizada de internacionalización (i18n)
 */

export const i18n = {
  defaultLocale: 'es',
  locales: ['es', 'en', 'fr', 'de', 'nl'],
} as const;

export type Locale = (typeof i18n.locales)[number];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  nl: 'Nederlands',
};

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  nl: '🇳🇱',
};

/**
 * Verifica si una cadena es un locale válido
 */
export function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}

/**
 * Obtiene el locale desde un pathname
 * Ejemplo: /es/contacto -> 'es'
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return null;
}

/**
 * Remueve el prefijo de locale de un pathname
 * Ejemplo: /es/contacto -> /contacto
 */
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname;
}

/**
 * Añade el prefijo de locale a un pathname
 * Ejemplo: /contacto + 'en' -> /en/contact
 */
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  // Remover cualquier locale existente primero
  const cleanPath = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPath}`;
}

