import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { useRoute } from '../state/RouteContext';

const AUTO_APPROVE_MS = 9000;
const REQUEST_ID = 'APR-' + Math.floor(1000 + Math.random() * 9000);

export function AwaitingApproval() {
  const nav = useNavigate();
  const {
    state,
    checklist,
    failedCriticalIds,
    failedNonCriticalIds,
    dispatch
  } = useRoute();

  const blockedByCritical = failedCriticalIds.length > 0;
  const allFailedIds = [...failedCriticalIds, ...failedNonCriticalIds];
  const failedItems = checklist.filter(c => allFailedIds.includes(c.id));

  const [elapsed, setElapsed] = useState(0);
  const [outcome, setOutcome] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    if (outcome !== 'pending') return;
    const tick = setInterval(() => setElapsed(e => e + 1), 1000);
    const auto = setTimeout(() => approve('auto'), AUTO_APPROVE_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(auto);
    };
  }, [outcome]);

  const approve = (mode: 'auto' | 'manual') => {
    const note =
      mode === 'auto'
        ? `Admin auto-approved · ${failedItems.length} item${
            failedItems.length > 1 ? 's' : ''
          } pending follow-up`
        : adminNote.trim() ||
          `Admin approved · ${failedItems.length} item${
            failedItems.length > 1 ? 's' : ''
          } pending follow-up`;
    dispatch({ type: 'adminOverride', note });
    setOutcome('approved');
    setTimeout(() => nav('/notes?stage=post-inspection'), 1100);
  };

  const deny = () => {
    setOutcome('denied');
  };

  const ss = (n: number) => String(n).padStart(2, '0');
  const elapsedLabel = `${ss(Math.floor(elapsed / 60))}:${ss(elapsed % 60)}`;

  if (outcome === 'approved') {
    return (
      <>
        <StatusBar time="8:11" />
        <div className="scr" style={{ background: '#fff' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 30px',
              textAlign: 'center'
            }}
          >
            <div style={{ position: 'relative', width: 128, height: 128, marginBottom: 16 }}>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'var(--green-50)',
                  animation: 'ping 2.4s ease-out infinite'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 14,
                  borderRadius: '50%',
                  background: 'var(--green-100)'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 26,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 14px 30px rgba(22,163,74,.4)'
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24">
                  <path
                    d="m5 13 4 4L19 7"
                    stroke="#fff"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em' }}>
              Approval granted
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--muted)',
                marginTop: 8,
                lineHeight: 1.5,
                fontWeight: 450
              }}
            >
              Admin cleared the route. Logged with override note.
            </p>
            <div className="card soft" style={{ marginTop: 20, padding: '10px 14px' }}>
              <span className="row gap8" style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>
                Request {REQUEST_ID} · {elapsedLabel}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (outcome === 'denied') {
    return (
      <>
        <StatusBar time="8:11" />
        <div className="scr">
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 30px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'var(--red-50)',
                color: 'var(--red)',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 16
              }}
            >
              <svg width="46" height="46" viewBox="0 0 24 24">
                <path d="M6 18 18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.03em' }}>
              Approval denied
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--muted)',
                marginTop: 8,
                lineHeight: 1.5,
                fontWeight: 450,
                maxWidth: 280
              }}
            >
              Admin requires the failed items to be resolved before route can start.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 24 }}>
              <Button onClick={() => nav('/checklist')}>Back to checklist</Button>
              <Button variant="line" onClick={() => setOutcome('pending')}>
                Retry approval request
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StatusBar time="8:10" />
      <div className="scr">
        <div className="scr-body">
          <div
            className="pad scrollwrap"
            style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: 16, paddingTop: 18 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <div
                style={{
                  position: 'relative',
                  width: 128,
                  height: 128,
                  margin: '0 auto 16px'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'var(--blue-50)',
                    animation: 'ping 2.4s ease-out infinite'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    inset: 14,
                    borderRadius: '50%',
                    background: 'var(--blue-100)'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    inset: 26,
                    borderRadius: '50%',
                    background: 'var(--blue)',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 14px 30px rgba(37,99,235,.4)'
                  }}
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    style={{ animation: 'spin 2.4s linear infinite' }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="#fff"
                      strokeWidth="2.5"
                      fill="none"
                      opacity="0.3"
                    />
                    <path
                      d="M20 12a8 8 0 0 0-8-8"
                      stroke="#fff"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.03em' }}>
                Waiting for admin approval
              </h2>
              <p
                style={{
                  fontSize: 13.5,
                  color: 'var(--muted)',
                  marginTop: 8,
                  lineHeight: 1.5,
                  fontWeight: 450,
                  maxWidth: 310,
                  margin: '8px auto 0'
                }}
              >
                Request sent to operations. Notes and failed items have been forwarded.
                You'll be notified as soon as admin responds.
              </p>
            </div>

            <div className="card soft" style={{ padding: '14px 16px', marginBottom: 12 }}>
              <div className="row between">
                <div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                    Request ID
                  </div>
                  <div className="mono" style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>
                    {REQUEST_ID}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                    Elapsed
                  </div>
                  <div className="mono" style={{ fontSize: 17, fontWeight: 800, marginTop: 2, color: 'var(--blue)' }}>
                    {elapsedLabel}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: 'var(--muted)',
                  fontWeight: 600
                }}
              >
                Severity: {blockedByCritical ? 'High priority' : 'Standard'} · {failedItems.length} item
                {failedItems.length > 1 ? 's' : ''} flagged
              </div>
            </div>

            <span className="label" style={{ display: 'block', marginBottom: 8 }}>
              Sent to admin
            </span>
            <div className="card" style={{ padding: '6px 14px', marginBottom: 12 }}>
              {failedItems.map((it, i) => {
                const note = state.inspectionFailNotes[it.id] ?? '';
                return (
                  <div
                    key={it.id}
                    style={{
                      padding: '10px 0',
                      borderBottom: i === failedItems.length - 1 ? 'none' : '1px solid var(--line)'
                    }}
                  >
                    <div className="row gap10">
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 7,
                          background: 'var(--red-50)',
                          color: 'var(--red)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: 13,
                          fontWeight: 800,
                          flex: '0 0 auto'
                        }}
                      >
                        ✕
                      </span>
                      <span style={{ fontSize: 13.5, fontWeight: 700, flex: 1 }}>
                        {it.label}
                        {it.critical && (
                          <span
                            aria-label="Critical item"
                            style={{
                              marginLeft: 5,
                              color: 'var(--red)',
                              display: 'inline-flex',
                              verticalAlign: 'middle'
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24">
                              <path
                                d="m12 2 2.6 6.6 7 .6-5.3 4.6 1.7 6.9L12 17l-6 3.7 1.7-6.9L2.4 9.2l7-.6L12 2Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        )}
                      </span>
                    </div>
                    {note && (
                      <div
                        style={{
                          marginTop: 4,
                          marginLeft: 34,
                          fontSize: 12.5,
                          lineHeight: 1.45,
                          color: 'var(--muted)',
                          fontWeight: 500
                        }}
                      >
                        “{note}”
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="card"
              style={{
                padding: '12px 14px',
                marginBottom: 16,
                background: 'var(--surface)',
                fontSize: 12.5,
                color: 'var(--muted)',
                lineHeight: 1.5
              }}
            >
              <span className="row gap8" style={{ fontWeight: 700, color: 'var(--ink-2)', marginBottom: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" style={{ color: 'var(--blue)' }}>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" />
                  <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
                </svg>
                You can call admin directly
              </span>
              Phone +44 117 555 0120 — keep the app open to receive the response.
            </div>

            <span
              className="label"
              style={{ display: 'block', marginBottom: 8, color: 'var(--muted-2)' }}
            >
              Demo · simulate admin response
            </span>
            <textarea
              className="fld"
              rows={2}
              placeholder="Optional admin note (used when Approve clicked)"
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              style={{ minHeight: 60, resize: 'none', marginBottom: 10 }}
            />
            <div className="row gap10">
              <Button variant="line" style={{ flex: 1, color: 'var(--red)', borderColor: '#FECACA' }} onClick={deny}>
                Deny
              </Button>
              <Button variant="green" style={{ flex: 1.4 }} onClick={() => approve('manual')}>
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
