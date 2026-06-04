import { useState } from 'react';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';

type Doc = {
  id: string;
  title: string;
  detail: string;
  detailColor?: string;
  badge: { label: string; tone: 'red' | 'green' | 'amber' };
  iconBg: string;
  iconColor: string;
};

const DOCS: Doc[] = [
  {
    id: 'licence',
    title: 'Driving licence',
    detail: 'Expires 18 Mar 2026',
    detailColor: 'var(--red)',
    badge: { label: 'Expiring', tone: 'red' },
    iconBg: 'var(--blue-50)',
    iconColor: 'var(--blue)'
  },
  {
    id: 'insurance',
    title: 'Insurance certificate',
    detail: 'Valid until 14 Jul 2026',
    badge: { label: 'Valid', tone: 'green' },
    iconBg: 'var(--green-50)',
    iconColor: 'var(--green)'
  },
  {
    id: 'training',
    title: 'Training certificates',
    detail: '4 certificates · all current',
    badge: { label: 'Valid', tone: 'green' },
    iconBg: '#EEF2FF',
    iconColor: '#4338CA'
  },
  {
    id: 'vehicle',
    title: 'Vehicle documents',
    detail: 'MOT due 30 Mar 2026',
    detailColor: '#B45309',
    badge: { label: 'Due soon', tone: 'amber' },
    iconBg: 'var(--amber-50)',
    iconColor: 'var(--amber)'
  }
];

export function Documents() {
  const [q, setQ] = useState('');
  const filtered = DOCS.filter(d => d.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <StatusBar time="10:42" />
      <div className="scr">
        <AppBar
          title="My Documents"
          center
          trailing={
            <div className="iconbtn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.9" fill="none" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </div>
          }
        />
        <div className="scr-body">
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            <input
              className="fld"
              style={{ marginBottom: 12, height: 44 }}
              placeholder="Search documents…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />

            {filtered.map(d => (
              <div key={d.id} className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
                <div className="row gap12">
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: d.iconBg,
                      color: d.iconColor,
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24">
                      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
                      <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 800 }}>{d.title}</div>
                    <div
                      style={{
                        fontSize: 12,
                        color: d.detailColor ?? 'var(--muted)',
                        fontWeight: 600
                      }}
                    >
                      {d.detail}
                    </div>
                  </div>
                  <Pill tone={d.badge.tone}>{d.badge.label}</Pill>
                </div>
              </div>
            ))}

            <div className="card soft" style={{ padding: '14px 16px', marginTop: 4 }}>
              <div className="row between">
                <span className="label">Driving licence · preview</span>
                <span style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>
                  PDF · 1.2 MB
                </span>
              </div>
              <div
                style={{
                  marginTop: 10,
                  height: 70,
                  borderRadius: 12,
                  background: 'linear-gradient(120deg,#DBEAFE,#EFF6FF)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '0 14px'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 54,
                    borderRadius: 6,
                    background: '#fff',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>DVLA UK · Class B</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>FENWICK 902 6DF 47</div>
                </div>
              </div>
              <Button size="sm" style={{ marginTop: 12 }}>
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path
                    d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"
                    stroke="#fff"
                    strokeWidth="1.9"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
