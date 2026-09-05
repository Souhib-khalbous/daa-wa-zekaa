import { notFound } from 'next/navigation';
import { NotFoundScreen } from '@/components/NotFoundScreen';
import { isLocale } from '@/lib/i18n';
import { copy } from '@/content/copy';
import { site } from '@/content/site';

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NotFoundScreen locale={locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: `404 | ${site.name}`,
    description: isLocale(locale) ? copy.notFoundDescription[locale] : undefined,
    robots: { index: false, follow: true },
  };
}
