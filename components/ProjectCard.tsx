import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '@/content/copy';
import { publishedSlugs, type ProjectPreview } from '@/content/projects';
import type { Locale } from '@/lib/i18n';
import { ProjectVisual } from './ProjectVisual';
import { BidiText } from './BidiText';
export function ProjectCard({ project, locale }: { project: ProjectPreview; locale: Locale }) { return <article className="project-card" data-category={project.category}>
  <ProjectVisual project={project} locale={locale} />
  <div className="project-card-body"><p className="project-category">{copy.categories[project.category][locale]}</p><h3>{project.title[locale]}</h3><p className="project-summary"><BidiText text={project.summary[locale]} /></p><div className="tool-chips">{project.tools.slice(0, 4).map(tool => <span key={tool} className="tool-chip inline-ltr" dir="ltr">{tool}</span>)}</div>
    {publishedSlugs.has(project.slug) ? <Link href={`/${locale}/projects/${project.slug}/`} className="case-link">{copy.caseLink[locale]}<ArrowUpRight className="directional" aria-hidden="true" /><span className="sr-only">: {project.title[locale]}</span></Link> : <p className="overview-label">{copy.projectOverview[locale]}</p>}
  </div>
</article>; }
