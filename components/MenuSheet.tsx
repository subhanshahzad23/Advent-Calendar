'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import { SCENE_STAGES } from '@/data/sceneConfig';
import { useDialog } from '@/hooks/useDialog';
import type {
  DemoMode,
  LanguageCode,
  ProgressStage,
  ProgressState,
  ResolvedDay,
} from '@/types/advent';
import { CheckIcon, CloseIcon, InfoIcon, LockIcon, ResetIcon, SparkIcon } from './Icons';

const LANGUAGES: { code: LanguageCode; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'it', label: 'IT', name: 'Italiano' },
];

const MODES: { id: DemoMode; label: string; hint: string }[] = [
  { id: 'today', label: 'Today', hint: 'True date-gated behaviour' },
  { id: 'preview', label: 'Preview all', hint: 'All 24 days unlocked' },
  { id: 'simulated', label: 'Simulated date', hint: 'Pick any day in December' },
];

interface MenuSheetProps {
  /** Opens the sheet scrolled to a particular section. */
  jumpTo?: 'demo';
  days: ResolvedDay[];
  progress: ProgressState;
  sceneStage: ProgressStage;
  unlockedCount: number;
  realUnlocked: number;
  completedCount: number;
  onClose: () => void;
  onSelectDay: (day: number) => void;
  onSetMode: (mode: DemoMode) => void;
  onSetSimulatedDay: (day: number) => void;
  onSetLanguage: (code: LanguageCode) => void;
  onPatch: (patch: Partial<ProgressState>) => void;
  onReset: () => void;
  fallbackFocus: () => HTMLElement | null;
}

export function MenuSheet({
  jumpTo,
  days,
  progress,
  sceneStage,
  unlockedCount,
  realUnlocked,
  completedCount,
  onClose,
  onSelectDay,
  onSetMode,
  onSetSimulatedDay,
  onSetLanguage,
  onPatch,
  onReset,
  fallbackFocus,
}: MenuSheetProps) {
  const ref = useDialog<HTMLDivElement>({ open: true, onClose, fallbackFocus });
  const demoRef = useRef<HTMLElement>(null);
  const stageInfo = SCENE_STAGES[sceneStage - 1];
  const total = days.length;

  // Opened from the scene's preview chip: land on the controls, not the top.
  useEffect(() => {
    if (jumpTo !== 'demo') return;
    const t = window.setTimeout(
      () => demoRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }),
      120,
    );
    return () => window.clearTimeout(t);
  }, [jumpTo]);

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Journey menu"
      >
        <div className="sheet__head">
          <div>
            <div className="eyebrow">An Advent Journey</div>
            <div className="sheet__headTitle serif">The Light of the Piazza</div>
          </div>
          <button type="button" className="iconBtn" onClick={onClose} data-autofocus="true">
            <span className="srOnly">Close the menu</span>
            <CloseIcon />
          </button>
        </div>

        <div className="sheet__body">
          {/* --- Journey overview ---------------------------------------- */}
          <section className="sheet__section">
            <div className="sheet__label">Journey overview</div>
            <div className="journeyCard">
              <div className="eyebrow">{stageInfo.range} · Stage {sceneStage} of 4</div>
              <div className="journeyCard__stage">{stageInfo.name}</div>
              <p className="journeyCard__text">{stageInfo.description}</p>
              <div className="meter" aria-hidden>
                <div className="meter__fill" style={{ width: `${(completedCount / total) * 100}%` }} />
              </div>
              <p className="journeyCard__text" style={{ marginTop: 9, fontSize: 11.5 }}>
                {completedCount} of {total} days marked as reflected on · {unlockedCount} unlocked
              </p>
            </div>
            <div className="stageTrack">
              {SCENE_STAGES.map((s) => (
                <div key={s.stage} className="stageTrack__item" data-active={s.stage <= sceneStage}>
                  <span className="stageTrack__n serif">{s.stage}</span>
                  {s.range.replace('Days ', '')}
                </div>
              ))}
            </div>
          </section>

          {/* --- The 24 days ---------------------------------------------- */}
          <section className="sheet__section">
            <div className="sheet__label">The twenty-four days</div>
            <div className="dayList">
              {days.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  className="dayRow"
                  data-status={d.status}
                  disabled={!d.isUnlocked}
                  onClick={() => onSelectDay(d.day)}
                >
                  <span className="dayRow__n serif">{d.day}</span>
                  <span>
                    <span className="dayRow__title">
                      {d.isUnlocked ? d.shortTitle : 'Opens on ' + d.dateLabel}
                    </span>
                    <span className="dayRow__zone">{d.sceneZone.label}</span>
                  </span>
                  <span className="dayRow__status">
                    {d.status === 'completed' && (
                      <>
                        <CheckIcon size={11} /> Done
                      </>
                    )}
                    {d.status === 'opened' && 'Opened'}
                    {d.status === 'available' && (
                      <>
                        <SparkIcon size={11} /> New
                      </>
                    )}
                    {d.status === 'locked' && <LockIcon size={11} />}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* --- About Advent --------------------------------------------- */}
          <section className="sheet__section">
            <div className="sheet__label">About Advent</div>
            <div className="prose">
              <p>
                Advent is the four weeks before Christmas — a season of waiting kept by churches
                across Europe since the earliest centuries. Each day adds a little more light.
              </p>
              <p>
                This calendar offers one short reflection and one small practice a day, from
                1 to 24 December. There is no right pace. Days you miss stay open behind you.
              </p>
            </div>
          </section>

          {/* --- Language -------------------------------------------------- */}
          <section className="sheet__section">
            <div className="sheet__label">Language</div>
            <div className="segmented" role="group" aria-label="Interface language">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  aria-pressed={progress.language === l.code}
                  onClick={() => onSetLanguage(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="note">
              <InfoIcon size={12} /> Interface shown in English for this prototype. Day content
              would be supplied per language and served from the same data file.
            </div>
          </section>

          {/* --- Accessibility --------------------------------------------- */}
          <section className="sheet__section">
            <div className="sheet__label">Accessibility</div>
            <button
              type="button"
              className="toggleRow"
              aria-pressed={progress.calmMotion}
              onClick={() => onPatch({ calmMotion: !progress.calmMotion })}
            >
              <span>
                <span className="toggleRow__label">Calm motion</span>
                <span className="toggleRow__hint">
                  Stops snow, flicker and drifting particles. Your system setting is respected
                  automatically.
                </span>
              </span>
              <span className="switch" data-on={progress.calmMotion} aria-hidden />
            </button>
            <button
              type="button"
              className="toggleRow"
              aria-pressed={progress.highContrast}
              onClick={() => onPatch({ highContrast: !progress.highContrast })}
            >
              <span>
                <span className="toggleRow__label">Higher contrast</span>
                <span className="toggleRow__hint">
                  Brightens body text and outlines each day marker.
                </span>
              </span>
              <span className="switch" data-on={progress.highContrast} aria-hidden />
            </button>
          </section>

          {/* --- Demo controls --------------------------------------------- */}
          <section className="sheet__section" ref={demoRef}>
            <div className="sheet__label" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              Demo preview <span className="protoTag">Prototype only</span>
            </div>
            <div className="segmented" role="group" aria-label="Demo preview mode">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={progress.demoMode === m.id}
                  onClick={() => onSetMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="toggleRow__hint" style={{ marginTop: 10 }}>
              {MODES.find((m) => m.id === progress.demoMode)?.hint}
              {progress.demoMode === 'today' && realUnlocked === 0 && (
                <> — outside December, so nothing is unlocked yet. The journey opens on 1 December.</>
              )}
            </p>

            <div style={{ marginTop: 14 }}>
              <label className="toggleRow__label" htmlFor="simDay">
                Simulated date: {progress.simulatedDay} December
              </label>
              <input
                id="simDay"
                className="slider"
                type="range"
                min={1}
                max={24}
                value={progress.simulatedDay}
                style={{ '--fill': `${((progress.simulatedDay - 1) / 23) * 100}%` } as CSSProperties}
                onChange={(e) => onSetSimulatedDay(Number(e.target.value))}
              />
              <p className="toggleRow__hint">
                Moves the whole piazza to the state it would be in on that date.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 9, marginTop: 16 }}>
              <button type="button" className="btn btn--quiet btn--block" onClick={onReset}>
                <ResetIcon /> Reset this demo
              </button>
            </div>

            <div className="note">
              <InfoIcon size={12} /> Your progress is saved on this device. These preview controls
              would not appear in the church-facing release.
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
