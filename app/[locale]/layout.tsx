import { fontVariables } from '@/lib/fonts';
import { notFound } from 'next/navigation';
import { isLocale, locales, direction } from '@/lib/i18n';
import { copy } from '@/content/copy';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../globals.css';
import '../sections.css';
import '../not-found.css';
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  return <html lang={locale} dir={direction(locale)}><body className={fontVariables}><a href="#main" className="skip-link button">{copy.skip[locale]}</a><Header locale={locale} />{children}<Footer locale={locale} /></body></html>;
}
