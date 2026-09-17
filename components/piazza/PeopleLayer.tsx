import type { CSSProperties } from 'react';
import { LAYER_DEPTH, type SceneBox } from '@/data/sceneConfig';
import { LayerSvg } from './LayerSvg';

type Tier = 1 | 2 | 3 | 4;

interface FigureProps {
  x: number;
  y: number;
  s?: number;
  tier?: Tier;
  coat?: string;
  accent?: string;
  /** Adds a carried lantern with its own pool of light. */
  lantern?: boolean;
  child?: boolean;
  /** Holds a folder of sheet music (choir). */
  music?: boolean;
  d?: number;
  breathe?: boolean;
}

/**
 * A townsperson, drawn as a warm-edged silhouette so the square stays
 * illustrative rather than cartoon-like.
 */
function Figure({
  x,
  y,
  s = 1,
  tier = 1,
  coat = '#12294a',
  accent = '#b94242',
  lantern = false,
  child = false,
  music = false,
  d = 0,
  breathe = false,
}: FigureProps) {
  const k = child ? 0.74 : 1;
  const hem = -22 * k;
  const shoulder = -68 * k;
  const head = -82 * k;
  /* Placement lives on an outer group: the reveal classes animate CSS
     transforms, which would otherwise replace this transform attribute. */
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={`rv${tier}`} style={{ '--d': `${d}s` } as CSSProperties}>
        <ellipse cx="0" cy="3" rx={19 * k} ry="5.5" fill="#050d1a" opacity="0.45" />
        <g className={breathe ? 'vBreathe' : undefined} style={{ '--delay': `${d}s` } as CSSProperties}>
          {/* legs */}
          <path d={`M-9 0v${hem - 2}h7v${-hem + 2}z M2 0v${hem - 2}h7v${-hem + 2}z`} fill="#091a33" />
          {/* winter coat */}
          <path
            d={`M-14 ${hem}Q-15 ${shoulder + 8} -8 ${shoulder}Q0 ${shoulder - 6} 8 ${shoulder}Q15 ${shoulder + 8} 14 ${hem}Z`}
            fill={coat}
          />
          {/* scarf */}
          <path
            d={`M-8 ${shoulder}Q0 ${shoulder + 5} 8 ${shoulder}L9 ${shoulder + 9}Q0 ${shoulder + 14} -9 ${shoulder + 9}Z`}
            fill={accent}
          />
          <path
            d={`M5 ${shoulder + 9}q7 9 4 20l-7-2q3-9-2-16z`}
            fill={accent}
            opacity="0.9"
          />
          <circle cx="0" cy={head} r={9.5 * k} fill={coat} />
          {/* knitted cap */}
          <path d={`M${-10 * k} ${head - 3}q${10 * k} ${-13 * k} ${20 * k} 0z`} fill={accent} opacity="0.95" />
          {!child && <rect x={-11 * k} y={head - 4} width={22 * k} height={3.4} rx="1.6" fill={accent} />}
          {/* warm rim light from the square */}
          <path
            d={`M8 ${shoulder}Q15 ${shoulder + 8} 14 ${hem}`}
            stroke="#f2b84b"
            strokeWidth="2.2"
            opacity="0.5"
            fill="none"
          />
          <path
            d={`M${6 * k} ${head - 7}a${9.5 * k} ${9.5 * k} 0 0 1 ${3 * k} ${13 * k}`}
            stroke="#f2b84b"
            strokeWidth="1.8"
            opacity="0.45"
            fill="none"
          />
          {music && (
            <g>
              <path d={`M-5 ${hem - 16}l24-8v18l-24 8z`} fill="#f7f2e9" opacity="0.9" />
              <path d={`M-5 ${hem - 16}l24-8`} stroke="#0a1729" strokeWidth="1.6" />
              <path d={`M-14 ${hem - 12}q6 -6 10 -4`} stroke={coat} strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
          )}
          {lantern && (
            <g>
              <path d={`M13 ${shoulder + 22}q12 3 14 17`} stroke={coat} strokeWidth="6" fill="none" strokeLinecap="round" />
              <circle cx="28" cy={shoulder + 44} r="24" fill="#f2b84b" opacity="0.22" />
              <rect x="22" y={shoulder + 36} width="12" height="16" rx="3" fill="#ffd98a" className="flicker" />
              <path d={`M22 ${shoulder + 34}h12M24 ${shoulder + 52}h8`} stroke="#3a2a1a" strokeWidth="2.4" />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}


/**
 * Production asset slot: replace these demo silhouettes with the supplied
 * character illustrations (same anchor points, same reveal tiers).
 */
export function PeopleLayer({ view }: { view: SceneBox }) {
  return (
    <LayerSvg view={view} depth={LAYER_DEPTH.people} z={4}>
      {/* ---- Café terrace (furniture + guests travel together) ----------- */}
      <g className="rv1">
        <ellipse cx="1352" cy="1092" rx="46" ry="13" fill="#3a2a1a" />
        <path d="M1346 1092h12v34h-12z" fill="#3a2a1a" />
        <path d="M1326 1126h52v7h-52z" fill="#3a2a1a" />
        <circle cx="1352" cy="1082" r="8" fill="#f2b84b" className="flicker" />
        <circle cx="1352" cy="1082" r="26" fill="#f2b84b" opacity="0.16" />
        {[1290, 1414].map((cx) => (
          <g key={cx} fill="#33244a" opacity="0.9">
            <path d={`M${cx - 16} 1096h32v6h-32z`} fill="#3a2a1a" />
            <path d={`M${cx - 14} 1102h6v28h-6zM${cx + 8} 1102h6v28h-6z`} fill="#3a2a1a" />
            <path d={`M${cx - 16} 1066h6v30h-6z`} fill="#3a2a1a" />
          </g>
        ))}
      </g>

      {/* ---- Stage 1: the square is nearly empty ------------------------- */}
      <Figure x={614} y={1074} s={0.95} tier={1} coat="#12294a" accent="#244f44" />
      <Figure x={1152} y={1122} s={1.12} tier={1} coat="#132b4d" accent="#b94242" d={0.4} />

      {/* ---- Stage 2: lanterns cross the square -------------------------- */}
      <Figure x={930} y={1032} s={0.95} tier={2} coat="#14274a" accent="#8f2f2f" d={0.2} />
      {/* the violinist and her bow */}
      <g className="rv2" style={{ '--d': '0.2s' } as CSSProperties}>
        <path d="M938 992l24-12" stroke="#c9a06a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M924 986c0-7 6-12 13-12s13 5 13 12-6 12-13 12-13-5-13-12z" fill="#6b3f22" />
      </g>
      <Figure x={1308} y={1170} s={1.2} tier={2} coat="#11294c" accent="#b94242" lantern d={0.3} />
      <Figure x={1372} y={1172} s={1.16} tier={2} coat="#152d50" accent="#d98d7c" d={0.45} />
      <Figure x={1516} y={1128} s={0.88} tier={2} coat="#13294a" accent="#f2b84b" child lantern d={0.6} />
      {/* a small dog */}
      <g className="rv2" style={{ '--d': '0.5s' } as CSSProperties}>
        <path d="M1212 1190c0-9 7-15 16-15h22c9 0 16 6 16 15v6h-54z" fill="#11294c" />
        <circle cx="1264" cy="1172" r="10" fill="#11294c" />
        <path d="M1258 1164l-5-10 10 4z" fill="#11294c" />
        <path d="M1210 1180q-12-6-10-18" stroke="#11294c" strokeWidth="5" fill="none" strokeLinecap="round" className="vTail" />
      </g>

      {/* ---- Stage 3: the community gathers ------------------------------ */}
      {/* The choir gathers in the near foreground, facing the church */}
      <g>
        <Figure x={530} y={1252} s={1.16} tier={3} coat="#12294a" accent="#244f44" music breathe d={0} />
        <Figure x={600} y={1244} s={1.12} tier={3} coat="#15304f" accent="#b94242" music breathe d={0.3} />
        <Figure x={670} y={1254} s={1.18} tier={3} coat="#12294a" accent="#2e6455" music breathe d={0.6} />
        <Figure x={740} y={1242} s={1.1} tier={3} coat="#16325a" accent="#d98d7c" music breathe d={0.9} />
        <Figure x={810} y={1252} s={1.15} tier={3} coat="#12294a" accent="#244f44" music breathe d={1.2} />
        <Figure x={880} y={1240} s={1.08} tier={3} coat="#15304f" accent="#8f2f2f" music breathe d={1.5} />
        {/* breath in the cold air */}
        <g fill="#dce8f2">
          {[530, 670, 810].map((x, i) => (
            <circle
              key={x}
              className="vPuff"
              style={{ '--delay': `${i * 1.4}s` } as CSSProperties}
              cx={x + 16}
              cy={1146}
              r="7"
            />
          ))}
        </g>
      </g>
      {/* café guests */}
      <Figure x={1290} y={1096} s={0.9} tier={3} coat="#14274a" accent="#b94242" d={0.2} />
      <Figure x={1414} y={1096} s={0.88} tier={3} coat="#12294a" accent="#f2b84b" d={0.4} />
      {/* market shoppers */}
      <Figure x={452} y={1128} s={1} tier={3} coat="#15304f" accent="#244f44" d={0.6} />
      <Figure x={1086} y={1136} s={1.06} tier={3} coat="#11294c" accent="#d98d7c" d={0.8} />

      {/* ---- Stage 4: Christmas Eve, the square is full ------------------ */}
      <Figure x={1642} y={1186} s={1.2} tier={4} coat="#12294a" accent="#b94242" d={0.1} />
      <Figure x={1702} y={1200} s={0.86} tier={4} coat="#15304f" accent="#f2b84b" child lantern d={0.3} />
      <Figure x={1760} y={1204} s={0.82} tier={4} coat="#13294a" accent="#d98d7c" child d={0.5} />
      <Figure x={1848} y={1180} s={1.18} tier={4} coat="#11294c" accent="#244f44" lantern d={0.7} />
      <Figure x={2046} y={1152} s={1.1} tier={4} coat="#14274a" accent="#8f2f2f" d={0.9} />
      <Figure x={2168} y={1140} s={1.06} tier={4} coat="#12294a" accent="#f2b84b" d={1.1} />
      <Figure x={962} y={1190} s={1.22} tier={4} coat="#11294c" accent="#b94242" lantern d={0.2} />
      <Figure x={1030} y={1198} s={1.2} tier={4} coat="#15304f" accent="#2e6455" d={0.45} />
      <Figure x={1096} y={1188} s={0.92} tier={4} coat="#13294a" accent="#d98d7c" child d={0.65} />

    </LayerSvg>
  );
}
