import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { TabBar } from '../components/TabBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { Timeline, TimelineItem, type TimelineItemState } from '../components/Timeline';
import { useRoute, type StopStatus } from '../state/RouteContext';
import { passengerById, type Stop } from '../data/seed';
import { Building } from '../components/Icon';

const stateFor = (status: StopStatus, isFinal: boolean): TimelineItemState =>
  status === 'done' ? 'done' : status === 'current' ? 'now' : isFinal ? 'final' : 'upcoming';

export function MultiStopTimeline() {
  const nav = useNavigate();
  const { state, stops, orderedIndices, completedCount, percentComplete, currentStop, route } = useRoute();

  const nextEta = currentStop?.scheduledAt ?? '—';

  return (
    <>
      <StatusBar time="8:24" />
      <div className="scr has-tab">
        <AppBar
          title="Route timeline"
          sub={`${route.id} · ${completedCount} of ${stops.length} complete`}
          center
          trailing={
            <div className="row gap8">
              <button
                onClick={() => nav('/notes?stage=mid-route')}
                className="iconbtn"
                aria-label="Daily notes"
                style={{ cursor: 'pointer' }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24">
                  <path
                    d="M4 6h16M4 12h10M4 18h7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <Pill tone="blue" className="mono">{percentComplete}%</Pill>
            </div>
          }
        />
        <div className="scr-body">
          <div className="pad scrollwrap" style={{ paddingBottom: 20 }}>
            <div
              className="card"
              style={{
                padding: '14px 16px',
                marginBottom: 14,
                background: 'var(--blue-50)',
                borderColor: 'var(--blue-100)'
              }}
            >
              <div className="row between">
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-700)' }}>
                  Live ETA to next stop
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 13, fontWeight: 800, color: 'var(--blue-700)' }}
                >
                  {nextEta}
                </span>
              </div>
            </div>

            <Timeline>
              {orderedIndices.map(i => {
                const stop = stops[i];
                const status = state.stops[i].status;
                const isFinal = stop.kind === 'final';
                const itemState = stateFor(status, isFinal);
                return (
                  <TimelineItem key={stop.id} state={itemState}>
                    <StopCard
                      stop={stop}
                      itemState={itemState}
                      completedAt={state.stops[i].completedAt}
                      isFinal={isFinal}
                      onNavigate={() => nav(`/navigate/${stop.id}`)}
                      onOpenPassenger={() =>
                        stop.passengerId && nav(`/passenger/${stop.passengerId}`)
                      }
                    />
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>
        </div>
        <TabBar active="routes" />
      </div>
    </>
  );
}

function StopCard({
  stop,
  itemState,
  completedAt,
  isFinal,
  onNavigate,
  onOpenPassenger
}: {
  stop: Stop;
  itemState: TimelineItemState;
  completedAt?: string;
  isFinal: boolean;
  onNavigate: () => void;
  onOpenPassenger: () => void;
}) {
  const pax = passengerById(stop.passengerId);
  const isNow = itemState === 'now';

  if (isFinal) {
    return (
      <div className="card" style={{ padding: '12px 14px' }}>
        <div className="row between">
          <div
            className="row gap10"
            onClick={onOpenPassenger}
            style={{ cursor: stop.passengerId ? 'pointer' : 'default' }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: 'var(--green-50)',
                color: 'var(--green)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <Building size={18} />
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{stop.address}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Drop-off</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span className="mono" style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)' }}>
              {stop.scheduledAt}
            </span>
            <Pill tone={itemState === 'done' ? 'green' : 'grey'}>
              {itemState === 'done' ? 'Done' : itemState === 'now' ? 'Now' : 'Final'}
            </Pill>
          </div>
        </div>
        {isNow && (
          <div className="row gap8" style={{ marginTop: 10 }}>
            <Button size="sm" style={{ flex: 1 }} onClick={onNavigate}>
              Navigate
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`card${isNow ? ' soft' : ''}`}
      style={{
        padding: isNow ? '13px 14px' : '12px 14px',
        borderColor: isNow ? 'var(--blue-200)' : undefined
      }}
    >
      <div className="row between">
        <div
          className="row gap10"
          onClick={onOpenPassenger}
          style={{ cursor: 'pointer' }}
        >
          <img
            className="avatar"
            style={{ width: isNow ? 38 : 36, height: isNow ? 38 : 36 }}
            src={pax?.avatar}
            alt=""
          />
          <div>
            <div style={{ fontSize: isNow ? 14.5 : 14, fontWeight: isNow ? 800 : 700 }}>
              {pax?.name ?? '—'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {itemState === 'done'
                ? `Picked up · ${completedAt ?? ''}`
                : `Pickup · ${stop.address}`}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span className="mono" style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)' }}>
            {stop.scheduledAt}
          </span>
          <Pill tone={itemState === 'done' ? 'green' : itemState === 'now' ? 'blue' : 'grey'}>
            {itemState === 'done' ? 'Done' : itemState === 'now' ? 'Now' : 'Upcoming'}
          </Pill>
        </div>
      </div>
      {isNow && (
        <div className="row gap8" style={{ marginTop: 10 }}>
          <Button size="sm" style={{ flex: 1 }} onClick={onNavigate}>
            Navigate
          </Button>
          <Button size="sm" variant="line" style={{ flex: 1 }}>
            Call
          </Button>
        </div>
      )}
    </div>
  );
}
