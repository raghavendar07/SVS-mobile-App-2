import { useParams } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { passengerById } from '../data/seed';
import { Phone, Pin, Building } from '../components/Icon';

export function PassengerDetails() {
  const { passengerId = '' } = useParams();
  const pax = passengerById(passengerId);

  if (!pax) {
    return (
      <>
        <StatusBar />
        <div className="scr">
          <AppBar title="Passenger" center />
          <div className="pad" style={{ paddingTop: 60, textAlign: 'center', color: 'var(--muted)' }}>
            Not found.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StatusBar time="8:25" />
      <div className="scr">
        <AppBar
          title="Passenger"
          center
          trailing={
            <div className="iconbtn ghost" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.6" fill="currentColor" />
                <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                <circle cx="12" cy="18" r="1.6" fill="currentColor" />
              </svg>
            </div>
          }
        />
        <div className="scr-body">
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: 8
              }}
            >
              <img
                src={pax.avatar}
                alt=""
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  border: '3px solid #fff',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.02em', marginTop: 12 }}>
                {pax.name}
              </h2>
              <div className="row gap8" style={{ marginTop: 8 }}>
                <Pill tone="blue">ID · {pax.id.toUpperCase().replace('PAX-', 'PAX-045')}</Pill>
                {pax.wheelchair && (
                  <span className="pill" style={{ background: '#EEF2FF', color: '#4338CA' }}>
                    Wheelchair
                  </span>
                )}
              </div>
            </div>

            <div className="card" style={{ padding: '6px 16px', marginTop: 8 }}>
              <DetailRow icon={<Pin size={17} />} label="Pickup address" value={pax.pickupAddress} />
              <DetailRow
                icon={<Building size={17} />}
                label="Drop-off address"
                value={pax.dropoffAddress}
                tone="green"
                last
              />
            </div>

            {pax.specialRequirements && (
              <div
                className="card"
                style={{
                  padding: '14px 16px',
                  marginTop: 12,
                  background: 'var(--amber-50)',
                  borderColor: 'var(--amber-100)'
                }}
              >
                <div className="row gap8" style={{ marginBottom: 6 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" style={{ color: '#B45309' }}>
                    <path
                      d="M12 9v4m0 4h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: '#B45309' }}>
                    Special requirements
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5, fontWeight: 500 }}>
                  {pax.specialRequirements}
                </p>
              </div>
            )}

            {pax.medicalNotes && (
              <div className="card" style={{ padding: '13px 16px', marginTop: 12 }}>
                <div className="row gap8" style={{ marginBottom: 5 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" style={{ color: 'var(--red)' }}>
                    <path
                      d="M12 3a7 7 0 0 0-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 0 0-7-7Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      fill="none"
                    />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>
                    Medical notes
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, fontWeight: 500 }}>
                  {pax.medicalNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '12px 20px 22px', borderTop: '1px solid var(--line)' }}>
          <div className="row gap10">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>
                Emergency contact
              </div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{pax.emergencyContact.name}</div>
            </div>
            <Button size="sm" style={{ width: 'auto', padding: '0 22px' }}>
              <Phone size={17} stroke="#fff" />
              Call contact
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailRow({
  icon,
  label,
  value,
  tone = 'blue',
  last
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: 'blue' | 'green';
  last?: boolean;
}) {
  const bg = tone === 'green' ? 'var(--green-50)' : 'var(--blue-50)';
  const color = tone === 'green' ? 'var(--green)' : 'var(--blue)';
  return (
    <div
      className="row gap12"
      style={{ padding: '12px 0', borderBottom: last ? 'none' : '1px solid var(--line)' }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: bg,
          color,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
}
