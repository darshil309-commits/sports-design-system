/**
 * Sharp/athletic geometry. Default surfaces stay within 0–12px — do NOT reach
 * for 16px+ radii "because it looks softer"; that reads as generic fintech,
 * not sports. `circle` exists only for genuinely round elements (avatars,
 * live dots, team-logo frames) — it is not a shortcut back to pill buttons.
 */
export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  circle: 9999,
} as const;

export type RadiusKey = keyof typeof radius;
