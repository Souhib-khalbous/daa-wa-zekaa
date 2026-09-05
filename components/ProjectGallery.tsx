'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { copy } from '@/content/copy';
import { categories, projectPreviews, projectSpans, type Category } from '@/content/projects';
import type { Locale } from '@/lib/i18n';
import { EASE, timing } from '@/lib/motion';
import { ProjectCard } from './ProjectCard';
export function ProjectGallery({ locale }: { locale: Locale }) {
  const params = useSearchParams(); const reduce = useReducedMotion(); const raw = params.get('filter'); const filter = categories.includes(raw as Category) ? raw as Category : 'all';
  const visible = categories.filter(c => filter === 'all' || c === filter);
  const flattened = visible.flatMap(c => projectPreviews.filter(p => p.category === c));
  const select = (category: string) => { const url = new URL(window.location.href); if (category === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', category); window.history.pushState(null, '', url); };
  return <><fieldset className="project-filters" aria-label={copy.projectsEyebrow[locale]}>{(['all', ...categories] as const).map(c => <button key={c} type="button" className={`filter-button${filter === c ? ' is-active' : ''}`} onClick={() => select(c)} aria-pressed={filter === c}>{c === 'all' ? copy.all[locale] : copy.categories[c][locale]}</button>)}</fieldset>
    <div className="project-grid" aria-live="polite">{visible.map(category => <section key={category} className="project-group" aria-label={copy.categories[category][locale]}><h3 className="mobile-category-title">{copy.categories[category][locale]}</h3><div className="project-track">{flattened.filter(p => p.category === category).map(project => <motion.div key={project.slug} layout={!reduce} transition={{ duration: reduce ? 0 : timing.page, ease: EASE }} className={`project-cell span-${filter === 'all' ? projectSpans[flattened.indexOf(project)] : 6}`}><ProjectCard project={project} locale={locale} /></motion.div>)}</div></section>)}</div>
  </>;
}
