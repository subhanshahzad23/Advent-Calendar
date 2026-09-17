import type { CSSProperties } from 'react';
import { LAYER_DEPTH, type SceneBox } from '@/data/sceneConfig';
import { LayerSvg } from './LayerSvg';

interface PiazzaProps {
  view: SceneBox;
  lit: (zoneId: string) => boolean;
}

/** A sagging garland of string lights with sequenced bulbs. */
function StringLights({
  d,
  bulbs,
  tier = 2,
  offset = 0,
}: {
  d: string;
  bulbs: { x: number; y: number }[];
  tier?: 1 | 2 | 3 | 4;
  offset?: number;
}) {
  return (
    <g className={`rv${tier}`}>
      <path d={d} fill="none" stroke="#0f2743" strokeWidth="4" strokeLinecap="round" />
      {bulbs.map((b, i) => (
        <g key={i} className="bulb" style={{ '--i': i + offset } as CSSProperties}>
          <circle cx={b.x} cy={b.y + 12} r="18" fill="#f2b84b" opacity="0.18" />
          <path d={`M${b.x} ${b.y}v7`} stroke="#0f2743" strokeWidth="3" />
          <circle cx={b.x} cy={b.y + 11} r="5.5" fill={i % 3 === 0 ? '#ffd98a' : '#f2b84b'} />
        </g>
      ))}
    </g>
  );
}

const catenary = (x1: number, y1: number, x2: number, y2: number, sag: number) =>
  `M${x1} ${y1}Q${(x1 + x2) / 2} ${Math.max(y1, y2) + sag} ${x2} ${y2}`;

const bulbsAlong = (x1: number, y1: number, x2: number, y2: number, sag: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / (n + 1);
    const mt = 1 - t;
    return {
      x: mt * mt * x1 + 2 * mt * t * ((x1 + x2) / 2) + t * t * x2,
      y: mt * mt * y1 + 2 * mt * t * (Math.max(y1, y2) + sag) + t * t * y2,
    };
  });

/** Ornaments on the great tree — lit progressively. */
const ORNAMENTS = [
  { x: 1745, y: 660, c: '#b94242' }, { x: 1706, y: 700, c: '#f2b84b' },
  { x: 1786, y: 706, c: '#f7f2e9' }, { x: 1745, y: 748, c: '#d98d7c' },
  { x: 1688, y: 780, c: '#f2b84b' }, { x: 1802, y: 786, c: '#b94242' },
  { x: 1722, y: 830, c: '#f7f2e9' }, { x: 1772, y: 838, c: '#f2b84b' },
  { x: 1660, y: 880, c: '#d98d7c' }, { x: 1830, y: 884, c: '#f7f2e9' },
  { x: 1700, y: 926, c: '#b94242' }, { x: 1790, y: 930, c: '#f2b84b' },
  { x: 1745, y: 902, c: '#f2b84b' }, { x: 1642, y: 986, c: '#f7f2e9' },
  { x: 1848, y: 990, c: '#b94242' }, { x: 1700, y: 1020, c: '#f2b84b' },
  { x: 1792, y: 1024, c: '#d98d7c' }, { x: 1745, y: 1042, c: '#f7f2e9' },
];

/**
 * Production asset slot: replace this demo SVG layer with the supplied
 * piazza / street-furniture illustration asset.
 */
export function PiazzaLayer({ view, lit }: PiazzaProps) {
  return (
    <LayerSvg view={view} depth={LAYER_DEPTH.piazza} z={3}>
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2f4c" />
          <stop offset="45%" stopColor="#233d5f" />
          <stop offset="100%" stopColor="#2d4a6e" />
        </linearGradient>
        <radialGradient id="pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f2b84b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#17355c" />
          <stop offset="100%" stopColor="#21486f" />
        </linearGradient>
        <linearGradient id="fir" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f6a56" />
          <stop offset="100%" stopColor="#1a3f36" />
        </linearGradient>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b4128" />
          <stop offset="100%" stopColor="#38281a" />
        </linearGradient>
      </defs>

      {/* ---- Cobbled ground ---------------------------------------------- */}
      {/* Runs past y=1350 so the portrait crop has foreground to spare. */}
      <rect x="-260" y="1000" width="2920" height="570" fill="url(#ground)" />
      <g stroke="#31527a" strokeWidth="2.5" fill="none" opacity="0.4">
        {[1035, 1075, 1125, 1185, 1255, 1330, 1420, 1520].map((y, i) => (
          <path key={y} d={`M-260 ${y}Q1200 ${y - 16 - i * 3} 2660 ${y}`} />
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <path key={i} d={`M${-300 + i * 150} 1570L${1200 + (-300 + i * 150 - 1200) * 0.3} 1010`} opacity="0.55" />
        ))}
      </g>

      {/* Snow gathered between the stones */}
      <g fill="#dce8f2" opacity="0.16">
        <ellipse cx="420" cy="1120" rx="210" ry="26" />
        <ellipse cx="1600" cy="1180" rx="290" ry="30" />
        <ellipse cx="980" cy="1290" rx="340" ry="34" />
        <ellipse cx="2160" cy="1120" rx="200" ry="24" />
      </g>

      {/* Warm light spilling from the shopfronts onto the cobbles */}
      <g className="spill">
        <ellipse cx="600" cy="1050" rx="210" ry="58" fill="url(#pool)" />
        <ellipse cx="1115" cy="1055" rx="180" ry="50" fill="url(#pool)" />
        <ellipse cx="1330" cy="1070" rx="190" ry="52" fill="url(#pool)" />
        <ellipse cx="1560" cy="1060" rx="170" ry="48" fill="url(#pool)" />
        <ellipse cx="1800" cy="1060" rx="160" ry="44" fill="url(#pool)" />
        <ellipse cx="2118" cy="1055" rx="150" ry="42" fill="url(#pool)" />
        <ellipse cx="325" cy="1045" rx="140" ry="40" fill="url(#pool)" opacity="0.6" />
      </g>

      {/* ---- Canal and the little bridge — day 14 ------------------------ */}
      <g>
        <path d="M0 1058h430l-52 86H0z" fill="url(#water)" />
        <g opacity="0.65">
          {[1076, 1096, 1118].map((y, i) => (
            <path
              key={y}
              className="ripple"
              style={{ '--delay': `${i * 1.3}s` } as CSSProperties}
              d={`M40 ${y}h${300 - i * 40}`}
              stroke="#8fb4d6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>
        <path d="M150 1000h244v22H150z" fill="#33567f" />
        <path d="M150 1022h244v18a122 46 0 00-244 0z" fill="#1c3252" />
        <path d="M150 1000h244v10H150z" fill="#e3edf5" opacity="0.7" />
        <g stroke="#3d6390" strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M162 1000v-34M210 998v-30M272 994v-30M334 998v-30M386 1000v-34" />
          <path d="M160 968h228" />
        </g>
        <g className={`zoneLit ${lit('bridge') ? 'on' : ''}`}>
          <ellipse cx="272" cy="1090" rx="86" ry="30" fill="#f2b84b" opacity="0.22" className="vShimmer" />
          <ellipse cx="272" cy="968" rx="70" ry="44" fill="url(#pool)" />
        </g>
      </g>

      {/* ---- Nativity crib — day 22 -------------------------------------- */}
      <g>
        <path d="M368 1074V990l62-44 62 44v84z" fill="url(#wood)" />
        <path d="M356 992l74-52 74 52-10 12-64-44-64 44z" fill="#e3edf5" opacity="0.65" />
        <path d="M398 1074v-44h64v44z" fill="#2a1d12" />
        <g className={`zoneLit ${lit('nativity-lantern') ? 'on' : ''}`}>
          <ellipse cx="430" cy="1030" rx="96" ry="76" fill="url(#pool)" />
          <path d="M414 1046c0-10 7-17 16-17s16 7 16 17z" fill="#ffd98a" opacity="0.9" />
          <circle cx="430" cy="1020" r="8" fill="#ffd98a" />
        </g>
        <rect x="422" y="994" width="16" height="22" rx="4" fill="#f2b84b" opacity="0.8" className="flicker" />
      </g>

      {/* ---- Florist stall — day 18 -------------------------------------- */}
      <g className="rv3">
        <path d="M502 1082V1014h156v68z" fill="url(#wood)" />
        <path d="M494 1016h172l-14-32H508z" fill="#244f44" />
        <path d="M494 1016h172v-10H494z" fill="#e3edf5" opacity="0.6" />
        <g stroke="#3a2a1a" strokeWidth="6">
          <path d="M508 1082v34M652 1082v34" />
        </g>
        <g className={`zoneLit ${lit('florist') ? 'on' : ''}`}>
          <ellipse cx="580" cy="1020" rx="120" ry="60" fill="url(#pool)" opacity="0.7" />
        </g>
        <g fill="url(#fir)">
          <path d="M524 1014c0-22 10-36 22-36s22 14 22 36z" />
          <path d="M576 1014c0-18 9-30 19-30s19 12 19 30z" />
          <path d="M620 1014c0-16 8-26 17-26s17 10 17 26z" />
        </g>
        <g fill="#b94242">
          {[[534, 1000], [548, 1008], [560, 996], [590, 1002], [604, 1008], [634, 1004]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" />
          ))}
        </g>
      </g>

      {/* ---- Market stall — day 10 --------------------------------------- */}
      <g className="rv2">
        <path d="M700 1068V996h180v72z" fill="url(#wood)" />
        <path d="M688 998h204l-16-46H704z" fill="#b94242" />
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} d={`M${706 + i * 36} 952h18l13 46h-18z`} fill="#f7f2e9" opacity="0.92" />
        ))}
        <path d="M688 998h204v-9H688z" fill="#e3edf5" opacity="0.7" />
        <g stroke="#3a2a1a" strokeWidth="6">
          <path d="M706 1068v40M876 1068v40M706 952v-8M876 952v-8" />
        </g>
        <g className={`zoneLit ${lit('market-stall') ? 'on' : ''}`}>
          <ellipse cx="790" cy="1010" rx="150" ry="70" fill="url(#pool)" opacity="0.8" />
        </g>
        {/* goods on the counter */}
        <g fill="#c9772f">
          <circle cx="726" cy="988" r="9" />
          <circle cx="746" cy="990" r="9" />
          <circle cx="766" cy="987" r="9" />
        </g>
        <g fill="#f7f2e9" opacity="0.85">
          <rect x="800" y="978" width="22" height="14" rx="3" />
          <rect x="828" y="980" width="22" height="12" rx="3" />
        </g>
        <path d="M700 948h180" stroke="#244f44" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* ---- Chestnut stall (later stage) -------------------------------- */}
      <g className="rv3">
        <path d="M1392 1076V1010h146v66z" fill="url(#wood)" />
        <path d="M1382 1012h166l-14-40h-138z" fill="#244f44" />
        {Array.from({ length: 4 }, (_, i) => (
          <path key={i} d={`M${1398 + i * 36} 972h16l12 40h-16z`} fill="#f7f2e9" opacity="0.88" />
        ))}
        <path d="M1382 1012h166v-9h-166z" fill="#e3edf5" opacity="0.65" />
        <circle cx="1465" cy="994" r="13" fill="#e88735" opacity="0.85" className="flicker" />
        <ellipse cx="1465" cy="1000" rx="90" ry="46" fill="url(#pool)" opacity="0.55" />
      </g>

      {/* ---- Postbox — day 3 --------------------------------------------- */}
      <g>
        <path d="M1010 1010V926a22 22 0 0144 0v84z" fill="#b94242" />
        <path d="M1010 926a22 22 0 0144 0v6h-44z" fill="#8f2f2f" />
        <rect x="1018" y="944" width="28" height="7" rx="3" fill="#2a1216" />
        <rect x="1006" y="1010" width="52" height="10" rx="3" fill="#2f537e" />
        <path d="M1010 926a22 22 0 0144 0" fill="none" stroke="#e3edf5" strokeWidth="4" opacity="0.5" />
        <g className={`zoneLit ${lit('postbox') ? 'on' : ''}`}>
          <ellipse cx="1032" cy="946" rx="70" ry="54" fill="url(#pool)" opacity="0.8" />
        </g>
      </g>

      {/* ---- Fountain — day 7 -------------------------------------------- */}
      <g>
        <ellipse cx="1180" cy="1076" rx="186" ry="52" fill="#2f537e" />
        <ellipse cx="1180" cy="1068" rx="176" ry="46" fill="url(#water)" />
        <ellipse cx="1180" cy="1060" rx="176" ry="44" fill="none" stroke="#3d6390" strokeWidth="7" />
        <path d="M1164 1026h32v32h-32z" fill="#2f537e" />
        <ellipse cx="1180" cy="1022" rx="62" ry="17" fill="#33567f" />
        <ellipse cx="1180" cy="1018" rx="62" ry="15" fill="url(#water)" />
        <path d="M1172 1006h16v-34h-16z" fill="#2f537e" />
        <circle cx="1180" cy="966" r="17" fill="#3d6390" />
        <path d="M1180 950v-22" stroke="#8fb4d6" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        {/* falling water + candlelight on the surface */}
        <g className="rv2">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              className="vDrop"
              style={{ '--delay': `${i * 0.8}s` } as CSSProperties}
              d={`M${1164 + i * 16} 980v18`}
              stroke="#cfe3f5"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </g>
        <g className={`zoneLit ${lit('fountain') ? 'on' : ''}`}>
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              className="vShimmer"
              style={{ '--delay': `${i * 1.1}s` } as CSSProperties}
              cx={1180 + (i - 1) * 54}
              cy={1064 + i * 8}
              rx={62 - i * 10}
              ry="9"
              fill="#f2b84b"
              opacity="0.45"
            />
          ))}
        </g>
        <g opacity="0.55">
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              className="ripple"
              style={{ '--delay': `${i * 1.6}s` } as CSSProperties}
              cx="1180"
              cy="1060"
              rx="90"
              ry="20"
              fill="none"
              stroke="#8fb4d6"
              strokeWidth="2.5"
            />
          ))}
        </g>
      </g>

      {/* ---- Violinist's open case — day 8 ------------------------------- */}
      <g className="rv2">
        <path d="M898 1064c0-16 18-26 42-26s42 10 42 26-18 26-42 26-42-10-42-26z" fill="#38281a" />
        <path d="M906 1058c0-12 15-20 34-20s34 8 34 20-15 20-34 20-34-8-34-20z" fill="#8f2f2f" />
        <path d="M896 1038l-16-20 8-6 18 20z" fill="#38281a" />
        <g className={`zoneLit ${lit('violin-case') ? 'on' : ''}`}>
          <ellipse cx="940" cy="1040" rx="100" ry="52" fill="url(#pool)" opacity="0.75" />
          <circle cx="928" cy="1054" r="4" fill="#f2b84b" />
          <circle cx="948" cy="1050" r="4" fill="#f2b84b" />
        </g>
      </g>

      {/* ---- Benches ------------------------------------------------------ */}
      <g fill="#3a2a1a" className="rv2">
        {[[1222, 1140], [1620, 1156]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="118" height="10" rx="4" />
            <rect x={x} y={y - 26} width="118" height="8" rx="4" opacity="0.85" />
            <rect x={x + 8} y={y + 10} width="9" height="26" />
            <rect x={x + 101} y={y + 10} width="9" height="26" />
            <rect x={x} y={y - 4} width="118" height="5" rx="2" fill="#e3edf5" opacity="0.35" />
          </g>
        ))}
      </g>

      {/* ---- Child's paper lantern — day 11 ------------------------------ */}
      <g className="rv2">
        <g className={`zoneLit ${lit('child-lantern') ? 'on' : ''}`}>
          <circle cx="1490" cy="1075" r="76" fill="url(#pool)" />
        </g>
        <path d="M1478 1062h24l6 26h-36z" fill="#f2b84b" opacity="0.9" className="flicker" />
        <path d="M1476 1058h28v5h-28z" fill="#b94242" />
        <path d="M1478 1088h24v4h-24z" fill="#b94242" />
        <path d="M1490 1058v-16" stroke="#8f6a3a" strokeWidth="3" />
      </g>

      {/* ---- The great Christmas tree — day 23 --------------------------- */}
      <g>
        <rect x="1728" y="1060" width="34" height="62" rx="4" fill="#3a2a1a" />
        <ellipse cx="1745" cy="1122" rx="96" ry="22" fill="#1c3252" />
        <path d="M1745 1050l128 60h-256z" fill="#1a3f36" />
        <g fill="url(#fir)">
          <path d="M1745 900l126 168h-252z" />
          <path d="M1745 790l104 148h-208z" />
          <path d="M1745 692l84 128h-168z" />
          <path d="M1745 584l64 112h-128z" />
        </g>
        <g fill="#f7f2e9" opacity="0.28">
          <path d="M1745 900l40 54-96 42z" />
          <path d="M1745 790l32 44-78 34z" />
          <path d="M1745 692l26 38-64 28z" />
        </g>
        {/* Tree star */}
        <g className="rv3">
          <circle cx="1745" cy="560" r="54" fill="url(#pool)" />
          <path d="M1745 528l11 26 28 4-20 20 5 28-24-14-24 14 5-28-20-20 28-4z" fill="#f2b84b" className="twinkle" />
        </g>
        {/* Ornaments arrive with the later stages */}
        <g className={`zoneLit ${lit('christmas-tree') ? 'on' : ''}`}>
          <ellipse cx="1745" cy="880" rx="220" ry="260" fill="url(#pool)" opacity="0.3" />
        </g>
        {ORNAMENTS.map((o, i) => (
          <g key={i} className={i < 8 ? 'rv3' : 'rv4'} style={{ '--d': `${(i % 8) * 0.14}s` } as CSSProperties}>
            <circle cx={o.x} cy={o.y} r="17" fill={o.c} opacity="0.18" />
            <circle
              cx={o.x}
              cy={o.y}
              r="7"
              fill={o.c}
              className="twinkle"
              style={{ '--tdur': `${3 + (i % 5) * 0.6}s`, '--delay': `${(i % 7) * 0.4}s` } as CSSProperties}
            />
          </g>
        ))}
        {/* Garland spirals */}
        <g className="rv4" fill="none" stroke="#f2b84b" strokeWidth="3.5" opacity="0.65">
          <path d="M1690 960q55 26 110 0" />
          <path d="M1706 860q40 20 80 0" />
          <path d="M1718 760q28 15 56 0" />
        </g>
      </g>

      {/* ---- Bare winter tree — day 12 ----------------------------------- */}
      <g stroke="#2a3f5e" fill="none" strokeLinecap="round">
        <path d="M1985 1010V806" strokeWidth="14" />
        <path d="M1985 866l-56-52M1985 838l52-46M1985 812l-40-58M1985 806l34-56M1985 892l-70-30M1985 880l64-26" strokeWidth="8" />
        <path d="M1929 814l-26-30M2037 792l30-26M1945 754l-20-36M2019 750l24-34M1915 862l-36-16M2049 854l32-14" strokeWidth="5" />
      </g>
      <g fill="#dce8f2" opacity="0.5">
        <ellipse cx="1929" cy="812" rx="16" ry="5" />
        <ellipse cx="2037" cy="790" rx="15" ry="5" />
        <ellipse cx="1985" cy="804" rx="14" ry="5" />
        <ellipse cx="1915" cy="860" rx="14" ry="4" />
      </g>
      <g className={`zoneLit ${lit('winter-branch') ? 'on' : ''}`}>
        <ellipse cx="1985" cy="790" rx="130" ry="110" fill="url(#pool)" opacity="0.6" />
        <g fill="#f2b84b">
          {[[1938, 800], [2024, 786], [1985, 762], [1952, 852], [2028, 846]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" className="twinkle" style={{ '--delay': `${i * 0.5}s` } as CSSProperties} />
          ))}
        </g>
      </g>

      {/* ---- Gift cart — day 20 ------------------------------------------ */}
      <g className="rv4">
        <path d="M1948 1064h176l-10-56h-156z" fill="url(#wood)" />
        <rect x="1944" y="1064" width="184" height="12" rx="4" fill="#3a2a1a" />
        <circle cx="1982" cy="1092" r="22" fill="none" stroke="#3a2a1a" strokeWidth="8" />
        <circle cx="2090" cy="1092" r="22" fill="none" stroke="#3a2a1a" strokeWidth="8" />
        <path d="M2124 1030l46-22" stroke="#3a2a1a" strokeWidth="7" strokeLinecap="round" />
        <g>
          <rect x="1966" y="962" width="52" height="46" rx="4" fill="#b94242" />
          <path d="M1992 962v46M1966 984h52" stroke="#f2b84b" strokeWidth="5" />
          <rect x="2026" y="974" width="44" height="34" rx="4" fill="#244f44" />
          <path d="M2048 974v34M2026 990h44" stroke="#f7f2e9" strokeWidth="4" />
          <rect x="2076" y="968" width="38" height="40" rx="4" fill="#d98d7c" />
          <path d="M2095 968v40M2076 987h38" stroke="#fff7e7" strokeWidth="4" />
        </g>
        <g className={`zoneLit ${lit('gift-cart') ? 'on' : ''}`}>
          <ellipse cx="2035" cy="1010" rx="150" ry="80" fill="url(#pool)" opacity="0.7" />
        </g>
      </g>

      {/* ---- String lights across the square ----------------------------- */}
      <StringLights
        d={catenary(902, 792, 1240, 786, 74)}
        bulbs={bulbsAlong(902, 792, 1240, 786, 74, 7)}
        tier={2}
      />
      <StringLights
        d={catenary(1240, 786, 1676, 770, 82)}
        bulbs={bulbsAlong(1240, 786, 1676, 770, 82, 9)}
        tier={2}
        offset={7}
      />
      <StringLights
        d={catenary(400, 836, 902, 792, 90)}
        bulbs={bulbsAlong(400, 836, 902, 792, 90, 8)}
        tier={3}
        offset={16}
      />
      <StringLights
        d={catenary(1676, 770, 2180, 800, 88)}
        bulbs={bulbsAlong(1676, 770, 2180, 800, 88, 9)}
        tier={4}
        offset={24}
      />

      {/* ---- Church steps ------------------------------------------------- */}
      <g fill="#33567f">
        <path d="M486 1010h228v16H486z" />
        <path d="M470 1026h260v18H470z" opacity="0.9" />
        <path d="M452 1044h296v20H452z" opacity="0.8" />
      </g>
      <g fill="#e3edf5" opacity="0.2">
        <path d="M486 1010h228v5H486zM470 1026h260v5H470zM452 1044h296v5H452z" />
      </g>
    </LayerSvg>
  );
}
