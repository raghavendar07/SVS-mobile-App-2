import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { useRoute } from '../state/RouteContext';
import { passengerById } from '../data/seed';
import { ArrowRight } from '../components/Icon';

export function PassengerBoarded() {
  const nav = useNavigate();
  const { stopId = '' } = useParams();
  const { state, stops, route } = useRoute();
  const stopState = state.stops.find(s => s.id === stopId);
  const stopDef = stops.find(s => s.id === stopId);
  const passenger = passengerById(stopDef?.passengerId);
  const cap = route.vehicleCapacity;
  const occ = state.occupancy;

  return (
    <>
      <StatusBar time={stopState?.completedAt ?? '8:16'} />
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
          <div style={{ position: 'relative', width: 128, height: 128, marginBottom: 8 }}>
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
              <svg width="42" height="42" viewBox="0 0 24 24">
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

          <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-.03em', marginTop: 18 }}>
            Passenger boarded
          </h2>
          <p
            style={{
              fontSize: 14.5,
              color: 'var(--muted)',
              marginTop: 6,
              fontWeight: 450,
              lineHeight: 1.5
            }}
          >
            {passenger?.name ?? 'Passenger'} has been safely picked up and marked on board.
          </p>

          <div className="card soft" style={{ width: '100%', padding: '6px 18px', marginTop: 26 }}>
            <Row label="Passenger" value={passenger?.name ?? '—'} />
            <Row label="Boarding time" value={stopState?.completedAt ?? '—'} valueClass="mono" valueColor="var(--blue)" />
            <Row
              label="Occupancy"
              value={
                <span className="row gap8">
                  <span style={{ fontSize: 14, fontWeight: 800 }} className="mono">
                    {occ} / {cap}
                  </span>
                  <span style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: 4 }, (_, i) => (
                      <i
                        key={i}
                        style={{
                          width: 7,
                          height: 14,
                          borderRadius: 2,
                          background: i < Math.min(occ, 4) ? 'var(--green)' : 'var(--line-2)'
                        }}
                      />
                    ))}
                  </span>
                </span>
              }
              last
            />
          </div>
        </div>
        <div style={{ padding: '0 20px 22px' }}>
          <Button onClick={() => nav('/timeline')}>
            Continue to next stop
            <ArrowRight size={17} stroke="#fff" />
          </Button>
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  valueClass,
  valueColor,
  last
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
  valueColor?: string;
  last?: boolean;
}) {
  return (
    <div
      className="row between"
      style={{
        padding: '13px 0',
        borderBottom: last ? 'none' : '1px solid var(--line)'
      }}
    >
      <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600 }}>{label}</span>
      <span className={valueClass} style={{ fontSize: 14, fontWeight: 800, color: valueColor }}>
        {value}
      </span>
    </div>
  );
}
