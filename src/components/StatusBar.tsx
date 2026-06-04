type Props = { time?: string; dark?: boolean };

export function StatusBar({ time = '9:41', dark = false }: Props) {
  return (
    <div className={`statusbar${dark ? ' dark' : ''}`}>
      <span className="t">{time}</span>
      <span className="ic">
        <svg width="18" height="12" viewBox="0 0 18 12">
          <rect y="7" width="3" height="5" rx="1" fill="currentColor" />
          <rect x="5" y="4.5" width="3" height="7.5" rx="1" fill="currentColor" />
          <rect x="10" y="2" width="3" height="10" rx="1" fill="currentColor" />
          <rect x="15" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 13">
          <path
            d="M8.5 11.5 1.2 4.5a10 10 0 0 1 14.6 0L8.5 11.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13">
          <rect
            x="1"
            y="1"
            width="21"
            height="11"
            rx="3.2"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity={dark ? 0.55 : 0.45}
            fill="none"
          />
          <rect x="3" y="3" width="16.5" height="7" rx="1.6" fill="currentColor" />
          <path d="M23.5 4.5v4c1 -.4 1-3.6 0-4Z" fill="currentColor" opacity=".5" />
        </svg>
      </span>
    </div>
  );
}
