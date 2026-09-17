/**
 * Core domain types for "The Light of the Piazza".
 *
 * Everything the experience renders — markers, overlays, scene evolution — is
 * derived from these records, so swapping in the church's real Advent content
 * later means editing `data/adventDays.ts` only.
 */

/** Which of the four progressive scene states a day belongs to. */
export type ProgressStage = 1 | 2 | 3 | 4;

/** Drives which illustrated vignette + animation is rendered inside the overlay. */
export type MotionType =
  | 'star-rise'
  | 'candle-light'
  | 'letter-unfold'
  | 'snow-cafe'
  | 'bakery-steam'
  | 'book-open'
  | 'fountain-shimmer'
  | 'music-drift'
  | 'lantern-path'
  | 'garland-hang'
  | 'lantern-press'
  | 'branch-sway'
  | 'glass-warm'
  | 'bridge-reflection'
  | 'choir-breath'
  | 'stable-doors'
  | 'cat-blink'
  | 'winter-blooms'
  | 'roof-star-trail'
  | 'gift-slide'
  | 'clock-hands'
  | 'nativity-reveal'
  | 'tree-lights'
  | 'christmas-radiance';

/** The illustrated object a day's activation zone is disguised as. */
export type MarkerStyle =
  | 'medallion'
  | 'window-light'
  | 'lantern'
  | 'ornament'
  | 'ribbon'
  | 'star';

export type IconName = MotionType;

/** A day's anchor point inside the piazza illustration (scene coordinates). */
export interface SceneZone {
  /** Stable id, also used as the SVG hook for the matching illustrated object. */
  id: string;
  /** Human readable location, surfaced in the day list and aria labels. */
  label: string;
  /** X in scene units (see SCENE.viewBox in data/sceneConfig.ts). */
  x: number;
  /** Y in scene units. */
  y: number;
  /** Where the marker's label tooltip should open, to avoid the scene edges. */
  tip: 'top' | 'bottom' | 'left' | 'right';
}

export interface Scripture {
  reference: string;
  /** A short, original one-line gloss — never a long passage. */
  line: string;
}

export interface AdventDay {
  day: number;
  /** ISO date. Advent 2026 runs 1–24 December. */
  date: string;
  dateLabel: string;
  title: string;
  shortTitle: string;
  scripture: Scripture;
  reflection: string;
  activity: string;
  goDeeperLabel: string;
  goDeeperUrl: string;
  sceneZone: SceneZone;
  theme: string;
  progressStage: ProgressStage;
  /** Plain-language note describing what this day adds to the piazza. */
  visualEffect: string;
  motionType: MotionType;
  markerStyle: MarkerStyle;
  icon: IconName;
  /**
   * Seed value only. The live unlock state is recomputed on the client by
   * `resolveDays()` from the calendar date or the active demo mode, so the
   * data file stays a pure content source.
   */
  isUnlocked: boolean;
}

export type DayStatus = 'locked' | 'available' | 'opened' | 'completed';

/** An AdventDay with the runtime progress state folded in. */
export interface ResolvedDay extends AdventDay {
  isUnlocked: boolean;
  isOpened: boolean;
  isCompleted: boolean;
  isToday: boolean;
  status: DayStatus;
}

export type DemoMode = 'today' | 'preview' | 'simulated';

export type LanguageCode = 'en' | 'de' | 'fr' | 'it';

export interface ProgressState {
  opened: number[];
  completed: number[];
  /** Last day the visitor opened — used to restore the overlay context. */
  lastOpened: number | null;
  hasEntered: boolean;
  hasSeenExploreHint: boolean;
  demoMode: DemoMode;
  simulatedDay: number;
  soundOn: boolean;
  language: LanguageCode;
  calmMotion: boolean;
  highContrast: boolean;
}
