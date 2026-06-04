import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { Pill } from '../components/Pill';
import { HISTORY, type HistoryEntry } from '../data/seed';
import { useRoute } from '../state/RouteContext';

export function HistoryScreen() {
  const { driver } = useRoute();
  const totalTrips = HISTORY.reduce((n, h) => n + h.passengers, 0);
  const avgScore = Math.round(HISTORY.reduce((n, h) => n + h.score, 0) / HISTORY.length);
  const totalKm = HISTORY.reduce((n, h) => n + h.distanceKm, 0);

  return (
    <>
      <StatusBar time="9:14" />
      <div className="scr has-tab">
        <div className="appbar" style={{ paddingTop: 10 }}>
          <div>
            <div className="sub">Last 5 shifts</div>
            <div className="title">History</div>
          </div>
          <Pill tone="blue" className="mono">
            {HISTORY.length}
          </Pill>
        </div>

        <div className="scr-body">
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            {/* aggregate */}
            <div
              className="card soft"
              style={{
                padding: 16,
                background: 'linear-gradient(155deg,#1D4ED8,#2563EB)',
                border: 'none',
                color: '#fff',
                marginBottom: 14
              }}
            >
              <div className="label" style={{ color: 'rgba(255,255,255,.75)' }}>
                Rolling 5-shift performance
              </div>
              <div className="row gap14" style={{ marginTop: 12 }}>
                <Stat value={`${avgScore}%`} label="Avg score" />
                <Divider />
                <Stat value={String(totalTrips)} label="Passengers" />
                <Divider />
                <Stat value={`${totalKm} km`} label="Distance" />
              </div>
            </div>

            <span className="label" style={{ display: 'block', marginBottom: 8 }}>
              Past shifts · {driver.name.split(' ')[0]}
            </span>

            {HISTORY.map(h => (
              <HistoryRow key={h.id} h={h} />
            ))}
          </div>
        </div>

        <TabBar active="history" />
      </div>
    </>
  );
}

function HistoryRow({ h }: { h: HistoryEntry }) {
  const tone = h.score >= 95 ? 'green' : h.score >= 85 ? 'amber' : 'red';
  const accent = tone === 'green' ? 'var(--green)' : tone === 'amber' ? 'var(--amber)' : 'var(--red)';
  const accentBg = tone === 'green' ? 'var(--green-50)' : tone === 'amber' ? 'var(--amber-50)' : 'var(--red-50)';
  return (
    <div className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
      <div className="row between">
        <div className="row gap12">
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: accentBg,
              color: accent,
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto'
            }}
          >
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.04em' }}>
                {h.weekday.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, marginTop: 2 }}>{h.date}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>{h.routeId}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{h.routeName}</div>
          </div>
        </div>
        <Pill tone={tone} className="mono">
          {h.score}%
        </Pill>
      </div>
      <div
        className="row"
        style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid var(--line)',
          fontSize: 11.5,
          color: 'var(--muted)',
          fontWeight: 600,
          gap: 14,
          flexWrap: 'wrap'
        }}
      >
        <Meta label="Stops" value={`${h.stopsDone}/${h.stopsTotal}`} />
        <Meta label="Passengers" value={String(h.passengers)} />
        <Meta label="Distance" value={`${h.distanceKm} km`} />
        <Meta label="Duration" value={h.duration} />
        {h.incidents > 0 && (
          <Meta label="Incidents" value={String(h.incidents)} valueColor="var(--red)" />
        )}
      </div>
    </div>
  );
}

function Meta({
  label,
  value,
  valueColor
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 10.5, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: valueColor ?? 'var(--ink-2)',
          marginTop: 1
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.02em' }}>{value}</div>
      <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,.22)' }} />;
}
