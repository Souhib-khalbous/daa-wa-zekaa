import type { Localized, Locale } from './i18n';
export type NodeKind = 'trigger' | 'process' | 'ai' | 'integration' | 'result';
export type WFNode = { id: string; kind: NodeKind; label: Localized; icon?: string };
export type WFEdge = { from: string; to: string; label?: Localized };
export type Workflow = { description: Localized; nodes: WFNode[]; edges: WFEdge[] };
export const geometry = { width: 160, height: 84, resultHeight: 92, gapX: 36, gapY: 46, padding: 24, radius: 12, mobileWidth: 330, mobileNodeWidth: 234, mobileGap: 54, mobileBranch: 20, packetRadius: 4 } as const;
export function layoutGraph(workflow: Workflow, locale: Locale, mobile: boolean) {
  const g = geometry; const ranks = new Map(workflow.nodes.map(n => [n.id, 0]));
  for (let pass = 0; pass < workflow.nodes.length; pass++) { let changed = false; for (const e of workflow.edges) { const next = (ranks.get(e.from) || 0) + 1; if (next > (ranks.get(e.to) || 0)) { ranks.set(e.to, next); changed = true; } } if (!changed) break; if (pass === workflow.nodes.length - 1) throw new Error('Workflow must be an acyclic graph.'); }
  const columns = Math.max(...ranks.values()) + 1;
  const groupSizes = Array.from({ length: columns }, (_, rank) => workflow.nodes.filter(n => ranks.get(n.id) === rank).length);
  const width = mobile ? g.mobileWidth : columns * g.width + (columns - 1) * g.gapX + g.padding * 2;
  const height = mobile ? workflow.nodes.length * g.height + (workflow.nodes.length - 1) * g.mobileGap + g.padding * 2 : Math.max(...groupSizes) * (g.height + g.gapY) - g.gapY + g.padding * 2;
  const used = new Map<number, number>();
  const nodes = workflow.nodes.map((node, index) => { const rank = ranks.get(node.id) || 0; const row = used.get(rank) || 0; used.set(rank, row + 1); const count = groupSizes[rank]; const center = (height - count * g.height - (count - 1) * g.gapY) / 2; const physicalColumn = locale === 'ar' ? columns - rank - 1 : rank;
    return { ...node, x: mobile ? (width - g.mobileNodeWidth) / 2 : g.padding + physicalColumn * (g.width + g.gapX), y: mobile ? g.padding + index * (g.height + g.mobileGap) : center + row * (g.height + g.gapY), w: mobile ? g.mobileNodeWidth : g.width, h: g.height };
  });
  const edges = workflow.edges.map((edge, index) => {
    const from = nodes.find(n => n.id === edge.from); const to = nodes.find(n => n.id === edge.to); if (!from || !to) throw new Error('Workflow edge references a missing node.');
    let d: string; let midpoint: { x: number; y: number };
    if (mobile) { const x = from.x + from.w / 2; const sy = from.y + from.h; const ey = to.y; const adjacent = nodes.indexOf(to) === nodes.indexOf(from) + 1;
      if (adjacent) { d = `M ${x} ${sy} V ${ey}`; midpoint = { x, y: (sy + ey) / 2 }; }
      else { const side = locale === 'ar' ? width - g.mobileBranch - index * 2 : g.mobileBranch + index * 2; const r = g.radius; const sign = Math.sign(side - x); d = `M ${x} ${sy} v ${g.padding - r} q 0 ${r} ${sign * r} ${r} H ${side - sign * r} q ${sign * r} 0 ${sign * r} ${r} V ${ey - g.padding - r} q 0 ${r} ${-sign * r} ${r} H ${x - sign * r} q ${-sign * r} 0 ${-sign * r} ${r} V ${ey}`; midpoint = { x: side, y: (sy + ey) / 2 }; }
    } else { const sign = locale === 'ar' ? -1 : 1; const sx = from.x + (sign === 1 ? from.w : 0); const ex = to.x + (sign === 1 ? 0 : to.w); const sy = from.y + from.h / 2; const ey = to.y + to.h / 2; const mid = (sx + ex) / 2; const r = Math.min(g.radius, Math.abs(ey - sy) / 2); const ys = Math.sign(ey - sy);
      d = sy === ey ? `M ${sx} ${sy} H ${ex}` : `M ${sx} ${sy} H ${mid - sign * r} Q ${mid} ${sy} ${mid} ${sy + ys * r} V ${ey - ys * r} Q ${mid} ${ey} ${mid + sign * r} ${ey} H ${ex}`; midpoint = { x: mid, y: (sy + ey) / 2 };
    }
    return { ...edge, d, midpoint };
  });
  return { width, height, nodes, edges };
}
