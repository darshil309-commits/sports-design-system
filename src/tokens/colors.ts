/**
 * Raw palette. Never import `palette` directly in components — use the
 * semantic `colors` export below so a future re-theme only touches this file.
 */
export const palette = {
  red600: '#E5242A',
  red700: '#C01E23',
  red100: '#FBE4E4',

  black: '#0B0B0D',
  grey900: '#3D3D42',
  grey500: '#77777D',
  grey200: '#E8E8EA',
  grey100: '#F2F2F1',
  offWhite: '#F7F7F5',
  white: '#FFFFFF',

  green600: '#1E8E3E',
  green100: '#E3F3E7',
  amber600: '#B4790A',
  amber100: '#FBEEDC',
} as const;

export const colors = {
  brand: {
    primary: palette.red600,
    primaryPressed: palette.red700,
    primaryMuted: palette.red100,
    onPrimary: palette.white,
  },
  background: {
    base: palette.offWhite,
    elevated: palette.white,
    inverse: palette.black,
  },
  surface: {
    default: palette.white,
    subtle: palette.grey100,
    pressed: palette.grey200,
    inverse: palette.black,
  },
  border: {
    subtle: palette.grey200,
    default: palette.grey500,
    strong: palette.black,
    onDark: 'rgba(255,255,255,0.24)',
  },
  text: {
    primary: palette.black,
    secondary: palette.grey900,
    muted: palette.grey500,
    inverse: palette.white,
    inverseMuted: 'rgba(255,255,255,0.72)',
    brand: palette.red600,
    disabled: palette.grey500,
  },
  status: {
    success: palette.green600,
    successMuted: palette.green100,
    warning: palette.amber600,
    warningMuted: palette.amber100,
    error: palette.red600,
    errorMuted: palette.red100,
    live: palette.red600,
  },
  form: {
    win: palette.green600,
    draw: palette.grey500,
    loss: palette.red600,
  },
  overlay: {
    scrim: 'rgba(11,11,13,0.55)',
    heroGradientStart: 'rgba(11,11,13,0)',
    heroGradientEnd: 'rgba(11,11,13,0.92)',
  },
} as const;

export type Colors = typeof colors;
