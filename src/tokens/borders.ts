export const borders = {
  thin: 1,
  medium: 2,
  strong: 3,
} as const;

export type BorderKey = keyof typeof borders;
