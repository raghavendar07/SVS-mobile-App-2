import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';
import { Button } from '../components/Button';
import { useRoute } from '../state/RouteContext';
import { Mail, Lock, Eye } from '../components/Icon';

export function Login() {
  const nav = useNavigate();
  const { driver } = useRoute();
  const [email, setEmail] = useState(driver.email);
  const [password, setPassword] = useState('123456789');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <>
      <StatusBar time="9:41" />
      <div className="scr">
        <div style={{ padding: '24px 26px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              position: 'relative',
              height: 226,
              borderRadius: 22,
              overflow: 'hidden',
              background: 'linear-gradient(160deg,#1D4ED8,#2563EB 55%,#3B82F6)',
              boxShadow: 'var(--shadow-blue)'
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 340 226"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: 'absolute', inset: 0 }}
            >
              <defs>
                <linearGradient id="rd" x1="0" x2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity={0} />
                  <stop offset="1" stopColor="#fff" stopOpacity={0.22} />
                </linearGradient>
              </defs>
              <circle cx="290" cy="40" r="70" fill="#fff" opacity={0.06} />
              <circle cx="40" cy="200" r="90" fill="#fff" opacity={0.05} />
              <path
                d="M-10 196 Q120 150 180 168 T360 150"
                stroke="#fff"
                strokeOpacity="0.18"
                strokeWidth="2"
                fill="none"
                strokeDasharray="2 9"
                strokeLinecap="round"
              />
              <path
                d="M20 210 Q140 120 240 150 T340 110"
                stroke="url(#rd)"
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
              <g transform="translate(176 122) rotate(-14)">
                <rect x="-44" y="-22" width="88" height="40" rx="12" fill="#fff" />
                <rect x="-30" y="-15" width="34" height="16" rx="4" fill="#BFDBFE" />
                <circle cx="-26" cy="20" r="9" fill="#0F172A" />
                <circle cx="-26" cy="20" r="4" fill="#fff" />
                <circle cx="28" cy="20" r="9" fill="#0F172A" />
                <circle cx="28" cy="20" r="4" fill="#fff" />
                <rect x="34" y="-8" width="9" height="9" rx="2" fill="#FBBF24" />
              </g>
            </svg>
          </div>

          <h2
            style={{
              fontSize: 27,
              fontWeight: 800,
              letterSpacing: '-.04em',
              marginTop: 26
            }}
          >
            Welcome back, driver
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--muted)', marginTop: 6, fontWeight: 450, lineHeight: 1.5 }}>
            Sign in to view today's route and start your shift.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              nav('/today');
            }}
            style={{ display: 'contents' }}
          >
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div className="fld-wrap">
                <span className="ic">
                  <Mail size={19} />
                </span>
                <input
                  className="fld"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                />
              </div>
              <div className="fld-wrap">
                <span className="ic">
                  <Lock size={19} />
                </span>
                <input
                  className="fld"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="eye" onClick={() => setShow(s => !s)} aria-label="Toggle password">
                  <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="row between" style={{ marginTop: 16 }}>
              <label
                className="row gap8"
                style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer' }}
              >
                <button
                  type="button"
                  className={`toggle${remember ? ' on' : ''}`}
                  onClick={() => setRemember(r => !r)}
                  aria-label="Remember me"
                />
                Remember me
              </label>
              <a style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--blue)', cursor: 'pointer' }}>
                Forgot password?
              </a>
            </div>

            <Button type="submit" style={{ marginTop: 'auto', marginBottom: 14 }}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
