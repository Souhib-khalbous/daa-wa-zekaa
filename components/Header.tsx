'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { site } from '@/content/site';
import { copy } from '@/content/copy';
import { direction, type Locale } from '@/lib/i18n';
import { drawerMotion, drawerItems, fadeUp } from '@/lib/motion';
import { BrandMark } from './BrandMark';
import { ContactButton } from './ContactButton';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';
export function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null); const trigger = useRef<HTMLButtonElement>(null); const reduce = useReducedMotion();
  useEffect(() => { const scroll = () => setScrolled(window.scrollY > 24); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => { if (!open) return; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; }; }, [open]);
  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus(); };
  return <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
    <div className="container nav-inner"><BrandMark locale={locale} priority />
      <nav className="desktop-nav" aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>{site.navigation.map(n => <Link key={n.id} href={`/${locale}/#${n.id}`}>{n.label[locale]}</Link>)}</nav>
      <div className="nav-actions"><ThemeToggle locale={locale} /><LanguageSwitch locale={locale} /><div className="nav-whatsapp"><ContactButton locale={locale} small /></div><button ref={trigger} className="mobile-menu-button" aria-label={copy.menu[locale]} aria-expanded={open} aria-controls="mobile-drawer" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Menu aria-hidden="true" /></button></div>
    </div>
    <dialog id="mobile-drawer" ref={dialog} className="drawer" aria-label={copy.menu[locale]} onCancel={e => { e.preventDefault(); close(); }}>
      {open && <motion.div className="drawer-panel" variants={drawerMotion(direction(locale))} initial={reduce ? false : 'hidden'} animate="show">
        <div className="drawer-top"><BrandMark locale={locale} /><button className="mobile-menu-button" aria-label={copy.close[locale]} onClick={close} autoFocus><X aria-hidden="true" /></button></div>
        <motion.nav className="drawer-links" variants={drawerItems} initial={reduce ? false : 'hidden'} animate="show">{site.navigation.map(n => <motion.div variants={reduce ? undefined : fadeUp} key={n.id}><Link href={`/${locale}/#${n.id}`} onClick={close}>{n.label[locale]}</Link></motion.div>)}</motion.nav>
        <div className="drawer-bottom"><ContactButton locale={locale} /><LanguageSwitch locale={locale} /><ThemeToggle locale={locale} /></div>
      </motion.div>}
    </dialog>
  </header>;
}
