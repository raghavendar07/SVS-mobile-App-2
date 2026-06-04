import type { ReactNode } from 'react';
import { Check } from './Icon';

export type TimelineItemState = 'done' | 'now' | 'upcoming' | 'final';

export function Timeline({ children }: { children: ReactNode }) {
  return <div className="tl">{children}</div>;
}

export function TimelineItem({
  state,
  children
}: {
  state: TimelineItemState;
  children: ReactNode;
}) {
  const cls =
    state === 'done' ? 'done' : state === 'now' ? 'now' : '';
  return (
    <div className={`tl-item ${cls}`}>
      <span className="tl-dot">
        {state === 'done' && <Check size={11} stroke="#fff" strokeWidth={3.5} />}
        {state === 'now' && <i />}
      </span>
      {children}
    </div>
  );
}
