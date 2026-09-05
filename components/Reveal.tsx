import { clsx } from 'clsx';

// No client JavaScript: the reveal is a CSS scroll-driven animation. Browsers
// without `animation-timeline` simply render the content, so a heading can
// never be stranded at opacity 0 by a slow bundle or a deep link.
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('reveal', className)}>{children}</div>;
}
