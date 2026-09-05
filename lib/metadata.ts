import type { Metadata } from 'next';
import { withBasePath } from './base-path';
import { site } from '@/content/site';
import { copy } from '@/content/copy';
import type { Locale } from './i18n';
export function pageMetadata(locale: Locale, path = '', title = `${site.name} | ${copy.studio[locale]}`, description = site.description[locale]): Metadata {
  const url = `${site.origin}/${locale}/${path}`;
  return { metadataBase: new URL(site.origin), title, description, icons: { icon: withBasePath('/favicon.svg') }, alternates: { canonical: url, languages: { ar: `${site.origin}/ar/${path}`, en: `${site.origin}/en/${path}`, 'x-default': `${site.origin}/ar/${path}` } }, openGraph: { title, description, url, siteName: site.name, locale: locale === 'ar' ? 'ar_AR' : 'en_US', alternateLocale: locale === 'ar' ? 'en_US' : 'ar_AR', type: 'website' }, twitter: { card: 'summary', title, description } };
}
