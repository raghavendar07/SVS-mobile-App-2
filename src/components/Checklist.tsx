import type { CheckState } from '../state/RouteContext';
import { Check } from './Icon';

export type ChecklistItem = {
  id: string;
  label: string;
  state: CheckState;
  critical: boolean;
  note: string;
};

export function Checklist({
  items,
  onSet,
  onNote
}: {
  items: ChecklistItem[];
  onSet: (id: string, value: CheckState) => void;
  onNote: (id: string, text: string) => void;
}) {
  return (
    <>
      {items.map(item => {
        const isPass = item.state === 'pass';
        const isFail = item.state === 'fail';
        const hasNote = (item.note ?? '').trim().length > 0;
        return (
          <div
            key={item.id}
            className="check"
            style={{
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              paddingTop: 14,
              paddingBottom: isFail ? 10 : 14
            }}
          >
            <div style={{ display: 'flex', gap: 8, flex: '0 0 auto', marginTop: 1 }}>
              <button
                type="button"
                onClick={() => onSet(item.id, isPass ? 'pending' : 'pass')}
                aria-label={`Mark ${item.label} pass`}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  border: '2px solid',
                  borderColor: isPass ? 'var(--green)' : 'var(--line-2)',
                  background: isPass ? 'var(--green)' : '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  flex: '0 0 auto',
                  transition: 'background .15s, border-color .15s'
                }}
              >
                <Check size={16} stroke={isPass ? '#fff' : 'var(--muted-2)'} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => onSet(item.id, isFail ? 'pending' : 'fail')}
                aria-label={`Mark ${item.label} fail`}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  border: '2px solid',
                  borderColor: isFail ? 'var(--red)' : 'var(--line-2)',
                  background: isFail ? 'var(--red)' : '#fff',
                  color: isFail ? '#fff' : 'var(--muted-2)',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  flex: '0 0 auto',
                  fontSize: 18,
                  fontWeight: 800,
                  transition: 'background .15s, border-color .15s'
                }}
              >
                ✕
              </button>
            </div>
            <span
              className="txt"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                paddingTop: 6,
                color: isPass ? 'var(--muted)' : 'var(--ink)'
              }}
            >
              {item.label}
              {item.critical && (
                <span
                  aria-label="Critical item"
                  title="Critical item"
                  style={{
                    color: 'var(--red)',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24">
                    <path
                      d="m12 2 2.6 6.6 7 .6-5.3 4.6 1.7 6.9L12 17l-6 3.7 1.7-6.9L2.4 9.2l7-.6L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              )}
            </span>

            {isFail && (
              <div
                style={{
                  flexBasis: '100%',
                  marginTop: 8,
                  paddingLeft: 0
                }}
              >
                <div
                  style={{
                    background: 'var(--red-50)',
                    border: '1px solid #FECACA',
                    borderRadius: 12,
                    padding: 12
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '.05em',
                      color: '#B91C1C',
                      textTransform: 'uppercase',
                      marginBottom: 6
                    }}
                  >
                    Required: explain the issue
                  </div>
                  <textarea
                    value={item.note}
                    onChange={e => onNote(item.id, e.target.value)}
                    placeholder="What's missing or wrong? Mention if you'll fix it later in the day."
                    rows={2}
                    style={{
                      width: '100%',
                      border: '1.5px solid #FCA5A5',
                      borderRadius: 10,
                      padding: '10px 12px',
                      fontFamily: 'inherit',
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: 'var(--ink)',
                      background: '#fff',
                      resize: 'none',
                      outline: 'none',
                      minHeight: 64
                    }}
                  />
                  {!hasNote && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 11.5,
                        color: '#B91C1C',
                        fontWeight: 600
                      }}
                    >
                      A note is required for this item.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
