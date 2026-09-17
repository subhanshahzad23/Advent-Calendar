import { adventDays, TOTAL_DAYS } from '@/data/adventDays';
import { stageForDay } from '@/data/sceneConfig';
import type {
  AdventDay,
  DayStatus,
  DemoMode,
  ProgressStage,
  ProgressState,
  ResolvedDay,
} from '@/types/advent';

export const ADVENT_MONTH = 11; // December (0-indexed)

export const defaultProgress: ProgressState = {
  opened: [],
  completed: [],
  lastOpened: null,
  hasEntered: false,
  hasSeenExploreHint: false,
  // The prototype opens in "Preview all days" so a reviewer can explore every
  // interaction immediately. The church-facing build ships with 'today'.
  demoMode: 'preview',
  simulatedDay: 12,
  soundOn: false,
  language: 'en',
  calmMotion: false,
  highContrast: false,
};

/**
 * How many days the real calendar would have unlocked today.
 * Outside December this is 0 — the journey has not started yet.
 */
export function realUnlockedCount(now: Date = new Date()): number {
  if (now.getMonth() !== ADVENT_MONTH) return 0;
  return Math.min(now.getDate(), TOTAL_DAYS);
}

export function unlockedCountFor(
  mode: DemoMode,
  simulatedDay: number,
  now: Date = new Date(),
): number {
  if (mode === 'preview') return TOTAL_DAYS;
  if (mode === 'simulated') return Math.min(Math.max(simulatedDay, 0), TOTAL_DAYS);
  return realUnlockedCount(now);
}

function statusFor(
  day: AdventDay,
  unlockedCount: number,
  opened: Set<number>,
  completed: Set<number>,
): DayStatus {
  if (day.day > unlockedCount) return 'locked';
  if (completed.has(day.day)) return 'completed';
  if (opened.has(day.day)) return 'opened';
  return 'available';
}

/** Folds live progress into the content records. */
export function resolveDays(
  progress: ProgressState,
  unlockedCount: number,
): ResolvedDay[] {
  const opened = new Set(progress.opened);
  const completed = new Set(progress.completed);

  return adventDays.map((day) => {
    const status = statusFor(day, unlockedCount, opened, completed);
    return {
      ...day,
      isUnlocked: status !== 'locked',
      isOpened: opened.has(day.day),
      isCompleted: completed.has(day.day),
      isToday: day.day === unlockedCount && unlockedCount > 0,
      status,
    };
  });
}

/**
 * The scene stage is driven by how far the journey has actually travelled —
 * the furthest unlocked day, nudged forward by days the visitor has opened.
 */
export function sceneStageFor(unlockedCount: number, opened: number[]): ProgressStage {
  const furthestOpened = opened.length ? Math.max(...opened) : 0;
  const reached = Math.max(unlockedCount, furthestOpened);
  if (reached <= 0) return 1;
  return stageForDay(reached);
}

export const nextUnlockedDay = (days: ResolvedDay[], from: number): number | null => {
  const next = days.find((d) => d.day > from && d.isUnlocked);
  return next ? next.day : null;
};

export const prevUnlockedDay = (days: ResolvedDay[], from: number): number | null => {
  const prev = [...days].reverse().find((d) => d.day < from && d.isUnlocked);
  return prev ? prev.day : null;
};
