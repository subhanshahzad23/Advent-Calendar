'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Frame, SkyBack, stagger, withDelay, type VignetteDef, type VignetteProps } from './Frame';

/* Days 9–16. Production asset slot: swap any scene for supplied artwork. */

/** 9 — A tiny lantern follows a short path through the square. */
function LanternPath() {
  return (
    <Frame>
      <SkyBack warm={0.3} />
      <g fill="#0f2542">
        <path d="M0 250V96h140v154zM460 250V78h140v172z" />
        <path d="M180 250V120l90-46 90 46v130z" />
      </g>
      <path d="M232 250v-74a38 38 0 0176 0v74z" fill="#071426" />
      <path d="M240 250v-70a30 30 0 0160 0v70z" fill="#f2b84b" opacity="0.3" />
      <g fill="#f2b84b" opacity="0.5">
        <rect x="30" y="130" width="26" height="34" rx="4" />
        <rect x="508" y="112" width="26" height="34" rx="4" />
      </g>
      <path d="M40 272q130-40 260-10t260-16" fill="none" stroke="#f2b84b" strokeWidth="2" strokeDasharray="4 10" opacity="0.4" />
      <g className="vTravel">
        <g className="vTravelY">
          <circle cx="160" cy="250" r="72" fill="url(#vgGlow)" />
          <rect x="148" y="236" width="24" height="30" rx="5" fill="#ffd98a" className="flicker" />
          <path d="M148 234h24M152 266h16" stroke="#3a2a1a" strokeWidth="3" />
          <path d="M160 234v-10a10 10 0 0120 0" fill="none" stroke="#3a2a1a" strokeWidth="3" />
        </g>
      </g>
      <rect y="284" width="600" height="24" fill="#0b1b33" />
    </Frame>
  );
}

/** 10 — Market garlands are hung with a soft reveal. */
function GarlandHang() {
  const bulbs = [...Array(11)].map((_, i) => {
    const t = (i + 1) / 12;
    const x = 40 + t * 520;
    const y = 96 + Math.sin(Math.PI * t) * 76;
    return { x, y };
  });
  return (
    <Frame>
      <SkyBack warm={0.45} />
      <path d="M104 308V214h392v94z" fill="#5b4128" />
      <path d="M104 214h392v14H104z" fill="#7a5834" />
      <g stroke="#3a2a1a" strokeWidth="3" opacity="0.7">
        <path d="M168 228v80M232 228v80M296 228v80M360 228v80M424 228v80" />
      </g>
      <path d="M92 204h416v18H92z" fill="#8a663d" />
      <path d="M92 204h416v6H92z" fill="#e3edf5" opacity="0.35" />
      <path d="M70 208h460l-30-52H100z" fill="#b94242" />
      {[...Array(7)].map((_, i) => (
        <path key={i} d={`M${100 + i * 62} 156h30l22 52h-30z`} fill="#f7f2e9" opacity="0.92" />
      ))}
      <path d="M70 208h460v-12H70z" fill="#e3edf5" opacity="0.7" />
      <path
        className="vgDraw"
        style={{ '--len': 620, '--d': '0.2s' } as CSSProperties}
        d="M40 96q260 152 520 0"
        fill="none"
        stroke="#244f44"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {bulbs.map((b, i) => (
        <g key={i} className="vGarlandBulb" style={stagger(i)}>
          <circle cx={b.x} cy={b.y + 16} r="16" fill="#f2b84b" opacity="0.22" />
          <path d={`M${b.x} ${b.y}v8`} stroke="#244f44" strokeWidth="3" />
          <circle cx={b.x} cy={b.y + 14} r="7" fill={i % 3 === 0 ? '#ffd98a' : '#f2b84b'} />
        </g>
      ))}
      <g fill="#c9772f">
        <circle cx="160" cy="192" r="11" />
        <circle cx="186" cy="194" r="11" />
        <circle cx="212" cy="191" r="11" />
        <circle cx="173" cy="176" r="10" />
        <circle cx="199" cy="178" r="10" />
      </g>
      <g fill="#244f44">
        <path d="M380 204c0-16 9-28 20-28s20 12 20 28z" />
        <path d="M424 204c0-12 7-21 15-21s15 9 15 21z" />
      </g>
      <g fill="#f7f2e9" opacity="0.9">
        <rect x="266" y="180" width="30" height="22" rx="4" />
        <rect x="302" y="186" width="26" height="16" rx="4" />
      </g>
      <g fill="#b94242">
        <circle cx="392" cy="188" r="4" />
        <circle cx="408" cy="194" r="4" />
        <circle cx="436" cy="192" r="4" />
      </g>
    </Frame>
  );
}

/** 11 — A child's lantern brightens when pressed. */
function LanternPress({ onInteract }: VignetteProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <Frame
      className={pressed ? 'pressed' : ''}
      label="Press the lantern to brighten it"
      onClick={() => {
        setPressed((p) => !p);
        onInteract?.();
      }}
    >
      <SkyBack warm={pressed ? 0.9 : 0.2} />
      <g fill="#0b1b33">
        <path d="M0 308v-96h110l30-26v122z" />
        <path d="M600 308v-120l-80-30-56 34v116z" />
      </g>
      <g className="vPressGlow" style={{ transformOrigin: '300px 170px' }}>
        <circle cx="300" cy="170" r="168" fill="url(#vgGlow)" />
      </g>
      <path d="M300 78v18" stroke="#8f6a3a" strokeWidth="4" strokeLinecap="round" />
      <path d="M262 96h76l10 108a12 12 0 01-12 13h-72a12 12 0 01-12-13z" fill="#b94242" />
      <path d="M272 104h56l8 96h-72z" fill="#ffd98a" />
      <g className="vPressFlame" style={{ transformOrigin: '300px 186px' }}>
        <path d="M300 148c10 14 15 21 15 28a15 15 0 01-30 0c0-7 5-14 15-28z" fill="#e88735" />
      </g>
      <path d="M262 96h76M258 216h84" stroke="#8f2f2f" strokeWidth="6" strokeLinecap="round" />
      <g fill="#0b1b33">
        <path d="M300 308v-52q0-26 22-26t22 26v52z" opacity="0.9" />
        <circle cx="322" cy="216" r="20" />
      </g>
      <path d="M250 308h180" stroke="#f2b84b" strokeWidth="2" opacity="0.3" />
    </Frame>
  );
}

/** 12 — Winter branches sway and release snow. */
function BranchSway() {
  const joints = [
    { x: 132, y: 128 }, { x: 226, y: 152 }, { x: 320, y: 176 },
    { x: 414, y: 198 }, { x: 496, y: 216 },
  ];
  return (
    <Frame>
      <SkyBack />
      {[...Array(10)].map((_, i) => (
        <circle
          key={i}
          className="twinkle"
          cx={40 + i * 58}
          cy={40 + ((i * 47) % 70)}
          r="2"
          fill="#f7f2e9"
          style={{ '--delay': `${(i % 5) * 0.8}s` } as CSSProperties}
        />
      ))}
      <g className="vBranch" style={{ transformOrigin: '20px 112px' }}>
        <path
          d="M14 108q150 18 250 60t190 42"
          fill="none"
          stroke="#243b58"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M14 104q150 18 250 60t190 42"
          fill="none"
          stroke="#33507a"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
        />
        <g stroke="#243b58" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M132 128l-28-36M226 152l24-42M320 176l-26-40M414 198l30-38M496 216l18-40" />
        </g>
        <g stroke="#243b58" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M104 92l-22-22M250 110l22-24M294 136l-24-22M444 160l24-22" />
        </g>
        {joints.map((j, i) => (
          <g key={i}>
            <path
              d={`M${j.x - 26} ${j.y - 8}q26 -14 52 0q-26 10 -52 0z`}
              fill="#e3edf5"
              opacity="0.85"
            />
          </g>
        ))}
        <g fill="#b94242">
          <circle cx="188" cy="146" r="6" />
          <circle cx="200" cy="154" r="5" />
          <circle cx="356" cy="190" r="6" />
          <circle cx="368" cy="198" r="5" />
          <circle cx="462" cy="214" r="6" />
        </g>
      </g>
      {joints.slice(0, 4).map((j, i) => (
        <g key={j.x} className="vSnowPuff" style={{ '--delay': `${i * 1.3}s` } as CSSProperties}>
          <circle cx={j.x} cy={j.y + 6} r="4" fill="#f7f2e9" />
          <circle cx={j.x + 13} cy={j.y + 18} r="3" fill="#f7f2e9" opacity="0.8" />
          <circle cx={j.x - 11} cy={j.y + 24} r="2.5" fill="#f7f2e9" opacity="0.7" />
        </g>
      ))}
      <path d="M0 308v-30q150-24 300 0t300-10v40z" fill="#e3edf5" opacity="0.16" />
    </Frame>
  );
}

/** 13 — Church stained glass glows from cool blue to gold. */
function GlassWarm({ onInteract }: VignetteProps) {
  const [warm, setWarm] = useState(false);
  const panes = [
    '#2f537e', '#3d6390', '#27496f', '#35597f', '#2a4e79',
    '#3a608c', '#294a72', '#33567f',
  ];
  const warmPanes = ['#f2b84b', '#e88735', '#ffd98a', '#f2b84b', '#d98d7c', '#ffd98a', '#e88735', '#f2b84b'];
  return (
    <Frame
      label={warm ? 'Let the window cool again' : 'Let the light through the window'}
      onClick={() => {
        setWarm((w) => !w);
        onInteract?.();
      }}
    >
      <SkyBack warm={warm ? 1 : 0} />
      <path d="M96 308V96h408v212z" fill="#15294a" />
      <path d="M84 100L300 22l216 78-12 16L300 44 96 116z" fill="#1d3557" />
      <path d="M84 100L300 22l216 78-8 5L300 32 92 105z" fill="#e3edf5" opacity="0.5" />
      <g fill="#1d3557">
        <rect x="96" y="150" width="46" height="158" rx="6" />
        <rect x="458" y="150" width="46" height="158" rx="6" />
      </g>
      <circle cx="300" cy="162" r="126" fill="#1d3557" />
      <circle cx="300" cy="162" r="118" fill="#0c1d38" />
      {warm && <circle cx="300" cy="162" r="210" fill="url(#vgGlow)" />}
      {panes.map((c, i) => {
        const a0 = (i * Math.PI) / 4 - Math.PI / 8;
        const a1 = a0 + Math.PI / 4;
        const r = 104;
        return (
          <path
            key={i}
            className="vGlassPane"
            style={stagger(i)}
            d={`M300 162L${300 + Math.cos(a0) * r} ${162 + Math.sin(a0) * r}A${r} ${r} 0 0 1 ${300 + Math.cos(a1) * r} ${162 + Math.sin(a1) * r}Z`}
            fill={warm ? warmPanes[i] : c}
            opacity="0.92"
          />
        );
      })}
      <circle cx="300" cy="162" r="34" className="vGlassPane" fill={warm ? '#fff7e7' : '#8fb4d6'} />
      <g stroke="#0c1d38" strokeWidth="6" fill="none">
        <circle cx="300" cy="162" r="104" />
        <circle cx="300" cy="162" r="34" />
        {[...Array(8)].map((_, i) => {
          const a = (i * Math.PI) / 4 - Math.PI / 8;
          return <path key={i} d={`M300 162L${300 + Math.cos(a) * 104} ${162 + Math.sin(a) * 104}`} />;
        })}
      </g>
      <path
        d="M228 308v-46a72 72 0 01144 0v46z"
        fill={warm ? '#f2b84b' : '#0c1d38'}
        opacity={warm ? 0.5 : 1}
        style={{ transition: 'fill 1.4s ease, opacity 1.4s ease' }}
      />
    </Frame>
  );
}

/** 14 — A small bridge light reflects in the water. */
function BridgeReflection() {
  return (
    <Frame>
      <SkyBack warm={0.25} />
      <rect y="200" width="600" height="108" fill="#17355c" />
      <path d="M110 200h380v16H110z" fill="#33567f" />
      <path d="M110 216h380v14a190 60 0 00-380 0z" fill="#12294a" />
      <path d="M110 198h380v-10H110z" fill="#e3edf5" opacity="0.6" />
      <g stroke="#3d6390" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M130 188v-40M200 184v-36M300 180v-36M400 184v-36M470 188v-40" />
        <path d="M128 148h344" />
      </g>
      <g transform="translate(300 112)">
        <circle r="86" fill="url(#vgGlow)" className="vgPulse" />
        <path d="M0 -54v-16" stroke="#3a2a1a" strokeWidth="4" strokeLinecap="round" />
        <path d="M-13 -54h26l4 6h-34z" fill="#3a2a1a" />
        <path d="M-16 -48h32l5 66h-42z" fill="#2a1d12" />
        <path d="M-11 -42h22l4 54h-30z" fill="#ffd98a" className="flicker" />
        <path d="M0 -20c5 7 8 11 8 15a8 8 0 01-16 0c0-4 3-8 8-15z" fill="#e88735" />
        <path d="M-21 18h42l4 8h-50z" fill="#3a2a1a" />
        <path d="M-16 -48h32M-14 -18h28" stroke="#3a2a1a" strokeWidth="2.6" />
      </g>
      <g className="vReflect" style={{ transformOrigin: '300px 236px' }}>
        <rect x="286" y="236" width="28" height="66" rx="8" fill="#f2b84b" opacity="0.5" />
        <ellipse cx="300" cy="244" rx="70" ry="16" fill="#f2b84b" opacity="0.2" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          className="vWaterLine"
          style={{ '--delay': `${i * 0.9}s` } as CSSProperties}
          d={`M${190 + (i % 2) * 40} ${256 + i * 14}h${170 - i * 24}`}
          stroke="#8fb4d6"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
      ))}
    </Frame>
  );
}

/** 15 — Choir singers' scarves and sheet music animate subtly. */
function ChoirBreath() {
  const singers = [
    { x: 150, s: 1, c: '#b94242' }, { x: 225, s: 0.94, c: '#244f44' },
    { x: 300, s: 1.04, c: '#d98d7c' }, { x: 375, s: 0.96, c: '#2e6455' },
    { x: 450, s: 1, c: '#8f2f2f' },
  ];
  return (
    <Frame>
      <SkyBack warm={0.4} />
      <path d="M0 308V70h600v238z" fill="#12294a" opacity="0.5" />
      <path d="M240 200V118a60 60 0 01120 0v82z" fill="#0c1d38" />
      <path d="M252 200v-76a48 48 0 0196 0v76z" fill="#f2b84b" opacity="0.35" />
      {singers.map((s, i) => (
        <g key={i} transform={`translate(${s.x} 296) scale(${s.s})`}>
          <g className="vBreathe" style={{ '--delay': `${i * 0.5}s` } as CSSProperties}>
            <path d="M-26 0l4-84q0-22 22-22t22 22l4 84z" fill="#0b1b33" />
            <path d="M-22 -86q22-16 44 0l-3-12q-19-10-38 0z" fill={s.c} />
            <circle cx="0" cy="-116" r="16" fill="#0b1b33" />
            <path d="M-8 -60l34-10v24l-34 10z" fill="#fff7e7" opacity="0.9" />
            <path d="M-8 -60l34-10" stroke="#0a1729" strokeWidth="2" />
            <path d="M14 -84l6 4" stroke="#f2b84b" strokeWidth="2" opacity="0.6" />
          </g>
          <g className="vPuff" style={{ '--delay': `${i * 1.1}s` } as CSSProperties}>
            <circle cx="16" cy="-120" r="6" fill="#dce8f2" />
          </g>
        </g>
      ))}
      <g fill="#f2b84b" opacity="0.8">
        {[0, 1, 2].map((i) => (
          <g key={i} className="vNote" style={{ '--delay': `${i * 1.6}s`, '--nx': `${20 - i * 22}px` } as CSSProperties}>
            <circle cx={240 + i * 60} cy="150" r="6" />
            <path d={`M${245 + i * 60} 150v-22`} stroke="#f2b84b" strokeWidth="3" />
          </g>
        ))}
      </g>
    </Frame>
  );
}

/** 16 — Stable doors open to warm light. */
function StableDoors({ onInteract }: VignetteProps) {
  const [open, setOpen] = useState(false);
  return (
    <Frame
      className={open ? 'open' : ''}
      label="Open the courtyard doors"
      onClick={() => {
        setOpen(true);
        onInteract?.();
      }}
    >
      <SkyBack warm={open ? 0.9 : 0.1} />
      <path d="M90 308V132l210-84 210 84v176z" fill="#15294a" />
      <path d="M78 136L300 40l222 96-12 22-210-84-210 84z" fill="#e3edf5" opacity="0.6" />
      <path d="M160 308V170h280v138z" fill="#071426" />
      <g className="vDoorLight" style={{ transformOrigin: '300px 170px' }}>
        <path d="M160 308V170h280v138z" fill="#ffd98a" opacity="0.75" />
        <path d="M100 308l60-138h280l60 138z" fill="#f2b84b" opacity="0.25" />
        <g fill="#8a5a2b" opacity="0.65">
          <path d="M250 308v-38q0-26 26-26h48q26 0 26 26v38z" />
          <ellipse cx="300" cy="246" rx="40" ry="10" />
        </g>
        <circle cx="300" cy="222" r="26" fill="#fff7e7" opacity="0.8" className="vgPulse" />
      </g>
      <g className="vDoorL" style={{ transformOrigin: '160px 240px' }}>
        <path d="M160 308V170h140v138z" fill="#5b4128" />
        <g stroke="#3a2a1a" strokeWidth="3.5" opacity="0.8">
          <path d="M188 170v138M216 170v138M244 170v138M272 170v138" />
        </g>
        <path d="M160 196h140M160 268h140" stroke="#3a2a1a" strokeWidth="8" />
        <path d="M162 200l134 62" stroke="#3a2a1a" strokeWidth="6" opacity="0.5" />
        <circle cx="284" cy="240" r="7" fill="#2a1d12" />
      </g>
      <g className="vDoorR" style={{ transformOrigin: '440px 240px' }}>
        <path d="M300 308V170h140v138z" fill="#5b4128" />
        <g stroke="#3a2a1a" strokeWidth="3.5" opacity="0.8">
          <path d="M328 170v138M356 170v138M384 170v138M412 170v138" />
        </g>
        <path d="M300 196h140M300 268h140" stroke="#3a2a1a" strokeWidth="8" />
        <path d="M438 200L304 262" stroke="#3a2a1a" strokeWidth="6" opacity="0.5" />
        <circle cx="316" cy="240" r="7" fill="#2a1d12" />
      </g>
      <g className="vgFloat" style={withDelay(0.4)}>
        <circle cx="300" cy="96" r="52" fill="url(#vgGlow)" />
        <path d="M300 74l7 16 17 6-17 6-7 16-7-16-17-6 17-6z" fill="#f2b84b" />
      </g>
    </Frame>
  );
}

export const SET_TWO: Record<string, VignetteDef> = {
  'lantern-path': { Component: LanternPath },
  'garland-hang': { Component: GarlandHang },
  'lantern-press': { Component: LanternPress, hint: 'Press the lantern' },
  'branch-sway': { Component: BranchSway },
  'glass-warm': { Component: GlassWarm, hint: 'Tap the window' },
  'bridge-reflection': { Component: BridgeReflection },
  'choir-breath': { Component: ChoirBreath },
  'stable-doors': { Component: StableDoors, hint: 'Tap to open the doors' },
};
