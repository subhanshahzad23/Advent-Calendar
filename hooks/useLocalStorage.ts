'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * localStorage-backed state that never causes a hydration mismatch: the first
 * client render uses `initial`, the stored value is adopted in an effect.
 * `ready` tells callers when the persisted value has been read.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const initialRef = useRef(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<T>;
        // Merge so new fields added in later releases keep their defaults.
        setValue(
          typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
            ? { ...(initialRef.current as object), ...(parsed as object) } as T
            : (parsed as T),
        );
      }
    } catch {
      // Private browsing or corrupted payload: fall back to defaults silently.
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable — the demo still works for this session.
    }
  }, [key, value, ready]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* no-op */
    }
    setValue(initialRef.current);
  }, [key]);

  return { value, setValue, reset, ready } as const;
}
