import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { ChevronLeft, Users, Pin } from '../components/Icon';

export function RouteOverview() {
  const nav = useNavigate();
  const { route, passengers, stops, dispatch, percentComplete } = useRoute();

  return (
    <>
      <StatusBar time="8:12" dark />
      <div className="scr">
        {/* full-bleed map */}
        <div className="map" style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 402 498" preserveAspectRatio="xMidYMid slice">
            <rect width="402" height="498" fill="#EAEFF4" />
            <g fill="#F4F7FA">
              <rect x="-10" y="20" width="150" height="120" rx="6" />
              <rect x="160" y="-10" width="130" height="110" rx="6" />
              <rect x="300" y="40" width="120" height="130" rx="6" />
              <rect x="20" y="170" width="120" height="120" rx="6" />
              <rect x="250" y="200" width="170" height="120" rx="6" />
              <rect x="-10" y="330" width="140" height="180" rx="6" />
              <rect x="160" y="350" width="120" height="160" rx="6" />
            </g>
            <g fill="#DCEFE0">
              <rect x="160" y="120" width="120" height="60" rx="8" />
              <rect x="300" y="350" width="120" height="120" rx="10" />
            </g>
            <path d="M120 -10 V520 M270 -10 V520 M-10 150 H420 M-10 320 H420" stroke="#fff" strokeWidth="12" />
            <path d="M120 -10 V520 M270 -10 V520 M-10 150 H420 M-10 320 H420" stroke="#E6ECF1" strokeWidth="1" />
            <path
              d="M70 470 C70 390 120 360 120 320 C120 250 200 230 270 200 C320 180 330 120 350 60"
              stroke="#1D4ED8"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
              opacity="0.25"
            />
            <path
              d="M70 470 C70 390 120 360 120 320 C120 250 200 230 270 200 C320 180 330 120 350 60"
              stroke="#2563EB"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* vehicle marker */}
          <div className="veh" style={{ left: '17%', bottom: '6%' }}>
            <span className="ping" />
            <span
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: '#2563EB',
                border: '3px solid #fff',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path
                  d="M3 13.5 5 8a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5.5V18h-2v-1.5H5V18H3v-4.5Z"
                  fill="#fff"
                />
              </svg>
            </span>
          </div>

          <div className="mk" style={{ left: '30%', top: '62%' }}>
            <svg width="30" height="38" viewBox="0 0 30 38">
              <path d="M15 38C8 28 2 22 2 14a13 13 0 0 1 26 0c0 8-6 14-13 24Z" fill="#2563EB" />
              <circle cx="15" cy="14" r="6.5" fill="#fff" />
              <text x="15" y="18" fontSize="9" fontWeight="800" fill="#2563EB" textAnchor="middle" fontFamily="Inter">
                1
              </text>
            </svg>
          </div>
          <div className="mk" style={{ left: '67%', top: '42%' }}>
            <svg width="30" height="38" viewBox="0 0 30 38">
              <path d="M15 38C8 28 2 22 2 14a13 13 0 0 1 26 0c0 8-6 14-13 24Z" fill="#1E293B" />
              <circle cx="15" cy="14" r="6.5" fill="#fff" />
              <text x="15" y="18" fontSize="9" fontWeight="800" fill="#1E293B" textAnchor="middle" fontFamily="Inter">
                5
              </text>
            </svg>
          </div>
          <div className="mk" style={{ left: '87%', top: '14%' }}>
            <svg width="32" height="40" viewBox="0 0 32 40">
              <path
                d="M16 40C8.5 29 2 23 2 14.5a14 14 0 0 1 28 0C30 23 23.5 29 16 40Z"
                fill="#16A34A"
              />
              <path d="M11 14.5h10M16 9.5v10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>

          {/* floating header */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 16,
              right: 16,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 10
            }}
          >
            <button
              className="iconbtn"
              style={{ background: '#fff', boxShadow: 'var(--shadow)' }}
              onClick={() => nav(-1)}
              aria-label="Back"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className="card"
              style={{
                padding: '8px 14px',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span className="pill pill-blue" style={{ height: 'auto', padding: 0 }}>{route.id}</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>
                {stops.length} stops · {route.totalDistanceKm} km
              </span>
            </div>
          </div>
        </div>

        {/* bottom sheet */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
            borderRadius: '26px 26px 0 0',
            padding: '8px 20px 22px',
            boxShadow: '0 -10px 30px rgba(15,23,42,.12)'
          }}
        >
          <div
            style={{
              width: 44,
              height: 5,
              borderRadius: 100,
              background: 'var(--line-2)',
              margin: '0 auto 14px'
            }}
          />
          <div className="row between">
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.03em' }}>Route {route.id}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500, marginTop: 1 }}>
                {route.name}
              </div>
            </div>
            <Pill tone="grey">Not started</Pill>
          </div>
          <div className="row between" style={{ marginTop: 14, marginBottom: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>Route progress</span>
            <span style={{ fontSize: 12.5, fontWeight: 800 }}>{percentComplete}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 100, background: 'var(--surface-2)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${percentComplete}%`,
                height: '100%',
                background: 'var(--blue)',
                transition: 'width .3s'
              }}
            />
          </div>
          <div className="row gap10" style={{ marginTop: 16 }}>
            <div className="tile" style={{ flex: 1, padding: '12px 14px' }}>
              <div className="row gap8">
                <Users size={18} style={{ color: 'var(--blue)' }} />
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{passengers.length}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>Passengers</div>
                </div>
              </div>
            </div>
            <div className="tile" style={{ flex: 1, padding: '12px 14px' }}>
              <div className="row gap8">
                <Pin size={18} style={{ color: 'var(--blue)' }} />
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{stops.length}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>Stops</div>
                </div>
              </div>
            </div>
          </div>
          <Button
            style={{ marginTop: 14 }}
            onClick={() => {
              dispatch({ type: 'startRoute' });
              nav('/active');
            }}
          >
            Start route
          </Button>
        </div>
      </div>
    </>
  );
}
