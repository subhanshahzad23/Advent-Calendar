import type { MotionType } from '@/types/advent';
import type { VignetteDef } from './Frame';
import { SET_ONE } from './setOne';
import { SET_TWO } from './setTwo';
import { SET_THREE } from './setThree';

/** One deliberately distinct illustrated moment per day. */
export const VIGNETTES: Record<MotionType, VignetteDef> = {
  ...SET_ONE,
  ...SET_TWO,
  ...SET_THREE,
} as Record<MotionType, VignetteDef>;

export type { VignetteDef, VignetteProps } from './Frame';
