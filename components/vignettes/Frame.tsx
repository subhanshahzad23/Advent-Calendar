'use client';

import type { CSSProperties, ReactNode } from 'react';

export interface VignetteProps {
  /** Fired the first time the visitor interacts with the illustration. */
  onInteract?: () => void;
}

export interface VignetteDef {
  Component: React.ComponentType<VignetteProps>;
  /** Shown under the illustration until the visitor interacts. */
  hint?: string;
}

/**
 * Shared shell for a daily moment. Interactive vignettes become a single large
 * button so the whole illustration is keyboard- and touch-reachable.
 */
export function Frame({
  children,
  onClick,
  label,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  label?: string;
  className?: string;
}) {
  const svg = (
    <svg viewBox="0 0 600 308" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {/* Shared light falloffs — flat low-opacity shapes read as grey haze. */}
      <defs>
        <radialGradient id="vgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.55" />
          <stop offset="48%" stopColor="#f2b84b" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vgGlowSoft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#e88735" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
      </defs>
      {children}
    </svg>
  );

  if (!onClick) return <div className={`vg ${className}`}>{svg}</div>;

  return (
    <button type="button" className={`vg vgHint ${className}`} onClick={onClick} aria-label={label}>
      {svg}
    </button>
  );
}

/** Dusk backdrop used by every vignette so the 24 read as one set. */
export function SkyBack({ warm = 0 }: { warm?: number }) {
  return (
    <>
      <rect width="600" height="308" fill="#0c1d38" />
      <ellipse cx="300" cy="316" rx="440" ry="190" fill="#2a5480" opacity="0.55" />
      {warm > 0 && <ellipse cx="300" cy="320" rx="380" ry="170" fill="#e88735" opacity={0.3 * warm} />}
      <rect y="250" width="600" height="58" fill="#12294a" />
    </>
  );
}

export const stagger = (i: number): CSSProperties => ({ '--i': i }) as CSSProperties;
export const withDelay = (s: number): CSSProperties => ({ '--d': `${s}s` }) as CSSProperties;
