import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { withBasePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: withBasePath('/'), disallow: [withBasePath('/ar/not-found/'), withBasePath('/en/not-found/')] },
    sitemap: `${site.origin}/sitemap.xml`,
  };
}
