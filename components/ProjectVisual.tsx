import type { ProjectPreview } from '@/content/projects';
import type { Locale } from '@/lib/i18n';
export function ProjectVisual({ project, locale }: { project: ProjectPreview; locale: Locale }) {
  const messaging = project.category === 'chatbots' || project.visual === 'messages';
  const monitoring = project.category === 'monitoring';
  const tiles = ['shorts', 'character', 'product', 'creative'].includes(project.visual);
  return <div className={`project-visual visual-${project.visual}`} aria-hidden="true">
    <div className="visual-sheet"><div className="visual-toolbar"><span className="visual-toolbar-dot" /><span>{project.visualLabels[0][locale]}</span><span className="visual-mini-index inline-ltr" dir="ltr">{String(project.id).padStart(2, '0')}</span></div>
      {messaging ? <div className="visual-conversation"><div className="message-row"><span className="visual-avatar" /><div className="message-lines"><i /><i /></div></div><div className="message-row message-answer"><span className="visual-avatar" /><div className="message-lines"><i /><i /><i /></div></div><div className="conversation-handoff"><svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-9" /></svg>{project.visualLabels[2][locale]}</div></div>
      : monitoring ? <div className="visual-records">{[0, 1, 2].map(row => <div className="record-row" key={row}><svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h5" /></svg><span><i /><i /></span><b className="record-check">✓</b></div>)}</div>
      : project.visual === 'operations' ? <div className="visual-kanban">{[0, 1, 2].map(col => <div key={col}><span /><i /><i />{col === 0 && <i />}</div>)}</div>
      : tiles ? <div className="visual-tiles">{[0, 1, 2].map(tile => <div key={tile} className={`asset-tile asset-${tile}`}><svg viewBox="0 0 80 80">{project.visual === 'product' ? <><rect x="25" y="22" width="30" height="44" rx="6" /><path d="M32 22v-8h16v8M25 45h30" /></> : <><rect x="16" y="10" width="48" height="60" rx="7" /><path d="m33 28 18 12-18 12z" /></>}</svg></div>)}</div>
      : <div className="visual-publishing"><div className="mini-document"><svg viewBox="0 0 48 56"><rect x="8" y="4" width="32" height="48" rx="4" /><path d="M16 18h16M16 26h16M16 34h10" /></svg></div><svg className="visual-connector directional" viewBox="0 0 80 90"><path d="M0 45h28q12 0 12-12V19q0-9 10-9h30M40 45h40M40 45v26q0 9 10 9h30" /></svg><div className="mini-channels">{(project.visual === 'writing' ? ['Trello', 'Telegram', 'Document'] : ['YouTube', 'Instagram', 'LinkedIn']).map(tool => <span key={tool} className="inline-ltr" dir="ltr">{tool}</span>)}</div></div>}
    </div><div className="visual-output"><span className="output-check">✓</span><span>{project.visualLabels[2][locale]}</span></div>
  </div>;
}
