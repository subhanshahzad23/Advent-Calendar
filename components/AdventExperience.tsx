'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TOTAL_DAYS } from '@/data/adventDays';
import { useAdventProgress } from '@/hooks/useAdventProgress';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';
import { useIsCompact, useReducedMotion } from '@/hooks/useMediaQuery';
import { nextUnlockedDay, prevUnlockedDay } from '@/lib/progress';
import type { LanguageCode, ResolvedDay } from '@/types/advent';
import { DayOverlay } from './DayOverlay';
import { DemoChip } from './DemoChip';
import { IntroSequence } from './IntroSequence';
import { MenuSheet } from './MenuSheet';
import { PiazzaScene } from './piazza/PiazzaScene';
import { TopBar } from './TopBar';
import { SvgDefs } from './SvgDefs';
import { ResourcePanel, Toasts, type ToastItem } from './Toasts';

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  de: 'German',
  fr: 'French',
  it: 'Italian',
};

export function AdventExperience() {
  const advent = useAdventProgress();
  const { days, progress, ready } = advent;

  const systemReduced = useReducedMotion();
  const compact = useIsCompact();
  const calm = progress.calmMotion || systemReduced;

  const [entered, setEntered] = useState(false);
  const [introResolved, setIntroResolved] = useState(false);
  const [menuOpen, setMenuOpen] = useState<false | 'top' | 'demo'>(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [justOpened, setJustOpened] = useState<number | null>(null);
  const [focusDay, setFocusDay] = useState<number | null>(null);
  const [resource, setResource] = useState<ResolvedDay | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const audio = useAmbientAudio({
    enabled: ready && progress.soundOn,
    onEnabledChange: (next) => advent.patch({ soundOn: next }),
  });

  const markerRefs = useRef(new Map<number, HTMLButtonElement | null>());

  const registerMarker = useCallback((day: number, node: HTMLButtonElement | null) => {
    markerRefs.current.set(day, node);
  }, []);

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, text }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  /* --- opening a day ------------------------------------------------------ */
  const openDay = useCallback(
    (dayNumber: number) => {
      const day = days.find((d) => d.day === dayNumber);
      if (!day) return;
      setActiveDay(dayNumber);
      setFocusDay(dayNumber);
      if (day.isUnlocked) {
        advent.openDay(dayNumber);
        setJustOpened(dayNumber);
        window.setTimeout(() => setJustOpened(null), 1000);
      }
    },
    [advent, days],
  );

  const closeDay = useCallback(() => setActiveDay(null), []);

  const active = activeDay != null ? days.find((d) => d.day === activeDay) ?? null : null;

  const restoreMarkerFocus = useCallback(
    () => (activeDay != null ? markerRefs.current.get(activeDay) ?? null : null),
    [activeDay],
  );

  /* --- intro: a fresh-visit moment only ---------------------------------- */
  useEffect(() => {
    if (!ready) return;
    // Both updates land in one commit, so a returning visitor never sees the
    // intro flash before it is dismissed.
    if (progress.hasEntered) setEntered(true);
    setIntroResolved(true);
  }, [ready, progress.hasEntered]);


  const handleEnter = useCallback(() => {
    setEntered(true);
    advent.patch({ hasEntered: true });
  }, [advent]);

  /* --- reset -------------------------------------------------------------- */
  const handleReset = useCallback(() => {
    advent.reset();
    setActiveDay(null);
    setMenuOpen(false);
    toast('Demo reset. Progress cleared from this device.');
  }, [advent, toast]);

  /* Keeps the document in step with the accessibility preferences. */
  useEffect(() => {
    document.documentElement.dataset.calm = String(calm);
    document.documentElement.dataset.contrast = progress.highContrast ? 'high' : 'normal';
  }, [calm, progress.highContrast]);

  const showHint = entered && ready && !progress.hasSeenExploreHint && activeDay === null;

  return (
    <div className="app">
      <SvgDefs />

      <PiazzaScene
        days={days}
        stage={advent.sceneStage}
        compact={compact}
        calm={calm}
        entered={entered}
        justOpened={justOpened}
        showHint={showHint}
        onDismissHint={() => advent.patch({ hasSeenExploreHint: true })}
        onActivate={openDay}
        registerMarker={registerMarker}
        focusDay={focusDay}
      />

      {entered && (
        <>
          <TopBar
            unlockedCount={advent.unlockedCount}
            completedCount={advent.completedCount}
            total={TOTAL_DAYS}
            soundOn={audio.playing}
            soundBlocked={audio.blocked}
            menuButtonRef={menuButtonRef}
            onOpenMenu={() => setMenuOpen('top')}
            onToggleSound={async () => {
              const wasPlaying = audio.playing;
              await audio.toggle();
              if (wasPlaying) return;
              toast(
                audio.blocked
                  ? 'Ambient sound could not start — check the browser\u2019s sound settings.'
                  : 'Ambient sound on — “Snowfall” by Scott Buckley (CC BY 4.0).',
              );
            }}
          />

          <DemoChip
            progress={progress}
            unlockedCount={advent.unlockedCount}
            onOpenControls={() => setMenuOpen('demo')}
          />
        </>
      )}

      {introResolved && !entered && <IntroSequence onEnter={handleEnter} reduced={calm} />}

      {menuOpen && (
        <MenuSheet
          jumpTo={menuOpen === 'demo' ? 'demo' : undefined}
          days={days}
          progress={progress}
          sceneStage={advent.sceneStage}
          unlockedCount={advent.unlockedCount}
          realUnlocked={advent.realUnlocked}
          completedCount={advent.completedCount}
          onClose={() => setMenuOpen(false)}
          onSelectDay={(d) => {
            setMenuOpen(false);
            window.setTimeout(() => openDay(d), 60);
          }}
          onSetMode={(mode) => {
            advent.setDemoMode(mode);
            if (mode === 'today' && advent.realUnlocked === 0) {
              toast('Today mode: outside December, so no days are unlocked yet.');
            }
          }}
          onSetSimulatedDay={advent.setSimulatedDay}
          onSetLanguage={(code) => {
            advent.setLanguage(code);
            toast(`Day content would be served in ${LANGUAGE_NAMES[code]} for this visitor.`);
          }}
          onPatch={advent.patch}
          onReset={handleReset}
          fallbackFocus={() => menuButtonRef.current}
        />
      )}

      {active && (
        <DayOverlay
          day={active}
          prevDay={prevUnlockedDay(days, active.day)}
          nextDay={nextUnlockedDay(days, active.day)}
          onClose={closeDay}
          onNavigate={openDay}
          onToggleComplete={(d) => {
            advent.toggleComplete(d);
            const wasCompleted = days.find((x) => x.day === d)?.isCompleted;
            if (!wasCompleted && advent.completedCount + 1 === TOTAL_DAYS) {
              toast('All twenty-four days kept. The piazza is fully alight.');
            }
          }}
          onDeepLink={setResource}
          fallbackFocus={restoreMarkerFocus}
        />
      )}

      {resource && (
        <ResourcePanel
          label={resource.goDeeperLabel}
          url={resource.goDeeperUrl}
          onClose={() => setResource(null)}
        />
      )}

      <Toasts items={toasts} />

      {/*
        Ambient bed. `preload="none"` means the file costs nothing until the
        visitor asks for sound, and there is no autoplay attribute anywhere.
        Credit: “Snowfall” by Scott Buckley, CC BY 4.0 — see CREDITS.md.
      */}
      <audio
        ref={audio.audioRef}
        src="/audio/snowfall-scott-buckley.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />
    </div>
  );
}
