import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { Checklist } from '../components/Checklist';
import { PhotoCapture } from '../components/PhotoCapture';
import { useRoute } from '../state/RouteContext';
import { Phone } from '../components/Icon';

export function PreTripChecklist() {
  const nav = useNavigate();
  const {
    state,
    dispatch,
    checklist,
    inspectionEvaluated,
    inspectionPercent,
    failedCriticalIds,
    failedNonCriticalIds,
    failsMissingNote,
    hasAnyFail,
    hasPending
  } = useRoute();
  const photosOk = !!state.photos.driver && !!state.photos.odometerStart;
  const total = checklist.length;

  const items = checklist.map(c => ({
    id: c.id,
    label: c.label,
    state: state.inspectionItems[c.id],
    critical: c.critical,
    note: state.inspectionFailNotes[c.id] ?? ''
  }));

  const totalFailed = failedCriticalIds.length + failedNonCriticalIds.length;
  const missingNoteCount = failsMissingNote.length;
  const blockedByCritical = failedCriticalIds.length > 0;

  const proceedAllPass = () => {
    dispatch({ type: 'completeInspection' });
    nav('/notes?stage=post-inspection');
  };

  const contactAdmin = () => nav('/awaiting-approval');

  return (
    <>
      <StatusBar time="8:06" />
      <div className="scr">
        <AppBar
          title="Vehicle Inspection"
          sub="Pre-trip safety check"
          center
          trailing={<Pill tone="blue" className="mono">{`${inspectionEvaluated}/${total}`}</Pill>}
        />

        <div className="scr-body">
          <div
            className="pad scrollwrap"
            style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: 16 }}
          >
            <div className="row between" style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
                Inspection progress
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--blue)' }}>
                {inspectionPercent}%
              </span>
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 100,
                background: 'var(--surface-2)',
                overflow: 'hidden',
                marginBottom: 8
              }}
            >
              <div
                style={{
                  width: `${inspectionPercent}%`,
                  height: '100%',
                  borderRadius: 100,
                  background: blockedByCritical
                    ? 'linear-gradient(90deg,#EF4444,#F87171)'
                    : 'linear-gradient(90deg,#2563EB,#3B82F6)',
                  transition: 'width .3s'
                }}
              />
            </div>

            <div
              className="card"
              style={{
                padding: '10px 14px',
                marginTop: 4,
                marginBottom: 6,
                background: 'var(--surface)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--muted)'
              }}
            >
              <span className="row gap8">
                <span style={{ color: 'var(--red)', display: 'inline-flex' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <path
                      d="m12 2 2.6 6.6 7 .6-5.3 4.6 1.7 6.9L12 17l-6 3.7 1.7-6.9L2.4 9.2l7-.6L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                Items marked with red star are high-priority — fail blocks the route.
              </span>
            </div>

            <div className="card" style={{ padding: '4px 16px' }}>
              <Checklist
                items={items}
                onSet={(id, value) => dispatch({ type: 'setCheckState', id, value })}
                onNote={(id, text) => dispatch({ type: 'setFailNote', id, text })}
              />
            </div>

            {hasAnyFail && (
              <div
                className="card"
                style={{
                  padding: '14px 16px',
                  marginTop: 12,
                  background: blockedByCritical ? 'var(--red-50)' : 'var(--amber-50)',
                  borderColor: blockedByCritical ? '#FECACA' : 'var(--amber-100)',
                  borderLeft: `3px solid ${blockedByCritical ? 'var(--red)' : 'var(--amber)'}`
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: blockedByCritical ? 'var(--red)' : '#B45309',
                    marginBottom: 4
                  }}
                >
                  {blockedByCritical
                    ? `Route blocked · ${failedCriticalIds.length} critical fail${
                        failedCriticalIds.length > 1 ? 's' : ''
                      }`
                    : `${totalFailed} item${totalFailed > 1 ? 's' : ''} failed · admin approval needed`}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: blockedByCritical ? '#7F1D1D' : '#92400E',
                    lineHeight: 1.45
                  }}
                >
                  {missingNoteCount > 0
                    ? `Add notes on ${missingNoteCount} item${
                        missingNoteCount > 1 ? 's' : ''
                      } before contacting admin.`
                    : 'Notes complete. Contact admin to request approval for the missing items.'}
                </div>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <span className="label">Verification photos</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                <PhotoCapture
                  label="Driver photo"
                  hint="Selfie at the wheel before starting."
                  variant="driver"
                  captureMode="user"
                  required
                  photo={state.photos.driver}
                  onCapture={dataUrl => dispatch({ type: 'setPhoto', kind: 'driver', dataUrl })}
                  onClear={() => dispatch({ type: 'clearPhoto', kind: 'driver' })}
                />
                <PhotoCapture
                  label="Odometer · start of ride"
                  hint="Clear shot of the dashboard reading."
                  required
                  photo={state.photos.odometerStart}
                  onCapture={dataUrl =>
                    dispatch({ type: 'setPhoto', kind: 'odometerStart', dataUrl })
                  }
                  onClear={() => dispatch({ type: 'clearPhoto', kind: 'odometerStart' })}
                />
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11.5,
                  color: 'var(--muted)',
                  fontWeight: 500,
                  lineHeight: 1.4
                }}
              >
                Both photos are required. Logged with timestamps and shift ID.
              </div>
            </div>

            {hasAnyFail ? (
              <Button
                variant="red"
                style={{ marginTop: 16, marginBottom: 4 }}
                disabled={missingNoteCount > 0 || !photosOk}
                onClick={contactAdmin}
              >
                <Phone size={18} stroke="#fff" />
                {!photosOk ? 'Capture both photos to continue' : 'Contact admin for approval'}
              </Button>
            ) : (
              <Button
                style={{ marginTop: 16, marginBottom: 4 }}
                disabled={hasPending || !photosOk}
                onClick={proceedAllPass}
              >
                {hasPending
                  ? `Review all ${total} items`
                  : !photosOk
                  ? 'Capture driver + odometer to start'
                  : 'Start ride'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
