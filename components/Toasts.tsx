'use client';

import { useDialog } from '@/hooks/useDialog';
import { InfoIcon, SparkIcon } from './Icons';

export interface ToastItem {
  id: number;
  text: string;
}

export function Toasts({ items }: { items: ToastItem[] }) {
  return (
    <div className="toastWrap" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="toast">
          <SparkIcon size={14} />
          {t.text}
        </div>
      ))}
    </div>
  );
}

/**
 * Stand-in for the church's existing content pages. In production these links
 * would leave the calendar; in the prototype they open this panel instead.
 */
export function ResourcePanel({
  label,
  url,
  onClose,
}: {
  label: string;
  url: string;
  onClose: () => void;
}) {
  const ref = useDialog<HTMLDivElement>({ open: true, onClose });

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden />
      <div className="resourcePanel">
        <div ref={ref} className="resourcePanel__card" role="dialog" aria-modal="true" aria-label={label}>
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <InfoIcon size={13} /> Placeholder link
          </div>
          <h3 className="serif" style={{ fontSize: 23, margin: '10px 0 8px', color: 'var(--cream)' }}>
            {label}
          </h3>
          <p className="prose">
            In the live calendar this opens the church&apos;s existing content at:
          </p>
          <span className="resourcePanel__url">{url}</span>
          <p className="prose" style={{ marginTop: 14 }}>
            Deep links are data, not code — every day points at whatever URL the content team
            supplies, and can open in place or in a new tab.
          </p>
          <button
            type="button"
            className="btn btn--gold btn--block"
            style={{ marginTop: 18 }}
            onClick={onClose}
            data-autofocus="true"
          >
            Back to the day
          </button>
        </div>
      </div>
    </>
  );
}
