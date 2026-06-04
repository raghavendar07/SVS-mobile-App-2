import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const wrap = (path: React.ReactNode, defaults: Partial<SVGProps<SVGSVGElement>> = {}) =>
  function Icon({ size = 20, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...defaults}
        {...rest}
      >
        {path}
      </svg>
    );
  };

export const ChevronLeft = wrap(
  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
);

export const ChevronRight = wrap(
  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
);

export const ArrowRight = wrap(
  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
);

export const Check = wrap(
  <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
);

export const Mail = wrap(
  <>
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);

export const Lock = wrap(
  <>
    <rect x="4" y="10" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
  </>
);

export const Eye = wrap(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </>
);

export const Users = wrap(
  <>
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 19a6 6 0 0 1 12 0M16 7a3 3 0 0 1 0 6m5 6a5 5 0 0 0-4-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);

export const Pin = wrap(
  <>
    <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
  </>
);

export const Route = wrap(
  <path d="M5 19 19 5M8 5H5v3M16 19h3v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
);

export const Clock = wrap(
  <>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 8v4l2.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);

export const Home = wrap(
  <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
);

export const List = wrap(
  <path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
);

export const Target = wrap(
  <>
    <circle cx="12" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="11" r="2.4" fill="currentColor" />
    <path d="M12 2v2m0 14v2m9-9h-2M5 11H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);

export const Chat = wrap(
  <path d="M4 5h16v11H8l-4 3V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
);

export const Person = wrap(
  <>
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);

export const Bus = wrap(
  <path d="M3 13.5 5 8a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5.5V18h-2v-1.5H5V18H3v-4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
);

export const Phone = wrap(
  <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l1 4v3a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
);

export const NavArrow = wrap(
  <path d="M3 11l18-8-8 18-2-8-8-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
);

export const Building = wrap(
  <path d="M3 21V9l9-6 9 6v12h-6v-7h-6v7H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
);

export const History = wrap(
  <>
    <path
      d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);
