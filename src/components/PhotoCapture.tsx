import { useRef } from 'react';
import type { CapturedPhoto } from '../state/RouteContext';

type Props = {
  label: string;
  hint?: string;
  variant?: 'driver' | 'odometer';
  captureMode?: 'user' | 'environment';
  photo?: CapturedPhoto;
  onCapture: (dataUrl: string) => void;
  onClear: () => void;
  required?: boolean;
};

export function PhotoCapture({
  label,
  hint,
  variant = 'odometer',
  captureMode = 'environment',
  photo,
  onCapture,
  onClear,
  required
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = () => inputRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onCapture(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const captured = !!photo;

  return (
    <div
      style={{
        border: `1.5px ${captured ? 'solid' : 'dashed'} ${
          captured ? 'var(--green)' : 'var(--line-2)'
        }`,
        borderRadius: 16,
        background: captured ? '#fff' : 'var(--surface)',
        overflow: 'hidden',
        transition: 'border-color .2s, background .2s'
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={captureMode}
        onChange={onFile}
        style={{ display: 'none' }}
      />
      {captured ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10 }}>
          <img
            src={photo.dataUrl}
            alt={label}
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              objectFit: 'cover',
              flex: '0 0 auto',
              background: '#000'
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              className="row gap8"
              style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ color: 'var(--green)' }}>
                <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.16" />
                <path
                  d="m7 12 3.5 3.5L17 9"
                  stroke="var(--green)"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {label}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: 'var(--muted)',
                fontWeight: 600,
                marginTop: 2
              }}
            >
              Captured · {photo.time}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '0 0 auto' }}>
            <button
              type="button"
              onClick={pick}
              style={{
                background: 'var(--blue-50)',
                color: 'var(--blue-700)',
                border: 'none',
                borderRadius: 10,
                padding: '6px 10px',
                fontFamily: 'inherit',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Retake
            </button>
            <button
              type="button"
              onClick={onClear}
              style={{
                background: 'var(--red-50)',
                color: 'var(--red)',
                border: 'none',
                borderRadius: 10,
                padding: '6px 10px',
                fontFamily: 'inherit',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={pick}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 14,
            textAlign: 'left',
            cursor: 'pointer',
            color: 'var(--ink-2)'
          }}
        >
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: variant === 'driver' ? 'var(--blue-50)' : 'var(--amber-50)',
              color: variant === 'driver' ? 'var(--blue)' : 'var(--amber)',
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto'
            }}
          >
            {variant === 'driver' ? <CameraSelfieIcon /> : <OdometerIcon />}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              {label}
              {required && (
                <span style={{ marginLeft: 6, color: 'var(--red)', fontSize: 13 }}>*</span>
              )}
            </div>
            {hint && (
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  fontWeight: 500,
                  marginTop: 2,
                  lineHeight: 1.45
                }}
              >
                {hint}
              </div>
            )}
          </div>
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: 'var(--blue)',
              flex: '0 0 auto',
              padding: '8px 12px',
              borderRadius: 10,
              background: 'var(--blue-50)'
            }}
          >
            Capture
          </span>
        </button>
      )}
    </div>
  );
}

function OdometerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 12 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path
        d="M5.5 14H4M20 14h-1.5M7 8.5 6 7.5M17 8.5l1-1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraSelfieIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h3l2-3h6l2 3h3v11H4V8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
