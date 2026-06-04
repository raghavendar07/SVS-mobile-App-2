import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { useRoute } from '../state/RouteContext';
import { List, Users, Clock } from '../components/Icon';

export function ShiftComplete() {
  const nav = useNavigate();
  const { driver, state, stops } = useRoute();
  const completed = state.stops.filter(s => s.status === 'done').length;
  const passengers = stops.filter((s, i) => s.kind === 'pickup' && state.stops[i].status === 'done').length;

  return (
    <>
      <StatusBar time="17:02" dark />
      <div className="scr">
        <div
          style={{
            background: 'linear-gradient(160deg,#1D4ED8,#2563EB 60%,#3B82F6)',
            padding: '48px 24px 26px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <svg
            style={{ position: 'absolute', right: -30, top: -20, opacity: 0.16 }}
            width="200"
            height="200"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="90" stroke="#fff" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
          <div className="sub" style={{ color: 'rgba(255,255,255,.8)', fontWeight: 600, fontSize: 13 }}>
            Wednesday, 12 March
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em', marginTop: 4 }}>
            Today's performance
          </h2>
          <p style={{ fontSize: 13.5, opacity: 0.85, marginTop: 6, fontWeight: 450 }}>
            Shift {driver.shift} · Vehicle {driver.vehicle}
          </p>
        </div>

        <div className="scr-body" style={{ marginTop: -16, position: 'relative' }}>
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <StatCard Icon={List} value={completed > 0 ? '1' : '0'} label="Routes completed" />
              <StatCard Icon={Users} value={String(passengers || 0)} label="Passengers served" />
              <StatCard Icon={Clock} value="7h 15m" label="Driving time" />
              <StatCard
                Icon={ShieldIcon}
                value="100%"
                valueColor="var(--green)"
                label="Compliance status"
                iconBg="var(--green-50)"
                iconColor="var(--green)"
              />
            </div>
            <div className="card" style={{ padding: '13px 16px', marginTop: 12 }}>
              <div className="row between">
                <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>
                  Avg. on-time performance
                </span>
                <span className="row gap8">
                  <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)' }}>96%</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" style={{ color: 'var(--green)' }}>
                    <path
                      d="M5 19 19 5m0 0h-7m7 0v7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <Button
              style={{ marginTop: 16 }}
              onClick={() => nav('/profile')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M16 17v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v1M11 12h10m0 0-3-3m3 3-3 3"
                  stroke="#fff"
                  strokeWidth="1.9"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              End shift
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  Icon,
  value,
  valueColor,
  label,
  iconBg = 'var(--blue-50)',
  iconColor = 'var(--blue)'
}: {
  Icon: typeof List;
  value: string;
  valueColor?: string;
  label: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="card soft" style={{ padding: 16 }}>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 11,
          background: iconBg,
          color: iconColor,
          display: 'grid',
          placeItems: 'center',
          marginBottom: 10
        }}
      >
        <Icon size={19} />
      </span>
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.02em', color: valueColor }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function ShieldIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
