import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from './Icon';

type Props = {
  title?: string;
  sub?: string;
  leading?: ReactNode | 'back' | null;
  trailing?: ReactNode;
  center?: boolean;
};

export function AppBar({ title, sub, leading = 'back', trailing, center }: Props) {
  const nav = useNavigate();

  const lead =
    leading === 'back' ? (
      <button className="iconbtn" onClick={() => nav(-1)} aria-label="Back">
        <ChevronLeft size={20} />
      </button>
    ) : leading === null ? (
      <div style={{ width: 40 }} />
    ) : (
      leading
    );

  return (
    <div className="appbar" style={{ paddingTop: 10 }}>
      {lead}
      <div style={{ textAlign: center ? 'center' : 'left', flex: center ? 1 : undefined }}>
        {sub && <div className="sub">{sub}</div>}
        {title && <div className="title" style={{ fontSize: center ? 18 : 21 }}>{title}</div>}
      </div>
      {trailing ?? <div style={{ width: 40 }} />}
    </div>
  );
}
