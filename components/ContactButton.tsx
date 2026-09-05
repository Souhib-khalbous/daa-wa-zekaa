'use client';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { copy } from '@/content/copy';
import { whatsappUrl } from '@/content/site';
import { buttonPress, springSoft } from '@/lib/motion';
import type { Locale } from '@/lib/i18n';
export function ContactButton({ locale, label, small = false, warning = false }: { locale: Locale; label?: string; small?: boolean; warning?: boolean }) {
  const url = whatsappUrl(locale); const reduce = useReducedMotion();
  const className = `button button-primary${small ? ' button-small' : ''}`;
  const children = <><MessageCircle aria-hidden="true" /><span>{label || copy.whatsapp[locale]}</span><ArrowUpRight className="directional" aria-hidden="true" /></>;
  return <div className="contact-action">{url ? <motion.a href={url} target="_blank" rel="noopener noreferrer" className={className} whileTap={reduce ? undefined : buttonPress} transition={springSoft}>{children}</motion.a> : <button className={className} disabled title={copy.unavailable[locale]}>{children}</button>}
    {!url && warning && process.env.NODE_ENV === 'development' && <p className="dev-warning">{copy.devWarning[locale]}</p>}
  </div>;
}
