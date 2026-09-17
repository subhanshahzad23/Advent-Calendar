'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  DESKTOP_VIEW,
  MOBILE_VIEW,
  toStagePercent,
  type SceneBox,
} from '@/data/sceneConfig';
import type { ProgressStage, ResolvedDay } from '@/types/advent';
import { DayMarker } from '@/components/DayMarker';
import { ArrowLeft, ArrowRight, SwipeIcon } from '@/components/Icons';
import { CloudBands, Motes, Snowfall } from './Atmosphere';
import { ForegroundLayer } from './ForegroundLayer';
import { PeopleLayer } from './PeopleLayer';
import { PiazzaLayer } from './PiazzaLayer';
import { SkyLayer } from './SkyLayer';
import { TownLayer } from './TownLayer';

interface PiazzaSceneProps {
  days: ResolvedDay[];
  stage: ProgressStage;
  compact: boolean;
  calm: boolean;
  entered: boolean;
  justOpened: number | null;
  showHint: boolean;
  onDismissHint: () => void;
  onActivate: (day: number) => void;
  /** Lets the parent focus a marker again after the overlay closes. */
  registerMarker: (day: number, node: HTMLButtonElement | null) => void;
  focusDay: number | null;
}

const PARALLAX_STRENGTH = 16;

export function PiazzaScene({
  days,
  stage,
  compact,
  calm,
  entered,
  justOpened,
  showHint,
  onDismissHint,
  onActivate,
  registerMarker,
  focusDay,
}: PiazzaSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  /* Pan is kept as a 0–1 position across the piazza rather than a pixel
     offset, so a resize or a switch to the portrait crop keeps its place. */
  const [panRatio, setPanRatio] = useState(0.5);
  const [range, setRange] = useState(0);
  const [ready, setReady] = useState(false);

  const view: SceneBox = compact ? MOBILE_VIEW : DESKTOP_VIEW;
  const pan = -range * panRatio;

  const clamp = (r: number) => Math.min(1, Math.max(0, r));

  /* --- measure the pannable range ---------------------------------------- */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const stageEl = stageRef.current;
    if (!wrap || !stageEl) return;
    setRange(Math.max(0, stageEl.offsetWidth - wrap.offsetWidth));
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [measure, compact]);

  /* --- drag to explore ---------------------------------------------------- */
  const drag = useRef({ active: false, startX: 0, startPan: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (range <= 0) return;
    drag.current = { active: true, startX: e.clientX, startPan: pan, moved: 0 };
    stageRef.current?.setAttribute('data-dragging', 'true');
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (drag.current.active) {
      const dx = e.clientX - drag.current.startX;
      drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
      setPanRatio(clamp(-(drag.current.startPan + dx) / range));
      if (drag.current.moved > 12 && showHint) onDismissHint();
      return;
    }

    // Pointer parallax — written straight to CSS vars, no re-render.
    if (calm || e.pointerType === 'touch') return;
    const rect = wrap.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--px', `${(-nx * PARALLAX_STRENGTH).toFixed(2)}px`);
    el.style.setProperty('--py', `${(-ny * PARALLAX_STRENGTH).toFixed(2)}px`);
  };

  const endDrag = () => {
    drag.current.active = false;
    stageRef.current?.removeAttribute('data-dragging');
  };

  const onPointerLeave = () => {
    endDrag();
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0px');
    el.style.setProperty('--py', '0px');
  };

  const nudge = (dir: -1 | 1) => {
    if (range <= 0) return;
    const step = ((wrapRef.current?.offsetWidth ?? 600) * 0.4) / range;
    setPanRatio((r) => clamp(r + dir * step));
    if (showHint) onDismissHint();
  };

  /* Keyboard exploration without any drag gesture. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nudge(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nudge(-1);
    }
  };

  /** Brings a marker into view when it is focused or requested by the menu. */
  const revealDay = useCallback(
    (dayNumber: number) => {
      const wrap = wrapRef.current;
      const stageEl = stageRef.current;
      if (!wrap || !stageEl || range <= 0) return;
      const target = days.find((d) => d.day === dayNumber);
      if (!target) return;
      const { left } = toStagePercent(target.sceneZone.x, target.sceneZone.y, view);
      const xPx = (left / 100) * stageEl.offsetWidth;
      const offset = range * panRatio;
      if (xPx < offset + 90 || xPx > offset + wrap.offsetWidth - 90) {
        setPanRatio(Math.min(1, Math.max(0, (xPx - wrap.offsetWidth / 2) / range)));
      }
    },
    [days, panRatio, range, view],
  );

  useEffect(() => {
    if (focusDay != null) revealDay(focusDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusDay]);

  const lit = useCallback(
    (zoneId: string) => days.some((d) => d.sceneZone.id === zoneId && d.isOpened),
    [days],
  );

  const warmth = (stage - 1) / 3;

  return (
    <div
      ref={wrapRef}
      className={`stageWrap${ready && entered ? ' isReady' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      role="group"
      aria-label="The piazza. Drag or use the arrow keys to explore, then choose a day."
      tabIndex={-1}
      style={{ '--warmth': warmth } as CSSProperties}
    >
      <div
        ref={stageRef}
        className="stage"
        data-stage={stage}
        style={
          {
            '--panX': `${pan}px`,
            '--stage-ratio': `${view.w} / ${view.h}`,
            '--stage-ar': view.w / view.h,
            '--stage-h': compact ? '106%' : '100%',
          } as CSSProperties
        }
      >
        <SkyLayer view={view} />
        <CloudBands />
        <TownLayer view={view} lit={lit} />
        <PiazzaLayer view={view} lit={lit} />
        <PeopleLayer view={view} />
        <ForegroundLayer view={view} />

        <div className="warmBloom" aria-hidden />
        <Snowfall />
        <Motes />

        <div className="markerLayer">
          {days.map((day) => {
            const { left, top } = toStagePercent(day.sceneZone.x, day.sceneZone.y, view);
            return (
              <DayMarker
                key={day.day}
                ref={(node) => registerMarker(day.day, node)}
                day={day}
                left={left}
                top={top}
                justOpened={justOpened === day.day}
                onActivate={(n) => {
                  // A drag should never open a day by accident.
                  if (drag.current.moved > 8) return;
                  if (showHint) onDismissHint();
                  onActivate(n);
                }}
                onFocusMarker={revealDay}
              />
            );
          })}
        </div>
      </div>

      <div className="vignetteFrame" aria-hidden />
      <div className="grain" aria-hidden />

      <button
        type="button"
        className="panBtn panBtn--prev"
        onClick={() => nudge(-1)}
        disabled={range <= 0 || panRatio <= 0.001}
        aria-label="Look further west across the piazza"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        className="panBtn panBtn--next"
        onClick={() => nudge(1)}
        disabled={range <= 0 || panRatio >= 0.999}
        aria-label="Look further east across the piazza"
      >
        <ArrowRight size={18} />
      </button>

      {showHint && range > 0 && (
        <div className="exploreHint" role="status">
          <SwipeIcon className="exploreHint__hand" />
          Explore the piazza — drag to look around
        </div>
      )}
    </div>
  );
}
