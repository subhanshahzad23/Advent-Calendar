'use client';

import { TOTAL_DAYS } from '@/data/adventDays';
import type { DemoMode, ProgressState } from '@/types/advent';
import { ArrowLeft, ArrowRight, ResetIcon } from './Icons';

interface DemoBarProps {
  progress: ProgressState;
  onSetMode: (mode: DemoMode) => void;
  onSetSimulatedDay: (day: number) => void;
  onReset: () => void;
}

/**
 * Discreet prototype utility. Deliberately tagged as a demo control so nobody
 * mistakes it for part of the church-facing experience.
 */
export function DemoBar({ progress, onSetMode, onSetSimulatedDay, onReset }: DemoBarProps) {
  const sim = progress.demoMode === 'simulated';

  return (
    <div className="utilBar" role="group" aria-label="Prototype demo controls">
      <span className="utilBar__tag">Demo preview</span>
      <span className="utilBar__sep" aria-hidden />

      <button
        type="button"
        className="chip"
        aria-pressed={progress.demoMode === 'today'}
        onClick={() => onSetMode('today')}
      >
        Today
      </button>
      <button
        type="button"
        className="chip"
        aria-pressed={progress.demoMode === 'preview'}
        onClick={() => onSetMode('preview')}
      >
        Preview all days
      </button>
      <button
        type="button"
        className="chip"
        aria-pressed={sim}
        onClick={() => onSetSimulatedDay(progress.simulatedDay)}
      >
        {sim ? `${progress.simulatedDay} December` : 'Simulated date'}
      </button>

      {sim && (
        <>
          <button
            type="button"
            className="iconBtn"
            style={{ width: 30, height: 30 }}
            disabled={progress.simulatedDay <= 1}
            onClick={() => onSetSimulatedDay(progress.simulatedDay - 1)}
          >
            <span className="srOnly">Simulate the previous day</span>
            <ArrowLeft size={13} />
          </button>
          <button
            type="button"
            className="iconBtn"
            style={{ width: 30, height: 30 }}
            disabled={progress.simulatedDay >= TOTAL_DAYS}
            onClick={() => onSetSimulatedDay(progress.simulatedDay + 1)}
          >
            <span className="srOnly">Simulate the next day</span>
            <ArrowRight size={13} />
          </button>
        </>
      )}

      <span className="utilBar__sep" aria-hidden />
      <button type="button" className="chip" onClick={onReset}>
        <ResetIcon size={12} /> Reset
      </button>
    </div>
  );
}
