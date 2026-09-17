'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Frame, SkyBack, stagger, withDelay, type VignetteDef, type VignetteProps } from './Frame';

/* Days 1–8. Production asset slot: each scene below can be swapped for the
   supplied day-specific artwork or animation without changing the overlay. */

/** 1 — A star gently appears above the bell tower. */
function StarRise() {
  return (
    <Frame>
      <SkyBack />
      {[...Array(16)].map((_, i) => (
        <circle
          key={i}
          className="twinkle"
          cx={30 + i * 37}
          cy={30 + ((i * 53) % 130)}
          r={1.6 + ((i * 7) % 3) * 0.6}
          fill="#f7f2e9"
          style={{ '--delay': `${(i % 6) * 0.7}s` } as CSSProperties}
        />
      ))}
      <g fill="#0b1b33">
        <path d="M232 308V128h64v180z" />
        <path d="M264 66l50 62h-100z" />
        <path d="M0 308v-60h150l24-30v90z" />
        <path d="M600 308v-84l-120-34-70 40v78z" />
      </g>
      <path d="M248 176h32v34h-32z" fill="#f2b84b" opacity="0.85" className="flicker" />
      {/* The glow settles in behind the star and stays. */}
      <ellipse className="vAfterglow" cx="264" cy="96" rx="210" ry="170" fill="url(#vgGlow)" />
      <g className="vStar">
        <circle cx="264" cy="70" r="70" fill="url(#vgGlow)" />
        <g className="vStarRays">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i * Math.PI) / 3;
            return (
              <path
                key={i}
                d={`M264 70L${(264 + Math.cos(a) * 120).toFixed(1)} ${(70 + Math.sin(a) * 120).toFixed(1)}`}
                stroke="#f2b84b"
                strokeWidth={i % 2 ? 1.4 : 2.6}
                strokeLinecap="round"
                opacity="0.4"
              />
            );
          })}
        </g>
        <path d="M264 34l9 22 23 8-23 8-9 22-9-22-23-8 23-8z" fill="#ffd98a" />
      </g>
      <path className="vAfterglow" d="M264 96v190" stroke="#f2b84b" strokeWidth="2.5" opacity="0.2" />
    </Frame>
  );
}

/** 2 — A chapel candle is lit by tapping it. */
function CandleLight({ onInteract }: VignetteProps) {
  const [lit, setLit] = useState(false);
  return (
    <Frame
      className={lit ? 'lit' : ''}
      label="Light the chapel candle"
      onClick={() => {
        setLit(true);
        onInteract?.();
      }}
    >
      <SkyBack warm={lit ? 1 : 0} />
      <path d="M150 308V96a150 150 0 01300 0v212z" fill="#15294a" />
      <path d="M198 308V128a102 102 0 01204 0v180z" fill="#0d1f3a" />
      <g className="vGlowSoft">
        <ellipse cx="300" cy="196" rx="210" ry="176" fill="url(#vgGlow)" />
        <path d="M198 308V128a102 102 0 01204 0v180z" fill="#f2b84b" opacity="0.2" />
      </g>
      <rect x="276" y="196" width="48" height="98" rx="8" fill="#fff7e7" />
      <rect x="276" y="196" width="18" height="98" rx="8" fill="#e6d9bf" opacity="0.6" />
      <path d="M300 196v-16" stroke="#3a2a1a" strokeWidth="3" />
      <g className="vFlame">
        <ellipse cx="300" cy="162" rx="34" ry="42" fill="#f2b84b" opacity="0.3" />
        <path d="M300 128c14 16 20 26 20 36a20 20 0 01-40 0c0-10 6-20 20-36z" fill="#ffd98a" />
        <path d="M300 148c7 9 10 14 10 20a10 10 0 01-20 0c0-6 3-11 10-20z" fill="#fff7e7" />
      </g>
      <rect x="252" y="292" width="96" height="10" rx="4" fill="#2f537e" />
    </Frame>
  );
}

/** 3 — A letter unfolds from the town postbox. */
function LetterUnfold({ onInteract }: VignetteProps) {
  const [open, setOpen] = useState(false);
  return (
    <Frame
      className={open ? 'open' : ''}
      label="Open the letter"
      onClick={() => {
        setOpen(true);
        onInteract?.();
      }}
    >
      <SkyBack />
      <g fill="#0f2542">
        <path d="M0 308v-96h120v96zM520 308v-120h80v120z" />
      </g>
      <path d="M252 308V150a48 48 0 0196 0v158z" fill="#b94242" />
      <path d="M252 150a48 48 0 0196 0v12h-96z" fill="#8f2f2f" />
      <rect x="272" y="188" width="56" height="12" rx="6" fill="#2a1216" />
      <rect x="240" y="300" width="120" height="8" rx="4" fill="#2f537e" />
      <g className="vLetter">
        <rect x="222" y="150" width="156" height="104" rx="6" fill="#fff7e7" />
        <path d="M222 150l78 54 78-54" fill="none" stroke="#d8c9ad" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            className="vLetterLine"
            style={stagger(i)}
            x="248"
            y={196 + i * 16}
            width={104 - i * 24}
            height="6"
            rx="3"
            fill="#c2b393"
          />
        ))}
        <circle cx="352" cy="176" r="12" fill="#b94242" opacity="0.85" />
      </g>
      <ellipse cx="300" cy="228" rx="200" ry="110" fill="url(#vgGlowSoft)" />
    </Frame>
  );
}

/** 4 — Snow falls over a quiet café table. */
function SnowCafe() {
  return (
    <Frame>
      <SkyBack warm={0.45} />
      {/* café front */}
      <path d="M0 308V36h268v272z" fill="#15294a" />
      <rect x="28" y="70" width="210" height="82" rx="5" fill="#0c1d38" />
      <rect x="36" y="78" width="194" height="66" rx="3" fill="#f2b84b" opacity="0.78" />
      <ellipse cx="132" cy="112" rx="180" ry="120" fill="url(#vgGlow)" />
      <path d="M132 78v66M36 111h194" stroke="#0c1d38" strokeWidth="5" />
      <path d="M16 168h236l-16-14H32z" fill="#8f2f2f" />
      {[...Array(5)].map((_, i) => (
        <path key={i} d={`M${34 + i * 44} 154h22l16 14h-22z`} fill="#f7f2e9" opacity="0.92" />
      ))}
      <path
        d="M16 168q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0q11 15 22 0"
        fill="none"
        stroke="#7a2828"
        strokeWidth="6"
      />
      <rect x="10" y="162" width="248" height="10" rx="4" fill="#244f44" />
      <path d="M52 308V226a35 35 0 0170 0v82z" fill="#0c1d38" />
      <path d="M58 308V228a29 29 0 0158 0v80z" fill="#f2b84b" opacity="0.55" />
      <path d="M87 240v68" stroke="#0c1d38" strokeWidth="4" opacity="0.7" />

      {/* terrace table */}
      <ellipse cx="420" cy="206" rx="96" ry="26" fill="#4a3320" />
      <ellipse cx="420" cy="200" rx="96" ry="26" fill="#6b4a2c" />
      <ellipse cx="420" cy="194" rx="86" ry="21" fill="#f7f2e9" opacity="0.5" />
      <rect x="412" y="212" width="16" height="66" rx="4" fill="#3a2a1a" />
      <path d="M378 284h84v10h-84z" fill="#3a2a1a" />
      {/* two chairs */}
      {[326, 514].map((cx, i) => (
        <g key={cx} fill="#3a2a1a">
          <rect x={cx - 24} y={214} width="48" height="8" rx="3" />
          <rect x={cx - (i ? -16 : 22)} y={168} width="7" height="50" rx="3" />
          <rect x={cx - 20} y={222} width="7" height="54" rx="3" />
          <rect x={cx + 13} y={222} width="7" height="54" rx="3" />
        </g>
      ))}
      {/* cup and lamp */}
      <path d="M398 190h34v-20h-34z" fill="#fff7e7" />
      <path d="M432 174h12a8 8 0 010 16h-12z" fill="none" stroke="#fff7e7" strokeWidth="4" />
      <ellipse cx="415" cy="170" rx="17" ry="5" fill="#8a5a2b" />
      <g className="vSteam" style={{ '--delay': '0s' } as CSSProperties}>
        <path d="M408 166c-7-13 7-17 0-30" stroke="#f7f2e9" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="vSteam" style={{ '--delay': '1.7s', '--dur': '5s' } as CSSProperties}>
        <path d="M422 166c-7-13 7-17 0-30" stroke="#f7f2e9" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <circle cx="480" cy="170" r="52" fill="url(#vgGlow)" />
        <path d="M480 138v-10" stroke="#3a2a1a" strokeWidth="3" strokeLinecap="round" />
        <path d="M468 138h24l3 6h-30z" fill="#3a2a1a" />
        <path d="M470 144h20l3 48h-26z" fill="#ffd98a" className="flicker" />
        <path d="M480 166c4 6 6 9 6 12a6 6 0 01-12 0c0-3 2-6 6-12z" fill="#e88735" />
        <path d="M464 192h32l3 7h-38z" fill="#3a2a1a" />
      </g>

      {/* snow settling over it all */}
      <g fill="#f7f2e9">
        {[...Array(15)].map((_, i) => (
          <circle
            key={i}
            className="vSnowDot"
            style={{ '--delay': `${(i % 7) * 0.9}s`, '--dur': `${5 + (i % 4)}s`, '--dx': `${(i % 3) * 9 - 9}px` } as CSSProperties}
            cx={30 + i * 39}
            cy={26 + (i % 5) * 16}
            r={2 + (i % 3)}
          />
        ))}
      </g>
    </Frame>
  );
}

/** 5 — Bread warms in a bakery window with rising steam. */
function BakerySteam() {
  return (
    <Frame>
      <SkyBack warm={0.6} />
      {/* shopfront */}
      <path d="M40 308V58h520v250z" fill="#15294a" />
      <path d="M28 64L300 8l272 56-10 16L300 30 38 80z" fill="#1d3557" />
      <path d="M28 64L300 8l272 56-6 6L300 20 34 70z" fill="#e3edf5" opacity="0.5" />
      <rect x="64" y="96" width="472" height="18" rx="6" fill="#8f2f2f" />
      <rect x="64" y="96" width="472" height="6" rx="3" fill="#e3edf5" opacity="0.35" />

      {/* the window */}
      <rect x="128" y="120" width="344" height="132" rx="8" fill="#0c1d38" />
      <rect x="138" y="130" width="324" height="112" rx="4" fill="#f2b84b" opacity="0.92" />
      <ellipse cx="300" cy="186" rx="330" ry="180" fill="url(#vgGlow)" />
      <rect x="142" y="172" width="316" height="8" rx="3" fill="#8a5a2b" opacity="0.8" />

      {/* rolls on the upper shelf */}
      <g fill="#a8682f">
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={186 + i * 57} cy="156" r="15" />
        ))}
      </g>
      {/* loaves on the lower shelf */}
      <g fill="#8a5023">
        <ellipse cx="204" cy="214" rx="44" ry="22" />
        <ellipse cx="300" cy="218" rx="48" ry="24" />
        <ellipse cx="398" cy="214" rx="42" ry="21" />
      </g>
      <g stroke="#6b3c18" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M184 208l12-9M204 210l12-9M224 208l12-9" />
        <path d="M284 214l14-10M306 216l14-10" />
        <path d="M382 208l12-9M402 210l12-9" />
      </g>

      {/* steam through the open top light */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="vSteam" style={{ '--delay': `${i * 1.1}s`, '--dur': `${4 + i * 0.4}s` } as CSSProperties}>
          <path
            d={`M${204 + i * 64} 196c-9-15 9-21 0-36`}
            stroke="#fff7e7"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      ))}

      {/* pavement and hanging sign */}
      <rect x="112" y="252" width="376" height="12" rx="4" fill="#2f537e" />
      <path d="M0 308v-36h600v36z" fill="#12294a" />
      <ellipse cx="300" cy="278" rx="250" ry="34" fill="url(#vgGlowSoft)" />
      <g>
        <path d="M520 96v42" stroke="#3a2a1a" strokeWidth="4" />
        <rect x="486" y="138" width="68" height="40" rx="5" fill="#244f44" />
        <ellipse cx="520" cy="158" rx="20" ry="11" fill="#e8d7b6" opacity="0.85" />
      </g>
    </Frame>
  );
}

/** 6 — A book opens to reveal a line of reflection. */
function BookOpen({ onInteract }: VignetteProps) {
  const [open, setOpen] = useState(false);
  return (
    <Frame
      className={open ? 'open' : ''}
      label="Open the book"
      onClick={() => {
        setOpen(true);
        onInteract?.();
      }}
    >
      <SkyBack warm={0.45} />
      {/* reading table */}
      <ellipse cx="300" cy="266" rx="260" ry="88" fill="url(#vgGlowSoft)" />
      <path d="M60 268h480v14H60z" fill="#6b4a2c" />
      <path d="M60 282h480v26H60z" fill="#4a3320" />

      {/* candle to one side */}
      <g>
        <circle cx="486" cy="192" r="56" fill="url(#vgGlow)" />
        <rect x="476" y="196" width="20" height="60" rx="5" fill="#fff7e7" />
        <path d="M486 190c5 7 8 11 8 15a8 8 0 01-16 0c0-4 3-8 8-15z" fill="#ffd98a" className="flicker" />
        <ellipse cx="486" cy="258" rx="22" ry="6" fill="#8a6a3a" />
      </g>

      {/* the book */}
      <g>
        <path d="M300 128v142" stroke="#5b3418" strokeWidth="11" strokeLinecap="round" />
        <g className="vPage vPage--l" style={{ transformOrigin: '300px 200px' }}>
          <path d="M300 132q-96-22-136 8v118q40-28 136-8z" fill="#fff7e7" />
          <path d="M300 132q-96-22-136 8v118q40-28 136-8z" fill="none" stroke="#cbbb9a" strokeWidth="2" />
          <path d="M300 140q-92-20-130 8" fill="none" stroke="#e4d8bd" strokeWidth="3" />
        </g>
        <g className="vPage vPage--r" style={{ transformOrigin: '300px 200px' }}>
          <path d="M300 132q96-22 136 8v118q-40-28-136-8z" fill="#fff7e7" />
          <path d="M300 132q96-22 136 8v118q-40-28-136-8z" fill="none" stroke="#cbbb9a" strokeWidth="2" />
          <path d="M300 140q92-20 130 8" fill="none" stroke="#e4d8bd" strokeWidth="3" />
        </g>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            className="vBookLine"
            style={stagger(i)}
            x={322}
            y={162 + i * 22}
            width={92 - (i % 2) * 26}
            height="6"
            rx="3"
            fill="#b7a98a"
          />
        ))}
        {[0, 1, 2].map((i) => (
          <rect
            key={`l${i}`}
            className="vBookLine"
            style={stagger(i + 2)}
            x={192 + (i % 2) * 10}
            y={168 + i * 24}
            width={88 - i * 14}
            height="6"
            rx="3"
            fill="#c9bb9c"
          />
        ))}
      </g>

      {/* closed cover, which lifts away on the first tap */}
      <g className="vCover">
        <path d="M232 126h136a8 8 0 018 8v136a8 8 0 01-8 8H232a8 8 0 01-8-8V134a8 8 0 018-8z" fill="#7a2f2f" />
        <path d="M232 126h20v152h-20a8 8 0 01-8-8V134a8 8 0 018-8z" fill="#5c2020" />
        <rect x="266" y="164" width="72" height="5" rx="2.5" fill="#f2b84b" opacity="0.85" />
        <rect x="278" y="182" width="48" height="4" rx="2" fill="#f2b84b" opacity="0.6" />
        <path d="M302 214l7 17 17 7-17 7-7 17-7-17-17-7 17-7z" fill="#f2b84b" opacity="0.8" />
      </g>
    </Frame>
  );
}

/** 7 — Fountain water shimmers with candlelight. */
function FountainShimmer() {
  return (
    <Frame>
      <SkyBack warm={0.35} />
      <ellipse cx="300" cy="244" rx="200" ry="52" fill="#2f537e" />
      <ellipse cx="300" cy="238" rx="188" ry="46" fill="#17355c" />
      <ellipse cx="300" cy="238" rx="188" ry="46" fill="none" stroke="#3d6390" strokeWidth="6" />
      <path d="M284 196h32v40h-32z" fill="#2f537e" />
      <ellipse cx="300" cy="192" rx="66" ry="17" fill="#33567f" />
      <path d="M292 176h16v-46h-16z" fill="#2f537e" />
      <circle cx="300" cy="118" r="18" fill="#3d6390" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          className="vDrop"
          style={{ '--delay': `${i * 0.6}s` } as CSSProperties}
          d={`M${272 + i * 19} 140v28`}
          stroke="#cfe3f5"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={`s${i}`}
          className="vShimmer"
          style={{ '--delay': `${i * 0.8}s` } as CSSProperties}
          cx={170 + i * 66}
          cy={228 + (i % 3) * 12}
          rx={52 - (i % 3) * 8}
          ry="4"
          fill="#f2b84b"
          opacity="0.3"
        />
      ))}
      {[0, 1, 2].map((i) => {
        const cx = 176 + i * 116;
        const cy = 232 + (i % 2) * 14;
        return (
          <g key={`c${i}`} className="vgFloat" style={withDelay(i * 0.9)}>
            <ellipse cx={cx} cy={cy + 12} rx="34" ry="9" fill="#f2b84b" opacity="0.2" />
            <ellipse cx={cx} cy={cy + 8} rx="15" ry="5" fill="#8a6a3a" />
            <rect x={cx - 5} y={cy - 10} width="10" height="18" rx="3" fill="#fff7e7" />
            <path
              d={`M${cx} ${cy - 24}c5 6 7 9 7 12a7 7 0 01-14 0c0-3 2-6 7-12z`}
              fill="#ffd98a"
              className="flicker"
            />
            <ellipse cx={cx} cy={cy + 22} rx="7" ry="3" fill="#f2b84b" opacity="0.45" className="vShimmer" />
          </g>
        );
      })}
    </Frame>
  );
}

/** 8 — A violinist's music notes drift softly upward. */
function MusicDrift() {
  const notes = [
    { x: 366, d: 0, nx: 30 }, { x: 386, d: 1.1, nx: -20 }, { x: 352, d: 2.2, nx: 40 },
    { x: 374, d: 3.1, nx: -34 }, { x: 392, d: 4, nx: 16 }, { x: 358, d: 4.9, nx: -12 },
  ];
  return (
    <Frame>
      <SkyBack warm={0.35} />
      <path d="M0 308v-84l104-30 96 34v80zM600 308v-106l-84-32-62 36v102z" fill="#0f2542" />
      <g fill="#f2b84b" opacity="0.55">
        <rect x="34" y="240" width="22" height="30" rx="3" className="flicker" />
        <rect x="528" y="248" width="22" height="30" rx="3" className="flicker" style={{ '--fdur': '6s' } as CSSProperties} />
      </g>
      <ellipse cx="300" cy="292" rx="190" ry="34" fill="url(#vgGlowSoft)" />

      {/* the open violin case at her feet */}
      <g>
        <path d="M232 290c0-12 22-20 52-20s52 8 52 20-22 20-52 20-52-8-52-20z" fill="#38281a" />
        <path d="M242 286c0-9 17-15 42-15s42 6 42 15-17 15-42 15-42-6-42-15z" fill="#8f2f2f" />
        <circle cx="272" cy="286" r="4" fill="#f2b84b" />
        <circle cx="296" cy="290" r="4" fill="#f2b84b" />
      </g>

      {/* the violinist */}
      <g>
        <path d="M268 272V206q0-30 32-30t32 30v66z" fill="#0d1f3a" />
        <path d="M268 210q14-14 32-14t32 14l-3-14q-14-12-29-12t-29 12z" fill="#b94242" />
        <circle cx="300" cy="166" r="21" fill="#0d1f3a" />
        <path d="M280 160q20-22 40 0z" fill="#b94242" />
        <path d="M320 196q16 4 20 22" stroke="#0d1f3a" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M282 202q-14 8-14 26" stroke="#0d1f3a" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M318 182q14 12 15 30" stroke="#f2b84b" strokeWidth="2.2" fill="none" opacity="0.5" />
      </g>

      {/* violin and bow */}
      <g transform="rotate(-28 332 194)">
        <ellipse cx="332" cy="200" rx="17" ry="22" fill="#7b4a22" />
        <ellipse cx="332" cy="178" rx="13" ry="16" fill="#7b4a22" />
        <rect x="326" y="150" width="12" height="22" rx="4" fill="#5b3418" />
        <path d="M326 162v42M332 160v46M338 162v42" stroke="#e8d7b6" strokeWidth="1.4" opacity="0.8" />
        <path d="M322 190q10 6 20 0" stroke="#3a2010" strokeWidth="2" fill="none" />
      </g>
      {/* The bow draws slowly across the strings. */}
      <g className="vBow">
        <path d="M286 174l82 44" stroke="#e8d7b6" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M286 174l82 44" stroke="#3a2a1a" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="286" cy="174" r="3.4" fill="#5b3418" />
      </g>

      {notes.map((n, i) => (
        <g
          key={i}
          className="vNote"
          style={{ '--delay': `${n.d}s`, '--nx': `${n.nx}px`, '--dur': '5.4s' } as CSSProperties}
        >
          <circle cx={n.x} cy="150" r="7" fill="#f2b84b" />
          <path d={`M${n.x + 6} 150v-26`} stroke="#f2b84b" strokeWidth="3" strokeLinecap="round" />
          {i % 2 === 0 && <path d={`M${n.x + 6} 124q12 4 10 16`} stroke="#f2b84b" strokeWidth="3" fill="none" />}
        </g>
      ))}
    </Frame>
  );
}

export const SET_ONE: Record<string, VignetteDef> = {
  'star-rise': { Component: StarRise },
  'candle-light': { Component: CandleLight, hint: 'Tap the candle to light it' },
  'letter-unfold': { Component: LetterUnfold, hint: 'Tap the postbox' },
  'snow-cafe': { Component: SnowCafe },
  'bakery-steam': { Component: BakerySteam },
  'book-open': { Component: BookOpen, hint: 'Tap to open the book' },
  'fountain-shimmer': { Component: FountainShimmer },
  'music-drift': { Component: MusicDrift },
};
