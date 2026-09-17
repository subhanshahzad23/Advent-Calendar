import type { CSSProperties } from 'react';
import { LAYER_DEPTH, type SceneBox } from '@/data/sceneConfig';
import { onCircle } from '@/lib/seed';
import { LayerSvg } from './LayerSvg';

interface TownProps {
  view: SceneBox;
  lit: (zoneId: string) => boolean;
}

/** A lit or unlit window. `tier` decides which progressive stage switches it on. */
function Win({
  x,
  y,
  w,
  h,
  tier = 1,
  arch = false,
  warm = '#f2b84b',
  flicker = false,
  i = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tier?: 1 | 2 | 3 | 4;
  arch?: boolean;
  warm?: string;
  flicker?: boolean;
  i?: number;
}) {
  const r = arch ? w / 2 : 3;
  const d = arch
    ? `M${x} ${y + h} V${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h} Z`
    : undefined;
  const style = { '--d': `${i * 0.09}s`, '--fdur': `${4.4 + (i % 5) * 0.7}s` } as CSSProperties;
  return (
    <g>
      {/* The dark pane is always there; only the light arrives with the stage. */}
      {arch ? (
        <path d={d} fill="#16304f" />
      ) : (
        <rect x={x} y={y} width={w} height={h} rx={r} fill="#16304f" />
      )}
      <g className={`rv${tier}`} style={style}>
        <ellipse
          cx={x + w / 2}
          cy={y + h / 2}
          rx={w * 2.1}
          ry={h * 1.7}
          fill="url(#winGlow)"
          opacity="0.5"
        />
        {arch ? (
          <path d={d} fill={warm} className={flicker ? 'flicker' : undefined} style={style} />
        ) : (
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            rx={r}
            fill={warm}
            className={flicker ? 'flicker' : undefined}
            style={style}
          />
        )}
      </g>
      <rect x={x} y={y + h / 2 - 1.4} width={w} height={2.8} fill="#10233f" opacity="0.6" />
      <rect x={x + w / 2 - 1.4} y={y} width={2.8} height={h} fill="#10233f" opacity="0.6" />
    </g>
  );
}

/**
 * Production asset slot: replace this demo SVG layer with the supplied
 * town / church façade illustration asset.
 */
export function TownLayer({ view, lit }: TownProps) {
  return (
    <LayerSvg view={view} depth={LAYER_DEPTH.town} z={2}>
      <defs>
        <linearGradient id="faceA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#24466f" />
          <stop offset="100%" stopColor="#152c4c" />
        </linearGradient>
        <linearGradient id="faceB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a60" />
          <stop offset="100%" stopColor="#122744" />
        </linearGradient>
        <linearGradient id="faceC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4a72" />
          <stop offset="100%" stopColor="#18314f" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#32587f" />
          <stop offset="100%" stopColor="#1d3a5e" />
        </linearGradient>
        <radialGradient id="winGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#e88735" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="roseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f2b84b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="doorGlow" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---- Left row houses -------------------------------------------- */}
      <g>
        <path d="M0 1010V690l64-46 64 46v320z" fill="url(#faceB)" />
        <path d="M0 690l64-46 64 46-12 10-52-38-52 38z" fill="#e3edf5" opacity="0.8" />
        <rect x="128" y="712" width="118" height="298" fill="url(#faceA)" />
        <path d="M120 716l67-44 67 44z" fill="#132743" />
        <path d="M120 716l67-44 67 44-10 9-57-36-57 36z" fill="#e3edf5" opacity="0.75" />
        <Win x={28} y={742} w={34} h={52} tier={2} i={1} />
        <Win x={82} y={742} w={34} h={52} tier={4} i={2} />
        <Win x={40} y={858} w={30} h={46} tier={3} i={3} />
        <Win x={152} y={772} w={32} h={50} tier={1} flicker i={4} />
        <Win x={200} y={772} w={32} h={50} tier={3} i={5} />
        <Win x={176} y={880} w={36} h={54} tier={2} i={6} />
      </g>

      {/* ---- Bell tower --------------------------------------------------- */}
      <g>
        <path d="M252 306h146v704H252z" fill="url(#faceC)" />
        <path d="M325 168l86 140H239z" fill="#132743" />
        <path d="M325 168l86 140-16 3-70-112-70 112-16-3z" fill="#e3edf5" opacity="0.55" />
        <circle cx="325" cy="150" r="9" fill="#f2b84b" />
        <path d="M325 141v-26" stroke="#f2b84b" strokeWidth="4" strokeLinecap="round" />
        <rect x="240" y="298" width="170" height="20" rx="5" fill="url(#stone)" />
        <rect x="244" y="430" width="162" height="16" rx="4" fill="url(#stone)" />
        <rect x="246" y="600" width="158" height="14" rx="4" fill="url(#stone)" />

        {/* Belfry opening — day 1 */}
        <path d="M296 400V356a29 29 0 0158 0v44z" fill="#0c1c33" />
        <g className={`zoneLit ${lit('bell-tower-window') ? 'on' : ''}`}>
          <path d="M296 400V356a29 29 0 0158 0v44z" fill="#f2b84b" opacity="0.78" className="flicker" />
          <ellipse cx="325" cy="372" rx="88" ry="72" fill="url(#roseGlow)" opacity="0.5" />
        </g>
        {/* The bell */}
        <path d="M313 352c0-8 5-13 12-13s12 5 12 13v22h-24z" fill="#0a1729" opacity="0.85" />

        <Win x={300} y={492} w={50} h={72} arch tier={3} i={2} />
        <Win x={302} y={668} w={46} h={66} arch tier={4} i={3} />
        <rect x="252" y="836" width="146" height="174" fill="#10233f" opacity="0.25" />
      </g>

      {/* ---- Church façade ------------------------------------------------ */}
      <g>
        <path d="M398 1010V470h404v540z" fill="url(#faceC)" />
        <path d="M386 478L600 322l214 156z" fill="#173156" />
        <path d="M386 478L600 322l214 156-18 12-196-142-196 142z" fill="#e3edf5" opacity="0.8" />
        <path d="M600 322v-44" stroke="#f2b84b" strokeWidth="5" strokeLinecap="round" />
        <path d="M584 292h32" stroke="#f2b84b" strokeWidth="5" strokeLinecap="round" />
        <rect x="390" y="470" width="420" height="18" rx="5" fill="url(#stone)" />
        <rect x="404" y="900" width="392" height="14" rx="4" fill="url(#stone)" opacity="0.8" />

        {/* Rose window — day 13 */}
        <circle cx="600" cy="560" r="72" fill="#123055" stroke="#2f537e" strokeWidth="7" />
        {/* The window warms as the community gathers, then brightens again
            once day 13 itself has been opened. */}
        <g className="rv3">
          <circle cx="600" cy="560" r="120" fill="url(#roseGlow)" opacity="0.32" />
          <circle cx="600" cy="560" r="66" fill="#f2b84b" opacity="0.26" />
        </g>
        <g className={`zoneLit ${lit('rose-window') ? 'on' : ''}`}>
          <circle cx="600" cy="560" r="150" fill="url(#roseGlow)" opacity="0.55" />
          <circle cx="600" cy="560" r="66" fill="#f2b84b" opacity="0.5" />
        </g>
        <g stroke="#3a6390" strokeWidth="4" fill="none">
          <circle cx="600" cy="560" r="26" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            const inner = onCircle(600, 560, 26, a);
            const outer = onCircle(600, 560, 66, a);
            const petal = onCircle(600, 560, 46, a + Math.PI / 8);
            return (
              <g key={i}>
                <path d={`M${inner.x} ${inner.y}L${outer.x} ${outer.y}`} />
                <circle cx={petal.x} cy={petal.y} r="11" />
              </g>
            );
          })}
        </g>

        {/* Chapel candle window — day 2 */}
        <path d="M444 660V612a26 26 0 0152 0v48z" fill="#0c1c33" />
        <g className={`zoneLit ${lit('chapel-candle') ? 'on' : ''}`}>
          <path d="M444 660V612a26 26 0 0152 0v48z" fill="#ffd98a" opacity="0.85" className="flicker" />
          <ellipse cx="470" cy="628" rx="72" ry="62" fill="url(#roseGlow)" opacity="0.55" />
        </g>
        <Win x={686} y={606} w={52} h={74} arch tier={2} i={2} />
        <Win x={444} y={742} w={52} h={70} arch tier={3} i={3} />
        <Win x={686} y={742} w={52} h={70} arch tier={4} i={4} />

        {/* Great door — day 9 */}
        <path d="M534 1010V830a66 66 0 01132 0v180z" fill="#0b1b31" />
        <path d="M534 1010V830a66 66 0 01132 0v180z" fill="none" stroke="url(#stone)" strokeWidth="9" />
        <g className={`zoneLit ${lit('church-door') ? 'on' : ''}`}>
          <path d="M548 1010V836a52 52 0 01104 0v174z" fill="url(#doorGlow)" />
          <ellipse cx="600" cy="1000" rx="150" ry="70" fill="#f2b84b" opacity="0.2" />
        </g>
        <path d="M600 900v110" stroke="#0a1729" strokeWidth="4" opacity="0.7" />

        {/* Choir side wing — day 15 */}
        <path d="M802 1010V640h104v370z" fill="url(#faceB)" />
        <path d="M794 648l60-38 60 38z" fill="#132743" />
        <path d="M794 648l60-38 60 38-10 8-50-30-50 30z" fill="#e3edf5" opacity="0.7" />
        <path d="M812 1010V844a24 24 0 0148 0v166z" fill="#0b1b31" />
        <g className={`zoneLit ${lit('choir-door') ? 'on' : ''}`}>
          <path d="M812 1010V844a24 24 0 0148 0v166z" fill="#ffd98a" opacity="0.62" />
          <ellipse cx="836" cy="1006" rx="96" ry="48" fill="#f2b84b" opacity="0.2" />
        </g>
        <Win x={866} y={700} w={30} h={44} tier={3} i={5} />
      </g>

      {/* ---- Dome behind the church -------------------------------------- */}
      <g>
        <path d="M886 1010V620h132v390z" fill="url(#faceB)" opacity="0.95" />
        <path d="M886 620a66 66 0 01132 0z" fill="#173156" />
        <path d="M886 620a66 66 0 01132 0" fill="none" stroke="#e3edf5" strokeWidth="5" opacity="0.5" />
        <rect x="934" y="506" width="36" height="52" rx="4" fill="#173156" />
        <path d="M934 506a18 18 0 0136 0z" fill="#2f537e" />
        <path d="M952 494v-30M940 472h24" stroke="#f2b84b" strokeWidth="4" strokeLinecap="round" />
        <Win x={926} y={700} w={40} h={58} arch tier={4} i={2} />
      </g>

      {/* ---- Bookshop — day 6 --------------------------------------------- */}
      <g>
        <path d="M1022 1010V648h208v362z" fill="url(#faceA)" />
        <path d="M1012 656l114-64 114 64z" fill="#132743" />
        <path d="M1012 656l114-64 114 64-12 9-102-52-102 52z" fill="#e3edf5" opacity="0.8" />
        <rect x="1022" y="800" width="208" height="12" fill="url(#stone)" opacity="0.7" />

        <path d="M1060 742V666a55 55 0 01110 0v76z" fill="#0c1c33" />
        <g className={`zoneLit ${lit('bookshop') ? 'on' : ''}`}>
          <path d="M1060 742V666a55 55 0 01110 0v76z" fill="#f2b84b" opacity="0.72" />
          <ellipse cx="1115" cy="700" rx="130" ry="100" fill="url(#roseGlow)" opacity="0.5" />
          {/* shelves in silhouette */}
          <g fill="#0b1b31" opacity="0.75">
            <rect x="1074" y="690" width="10" height="42" />
            <rect x="1088" y="700" width="8" height="32" />
            <rect x="1100" y="686" width="11" height="46" />
            <rect x="1116" y="696" width="9" height="36" />
            <rect x="1130" y="688" width="12" height="44" />
            <rect x="1147" y="702" width="8" height="30" />
          </g>
        </g>
        {/* Shopfront */}
        <rect x="1042" y="846" width="76" height="164" rx="4" fill="#16304f" />
        <rect x="1042" y="846" width="76" height="164" rx="4" fill="#f2b84b" opacity="0.28" className="rv3" />
        <rect x="1136" y="880" width="74" height="130" rx="4" fill="#16304f" />
        <rect x="1136" y="880" width="74" height="130" rx="4" fill="#ffd98a" opacity="0.22" className="rv2" />
        <rect x="1030" y="826" width="192" height="14" rx="4" fill="#244f44" />
      </g>

      {/* ---- Café with striped awning — days 4 & 17 ----------------------- */}
      <g>
        <path d="M1242 1010V602h226v408z" fill="url(#faceC)" />
        <path d="M1232 610h246l-10-14H1242z" fill="#132743" />
        <path d="M1232 610h246v-10H1232z" fill="#e3edf5" opacity="0.7" />
        <rect x="1242" y="742" width="226" height="10" fill="url(#stone)" opacity="0.6" />

        {/* Cat window — day 17 */}
        <rect x="1240" y="558" width="70" height="82" rx="4" fill="#16304f" />
        <g className={`zoneLit ${lit('cat-sill') ? 'on' : ''}`}>
          <rect x="1240" y="558" width="70" height="82" rx="4" fill="#ffd98a" opacity="0.7" />
          <ellipse cx="1275" cy="600" rx="90" ry="76" fill="url(#roseGlow)" opacity="0.45" />
          {/* the cat, seated */}
          <g fill="#0b1b31">
            <path d="M1258 640v-26c0-11 8-19 18-19s18 8 18 19v26z" />
            <path d="M1262 596l-4-14 12 6zM1290 596l4-14-12 6z" />
            <path d="M1294 640c8-4 12-12 11-20l5 1c1 11-4 20-14 25z" />
          </g>
        </g>
        <rect x="1236" y="640" width="80" height="8" rx="3" fill="url(#stone)" />
        <Win x={1348} y={562} w={44} h={62} tier={2} i={2} />
        <Win x={1412} y={562} w={44} h={62} tier={4} i={3} />

        {/* Striped awning */}
        <g className="rv1">
          <path d="M1232 792h246v46l-246 6z" fill="#b94242" />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${1232 + i * 42} 792h21v52l-21 .5z`} fill="#f7f2e9" opacity="0.92" />
          ))}
          <path
            d="M1232 844q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0q10 14 20 0"
            fill="none"
            stroke="#8f2f2f"
            strokeWidth="6"
          />
          <rect x="1228" y="786" width="254" height="10" rx="4" fill="#244f44" />
        </g>
        <rect x="1256" y="860" width="88" height="150" rx="4" fill="#16304f" />
        <rect x="1256" y="860" width="88" height="150" rx="4" fill="#f2b84b" opacity="0.26" className="rv2" />
        <rect x="1366" y="880" width="80" height="130" rx="4" fill="#16304f" />
        <rect x="1366" y="880" width="80" height="130" rx="4" fill="#ffd98a" opacity="0.2" className="rv3" />
      </g>

      {/* ---- Bakery — day 5 ----------------------------------------------- */}
      <g>
        <path d="M1480 1010V628h182v382z" fill="url(#faceB)" />
        <path d="M1470 636l101-56 101 56z" fill="#132743" />
        <path d="M1470 636l101-56 101 56-11 9-90-45-90 45z" fill="#e3edf5" opacity="0.78" />

        <rect x="1496" y="616" width="100" height="92" rx="6" fill="#0c1c33" />
        <g className={`zoneLit ${lit('bakery-window') ? 'on' : ''}`}>
          <rect x="1496" y="616" width="100" height="92" rx="6" fill="#f2b84b" opacity="0.8" />
          <ellipse cx="1546" cy="662" rx="128" ry="104" fill="url(#roseGlow)" opacity="0.55" />
          <g fill="#0b1b31" opacity="0.7">
            <ellipse cx="1518" cy="692" rx="15" ry="9" />
            <ellipse cx="1548" cy="694" rx="15" ry="9" />
            <ellipse cx="1578" cy="692" rx="14" ry="9" />
            <rect x="1506" y="654" width="80" height="6" rx="3" />
          </g>
        </g>
        <rect x="1490" y="708" width="112" height="9" rx="3" fill="url(#stone)" />
        <Win x={1614} y={624} w={36} h={52} tier={3} i={2} />
        <Win x={1614} y={742} w={36} h={52} tier={4} i={3} />

        <rect x="1494" y="860" width="150" height="150" rx="5" fill="#16304f" />
        <rect x="1494" y="860" width="150" height="150" rx="5" fill="#ffd98a" opacity="0.3" className="rv1" />
        <rect x="1486" y="840" width="168" height="14" rx="5" fill="#b94242" />
      </g>

      {/* ---- Clock building — days 19 & 21 -------------------------------- */}
      <g>
        <path d="M1672 1010V582h216v428z" fill="url(#faceA)" />
        <path d="M1662 590l118-62 118 62z" fill="#132743" />
        <path d="M1662 590l118-62 118 62-12 9-106-50-106 50z" fill="#e3edf5" opacity="0.8" />

        {/* Rooftop star on a mast — day 19 */}
        <path d="M1700 556v-186" stroke="#2f537e" strokeWidth="6" strokeLinecap="round" />
        <g className={`zoneLit ${lit('roof-star') ? 'on' : ''}`}>
          <circle cx="1700" cy="330" r="74" fill="url(#roseGlow)" opacity="0.7" />
        </g>
        <path
          d="M1700 296l10 26 26 10-26 10-10 26-10-26-26-10 26-10z"
          fill="#f2b84b"
          className="twinkle"
          style={{ '--tdur': '5s' } as CSSProperties}
        />

        {/* Clock tower — day 21 */}
        <path d="M1738 582V404h114v178z" fill="url(#faceC)" />
        <path d="M1726 406l69-58 69 58z" fill="#132743" />
        <path d="M1726 406l69-58 69 58-10 9-59-38-59 38z" fill="#e3edf5" opacity="0.7" />
        <circle cx="1795" cy="470" r="44" fill="#12294a" stroke="url(#stone)" strokeWidth="6" />
        <g className={`zoneLit ${lit('town-clock') ? 'on' : ''}`}>
          <circle cx="1795" cy="470" r="40" fill="#f7f2e9" opacity="0.85" />
          <circle cx="1795" cy="470" r="86" fill="url(#roseGlow)" opacity="0.4" />
        </g>
        <g stroke="#10233f" strokeWidth="4" strokeLinecap="round" opacity="0.9">
          <path d="M1795 470V444" />
          <path d="M1795 470l19 12" />
        </g>
        <circle cx="1795" cy="470" r="4" fill="#10233f" />

        <Win x={1694} y={640} w={40} h={58} tier={2} i={2} />
        <Win x={1760} y={640} w={40} h={58} tier={1} flicker i={3} />
        <Win x={1826} y={640} w={40} h={58} tier={3} i={4} />
        <Win x={1694} y={770} w={40} h={58} tier={4} i={5} />
        <Win x={1826} y={770} w={40} h={58} tier={2} i={6} />
        <rect x="1738" y="880" width="120" height="130" rx="5" fill="#16304f" />
        <rect x="1738" y="880" width="120" height="130" rx="5" fill="#f2b84b" opacity="0.24" className="rv3" />
      </g>

      {/* ---- Right houses & stable courtyard — day 16 --------------------- */}
      <g>
        <path d="M1898 1010V678h164v332z" fill="url(#faceB)" />
        <path d="M1888 686l92-52 92 52z" fill="#132743" />
        <path d="M1888 686l92-52 92 52-11 9-81-42-81 42z" fill="#e3edf5" opacity="0.75" />
        <Win x={1920} y={714} w={38} h={54} tier={3} i={2} />
        <Win x={1998} y={714} w={38} h={54} tier={2} i={3} />
        <Win x={1958} y={836} w={44} h={60} tier={4} i={4} />

        {/* Stable arch */}
        <path d="M2062 1010V708h118v302z" fill="url(#faceC)" />
        <path d="M2052 716l69-40 69 40z" fill="#132743" />
        <path d="M2052 716l69-40 69 40-9 8-60-30-60 30z" fill="#e3edf5" opacity="0.7" />
        <path d="M2078 1010V872a40 40 0 0180 0v138z" fill="#09182d" />
        <g className={`zoneLit ${lit('stable-yard') ? 'on' : ''}`}>
          <path d="M2082 1010V874a36 36 0 0172 0v136z" fill="url(#doorGlow)" />
          <ellipse cx="2118" cy="1004" rx="118" ry="56" fill="#f2b84b" opacity="0.22" />
        </g>
        <path d="M2078 1010V872a40 40 0 0180 0v138z" fill="none" stroke="url(#stone)" strokeWidth="8" />

        <path d="M2180 1010V648h220v362z" fill="url(#faceA)" />
        <path d="M2170 656l120-66 120 66z" fill="#132743" />
        <path d="M2170 656l120-66 120 66-12 9-108-54-108 54z" fill="#e3edf5" opacity="0.8" />
        <Win x={2208} y={690} w={40} h={58} tier={1} flicker i={2} />
        <Win x={2286} y={690} w={40} h={58} tier={3} i={3} />
        <Win x={2350} y={690} w={34} h={58} tier={4} i={4} />
        <Win x={2208} y={818} w={40} h={58} tier={2} i={5} />
        <Win x={2286} y={818} w={40} h={58} tier={4} i={6} />
        <rect x="2222" y="900" width="120" height="110" rx="5" fill="#16304f" />
        <rect x="2222" y="900" width="120" height="110" rx="5" fill="#ffd98a" opacity="0.2" className="rv4" />
      </g>
    </LayerSvg>
  );
}
