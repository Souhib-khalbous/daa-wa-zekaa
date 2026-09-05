import type { Metadata } from 'next';
import { withBasePath } from './base-path';
import { site } from '@/content/site';
import { copy } from '@/content/copy';
import type { Locale } from './i18n';
export function pageMetadata(locale: Locale, path = '', title = `${site.name} | ${copy.studio[locale]}`, description = site.description[locale]): Metadata {
  const url = `${site.origin}/${locale}/${path}`;
  // Crawlers need an absolute URL, and site.origin already carries the basePath.
  const images = site.hasOg
    ? [{ url: `${site.origin}/brand/og.png`, width: site.ogWidth, height: site.ogHeight, alt: `${site.name} | ${copy.studio[locale]}` }]
    : undefined;
  return { metadataBase: new URL(site.origin), title, description, icons: { icon: withBasePath('/favicon.svg') }, alternates: { canonical: url, languages: { ar: `${site.origin}/ar/${path}`, en: `${site.origin}/en/${path}`, 'x-default': `${site.origin}/ar/${path}` } }, openGraph: { title, description, url, siteName: site.name, locale: locale === 'ar' ? 'ar_AR' : 'en_US', alternateLocale: locale === 'ar' ? 'en_US' : 'ar_AR', type: 'website', images }, twitter: { card: site.hasOg ? 'summary_large_image' : 'summary', title, description, images } };
}
