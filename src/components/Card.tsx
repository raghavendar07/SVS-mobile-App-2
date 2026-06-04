import type { ReactNode, CSSProperties } from 'react';

export function Card({
  soft,
  children,
  style,
  className = '',
  onClick
}: {
  soft?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`card${soft ? ' soft' : ''} ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
