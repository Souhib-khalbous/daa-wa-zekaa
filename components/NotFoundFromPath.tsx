'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import { direction, type Locale } from '@/lib/i18n';
import { stripBasePath } from '@/lib/base-path';
import { BrandMark } from './BrandMark';
import { NotFoundScreen } from './NotFoundScreen';

const subscribe = () => () => {};
const serverLocale = (): Locale => 'ar';
const browserLocale = (): Locale => {
  // basePath is part of window.location but not of the routes we compare against.
  const path = stripBasePath(window.location.pathname);
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'ar';
};

export function NotFoundFromPath({ standalone = false }: { standalone?: boolean }) {
  const locale = useSyncExternalStore(subscribe, browserLocale, serverLocale);
  useEffect(() => {
    if (!standalone) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = direction(locale);
    document.title = `404 | ${site.name}`;
  }, [locale, standalone]);

  return (
    <>
      {standalone && (
        <header className="error-header container">
          <BrandMark locale={locale} />
          <Link href={locale === 'ar' ? '/en/not-found/' : '/ar/not-found/'} lang={locale === 'ar' ? 'en' : 'ar'}>
            {locale === 'ar' ? 'EN' : 'العربية'}
          </Link>
        </header>
      )}
      <NotFoundScreen locale={locale} />
      {standalone && <p className="error-footer container">{copy.footerNote[locale]}</p>}
    </>
  );
}
