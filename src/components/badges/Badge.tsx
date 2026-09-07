import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'brand';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const tonePalette: Record<BadgeTone, { background: string; text: string }> = {
  neutral: { background: colors.surface.subtle, text: colors.text.secondary },
  success: { background: colors.status.successMuted, text: colors.status.success },
  warning: { background: colors.status.warningMuted, text: colors.status.warning },
  error: { background: colors.status.errorMuted, text: colors.status.error },
  brand: { background: colors.brand.primaryMuted, text: colors.brand.primary },
};

/**
 * Generic status label — match status (HT / FT / POSTPONED / CANCELLED),
 * subscription tier, etc. For the live-match specific treatment use
 * LiveIndicator instead, which owns the pulsing red dot.
 */
export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const palette = tonePalette[tone];
  return (
    <View style={[styles.base, { backgroundColor: palette.background }]}>
      <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
