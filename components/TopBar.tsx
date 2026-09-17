'use client';

import { CampaignMark, MenuIcon, SoundIcon } from './Icons';

interface TopBarProps {
  unlockedCount: number;
  completedCount: number;
  total: number;
  soundOn: boolean;
  onToggleSound: () => void;
  onOpenMenu: () => void;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const R = 13;
const C = 2 * Math.PI * R;

export function TopBar({
  unlockedCount,
  completedCount,
  total,
  soundOn,
  onToggleSound,
  onOpenMenu,
  menuButtonRef,
}: TopBarProps) {
  const progress = Math.min(completedCount / total, 1);

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__mark" aria-hidden>
          <CampaignMark size={19} />
        </span>
        <div className="topbar__titles">
          <div className="topbar__title serif">The Light of the Piazza</div>
          <div className="topbar__sub">Advent 2026</div>
        </div>
      </div>

      <div className="topbar__actions">
        <div className="progressPill">
          <svg className="ring" width="30" height="30" viewBox="0 0 30 30" aria-hidden>
            <circle className="ring__track" cx="15" cy="15" r={R} />
            <circle
              className="ring__value"
              cx="15"
              cy="15"
              r={R}
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <span className="progressPill__text">
            Day <b>{unlockedCount}</b> of {total}
          </span>
          <span className="srOnly">
            {completedCount} of {total} days marked as reflected on.
          </span>
        </div>

        <button
          type="button"
          className="iconBtn"
          aria-pressed={soundOn}
          onClick={onToggleSound}
          title="Ambient sound (simulated in this prototype)"
        >
          <span className="srOnly">
            {soundOn ? 'Turn ambient sound off' : 'Turn ambient sound on'} (simulated)
          </span>
          {soundOn ? (
            <span className="eq" aria-hidden>
              <i />
              <i />
              <i />
              <i />
            </span>
          ) : (
            <SoundIcon />
          )}
        </button>

        <button
          ref={menuButtonRef}
          type="button"
          className="iconBtn"
          onClick={onOpenMenu}
          aria-haspopup="dialog"
        >
          <span className="srOnly">Open the journey menu</span>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
