import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { publishedSlugs } from '@/content/projects';
import { locales } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...Array.from(publishedSlugs, slug => `projects/${slug}/`)];
  return paths.flatMap(path => locales.map(locale => ({
    url: `${site.origin}/${locale}/${path}`,
    alternates: {
      languages: {
        ar: `${site.origin}/ar/${path}`,
        en: `${site.origin}/en/${path}`,
      },
    },
  })));
}
