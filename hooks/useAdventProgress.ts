'use client';

import { useCallback, useMemo } from 'react';
import { TOTAL_DAYS } from '@/data/adventDays';
import {
  defaultProgress,
  realUnlockedCount,
  resolveDays,
  sceneStageFor,
  unlockedCountFor,
} from '@/lib/progress';
import type { DemoMode, LanguageCode, ProgressState } from '@/types/advent';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'piazza.advent.v1';

/**
 * Single source of truth for the journey: persisted progress, the demo-mode
 * overrides, and everything derived from them (unlocked days, scene stage).
 */
export function useAdventProgress() {
  const { value: progress, setValue, reset, ready } = useLocalStorage<ProgressState>(
    STORAGE_KEY,
    defaultProgress,
  );

  const patch = useCallback(
    (next: Partial<ProgressState>) => setValue((prev) => ({ ...prev, ...next })),
    [setValue],
  );

  const unlockedCount = useMemo(
    () => (ready ? unlockedCountFor(progress.demoMode, progress.simulatedDay) : 0),
    [progress.demoMode, progress.simulatedDay, ready],
  );

  const days = useMemo(
    () => resolveDays(progress, unlockedCount),
    [progress, unlockedCount],
  );

  const sceneStage = useMemo(
    () => sceneStageFor(unlockedCount, progress.opened),
    [unlockedCount, progress.opened],
  );

  const openDay = useCallback(
    (day: number) =>
      setValue((prev) =>
        prev.opened.includes(day)
          ? { ...prev, lastOpened: day }
          : { ...prev, opened: [...prev.opened, day].sort((a, b) => a - b), lastOpened: day },
      ),
    [setValue],
  );

  const toggleComplete = useCallback(
    (day: number) =>
      setValue((prev) => ({
        ...prev,
        completed: prev.completed.includes(day)
          ? prev.completed.filter((d) => d !== day)
          : [...prev.completed, day].sort((a, b) => a - b),
      })),
    [setValue],
  );

  const setDemoMode = useCallback(
    (mode: DemoMode) => patch({ demoMode: mode }),
    [patch],
  );

  const setSimulatedDay = useCallback(
    (day: number) =>
      patch({
        demoMode: 'simulated',
        simulatedDay: Math.min(Math.max(day, 1), TOTAL_DAYS),
      }),
    [patch],
  );

  const setLanguage = useCallback(
    (language: LanguageCode) => patch({ language }),
    [patch],
  );

  return {
    ready,
    progress,
    days,
    unlockedCount,
    sceneStage,
    realUnlocked: realUnlockedCount(),
    completedCount: progress.completed.length,
    openedCount: progress.opened.length,
    patch,
    openDay,
    toggleComplete,
    setDemoMode,
    setSimulatedDay,
    setLanguage,
    reset,
  } as const;
}

export type AdventProgress = ReturnType<typeof useAdventProgress>;
