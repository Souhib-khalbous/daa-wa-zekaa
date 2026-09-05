import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '@/content/copy';
import type { Locale } from '@/lib/i18n';

export function NotFoundScreen({ locale }: { locale: Locale }) {
  return (
    <main id="main" className="error-page section">
      <div className="container error-grid">
        <div className="error-copy">
          <p className="eyebrow">{copy.notFoundEyebrow[locale]}</p>
          <h1>{copy.notFoundTitle[locale]}</h1>
          <p className="muted">{copy.notFoundDescription[locale]}</p>
          <Link className="button button-outline" href={`/${locale}/`}>
            {copy.home[locale]}
            <ArrowUpRight className="directional" aria-hidden="true" />
          </Link>
        </div>
        <div className="error-map" aria-hidden="true">
          <span className="error-number inline-ltr" dir="ltr">404</span>
          <div className="error-connection"><i /><span /><i /></div>
        </div>
      </div>
    </main>
  );
}
