import type { Passenger } from '../data/seed';

export function PassengerRow({
  passenger,
  caption,
  trailing,
  size = 36
}: {
  passenger: Passenger;
  caption?: string;
  trailing?: React.ReactNode;
  size?: number;
}) {
  return (
    <div className="row between">
      <div className="row gap10">
        <img className="avatar" style={{ width: size, height: size }} src={passenger.avatar} alt="" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{passenger.name}</div>
          {caption && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{caption}</div>}
        </div>
      </div>
      {trailing}
    </div>
  );
}
