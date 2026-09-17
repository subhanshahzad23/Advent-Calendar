import type { MotionType } from '@/types/advent';

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false as const,
});

/* --- Interface icons ------------------------------------------------------ */
export const MenuIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
  </svg>
);

export const CloseIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowLeft = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M14.5 5L8 12l6.5 7" />
  </svg>
);

export const ArrowRight = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M9.5 5L16 12l-6.5 7" />
  </svg>
);

export const CheckIcon = ({ size = 14 }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.2}>
    <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
  </svg>
);

export const LockIcon = ({ size = 13 }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.7}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8.2 10.5V7.8a3.8 3.8 0 017.6 0v2.7" />
  </svg>
);

export const SoundIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4z" />
  </svg>
);

export const SwipeIcon = ({ size = 17, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
  </svg>
);

export const ResetIcon = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M19.5 12a7.5 7.5 0 11-2.3-5.4" />
    <path d="M19.9 4.5v4.2h-4.2" />
  </svg>
);

export const SparkIcon = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 3.5l1.9 5.2 5.3 1.8-5.3 1.9L12 17.6l-1.9-5.2-5.3-1.9 5.3-1.8z" />
  </svg>
);

export const InfoIcon = ({ size = 15 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.2M12 7.8v.6" />
  </svg>
);

export const LeafIcon = ({ size = 17 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M19 5c0 8-4.6 12-10 12H5c0-8 4.6-12 10-12z" />
    <path d="M5 19c2.2-4.4 5-7 9-9" />
  </svg>
);

/** The campaign mark: a bell tower under a star. */
export const CampaignMark = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M12 1.6l1.05 2.35L15.4 5l-2.35 1.05L12 8.4l-1.05-2.35L8.6 5l2.35-1.05z" fill="var(--gold)" />
    <path d="M8.6 11.2L12 8.1l3.4 3.1v10.6H8.6z" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M10.9 21.8v-3.3a1.1 1.1 0 012.2 0v3.3" fill="none" stroke="var(--gold)" strokeWidth="1.1" />
    <circle cx="12" cy="13.6" r="1.4" fill="none" stroke="var(--gold)" strokeWidth="1.1" />
  </svg>
);

/* --- Day icons: one per daily moment -------------------------------------- */
const dayPaths: Record<MotionType, React.ReactNode> = {
  'star-rise': <path d="M12 4l2 5.4 5.6 1.9-5.6 2L12 19l-2-5.7-5.6-2L10 9.4z" />,
  'candle-light': (
    <>
      <path d="M12 3.4c1.6 1.7 2.4 3 2.4 4a2.4 2.4 0 11-4.8 0c0-1 .8-2.3 2.4-4z" />
      <rect x="9" y="11" width="6" height="9.5" rx="1.2" />
    </>
  ),
  'letter-unfold': (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="1.8" />
      <path d="M3.9 7.2L12 13l8.1-5.8" />
    </>
  ),
  'snow-cafe': (
    <>
      <path d="M5 10h11v3.5a5.5 5.5 0 01-11 0z" />
      <path d="M16 10.6h1.8a2.4 2.4 0 010 4.8H16M4 20h13" />
    </>
  ),
  'bakery-steam': (
    <>
      <path d="M4 13.5c0-3 3.6-5 8-5s8 2 8 5-3.6 5.5-8 5.5-8-2.5-8-5.5z" />
      <path d="M9 5.5c0 1.4-1.2 1.6-1.2 3M15 5c0 1.5-1.2 1.7-1.2 3.2" />
    </>
  ),
  'book-open': (
    <>
      <path d="M12 7.2C10.4 5.9 8 5.4 4 5.6v12c4-.2 6.4.3 8 1.6 1.6-1.3 4-1.8 8-1.6v-12c-4-.2-6.4.3-8 1.6z" />
      <path d="M12 7.2v11.9" />
    </>
  ),
  'fountain-shimmer': (
    <>
      <path d="M12 3.5v6M8.6 9.5h6.8M5 14h14M4 18.4c1.6 0 1.6 1.3 3.2 1.3s1.6-1.3 3.2-1.3 1.6 1.3 3.2 1.3 1.6-1.3 3.2-1.3" />
      <path d="M7.5 14l1.2 3.2M16.5 14l-1.2 3.2" />
    </>
  ),
  'music-drift': (
    <>
      <path d="M9.5 17.2V6.4l8.5-1.9v10.7" />
      <circle cx="7.2" cy="17.6" r="2.3" />
      <circle cx="15.7" cy="15.4" r="2.3" />
    </>
  ),
  'lantern-path': (
    <>
      <path d="M9 4.5h6M10 4.5l-1.4 3.2v7.6h6.8V7.7L14 4.5" />
      <path d="M12 8.6v5.3M8.6 19.5h6.8" />
    </>
  ),
  'garland-hang': (
    <>
      <path d="M3 6.2c3.6 5 14.4 5 18 0" />
      <path d="M6.6 8.6v2.6M12 10.2v2.6M17.4 8.6v2.6" />
      <circle cx="6.6" cy="12.6" r="1.5" />
      <circle cx="12" cy="14.2" r="1.5" />
      <circle cx="17.4" cy="12.6" r="1.5" />
    </>
  ),
  'lantern-press': (
    <>
      <path d="M12 2.6v2.4M7.5 6.4h9l-1.2 11.2H8.7z" />
      <path d="M9.6 9.6h4.8M9.9 13.4h4.2M9.4 20.4h5.2" />
    </>
  ),
  'branch-sway': (
    <>
      <path d="M3.5 19.5C8 17 11 13 13 7.5" />
      <path d="M7.6 15.4l-2.9-1.2M10.3 11.6l-2.6-2M12.4 7.6l-1.3-2.9M13.3 8.9l3.1-.9M11.4 12.5l3.3.2M8.9 15.9l2.8 1.5" />
    </>
  ),
  'glass-warm': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v5.3M12 15.2v5.3M3.5 12h5.3M15.2 12h5.3M6 6l3.7 3.7M14.3 14.3L18 18M18 6l-3.7 3.7M9.7 14.3L6 18" />
    </>
  ),
  'bridge-reflection': (
    <>
      <path d="M2.5 13.5c3.6 0 5.6-5 9.5-5s5.9 5 9.5 5" />
      <path d="M6.6 11.4v3.4M12 8.6v6.2M17.4 11.4v3.4" />
      <path d="M3 18.6c1.7 0 1.7 1.2 3.4 1.2s1.7-1.2 3.4-1.2 1.7 1.2 3.4 1.2 1.7-1.2 3.4-1.2 1.7 1.2 3.4 1.2" />
    </>
  ),
  'choir-breath': (
    <>
      <circle cx="7.4" cy="6.6" r="2.4" />
      <circle cx="16.6" cy="6.6" r="2.4" />
      <path d="M3.4 20.4v-4.2a4 4 0 014-4h0a4 4 0 014 4v4.2M12.6 20.4v-4.2a4 4 0 014-4h0a4 4 0 014 4v4.2" />
    </>
  ),
  'stable-doors': (
    <>
      <path d="M3.4 20.4V9.6L12 3.6l8.6 6v10.8z" />
      <path d="M8.6 20.4v-6.8h6.8v6.8M12 13.6v6.8" />
    </>
  ),
  'cat-blink': (
    <>
      <path d="M5.4 11.4L4.6 5.8l4 2.6a8.6 8.6 0 016.8 0l4-2.6-.8 5.6" />
      <path d="M4.6 13.8a7.4 7.4 0 0014.8 0" />
      <path d="M9.4 12.4v.6M14.6 12.4v.6M12 15.4v1.2" />
    </>
  ),
  'winter-blooms': (
    <>
      <path d="M12 12.4c0-4 2.6-6.8 6.6-7.4.4 4.2-2.2 7.4-6.6 7.4z" />
      <path d="M12 12.4C12 8.4 9.4 5.6 5.4 5c-.4 4.2 2.2 7.4 6.6 7.4z" />
      <path d="M12 12.4v8" />
      <circle cx="9.4" cy="17.4" r="1.4" />
      <circle cx="14.6" cy="15.8" r="1.4" />
    </>
  ),
  'roof-star-trail': (
    <>
      <path d="M17 3.4l1.1 2.7 2.9 1-2.9 1.1L17 11l-1.1-2.8-2.9-1.1 2.9-1z" />
      <path d="M13.4 10.2C10.6 12.6 7.2 15 3.4 16.6" />
      <path d="M3.4 20.6v-4.2l4.2.2" />
    </>
  ),
  'gift-slide': (
    <>
      <rect x="4" y="9.6" width="16" height="10.8" rx="1.4" />
      <path d="M12 9.6v10.8M4 14.2h16" />
      <path d="M12 9.6C10.8 6.4 9.6 5 8.2 5a2 2 0 000 4M12 9.6c1.2-3.2 2.4-4.6 3.8-4.6a2 2 0 010 4" />
    </>
  ),
  'clock-hands': (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 6.8V12l3.4 2.4" />
    </>
  ),
  'nativity-reveal': (
    <>
      <path d="M12 3.4l3.6 4.4H8.4z" />
      <path d="M8.4 7.8h7.2v9.4H8.4z" />
      <path d="M9.8 17.2c0-1.6 1-2.4 2.2-2.4s2.2.8 2.2 2.4" />
      <path d="M6.4 20.6h11.2" />
    </>
  ),
  'tree-lights': (
    <>
      <path d="M12 3.2l4.4 6H7.6z" />
      <path d="M12 8l5.6 7.4H6.4z" />
      <path d="M10.6 15.4h2.8v5h-2.8z" />
      <path d="M9.6 12.4h.01M14.2 13.4h.01M11.9 6.6h.01" />
    </>
  ),
  'christmas-radiance': (
    <>
      <path d="M12 2.6l1.8 5 5 1.8-5 1.9-1.8 5-1.8-5-5-1.9 5-1.8z" />
      <path d="M4.2 18.4h15.6M6.4 21.4h11.2M3 14.6l1.6.6M21 14.6l-1.6.6" />
    </>
  ),
};

export const DayIcon = ({ motion, size = 18 }: { motion: MotionType; size?: number }) => (
  <svg {...base(size)}>{dayPaths[motion]}</svg>
);
