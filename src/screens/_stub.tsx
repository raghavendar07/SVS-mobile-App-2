import { StatusBar } from '../components/StatusBar';
import { AppBar } from '../components/AppBar';

export function Stub({ title, screen }: { title: string; screen: number }) {
  return (
    <>
      <StatusBar />
      <div className="scr">
        <AppBar title={title} center />
        <div className="scr-body">
          <div className="pad" style={{ paddingTop: 60, textAlign: 'center', color: 'var(--muted)' }}>
            <div className="label" style={{ marginBottom: 8 }}>Screen {String(screen).padStart(2, '0')}</div>
            <div style={{ fontSize: 14 }}>Coming next.</div>
          </div>
        </div>
      </div>
    </>
  );
}
