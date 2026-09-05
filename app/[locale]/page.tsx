import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowUpRight, ArrowDown } from 'lucide-react';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import { heroWorkflow } from '@/content/workflows';
import { projectPreviews } from '@/content/projects';
import { ContactButton } from '@/components/ContactButton';
import { WorkflowDiagram } from '@/components/WorkflowDiagram';
import { ServiceVisual } from '@/components/ServiceVisual';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectCard } from '@/components/ProjectCard';
import { FinalCTA } from '@/components/FinalCTA';
import { Reveal } from '@/components/Reveal';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale) : {}; }
export default async function Home({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  return <main id="main">
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />{copy.studio[locale]}</p><h1><span className="headline-mark">{copy.heroFirst[locale]}</span><span>{copy.heroSecond[locale]}</span></h1><p className="hero-description">{site.description[locale]}</p><div className="button-group"><ContactButton locale={locale} warning /><Link className="button button-outline" href="#projects">{copy.work[locale]}<ArrowUpRight className="directional" aria-hidden="true" /></Link></div><p className="hero-note"><Check aria-hidden="true" />{copy.heroNote[locale]}</p></div>
      <div className="automation-canvas"><div className="canvas-header"><h2>{copy.canvasTitle[locale]}</h2><span className="canvas-index" aria-hidden="true"><i /><i /><i /></span></div><div className="canvas-body"><WorkflowDiagram workflow={heroWorkflow} locale={locale} /></div><div className="canvas-footer"><span>{copy.canvasFoot[locale]}</span><Check aria-hidden="true" /></div></div>
    </div></section>
    <section className="audience-section"><div className="container"><div className="audience-intro"><h2>{copy.audienceTitle[locale]}</h2><p>{copy.audience[locale]}</p></div><ul className="outcome-chips">{copy.outcomes.map(item => <li key={item.en}><Check aria-hidden="true" />{item[locale]}</li>)}</ul></div></section>
    <section className="section services-section" id="services"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">{copy.servicesEyebrow[locale]}</p><h2>{copy.servicesTitle[locale]}</h2></div><p>{copy.servicesDescription[locale]}</p></Reveal><div className="services-grid">{copy.serviceCards.map((service, i) => <article className={`service-card service-${service.key}`} key={service.key}><div className="service-top"><span className="service-number inline-ltr" dir="ltr">0{i + 1}</span><ServiceVisual kind={service.key} /></div><h3>{service.title[locale]}</h3><p>{service.description[locale]}</p><div className="service-detail"><span>{service.detail[locale]}</span><ArrowDown aria-hidden="true" /></div></article>)}</div></div></section>
    <section className="section projects-section" id="projects"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">{copy.projectsEyebrow[locale]}</p><h2>{copy.projectsTitle[locale]}</h2></div><p>{copy.projectsDescription[locale]}</p></Reveal><Suspense fallback={<div className="project-grid">{projectPreviews.map(p => <div className="span-6" key={p.slug}><ProjectCard project={p} locale={locale} /></div>)}</div>}><ProjectGallery locale={locale} /></Suspense></div></section>
    <section className="section approach-section" id="approach"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">{copy.approachEyebrow[locale]}</p><h2>{copy.approachTitle[locale]}</h2></div><p>{copy.approachDescription[locale]}</p></Reveal><ol className="approach-steps">{copy.steps.map((step, i) => <li key={step.title.en}><div className="step-top"><span className="step-number inline-ltr" dir="ltr">0{i + 1}</span><span className="step-edge" aria-hidden="true" /></div><h3>{step.title[locale]}</h3><p>{step.description[locale]}</p></li>)}</ol></div></section>
    <FinalCTA locale={locale} />
  </main>;
}
