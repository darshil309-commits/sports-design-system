import type { TextStyle } from 'react-native';

/**
 * Single typeface across the system: Inter Tight (tight proportions, strong
 * numerals, confident uppercase). Weight-specific PostScript names come from
 * @expo-google-fonts/inter-tight and must be loaded via useFonts before first
 * paint — see src/fonts.ts. `fallback` is used only during that brief load.
 */
const fallback = 'System';

export const fontFamily = {
  regular: 'InterTight_400Regular',
  medium: 'InterTight_500Medium',
  semiBold: 'InterTight_600SemiBold',
  bold: 'InterTight_700Bold',
  extraBold: 'InterTight_800ExtraBold',
  black: 'InterTight_900Black',
  fallback,
} as const;

interface TypeStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textTransform?: 'none' | 'uppercase';
}

export const typography: Record<
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'title'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'overline'
  | 'numerical'
  | 'numericalLarge',
  TypeStyle
> = {
  display: { fontFamily: fontFamily.extraBold, fontSize: 56, lineHeight: 60, letterSpacing: -1.5 },
  h1: { fontFamily: fontFamily.extraBold, fontSize: 40, lineHeight: 44, letterSpacing: -1 },
  h2: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 38, letterSpacing: -0.5 },
  h3: { fontFamily: fontFamily.bold, fontSize: 24, lineHeight: 30, letterSpacing: -0.25 },
  title: { fontFamily: fontFamily.semiBold, fontSize: 20, lineHeight: 26, letterSpacing: 0 },
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  caption: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  // Scores, stat comparisons, countdowns — typography as the star of the system.
  numerical: {
    fontFamily: fontFamily.extraBold,
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  numericalLarge: {
    fontFamily: fontFamily.black,
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: -1,
  },
};

/** Apply to any Text showing digits (scores, stats) so columns of numbers align. */
export const tabularNums: Pick<TextStyle, 'fontVariant'> = {
  fontVariant: ['tabular-nums'],
};
