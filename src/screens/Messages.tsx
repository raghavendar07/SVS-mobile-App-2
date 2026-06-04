import { useState, useEffect, useRef } from 'react';
import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { useRoute } from '../state/RouteContext';

export function Messages() {
  const { state, dispatch } = useRoute();
  const [draft, setDraft] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [state.messages.length]);

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    dispatch({ type: 'sendMessage', text: t });
    setDraft('');
  };

  return (
    <>
      <StatusBar time="11:05" />
      <div className="scr has-tab">
        <div className="appbar" style={{ paddingTop: 10 }}>
          <div className="title" style={{ fontSize: 20 }}>Messages</div>
          <button className="iconbtn" aria-label="New message">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="scr-body">
          <div className="pad scrollwrap" style={{ paddingBottom: 16 }}>
            <div className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
              <div className="row gap12">
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 13,
                      background: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 800,
                      fontSize: 16
                    }}
                  >
                    DP
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      right: -2,
                      bottom: -2,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: 'var(--green)',
                      border: '2.5px solid #fff'
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row between">
                    <span style={{ fontSize: 14.5, fontWeight: 800 }}>Dispatcher</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>2m</span>
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: 'var(--muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: 2
                    }}
                  >
                    Stop 4 rescheduled to 09:50 — please confirm
                  </div>
                </div>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'var(--blue)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 800,
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  2
                </span>
              </div>
            </div>

            <ConversationRow
              avatar={<TeamIcon />}
              name="Operations team"
              time="28m"
              preview="Great work on yesterday's route — 99% on time"
              unreadDot
            />
            <ConversationRow
              avatar={<BellIcon />}
              name="System notification"
              time="1h"
              preview="Reminder: licence renewal due in 6 days"
            />

            <span className="label" style={{ display: 'block', marginBottom: 8, marginTop: 6 }}>
              Dispatcher chat
            </span>
            <div
              ref={threadRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                maxHeight: 200,
                overflowY: 'auto'
              }}
            >
              {state.messages.map(m => (
                <div
                  key={m.id}
                  style={{
                    alignSelf: m.from === 'driver' ? 'flex-end' : 'flex-start',
                    maxWidth: '78%',
                    background: m.from === 'driver' ? 'var(--blue)' : 'var(--surface-2)',
                    color: m.from === 'driver' ? '#fff' : 'var(--ink)',
                    padding: '10px 13px',
                    borderRadius:
                      m.from === 'driver'
                        ? '14px 14px 4px 14px'
                        : '14px 14px 14px 4px',
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.45
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="row gap10" style={{ marginTop: 14 }}>
              <input
                className="fld"
                style={{ flex: 1, height: 46, borderRadius: 100, padding: '0 16px' }}
                placeholder="Type a message…"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button
                onClick={send}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'var(--blue)',
                  border: 'none',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: 'var(--shadow-blue)'
                }}
                aria-label="Send"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M4 12 20 4l-6 16-3-7-7-1Z" fill="#fff" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <TabBar />
      </div>
    </>
  );
}

function ConversationRow({
  avatar,
  name,
  time,
  preview,
  unreadDot
}: {
  avatar: React.ReactNode;
  name: string;
  time: string;
  preview: string;
  unreadDot?: boolean;
}) {
  return (
    <div className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
      <div className="row gap12">
        {avatar}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row between">
            <span style={{ fontSize: 14.5, fontWeight: 800 }}>{name}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{time}</span>
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: 'var(--muted)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: 2
            }}
          >
            {preview}
          </div>
        </div>
        {unreadDot && (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--blue)'
            }}
          />
        )}
      </div>
    </div>
  );
}

function TeamIcon() {
  return (
    <span
      style={{
        width: 46,
        height: 46,
        borderRadius: 13,
        background: '#EEF2FF',
        color: '#4338CA',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path
          d="M9 8h6M9 12h6m-9 6 3-2h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12Z"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
function BellIcon() {
  return (
    <span
      style={{
        width: 46,
        height: 46,
        borderRadius: 13,
        background: 'var(--amber-50)',
        color: 'var(--amber)',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path
          d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8Z"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    </span>
  );
}
