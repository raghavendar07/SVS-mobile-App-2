import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';
import { Button } from '../components/Button';
import { Pill } from '../components/Pill';
import { useRoute } from '../state/RouteContext';
import { passengerById } from '../data/seed';
import { Building } from '../components/Icon';

export function DropoffConfirmation() {
  const { stopId = '' } = useParams();
  const nav = useNavigate();
  const { stops, state, dispatch, route } = useRoute();
  const stop = stops.find(s => s.id === stopId) ?? stops[stops.length - 1];
  const passenger = passengerById(stop.passengerId);
  const stopIndex = stops.indexOf(stop) + 1;
  const [notes, setNotes] = useState('');

  const checkAllDone = () => {
    const all = state.stops.every(s => s.id === stop.id || s.status === 'done' || s.status === 'missed');
    return all;
  };

  const onDropoff = () => {
    dispatch({ type: 'dropoff', stopId: stop.id, notes });
    nav(checkAllDone() ? '/summary' : '/timeline');
  };
  const onMissed = () => {
    dispatch({ type: 'missedDropoff', stopId: stop.id });
    nav(checkAllDone() ? '/summary' : '/timeline');
  };

  return (
    <>
      <StatusBar time="9:30" />
      <div className="scr">
        <AppBar
          title="Confirm drop-off"
          sub={`Stop ${stopIndex} of ${stops.length}`}
          center
          trailing={<Pill tone="green" dot>Arrived</Pill>}
        />
        <div className="scr-body">
          <div className="pad" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="card soft" style={{ padding: 18, textAlign: 'center' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--green-50)',
                  color: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Building size={32} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Destination</div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.02em', marginTop: 2 }}>
                {stop.kind === 'final' ? route.destination : stop.address}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
                {route.destinationAddress}
              </div>
            </div>

            <div className="card" style={{ padding: '14px 16px', marginTop: 12 }}>
              <div className="row gap12">
                <img
                  className="avatar"
                  style={{ width: 46, height: 46 }}
                  src={passenger?.avatar ?? 'https://i.pravatar.cc/120?img=12'}
                  alt=""
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600 }}>
                    Passenger
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>
                    {passenger?.name ?? 'Group'}
                  </div>
                </div>
                <Pill tone="blue">On board</Pill>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="label">Drop-off notes</span>
              <textarea
                className="fld"
                style={{ marginTop: 8, height: 80 }}
                placeholder="e.g. handed over to care staff at reception…"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <div className="row gap12" style={{ marginTop: 'auto', marginBottom: 16 }}>
              <Button
                variant="line"
                style={{ flex: 1, color: 'var(--amber)', borderColor: '#FDE68A' }}
                onClick={onMissed}
              >
                Missed
              </Button>
              <Button variant="green" style={{ flex: 1.6 }} onClick={onDropoff}>
                Passenger dropped off
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
