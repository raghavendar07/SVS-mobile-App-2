import type { ReactNode, CSSProperties } from 'react';

type Tone = 'blue' | 'green' | 'amber' | 'red' | 'grey';

export function Pill({
  tone = 'blue',
  dot,
  children,
  style,
  className = ''
}: {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const dotColor = {
    blue: 'var(--blue)',
    green: 'var(--green)',
    amber: 'var(--amber)',
    red: 'var(--red)',
    grey: 'var(--muted-2)'
  }[tone];
  return (
    <span className={`pill pill-${tone} ${className}`} style={style}>
      {dot && <span className="dot" style={{ background: dotColor }} />}
      {children}
    </span>
  );
}
