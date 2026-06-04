import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { Users, Pin, Route as RouteIcon, Clock, ArrowRight } from '../components/Icon';

export function TodaysAssignment() {
  const nav = useNavigate();
  const { driver, route, passengers, stops } = useRoute();
  const pickupCount = passengers.length;
  const stopCount = stops.length;

  return (
    <>
      <StatusBar time="8:02" />
      <div className="scr has-tab">
        <div className="appbar" style={{ paddingTop: 10 }}>
          <div>
            <div className="sub">Wednesday, 12 March</div>
            <div className="title">Good morning, {driver.name.split(' ')[0]}</div>
          </div>
          <div style={{ position: 'relative' }}>
            <img className="avatar" src={driver.avatar} alt="" />
            <span
              style={{
                position: 'absolute',
                right: -1,
                bottom: -1,
                width: 13,
                height: 13,
                borderRadius: '50%',
                background: 'var(--green)',
                border: '2.5px solid #fff'
              }}
            />
          </div>
        </div>

        <div className="scr-body">
          <div className="pad">
            {/* hero */}
            <div
              className="card soft"
              style={{
                padding: 18,
                borderRadius: 20,
                background: 'linear-gradient(155deg,#1D4ED8,#2563EB)',
                border: 'none',
                color: '#fff',
                boxShadow: 'var(--shadow-blue)'
              }}
            >
              <div className="row between">
                <span className="pill" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>
                  On duty
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.85 }}>Shift {driver.shift}</span>
              </div>
              <div className="row gap14" style={{ marginTop: 16 }}>
                <div style={{ flex: 1 }}>
                  <div className="label" style={{ color: 'rgba(255,255,255,.7)' }}>Vehicle</div>
                  <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.02em', marginTop: 3 }}>
                    {driver.vehicle}
                  </div>
                </div>
                <div style={{ width: 1, height: 38, background: 'rgba(255,255,255,.22)' }} />
                <div style={{ flex: 1 }}>
                  <div className="label" style={{ color: 'rgba(255,255,255,.7)' }}>Route</div>
                  <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.02em', marginTop: 3 }}>
                    {route.id}
                  </div>
                </div>
              </div>
            </div>

            {/* summary tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
              <SummaryTile Icon={Users} value={String(pickupCount * 2)} label="Passengers" />
              <SummaryTile Icon={Pin} value={String(stopCount)} label="Stops" />
              <SummaryTile Icon={RouteIcon} value={`${route.totalDistanceKm} km`} label="Distance" />
              <SummaryTile Icon={Clock} value={route.totalDurationLabel} label="Duration" />
            </div>

            {/* route card */}
            <div className="card soft" style={{ padding: 16, marginTop: 14 }}>
              <div className="row between">
                <span className="label">Today's first route</span>
                <Pill tone="blue" dot>Scheduled</Pill>
              </div>
              <div className="row gap12" style={{ marginTop: 13 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Start time</div>
                  <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.02em', marginTop: 2 }}>
                    {route.startTime} AM
                  </div>
                </div>
                <ArrowRight size={18} style={{ color: 'var(--muted-2)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Destination</div>
                  <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.02em', marginTop: 2 }}>
                    {route.destination}
                  </div>
                </div>
              </div>
              <Button size="sm" style={{ marginTop: 16 }} onClick={() => nav('/checklist')}>
                Start route
                <ArrowRight size={17} stroke="#fff" />
              </Button>
            </div>
          </div>
        </div>

        <TabBar active="home" />
      </div>
    </>
  );
}

function SummaryTile({
  Icon,
  value,
  label
}: {
  Icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="tile" style={{ padding: 14 }}>
      <div className="row gap8">
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            background: 'var(--blue-50)',
            color: 'var(--blue)',
            display: 'grid',
            placeItems: 'center'
          }}
        >
          <Icon size={18} />
        </span>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.02em' }}>{value}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{label}</div>
        </div>
      </div>
    </div>
  );
}
