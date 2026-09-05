import { NotFoundFromPath } from '@/components/NotFoundFromPath';
import { fontVariables } from '@/lib/fonts';
import { site } from '@/content/site';
import { ThemeScript } from '@/components/ThemeScript';
import './globals.css';
import './not-found.css';

export const metadata = {
  title: `404 | ${site.name}`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className={fontVariables}>
        <ThemeScript />
        <NotFoundFromPath standalone />
      </body>
    </html>
  );
}
