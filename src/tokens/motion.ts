/**
 * Motion should feel quick and physical, never ornamental. Durations are in ms.
 * Easing curves are cubic-bezier control points — feed to Easing.bezier(...)
 * (from 'react-native') or an Animated/Reanimated equivalent at the call site,
 * so this file stays framework-light.
 */
export const duration = {
  fast: 120,
  standard: 200,
  slow: 320,
} as const;

export const easing = {
  standard: [0.4, 0.0, 0.2, 1] as const,
  decelerate: [0.0, 0.0, 0.2, 1] as const,
  accelerate: [0.4, 0.0, 1, 1] as const,
};

export const spring = {
  standard: { damping: 20, stiffness: 260, mass: 1 },
  snappy: { damping: 18, stiffness: 340, mass: 0.9 },
} as const;

export const motion = { duration, easing, spring };
