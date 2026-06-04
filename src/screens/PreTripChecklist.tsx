import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { Checklist } from '../components/Checklist';
import { useRoute } from '../state/RouteContext';
import { Phone } from '../components/Icon';

export function PreTripChecklist() {
  const nav = useNavigate();
  const {
    state,
    dispatch,
    driver,
    checklist,
    inspectionEvaluated,
    inspectionPercent,
    failedCriticalIds,
    failedNonCriticalIds,
    failsMissingNote,
    hasAnyFail,
    hasPending
  } = useRoute();
  const nameOk = state.signedName.trim().length >= 3;
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
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: 'var(--red)'
                  }}
                />
                Tap ✕ for any failed item — add a note + contact admin to proceed.
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

            <div style={{ marginTop: 14 }}>
              <span className="label">Enter full name to start ride</span>
              <div className="fld-wrap" style={{ marginTop: 8 }}>
                <span className="ic">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="M5 20a7 7 0 0 1 14 0"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  className="fld"
                  type="text"
                  autoCapitalize="words"
                  autoComplete="name"
                  placeholder={driver.name}
                  value={state.signedName}
                  onChange={e => dispatch({ type: 'setSignedName', name: e.target.value })}
                />
                {nameOk && (
                  <span
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'var(--green)',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24">
                      <path
                        d="m5 13 4 4L19 7"
                        stroke="#fff"
                        strokeWidth="3.2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
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
                By typing your full name you confirm the inspection is accurate and
                accept liability for the pre-trip check.
              </div>
            </div>

            {hasAnyFail ? (
              <Button
                variant="red"
                style={{ marginTop: 16, marginBottom: 4 }}
                disabled={missingNoteCount > 0 || !nameOk}
                onClick={contactAdmin}
              >
                <Phone size={18} stroke="#fff" />
                {!nameOk ? 'Enter your name to continue' : 'Contact admin for approval'}
              </Button>
            ) : (
              <Button
                style={{ marginTop: 16, marginBottom: 4 }}
                disabled={hasPending || !nameOk}
                onClick={proceedAllPass}
              >
                {hasPending
                  ? `Review all ${total} items`
                  : !nameOk
                  ? 'Enter your name to start ride'
                  : 'Start ride'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
