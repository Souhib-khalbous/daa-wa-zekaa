'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname(); const other = locale === 'ar' ? 'en' : 'ar';
  const path = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`);
  return <Link href={path} hrefLang={other} lang={other} className="language-switch" onClick={e => {
    try { localStorage.setItem('locale', other); } catch { /* Navigation works when storage is unavailable. */ }
    e.currentTarget.href = `${path}${window.location.search}${window.location.hash}`;
  }}><Languages aria-hidden="true" /><span>{other === 'en' ? 'EN' : 'العربية'}</span></Link>;
}
