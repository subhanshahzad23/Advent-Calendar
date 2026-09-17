'use client';

import type { ProgressState } from '@/types/advent';

/**
 * The only demo affordance on the scene itself: a small, low-contrast marker of
 * which date mode is running. The controls themselves live in the journey menu
 * so they never compete with the illustration.
 */
export function DemoChip({
  progress,
  unlockedCount,
  onOpenControls,
}: {
  progress: ProgressState;
  unlockedCount: number;
  onOpenControls: () => void;
}) {
  const label =
    progress.demoMode === 'preview'
      ? 'All days open'
      : progress.demoMode === 'simulated'
        ? `${progress.simulatedDay} December`
        : unlockedCount > 0
          ? `Day ${unlockedCount}`
          : 'Before Advent';

  return (
    <button
      type="button"
      className="demoChip"
      onClick={onOpenControls}
      aria-label={`Demo preview: ${label}. Open the preview controls.`}
    >
      <span className="demoChip__dot" aria-hidden />
      <span className="demoChip__mode">Preview</span>
      <span className="demoChip__sep" aria-hidden />
      <span className="demoChip__value">{label}</span>
    </button>
  );
}
