import type { ReactNode, CSSProperties } from 'react';

export type MapMarker = {
  id: string;
  left: string;
  top?: string;
  bottom?: string;
  variant: 'stop' | 'destination' | 'vehicle';
  label?: string;
  done?: boolean;
  pulse?: boolean;
};

type Props = {
  width?: number;
  height?: number;
  vbW?: number;
  vbH?: number;
  routePath?: string;
  markers?: MapMarker[];
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  vehiclePos?: { left: string; top?: string; bottom?: string };
};

export function MapCanvas({
  vbW = 402,
  vbH = 498,
  routePath = 'M70 470 C70 390 120 360 120 320 C120 250 200 230 270 200 C320 180 330 120 350 60',
  markers = [],
  style,
  className = '',
  children,
  vehiclePos
}: Props) {
  return (
    <div className={`map ${className}`} style={style}>
      <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid slice">
        <rect width={vbW} height={vbH} fill="#EAEFF4" />
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
        {routePath && (
          <>
            <path d={routePath} stroke="#1D4ED8" strokeWidth="11" fill="none" strokeLinecap="round" opacity=".25" />
            <path d={routePath} stroke="#2563EB" strokeWidth="6" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>

      {markers.map(m => (
        <div
          key={m.id}
          className="mk"
          style={{ left: m.left, top: m.top, bottom: m.bottom }}
        >
          <Marker variant={m.variant} label={m.label} done={m.done} />
        </div>
      ))}

      {vehiclePos && (
        <div className="veh" style={{ left: vehiclePos.left, top: vehiclePos.top, bottom: vehiclePos.bottom }}>
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
      )}

      {children}
    </div>
  );
}

function Marker({
  variant,
  label,
  done
}: {
  variant: MapMarker['variant'];
  label?: string;
  done?: boolean;
}) {
  if (variant === 'destination') {
    return (
      <svg width="32" height="40" viewBox="0 0 32 40">
        <path
          d="M16 40C8.5 29 2 23 2 14.5a14 14 0 0 1 28 0C30 23 23.5 29 16 40Z"
          fill="#16A34A"
        />
        <path d="M11 14.5h10M16 9.5v10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  const fill = done ? '#1E293B' : '#2563EB';
  return (
    <svg width="30" height="38" viewBox="0 0 30 38">
      <path
        d="M15 38C8 28 2 22 2 14a13 13 0 0 1 26 0c0 8-6 14-13 24Z"
        fill={fill}
      />
      <circle cx="15" cy="14" r="6.5" fill="#fff" />
      <text x="15" y="18" fontSize="9" fontWeight="800" fill={fill} textAnchor="middle" fontFamily="Inter">
        {label ?? ''}
      </text>
    </svg>
  );
}
