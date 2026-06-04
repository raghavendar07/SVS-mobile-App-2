import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { passengerById } from '../data/seed';
import { ChevronLeft, NavArrow, Phone } from '../components/Icon';

export function ActiveRoute() {
  const nav = useNavigate();
  const { state, route, stops, currentStop, percentComplete } = useRoute();
  const stop = currentStop ?? stops[stops.length - 1];
  const passenger = passengerById(stop?.passengerId);
  const stopIndex = stops.indexOf(stop) + 1;
  const isFinal = stop?.kind === 'final';

  return (
    <>
      <StatusBar time="8:13" dark />
      <div className="scr">
        <div className="map" style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 402 872" preserveAspectRatio="xMidYMid slice">
            <rect width="402" height="872" fill="#EAEFF4" />
            <g fill="#F4F7FA">
              <rect x="-10" y="60" width="150" height="160" rx="6" />
              <rect x="170" y="20" width="150" height="150" rx="6" />
              <rect x="20" y="260" width="130" height="180" rx="6" />
              <rect x="250" y="220" width="170" height="160" rx="6" />
              <rect x="-10" y="470" width="160" height="220" rx="6" />
              <rect x="190" y="430" width="120" height="200" rx="6" />
              <rect x="60" y="720" width="160" height="160" rx="6" />
            </g>
            <g fill="#DCEFE0">
              <rect x="200" y="200" width="120" height="80" rx="8" />
              <rect x="270" y="640" width="150" height="160" rx="10" />
            </g>
            <path
              d="M150 -10 V900 M330 -10 V900 M-10 220 H420 M-10 460 H420 M-10 700 H420"
              stroke="#fff"
              strokeWidth="13"
            />
            <path
              d="M90 820 C90 700 150 660 150 560 C150 440 230 400 250 300 C268 210 330 170 350 80"
              stroke="#1D4ED8"
              strokeWidth="13"
              fill="none"
              strokeLinecap="round"
              opacity="0.22"
            />
            <path
              d="M90 820 C90 700 150 660 150 560 C150 440 230 400 250 300 C268 210 330 170 350 80"
              stroke="#2563EB"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="veh vehicle-anim" style={{ left: '22%', top: '67%' }}>
            <span className="ping" />
            <span
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#2563EB',
                border: '3.5px solid #fff',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 3 5 20l7-4 7 4-7-17Z" fill="#fff" />
              </svg>
            </span>
          </div>

          <div className="mk" style={{ left: '62%', top: '34%' }}>
            <svg width="30" height="38" viewBox="0 0 30 38">
              <path d="M15 38C8 28 2 22 2 14a13 13 0 0 1 26 0c0 8-6 14-13 24Z" fill="#2563EB" />
              <circle cx="15" cy="14" r="6.5" fill="#fff" />
              <text x="15" y="18" fontSize="9" fontWeight="800" fill="#2563EB" textAnchor="middle" fontFamily="Inter">
                {stopIndex}
              </text>
            </svg>
          </div>

          {/* navigation banner */}
          <div
            style={{
              position: 'absolute',
              top: 58,
              left: 14,
              right: 14,
              background: '#1E293B',
              borderRadius: 18,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <button
              onClick={() => nav(-1)}
              style={{
                background: 'rgba(255,255,255,.12)',
                border: 'none',
                width: 38,
                height: 38,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                color: '#fff'
              }}
              aria-label="Back"
            >
              <ChevronLeft size={18} />
            </button>
            <div style={{ flex: 1, color: '#fff' }}>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.02em' }}>300 m</div>
              <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 500 }}>Continue on Green Street</div>
            </div>
            <div style={{ textAlign: 'right', color: '#fff' }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>3 min</div>
              <div style={{ fontSize: 11, opacity: 0.6 }}>to stop</div>
            </div>
          </div>

          {/* floating actions */}
          <button
            onClick={() => nav('/incident')}
            style={{
              position: 'absolute',
              left: 14,
              top: 138,
              background: '#fff',
              border: 'none',
              borderRadius: 13,
              padding: '9px 14px',
              fontSize: 12.5,
              fontWeight: 800,
              color: 'var(--red)',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--red)'
              }}
            />
            Report issue
          </button>
          <button
            onClick={() => nav('/notes?stage=mid-route')}
            style={{
              position: 'absolute',
              right: 14,
              top: 138,
              background: '#fff',
              border: 'none',
              borderRadius: 13,
              padding: '9px 14px',
              fontSize: 12.5,
              fontWeight: 800,
              color: 'var(--blue-700)',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M4 6h16M4 12h10M4 18h7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            Notes
          </button>
        </div>

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
            <Pill tone="blue">
              Stop {stopIndex} of {stops.length} · {isFinal ? 'Drop-off' : 'Pickup'}
            </Pill>
            <Pill tone="green" dot>
              ETA 3 min
            </Pill>
          </div>
          <div className="row gap12" style={{ marginTop: 14 }}>
            <img
              className="avatar"
              style={{ width: 50, height: 50 }}
              src={passenger?.avatar ?? 'https://i.pravatar.cc/120?img=68'}
              alt=""
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>
                {passenger?.name ?? route.destination}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
                {stop?.address ?? route.destinationAddress} · {percentComplete}% route complete
              </div>
            </div>
          </div>
          <div className="row gap12" style={{ marginTop: 16 }}>
            <Button
              style={{ flex: 1.4 }}
              onClick={() =>
                stop && nav(isFinal ? `/dropoff/${stop.id}` : `/pickup/${stop.id}`)
              }
            >
              <NavArrow size={18} stroke="#fff" />
              Navigate
            </Button>
            <Button variant="line" style={{ flex: 1 }}>
              <Phone size={18} style={{ color: 'var(--blue)' }} />
              Call
            </Button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes vehicleDrift {
          0% { transform: translate(-50%, -50%) translate(0, 0); }
          50% { transform: translate(-50%, -50%) translate(-12px, -22px); }
          100% { transform: translate(-50%, -50%) translate(0, 0); }
        }
        .vehicle-anim { animation: vehicleDrift 6s ease-in-out infinite; }
      `}</style>
    </>
  );
}
