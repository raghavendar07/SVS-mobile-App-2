import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';

export function ComplianceAlerts() {
  const nav = useNavigate();
  const { driver } = useRoute();
  const score = driver.compliance;

  return (
    <>
      <StatusBar time="10:40" />
      <div className="scr has-tab">
        <div className="appbar" style={{ paddingTop: 10 }}>
          <div>
            <div className="sub">Stay road-legal</div>
            <div className="title" style={{ fontSize: 20 }}>Compliance Center</div>
          </div>
          <Pill tone="amber" dot>2 due</Pill>
        </div>

        <div className="scr-body">
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            <div
              className="card soft"
              style={{
                padding: 16,
                background: 'linear-gradient(150deg,#1E293B,#0F172A)',
                border: 'none',
                color: '#fff',
                marginBottom: 14
              }}
            >
              <div className="row between">
                <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.75 }}>Overall compliance</span>
                <span
                  className="pill"
                  style={{ background: 'rgba(34,197,94,.2)', color: '#86EFAC' }}
                >
                  Good standing
                </span>
              </div>
              <div className="row gap14" style={{ marginTop: 12, alignItems: 'flex-end' }}>
                <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1 }}>
                  {score}%
                </div>
                <div style={{ flex: 1, paddingBottom: 6 }}>
                  <div
                    style={{
                      height: 7,
                      borderRadius: 100,
                      background: 'rgba(255,255,255,.15)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${score}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg,#22C55E,#4ADE80)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <span className="label" style={{ display: 'block', marginBottom: 8 }}>Renewal status</span>

            <RenewalCard
              accent="var(--red)"
              bg="var(--red-50)"
              color="var(--red)"
              title="Driver license"
              subtitle="Expires in 6 days"
              subColor="var(--red)"
              actionTone="red"
              actionLabel="Renew"
            />
            <RenewalCard
              accent="var(--amber)"
              bg="var(--amber-50)"
              color="var(--amber)"
              title="Vehicle inspection"
              subtitle="Due in 18 days"
              subColor="#B45309"
              actionTone="amber"
              actionLabel="Book"
            />
            <RenewalCard
              accent="var(--green)"
              bg="var(--green-50)"
              color="var(--green)"
              title="Insurance"
              subtitle="Valid · renews in 4 months"
              subColor="var(--green)"
              actionTone="green"
              actionLabel="Active"
            />

            <Button variant="line" size="sm" style={{ marginTop: 14 }} onClick={() => nav('/documents')}>
              View all documents
            </Button>
          </div>
        </div>

        <TabBar active="profile" />
      </div>
    </>
  );
}

function RenewalCard({
  accent,
  bg,
  color,
  title,
  subtitle,
  subColor,
  actionTone,
  actionLabel
}: {
  accent: string;
  bg: string;
  color: string;
  title: string;
  subtitle: string;
  subColor: string;
  actionTone: 'red' | 'amber' | 'green';
  actionLabel: string;
}) {
  return (
    <div
      className="card"
      style={{
        padding: '14px 16px',
        marginBottom: 10,
        borderLeft: `3px solid ${accent}`
      }}
    >
      <div className="row between">
        <div className="row gap10">
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: bg,
              color,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
              <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </span>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>{title}</div>
            <div style={{ fontSize: 12, color: subColor, fontWeight: 700 }}>{subtitle}</div>
          </div>
        </div>
        <Pill tone={actionTone}>{actionLabel}</Pill>
      </div>
    </div>
  );
}
