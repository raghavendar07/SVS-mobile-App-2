import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { useRoute } from '../state/RouteContext';

export function LiveNavigation() {
  const nav = useNavigate();
  const { stopId = '' } = useParams();
  const { stops } = useRoute();
  const stop = stops.find(s => s.id === stopId) ?? stops[0];
  const isFinal = stop.kind === 'final';
  const onEnd = () => nav(isFinal ? `/dropoff/${stop.id}` : `/pickup/${stop.id}`);

  return (
    <>
      <StatusBar time="8:28" dark />
      <div className="scr">
        <div
          style={{
            background: '#16A34A',
            padding: '60px 20px 18px',
            color: '#fff',
            position: 'relative',
            zIndex: 5
          }}
        >
          <div className="row gap14">
            <svg width="44" height="44" viewBox="0 0 24 24">
              <path
                d="M9 20V11l-3 0 6-7 6 7-3 0v9"
                stroke="#fff"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(38 12 12)"
              />
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.03em' }}>450 m</div>
              <div style={{ fontSize: 15, opacity: 0.92, fontWeight: 500, marginTop: 1 }}>
                Turn right onto Maple Road
              </div>
            </div>
          </div>
        </div>

        <div className="map" style={{ flex: 1, position: 'relative' }}>
          <svg viewBox="0 0 402 470" preserveAspectRatio="xMidYMid slice">
            <rect width="402" height="470" fill="#E9EEF3" />
            <g fill="#F4F7FA">
              <rect x="-20" y="-10" width="170" height="190" rx="6" />
              <rect x="240" y="20" width="190" height="160" rx="6" />
              <rect x="20" y="240" width="150" height="240" rx="6" />
              <rect x="250" y="260" width="180" height="220" rx="6" />
            </g>
            <g fill="#DCEFE0">
              <rect x="170" y="200" width="60" height="80" rx="8" />
            </g>
            <path
              d="M200 -10 V490 M-10 200 H420 M-10 300 H420"
              stroke="#fff"
              strokeWidth="18"
            />
            <path
              d="M200 460 L200 300 L350 300"
              stroke="#1E40AF"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.2"
            />
            <path
              d="M200 460 L200 300 L350 300"
              stroke="#2563EB"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="veh nav-drift" style={{ left: '50%', bottom: '4%' }}>
            <span
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#2563EB',
                border: '4px solid #fff',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path d="M12 3 5 20l7-4 7 4-7-17Z" fill="#fff" />
              </svg>
            </span>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center'
            }}
          >
            <div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                32
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.04em' }}>
                KM/H
              </div>
            </div>
          </div>
          <button
            aria-label="Mute"
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: 'var(--shadow-md)',
              border: 'none',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--blue)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M11 5 6 9H2v6h4l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          style={{
            background: '#1E293B',
            padding: '14px 16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <button
            onClick={() => nav(-1)}
            aria-label="End navigation"
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(255,255,255,.12)',
              border: 'none',
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M6 18 18 6M6 6l12 12"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div style={{ color: '#fff', flex: '0 0 auto' }}>
            <div className="mono" style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.1 }}>
              08:31
            </div>
            <div style={{ fontSize: 11.5, opacity: 0.7, fontWeight: 500 }}>3 min · 1.2 km</div>
          </div>
          <button
            onClick={onEnd}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 14,
              background: 'var(--blue)',
              border: 'none',
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '-.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: 'var(--shadow-blue)',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"
                stroke="#fff"
                strokeWidth="1.9"
                fill="none"
              />
              <circle cx="12" cy="10" r="2.4" fill="#fff" />
            </svg>
            Arrived at destination
          </button>
        </div>
      </div>
      <style>{`
        @keyframes navDrift {
          0% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-30px); }
          100% { transform: translate(-50%, -50%) translateY(0); }
        }
        .nav-drift { animation: navDrift 5s ease-in-out infinite; }
      `}</style>
    </>
  );
}
