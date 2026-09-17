'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Ambient bed sits well under the interface — present, never foreground. */
const TARGET_VOLUME = 0.16;
const FADE_MS = 650;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Real ambient audio for the piazza.
 *
 * It never autoplays: playback only ever begins from a user gesture — the sound
 * button, or, for a returning visitor who already had sound on, their first
 * interaction with the page. Volume is faded rather than cut so turning it on
 * or off feels like part of the scene.
 */
export function useAmbientAudio({
  enabled,
  onEnabledChange,
}: {
  enabled: boolean;
  onEnabledChange: (next: boolean) => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const from = el.volume;
    const started = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - started) / FADE_MS);
      el.volume = Math.max(0, Math.min(1, from + (target - from) * easeInOut(t)));
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = null;
        onDone?.();
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;
    try {
      el.volume = 0;
      await el.play();
    } catch {
      // Autoplay policy, a missing file, or an unsupported codec.
      setBlocked(true);
      setPlaying(false);
      return false;
    }
    setBlocked(false);
    setPlaying(true);
    fadeTo(TARGET_VOLUME);
    return true;
  }, [fadeTo]);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setPlaying(false);
    fadeTo(0, () => {
      el.pause();
    });
  }, [fadeTo]);

  /** The sound button. This is the only control that changes the preference. */
  const toggle = useCallback(async () => {
    if (playing) {
      stop();
      onEnabledChange(false);
      return;
    }
    const ok = await start();
    onEnabledChange(ok);
  }, [playing, start, stop, onEnabledChange]);

  /**
   * A returning visitor who left sound on gets it back — but only once they
   * have actually interacted with the page, so nothing ever plays unprompted.
   */
  useEffect(() => {
    if (!enabled || playing) return;
    const resume = () => {
      void start();
    };
    window.addEventListener('pointerdown', resume, { once: true });
    window.addEventListener('keydown', resume, { once: true });
    return () => {
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
    };
  }, [enabled, playing, start]);

  useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  return { audioRef, playing, blocked, toggle } as const;
}
