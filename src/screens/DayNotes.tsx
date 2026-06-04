import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import type { DayNoteStage } from '../data/seed';

const STAGE_LABEL: Record<DayNoteStage, string> = {
  'post-inspection': 'After inspection',
  'mid-route': 'Mid-route',
  'post-route': 'Post-route'
};

const STAGE_TONE: Record<DayNoteStage, 'blue' | 'amber' | 'green'> = {
  'post-inspection': 'blue',
  'mid-route': 'amber',
  'post-route': 'green'
};

export function DayNotes() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { state, dispatch, route, driver } = useRoute();
  const stageParam = (params.get('stage') as DayNoteStage | null) ?? 'mid-route';
  const next = params.get('next');

  const [text, setText] = useState('');
  const [stage, setStage] = useState<DayNoteStage>(stageParam);

  const save = () => {
    const t = text.trim();
    if (!t) return;
    dispatch({ type: 'addDayNote', text: t, stage });
    setText('');
  };

  const proceed = () => {
    if (text.trim()) save();
    if (next) nav(next);
    else if (stage === 'post-inspection') nav('/overview');
    else nav(-1);
  };

  return (
    <>
      <StatusBar time="8:08" />
      <div className="scr">
        <AppBar
          title="Daily notes"
          sub={`${route.id} · ${driver.name.split(' ')[0]}`}
          center
          trailing={<Pill tone="grey">{state.dayNotes.length}</Pill>}
        />
        <div className="scr-body">
          <div
            className="pad scrollwrap"
            style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: 16 }}
          >
            <p
              style={{
                fontSize: 13.5,
                color: 'var(--muted)',
                lineHeight: 1.5,
                marginBottom: 14,
                fontWeight: 450
              }}
            >
              Optional notes for the day. Anything you want admin to see —
              missing supplies, items added later, observations, follow-ups.
            </p>

            <div
              className="row gap8"
              style={{ marginBottom: 12, flexWrap: 'wrap' }}
            >
              {(Object.keys(STAGE_LABEL) as DayNoteStage[]).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStage(s)}
                  className={`pill pill-${stage === s ? STAGE_TONE[s] : 'grey'}`}
                  style={{
                    border: stage === s ? '1.5px solid currentColor' : '1.5px solid transparent',
                    cursor: 'pointer',
                    height: 30,
                    padding: '0 13px'
                  }}
                >
                  {STAGE_LABEL[s]}
                </button>
              ))}
            </div>

            <textarea
              className="fld"
              rows={4}
              placeholder={
                stage === 'post-inspection'
                  ? 'e.g. Fire extinguisher missing — collecting from depot at lunch.'
                  : stage === 'mid-route'
                  ? 'e.g. Stop 4 had construction blocking access. Used side entrance.'
                  : 'e.g. Cleaned interior. Reported small dashboard light fault.'
              }
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ minHeight: 110, resize: 'none' }}
            />
            <div className="row gap10" style={{ marginTop: 10 }}>
              <Button variant="line" size="sm" onClick={save} disabled={!text.trim()} style={{ flex: 1 }}>
                Save note
              </Button>
              <Button size="sm" onClick={proceed} style={{ flex: 1.4 }}>
                {next || stage === 'post-inspection' ? 'Save & continue' : 'Done'}
              </Button>
            </div>

            <div style={{ marginTop: 22 }}>
              <span className="label" style={{ display: 'block', marginBottom: 8 }}>
                Today's notes ({state.dayNotes.length})
              </span>
              {state.dayNotes.length === 0 ? (
                <div
                  className="card"
                  style={{
                    padding: '16px 14px',
                    textAlign: 'center',
                    fontSize: 13,
                    color: 'var(--muted)'
                  }}
                >
                  No notes yet for today.
                </div>
              ) : (
                state.dayNotes.map(n => (
                  <div key={n.id} className="card" style={{ padding: '12px 14px', marginBottom: 8 }}>
                    <div className="row between" style={{ marginBottom: 6 }}>
                      <Pill tone={STAGE_TONE[n.stage]}>{STAGE_LABEL[n.stage]}</Pill>
                      <span style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>
                        {n.time}
                      </span>
                    </div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--ink-2)' }}>
                      {n.text}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
