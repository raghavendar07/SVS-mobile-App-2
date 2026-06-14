import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { passengerById } from '../data/seed';
import { ChevronLeft, ChevronRight, Phone } from '../components/Icon';

const SKIP_REASONS = [
  'Passenger no-show',
  'Passenger declined ride',
  'Wrong address',
  'Unsafe to stop',
  'Other'
];

export function ArrivedAtPickup() {
  const { stopId = '' } = useParams();
  const nav = useNavigate();
  const { stops, dispatch } = useRoute();
  const stop = stops.find(s => s.id === stopId) ?? stops[0];
  const passenger = passengerById(stop.passengerId);
  const idx = stops.indexOf(stop) + 1;
  const [notes, setNotes] = useState('');

  const [showSkip, setShowSkip] = useState(false);
  const [skipReason, setSkipReason] = useState<string>(SKIP_REASONS[0]);
  const [skipNote, setSkipNote] = useState('');
  const skipNoteOk = skipNote.trim().length >= 5;

  const onBoarded = () => {
    dispatch({ type: 'boardPassenger', stopId: stop.id, passengerId: stop.passengerId, notes });
    nav(`/boarded/${stop.id}`);
  };

  const goToNextPickup = () => {
    const i = stops.findIndex(s => s.id === stop.id);
    const next = stops[i + 1];
    if (!next) {
      nav('/timeline');
      return;
    }
    if (next.kind === 'final') nav(`/dropoff/${next.id}`);
    else nav(`/pickup/${next.id}`);
  };

  const submitSkip = () => {
    if (!skipNoteOk) return;
    dispatch({ type: 'noShow', stopId: stop.id, reason: skipReason, notes: skipNote.trim() });
    goToNextPickup();
  };

  return (
    <>
      <StatusBar time="8:15" dark />
      <div className="scr">
        <div className="map" style={{ height: 230, position: 'relative', flex: '0 0 230px' }}>
          <svg viewBox="0 0 402 230" preserveAspectRatio="xMidYMid slice">
            <rect width="402" height="230" fill="#EAEFF4" />
            <g fill="#F4F7FA">
              <rect x="-10" y="-10" width="160" height="110" rx="6" />
              <rect x="240" y="20" width="180" height="100" rx="6" />
              <rect x="20" y="140" width="150" height="120" rx="6" />
              <rect x="250" y="150" width="170" height="110" rx="6" />
            </g>
            <path d="M180 -10 V240 M-10 120 H420" stroke="#fff" strokeWidth="14" />
            <path
              d="M40 200 C100 160 140 150 180 120 C210 96 250 70 300 30"
              stroke="#2563EB"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <div className="mk" style={{ left: '45%', top: '55%' }}>
            <svg width="34" height="42" viewBox="0 0 34 42">
              <path
                d="M17 42C9 30 2 24 2 15a15 15 0 0 1 30 0c0 9-7 15-15 27Z"
                fill="#2563EB"
              />
              <circle cx="17" cy="15" r="7.5" fill="#fff" />
              <circle cx="17" cy="15" r="3.4" fill="#2563EB" />
            </svg>
          </div>
          <div style={{ position: 'absolute', top: 58, left: 14 }}>
            <button
              className="iconbtn"
              style={{ background: '#fff', boxShadow: 'var(--shadow)' }}
              onClick={() => nav(-1)}
              aria-label="Back"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div
            className="card soft"
            style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}
          >
            <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'var(--green-50)',
                  color: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                </svg>
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800 }}>You've arrived</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{stop.address}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="scr-body" style={{ paddingBottom: 0 }}>
          <div className="pad scrollwrap" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="card soft" style={{ padding: 16, marginTop: 6 }}>
              <div className="row between">
                <span className="label">
                  Stop {idx} of {stops.length} · Pickup
                </span>
                <Pill tone="amber" dot>
                  Waiting
                </Pill>
              </div>
              <div className="row gap12" style={{ marginTop: 14 }}>
                <img
                  className="avatar"
                  style={{ width: 54, height: 54 }}
                  src={passenger?.avatar}
                  alt=""
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
                    {passenger?.name ?? 'Passenger'}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--muted)',
                      fontWeight: 500,
                      marginTop: 1
                    }}
                  >
                    Scheduled pickup · {passenger?.scheduledAt ?? stop.scheduledAt}
                  </div>
                </div>
                <button
                  className="iconbtn"
                  style={{ background: 'var(--blue-50)', color: 'var(--blue)', border: 'none' }}
                  aria-label="Call passenger"
                >
                  <Phone size={20} />
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: '13px 16px', marginTop: 12 }}>
              <div className="row gap10">
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ color: 'var(--red)' }}>
                  <path
                    d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                  />
                  <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                    Emergency contact
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>
                    {passenger?.emergencyContact.name} · {passenger?.emergencyContact.phone}
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--muted-2)' }} />
              </div>
            </div>

            {!showSkip && (
              <div style={{ marginTop: 12 }}>
                <span className="label">Pickup notes</span>
                <textarea
                  className="fld"
                  placeholder="Add a note about this pickup…"
                  style={{ marginTop: 8, height: 64 }}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
            )}

            {showSkip && (
              <div
                className="card"
                style={{
                  marginTop: 12,
                  padding: 14,
                  background: 'var(--red-50)',
                  borderColor: '#FECACA',
                  borderLeft: '3px solid var(--red)'
                }}
              >
                <div className="row between" style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '.05em',
                      color: '#B91C1C',
                      textTransform: 'uppercase'
                    }}
                  >
                    Reason for skipping pickup
                  </span>
                  <button
                    onClick={() => setShowSkip(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#B91C1C',
                      fontFamily: 'inherit',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div
                  className="row gap8"
                  style={{ flexWrap: 'wrap', marginBottom: 10 }}
                >
                  {SKIP_REASONS.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSkipReason(r)}
                      className={`pill ${skipReason === r ? 'pill-red' : 'pill-grey'}`}
                      style={{
                        cursor: 'pointer',
                        height: 30,
                        padding: '0 12px',
                        border:
                          skipReason === r
                            ? '1.5px solid var(--red)'
                            : '1.5px solid transparent'
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  placeholder="Explain what happened. Required (min 5 chars)."
                  value={skipNote}
                  onChange={e => setSkipNote(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1.5px solid #FCA5A5',
                    borderRadius: 12,
                    padding: '10px 12px',
                    fontFamily: 'inherit',
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: 'var(--ink)',
                    background: '#fff',
                    resize: 'none',
                    outline: 'none',
                    minHeight: 80
                  }}
                />
                {!skipNoteOk && (
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 11.5,
                      color: '#B91C1C',
                      fontWeight: 600
                    }}
                  >
                    Add a short explanation to confirm skip.
                  </div>
                )}
                <Button
                  variant="red"
                  size="sm"
                  style={{ marginTop: 12 }}
                  disabled={!skipNoteOk}
                  onClick={submitSkip}
                >
                  Skip pickup · go to next stop
                </Button>
              </div>
            )}

            <div className="row gap12" style={{ marginTop: 'auto', marginBottom: 16 }}>
              <Button
                variant="line"
                style={{ flex: 1, color: 'var(--red)', borderColor: '#FECACA' }}
                onClick={() => setShowSkip(s => !s)}
              >
                {showSkip ? 'Hide skip' : 'Skip / Cancel'}
              </Button>
              <Button
                variant="green"
                style={{ flex: 1.5 }}
                onClick={onBoarded}
                disabled={showSkip}
              >
                Passenger boarded
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
