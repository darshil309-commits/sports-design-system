export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './borders';
export * from './opacity';
export * from './iconSizes';
export * from './componentHeights';
export * from './motion';
export * from './breakpoints';

import { colors } from './colors';
import { typography, fontFamily, tabularNums } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { borders } from './borders';
import { opacity } from './opacity';
import { iconSizes } from './iconSizes';
import { componentHeights } from './componentHeights';
import { motion } from './motion';
import { breakpoints } from './breakpoints';

/** Single import for the whole token set: `import { tokens } from '../tokens'` */
export const tokens = {
  colors,
  typography,
  fontFamily,
  tabularNums,
  spacing,
  radius,
  shadows,
  borders,
  opacity,
  iconSizes,
  componentHeights,
  motion,
  breakpoints,
};
