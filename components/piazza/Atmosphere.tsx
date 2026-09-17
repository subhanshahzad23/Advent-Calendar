'use client';

import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { seeded } from '@/lib/seed';

const rand = (i: number, a: number, b: number) => seeded(i, a, b, 78.233);

/** Three depth bands of snow — 30 nodes in total, transform/opacity only. */
const BANDS = [
  { count: 12, size: [2.5, 4], dur: [16, 24], opacity: 0.5, blur: 0 },
  { count: 10, size: [4, 6.5], dur: [11, 17], opacity: 0.7, blur: 0.4 },
  { count: 8, size: [6.5, 10], dur: [7, 11], opacity: 0.85, blur: 1.2 },
];

export function Snowfall() {
  const flakes = useMemo(
    () =>
      BANDS.flatMap((band, b) =>
        Array.from({ length: band.count }, (_, i) => {
          const seed = b * 50 + i + 1;
          const size = rand(seed, band.size[0], band.size[1]);
          return {
            key: `${b}-${i}`,
            left: rand(seed + 7, -2, 102),
            size,
            dur: rand(seed + 13, band.dur[0], band.dur[1]),
            delay: -rand(seed + 21, 0, band.dur[1]),
            drift: rand(seed + 29, -70, 90),
            opacity: band.opacity,
            blur: band.blur,
          };
        }),
      ),
    [],
  );

  return (
    <div className="snowLayer" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.key}
          className="flake"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              filter: f.blur ? `blur(${f.blur}px)` : undefined,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
              '--drift': `${f.drift}px`,
              '--o': f.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: rand(i + 3, 8, 94),
  top: rand(i + 31, 52, 88),
  dur: rand(i + 61, 7, 13),
  delay: -rand(i + 91, 0, 9),
  mx: rand(i + 121, -22, 26),
  size: rand(i + 151, 2, 4),
}));

/** Warm dust drifting near the lanterns. */
export function Motes() {
  return (
    <div className="motes" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              '--dur': `${m.dur}s`,
              '--delay': `${m.delay}s`,
              '--mx': `${m.mx}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function CloudBands() {
  return (
    <div aria-hidden="true">
      <div className="cloudBand" style={{ top: '12%' }} />
      <div
        className="cloudBand"
        style={{ top: '30%', animationDuration: '190s', animationDirection: 'reverse', opacity: 0.7 }}
      />
    </div>
  );
}
