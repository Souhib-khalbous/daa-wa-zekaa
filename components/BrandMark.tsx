import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';
import type { Locale } from '@/lib/i18n';
import { withBasePath } from '@/lib/base-path';
export function BrandMark({ locale, priority = false }: { locale: Locale; priority?: boolean }) {
  return <Link href={`/${locale}/`} className="brand" aria-label={site.name}>
    {site.hasLogo ? <Image className="brand-img" src={withBasePath('/brand/logo.png')} alt={site.name} width={site.logoWidth} height={site.logoHeight} preload={priority} /> : <span className="brand-wordmark" lang="ar" dir="rtl">داء <span>و</span> ذكاء</span>}
  </Link>;
}
