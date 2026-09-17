import type { CSSProperties, ReactNode } from 'react';
import { viewBoxString, type SceneBox } from '@/data/sceneConfig';

/**
 * One parallax plane of the piazza. Each plane is an independent SVG sharing
 * the same coordinate space, so layers stay registered while moving at
 * different depths.
 */
export function LayerSvg({
  view,
  depth,
  z,
  children,
}: {
  view: SceneBox;
  depth: number;
  z: number;
  children: ReactNode;
}) {
  return (
    <div className="pLayer" style={{ '--depth': depth, zIndex: z } as CSSProperties}>
      <svg
        className="sceneSvg"
        viewBox={viewBoxString(view)}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
    </div>
  );
}

/** Small helper for staggered reveal delays inside the illustration. */
export const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;
