import { BrandMark } from './BrandMark';
import { ContactButton } from './ContactButton';
import { LanguageSwitch } from './LanguageSwitch';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import type { Locale } from '@/lib/i18n';
export function Footer({ locale }: { locale: Locale }) { return <footer className="site-footer"><div className="container">
  <div className="footer-top"><div className="footer-brand"><BrandMark locale={locale} /><p>{copy.footerNote[locale]}</p></div><div className="footer-links">{site.instagram && <a href={site.instagram} target="_blank" rel="noopener noreferrer">{copy.instagram[locale]}</a>}<ContactButton locale={locale} small /><LanguageSwitch locale={locale} /></div></div>
  <div className="footer-bottom"><p>© <span dir="ltr" className="inline-ltr">{new Date().getFullYear()}</span> {site.name}. {copy.rights[locale]}</p><p>{copy.privacy[locale]}</p></div>
</div></footer>; }
