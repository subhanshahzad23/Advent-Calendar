'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal plumbing shared by the menu and the daily overlay: Escape to close,
 * focus moved into the dialog, focus trapped inside it, and focus returned to
 * whatever opened it.
 */
export function useDialog<T extends HTMLElement>({
  open,
  onClose,
  fallbackFocus,
}: {
  open: boolean;
  onClose: () => void;
  fallbackFocus?: () => HTMLElement | null;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;

    const list = () =>
      ref.current ? Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    const focusTimer = window.setTimeout(() => {
      const items = list();
      (items.find((el) => el.dataset.autofocus === 'true') ?? items[0])?.focus();
    }, 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = list();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !ref.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey, true);
      const back =
        opener && document.contains(opener) && opener !== document.body
          ? opener
          : fallbackFocus?.() ?? null;
      back?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return ref;
}
