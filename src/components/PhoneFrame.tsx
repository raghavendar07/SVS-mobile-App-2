import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device">
      <div className="phone">
        <div className="viewport">
          <div className="island" />
          {children}
        </div>
      </div>
    </div>
  );
}
