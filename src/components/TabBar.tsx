import { useNavigate, useLocation } from 'react-router-dom';
import { Home, List, History, Person } from './Icon';

export type TabKey = 'home' | 'routes' | 'history' | 'profile';

const TABS: { key: TabKey; label: string; path: string; Icon: typeof Home }[] = [
  { key: 'home', label: 'Home', path: '/today', Icon: Home },
  { key: 'routes', label: 'Routes', path: '/timeline', Icon: List },
  { key: 'history', label: 'History', path: '/history', Icon: History },
  { key: 'profile', label: 'Profile', path: '/profile', Icon: Person }
];

export function TabBar({ active }: { active?: TabKey }) {
  const nav = useNavigate();
  const loc = useLocation();
  const current = active ?? TABS.find(t => loc.pathname.startsWith(t.path))?.key;
  return (
    <nav className="tabbar">
      {TABS.map(({ key, label, path, Icon }) => (
        <button
          key={key}
          className={`tab${current === key ? ' on' : ''}`}
          onClick={() => nav(path)}
          aria-label={label}
        >
          <Icon size={24} />
          {label}
        </button>
      ))}
    </nav>
  );
}
