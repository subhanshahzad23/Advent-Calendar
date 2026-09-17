'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import type { ResolvedDay } from '@/types/advent';
import { VIGNETTES } from './vignettes';
import {
  ArrowLeft,
  ArrowRight,
  CheckIcon,
  CloseIcon,
  DayIcon,
  LeafIcon,
  LockIcon,
} from './Icons';

interface DayOverlayProps {
  day: ResolvedDay;
  prevDay: number | null;
  nextDay: number | null;
  onClose: () => void;
  onNavigate: (day: number) => void;
  onToggleComplete: (day: number) => void;
  onDeepLink: (day: ResolvedDay) => void;
  fallbackFocus: () => HTMLElement | null;
}

const SPARKS = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2;
  return { sx: Math.cos(a) * 120, sy: Math.sin(a) * 74, delay: (i % 4) * 0.07 };
});

function Celebration() {
  return (
    <div className="celebrate" aria-hidden>
      <span className="celebrate__glow" />
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="celebrate__spark"
          style={{ '--sx': `${s.sx}px`, '--sy': `${s.sy}px`, '--delay': `${s.delay}s` } as CSSProperties}
        />
      ))}
      <span className="celebrate__word">Kept</span>
    </div>
  );
}

export function DayOverlay({
  day,
  prevDay,
  nextDay,
  onClose,
  onNavigate,
  onToggleComplete,
  onDeepLink,
  fallbackFocus,
}: DayOverlayProps) {
  const ref = useDialog<HTMLDivElement>({ open: true, onClose, fallbackFocus });
  const [interacted, setInteracted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const vignette = VIGNETTES[day.motionType];
  const Vignette = vignette?.Component;

  // Moving between days resets the little interaction state and the scroll.
  useEffect(() => {
    setInteracted(false);
    setCelebrating(false);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [day.day]);

  useEffect(() => {
    if (!celebrating) return;
    const t = window.setTimeout(() => setCelebrating(false), 1800);
    return () => window.clearTimeout(t);
  }, [celebrating]);

  const complete = () => {
    if (!day.isCompleted) setCelebrating(true);
    onToggleComplete(day.day);
  };

  if (!day.isUnlocked) {
    return (
      <>
        <div className="dayScrim" onClick={onClose} aria-hidden />
        <div className="dayModal">
          <div
            ref={ref}
            className="dayCard"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lockedTitle"
          >
            <div className="lockedCard">
              <div className="lockedCard__ring" aria-hidden>
                <LockIcon size={22} />
              </div>
              <h2 id="lockedTitle" className="dayCard__title serif">
                Day {day.day} opens on {day.dateLabel}
              </h2>
              <p className="dayCard__reflection">
                This moment in the piazza is still waiting. Come back on {day.dateLabel} — or use
                the demo preview in the menu to look ahead.
              </p>
              <button
                type="button"
                className="btn btn--gold"
                style={{ marginTop: 22 }}
                onClick={onClose}
                data-autofocus="true"
              >
                Return to the piazza
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="dayScrim" onClick={onClose} aria-hidden />
      <div className="dayModal">
        <div
          ref={ref}
          className="dayCard"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dayTitle"
          aria-describedby="dayReflection"
        >
          <div className="dayCard__scroll" ref={scrollRef}>
            <div className="dayCard__stage">
              {/* Production asset slot: insert supplied day-specific video,
                  animation or illustration for this day here. */}
              {Vignette && <Vignette onInteract={() => setInteracted(true)} />}

              <div className="dayCard__stageTop">
                <div className="dayCard__stamp">
                  <span className="dayCard__stampNum serif">{day.day}</span>
                  <span className="dayCard__stampMeta">
                    <span className="dayCard__stampDate">{day.dateLabel}</span>
                    <span className="dayCard__stampTheme">{day.theme}</span>
                  </span>
                </div>
                <button type="button" className="iconBtn dayCard__close" onClick={onClose}>
                  <span className="srOnly">Close and return to the piazza</span>
                  <CloseIcon />
                </button>
              </div>

              {vignette?.hint && (
                <div className="dayCard__hint" data-done={interacted}>
                  {vignette.hint}
                </div>
              )}

              {celebrating && <Celebration />}
            </div>

            <div className="dayCard__body">
              <h2 id="dayTitle" className="dayCard__title serif">
                {day.title}
              </h2>

              <blockquote className="scriptureBlock">
                <p className="scriptureBlock__line">{day.scripture.line}</p>
                <cite className="scriptureBlock__ref">{day.scripture.reference}</cite>
              </blockquote>

              <p id="dayReflection" className="dayCard__reflection">
                {day.reflection}
              </p>

              <div className="activityCard">
                <span className="activityCard__icon" aria-hidden>
                  <LeafIcon />
                </span>
                <div>
                  <div className="activityCard__label">Try this today</div>
                  <p className="activityCard__text">{day.activity}</p>
                </div>
              </div>

              <button type="button" className="deepLink" onClick={() => onDeepLink(day)}>
                <DayIcon motion={day.motionType} size={15} />
                {day.goDeeperLabel}
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="dayCard__foot">
            <button
              type="button"
              className="btn btn--gold completeBtn"
              data-done={day.isCompleted}
              onClick={complete}
              data-autofocus="true"
            >
              {day.isCompleted ? (
                <>
                  <CheckIcon size={13} /> Reflected on
                </>
              ) : (
                'Mark as reflected on'
              )}
            </button>

            <div className="dayCard__nav">
              <button
                type="button"
                className="navBtn"
                disabled={prevDay === null}
                onClick={() => prevDay && onNavigate(prevDay)}
              >
                <ArrowLeft size={14} />
                {prevDay ? `Day ${prevDay}` : 'Day 1'}
              </button>
              <button type="button" className="navBtn" onClick={onClose}>
                Return to the piazza
              </button>
              <button
                type="button"
                className="navBtn"
                disabled={nextDay === null}
                onClick={() => nextDay && onNavigate(nextDay)}
              >
                {nextDay ? `Day ${nextDay}` : 'Day 24'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
