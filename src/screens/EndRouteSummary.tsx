import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { PhotoCapture } from '../components/PhotoCapture';

export function EndRouteSummary() {
  const nav = useNavigate();
  const { state, stops, route, dispatch, completedCount } = useRoute();
  const odoEnd = state.photos.odometerEnd;
  const passengersOnBoard = state.stops.filter(
    (s, i) => stops[i].kind === 'pickup' && s.status === 'done'
  ).length;
  const missed = state.stops.filter(s => s.status === 'missed').length;
  const incidents = state.incidents.length;
  const score = Math.max(40, 100 - missed * 6 - incidents * 8);
  const dash = 251;
  const offset = dash * (1 - score / 100);

  return (
    <>
      <StatusBar time="12:35" />
      <div className="scr">
        <div className="scr-body">
          <div
            className="pad scrollwrap"
            style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 18, paddingBottom: 16 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <Pill tone="green" dot>Route completed</Pill>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.03em', marginTop: 8 }}>
                {route.id} finished
              </h2>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 4 }}>
                {completedCount} of {stops.length} stops served · {route.name}
              </p>
            </div>

            <div
              className="card soft"
              style={{
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 14
              }}
            >
              <div style={{ position: 'relative', width: 96, height: 96, flex: '0 0 auto' }}>
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" stroke="var(--surface-2)" strokeWidth="9" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="var(--green)"
                    strokeWidth="9"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    strokeDashoffset={offset}
                    transform="rotate(-90 48 48)"
                    style={{ transition: 'stroke-dashoffset .6s' }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1 }}>
                      {score}%
                    </div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.05em' }}>
                      SCORE
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>
                  {score >= 90 ? 'Excellent route' : score >= 75 ? 'Solid route' : 'Route completed'}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {incidents === 0
                    ? 'On-time performance and zero incidents. Great consistency today.'
                    : `${incidents} incident${incidents > 1 ? 's' : ''} reported. Review notes in dispatcher chat.`}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Tile value={String(passengersOnBoard)} label="Passengers transported" />
              <Tile value={String(completedCount)} label="Stops completed" />
              <Tile value={`${route.totalDistanceKm} km`} label="Distance" />
              <Tile value={route.totalDurationLabel} label="Duration" />
            </div>

            <div
              className="card"
              style={{
                padding: '13px 16px',
                marginTop: 12,
                background: incidents ? 'var(--amber-50)' : 'var(--green-50)',
                borderColor: incidents ? 'var(--amber-100)' : 'var(--green-100)'
              }}
            >
              <div className="row between">
                <span
                  className="row gap8"
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: incidents ? 'var(--amber)' : 'var(--green)'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="m5 13 4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Incidents reported
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: incidents ? 'var(--amber)' : 'var(--green)'
                  }}
                >
                  {incidents}
                </span>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="label">End-of-ride odometer</span>
              <div style={{ marginTop: 8 }}>
                <PhotoCapture
                  label="Odometer · end of ride"
                  hint="Required before route can be submitted."
                  required
                  photo={odoEnd}
                  onCapture={dataUrl =>
                    dispatch({ type: 'setPhoto', kind: 'odometerEnd', dataUrl })
                  }
                  onClear={() => dispatch({ type: 'clearPhoto', kind: 'odometerEnd' })}
                />
              </div>
            </div>

            <Button
              variant="line"
              size="sm"
              style={{ marginTop: 10 }}
              onClick={() => nav('/notes?stage=post-route&next=/shift-complete')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h10M4 18h7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Add post-route notes
            </Button>
            <Button
              style={{ marginTop: 10, marginBottom: 8 }}
              disabled={!odoEnd}
              onClick={() => {
                dispatch({ type: 'completeRoute' });
                nav('/shift-complete');
              }}
            >
              {odoEnd ? 'Submit route' : 'Capture odometer to submit'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="tile" style={{ padding: 14 }}>
      <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.02em' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{label}</div>
    </div>
  );
}
