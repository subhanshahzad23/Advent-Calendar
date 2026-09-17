'use client';

import { useEffect, useState } from 'react';

/** SSR-safe media query subscription. Always false until mounted. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

export const useIsCompact = () => useMediaQuery('(max-width: 859px)');
