import type { ProgressStage } from '@/types/advent';

/**
 * ---------------------------------------------------------------------------
 * SCENE CONFIGURATION
 * ---------------------------------------------------------------------------
 * The piazza is drawn once in a single coordinate space. Desktop shows the full
 * panorama; narrow screens use a purpose-made crop that is taller and tighter
 * on the church, the fountain and the tree — it is a different composition, not
 * a shrunken one. Marker positions are mapped through whichever box is active.
 */
export interface SceneBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Full illustrated panorama. */
export const DESKTOP_VIEW: SceneBox = { x: 0, y: 0, w: 2400, h: 1350 };

/**
 * Portrait crop for phones. It is nearly square rather than letterboxed: the
 * illustration carries extra sky above and extra cobbles below precisely so a
 * tall screen gets a composition of its own instead of a squeezed panorama.
 */
export const MOBILE_VIEW: SceneBox = { x: 230, y: -320, w: 1940, h: 1870 };

export const viewBoxString = (b: SceneBox) => `${b.x} ${b.y} ${b.w} ${b.h}`;

/** Converts scene coordinates into a percentage position inside the stage. */
export const toStagePercent = (x: number, y: number, box: SceneBox) => ({
  left: ((x - box.x) / box.w) * 100,
  top: ((y - box.y) / box.h) * 100,
});

export interface StageDefinition {
  stage: ProgressStage;
  name: string;
  range: string;
  description: string;
}

/** The four progressive states of the square, surfaced in the menu. */
export const SCENE_STAGES: StageDefinition[] = [
  {
    stage: 1,
    name: 'Quiet anticipation',
    range: 'Days 1–6',
    description: 'Blue dusk, a few warm windows, the first snow. The square is waiting.',
  },
  {
    stage: 2,
    name: 'The square awakens',
    range: 'Days 7–12',
    description: 'String lights, the first market stall, lanterns crossing the cobbles.',
  },
  {
    stage: 3,
    name: 'A gathering community',
    range: 'Days 13–18',
    description: 'The choir arrives, the rose window glows, the market fills with people.',
  },
  {
    stage: 4,
    name: 'Christmas Eve radiance',
    range: 'Days 19–24',
    description: 'The tree is lit, the star is bright, and the whole town is in the square.',
  },
];

/** Parallax depth per illustrated layer. Higher = travels further with pointer. */
export const LAYER_DEPTH = {
  sky: 0.12,
  hills: 0.3,
  town: 0.55,
  piazza: 0.8,
  people: 1,
  foreground: 1.7,
} as const;

export const stageForDay = (day: number): ProgressStage => {
  if (day >= 19) return 4;
  if (day >= 13) return 3;
  if (day >= 7) return 2;
  return 1;
};
