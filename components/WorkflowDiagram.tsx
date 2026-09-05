'use client';
import { useEffect, useId, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowDownToLine, Check, Layers, Plug, Sparkles } from 'lucide-react';
import { copy } from '@/content/copy';
import { direction, type Locale } from '@/lib/i18n';
import { timing } from '@/lib/motion';
import { geometry, layoutGraph, type Workflow, type NodeKind } from '@/lib/workflow';
const icons = { trigger: ArrowDownToLine, process: Layers, ai: Sparkles, integration: Plug, result: Check };
function Graph({ workflow, locale, mobile, live, seen, reduced }: { workflow: Workflow; locale: Locale; mobile: boolean; live: boolean; seen: boolean; reduced: boolean }) {
  const id = useId().replaceAll(':', ''); const graph = layoutGraph(workflow, locale, mobile);
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => { if (!svg.current) return; if (live && !reduced) svg.current.unpauseAnimations(); else svg.current.pauseAnimations(); }, [live, reduced]);
  return <svg ref={svg} className={mobile ? 'workflow-mobile' : 'workflow-desktop'} viewBox={`0 0 ${graph.width} ${graph.height}`} role="img" aria-label={workflow.description[locale]} data-layout={mobile ? 'vertical' : 'horizontal'}>
    {graph.edges.map((edge, i) => <g key={`${edge.from}-${edge.to}`}><motion.path id={`${id}-${i}`} className="workflow-edge" d={edge.d} fill="none" initial={false} animate={{ pathLength: seen || reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : timing.edge, delay: reduced ? 0 : i * timing.edgeStagger, ease: 'easeInOut' }} />
      {reduced ? <circle className="workflow-packet" r={geometry.packetRadius} cx={edge.midpoint.x} cy={edge.midpoint.y} /> : i < 2 && <circle className="workflow-packet" r={geometry.packetRadius} opacity="0"><set attributeName="opacity" to="1" begin={`${timing.edge + (graph.edges.length - 1) * timing.edgeStagger}s`} fill="freeze" /><animateMotion dur={`${timing.packet}s`} begin={`${timing.edge + (graph.edges.length - 1) * timing.edgeStagger}s`} repeatCount="indefinite" calcMode="linear" path={edge.d} /></circle>}
      {edge.label && <text x={edge.midpoint.x} y={edge.midpoint.y} className="edge-label" textAnchor="middle">{edge.label[locale]}</text>}
    </g>)}
    {graph.nodes.map(node => { const Icon = icons[node.kind]; const isTool = node.kind === 'integration' && /^[A-Za-z]/.test(node.label[locale]); return <g key={node.id} data-node-id={node.id} data-kind={node.kind}>
      <foreignObject x={node.x} y={node.y} width={node.w} height={node.h}><div className={`workflow-node node-${node.kind}`} dir={direction(locale)}>{node.kind !== 'integration' && <Icon aria-hidden="true" />}<span dir={isTool ? 'ltr' : undefined} className={isTool ? 'inline-ltr' : undefined}>{node.label[locale]}</span></div></foreignObject>
    </g>; })}
  </svg>;
}
export function WorkflowDiagram({ workflow, locale, legend = false }: { workflow: Workflow; locale: Locale; legend?: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const live = useInView(ref, { amount: 0.3 }); const seen = useInView(ref, { amount: 0.3, once: true }); const reduced = useReducedMotion();
  const reducedMotion = !!reduced;
  return <div className="workflow" ref={ref} data-in-view={live} data-reduced-motion={reducedMotion}>
    <Graph workflow={workflow} locale={locale} mobile={false} live={live} seen={seen} reduced={reducedMotion} /><Graph workflow={workflow} locale={locale} mobile live={live} seen={seen} reduced={reducedMotion} />
    <ol className="sr-only">{workflow.nodes.map(n => <li key={n.id}>{copy.diagramKinds[n.kind][locale]}: {n.label[locale]}</li>)}</ol>
    {legend && <div className="diagram-legend" aria-hidden="true">{(['trigger', 'process', 'ai', 'integration', 'result'] as NodeKind[]).map(kind => <span key={kind}><i className={`legend-dot legend-${kind}`} />{copy.diagramKinds[kind][locale]}</span>)}</div>}
  </div>;
}
