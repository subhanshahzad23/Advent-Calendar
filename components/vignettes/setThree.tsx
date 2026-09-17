'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Frame, SkyBack, stagger, withDelay, type VignetteDef, type VignetteProps } from './Frame';

/* Days 17–24. Production asset slot: swap any scene for supplied artwork. */

/** 17 — A cat peers from a windowsill and blinks. */
function CatBlink() {
  return (
    <Frame>
      <SkyBack warm={0.3} />
      <path d="M0 308V40h600v268z" fill="#15294a" />
      <rect x="150" y="60" width="300" height="200" rx="8" fill="#0c1d38" />
      <rect x="162" y="72" width="276" height="176" rx="4" fill="#f2b84b" opacity="0.78" />
      <ellipse cx="300" cy="160" rx="250" ry="164" fill="url(#catGlow)" />
      <defs>
        <radialGradient id="catGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.42" />
          <stop offset="60%" stopColor="#e88735" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M300 72v176M162 160h276" stroke="#0c1d38" strokeWidth="7" />
      <rect x="138" y="248" width="324" height="16" rx="6" fill="#2f537e" />
      <g fill="#0b1b33">
        <path d="M252 248v-64q0-30 48-30t48 30v64z" />
        <path d="M262 160l-8-34 26 14zM338 160l8-34-26 14z" />
        <path d="M348 248c22-10 32-32 28-54l14 4c4 28-10 52-34 62z" />
        <path className="vTail" style={{ transformOrigin: '350px 240px' }} d="M348 246q34-6 40-38l12 6q-8 42-50 46z" />
      </g>
      <g fill="#f2b84b">
        <ellipse className="vEye" style={{ transformOrigin: '284px 190px', '--delay': '0s' } as CSSProperties} cx="284" cy="190" rx="7" ry="9" />
        <ellipse className="vEye" style={{ transformOrigin: '316px 190px', '--delay': '0.1s' } as CSSProperties} cx="316" cy="190" rx="7" ry="9" />
      </g>
      <path d="M296 206h8l-4 6z" fill="#d98d7c" />
      <g stroke="#0b1b33" strokeWidth="2" opacity="0.6">
        <path d="M282 212l-26 6M282 216l-24 12M318 212l26 6M318 216l24 12" />
      </g>
      <g fill="#f7f2e9" opacity="0.5">
        <circle cx="70" cy="70" r="3" className="twinkle" />
        <circle cx="540" cy="52" r="3.4" className="twinkle" style={{ '--delay': '1.7s' } as CSSProperties} />
      </g>
    </Frame>
  );
}

/** 18 — The flower stall gains winter greenery and red berries. */
function WinterBlooms() {
  const leaves = [...Array(11)].map((_, i) => ({
    x: 130 + i * 34,
    y: 176 - (i % 3) * 18,
    r: -30 + (i % 5) * 16,
  }));
  const berries = [...Array(12)].map((_, i) => ({
    x: 144 + i * 32,
    y: 190 - (i % 4) * 14,
  }));
  return (
    <Frame>
      <SkyBack warm={0.4} />
      <path d="M80 308V212h440v96z" fill="#5b4128" />
      <path d="M64 214h472l-26-42H90z" fill="#244f44" />
      <path d="M64 214h472v-10H64z" fill="#e3edf5" opacity="0.7" />
      <path d="M96 308v-96M504 308v-96" stroke="#3a2a1a" strokeWidth="10" />
      {leaves.map((l, i) => (
        <g key={i} transform={`rotate(${l.r} ${l.x} ${l.y})`}>
          <path
            className="vLeaf"
            style={{ ...stagger(i), transformOrigin: `${l.x}px ${l.y}px` }}
            d={`M${l.x} ${l.y}q22-30 44 0q-22 26-44 0z`}
            fill={i % 2 ? '#2e6455' : '#244f44'}
          />
        </g>
      ))}
      {berries.map((b, i) => (
        <circle key={i} className="vBerry" style={{ ...stagger(i), transformOrigin: `${b.x}px ${b.y}px` }} cx={b.x} cy={b.y} r="6" fill="#b94242" />
      ))}
      <g fill="#8a5a2b">
        <path d="M150 212v-28h44v28zM250 212v-34h44v34zM356 212v-30h44v30z" />
      </g>
      <g fill="#fff7e7" opacity="0.9">
        <circle cx="440" cy="196" r="9" />
        <circle cx="458" cy="188" r="7" />
        <circle cx="424" cy="186" r="7" />
      </g>
      <ellipse cx="300" cy="212" rx="270" ry="76" fill="url(#vgGlowSoft)" />
      <rect x="120" y="234" width="120" height="10" rx="5" fill="#3a2a1a" />
    </Frame>
  );
}

/** 19 — A rooftop star brightens and sends a thin trail of gold. */
function RoofStarTrail() {
  return (
    <Frame>
      <SkyBack />
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          className="twinkle"
          cx={40 + i * 48}
          cy={26 + ((i * 41) % 90)}
          r={1.6 + ((i * 5) % 3) * 0.5}
          fill="#f7f2e9"
          style={{ '--delay': `${(i % 5) * 0.8}s` } as CSSProperties}
        />
      ))}
      <g fill="#0b1b33">
        <path d="M0 308v-84l110-52 110 52v84z" />
        <path d="M240 308v-120l130-58 130 58v120z" />
        <path d="M520 308v-96l80-36v132z" />
      </g>
      <g fill="#f2b84b" opacity="0.7">
        <rect x="40" y="206" width="26" height="34" rx="3" className="flicker" />
        <rect x="150" y="212" width="26" height="34" rx="3" className="flicker" style={{ '--fdur': '6s' } as CSSProperties} />
        <rect x="288" y="228" width="30" height="40" rx="3" className="flicker" style={{ '--fdur': '5s' } as CSSProperties} />
        <rect x="412" y="228" width="30" height="40" rx="3" className="flicker" style={{ '--fdur': '7s' } as CSSProperties} />
      </g>
      <path d="M370 130v-42" stroke="#2f537e" strokeWidth="6" strokeLinecap="round" />
      <path
        className="vTrail"
        d="M370 62q-120 10-210 96"
        fill="none"
        stroke="#f2b84b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g className="vStarBright" style={{ transformOrigin: '370px 62px' }}>
        <circle cx="370" cy="62" r="76" fill="url(#vgGlow)" />
        <path d="M370 26l10 26 26 10-26 10-10 26-10-26-26-10 26-10z" fill="#ffd98a" />
      </g>
    </Frame>
  );
}

/** 20 — Wrapped gifts slide gently onto a cart. */
function GiftSlide({ onInteract }: VignetteProps) {
  const [round, setRound] = useState(0);
  const gifts = [
    { x: 190, y: 158, w: 74, h: 66, c: '#b94242', r: '#f2b84b' },
    { x: 276, y: 168, w: 64, h: 56, c: '#244f44', r: '#fff7e7' },
    { x: 350, y: 150, w: 58, h: 74, c: '#d98d7c', r: '#fff7e7' },
    { x: 232, y: 96, w: 66, h: 58, c: '#2f537e', r: '#f2b84b' },
  ];
  return (
    <Frame
      label="Load another parcel onto the cart"
      onClick={() => {
        setRound((r) => r + 1);
        onInteract?.();
      }}
    >
      <SkyBack warm={0.5} />
      <g fill="#0f2542">
        <path d="M0 308v-120h96l26-24v144z" />
        <path d="M600 308v-150l-70-28-54 30v148z" />
      </g>
      <ellipse cx="300" cy="286" rx="250" ry="38" fill="url(#vgGlowSoft)" />
      <g key={round}>
        {gifts.map((g, i) => (
          <g key={i} className="vGift" style={stagger(i)}>
            <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="5" fill={g.c} />
            <path
              d={`M${g.x + g.w / 2} ${g.y}v${g.h}M${g.x} ${g.y + g.h / 2}h${g.w}`}
              stroke={g.r}
              strokeWidth="8"
            />
            <path
              d={`M${g.x + g.w / 2} ${g.y}q-18-22 0-26t0 26zM${g.x + g.w / 2} ${g.y}q18-22 0-26`}
              fill="none"
              stroke={g.r}
              strokeWidth="6"
            />
          </g>
        ))}
      </g>
      <path d="M150 224h300l-18-6H168z" fill="#3a2a1a" />
      <path d="M156 224h288v26H156z" fill="#5b4128" />
      <rect x="146" y="250" width="308" height="14" rx="6" fill="#3a2a1a" />
      <circle cx="210" cy="284" r="26" fill="none" stroke="#3a2a1a" strokeWidth="10" />
      <circle cx="392" cy="284" r="26" fill="none" stroke="#3a2a1a" strokeWidth="10" />
      <path d="M454 236l64-26" stroke="#3a2a1a" strokeWidth="9" strokeLinecap="round" />
    </Frame>
  );
}

/** 21 — The town clock turns towards midnight. */
function ClockHands() {
  return (
    <Frame>
      <SkyBack />
      <path d="M170 308V96l130-56 130 56v212z" fill="#15294a" />
      <path d="M158 100L300 36l142 64-10 20-132-58-132 58z" fill="#e3edf5" opacity="0.6" />
      <circle cx="300" cy="170" r="104" fill="#0c1d38" />
      <circle cx="300" cy="170" r="92" fill="#f7f2e9" opacity="0.9" />
      <circle cx="300" cy="170" r="78" fill="none" stroke="#dcd0b6" strokeWidth="3" />
      <circle cx="300" cy="170" r="104" fill="none" stroke="#2f537e" strokeWidth="10" />
      <circle cx="300" cy="170" r="180" fill="url(#vgGlowSoft)" className="vgPulse" />
      <g fill="#1d3557">
        <rect x="170" y="268" width="260" height="14" rx="5" />
        <rect x="158" y="92" width="26" height="216" rx="5" />
        <rect x="416" y="92" width="26" height="216" rx="5" />
      </g>
      {[...Array(12)].map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <path
            key={i}
            className="vTick"
            style={stagger(i)}
            d={`M${300 + Math.cos(a) * 78} ${170 + Math.sin(a) * 78}L${300 + Math.cos(a) * 68} ${170 + Math.sin(a) * 68}`}
            stroke="#10233f"
            strokeWidth={i % 3 === 0 ? 6 : 3}
            strokeLinecap="round"
          />
        );
      })}
      <g style={{ transformOrigin: '300px 170px' }} className="vHandHour">
        <path d="M300 170V116" stroke="#10233f" strokeWidth="9" strokeLinecap="round" />
      </g>
      <g style={{ transformOrigin: '300px 170px' }} className="vHandMin">
        <path d="M300 170V96" stroke="#10233f" strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="300" cy="170" r="8" fill="#b94242" />
      <g fill="#f2b84b" opacity="0.7">
        <rect x="204" y="288" width="26" height="20" rx="3" className="flicker" />
        <rect x="370" y="288" width="26" height="20" rx="3" className="flicker" style={{ '--fdur': '6s' } as CSSProperties} />
      </g>
    </Frame>
  );
}

/** 22 — A nativity lantern reveals a warm silhouette. */
function NativityReveal() {
  return (
    <Frame>
      <SkyBack warm={0.6} />
      <path d="M110 308V160l190-104 190 104v148z" fill="#3a2a1a" />
      <path d="M98 164L300 46l202 118-12 20-190-104-190 104z" fill="#e3edf5" opacity="0.55" />
      <path d="M160 308V196h280v112z" fill="#1c1208" />
      <g className="vRevealGlow" style={{ transformOrigin: '300px 240px' }}>
        <circle cx="300" cy="240" r="156" fill="url(#vgGlow)" />
      </g>
      <g fill="#1c1208">
        <g className="vFigure" style={stagger(0)}>
          <path d="M214 308v-56q0-30 26-30t26 30v56z" />
          <circle cx="240" cy="204" r="18" />
        </g>
        <g className="vFigure" style={stagger(1)}>
          <path d="M334 308v-56q0-30 26-30t26 30v56z" />
          <circle cx="360" cy="204" r="18" />
        </g>
        <g className="vFigure" style={stagger(2)}>
          <path d="M272 308v-26q0-18 28-18t28 18v26z" />
          <ellipse cx="300" cy="258" rx="34" ry="10" />
        </g>
      </g>
      <g className="vFigure" style={stagger(2)}>
        <circle cx="300" cy="264" r="16" fill="#ffd98a" />
        <circle cx="300" cy="264" r="30" fill="#ffd98a" opacity="0.4" />
      </g>
      <g className="vgFloat" style={withDelay(0.3)}>
        <path d="M300 92l9 22 22 8-22 8-9 22-9-22-22-8 22-8z" fill="#f2b84b" />
        <circle cx="300" cy="122" r="52" fill="url(#vgGlow)" />
      </g>
    </Frame>
  );
}

/** 23 — The Christmas tree lights up ornament by ornament. */
function TreeLights({ onInteract }: VignetteProps) {
  const [round, setRound] = useState(0);
  const orn = [
    { x: 300, y: 110 }, { x: 278, y: 142 }, { x: 322, y: 146 },
    { x: 300, y: 172 }, { x: 262, y: 186 }, { x: 340, y: 190 },
    { x: 284, y: 216 }, { x: 318, y: 220 }, { x: 246, y: 232 },
    { x: 356, y: 236 }, { x: 300, y: 246 }, { x: 268, y: 266 },
    { x: 334, y: 268 }, { x: 228, y: 276 }, { x: 374, y: 278 },
  ];
  const colours = ['#b94242', '#f2b84b', '#fff7e7', '#d98d7c', '#ffd98a'];
  return (
    <Frame
      label="Light the tree again"
      onClick={() => {
        setRound((r) => r + 1);
        onInteract?.();
      }}
    >
      <SkyBack warm={0.55} />
      <g fill="#0f2542">
        <path d="M0 308v-96h90l24-22v118z" />
        <path d="M600 308v-110l-70-26-50 28v108z" />
      </g>
      <ellipse cx="300" cy="298" rx="210" ry="38" fill="url(#vgGlowSoft)" />
      <rect x="286" y="278" width="28" height="30" fill="#3a2a1a" />
      <g fill="#244f44">
        <path d="M300 240l90 48H210z" />
        <path d="M300 186l74 42H226z" />
        <path d="M300 136l58 36H242z" />
        <path d="M300 88l44 32h-88z" />
      </g>
      <g fill="#2e6455" opacity="0.6">
        <path d="M300 240l40 24-90 24z" />
        <path d="M300 186l32 20-74 22z" />
      </g>
      <g key={round}>
        {orn.map((o, i) => (
          <g key={i} className="vOrn" style={{ ...stagger(i), transformOrigin: `${o.x}px ${o.y}px` }}>
            <circle cx={o.x} cy={o.y} r="15" fill={colours[i % 5]} opacity="0.22" className="vOrnGlow" />
            <circle cx={o.x} cy={o.y} r="6.5" fill={colours[i % 5]} />
          </g>
        ))}
        <g className="vOrn" style={{ ...stagger(16), transformOrigin: '300px 68px' }}>
          <circle cx="300" cy="68" r="52" fill="url(#vgGlow)" />
          <path d="M300 40l9 22 23 8-23 8-9 22-9-22-23-8 23-8z" fill="#ffd98a" />
        </g>
      </g>
      <g fill="none" stroke="#f2b84b" strokeWidth="2.5" opacity="0.6">
        <path d="M252 262q48 22 96 0" />
        <path d="M262 208q38 18 76 0" />
        <path d="M272 158q28 14 56 0" />
      </g>
    </Frame>
  );
}

/** 24 — A Christmas Eve star radiates and the whole town comes to life. */
function ChristmasRadiance() {
  return (
    <Frame>
      <SkyBack warm={0.8} />
      <g style={{ transformOrigin: '300px 112px' }}>
        {[...Array(10)].map((_, i) => {
          const a = (i * Math.PI) / 5;
          return (
            <path
              key={i}
              className="vRay"
              style={{ ...stagger(i), transformOrigin: '300px 112px' }}
              d={`M300 112L${300 + Math.cos(a) * 280} ${112 + Math.sin(a) * 280}`}
              stroke="#f2b84b"
              strokeWidth={i % 2 ? 3 : 7}
              opacity="0.4"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <circle cx="300" cy="112" r="130" fill="url(#vgGlow)" />
      <path d="M300 64l14 34 34 14-34 14-14 34-14-34-34-14 34-14z" fill="#fff7e7" />
      <g fill="#0b1b33">
        <path d="M0 308v-84l70-36 70 36v84z" />
        <path d="M140 308V176l60-40 60 40v132z" />
        <path d="M260 308V152l54-34 54 34v156z" />
        <path d="M368 308V186l62-42 62 42v122z" />
        <path d="M492 308v-96l54-30 54 30v96z" />
        <path d="M296 118l18-30 18 30z" />
      </g>
      <g fill="#f2b84b">
        {[
          [26, 246], [90, 248], [162, 216], [214, 216], [162, 268], [214, 268],
          [278, 194], [324, 194], [278, 246], [324, 246], [390, 224], [442, 224],
          [390, 274], [442, 274], [512, 244], [560, 244],
        ].map(([x, y], i) => (
          <rect
            key={i}
            className="vTownWin"
            style={stagger(i)}
            x={x}
            y={y}
            width="26"
            height="32"
            rx="3"
          />
        ))}
      </g>
      <path d="M0 308h600" stroke="#f2b84b" strokeWidth="4" opacity="0.35" />
      <g fill="#fff7e7" opacity="0.6">
        {[...Array(9)].map((_, i) => (
          <circle
            key={i}
            className="twinkle"
            cx={30 + i * 68}
            cy={20 + ((i * 37) % 44)}
            r="2.4"
            style={{ '--delay': `${(i % 4) * 0.9}s` } as CSSProperties}
          />
        ))}
      </g>
    </Frame>
  );
}

export const SET_THREE: Record<string, VignetteDef> = {
  'cat-blink': { Component: CatBlink },
  'winter-blooms': { Component: WinterBlooms },
  'roof-star-trail': { Component: RoofStarTrail },
  'gift-slide': { Component: GiftSlide, hint: 'Tap to load the cart' },
  'clock-hands': { Component: ClockHands },
  'nativity-reveal': { Component: NativityReveal },
  'tree-lights': { Component: TreeLights, hint: 'Tap to light the tree' },
  'christmas-radiance': { Component: ChristmasRadiance },
};
