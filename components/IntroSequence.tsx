'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from './Icons';

/**
 * A short cinematic opening: star, bell tower, title, then the piazza.
 * Roughly 1.8s when motion is allowed, immediate for reduced-motion visitors.
 */
export function IntroSequence({
  onEnter,
  reduced,
}: {
  onEnter: () => void;
  reduced: boolean;
}) {
  const [leaving, setLeaving] = useState(false);
  const enterRef = useRef<HTMLButtonElement>(null);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onEnter, reduced ? 60 : 800);
  };

  // The sequence plays itself out, but a click or a key enters straight away.
  useEffect(() => {
    const t = window.setTimeout(finish, reduced ? 700 : 4200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => enterRef.current?.focus(), reduced ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <div className="intro" data-leaving={leaving} role="dialog" aria-label="The Light of the Piazza — welcome">
      <div className="intro__inner">
        {/* Production asset slot: replace with the supplied title-card artwork. */}
        <svg className="intro__art" viewBox="0 0 320 180" aria-hidden focusable="false">
          <g className="introBeam">
            <path d="M160 34L214 180H106z" fill="#f2b84b" opacity="0.13" />
          </g>
          <g className="introStar" style={{ transformOrigin: '160px 30px' }}>
            <circle cx="160" cy="30" r="30" fill="#f2b84b" opacity="0.18" />
            <circle cx="160" cy="30" r="15" fill="#f2b84b" opacity="0.26" />
            <path d="M160 12l6 14 14 5-14 5-6 14-6-14-14-5 14-5z" fill="#ffd98a" />
          </g>
          <g fill="#0a1830" opacity="0.96">
            <path d="M126 180V96h68v84z" />
            <path d="M160 58l40 38h-80z" />
            <path d="M0 180v-34h48l18-16v50zM320 180v-44l-46-16-34 18v42z" />
            <path d="M212 180v-52l30-22 30 22v52z" />
            <path d="M48 180v-46l28-20 28 20v46z" />
          </g>
          <g fill="#f2b84b">
            <rect
              x="150"
              y="118"
              width="20"
              height="26"
              rx="3"
              className="flicker"
              style={{ '--fdur': '5s' } as CSSProperties}
            />
            <rect x="58" y="146" width="12" height="16" rx="2" opacity="0.7" className="flicker" />
            <rect x="228" y="140" width="12" height="16" rx="2" opacity="0.6" className="flicker" style={{ '--fdur': '6.4s' } as CSSProperties} />
          </g>
          <path d="M0 180h320" stroke="#afc6d9" strokeWidth="1" opacity="0.2" />
        </svg>

        <h1 className="intro__title fadeUp" style={{ animationDelay: '0.25s' }}>
          The Light of the Piazza
        </h1>
        <p className="intro__sub fadeUp" style={{ animationDelay: '0.5s' }}>
          An Advent Journey
        </p>
        <p className="intro__line fadeUp" style={{ animationDelay: '0.75s' }}>
          A new moment of hope awaits each day.
        </p>

        <div className="intro__rule fadeUp" style={{ animationDelay: '0.95s' }} aria-hidden />

        <button
          ref={enterRef}
          type="button"
          className="intro__enter fadeUp"
          style={{ animationDelay: '1.05s' }}
          onClick={finish}
        >
          Enter the Piazza
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
