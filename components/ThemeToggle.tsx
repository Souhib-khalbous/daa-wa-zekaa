'use client';
import { Moon, Sun } from 'lucide-react';
import { copy } from '@/content/copy';
import type { Locale } from '@/lib/i18n';

// The label is deliberately state-independent and both icons are always
// rendered, with CSS choosing between them. That keeps the server and client
// markup identical, so there is no hydration mismatch and no icon flash.
export function ThemeToggle({ locale }: { locale: Locale }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* Private browsing can block storage; the toggle still works for this visit. */
    }
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={copy.theme[locale]} title={copy.theme[locale]}>
      <Moon className="icon-moon" aria-hidden="true" />
      <Sun className="icon-sun" aria-hidden="true" />
    </button>
  );
}
