import { ViewStyle } from 'react-native';

/**
 * Minimal-shadow system. `subtle` is the workhorse for cards; `elevated` and
 * `overlay` are reserved for sheets/modals that must visually separate from
 * a busy background (e.g. the floating sheet over a match hero).
 */
type Shadow = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const shadows: Record<'none' | 'subtle' | 'elevated' | 'overlay', Shadow> = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#0B0B0D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  elevated: {
    shadowColor: '#0B0B0D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  overlay: {
    shadowColor: '#0B0B0D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
};
