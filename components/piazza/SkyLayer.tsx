import type { CSSProperties } from 'react';
import { LAYER_DEPTH, type SceneBox } from '@/data/sceneConfig';
import { onCircle, seeded } from '@/lib/seed';
import { LayerSvg } from './LayerSvg';

const STARS = Array.from({ length: 74 }, (_, i) => ({
  x: seeded(i + 1, 20, 2380),
  y: seeded(i + 41, -450, 720),
  r: seeded(i + 91, 1.6, 4.4),
  dur: seeded(i + 131, 3.2, 7.5),
  delay: seeded(i + 181, 0, 5),
  // Stars fill the sky gradually across the four stages.
  tier: (i % 4) + 1,
}));

/**
 * Production asset slot: replace this demo SVG layer with the supplied
 * sky / horizon illustration asset (same 2400×1350 coordinate space).
 */
export function SkyLayer({ view }: { view: SceneBox }) {
  return (
    <LayerSvg view={view} depth={LAYER_DEPTH.sky} z={1}>
      <defs>
        {/* The rect runs above y=0 so the portrait crop has sky to spare. */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04091a" />
          <stop offset="31%" stopColor="#081428" />
          <stop offset="54%" stopColor="#10233f" />
          <stop offset="74%" stopColor="#1b3c66" />
          <stop offset="90%" stopColor="#2c5480" />
          <stop offset="100%" stopColor="#456d92" />
        </linearGradient>

        <radialGradient id="horizonGlow" cx="50%" cy="100%" r="62%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#e88735" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7f2e9" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#afc6d9" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#afc6d9" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5e87" />
          <stop offset="100%" stopColor="#24446d" />
        </linearGradient>

        <radialGradient id="starBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e7" stopOpacity="0.62" />
          <stop offset="26%" stopColor="#f2b84b" stopOpacity="0.26" />
          <stop offset="62%" stopColor="#e88735" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b4f7a" />
          <stop offset="100%" stopColor="#1b3557" />
        </linearGradient>
      </defs>

      <rect x="-260" y="-600" width="2920" height="1950" fill="url(#skyGrad)" />

      {/* Dusk warmth on the horizon — deepens as the journey progresses. */}
      <ellipse
        cx="1200"
        cy="860"
        rx="1500"
        ry="420"
        fill="url(#horizonGlow)"
        style={{ opacity: 'calc(0.5 + var(--warmth) * 0.5)', transition: 'opacity 2.4s ease' } as CSSProperties}
      />

      {/* Stars arrive in tiers across the four stages. */}
      <g fill="#f7f2e9">
        {STARS.map((s, i) => (
          <circle
            key={i}
            className={`twinkle rv${s.tier}`}
            cx={s.x}
            cy={s.y}
            r={Math.round(s.r * 55) / 100}
            style={{ '--tdur': `${s.dur}s`, '--delay': `${s.delay}s`, '--d': `${(i % 9) * 0.12}s` } as CSSProperties}
          />
        ))}
      </g>

      {/* Moon over the eastern rooftops. */}
      <g className="rv1">
        <circle cx="2168" cy="238" r="150" fill="url(#moonGlow)" />
        <circle cx="2168" cy="238" r="46" fill="#f7f2e9" opacity="0.92" />
        <circle cx="2148" cy="226" r="46" fill="#10233f" opacity="0.55" />
      </g>

      {/* Distant snow hills. */}
      <path
        d="M0 806 L190 742 L330 784 L512 700 L700 782 L890 726 L1080 790 L1290 730 L1500 786 L1720 720 L1930 782 L2150 736 L2400 792 L2400 900 L0 900 Z"
        fill="url(#hillFar)"
        opacity="0.55"
      />
      <path
        d="M0 848 L170 806 L360 850 L560 792 L760 846 L980 800 L1200 852 L1420 806 L1650 854 L1880 804 L2120 850 L2400 812 L2400 960 L0 960 Z"
        fill="url(#hillNear)"
        opacity="0.75"
      />
      {/* Snow caps catching the last light. */}
      <path
        d="M512 700 L560 722 L470 744 Z M890 726 L936 748 L848 768 Z M1720 720 L1770 744 L1676 764 Z"
        fill="#dce8f2"
        opacity="0.3"
      />

      {/*
        The Christmas Eve star. It only arrives in the final stage, and when it
        does it is the brightest thing in the composition — everything else in
        the square is lit warm, this one light is lit white.
      */}
      <g className="rv4 greatStar">
        <circle cx="900" cy="205" r="330" fill="url(#starBloom)" />
        <g className="greatStar__rays">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            const len = i % 3 === 0 ? 300 : 190;
            const tip = onCircle(900, 205, len, a);
            return (
              <path
                key={i}
                d={`M900 205L${tip.x} ${tip.y}`}
                stroke="#f2b84b"
                strokeWidth={i % 3 === 0 ? 3.5 : 1.8}
                strokeLinecap="round"
                opacity="0.45"
              />
            );
          })}
        </g>
        <g className="greatStar__core">
          <path
            d="M900 132l17 46 46 17-46 17-17 46-17-46-46-17 46-17z"
            fill="#fff7e7"
          />
          <path
            d="M900 160l8 30 30 8-30 8-8 30-8-30-30-8 30-8z"
            fill="#fff"
            opacity="0.9"
          />
        </g>
        <path d="M900 260v560" stroke="#f2b84b" strokeWidth="2.5" opacity="0.1" />
      </g>

      {/* Far silhouette of the cathedral quarter, behind the town. */}
      <g fill="#142c4c" opacity="0.62">
        <path d="M1960 900V742h34v-52h22v52h34v158z" />
        <path d="M2058 900V790l58-46 58 46v110z" />
        <path d="M120 900V768l46-40 46 40v132z" />
      </g>
    </LayerSvg>
  );
}
