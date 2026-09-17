import type { CSSProperties } from 'react';
import { LAYER_DEPTH, type SceneBox } from '@/data/sceneConfig';
import { LayerSvg } from './LayerSvg';

/**
 * Production asset slot: replace this demo SVG layer with the supplied
 * foreground / framing illustration asset.
 */
export function ForegroundLayer({ view }: { view: SceneBox }) {
  return (
    <LayerSvg view={view} depth={LAYER_DEPTH.foreground} z={5}>
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#e88735" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e88735" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fgFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081326" stopOpacity="0" />
          <stop offset="100%" stopColor="#060f1f" stopOpacity="0.78" />
        </linearGradient>
      </defs>

      {/* ---- Tall square lanterns ---------------------------------------- */}
      {[
        { x: 152, flip: false },
        { x: 2268, flip: true },
      ].map(({ x }) => (
        <g key={x}>
          <circle cx={x} cy={906} r="150" fill="url(#lampGlow)" />
          <rect x={x - 9} y={922} width="18" height="430" fill="#07101f" />
          <path d={`M${x - 26} 1330h52v22h-52z`} fill="#07101f" />
          <path d={`M${x - 30} 926h60l-14-22h-32z`} fill="#07101f" />
          <path d={`M${x - 24} 904l24-40 24 40z`} fill="#07101f" />
          <rect
            x={x - 22}
            y={846}
            width="44"
            height="60"
            rx="4"
            fill="#f2b84b"
            className="flicker"
            style={{ '--fdur': '6.5s' } as CSSProperties}
          />
          <path d={`M${x} 846v60M${x - 22} 876h44`} stroke="#07101f" strokeWidth="4" />
          <path d={`M${x - 26} 840l26-26 26 26z`} fill="#07101f" />
          <circle cx={x} cy={806} r="7" fill="#07101f" />
          {/* holly ring on the post */}
          <g fill="#0a1424">
            <ellipse cx={x} cy={940} rx="34" ry="11" />
          </g>
          <g fill="#b94242" opacity="0.9">
            <circle cx={x - 13} cy={938} r="4" />
            <circle cx={x + 11} cy={942} r="4" />
          </g>
        </g>
      ))}

      {/* ---- Snowbanks and framing silhouettes --------------------------- */}
      <path
        d="M0 1350v-92q120-46 236-16 96 24 190-8 84-28 158 6l-42 110z"
        fill="#07101f"
      />
      <path
        d="M2400 1350v-108q-150-54-286-14-118 34-214-8-72-32-140 4l60 126z"
        fill="#07101f"
      />

      {/* Balustrade, lower left */}
      <g fill="#060f1f" className="rv1">
        <rect x="-20" y="1212" width="322" height="18" rx="6" />
        <rect x="-20" y="1318" width="322" height="34" />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M${-4 + i * 52} 1230h22v44q0 12-11 12t-11-12z`} />
        ))}
      </g>

      {/* Planter with fir and parcels, lower right */}
      <g className="rv2">
        <path d="M1980 1350v-84h210v84z" fill="#060f1f" />
        <path d="M1972 1266h226v16h-226z" fill="#060f1f" />
        <g fill="#0c2a24">
          <path d="M2085 1266l-62-92h124z" />
          <path d="M2085 1196l-48-72h96z" />
          <path d="M2085 1136l-34-54h68z" />
        </g>
        <g fill="#f2b84b" opacity="0.8">
          <circle cx="2062" cy="1218" r="5" className="twinkle" />
          <circle cx="2110" cy="1176" r="5" className="twinkle" style={{ '--delay': '1.2s' } as CSSProperties} />
          <circle cx="2074" cy="1140" r="4.5" className="twinkle" style={{ '--delay': '2.1s' } as CSSProperties} />
        </g>
      </g>

      {/* Wrapped parcels at the foot of the frame */}
      <g className="rv3">
        <rect x="332" y="1288" width="96" height="64" rx="6" fill="#0a1830" />
        <path d="M380 1288v64M332 1318h96" stroke="#8f2f2f" strokeWidth="9" />
        <path d="M380 1288q-20-24 0-28t0 28zM380 1288q20-24 0-28" fill="none" stroke="#8f2f2f" strokeWidth="6" />
        <rect x="442" y="1310" width="70" height="42" rx="5" fill="#0c1f38" />
        <path d="M477 1310v42M442 1332h70" stroke="#a8761f" strokeWidth="7" />
      </g>

      {/* Depth fade at the very bottom of the plate */}
      {/* Extra snow and shadow below y=1350, seen only in the portrait crop. */}
      <g fill="#dce8f2" opacity="0.13">
        <ellipse cx="700" cy="1440" rx="520" ry="46" />
        <ellipse cx="1900" cy="1470" rx="480" ry="44" />
      </g>
      <rect x="-300" y="1286" width="3000" height="300" fill="url(#fgFade)" />
    </LayerSvg>
  );
}
