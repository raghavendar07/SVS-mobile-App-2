import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { useRoute } from '../state/RouteContext';
import type { IncidentCategory } from '../data/seed';

const CATEGORIES: { key: IncidentCategory; label: string; color: string; icon: React.ReactNode }[] = [
  {
    key: 'breakdown',
    label: 'Vehicle breakdown',
    color: 'var(--red)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24">
        <path
          d="M3 13.5 5 8a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5.5V18h-2v-1.5H5V18H3v-4.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    key: 'passenger',
    label: 'Passenger incident',
    color: 'var(--blue)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.7" fill="none" />
      </svg>
    )
  },
  {
    key: 'traffic',
    label: 'Traffic delay',
    color: 'var(--blue)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  {
    key: 'accident',
    label: 'Accident',
    color: 'var(--amber)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24">
        <path
          d="M12 9v4m0 4h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    key: 'medical',
    label: 'Medical emergency',
    color: 'var(--red)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24">
        <path
          d="M12 3a7 7 0 0 0-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 0 0-7-7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="none"
        />
        <path d="M12 7v6m-3-3h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    )
  },
  {
    key: 'other',
    label: 'Other',
    color: 'var(--muted)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24">
        <circle cx="6" cy="12" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="18" cy="12" r="1.6" fill="currentColor" />
      </svg>
    )
  }
];

export function IncidentReporting() {
  const nav = useNavigate();
  const { dispatch } = useRoute();
  const [selected, setSelected] = useState<IncidentCategory>('traffic');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    dispatch({ type: 'reportIncident', category: selected, notes });
    setSubmitted(true);
    setTimeout(() => nav(-1), 900);
  };

  return (
    <>
      <StatusBar time="10:12" />
      <div className="scr">
        <AppBar title="Report an issue" trailing={<div style={{ width: 40 }} />} />
        <div className="scr-body">
          <div className="pad scrollwrap" style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: 16 }}>
            <p
              style={{
                fontSize: 13.5,
                color: 'var(--muted)',
                lineHeight: 1.5,
                marginBottom: 14,
                fontWeight: 450
              }}
            >
              Select a category. Reports are sent to the operations team in real time.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {CATEGORIES.map(c => {
                const isSel = c.key === selected;
                return (
                  <button
                    key={c.key}
                    onClick={() => setSelected(c.key)}
                    className="tile"
                    style={{
                      padding: 14,
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: isSel ? 'var(--blue-50)' : undefined,
                      borderColor: isSel ? 'var(--blue-200)' : undefined,
                      boxShadow: isSel ? '0 0 0 2px var(--blue) inset' : undefined
                    }}
                  >
                    <span
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 11,
                        background: isSel ? 'var(--blue)' : '#fff',
                        color: isSel ? '#fff' : c.color,
                        display: 'grid',
                        placeItems: 'center',
                        marginBottom: 9,
                        border: isSel ? 'none' : '1px solid var(--line)'
                      }}
                    >
                      {c.icon}
                    </span>
                    <div
                      style={{
                        fontSize: 13.5,
                        fontWeight: isSel ? 800 : 700,
                        color: isSel ? 'var(--blue-700)' : 'var(--ink)'
                      }}
                    >
                      {c.label}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="label">Photo evidence</span>
              <div className="row gap10" style={{ marginTop: 8 }}>
                <button
                  type="button"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 13,
                    border: '1.5px dashed var(--line-2)',
                    background: 'var(--surface)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--muted-2)',
                    cursor: 'pointer'
                  }}
                  aria-label="Add photo"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 13,
                    background: 'linear-gradient(135deg,#94A3B8,#64748B)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 64 64">
                    <path d="M10 50 26 34l10 10 8-8 12 14H10Z" fill="#fff" opacity="0.35" />
                    <circle cx="44" cy="20" r="6" fill="#fff" opacity="0.4" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="label">Notes</span>
              <textarea
                className="fld"
                style={{ marginTop: 8, height: 64 }}
                placeholder="Describe what happened…"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <Button style={{ marginTop: 'auto', marginBottom: 16 }} onClick={submit} disabled={submitted}>
              {submitted ? 'Report sent ✓' : 'Submit report'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
