import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { ChevronRight } from '../components/Icon';

export function Profile() {
  const nav = useNavigate();
  const { driver, dispatch } = useRoute();

  return (
    <>
      <StatusBar time="17:05" dark />
      <div className="scr has-tab">
        <div
          style={{
            background: 'linear-gradient(160deg,#1E293B,#0F172A)',
            padding: '46px 22px 56px',
            color: '#fff',
            position: 'relative'
          }}
        >
          <div className="row between">
            <span style={{ fontSize: 16, fontWeight: 800 }}>Driver Profile</span>
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ opacity: 0.8 }}>
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="#fff"
                strokeWidth="1.7"
                fill="none"
              />
              <path
                d="M19 12a7 7 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2.2-1.3L14 2h-4l-.3 2.4a7 7 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .9.1 1.3l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2.2 1.3L10 22h4l.3-2.4a7 7 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3Z"
                stroke="#fff"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <div className="scr-body" style={{ marginTop: -40 }}>
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            <div className="card soft" style={{ padding: 18, textAlign: 'center', marginBottom: 14 }}>
              <img
                src={driver.avatar}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '4px solid #fff',
                  boxShadow: 'var(--shadow-md)',
                  marginTop: -50
                }}
                alt=""
              />
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.02em', marginTop: 10 }}>
                {driver.name}
              </h2>
              <div className="row gap8" style={{ justifyContent: 'center', marginTop: 6 }}>
                <Pill tone="blue">Driver ID · {driver.id}</Pill>
                <Pill tone="green" dot>Active</Pill>
              </div>
              <div
                className="row"
                style={{ marginTop: 16, borderTop: '1px solid var(--line)', paddingTop: 14 }}
              >
                <StatCol value={`${driver.compliance}%`} label="Compliance" />
                <div style={{ width: 1, height: 30, background: 'var(--line)' }} />
                <StatCol value={driver.trips.toLocaleString()} label="Trips" />
                <div style={{ width: 1, height: 30, background: 'var(--line)' }} />
                <StatCol value={String(driver.rating)} label="Rating" />
              </div>
            </div>

            <div className="card" style={{ padding: '4px 16px' }}>
              <SettingRow
                label="License status"
                trailing={<Pill tone="red">Expiring</Pill>}
                onClick={() => nav('/compliance')}
              />
              <SettingRow
                label="Training status"
                trailing={<Pill tone="green">Up to date</Pill>}
                onClick={() => nav('/documents')}
              />
              <SettingRow
                label="Vehicle assigned"
                trailing={
                  <span style={{ fontSize: 13, fontWeight: 800 }}>{driver.vehicle}</span>
                }
              />
              <SettingRow
                label="Settings"
                trailing={<ChevronRight size={18} style={{ color: 'var(--muted-2)' }} />}
                last
              />
            </div>

            <Button
              variant="line"
              size="sm"
              style={{ marginTop: 14, color: 'var(--red)', borderColor: '#FECACA' }}
              onClick={() => {
                dispatch({ type: 'logout' });
                nav('/login');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M16 17l5-5-5-5m5 5H9M12 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log out
            </Button>
          </div>
        </div>

        <TabBar active="profile" />
      </div>
    </>
  );
}

function StatCol({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function SettingRow({
  label,
  trailing,
  onClick,
  last
}: {
  label: string;
  trailing: React.ReactNode;
  onClick?: () => void;
  last?: boolean;
}) {
  return (
    <div
      className="row between"
      onClick={onClick}
      style={{
        padding: '13px 0',
        borderBottom: last ? 'none' : '1px solid var(--line)',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <span className="row gap10">
        <svg width="19" height="19" viewBox="0 0 24 24" style={{ color: 'var(--blue)' }}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      </span>
      {trailing}
    </div>
  );
}
