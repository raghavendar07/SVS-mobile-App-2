import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { useRoute } from '../state/RouteContext';
import { Phone, ChevronLeft } from '../components/Icon';

export function RouteBlocked() {
  const nav = useNavigate();
  const { state, checklist, failedCriticalIds, failedNonCriticalIds, dispatch } = useRoute();
  const [showOverride, setShowOverride] = useState(false);
  const [overrideNote, setOverrideNote] = useState('');
  const blockedByCritical = failedCriticalIds.length > 0;
  const allFailedIds = [...failedCriticalIds, ...failedNonCriticalIds];
  const failedItems = checklist.filter(c => allFailedIds.includes(c.id));

  const submitOverride = () => {
    if (!overrideNote.trim()) return;
    dispatch({ type: 'adminOverride', note: overrideNote.trim() });
    nav('/notes?stage=post-inspection');
  };

  const requestApproval = () => {
    if (blockedByCritical) {
      setShowOverride(true);
      return;
    }
    nav('/awaiting-approval');
  };

  const heroBg = blockedByCritical
    ? 'linear-gradient(180deg,#7F1D1D,#991B1B 60%,#B91C1C)'
    : 'linear-gradient(180deg,#92400E,#B45309 60%,#D97706)';

  return (
    <>
      <StatusBar time="8:09" dark />
      <div className="scr" style={{ background: heroBg }}>
        <div className="appbar" style={{ paddingTop: 10, color: '#fff' }}>
          <button
            className="iconbtn"
            style={{ background: 'rgba(255,255,255,.16)', border: 'none', color: '#fff' }}
            onClick={() => nav('/checklist')}
            aria-label="Back to checklist"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            style={{
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.05em',
              textTransform: 'uppercase'
            }}
          >
            {blockedByCritical ? 'Route blocked' : 'Approval needed'}
          </div>
          <div style={{ width: 40 }} />
        </div>

        <div className="scr-body" style={{ color: '#fff' }}>
          <div className="pad scrollwrap" style={{ paddingBottom: 16, color: '#fff' }}>
            <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 18 }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.12)',
                  margin: '0 auto 14px',
                  display: 'grid',
                  placeItems: 'center',
                  border: '3px solid rgba(255,255,255,.25)'
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24">
                  <path
                    d="M12 9v4m0 4h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.03em', color: '#fff' }}>
                {blockedByCritical ? 'Cannot start route' : 'Admin approval required'}
              </h2>
              <p
                style={{
                  fontSize: 13.5,
                  marginTop: 8,
                  lineHeight: 1.5,
                  color: 'rgba(255,255,255,.85)',
                  fontWeight: 450
                }}
              >
                {blockedByCritical
                  ? 'A critical inspection item failed. You must contact your admin to proceed. This screen cannot be bypassed.'
                  : 'Some checklist items failed. Admin can approve the route with these items pending. Notes already attached.'}
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,.10)',
                borderRadius: 16,
                padding: '14px 16px',
                border: '1px solid rgba(255,255,255,.15)',
                marginBottom: 14
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.07em',
                  color: 'rgba(255,255,255,.7)',
                  textTransform: 'uppercase',
                  marginBottom: 10
                }}
              >
                Failed items
              </div>
              {failedItems.length === 0 ? (
                <div style={{ fontSize: 13, opacity: 0.7 }}>No items currently failed.</div>
              ) : (
                failedItems.map((it, i) => {
                  const note = state.inspectionFailNotes[it.id] ?? '';
                  return (
                    <div
                      key={it.id}
                      style={{
                        padding: '12px 0',
                        borderBottom:
                          i === failedItems.length - 1
                            ? 'none'
                            : '1px solid rgba(255,255,255,.12)'
                      }}
                    >
                      <div className="row gap10">
                        <span
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            background: 'rgba(255,255,255,.16)',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#fff',
                            flex: '0 0 auto'
                          }}
                        >
                          ✕
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, flex: 1 }}>
                          {it.label}
                          {it.critical && (
                            <span
                              style={{
                                marginLeft: 8,
                                fontSize: 9.5,
                                fontWeight: 800,
                                letterSpacing: '.06em',
                                color: '#FCA5A5',
                                background: 'rgba(255,255,255,.10)',
                                padding: '2px 6px',
                                borderRadius: 6
                              }}
                            >
                              CRITICAL
                            </span>
                          )}
                        </span>
                      </div>
                      {note && (
                        <div
                          style={{
                            marginTop: 6,
                            marginLeft: 36,
                            fontSize: 12.5,
                            lineHeight: 1.45,
                            color: 'rgba(255,255,255,.85)',
                            fontWeight: 500
                          }}
                        >
                          “{note}”
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <button
              onClick={() => alert('Calling admin · +44 117 555 0120')}
              style={{
                width: '100%',
                height: 56,
                borderRadius: 16,
                background: '#fff',
                color: blockedByCritical ? 'var(--red)' : '#B45309',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: 15.5,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,.25)'
              }}
            >
              <Phone size={19} />
              Call admin · +44 117 555 0120
            </button>

            <button
              onClick={requestApproval}
              style={{
                marginTop: 10,
                width: '100%',
                height: 50,
                borderRadius: 14,
                background: 'rgba(255,255,255,.14)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,.3)',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {blockedByCritical
                ? 'Admin override (requires note)'
                : 'Request approval from admin'}
            </button>

            {showOverride && (
              <div
                style={{
                  marginTop: 12,
                  background: 'rgba(255,255,255,.10)',
                  borderRadius: 16,
                  padding: 14,
                  border: '1px solid rgba(255,255,255,.18)'
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '.07em',
                    color: 'rgba(255,255,255,.85)',
                    textTransform: 'uppercase',
                    marginBottom: 8
                  }}
                >
                  Admin override note (required)
                </div>
                <textarea
                  className="fld"
                  rows={3}
                  placeholder="Reason for override, follow-up actions, ETA to repair…"
                  value={overrideNote}
                  onChange={e => setOverrideNote(e.target.value)}
                  style={{
                    background: '#fff',
                    color: 'var(--ink)',
                    border: 'none',
                    minHeight: 84,
                    resize: 'none'
                  }}
                />
                <Button
                  variant="green"
                  style={{ marginTop: 12 }}
                  disabled={!overrideNote.trim()}
                  onClick={submitOverride}
                >
                  Apply override and proceed
                </Button>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 11.5,
                    color: 'rgba(255,255,255,.75)',
                    lineHeight: 1.4
                  }}
                >
                  Override logged with admin ID, note, and timestamp. Compliance team is notified.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
