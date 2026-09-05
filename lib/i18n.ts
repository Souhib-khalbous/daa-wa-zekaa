export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T = string> = Record<Locale, T>;
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const direction = (locale: Locale) => locale === 'ar' ? 'rtl' as const : 'ltr' as const;
export const bilingual = (ar: string, en: string): Localized => ({ ar, en });
