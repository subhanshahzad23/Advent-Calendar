'use client';

import type { CSSProperties } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, LockIcon } from './Icons';
import type { MarkerStyle, ResolvedDay } from '@/types/advent';

const STATUS_WORD: Record<ResolvedDay['status'], string> = {
  locked: 'Locked',
  available: 'Ready to open',
  opened: 'Opened',
  completed: 'Reflected on',
};

/** Each activation zone wears an illustrated shape, never a generic map pin. */
function MarkerShape({ style, locked }: { style: MarkerStyle; locked: boolean }) {
  const fill = locked ? 'url(#mkCold)' : 'url(#mkWarm)';
  const stroke = locked ? 'rgba(175,198,217,.55)' : 'rgba(255,247,231,.85)';
  switch (style) {
    case 'star':
      return (
        <svg className="marker__shape" viewBox="0 0 30 30" aria-hidden>
          <path
            d="M15 1l3 8.4 8.6 2.6-8.6 2.7L15 23l-3-8.3-8.6-2.7L12 9.4z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="12.2" r="7.2" fill={fill} stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case 'lantern':
      return (
        <svg className="marker__shape" viewBox="0 0 30 30" aria-hidden>
          <path d="M15 1.5v3" stroke={stroke} strokeWidth="1.3" />
          <path
            d="M9.5 6.5h11l1.4 15.5a1.6 1.6 0 01-1.6 1.8H9.7a1.6 1.6 0 01-1.6-1.8z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.1"
          />
          <path d="M8.6 26h12.8" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case 'ornament':
      return (
        <svg className="marker__shape" viewBox="0 0 30 30" aria-hidden>
          <path d="M15 1v3.6" stroke={stroke} strokeWidth="1.3" />
          <rect x="12.4" y="4.2" width="5.2" height="3.4" rx="1" fill={fill} stroke={stroke} strokeWidth="1" />
          <circle cx="15" cy="17" r="9.4" fill={fill} stroke={stroke} strokeWidth="1.1" />
        </svg>
      );
    case 'ribbon':
      return (
        <svg className="marker__shape" viewBox="0 0 30 30" aria-hidden>
          <path d="M15 0.8v4" stroke={stroke} strokeWidth="1.3" />
          <path
            d="M5.2 5h19.6v16.4L15 27.4 5.2 21.4z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'window-light':
      return (
        <svg className="marker__shape" viewBox="0 0 30 30" aria-hidden>
          <path
            d="M6 27V11a9 9 0 0118 0v16z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d="M15 5.5V27M6.4 16h17.2" stroke={stroke} strokeWidth="0.9" opacity="0.75" />
        </svg>
      );
    default:
      return (
        <svg className="marker__shape" viewBox="0 0 30 30" aria-hidden>
          <circle cx="15" cy="15" r="13.4" fill={fill} stroke={stroke} strokeWidth="1.1" />
          <circle cx="15" cy="15" r="10.4" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
        </svg>
      );
  }
}

interface DayMarkerProps {
  day: ResolvedDay;
  left: number;
  top: number;
  justOpened: boolean;
  onActivate: (day: number) => void;
  onFocusMarker: (day: number) => void;
}

export const DayMarker = forwardRef<HTMLButtonElement, DayMarkerProps>(function DayMarker(
  { day, left, top, justOpened, onActivate, onFocusMarker },
  ref,
) {
  const label = day.isUnlocked
    ? `Day ${day.day}, ${day.dateLabel}: ${day.title}. ${day.sceneZone.label}. ${STATUS_WORD[day.status]}.`
    : `Day ${day.day}, ${day.dateLabel}. Locked — opens on ${day.dateLabel}. ${day.sceneZone.label}.`;

  return (
    <button
      ref={ref}
      type="button"
      className="marker"
      data-status={day.status}
      data-just-opened={justOpened || undefined}
      data-day={day.day}
      style={
        {
          left: `${left}%`,
          top: `${top}%`,
          '--delay': `${(day.day % 6) * 0.45}s`,
          '--depth': 0.85,
        } as CSSProperties
      }
      aria-label={label}
      aria-disabled={!day.isUnlocked}
      onClick={() => onActivate(day.day)}
      onFocus={() => onFocusMarker(day.day)}
    >
      <span className="marker__halo" aria-hidden />
      <span className="marker__body">
        <MarkerShape style={day.markerStyle} locked={!day.isUnlocked} />
        <span className="marker__num">{day.day}</span>
        {day.isCompleted && (
          <span className="marker__tick" aria-hidden>
            <CheckIcon size={9} />
          </span>
        )}
        {!day.isUnlocked && (
          <span className="marker__lock" aria-hidden>
            <LockIcon size={9} />
          </span>
        )}
      </span>
      <span className={`marker__label marker__label--${day.sceneZone.tip}`} aria-hidden>
        <b>{day.day}</b>
        {day.isUnlocked ? day.shortTitle : 'Opens ' + day.dateLabel}
      </span>
    </button>
  );
});
